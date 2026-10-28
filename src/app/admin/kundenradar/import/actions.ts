'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { extractJson, type ImportIssue } from '@/lib/signal-import'
import { validateKundenradarImport } from '@/lib/kundenradar-import'
import { extrahiereKundenradarBericht } from '@/lib/ai/extract-kundenradar'
import { pruefeQuelle } from '@/lib/kundenradar-quellen'
import { missingForPublish } from '@/types/kundenradar'

/**
 * Dublettenschlüssel: Händler UND Quelle. Ein Konzernbericht trägt oft mehrere
 * Länder — nur die Adresse zu prüfen, ließe von Kaufland CZ, SK und RO einen
 * übrig. Zwei Signale desselben Händlers aus derselben Quelle gelten dagegen
 * als Dublette.
 */
const dupeKey = (retailerId: string, url: string) => `${retailerId}::${url.trim()}`

export type KundenradarImportResult =
  | { ok: false; error: string }
  | {
      ok: true
      created: number
      /** Wie viele der angelegten Entwürfe sofort veröffentlichbar wären. */
      completeDrafts: number
      duplicates: { headline: string; retailer_slug: string; source_url: string }[]
      issues: ImportIssue[]
      unknownSlugs: string[]
      /** Kurzprofile, die in ein leeres Feld geschrieben wurden. */
      profilesSet: number
      /** Kurzprofile, die übersprungen wurden, weil der Händler schon eins hat. */
      profilesSkipped: string[]
      /** Nur beim Bericht-Upload: was das Modell bewusst nicht übernommen hat. */
      verworfen?: { titel: string; grund: string }[]
      /** Nur beim Bericht-Upload: Quellen, die ins Leere führen (404, unbekannte Adresse). */
      toteQuellen?: { headline: string; source_url: string }[]
    }

type Supabase = Awaited<ReturnType<typeof createClient>>

async function pruefeAdmin(supabase: Supabase): Promise<{ userId: string } | { error: string }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht angemeldet.' }
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return { error: 'Keine Adminrechte.' }
  return { userId: user.id }
}

type HaendlerZeile = { id: string; slug: string; name: string; country: string; profile: string | null }

async function ladeHaendler(supabase: Supabase): Promise<HaendlerZeile[] | { error: string }> {
  const { data, error } = await supabase.from('retailers').select('id, slug, name, country, profile')
  if (error) return { error: `Händler nicht lesbar — ist Migration 019 eingespielt? (${error.message})` }
  return (data ?? []) as HaendlerZeile[]
}

/**
 * Der gemeinsame Kern: validieren, Dubletten aussortieren, Entwürfe anlegen,
 * leere Kurzprofile füllen. JSON-Import und Bericht-Upload unterscheiden sich
 * nur darin, woher das Objekt kommt.
 */
async function legeAn(
  supabase: Supabase,
  userId: string,
  haendler: HaendlerZeile[],
  input: unknown,
  vorbearbeiten?: (valid: ReturnType<typeof validateKundenradarImport>['valid']) => Promise<void>
): Promise<KundenradarImportResult> {
  const slugZuId = new Map(haendler.map((h) => [h.slug, h.id]))
  const hatProfil = new Set(haendler.filter((h) => h.profile?.trim()).map((h) => h.id))

  let parsed
  try {
    parsed = validateKundenradarImport(input, slugZuId)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }
  const { valid, profiles, issues, unknownSlugs } = parsed
  if (vorbearbeiten) await vorbearbeiten(valid)

  // ----------------------------------------------------------- Signale
  const urls = valid.map((s) => s.source_url).filter((u): u is string => !!u)
  const seen = new Set<string>()
  if (urls.length > 0) {
    const { data: existing } = await supabase
      .from('retailer_signals')
      .select('retailer_id, source_url')
      .in('source_url', urls)
    for (const row of existing ?? []) {
      if (row.source_url) seen.add(dupeKey(row.retailer_id as string, row.source_url as string))
    }
  }

  const duplicates: { headline: string; retailer_slug: string; source_url: string }[] = []
  const rows = []
  for (const { retailer_slug, ...draft } of valid) {
    const key = draft.source_url ? dupeKey(draft.retailer_id, draft.source_url) : null
    if (key && seen.has(key)) {
      duplicates.push({ headline: draft.title, retailer_slug, source_url: draft.source_url! })
      continue
    }
    if (key) seen.add(key)
    rows.push({
      ...draft,
      // Immer Entwürfe — ein Klick auf „Alle vollständigen veröffentlichen"
      // gibt sie frei (Entscheidung vom 27.10.2026).
      status: 'draft' as const,
      published_at: null,
      ai_generated: true,
      created_by: userId,
    })
  }

  if (rows.length > 0) {
    const { error } = await supabase.from('retailer_signals').insert(rows)
    if (error) {
      console.error('[kundenradar-import]', error)
      return { ok: false, error: `Import fehlgeschlagen: ${error.message}` }
    }
  }

  // ------------------------------------------------------ Kurzprofile
  // Nur in leere Felder: Ein gepflegtes Profil überschreibt kein Lauf.
  let profilesSet = 0
  const profilesSkipped: string[] = []
  for (const p of profiles) {
    if (hatProfil.has(p.retailer_id)) {
      profilesSkipped.push(p.retailer_slug)
      continue
    }
    const { error } = await supabase
      .from('retailers')
      .update({ profile: p.profile, profile_updated_at: new Date().toISOString() })
      .eq('id', p.retailer_id)
    if (error) {
      issues.push({ index: -1, headline: `Kurzprofil ${p.retailer_slug}`, reason: error.message })
      continue
    }
    hatProfil.add(p.retailer_id)
    profilesSet++
  }

  revalidatePath('/admin/kundenradar')
  if (profilesSet > 0) {
    revalidatePath('/kundenradar')
    revalidatePath('/kundenradar/[slug]', 'page')
  }
  return {
    ok: true,
    created: rows.length,
    completeDrafts: rows.filter((r) => missingForPublish(r).length === 0).length,
    duplicates,
    issues,
    unknownSlugs,
    profilesSet,
    profilesSkipped,
  }
}

/** Notweg: fertiges JSON einfügen (Form wie in prompts/kundenradar.md). */
export async function importiereKundensignale(rawJson: string): Promise<KundenradarImportResult> {
  const supabase = await createClient()
  const admin = await pruefeAdmin(supabase)
  if ('error' in admin) return { ok: false, ...admin }
  const haendler = await ladeHaendler(supabase)
  if ('error' in haendler) return { ok: false, ...haendler }

  let input: unknown
  try {
    input = extractJson(rawJson)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }

  const ergebnis = await legeAn(supabase, admin.userId, haendler, input)
  if (ergebnis.ok && ergebnis.created === 0 && ergebnis.profilesSet === 0) {
    return { ok: false, error: 'Alles schon bekannt — keine neuen Signale, keine leeren Kurzprofile.' }
  }
  return ergebnis
}

/**
 * Der Regelweg: einen Deep-Research-Bericht (.md) hochladen. Das Modell zerlegt
 * ihn in Signale und Kurzprofile; tote Quellen fallen heraus, bevor etwas
 * angelegt wird. Ein Bericht je Aufruf — das Formular schickt sie nacheinander,
 * damit jeder Bericht die Entwürfe des vorigen als BEREITS ERFASST sieht.
 */
export async function importiereBericht(dateiname: string, text: string): Promise<KundenradarImportResult> {
  const supabase = await createClient()
  const admin = await pruefeAdmin(supabase)
  if ('error' in admin) return { ok: false, ...admin }
  const haendler = await ladeHaendler(supabase)
  if ('error' in haendler) return { ok: false, ...haendler }
  if (!text.trim()) return { ok: false, error: `${dateiname} ist leer.` }

  const { data: bekanntRoh } = await supabase
    .from('retailer_signals')
    .select('title, teaser, signal_type, source_date, retailer_id')
  const slugVon = new Map(haendler.map((h) => [h.id, h.slug]))
  const bekannt = (bekanntRoh ?? [])
    .map((b) => ({
      slug: slugVon.get(b.retailer_id as string) ?? '',
      signal_type: b.signal_type as string,
      title: b.title as string,
      teaser: (b.teaser as string | null) ?? null,
      source_date: (b.source_date as string | null) ?? null,
    }))
    .filter((b) => b.slug)

  let extraktion
  try {
    extraktion = await extrahiereKundenradarBericht({
      text,
      dateiname,
      haendler: haendler.map(({ slug, name, country }) => ({ slug, name, country })),
      bekannt,
    })
  } catch (e) {
    console.error('[kundenradar-bericht]', e)
    return { ok: false, error: `${dateiname}: ${e instanceof Error ? e.message : 'Aufbereitung fehlgeschlagen.'}` }
  }

  // Quellen prüfen, bevor etwas angelegt wird. Eine tote URL wird entfernt —
  // das Signal bleibt dann als Entwurf liegen (Quellen-URL fehlt) und geht
  // nicht mit dem einen Klick durch.
  const toteQuellen: { headline: string; source_url: string }[] = []
  const ergebnis = await legeAn(
    supabase,
    admin.userId,
    haendler,
    { signals: extraktion.signals, profiles: extraktion.profiles },
    async (valid) => {
      await Promise.all(
        valid.map(async (s) => {
          if (!s.source_url) return
          if ((await pruefeQuelle(s.source_url)) === 'tot') {
            toteQuellen.push({ headline: s.title, source_url: s.source_url })
            s.source_url = null
          }
        })
      )
    }
  )
  if (!ergebnis.ok) return ergebnis
  return { ...ergebnis, verworfen: extraktion.verworfen, toteQuellen }
}

'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { extractJson, type ImportIssue } from '@/lib/signal-import'
import { validateKundenradarImport } from '@/lib/kundenradar-import'
import { missingForPublish } from '@/types/kundenradar'

/**
 * Dublettenschlüssel: Händler UND Quelle. Ein Konzernbericht trägt oft mehrere
 * Länder — nur die Adresse zu prüfen, ließe von Kaufland CZ, SK und RO einen
 * übrig. Zwei Signale desselben Händlers aus derselben Quelle gelten dagegen
 * als Dublette; die Aufbereitung führt sie vorher zusammen.
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
    }

export async function importiereKundensignale(rawJson: string): Promise<KundenradarImportResult> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Nicht angemeldet.' }
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return { ok: false, error: 'Keine Adminrechte.' }

  const { data: haendler, error: haendlerFehler } = await supabase
    .from('retailers').select('id, slug, profile')
  if (haendlerFehler) {
    return { ok: false, error: `Händler nicht lesbar — ist Migration 019 eingespielt? (${haendlerFehler.message})` }
  }
  const slugZuId = new Map((haendler ?? []).map((h) => [h.slug as string, h.id as string]))
  const hatProfil = new Set(
    (haendler ?? []).filter((h) => (h.profile as string | null)?.trim()).map((h) => h.id as string)
  )

  let parsed
  try {
    parsed = validateKundenradarImport(extractJson(rawJson), slugZuId)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }
  const { valid, profiles, issues, unknownSlugs } = parsed
  if (valid.length === 0 && profiles.length === 0) {
    return { ok: false, error: `Kein gültiges Signal und kein Kurzprofil in der Eingabe (${issues.length} fehlerhaft).` }
  }

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
      // Import legt immer Entwürfe an — die Hürde ist der Filter, und jede
      // Quelle soll vor dem Veröffentlichen einmal aufgerufen sein.
      status: 'draft' as const,
      published_at: null,
      ai_generated: true,
      created_by: user.id,
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

  if (rows.length === 0 && profilesSet === 0) {
    return { ok: false, error: 'Alles schon bekannt — keine neuen Signale, keine leeren Kurzprofile.' }
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

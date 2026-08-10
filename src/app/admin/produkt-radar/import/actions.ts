'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { extractJson, type ImportIssue } from '@/lib/signal-import'
import { validateImpulseImport } from '@/lib/impulse-import'
import { missingForImpulse } from '@/types/innovation'

/**
 * Dublettenschlüssel aus Quelle UND Titel.
 *
 * Die URL allein reicht nicht: Ein Trendartikel oder ein Messebericht trägt
 * regelmässig mehrere Konzepte unter einer Adresse. Beim ersten Rohstoff-Import
 * gingen mit einer reinen URL-Prüfung vier eigenständige Signale verloren —
 * derselbe Fehler wäre hier noch wahrscheinlicher.
 */
function dupeKey(url: string, title: string): string {
  const t = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 32)
  return `${url}::${t}`
}

export type ImpulseImportResult =
  | { ok: false; error: string }
  | {
      ok: true
      created: number
      /** Wie viele Entwürfe alle Felder tragen, die die Karte braucht. */
      completeDrafts: number
      duplicates: { title: string; source_url: string }[]
      issues: ImportIssue[]
      unknownTags: { title: string; tags: string[] }[]
      /** Je unvollständigem Entwurf, was fehlt — die Arbeitsliste der Durchsicht. */
      incomplete: { title: string; missing: string[] }[]
    }

export async function importImpulses(rawJson: string): Promise<ImpulseImportResult> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Nicht angemeldet.' }
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return { ok: false, error: 'Keine Adminrechte.' }

  let parsed
  try {
    parsed = validateImpulseImport(extractJson(rawJson))
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }
  const { valid, issues, unknownTags } = parsed
  if (valid.length === 0) {
    return { ok: false, error: `Kein gültiger Impuls in der Eingabe (${issues.length} fehlerhaft).` }
  }

  // Dublettenprüfung gegen den Bestand und innerhalb der Datei — drei
  // Deep-Research-Dienste auf denselben Prompt liefern zwangsläufig Überschneidungen.
  const urls = valid.map((i) => i.source_url).filter((u): u is string => !!u)
  const seen = new Set<string>()
  if (urls.length > 0) {
    const { data: existing } = await supabase
      .from('innovation_impulses')
      .select('source_url, title')
      .in('source_url', urls)
    for (const row of existing ?? []) {
      if (row.source_url) seen.add(dupeKey(row.source_url, row.title ?? ''))
    }
  }

  const duplicates: { title: string; source_url: string }[] = []
  const rows = []
  for (const draft of valid) {
    const key = draft.source_url ? dupeKey(draft.source_url, draft.title) : null
    if (key && seen.has(key)) {
      duplicates.push({ title: draft.title, source_url: draft.source_url! })
      continue
    }
    if (key) seen.add(key)
    rows.push({
      ...draft,
      status: 'draft' as const,
      ai_generated: true,
      created_by: user.id,
    })
  }

  if (rows.length === 0) {
    return { ok: false, error: `Alle ${valid.length} Impulse sind bereits bekannt — nichts zu importieren.` }
  }

  const { error } = await supabase.from('innovation_impulses').insert(rows)
  if (error) {
    console.error('[impulse-import]', error)
    return { ok: false, error: `Import fehlgeschlagen: ${error.message}` }
  }

  const incomplete = rows
    .map((r) => ({ title: r.title, missing: missingForImpulse(r) }))
    .filter((r) => r.missing.length > 0)

  revalidatePath('/admin/produkt-radar')
  return {
    ok: true,
    created: rows.length,
    completeDrafts: rows.length - incomplete.length,
    duplicates,
    issues,
    unknownTags,
    incomplete,
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { extractJson, type ImportIssue } from '@/lib/signal-import'
import { validateRegulatorikImport } from '@/lib/regulatorik-import'
import { missingForPublish } from '@/types/substance-watch'

/**
 * Dublettenschluessel: Quelle UND Gegenstand (Stoff, sonst Kurzzeile).
 * Eine EFSA-Plenarsitzung oder ein PAFF-Protokoll traegt mehrere Faelle unter
 * einer URL -- nur die Adresse zu pruefen liesse davon einen uebrig.
 */
function dupeKey(url: string, subject: string): string {
  const s = subject
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 24)
  return `${url}::${s}`
}

export type RegulatorikImportResult =
  | { ok: false; error: string }
  | {
      ok: true
      created: number
      /** Wie viele der angelegten Entwuerfe sofort veroeffentlichbar waeren. */
      completeDrafts: number
      duplicates: { headline: string; source_url: string }[]
      issues: ImportIssue[]
      unknownCategories: { headline: string; categories: string[] }[]
    }

export async function importiereRegulatorikEintraege(rawJson: string): Promise<RegulatorikImportResult> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Nicht angemeldet.' }
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return { ok: false, error: 'Keine Adminrechte.' }

  let parsed
  try {
    parsed = validateRegulatorikImport(extractJson(rawJson))
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }
  const { valid, issues, unknownCategories } = parsed
  if (valid.length === 0) {
    return { ok: false, error: `Kein gültiger Eintrag in der Eingabe (${issues.length} fehlerhaft).` }
  }

  const urls = valid.map((s) => s.source_url).filter((u): u is string => !!u)
  const seen = new Set<string>()
  if (urls.length > 0) {
    const { data: existing } = await supabase
      .from('substance_watch')
      .select('source_url, substance, teaser')
      .in('source_url', urls)
    for (const row of existing ?? []) {
      if (row.source_url) seen.add(dupeKey(row.source_url, row.substance || row.teaser || ''))
    }
  }

  const duplicates: { headline: string; source_url: string }[] = []
  const rows = []
  for (const draft of valid) {
    const key = draft.source_url ? dupeKey(draft.source_url, draft.substance || draft.teaser || '') : null
    if (key && seen.has(key)) {
      duplicates.push({ headline: draft.teaser ?? draft.substance, source_url: draft.source_url! })
      continue
    }
    if (key) seen.add(key)
    rows.push({
      ...draft,
      // Import legt immer Entwuerfe an. Die Veroeffentlichungs-Huerde ist der
      // Filter -- die Admin-Liste zeigt je Entwurf, was noch fehlt.
      status: 'draft' as const,
      published_at: null,
      ai_generated: true,
      created_by: user.id,
    })
  }

  if (rows.length === 0) {
    return { ok: false, error: `Alle ${valid.length} Einträge sind bereits bekannt — nichts zu importieren.` }
  }

  const { error } = await supabase.from('substance_watch').insert(rows)
  if (error) {
    console.error('[regulatorik-import]', error)
    return { ok: false, error: `Import fehlgeschlagen: ${error.message}` }
  }

  revalidatePath('/admin/unter-beobachtung')
  return {
    ok: true,
    created: rows.length,
    completeDrafts: rows.filter((r) => missingForPublish(r).length === 0).length,
    duplicates,
    issues,
    unknownCategories,
  }
}

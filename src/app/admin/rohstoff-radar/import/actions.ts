'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { extractJson, type ImportIssue } from '@/lib/signal-import'
import { validateIngredientImport } from '@/lib/ingredient-import'
import { missingForPublish } from '@/types/ingredient-signals'

/**
 * Dublettenschlüssel. Preis der Paarung mit dem Gegenstand: derselbe Fund mit
 * abweichend geschriebenem Gegenstand rutscht durch — das fällt in der
 * Entwurfsliste auf und ist billiger als der stille Verlust echter Signale.
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

export type IngredientImportResult =
  | { ok: false; error: string }
  | {
      ok: true
      created: number
      /** Wie viele der angelegten Entwürfe sofort veröffentlichbar wären. */
      completeDrafts: number
      duplicates: { title: string; source_url: string }[]
      issues: ImportIssue[]
      unknownFunctions: { title: string; functions: string[] }[]
    }

export async function importIngredientSignals(rawJson: string): Promise<IngredientImportResult> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Nicht angemeldet.' }
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return { ok: false, error: 'Keine Adminrechte.' }

  let parsed
  try {
    parsed = validateIngredientImport(extractJson(rawJson))
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }
  const { valid, issues, unknownFunctions } = parsed
  if (valid.length === 0) {
    return { ok: false, error: `Kein gültiges Signal in der Eingabe (${issues.length} fehlerhaft).` }
  }

  // Dublettenprüfung über Quelle UND Gegenstand, gegen den Bestand und
  // innerhalb der Datei. Nur die URL reicht nicht: Sammelartikel und
  // EU-Konsultationsseiten tragen mehrere Gegenstände unter einer Adresse —
  // beim ersten Import gingen so vier eigenständige Signale verloren.
  const urls = valid.map((s) => s.source_url).filter((u): u is string => !!u)
  const seen = new Set<string>()
  if (urls.length > 0) {
    const { data: existing } = await supabase
      .from('ingredient_signals')
      .select('source_url, subject_name')
      .in('source_url', urls)
    for (const row of existing ?? []) {
      if (row.source_url) seen.add(dupeKey(row.source_url, row.subject_name ?? ''))
    }
  }

  const duplicates: { title: string; source_url: string }[] = []
  const rows = []
  for (const draft of valid) {
    const key = draft.source_url ? dupeKey(draft.source_url, draft.subject_name) : null
    if (key && seen.has(key)) {
      duplicates.push({ title: draft.title, source_url: draft.source_url! })
      continue
    }
    if (key) seen.add(key)
    rows.push({
      ...draft,
      // Import legt immer Entwürfe an. Die Veröffentlichungs-Hürde ist der
      // Filter, keine zweite Kandidatentabelle — die Admin-Liste zeigt je
      // Entwurf, was noch fehlt.
      status: 'draft' as const,
      published_at: null,
      ai_generated: true,
      created_by: user.id,
    })
  }

  if (rows.length === 0) {
    return { ok: false, error: `Alle ${valid.length} Signale sind bereits bekannt — nichts zu importieren.` }
  }

  const { error } = await supabase.from('ingredient_signals').insert(rows)
  if (error) {
    console.error('[ingredient-import]', error)
    return { ok: false, error: `Import fehlgeschlagen: ${error.message}` }
  }

  revalidatePath('/admin/rohstoff-radar')
  return {
    ok: true,
    created: rows.length,
    completeDrafts: rows.filter((r) => missingForPublish(r).length === 0).length,
    duplicates,
    issues,
    unknownFunctions,
  }
}

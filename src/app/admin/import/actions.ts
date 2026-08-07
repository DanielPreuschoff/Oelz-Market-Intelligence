'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  extractJson,
  normalizeCompetitor,
  validateImport,
  type ImportIssue,
} from '@/lib/signal-import'

export type ImportResult =
  | { ok: false; error: string }
  | {
      ok: true
      runId: string
      created: number
      duplicates: { headline: string; source_url: string }[]
      issues: ImportIssue[]
      unmatchedCompetitors: string[]
      coveredCompetitors: string[]
    }

export async function importSignals(rawJson: string): Promise<ImportResult> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Nicht angemeldet.' }
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return { ok: false, error: 'Keine Adminrechte.' }

  let parsed
  try {
    parsed = validateImport(extractJson(rawJson))
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }
  const { period, valid, issues } = parsed
  if (valid.length === 0) {
    return { ok: false, error: `Kein gültiges Signal in der Eingabe (${issues.length} fehlerhaft).` }
  }

  // Wettbewerber und Länder auflösen
  const [{ data: competitors }, { data: countries }] = await Promise.all([
    supabase.from('competitors').select('id, name, short_name'),
    supabase.from('countries').select('id'),
  ])
  const byName = new Map<string, string>()
  for (const c of competitors ?? []) {
    byName.set(normalizeCompetitor(c.name), c.id)
    byName.set(normalizeCompetitor(c.short_name), c.id)
  }
  const knownCountries = new Set((countries ?? []).map((c) => c.id))

  // Dublettenprüfung: gegen veröffentlichte Signale UND gegen Kandidaten, die
  // noch nicht abgelehnt sind. Zweite Stufe zur Prüfung beim Erzeugen der Datei —
  // dort kenne ich nur den Stand von damals, hier den von jetzt.
  const urls = valid.map((s) => s.source_url).filter((u): u is string => !!u)
  const seen = new Set<string>()
  if (urls.length > 0) {
    const [{ data: existingSignals }, { data: existingCandidates }] = await Promise.all([
      supabase.from('signals').select('source_url').in('source_url', urls),
      supabase.from('signal_candidates').select('source_url').in('source_url', urls).neq('status', 'rejected'),
    ])
    for (const row of [...(existingSignals ?? []), ...(existingCandidates ?? [])]) {
      if (row.source_url) seen.add(row.source_url)
    }
  }

  const duplicates: { headline: string; source_url: string }[] = []
  const unmatched = new Set<string>()
  const covered = new Set<string>()
  const rows: Record<string, unknown>[] = []

  for (const signal of valid) {
    if (signal.source_url && seen.has(signal.source_url)) {
      duplicates.push({ headline: signal.headline, source_url: signal.source_url })
      continue
    }
    if (signal.source_url) seen.add(signal.source_url) // auch innerhalb einer Datei entdoppeln

    let competitorId: string | null = null
    if (signal.competitor?.trim()) {
      competitorId = byName.get(normalizeCompetitor(signal.competitor)) ?? null
      if (competitorId) covered.add(competitorId)
      else unmatched.add(signal.competitor.trim())
    }

    rows.push({
      headline: signal.headline,
      summary: signal.summary,
      category: signal.category,
      importance: signal.importance,
      competitor_id: competitorId,
      country_id: signal.country && knownCountries.has(signal.country) ? signal.country : null,
      source_name: signal.source_name ?? null,
      source_url: signal.source_url ?? null,
      signal_date: signal.signal_date ?? null,
      status: 'pending',
      research_source: 'manual_import',
    })
  }

  if (rows.length === 0) {
    return { ok: false, error: `Alle ${valid.length} Signale sind bereits bekannt — nichts zu importieren.` }
  }

  const { data: run, error: runError } = await supabase
    .from('research_runs')
    .insert({
      triggered_by: user.id,
      status: 'completed',
      completed_at: new Date().toISOString(),
      competitors_searched: [...covered],
      candidates_found: rows.length,
      label: period,
    })
    .select('id')
    .single()

  if (runError || !run) {
    console.error('[import] run insert', runError)
    return { ok: false, error: 'Importlauf konnte nicht angelegt werden.' }
  }

  const { error: insertError } = await supabase
    .from('signal_candidates')
    .insert(rows.map((r) => ({ ...r, research_run_id: run.id })))

  if (insertError) {
    console.error('[import] candidates insert', insertError)
    return { ok: false, error: `Kandidaten konnten nicht angelegt werden: ${insertError.message}` }
  }

  revalidatePath('/admin/import')
  return {
    ok: true,
    runId: run.id,
    created: rows.length,
    duplicates,
    issues,
    unmatchedCompetitors: [...unmatched],
    coveredCompetitors: [...covered],
  }
}

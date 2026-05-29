import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { runResearchForCompetitor, type CompetitorInput } from '@/lib/ai/research-agent'
import type { Competitor } from '@/types/database'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Auth + admin check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Parse body
  const body = await request.json().catch(() => ({}))
  const dateRangeDays: number = body.dateRangeDays ?? 14
  const competitorIds: string[] | null = body.competitorIds ?? null

  // Load competitors
  let query = supabase.from('competitors').select('*').eq('active', true)
  if (competitorIds?.length) query = query.in('id', competitorIds)
  const { data: competitors } = await query

  if (!competitors?.length) {
    return NextResponse.json({ error: 'No competitors found' }, { status: 400 })
  }

  // Create research run record
  const { data: run, error: runError } = await supabase
    .from('research_runs')
    .insert({
      triggered_by: user.id,
      status: 'running',
      date_range_days: dateRangeDays,
      competitors_searched: competitors.map((c) => c.id),
    })
    .select()
    .single()

  if (runError || !run) {
    return NextResponse.json({ error: 'Failed to create run' }, { status: 500 })
  }

  // Load existing source URLs for deduplication
  const { data: existingSignals } = await supabase
    .from('signals')
    .select('source_url')
    .not('source_url', 'is', null)

  const { data: existingCandidates } = await supabase
    .from('signal_candidates')
    .select('source_url')
    .not('source_url', 'is', null)
    .neq('status', 'rejected')

  const existingUrls = new Set([
    ...(existingSignals ?? []).map((s) => s.source_url),
    ...(existingCandidates ?? []).map((c) => c.source_url),
  ])

  // Run research per competitor (sequential to avoid rate limits)
  let totalCandidates = 0
  let hasError = false
  const errors: string[] = []

  for (const competitor of competitors as Competitor[]) {
    try {
      const input: CompetitorInput = {
        id: competitor.id,
        name: competitor.name,
        short_name: competitor.short_name,
        country_ids: competitor.country_ids,
        description: competitor.description,
      }

      const { candidates, rawResponse } = await runResearchForCompetitor(input, dateRangeDays)

      // Match competitor_id and country_id, deduplicate, quality filter, insert
      const deduplicated = candidates.filter((c) => {
        if (c.source_url && existingUrls.has(c.source_url)) return false
        return true
      })

      // Quality filter: keep importance 2+3 always; keep importance 1 only if competitor has < 3 candidates total
      const highQuality = deduplicated.filter((c) => c.importance !== '1')
      const lowQuality = deduplicated.filter((c) => c.importance === '1')
      const filtered = highQuality.length < 3
        ? [...highQuality, ...lowQuality]
        : highQuality

      const toInsert = filtered
        .map((c) => ({
          research_run_id: run.id,
          headline: c.headline,
          summary: c.summary,
          category: c.category,
          competitor_id: competitor.id,
          country_id: c.country_code ?? null,
          importance: c.importance,
          source_url: c.source_url ?? null,
          source_name: c.source_name ?? null,
          signal_date: c.signal_date ?? null,
          status: 'pending' as const,
          ai_raw_response: rawResponse,
          research_source: c.research_source,
        }))

      if (toInsert.length > 0) {
        const { error: insertError } = await supabase
          .from('signal_candidates')
          .insert(toInsert)

        if (insertError) {
          console.error(`[research/run] Insert error for ${competitor.short_name}:`, insertError)
        } else {
          totalCandidates += toInsert.length
          // Track new URLs to avoid intra-run duplication
          toInsert.forEach((c) => { if (c.source_url) existingUrls.add(c.source_url) })
        }
      }
    } catch (err) {
      console.error(`[research/run] Error for ${competitor.short_name}:`, err)
      errors.push(`${competitor.short_name}: ${err instanceof Error ? err.message : 'unknown error'}`)
      hasError = true
    }
  }

  // Update run record
  await supabase
    .from('research_runs')
    .update({
      status: hasError && totalCandidates === 0 ? 'failed' : 'completed',
      completed_at: new Date().toISOString(),
      candidates_found: totalCandidates,
      error_message: errors.length > 0 ? errors.join('; ') : null,
    })
    .eq('id', run.id)

  return NextResponse.json({ runId: run.id, candidatesFound: totalCandidates })
}

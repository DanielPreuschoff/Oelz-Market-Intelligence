import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { deriveRoleRelevance } from '@/lib/role-relevance'
import type { ImportanceLevel, SignalCategory } from '@/types/database'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Load candidate
  const { data: candidate, error: fetchError } = await supabase
    .from('signal_candidates')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !candidate) {
    return NextResponse.json({ error: 'Candidate not found' }, { status: 404 })
  }
  if (candidate.status !== 'pending') {
    return NextResponse.json({ error: 'Candidate already reviewed' }, { status: 409 })
  }

  // Promote to signals table
  const category = (candidate.category ?? 'product_launch') as SignalCategory
  const importance = (candidate.importance ?? '1') as ImportanceLevel

  const { data: signal, error: signalError } = await supabase
    .from('signals')
    .insert({
      headline: candidate.headline ?? '',
      summary: candidate.summary ?? '',
      category,
      competitor_id: candidate.competitor_id,
      country_id: candidate.country_id,
      importance,
      // Wurde hier bisher gar nicht gesetzt — jedes uebernommene Signal kam
      // ohne Rollenzuordnung in den Reader. Siehe src/lib/role-relevance.ts.
      role_relevance: deriveRoleRelevance(category, importance),
      source_url: candidate.source_url,
      source_name: candidate.source_name,
      signal_date: candidate.signal_date,
      status: 'reviewed',
      ai_generated: true,
      reviewed_by: user.id,
      created_by: user.id,
    })
    .select()
    .single()

  if (signalError || !signal) {
    console.error('[approve] Signal insert error:', signalError)
    return NextResponse.json({ error: 'Failed to create signal' }, { status: 500 })
  }

  // Mark candidate approved
  await supabase
    .from('signal_candidates')
    .update({
      status: 'approved',
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      promoted_signal_id: signal.id,
    })
    .eq('id', id)

  return NextResponse.json({ signalId: signal.id })
}

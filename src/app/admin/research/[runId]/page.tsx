import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { CandidateReviewList } from '@/components/admin/candidate-review-list'
import type { ResearchRun, SignalCandidateWithRelations } from '@/types/database'

export default async function ResearchRunPage({
  params,
}: {
  params: Promise<{ runId: string }>
}) {
  const { runId } = await params
  const supabase = await createClient()

  const { data: run } = await supabase
    .from('research_runs')
    .select('*')
    .eq('id', runId)
    .single()

  if (!run) notFound()

  const { data: candidates } = await supabase
    .from('signal_candidates')
    .select('*, competitor:competitors(id, short_name), country:countries(id, name)')
    .eq('research_run_id', runId)
    .order('importance', { ascending: false })
    .order('created_at', { ascending: true })

  const typedRun = run as ResearchRun
  const typedCandidates = (candidates ?? []) as SignalCandidateWithRelations[]

  const pending = typedCandidates.filter((c) => c.status === 'pending')
  const approved = typedCandidates.filter((c) => c.status === 'approved')
  const rejected = typedCandidates.filter((c) => c.status === 'rejected')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/research"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Research
        </Link>
        <h1 className="text-2xl font-semibold">
          Run from {format(new Date(typedRun.created_at), 'MMMM d, yyyy')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {typedCandidates.length} candidates total ·{' '}
          {pending.length} pending · {approved.length} approved · {rejected.length} rejected
        </p>
      </div>

      {typedCandidates.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed p-10 text-center text-sm text-muted-foreground">
          No candidates were found in this run.
        </div>
      ) : (
        <CandidateReviewList candidates={typedCandidates} />
      )}
    </div>
  )
}

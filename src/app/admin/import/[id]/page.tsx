import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { CandidateReviewList } from '@/components/admin/candidate-review-list'
import type { ResearchRun, SignalCandidateWithRelations } from '@/types/database'

export default async function ImportRunPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data: run } = await supabase
    .from('research_runs')
    .select('*')
    .eq('id', id)
    .single()

  if (!run) notFound()

  const { data: candidates } = await supabase
    .from('signal_candidates')
    .select('*, competitor:competitors(id, short_name), country:countries(id, name)')
    .eq('research_run_id', id)
    // Wichtigste zuerst: bei 60+ Kandidaten entscheidet die Reihenfolge, worauf
    // die Aufmerksamkeit fällt, bevor sie nachlässt.
    .order('importance', { ascending: false })
    .order('created_at', { ascending: true })

  const typedRun = run as ResearchRun
  const typedCandidates = (candidates ?? []) as SignalCandidateWithRelations[]

  const pending = typedCandidates.filter((c) => c.status === 'pending')
  const approved = typedCandidates.filter((c) => c.status === 'approved')
  const rejected = typedCandidates.filter((c) => c.status === 'rejected')

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/import"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Signal-Import
        </Link>
        <h1 className="text-2xl font-semibold">
          {typedRun.label ?? format(new Date(typedRun.created_at), 'd. MMMM yyyy', { locale: de })}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {typedCandidates.length} Kandidaten · {pending.length} offen ·{' '}
          {approved.length} bestätigt · {rejected.length} abgelehnt
        </p>
      </div>

      {typedCandidates.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed p-10 text-center text-sm text-muted-foreground">
          Dieser Lauf enthält keine Kandidaten.
        </div>
      ) : (
        <CandidateReviewList candidates={typedCandidates} />
      )}
    </div>
  )
}

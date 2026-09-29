import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { EditionBuilder } from '@/components/admin/edition-builder'
import type { EditionWithSignals, SignalWithRelations, EditionStatus } from '@/types/database'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'

const STATUS_COLORS: Record<EditionStatus, string> = {
  draft: 'bg-slate-100 text-slate-600',
  review: 'bg-amber-100 text-amber-700',
  published: 'bg-green-100 text-green-700',
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminEditionDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: edition }, { data: availableSignals }, { data: otherEditionRows }] = await Promise.all([
    supabase
      .from('editions')
      .select(`
        *,
        edition_signals (
          *,
          signal:signals (
            *,
            competitor:competitors (*),
            country:countries (*)
          )
        )
      `)
      .eq('id', id)
      .single(),
    supabase
      .from('signals')
      .select('*, competitor:competitors(*), country:countries(*)')
      .in('status', ['reviewed', 'published'])
      // Latest import first; without nullsFirst: false, undated old signals
      // would sort above everything else.
      .order('created_at', { ascending: false })
      .order('signal_date', { ascending: false, nullsFirst: false }),
    supabase
      .from('edition_signals')
      .select('signal_id, edition:editions(period_month)')
      .neq('edition_id', id),
  ])

  if (!edition) notFound()

  const typedEdition = edition as EditionWithSignals
  const includedSignalIds = new Set(typedEdition.edition_signals.map((es) => es.signal_id))

  // Signals not yet in this edition
  const unaddedSignals = (availableSignals ?? []).filter(
    (s: SignalWithRelations) => !includedSignalIds.has(s.id)
  ) as SignalWithRelations[]

  // Other editions each signal already appears in, so fresh imports stand apart
  // from reused ones. Published without an edition: that edition was deleted.
  const usedIn: Record<string, string[]> = {}
  for (const row of (otherEditionRows ?? []) as unknown as { signal_id: string; edition: { period_month: string } | null }[]) {
    if (!row.edition) continue
    const label = format(new Date(row.edition.period_month), 'MMM yyyy')
    const labels = (usedIn[row.signal_id] ??= [])
    if (!labels.includes(label)) labels.push(label)
  }
  for (const s of [...unaddedSignals, ...typedEdition.edition_signals.map((es) => es.signal)]) {
    if (s.status === 'published' && !usedIn[s.id]) usedIn[s.id] = ['published']
  }

  const sortedRows = typedEdition.edition_signals.sort((a, b) => a.position - b.position)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{typedEdition.title}</h1>
            <Badge
              variant="secondary"
              className={cn('text-xs', STATUS_COLORS[typedEdition.status])}
            >
              {typedEdition.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(typedEdition.period_month), 'MMMM yyyy')} ·{' '}
            {sortedRows.length} signals included
          </p>
        </div>
        <div className="flex items-center gap-2">
          {typedEdition.status !== 'published' && (
            <Link href={`/editions/${id}?preview=true`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}>
              <Eye className="w-4 h-4" />
              Preview
            </Link>
          )}
          {typedEdition.status === 'published' && (
            <Link href={`/editions/${id}`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
              View Published
            </Link>
          )}
        </div>
      </div>

      <EditionBuilder
        edition={typedEdition}
        unaddedSignals={unaddedSignals}
        usedIn={usedIn}
      />
    </div>
  )
}

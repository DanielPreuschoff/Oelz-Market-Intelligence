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

  const [{ data: edition }, { data: availableSignals }] = await Promise.all([
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
      .order('signal_date', { ascending: false }),
  ])

  if (!edition) notFound()

  const typedEdition = edition as EditionWithSignals
  const includedSignalIds = new Set(typedEdition.edition_signals.map((es) => es.signal_id))

  // Signals not yet in this edition
  const unaddedSignals = (availableSignals ?? []).filter(
    (s: SignalWithRelations) => !includedSignalIds.has(s.id)
  ) as SignalWithRelations[]

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
      />
    </div>
  )
}

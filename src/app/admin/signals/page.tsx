import Link from 'next/link'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button-variants'
import { Badge } from '@/components/ui/badge'
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  IMPORTANCE_COLORS,
  IMPORTANCE_LABELS,
  type SignalWithRelations,
  type SignalStatus,
} from '@/types/database'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { DeleteButton } from '@/components/admin/delete-button'
import { deleteSignal } from './actions'

const STATUS_COLORS: Record<SignalStatus, string> = {
  draft: 'bg-slate-100 text-slate-600',
  reviewed: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
}

export default async function AdminSignalsPage() {
  const supabase = await createClient()

  const { data: signals } = await supabase
    .from('signals')
    .select('*, competitor:competitors(id, short_name), country:countries(id, name)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Signals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {(signals ?? []).length} signals
          </p>
        </div>
        <Link href="/admin/signals/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
          <Plus className="w-4 h-4" />
          New Signal
        </Link>
      </div>

      <div className="border rounded-xl bg-white overflow-hidden">
        {(!signals || signals.length === 0) ? (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No signals yet. Create your first one.
          </div>
        ) : (
          <div className="divide-y">
            {(signals as SignalWithRelations[]).map((signal) => (
              <div key={signal.id} className="flex items-center gap-2 px-5 py-4 hover:bg-secondary/40 transition-colors">
                <Link
                  href={`/admin/signals/${signal.id}/edit`}
                  className="flex-1 min-w-0 space-y-1"
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className={cn('text-xs', CATEGORY_COLORS[signal.category])}>
                      {CATEGORY_LABELS[signal.category]}
                    </Badge>
                    <Badge variant="secondary" className={cn('text-xs', IMPORTANCE_COLORS[signal.importance])}>
                      {IMPORTANCE_LABELS[signal.importance]}
                    </Badge>
                    <Badge variant="secondary" className={cn('text-xs', STATUS_COLORS[signal.status])}>
                      {signal.status}
                    </Badge>
                    {signal.competitor && (
                      <span className="text-xs text-muted-foreground">{signal.competitor.short_name}</span>
                    )}
                    {signal.country && (
                      <span className="text-xs text-muted-foreground">{signal.country.name}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium leading-snug truncate">{signal.headline}</p>
                </Link>
                <span className="text-xs text-muted-foreground shrink-0">
                  {signal.signal_date
                    ? format(new Date(signal.signal_date), 'MMM d')
                    : format(new Date(signal.created_at), 'MMM d')}
                </span>
                <DeleteButton
                  label="signal"
                  onDelete={async () => {
                    'use server'
                    await deleteSignal(signal.id)
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

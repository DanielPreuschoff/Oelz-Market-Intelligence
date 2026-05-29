import Link from 'next/link'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button-variants'
import { Badge } from '@/components/ui/badge'
import type { Edition, EditionStatus } from '@/types/database'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { DeleteButton } from '@/components/admin/delete-button'
import { deleteEdition } from './actions'

const STATUS_COLORS: Record<EditionStatus, string> = {
  draft: 'bg-slate-100 text-slate-600',
  review: 'bg-amber-100 text-amber-700',
  published: 'bg-green-100 text-green-700',
}

export default async function AdminEditionsPage() {
  const supabase = await createClient()

  const { data: editions } = await supabase
    .from('editions')
    .select('*')
    .order('period_month', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Editions</h1>
        <Link href="/admin/editions/new" className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}>
          <Plus className="w-4 h-4" />
          New Edition
        </Link>
      </div>

      <div className="border rounded-xl bg-white overflow-hidden">
        {(!editions || editions.length === 0) ? (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No editions yet. Create your first one.
          </div>
        ) : (
          <div className="divide-y">
            {(editions as Edition[]).map((edition) => (
              <div key={edition.id} className="flex items-center gap-3 px-5 py-4 hover:bg-secondary/40 transition-colors">
                <Link
                  href={`/admin/editions/${edition.id}`}
                  className="flex-1 min-w-0 space-y-0.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{edition.title}</span>
                    <Badge variant="secondary" className={cn('text-xs', STATUS_COLORS[edition.status])}>
                      {edition.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(edition.period_month), 'MMMM yyyy')}
                    {edition.published_at && ` · Published ${format(new Date(edition.published_at), 'MMM d, yyyy')}`}
                  </p>
                </Link>
                <DeleteButton
                  label="edition"
                  onDelete={async () => {
                    'use server'
                    await deleteEdition(edition.id)
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

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import type { Competitor } from '@/types/database'
import { cn } from '@/lib/utils'

const PRIORITY_COLORS = {
  high: 'bg-red-50 text-red-700 border-red-100',
  medium: 'bg-amber-50 text-amber-700 border-amber-100',
  low: 'bg-slate-50 text-slate-600 border-slate-100',
}

export default async function AdminCompetitorsPage() {
  const supabase = await createClient()

  const { data: competitors } = await supabase
    .from('competitors')
    .select('*')
    .order('watch_priority')
    .order('short_name')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Competitors</h1>

      <div className="border rounded-xl bg-white overflow-hidden">
        {(competitors ?? []).map((competitor: Competitor) => (
          <div
            key={competitor.id}
            className="flex items-center justify-between px-5 py-4 border-b last:border-b-0"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{competitor.short_name}</span>
                <Badge
                  variant="outline"
                  className={cn('text-xs capitalize', PRIORITY_COLORS[competitor.watch_priority])}
                >
                  {competitor.watch_priority}
                </Badge>
                {!competitor.active && (
                  <Badge variant="secondary" className="text-xs">Inactive</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {competitor.country_ids.join(', ')} · {competitor.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        To add or edit competitors, update the seed SQL or run a migration.
        Full competitor management UI coming in a future update.
      </p>
    </div>
  )
}

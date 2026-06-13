import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Competitor } from '@/types/database'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PRIORITY_COLORS = {
  high: 'bg-red-50 border-red-100',
  medium: 'bg-white',
  low: 'bg-white',
}

export default async function CompetitorsPage() {
  const supabase = await createClient()

  const { data: competitors } = await supabase
    .from('competitors')
    .select('*')
    .eq('active', true)
    .order('watch_priority')
    .order('short_name')

  // Get signal counts per competitor
  const competitorIds = (competitors ?? []).map((c: Competitor) => c.id)
  const { data: signalCounts } = competitorIds.length > 0
    ? await supabase
        .from('signals')
        .select('competitor_id')
        .in('competitor_id', competitorIds)
        .eq('status', 'published')
    : { data: [] }

  const countMap: Record<string, number> = {}
  ;(signalCounts ?? []).forEach((row: { competitor_id: string }) => {
    countMap[row.competitor_id] = (countMap[row.competitor_id] ?? 0) + 1
  })

  const grouped = {
    high: (competitors ?? []).filter((c: Competitor) => c.watch_priority === 'high'),
    medium: (competitors ?? []).filter((c: Competitor) => c.watch_priority === 'medium'),
    low: (competitors ?? []).filter((c: Competitor) => c.watch_priority === 'low'),
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-foreground">Wettbewerber-Profile</h1>
        <p className="text-sm text-muted-foreground">Aktive Wettbewerber im Backwaren- und Convenience-Segment — geordnet nach Beobachtungsintensität.</p>
      </div>

      {(['high', 'medium', 'low'] as const).map((priority) => {
        const list = grouped[priority]
        if (list.length === 0) return null
        return (
          <div key={priority} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {priority === 'high' ? 'Intensiv beobachtet' : priority === 'medium' ? 'Im Blick' : 'Auf dem Radar'}
            </h2>
            <div className="divide-y border rounded-xl overflow-hidden bg-white">
              {list.map((competitor: Competitor) => (
                <Link
                  key={competitor.id}
                  href={`/competitors/${competitor.id}`}
                  className={cn(
                    'flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors group',
                    PRIORITY_COLORS[competitor.watch_priority]
                  )}
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{competitor.short_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {competitor.country_ids.join(', ')}
                      {competitor.categories.length > 0 && ` · ${competitor.categories.slice(0, 3).join(', ')}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {countMap[competitor.id] ?? 0} Signale
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

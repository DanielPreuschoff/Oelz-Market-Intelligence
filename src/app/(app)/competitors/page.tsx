import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Competitor } from '@/types/database'
import { ChevronRight } from 'lucide-react'

/**
 * Wettbewerber-Übersicht — eine alphabetische Liste.
 *
 * Bis 14.09.2026 in drei Gruppen nach `watch_priority` („Intensiv beobachtet /
 * Im Blick / Auf dem Radar"). Ausgeblendet, weil die Stufe nichts steuert:
 * Der Monatslauf recherchiert jeden Wettbewerber gleich, und eine Gruppierung,
 * die keine Folgen hat, liest sich als Aussage über Wichtigkeit, die niemand
 * getroffen hat. Die Spalte bleibt in der Datenbank; ob sie zurückkommt,
 * entscheidet Kai beim Termin zum Hauptlauf (Agenda, 30.09./01.10.2026).
 */
export default async function CompetitorsPage() {
  const supabase = await createClient()

  const { data: competitors } = await supabase
    .from('competitors')
    .select('*')
    .eq('active', true)
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

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Wettbewerber-Profile</h1>
        <p className="text-sm text-muted-foreground">Aktive Wettbewerber im Backwaren- und Convenience-Segment — alphabetisch.</p>
      </div>

      <div className="divide-y border rounded-xl overflow-hidden bg-card">
        {((competitors ?? []) as Competitor[]).map((competitor) => (
          <Link
            key={competitor.id}
            href={`/competitors/${competitor.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors group"
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
}

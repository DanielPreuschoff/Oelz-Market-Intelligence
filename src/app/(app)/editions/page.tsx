export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import type { Edition } from '@/types/database'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { getModuleStats } from '@/lib/module-stats'
import { RadarKopf } from '@/components/wettbewerbsradar/koepfe'
import { EditionsBuehne, type BuehnenSignal } from '@/components/wettbewerbsradar/editions-buehne'

export default async function EditionsPage() {
  const supabase = await createClient()

  const { data: editions } = await supabase
    .from('editions')
    .select('*')
    .eq('status', 'published')
    .order('period_month', { ascending: false })

  const profile = await getCurrentProfile()
  const isAdmin = profile?.is_admin ?? false

  const editionIds = (editions ?? []).map((e: Edition) => e.id)
  const { data: counts } = editionIds.length > 0
    ? await supabase
        .from('edition_signals')
        .select('edition_id')
        .in('edition_id', editionIds)
    : { data: [] }

  const countMap: Record<string, number> = {}
  ;(counts ?? []).forEach((row: { edition_id: string }) => {
    countMap[row.edition_id] = (countMap[row.edition_id] ?? 0) + 1
  })

  if (!editions || editions.length === 0) {
    return (
      <div className="space-y-6">
        <RadarKopf isAdmin={isAdmin} />
        <div className="rounded-xl border bg-card py-16 text-center text-muted-foreground">
          <p className="text-sm font-medium">Noch keine Editionen veröffentlicht</p>
          <p className="mt-1 text-xs">
            {isAdmin ? 'Erstelle die erste Edition im Admin-Bereich.' : 'Neue Inhalte folgen in Kürze.'}
          </p>
        </div>
      </div>
    )
  }

  const [latest, ...archive] = editions as Edition[]

  // Stand und Neu-Zähler liegen per cache() schon aus dem Layout vor. Die
  // Signale der aktuellen Edition trägt die Bühne (kritische Signale und
  // Logoleiste) — nur die vier Spalten, die sie dafür braucht.
  const [stats, { data: latestRows }] = await Promise.all([
    getModuleStats(),
    supabase
      .from('edition_signals')
      .select('position, signal:signals(id, headline, importance, competitor:competitors(id, short_name, logo_url))')
      .eq('edition_id', latest.id)
      .order('position'),
  ])

  const latestSignale = ((latestRows ?? []) as unknown as { signal: BuehnenSignal | null }[])
    .map((r) => r.signal)
    .filter((s): s is BuehnenSignal => !!s)

  return (
    <div className="space-y-6">
      <RadarKopf stats={stats.wettbewerb} isAdmin={isAdmin} />
      <EditionsBuehne latest={latest} archive={archive} countMap={countMap} latestSignale={latestSignale} />
    </div>
  )
}

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { format, formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import type { Edition } from '@/types/database'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { ChevronRight } from 'lucide-react'

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
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Wettbewerbsradar</h1>
          {isAdmin && (
            <Link href="/admin/editions/new" className={cn(buttonVariants({ size: 'sm' }))}>
              Neue Edition
            </Link>
          )}
        </div>
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-lg font-medium">Noch keine Editions veröffentlicht</p>
          <p className="text-sm mt-1">
            {isAdmin ? 'Erstelle die erste Edition im Admin-Bereich.' : 'Neue Inhalte folgen in Kürze.'}
          </p>
        </div>
      </div>
    )
  }

  const [latest, ...archive] = editions as Edition[]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Wettbewerbsradar</h1>
        {isAdmin && (
          <Link href="/admin/editions/new" className={cn(buttonVariants({ size: 'sm' }))}>
            Neue Edition
          </Link>
        )}
      </div>

      {/* Aktuelle Edition — featured */}
      <Link href={`/editions/${latest.id}`} className="block group">
        <div className="border rounded-xl p-6 bg-card hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">Aktuelle Ausgabe</Badge>
            <span className="text-xs text-muted-foreground">
              {format(new Date(latest.period_month), 'MMMM yyyy', { locale: de })}
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors tracking-wide">
            {latest.title}
          </h2>
          {latest.editorial_summary && (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {latest.editorial_summary}
            </p>
          )}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-sm text-muted-foreground">
              {countMap[latest.id] ?? 0} Signale
            </span>
            {latest.published_at && (
              <span className="text-sm text-muted-foreground">
                vor {formatDistanceToNow(new Date(latest.published_at), { locale: de })}
              </span>
            )}
            <span className="ml-auto text-sm font-medium flex items-center gap-0.5 group-hover:gap-1 transition-all text-primary">
              Zur Edition <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>

      {/* Archiv */}
      {archive.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Archiv
          </h2>
          <div className="divide-y border rounded-xl bg-card overflow-hidden">
            {archive.map((edition: Edition) => (
              <Link
                key={edition.id}
                href={`/editions/${edition.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/40 transition-colors group"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{edition.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(edition.period_month), 'MMMM yyyy', { locale: de })} ·{' '}
                    {countMap[edition.id] ?? 0} Signale
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

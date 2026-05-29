import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignalCard } from '@/components/signal-card/signal-card'
import type { Competitor, SignalWithRelations, UserRole } from '@/types/database'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CompetitorDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: competitor }, { data: signals }, { data: profile }] = await Promise.all([
    supabase.from('competitors').select('*').eq('id', id).single(),
    supabase
      .from('signals')
      .select('*, competitor:competitors(*), country:countries(*)')
      .eq('competitor_id', id)
      .eq('status', 'published')
      .order('signal_date', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false }),
    supabase.from('user_profiles').select('role').single(),
  ])

  if (!competitor) notFound()

  const typedCompetitor = competitor as Competitor
  const userRole = (profile?.role ?? null) as UserRole | null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold">{typedCompetitor.short_name}</h1>
            <p className="text-sm text-muted-foreground">{typedCompetitor.name}</p>
          </div>
          <Badge variant="secondary" className="capitalize">
            {typedCompetitor.watch_priority} priority
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {typedCompetitor.country_ids.map((country) => (
            <span key={country} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
              {country}
            </span>
          ))}
          {typedCompetitor.categories.map((cat) => (
            <span key={cat} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
              {cat}
            </span>
          ))}
        </div>

        {typedCompetitor.description && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {typedCompetitor.description}
          </p>
        )}
      </div>

      {/* Signals */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold">
          Signals <span className="text-muted-foreground font-normal">({(signals ?? []).length})</span>
        </h2>
        {(!signals || signals.length === 0) ? (
          <div className="py-12 text-center text-muted-foreground text-sm border rounded-xl">
            No published signals for this competitor yet.
          </div>
        ) : (
          (signals as SignalWithRelations[]).map((signal) => (
            <SignalCard key={signal.id} signal={signal} highlightRole={userRole ?? undefined} />
          ))
        )}
      </div>
    </div>
  )
}

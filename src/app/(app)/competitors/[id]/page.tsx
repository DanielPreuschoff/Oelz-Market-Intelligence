import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SignalCard } from '@/components/signal-card/signal-card'
import type { Competitor, SignalWithRelations, UserRole } from '@/types/database'

const PRIORITY_LABELS: Record<string, string> = {
  high: 'Intensiv beobachtet',
  medium: 'Im Blick',
  low: 'Auf dem Radar',
}

const PRIORITY_BADGE_COLORS: Record<string, string> = {
  high: 'bg-red-50 text-red-700 border border-red-100',
  medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  low: 'bg-secondary text-muted-foreground border border-border/40',
}

const COUNTRY_NAMES: Record<string, string> = {
  AT: 'Österreich',
  DE: 'Deutschland',
  CH: 'Schweiz',
  CZ: 'Tschechien',
  SK: 'Slowakei',
  SI: 'Slowenien',
}

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
  const priority = typedCompetitor.watch_priority

  return (
    <div className="space-y-8">
      {/* Back-Link */}
      <Link
        href="/competitors"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Alle Wettbewerber
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">{typedCompetitor.short_name}</h1>
            <p className="text-sm text-muted-foreground">{typedCompetitor.name}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${PRIORITY_BADGE_COLORS[priority] ?? 'bg-secondary text-muted-foreground'}`}>
            {PRIORITY_LABELS[priority] ?? priority}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {typedCompetitor.country_ids.map((country) => (
            <span key={country} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
              {COUNTRY_NAMES[country] ?? country}
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

      {/* Signale */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold">
          Aktuelle Signale <span className="text-muted-foreground font-normal">({(signals ?? []).length})</span>
        </h2>
        {(!signals || signals.length === 0) ? (
          <div className="py-12 text-center text-muted-foreground text-sm border rounded-xl bg-white">
            <p className="font-medium">Noch keine Signale veröffentlicht</p>
            <p className="text-xs mt-1">Neue Signale erscheinen nach der nächsten Recherche.</p>
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

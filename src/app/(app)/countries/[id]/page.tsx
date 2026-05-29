import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignalCard } from '@/components/signal-card/signal-card'
import type { Country, SignalWithRelations, UserRole } from '@/types/database'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CountryDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: country }, { data: signals }, { data: profile }] = await Promise.all([
    supabase.from('countries').select('*').eq('id', id.toUpperCase()).single(),
    supabase
      .from('signals')
      .select('*, competitor:competitors(*), country:countries(*)')
      .eq('country_id', id.toUpperCase())
      .eq('status', 'published')
      .order('signal_date', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false }),
    supabase.from('user_profiles').select('role').single(),
  ])

  if (!country) notFound()

  const typedCountry = country as Country
  const userRole = (profile?.role ?? null) as UserRole | null

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-muted-foreground">
            {typedCountry.id}
          </span>
          <h1 className="text-3xl font-semibold">{typedCountry.name}</h1>
        </div>
        {typedCountry.market_context && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {typedCountry.market_context}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold">
          Signals <span className="text-muted-foreground font-normal">({(signals ?? []).length})</span>
        </h2>
        {(!signals || signals.length === 0) ? (
          <div className="py-12 text-center text-muted-foreground text-sm border rounded-xl">
            No published signals for this country yet.
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

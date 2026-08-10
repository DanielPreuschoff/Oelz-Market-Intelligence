import { createClient } from '@/lib/supabase/server'
import { SignalCard } from '@/components/signal-card/signal-card'
import type { SignalWithRelations, SignalCategory, UserRole } from '@/types/database'
import { CATEGORY_LABELS, ROLE_LABELS } from '@/types/database'
import { getCurrentProfile } from '@/lib/auth/current-profile'

interface PageProps {
  searchParams: Promise<{
    competitor?: string
    country?: string
    category?: string
    role?: string
    q?: string
  }>
}

export default async function SignalsPage({ searchParams }: PageProps) {
  const filters = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('signals')
    .select('*, competitor:competitors(*), country:countries(*)')
    .eq('status', 'published')
    .order('signal_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(100)

  if (filters.competitor) query = query.eq('competitor_id', filters.competitor)
  if (filters.country) query = query.eq('country_id', filters.country)
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.role) query = query.contains('role_relevance', [filters.role])
  if (filters.q) query = query.textSearch('fts_vector', filters.q)

  const { data: signals } = await query

  const [{ data: competitors }, { data: countries }, profile] = await Promise.all([
    supabase.from('competitors').select('id, short_name').eq('active', true).order('short_name'),
    supabase.from('countries').select('id, name').eq('active', true).order('name'),
    getCurrentProfile(),
  ])

  const userRole = (profile?.role ?? null) as UserRole | null

  const ROLES = Object.keys(ROLE_LABELS) as UserRole[]
  const CATEGORIES = Object.keys(CATEGORY_LABELS) as SignalCategory[]

  function buildUrl(newFilters: Record<string, string | undefined>) {
    const merged = { ...filters, ...newFilters }
    const params = new URLSearchParams()
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v) })
    const str = params.toString()
    return `/signals${str ? `?${str}` : ''}`
  }

  function toggleFilter(key: string, value: string) {
    return buildUrl({ [key]: filters[key as keyof typeof filters] === value ? undefined : value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Signal Library</h1>
        <span className="text-sm text-muted-foreground">
          {(signals ?? []).length} signals
        </span>
      </div>

      {/* Filter bar */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-16">Category</span>
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={toggleFilter('category', cat)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.category === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-16">Role</span>
          {ROLES.map((role) => (
            <a
              key={role}
              href={toggleFilter('role', role)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.role === role
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {ROLE_LABELS[role]}
            </a>
          ))}
          {userRole && filters.role !== userRole && (
            <a
              href={toggleFilter('role', userRole)}
              className="text-xs px-2.5 py-1 rounded-full border border-dashed border-primary/40 text-primary/70 hover:border-primary hover:text-primary transition-colors"
            >
              My role
            </a>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-16">Competitor</span>
          {(competitors ?? []).map((c) => (
            <a
              key={c.id}
              href={toggleFilter('competitor', c.id)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.competitor === c.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {c.short_name}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-16">Country</span>
          {(countries ?? []).map((c) => (
            <a
              key={c.id}
              href={toggleFilter('country', c.id)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.country === c.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {c.name}
            </a>
          ))}
        </div>

        {(filters.category || filters.role || filters.competitor || filters.country) && (
          <a
            href="/signals"
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Clear all filters
          </a>
        )}
      </div>

      {/* Signals */}
      {(!signals || signals.length === 0) ? (
        <div className="py-16 text-center text-muted-foreground text-sm">
          No signals match the current filters.
        </div>
      ) : (
        <div className="space-y-4">
          {(signals as SignalWithRelations[]).map((signal) => (
            <SignalCard key={signal.id} signal={signal} highlightRole={userRole ?? undefined} />
          ))}
        </div>
      )}
    </div>
  )
}

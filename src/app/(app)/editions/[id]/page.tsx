import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SignalCard } from '@/components/signal-card/signal-card'
import type { EditionWithSignals, UserRole } from '@/types/database'
import { CATEGORY_LABELS } from '@/types/database'

const PAGE_SIZE = 20

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ role?: string; category?: string; competitor?: string; page?: string }>
}

export default async function EditionPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { role: roleFilter, category: categoryFilter, competitor: competitorFilter, page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const supabase = await createClient()

  const { data: edition } = await supabase
    .from('editions')
    .select(`
      *,
      edition_signals (
        *,
        signal:signals (
          *,
          competitor:competitors (*),
          country:countries (*)
        )
      )
    `)
    .eq('id', id)
    .single()

  if (!edition) notFound()

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, is_admin')
    .single()

  const userRole = (profile?.role ?? null) as UserRole | null

  const sortedSignalRows = (edition as EditionWithSignals).edition_signals
    .sort((a, b) => a.position - b.position)

  // Apply filters
  const filteredRows = sortedSignalRows.filter((row) => {
    const signal = row.signal
    if (roleFilter && !signal.role_relevance.includes(roleFilter as UserRole)) return false
    if (categoryFilter && signal.category !== categoryFilter) return false
    if (competitorFilter && signal.competitor_id !== competitorFilter) return false
    return true
  })

  // Collect unique categories, competitors and countries present in this edition
  const categories = [...new Set(sortedSignalRows.map((r) => r.signal.category))]

  const competitorMap = new Map<string, string>()
  sortedSignalRows.forEach((r) => {
    if (r.signal.competitor) competitorMap.set(r.signal.competitor.id, r.signal.competitor.short_name)
  })

  const hasFilters = roleFilter || categoryFilter || competitorFilter
  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE)
  const paginatedRows = filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function buildUrl(patch: Record<string, string | undefined>) {
    const current = { role: roleFilter, category: categoryFilter, competitor: competitorFilter, page: pageParam }
    const merged = { ...current, ...patch }
    const params = new URLSearchParams()
    Object.entries(merged).forEach(([k, v]) => { if (v && !(k === 'page' && v === '1')) params.set(k, v) })
    const str = params.toString()
    return `/editions/${id}${str ? `?${str}` : ''}`
  }

  function toggle(key: string, value: string) {
    const current = { role: roleFilter, category: categoryFilter, competitor: competitorFilter }
    // Reset to page 1 when changing filters
    return buildUrl({ [key]: current[key as keyof typeof current] === value ? undefined : value, page: '1' })
  }

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/editions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Editions
      </Link>

      {/* Edition header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{format(new Date(edition.period_month), 'MMMM yyyy')}</span>
          <span>·</span>
          <span>{sortedSignalRows.length} signals</span>
          {edition.published_at && (
            <>
              <span>·</span>
              <span>Published {format(new Date(edition.published_at), 'MMM d, yyyy')}</span>
            </>
          )}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-foreground leading-tight">{edition.title}</h1>
        {edition.editorial_summary && (
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            {edition.editorial_summary}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-2">
        {/* Category */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-16">Category</span>
          {categories.map((cat) => (
            <a
              key={cat}
              href={toggle('category', cat)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                categoryFilter === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </a>
          ))}
        </div>

        {/* Competitor */}
        {competitorMap.size > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground font-medium w-16">Competitor</span>
            {[...competitorMap.entries()].map(([cid, name]) => (
              <a
                key={cid}
                href={toggle('competitor', cid)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  competitorFilter === cid
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                {name}
              </a>
            ))}
          </div>
        )}

        {hasFilters && (
          <a
            href={`/editions/${id}`}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Clear all filters
          </a>
        )}
      </div>

      {/* Signal cards */}
      {filteredRows.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No signals match the current filters.
        </p>
      ) : (
        <div className="space-y-4">
          {paginatedRows.map((row) => (
            <SignalCard
              key={row.id}
              signal={row.signal}
              highlightRole={userRole ?? undefined}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredRows.length)} von {filteredRows.length} Signals
          </span>
          <div className="flex items-center gap-1">
            {currentPage > 1 && (
              <Link
                href={buildUrl({ page: String(currentPage - 1) })}
                className="px-3 py-1.5 text-xs rounded-md border hover:bg-secondary transition-colors"
              >
                ← Zurück
              </Link>
            )}
            <span className="px-3 py-1.5 text-xs text-muted-foreground">
              Seite {currentPage} / {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={buildUrl({ page: String(currentPage + 1) })}
                className="px-3 py-1.5 text-xs rounded-md border hover:bg-secondary transition-colors"
              >
                Weiter →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

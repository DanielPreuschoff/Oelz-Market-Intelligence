import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { EditionWithSignals, UserRole } from '@/types/database'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { EditionKopf } from '@/components/wettbewerbsradar/koepfe'
import { SignalZeile } from '@/components/wettbewerbsradar/signal-zeile'
import {
  EditionFilter,
  EditionBlaettern,
  KeineSignale,
} from '@/components/wettbewerbsradar/edition-filter'

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

  const profile = await getCurrentProfile()
  const userRole = (profile?.role ?? null) as UserRole | null

  const sortedSignalRows = (edition as EditionWithSignals).edition_signals
    .sort((a, b) => a.position - b.position)

  const filteredRows = sortedSignalRows.filter((row) => {
    const signal = row.signal
    if (roleFilter && !signal.role_relevance.includes(roleFilter as UserRole)) return false
    if (categoryFilter && signal.category !== categoryFilter) return false
    if (competitorFilter && signal.competitor_id !== competitorFilter) return false
    return true
  })

  const categories = [...new Set(sortedSignalRows.map((r) => r.signal.category))]

  const competitorMap = new Map<string, string>()
  sortedSignalRows.forEach((r) => {
    if (r.signal.competitor) competitorMap.set(r.signal.competitor.id, r.signal.competitor.short_name)
  })

  const hasFilters = !!(roleFilter || categoryFilter || competitorFilter)
  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE)
  const paginatedRows = filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const kritischAnzahl = sortedSignalRows.filter((r) => r.signal.importance === '3').length

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
    return buildUrl({ [key]: current[key as keyof typeof current] === value ? undefined : value, page: '1' })
  }

  return (
    <div className="space-y-6">
      <EditionKopf edition={edition} signalAnzahl={sortedSignalRows.length} kritischAnzahl={kritischAnzahl} />

      <EditionFilter
        categories={categories}
        competitorMap={competitorMap}
        aktiveKategorie={categoryFilter}
        aktiverWettbewerber={competitorFilter}
        trefferAnzahl={filteredRows.length}
        hatFilter={hasFilters}
        toggle={toggle}
        resetHref={`/editions/${id}`}
      />

      {/* Eine Lesespalte in Redaktionsreihenfolge — die Edition ist eine
          Ausgabe und wird von oben nach unten gelesen. Mehrspaltig wäre die
          Reihenfolge nur noch zeilenweise erkennbar. */}
      {filteredRows.length === 0 ? (
        <KeineSignale resetHref={`/editions/${id}`} />
      ) : (
        <div className="space-y-4">
          {paginatedRows.map((row) => (
            <SignalZeile key={row.id} signal={row.signal} highlightRole={userRole ?? undefined} />
          ))}
        </div>
      )}

      <EditionBlaettern
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={PAGE_SIZE}
        gesamt={filteredRows.length}
        buildUrl={buildUrl}
      />
    </div>
  )
}

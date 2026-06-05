import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ImpulseCard } from '@/components/impulse-card'
import { RADAR_TYPES, IMPULSE_TAGS, type InnovationImpulse } from '@/types/innovation'

const PAGE_SIZE = 9

interface PageProps {
  searchParams: Promise<{ type?: string; tag?: string; q?: string; page?: string }>
}

export default async function ProduktRadarPage({ searchParams }: PageProps) {
  const { type: typeFilter, tag: tagFilter, q: search, page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
  const supabase = await createClient()

  let query = supabase
    .from('innovation_impulses')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (typeFilter) query = query.eq('radar_type', typeFilter)
  if (tagFilter) query = query.contains('tags', [tagFilter])

  const { data: impulses } = await query

  const filtered = (impulses ?? []).filter((imp: InnovationImpulse) => {
    if (!search) return true
    const q = search.toLowerCase()
    return imp.title.toLowerCase().includes(q) ||
           (imp.short_signal ?? '').toLowerCase().includes(q)
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function buildUrl(patch: Record<string, string | undefined>) {
    const current = { type: typeFilter, tag: tagFilter, q: search, page: pageParam }
    const merged = { ...current, ...patch }
    const params = new URLSearchParams()
    Object.entries(merged).forEach(([k, v]) => { if (v && !(k === 'page' && v === '1')) params.set(k, v) })
    const str = params.toString()
    return `/produkt-radar${str ? `?${str}` : ''}`
  }

  function toggleFilter(key: string, value: string) {
    const current = { type: typeFilter, tag: tagFilter }
    return buildUrl({ [key]: current[key as keyof typeof current] === value ? undefined : value, page: '1' })
  }

  const hasFilters = typeFilter || tagFilter || search

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Produkt- & Innovationsradar</h1>
        <p className="text-sm text-muted-foreground">
          Kuratiertes Scouting für neue Backwarenformate, Claims, Rezepturideen und Handelsadaptionen — übersetzt in konkrete Prüffragen für die Ölz Produktentwicklung.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-2.5">
        {/* Search */}
        <form action="/produkt-radar" method="get">
          {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
          {tagFilter && <input type="hidden" name="tag" value={tagFilter} />}
          <input
            name="q"
            defaultValue={search ?? ''}
            placeholder="Impulse durchsuchen…"
            className="h-8 w-full max-w-xs rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </form>

        {/* Radar type filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-10">Typ</span>
          {RADAR_TYPES.map((type) => (
            <a
              key={type}
              href={toggleFilter('type', type)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                typeFilter === type
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {type}
            </a>
          ))}
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground font-medium w-10">Tags</span>
          {IMPULSE_TAGS.map((tag) => (
            <a
              key={tag}
              href={toggleFilter('tag', tag)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                tagFilter === tag
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {tag}
            </a>
          ))}
        </div>

        {hasFilters && (
          <a href="/produkt-radar" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
            Filter zurücksetzen
          </a>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground text-sm">Keine Impulse gefunden.</div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((impulse: InnovationImpulse) => (
              <ImpulseCard key={impulse.id} impulse={impulse} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-xs text-muted-foreground">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} von {filtered.length} Impulsen
              </span>
              <div className="flex items-center gap-1">
                {currentPage > 1 && (
                  <Link href={buildUrl({ page: String(currentPage - 1) })} className="px-3 py-1.5 text-xs rounded-md border hover:bg-secondary transition-colors">
                    ← Zurück
                  </Link>
                )}
                <span className="px-3 py-1.5 text-xs text-muted-foreground">
                  Seite {currentPage} / {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link href={buildUrl({ page: String(currentPage + 1) })} className="px-3 py-1.5 text-xs rounded-md border hover:bg-secondary transition-colors">
                    Weiter →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

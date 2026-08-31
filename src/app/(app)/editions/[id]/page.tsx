import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { SignalWithRelations, UserRole } from '@/types/database'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { EditionKopf } from '@/components/wettbewerbsradar/koepfe'
import { SignalZeile } from '@/components/wettbewerbsradar/signal-zeile'
import {
  EditionFilter,
  EditionBlaettern,
  KeineSignale,
} from '@/components/wettbewerbsradar/edition-filter'

const PAGE_SIZE = 20

/**
 * Form des Abfrageergebnisses — nicht die ganze Tabellenzeile.
 *
 * Seit die Abfrage ausdrueckliche Spalten listet, waere `EditionWithSignals`
 * eine Luege: Der Typ verspricht Felder, die gar nicht geladen werden. Dieser
 * Typ beschreibt, was wirklich ankommt; faellt spaeter eine Spalte aus der
 * Abfrage, meldet die Typpruefung es an der Verwendungsstelle.
 */
interface EditionsZeile {
  id: string
  title: string
  period_month: string
  editorial_summary: string | null
  published_at: string | null
  status: string
  edition_signals: {
    id: string
    position: number
    signal: SignalWithRelations | null
  }[]
}

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ role?: string; category?: string; competitor?: string; page?: string }>
}

export default async function EditionPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { role: roleFilter, category: categoryFilter, competitor: competitorFilter, page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const supabase = await createClient()

  // Ausdrueckliche Spaltenliste statt `*`.
  //
  // Mit `*` kam bei jedem der bis zu 45 Signale auch `fts_vector` mit — der
  // Volltext-Suchindex, ungefaehr so gross wie der Signaltext selbst und im
  // Browser nie sichtbar. Er steht nicht einmal im TypeScript-Typ. Dazu
  // Zeitstempel und Redaktionsfelder, die diese Ansicht nicht liest.
  //
  // Die Liste bildet genau ab, was EditionKopf, SignalZeile und die Filter
  // hier verwenden. Braucht die Ansicht spaeter ein weiteres Feld, gehoert es
  // hierher — ein fehlendes Feld faellt sofort auf, ein ueberfluessiges nie.
  const { data: edition } = await supabase
    .from('editions')
    .select(`
      id, title, period_month, editorial_summary, published_at, status,
      edition_signals (
        id, position,
        signal:signals (
          id, headline, summary, category, importance, role_relevance,
          signal_date, source_name, source_url, ai_generated, competitor_id,
          competitor:competitors ( id, short_name, logo_url ),
          country:countries ( id, name )
        )
      )
    `)
    .eq('id', id)
    .single()

  if (!edition) notFound()

  const profile = await getCurrentProfile()
  const userRole = (profile?.role ?? null) as UserRole | null

  // Ein Verweis kann ins Leere zeigen: die Verknuepfungszeilen in
  // `edition_signals` sind fuer alle Angemeldeten lesbar, die Signale dahinter
  // nicht (RLS laesst nur veroeffentlichte durch). PostgREST liefert die Zeile
  // dann mit `signal: null`. Die Editionsuebersicht filtert das seit jeher weg,
  // die Detailseite tat es nicht und stuerzte in `signal.category` ab.
  const sortedSignalRows = ((edition as unknown as EditionsZeile).edition_signals ?? [])
    // Typpraedikat statt einfachem Filter: Danach weiss TypeScript, dass
    // `signal` gesetzt ist, und alle Zugriffe darunter sind geprueft. Der
    // frueher verwendete Typ `EditionWithSignals` behauptete, `signal` sei nie
    // leer — deshalb fiel der Absturz vom 31.08.2026 in der Typpruefung nicht
    // auf, sondern erst in der Produktion.
    .filter((row): row is typeof row & { signal: SignalWithRelations } => !!row.signal)
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

import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/server'
import { IngredientSignalGrid } from '@/components/ingredient-signal/ingredient-signal-grid'
import { STRATEGIC_THEMES } from '@/types/strategic-themes'
import {
  INGREDIENT_FUNCTIONS,
  MATURITY_LEVELS,
  isNewSignal,
  type IngredientSignal,
} from '@/types/ingredient-signals'

interface PageProps {
  searchParams: Promise<{
    funktion?: string
    thema?: string
    reifegrad?: string
    q?: string
    signal?: string
  }>
}

export default async function RohstoffRadarPage({ searchParams }: PageProps) {
  const {
    funktion: functionFilter,
    thema: themeFilter,
    reifegrad: maturityFilter,
    q: search,
    signal: openId,
  } = await searchParams

  const supabase = await createClient()

  // Ausrollstufe: das Modul ist vorerst nur für Admins erreichbar.
  // notFound() statt redirect, damit die Route für andere Nutzer nicht einmal
  // als existierend erkennbar ist. Zum Freischalten diesen Block entfernen und
  // `adminOnly` in src/lib/modules.ts streichen — siehe Spec, „Ausrollstufe".
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user?.id ?? '')
    .maybeSingle()
  if (!profile?.is_admin) notFound()

  let query = supabase
    .from('ingredient_signals')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })

  // Filter laufen in Postgres — die Indizes dafür liegen in Migration 007.
  if (functionFilter) query = query.contains('functions', [functionFilter])
  if (themeFilter) query = query.eq('strategic_theme', themeFilter)
  if (maturityFilter) query = query.eq('maturity', maturityFilter)

  const [{ data }, { data: allPublishedDates }] = await Promise.all([
    query,
    // Stand und Neu-Zähler beschreiben die letzte Erhebung und damit das
    // gesamte Modul — nicht die gefilterte Auswahl. Deshalb eine eigene,
    // filterfreie Abfrage über nur eine Spalte.
    supabase.from('ingredient_signals').select('published_at').eq('status', 'published'),
  ])

  const signals = (data ?? []) as IngredientSignal[]
  const published = allPublishedDates ?? []

  // Ein geteilter Link muss sein Signal auch dann öffnen, wenn die aktive
  // Filterauswahl es aus der Kachelliste ausschließt.
  let openSignal = openId ? signals.find((s) => s.id === openId) ?? null : null
  if (openId && !openSignal) {
    const { data: single } = await supabase
      .from('ingredient_signals')
      .select('*')
      .eq('id', openId)
      .eq('status', 'published')
      .maybeSingle()
    openSignal = (single as IngredientSignal | null) ?? null
  }

  const filtered = signals.filter((s) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      s.title.toLowerCase().includes(q) ||
      s.subject_name.toLowerCase().includes(q) ||
      (s.what_is_new ?? '').toLowerCase().includes(q)
    )
  })

  const hasFilters = !!(functionFilter || themeFilter || maturityFilter || search)
  const moduleIsEmpty = published.length === 0
  const stand = maxPublishedAt(published)
  const newCount = published.filter((s) => isNewSignal(s, stand)).length

  function buildUrl(patch: Record<string, string | undefined>) {
    const merged: Record<string, string | undefined> = {
      funktion: functionFilter,
      thema: themeFilter,
      reifegrad: maturityFilter,
      q: search,
      ...patch,
    }
    const params = new URLSearchParams()
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    const str = params.toString()
    return `/rohstoff-radar${str ? `?${str}` : ''}`
  }

  function toggleFilter(key: 'funktion' | 'thema' | 'reifegrad', value: string) {
    const current = { funktion: functionFilter, thema: themeFilter, reifegrad: maturityFilter }
    return buildUrl({ [key]: current[key] === value ? undefined : value })
  }

  const filterRows: {
    key: 'funktion' | 'thema' | 'reifegrad'
    label: string
    options: readonly string[]
    active?: string
  }[] = [
    { key: 'funktion', label: 'Funktion', options: INGREDIENT_FUNCTIONS, active: functionFilter },
    { key: 'thema', label: 'Thema', options: STRATEGIC_THEMES, active: themeFilter },
    { key: 'reifegrad', label: 'Reifegrad', options: MATURITY_LEVELS, active: maturityFilter },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Rohstoff-Radar</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Rohstoffe, Ingredients, Technologien und Verfahren mit strategischer Bedeutung für
          Produktentwicklung und Portfolio.
        </p>
        {stand && (
          <p className="text-xs text-muted-foreground pt-1">
            Zuletzt aktualisiert: {format(new Date(stand), 'd. MMMM yyyy', { locale: de })}
            <span className="mx-2">·</span>
            <span className={newCount > 0 ? 'font-semibold text-foreground' : undefined}>
              {newCount} {newCount === 1 ? 'neues Signal' : 'neue Signale'}
            </span>
          </p>
        )}
      </div>

      {!moduleIsEmpty && (
        <div className="space-y-2.5">
          <form action="/rohstoff-radar" method="get">
            {functionFilter && <input type="hidden" name="funktion" value={functionFilter} />}
            {themeFilter && <input type="hidden" name="thema" value={themeFilter} />}
            {maturityFilter && <input type="hidden" name="reifegrad" value={maturityFilter} />}
            <input
              name="q"
              defaultValue={search ?? ''}
              placeholder="Rohstoffsignale durchsuchen…"
              className="h-8 w-full max-w-xs rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </form>

          {filterRows.map((row) => (
            <div key={row.key} className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-muted-foreground font-medium w-20">{row.label}</span>
              {row.options.map((option) => (
                <a
                  key={option}
                  href={toggleFilter(row.key, option)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    row.active === option
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:bg-secondary'
                  }`}
                >
                  {option}
                </a>
              ))}
            </div>
          ))}

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? 'Signal' : 'Signale'} gefunden
            </span>
            {hasFilters && (
              <a
                href="/rohstoff-radar"
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Alle Filter zurücksetzen
              </a>
            )}
          </div>
        </div>
      )}

      {moduleIsEmpty ? (
        <div className="py-16 text-center border rounded-xl bg-white text-muted-foreground">
          <p className="font-medium text-sm">Noch keine Rohstoffsignale veröffentlicht</p>
          <p className="text-xs mt-1">
            Die erste Erhebung steht noch aus. Sobald Signale freigegeben sind, erscheinen sie hier.
          </p>
        </div>
      ) : filtered.length === 0 && !openSignal ? (
        <div className="py-16 text-center border rounded-xl bg-white text-muted-foreground">
          <p className="font-medium text-sm">Keine Signale für diese Auswahl</p>
          <p className="text-xs mt-1">Passe die Filter an oder setze sie zurück.</p>
        </div>
      ) : (
        <IngredientSignalGrid signals={filtered} stand={stand} openSignal={openSignal} />
      )}
    </div>
  )
}

/** Der Stand des Moduls: jüngstes published_at. Vergleich über Zeitwerte, nicht
 *  über Zeichenketten — ISO-Strings mit abweichendem Offset sortieren sonst falsch. */
function maxPublishedAt(rows: { published_at: string | null }[]): string | null {
  let latest: string | null = null
  let latestMs = -Infinity
  for (const row of rows) {
    if (!row.published_at) continue
    const ms = Date.parse(row.published_at)
    if (Number.isNaN(ms) || ms <= latestMs) continue
    latest = row.published_at
    latestMs = ms
  }
  return latest
}

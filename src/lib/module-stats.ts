import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth/current-profile'
import { NEW_WINDOW_DAYS, isCollectionRecent } from '@/types/ingredient-signals'

/**
 * Bestand und Aktualität je Modul — für die Kacheln auf der Startseite und die
 * Zähler in der Modulnavigation.
 *
 * Bisher war beides stumm: die Übersicht zeigte, welche Module es gibt, aber
 * nicht, ob seit dem letzten Besuch etwas passiert ist. Genau das ist die
 * Frage, mit der jemand die Seite öffnet.
 *
 * Zwei Zahlen, zwei Begriffe (Glossar):
 *
 * **Neu** misst wie im Rohstoff-Radar gegen den **Stand des Moduls**, nicht
 * gegen heute — sonst wäre der Zähler nach einer Erhebungspause still null,
 * obwohl die Kachel weiterhin ein Standdatum zeigt. Ob überhaupt etwas als neu
 * gilt, entscheidet dagegen `isCollectionRecent` gegen heute. Neu ist für alle
 * gleich: es beschreibt die jüngste Erhebung, nicht den Leser.
 *
 * **Ungesehen** misst gegen den **Lesestand des Nutzers** (`module_visits`):
 * alles, was nach seinem letzten Besuch des Moduls veröffentlicht wurde, ohne
 * Zeitgrenze — wer drei Monate fort war, sieht drei Erhebungen. Ohne
 * Lesestand (neuer Nutzer, Bestandsnutzer vor dem ersten Besuch) gilt
 * ungesehen = neu, damit der Einstieg die aktuelle Erhebung zeigt und nicht
 * den Gesamtbestand. Entscheidung: ADR 0005.
 */
export interface ModuleStats {
  /** Veröffentlichte Einträge insgesamt. */
  total: number
  /** Jüngstes Veröffentlichungsdatum, ISO. Null, wenn das Modul leer ist. */
  stand: string | null
  /** Neu: Einträge innerhalb des Neu-Fensters vor dem Stand. Für alle gleich. */
  newCount: number
  /** Ungesehen: seit dem letzten Besuch dieses Nutzers veröffentlicht. */
  unseenCount: number
  /** Benennung der Einheit — ein Modul zählt Signale, ein anderes Studien. */
  unit: { one: string; many: string }
}

/** Lesestand je Modul als Epoche-Millisekunden; fehlt das Modul, gibt es keinen. */
type Lesestand = Map<string, number>

/**
 * Module, deren Einträge unmittelbar in einer Tabelle stehen. Welches Datum
 * das Erscheinen markiert, ist bewusst nicht überall `published_at`: Impulse
 * und Studien führen keines, dort ist die Aufnahme in die Plattform das
 * maßgebliche Ereignis. Bei Studien wäre `date_published` das Datum der Studie
 * selbst — die kann Jahre alt sein und würde jede frisch eingestellte Studie
 * sofort als alt ausweisen.
 */
const SOURCES: {
  moduleId: string
  table: string
  dateColumn: string
  unit: { one: string; many: string }
}[] = [
  { moduleId: 'produkt', table: 'innovation_impulses', dateColumn: 'created_at', unit: { one: 'Impuls', many: 'Impulse' } },
  { moduleId: 'rohstoff', table: 'ingredient_signals', dateColumn: 'published_at', unit: { one: 'Signal', many: 'Signale' } },
  { moduleId: 'studien', table: 'studies', dateColumn: 'created_at', unit: { one: 'Studie', many: 'Studien' } },
]

const EMPTY: Omit<ModuleStats, 'unit'> = { total: 0, stand: null, newCount: 0, unseenCount: 0 }

/** Ungesehen: nach dem Lesestand veröffentlicht — oder, ohne Lesestand, neu. */
function unseen(dateMs: number[], lastSeenMs: number | undefined, newCount: number): number {
  if (lastSeenMs === undefined) return newCount
  return dateMs.filter((ms) => ms > lastSeenMs).length
}

function summarise(
  dates: (string | null)[],
  unit: ModuleStats['unit'],
  lastSeenMs: number | undefined
): ModuleStats {
  const valid = dates.filter((d): d is string => !!d).map(Date.parse).filter(Number.isFinite)
  if (valid.length === 0) return { ...EMPTY, total: dates.length, unit }

  const standMs = Math.max(...valid)
  const windowMs = NEW_WINDOW_DAYS * 86_400_000
  const stand = new Date(standMs).toISOString()
  // Liegt die letzte Erhebung selbst länger zurück als das Fenster, ist
  // nichts mehr neu. Ohne diese Bedingung zählte der jüngste Eintrag immer
  // mit — sein Abstand zum Stand ist null — und das Abzeichen bliebe ewig
  // stehen. Siehe isCollectionRecent.
  const newCount = isCollectionRecent(stand) ? valid.filter((ms) => standMs - ms <= windowMs).length : 0
  return {
    total: dates.length,
    stand,
    newCount,
    unseenCount: unseen(valid, lastSeenMs, newCount),
    unit,
  }
}

/**
 * Das Wettbewerbsradar zählt anders als die übrigen Module.
 *
 * Seine Einträge sind Signale, ausgeliefert werden sie aber gebündelt als
 * monatliche Edition. Zählte man die Editionen selbst, stünde bei monatlichem
 * Rhythmus dauerhaft „2 neu" da — das 30-Tage-Fenster fängt immer die aktuelle
 * und die vorherige Ausgabe ein. Die Zahl wäre technisch richtig und trotzdem
 * ohne Aussage.
 *
 * Deshalb: Stand ist die Veröffentlichung der jüngsten Edition, „neu" sind die
 * Signale, die mit ihr dazukamen, und der Bestand sind alle Signale aus
 * veröffentlichten Editionen. Damit bedeutet die Zahl hier dasselbe wie im
 * Rohstoff-Radar — Signale, nicht Behälter.
 */
interface WettbewerbRoh {
  editions: { id: string; published_at: string | null }[]
  memberships: { edition_id: string }[]
}

/** Beide Abfragen laufen nebeneinander; zugeordnet wird erst in competitorStats. */
async function ladeWettbewerbRoh(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<WettbewerbRoh> {
  const [{ data: editions }, { data: memberships }] = await Promise.all([
    supabase.from('editions').select('id, published_at').eq('status', 'published'),
    supabase.from('edition_signals').select('edition_id'),
  ])
  return {
    editions: (editions ?? []) as WettbewerbRoh['editions'],
    memberships: (memberships ?? []) as WettbewerbRoh['memberships'],
  }
}

function competitorStats(
  { editions, memberships }: WettbewerbRoh,
  lastSeenMs: number | undefined
): ModuleStats {
  const unit = { one: 'Signal', many: 'Signale' }

  const published = editions
  if (published.length === 0) return { ...EMPTY, unit }

  const perEdition = new Map<string, number>()
  for (const row of memberships) {
    perEdition.set(row.edition_id, (perEdition.get(row.edition_id) ?? 0) + 1)
  }

  // Nur Signale aus veröffentlichten Editionen — Entwürfe sieht niemand.
  const total = published.reduce((sum, e) => sum + (perEdition.get(e.id) ?? 0), 0)

  const dated = published.filter((e) => !!e.published_at)
  if (dated.length === 0) return { ...EMPTY, total, unit }

  const newest = dated.reduce((a, b) =>
    Date.parse(b.published_at!) > Date.parse(a.published_at!) ? b : a
  )
  const stand = new Date(Date.parse(newest.published_at!)).toISOString()
  const newCount = isCollectionRecent(stand) ? perEdition.get(newest.id) ?? 0 : 0

  // Ungesehen sind die Signale aller Editionen, die nach dem letzten Besuch
  // erschienen sind — die Edition ist die Einheit der Veröffentlichung, das
  // Signal die Einheit der Zählung.
  const unseenCount =
    lastSeenMs === undefined
      ? newCount
      : dated
          .filter((e) => Date.parse(e.published_at!) > lastSeenMs)
          .reduce((sum, e) => sum + (perEdition.get(e.id) ?? 0), 0)

  return { total, stand, newCount, unseenCount, unit }
}

/**
 * Lesestand des angemeldeten Nutzers je Modul. RLS liefert ohnehin nur seine
 * Zeilen; der Filter auf die eigene ID steht trotzdem, damit die Abfrage auch
 * dann nur das Eigene liest, wenn eine Policy einmal weiter gefasst ist.
 * Fehlt die Tabelle noch (Migration 010 nicht eingespielt), ist das Ergebnis
 * leer — dann gilt überall ungesehen = neu, wie vor der Einführung.
 */
async function ladeLesestand(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<Lesestand> {
  const user = await getCurrentUser()
  if (!user) return new Map()
  const { data } = await supabase
    .from('module_visits')
    .select('module_id, last_seen_at')
    .eq('user_id', user.id)
  const map: Lesestand = new Map()
  for (const row of (data ?? []) as { module_id: string; last_seen_at: string }[]) {
    const ms = Date.parse(row.last_seen_at)
    if (Number.isFinite(ms)) map.set(row.module_id, ms)
  }
  return map
}

/**
 * Alle Module in einem Rutsch. Die Abfragen laufen parallel, kosten zusammen
 * also eine Netzwerkrunde. Gelesen wird je Modul nur eine Spalte — die
 * Zeilenzahl ist dreistellig, die Datenmenge damit vernachlässigbar.
 *
 * Module, die der Nutzer nicht sehen darf, liefern durch RLS eine leere Menge
 * und erscheinen als leer. Das ist richtig so: die Kachel wird für ihn ohnehin
 * ausgeblendet.
 */
export const getModuleStats = cache(async (): Promise<Record<string, ModuleStats>> => {
  const supabase = await createClient()

  // Der Lesestand läuft parallel zu den Modulabfragen; zusammengeführt wird
  // erst danach, damit keine Abfrage auf eine andere wartet.
  const [lesestand, wettbewerbRoh, ...rest] = await Promise.all([
    ladeLesestand(supabase),
    ladeWettbewerbRoh(supabase),
    ...SOURCES.map(({ table, dateColumn }) =>
      supabase.from(table).select(dateColumn).eq('status', 'published')
    ),
  ])

  const stats: Record<string, ModuleStats> = {
    wettbewerb: competitorStats(wettbewerbRoh, lesestand.get('wettbewerb')),
  }
  SOURCES.forEach(({ moduleId, dateColumn, unit }, i) => {
    const result = rest[i] as { data: unknown }
    const rows = (result.data ?? []) as Record<string, string | null>[]
    stats[moduleId] = summarise(rows.map((r) => r[dateColumn]), unit, lesestand.get(moduleId))
  })
  return stats
})

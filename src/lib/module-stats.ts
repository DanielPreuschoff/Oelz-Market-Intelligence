import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { NEW_WINDOW_DAYS, isCollectionRecent } from '@/types/ingredient-signals'

/**
 * Bestand und Aktualität je Modul — für die Kacheln auf der Startseite und die
 * Zähler in der Modulnavigation.
 *
 * Bisher war beides stumm: die Übersicht zeigte, welche Module es gibt, aber
 * nicht, ob seit dem letzten Besuch etwas passiert ist. Genau das ist die
 * Frage, mit der jemand die Seite öffnet.
 *
 * „Neu" misst wie im Rohstoff-Radar gegen den **Stand des Moduls**, nicht gegen
 * heute — sonst wäre der Zähler nach einer Erhebungspause still null, obwohl
 * die Kachel weiterhin ein Standdatum zeigt. Ob überhaupt etwas als neu gilt,
 * entscheidet dagegen `isCollectionRecent` gegen heute.
 */
export interface ModuleStats {
  /** Veröffentlichte Einträge insgesamt. */
  total: number
  /** Jüngstes Veröffentlichungsdatum, ISO. Null, wenn das Modul leer ist. */
  stand: string | null
  /** Einträge innerhalb des Neu-Fensters vor dem Stand. */
  newCount: number
  /** Benennung der Einheit — ein Modul zählt Signale, ein anderes Studien. */
  unit: { one: string; many: string }
}

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

const EMPTY: Omit<ModuleStats, 'unit'> = { total: 0, stand: null, newCount: 0 }

function summarise(dates: (string | null)[], unit: ModuleStats['unit']): ModuleStats {
  const valid = dates.filter((d): d is string => !!d).map(Date.parse).filter(Number.isFinite)
  if (valid.length === 0) return { ...EMPTY, total: dates.length, unit }

  const standMs = Math.max(...valid)
  const windowMs = NEW_WINDOW_DAYS * 86_400_000
  const stand = new Date(standMs).toISOString()
  return {
    total: dates.length,
    stand,
    // Liegt die letzte Erhebung selbst länger zurück als das Fenster, ist
    // nichts mehr neu. Ohne diese Bedingung zählte der jüngste Eintrag immer
    // mit — sein Abstand zum Stand ist null — und das Abzeichen bliebe ewig
    // stehen. Siehe isCollectionRecent.
    newCount: isCollectionRecent(stand) ? valid.filter((ms) => standMs - ms <= windowMs).length : 0,
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
async function competitorStats(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<ModuleStats> {
  const unit = { one: 'Signal', many: 'Signale' }

  // Beide Abfragen laufen nebeneinander; die Zuordnung passiert hier, damit
  // die zweite nicht auf das Ergebnis der ersten warten muss.
  const [{ data: editions }, { data: memberships }] = await Promise.all([
    supabase.from('editions').select('id, published_at').eq('status', 'published'),
    supabase.from('edition_signals').select('edition_id'),
  ])

  const published = (editions ?? []) as { id: string; published_at: string | null }[]
  if (published.length === 0) return { ...EMPTY, unit }

  const perEdition = new Map<string, number>()
  for (const row of (memberships ?? []) as { edition_id: string }[]) {
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

  return {
    total,
    stand,
    newCount: isCollectionRecent(stand) ? perEdition.get(newest.id) ?? 0 : 0,
    unit,
  }
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

  const [wettbewerb, ...rest] = await Promise.all([
    competitorStats(supabase),
    ...SOURCES.map(({ table, dateColumn }) =>
      supabase.from(table).select(dateColumn).eq('status', 'published')
    ),
  ])

  const stats: Record<string, ModuleStats> = { wettbewerb }
  SOURCES.forEach(({ moduleId, dateColumn, unit }, i) => {
    const result = rest[i] as { data: unknown }
    const rows = (result.data ?? []) as Record<string, string | null>[]
    stats[moduleId] = summarise(rows.map((r) => r[dateColumn]), unit)
  })
  return stats
})

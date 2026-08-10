import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { NEW_WINDOW_DAYS, isCollectionRecent } from '@/types/ingredient-signals'

/**
 * Bestand und Aktualität je Modul — für die Kacheln auf der Startseite.
 *
 * Bisher war die Übersicht stumm: sie zeigte, welche Module es gibt, aber
 * nicht, ob seit dem letzten Besuch etwas passiert ist. Genau das ist die
 * Frage, mit der jemand die Seite öffnet.
 *
 * „Neu" misst hier wie im Rohstoff-Radar gegen den **Stand des Moduls**, nicht
 * gegen heute. Sonst wäre der Zähler nach einer Erhebungspause still null,
 * obwohl die Kachel weiterhin ein Standdatum zeigt — und die zuletzt
 * erhobenen Einträge wären nirgends mehr als neu erkennbar.
 */
export interface ModuleStats {
  /** Veröffentlichte Einträge insgesamt. */
  total: number
  /** Jüngstes Veröffentlichungsdatum, ISO. Null, wenn das Modul leer ist. */
  stand: string | null
  /** Einträge innerhalb des Neu-Fensters vor dem Stand. */
  newCount: number
}

/**
 * Welches Datum das Erscheinen im Modul markiert. Bewusst nicht überall
 * `published_at`: Impulse und Studien führen keines, dort ist die Aufnahme in
 * die Plattform das maßgebliche Ereignis. Bei Studien wäre `date_published`
 * das Datum der Studie selbst — die kann Jahre alt sein und würde jede frisch
 * eingestellte Studie sofort als alt erscheinen lassen.
 */
const SOURCES: { moduleId: string; table: string; dateColumn: string }[] = [
  { moduleId: 'wettbewerb', table: 'editions', dateColumn: 'published_at' },
  { moduleId: 'produkt', table: 'innovation_impulses', dateColumn: 'created_at' },
  { moduleId: 'rohstoff', table: 'ingredient_signals', dateColumn: 'published_at' },
  { moduleId: 'studien', table: 'studies', dateColumn: 'created_at' },
]

function summarise(dates: (string | null)[]): ModuleStats {
  const valid = dates.filter((d): d is string => !!d).map(Date.parse).filter(Number.isFinite)
  if (valid.length === 0) {
    return { total: dates.length, stand: null, newCount: 0 }
  }
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
  }
}

/**
 * Alle Module in einem Rutsch. Die Abfragen laufen parallel, kosten zusammen
 * also eine Netzwerkrunde. Gelesen wird nur die Datumsspalte — die Zeilenzahl
 * ist dreistellig, die Datenmenge damit vernachlässigbar.
 *
 * Module, die der Nutzer nicht sehen darf, liefern durch RLS eine leere Menge
 * und erscheinen damit als leer. Das ist richtig so: die Kachel wird für ihn
 * ohnehin ausgeblendet.
 */
export const getModuleStats = cache(async (): Promise<Record<string, ModuleStats>> => {
  const supabase = await createClient()

  const results = await Promise.all(
    SOURCES.map(({ table, dateColumn }) =>
      supabase.from(table).select(dateColumn).eq('status', 'published')
    )
  )

  const stats: Record<string, ModuleStats> = {}
  SOURCES.forEach(({ moduleId, dateColumn }, i) => {
    const rows = (results[i].data ?? []) as unknown as Record<string, string | null>[]
    stats[moduleId] = summarise(rows.map((r) => r[dateColumn]))
  })
  return stats
})

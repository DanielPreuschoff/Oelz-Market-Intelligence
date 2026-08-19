/**
 * Die Daten des Briefings auf der Startseite — ausschliesslich Lesezugriffe auf
 * veröffentlichte Einträge; was sichtbar ist, entscheidet RLS.
 *
 * „Neu" folgt der Plattform-Regel aus `module-stats.ts` und dem Glossar:
 * Einträge im 30-Tage-Fenster vor dem Stand des Moduls — und nur, solange der
 * Stand selbst jung ist. Ohne die zweite Bedingung bliebe der Neu-Hinweis nach
 * einer Erhebungspause ewig stehen.
 */

import { createClient } from '@/lib/supabase/server'
import { getModuleStats, type ModuleStats } from '@/lib/module-stats'
import { NEW_WINDOW_DAYS, isCollectionRecent } from '@/types/ingredient-signals'
import type { MaturityLevel, SubjectType } from '@/types/ingredient-signals'
import type { SignalCategory, ImportanceLevel } from '@/types/database'
import type { RadarType } from '@/types/innovation'

const FENSTER_MS = NEW_WINDOW_DAYS * 86_400_000

export interface EditionTeaser {
  id: string
  title: string
  period_month: string
  editorial_summary: string | null
  published_at: string | null
  signalAnzahl: number
}

export interface SignalTeaser {
  id: string
  headline: string
  summary: string
  category: SignalCategory
  importance: ImportanceLevel
  image_url: string | null
  signal_date: string | null
  wettbewerber: { short_name: string; logo_url: string | null } | null
  land: string | null
}

export interface ImpulsTeaser {
  id: string
  title: string
  radar_type: RadarType
  short_signal: string | null
  image_url: string | null
  created_at: string
}

export interface RohstoffTeaser {
  id: string
  subject_name: string
  subject_type: SubjectType
  what_is_new: string | null
  functions: string[]
  maturity: MaturityLevel | null
  published_at: string | null
}

export interface StudieTeaser {
  id: string
  title: string
  summary: string | null
  date_published: string | null
}

export interface StartseitenDaten {
  /** Erster Tag des Briefing-Monats — Anker der Überschrift. */
  monat: string
  /** Die jüngste Edition, wenn sie im Neu-Fenster liegt; sonst null. */
  edition: EditionTeaser | null
  /** Die jüngste veröffentlichte Edition — trägt den Leerzustand. Null, wenn es keine gibt. */
  letzteEdition: EditionTeaser | null
  signale: SignalTeaser[]
  impulse: ImpulsTeaser[]
  rohstoffsignale: RohstoffTeaser[]
  studien: StudieTeaser[]
  /** Impulse mit Bild für die Laufsäule — neue zuerst, dann Bestand. */
  saeule: ImpulsTeaser[]
  stats: Record<string, ModuleStats>
}

/** Innerhalb des Neu-Fensters vor dem Stand — und der Stand ist selbst noch jung. */
function imFenster(datum: string | null, stand: string | null): boolean {
  if (!datum || !stand || !isCollectionRecent(stand)) return false
  const abstand = Date.parse(stand) - Date.parse(datum)
  return abstand >= 0 && abstand <= FENSTER_MS
}

function monatsErster(iso: string): string {
  const d = new Date(iso)
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString().slice(0, 10)
}

interface EditionZeile {
  id: string
  title: string
  period_month: string
  editorial_summary: string | null
  published_at: string | null
  edition_signals: {
    position: number | null
    signal: {
      id: string
      headline: string
      summary: string
      category: SignalCategory
      importance: ImportanceLevel
      image_url: string | null
      signal_date: string | null
      country_id: string | null
      competitor: { short_name: string; logo_url: string | null } | null
    } | null
  }[]
}

interface ImpulsZeile {
  id: string
  title: string
  radar_type: RadarType
  short_signal: string | null
  image_url: string | null
  created_at: string
}

/** Alles, was die Startseite braucht — in einer Runde paralleler Abfragen. */
export async function ladeStartseitenDaten(): Promise<StartseitenDaten> {
  const supabase = await createClient()

  const [editionErg, rohstoffErg, studienErg, impulseErg, stats] = await Promise.all([
    supabase
      .from('editions')
      .select(
        `id, title, period_month, editorial_summary, published_at,
         edition_signals ( position, signal:signals ( id, headline, summary, category, importance, image_url, signal_date, country_id,
           competitor:competitors ( short_name, logo_url ) ) )`,
      )
      .eq('status', 'published')
      .order('period_month', { ascending: false })
      .limit(1),
    supabase
      .from('ingredient_signals')
      .select('id, subject_name, subject_type, what_is_new, functions, maturity, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(40),
    supabase
      .from('studies')
      .select('id, title, summary, date_published, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('innovation_impulses')
      .select('id, title, radar_type, short_signal, image_url, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(40),
    getModuleStats(),
  ])

  // ---- Wettbewerbsradar: die jüngste Edition und ihre Signale
  const zeile = (editionErg.data?.[0] as unknown as EditionZeile | undefined) ?? null
  const editionSignale = zeile ? zeile.edition_signals.filter((z) => z.signal) : []
  const letzteEdition: EditionTeaser | null = zeile
    ? {
        id: zeile.id,
        title: zeile.title,
        period_month: zeile.period_month,
        editorial_summary: zeile.editorial_summary,
        published_at: zeile.published_at,
        signalAnzahl: editionSignale.length,
      }
    : null
  const editionIstNeu = !!zeile && isCollectionRecent(zeile.published_at)
  const signale: SignalTeaser[] = editionIstNeu
    ? [...editionSignale]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((z) => {
          const s = z.signal!
          return {
            id: s.id,
            headline: s.headline,
            summary: s.summary,
            category: s.category,
            importance: s.importance,
            image_url: s.image_url,
            signal_date: s.signal_date,
            wettbewerber: s.competitor ? { short_name: s.competitor.short_name, logo_url: s.competitor.logo_url } : null,
            land: s.country_id,
          }
        })
    : []

  // ---- Rohstoff-Radar
  const rohstoffAlle = (rohstoffErg.data ?? []) as unknown as RohstoffTeaser[]
  const rohstoffStand = rohstoffAlle[0]?.published_at ?? null
  const rohstoffsignale = rohstoffAlle.filter((r) => imFenster(r.published_at, rohstoffStand))

  // ---- Studien
  const studienAlle = (studienErg.data ?? []) as unknown as (StudieTeaser & { created_at: string })[]
  const studienStand = studienAlle[0]?.created_at ?? null
  const studien: StudieTeaser[] = studienAlle
    .filter((st) => imFenster(st.created_at, studienStand))
    .map(({ id, title, summary, date_published }) => ({ id, title, summary, date_published }))

  // ---- Produkt- & Innovationsradar
  const impulseAlle = (impulseErg.data ?? []) as unknown as ImpulsZeile[]
  const impulseStand = impulseAlle[0]?.created_at ?? null
  const impulse = impulseAlle.filter((im) => imFenster(im.created_at, impulseStand))
  // Die Säule zeigt neue Impulse und den Bestand — sie soll nie kahl laufen.
  const saeule = impulseAlle.filter((im) => im.image_url).slice(0, 12)

  return {
    monat: editionIstNeu && zeile ? monatsErster(zeile.period_month) : monatsErster(new Date().toISOString()),
    edition: editionIstNeu ? letzteEdition : null,
    letzteEdition,
    signale,
    impulse,
    rohstoffsignale,
    studien,
    saeule,
    stats,
  }
}

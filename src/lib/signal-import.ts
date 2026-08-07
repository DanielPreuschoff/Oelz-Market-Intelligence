import { CATEGORY_LABELS, type ImportanceLevel, type SignalCategory } from '@/types/database'

/**
 * Format der Importdatei, die aus den Deep-Research-Berichten entsteht.
 * Siehe prompts/wettbewerber-deep-research.md für den Prompt, der es erzeugt.
 */
export interface ImportPayload {
  /** Freitext, erscheint als Bezeichnung des Importlaufs, z.B. "August 2026". */
  period?: string
  signals: ImportSignal[]
}

export interface ImportSignal {
  /** Name oder Kurzname des Wettbewerbers. Leer = marktweites Signal. */
  competitor?: string | null
  headline: string
  summary: string
  category: string
  importance?: string
  /** ISO-Ländercode: AT, CZ, SK, SI. */
  country?: string | null
  source_name?: string | null
  source_url?: string | null
  /** YYYY-MM-DD */
  signal_date?: string | null
}

export type ImportIssue = { index: number; headline: string; reason: string }

const CATEGORIES = Object.keys(CATEGORY_LABELS) as SignalCategory[]
const IMPORTANCES: ImportanceLevel[] = ['1', '2', '3']

/**
 * Findet ein JSON-Objekt im eingefügten Text.
 *
 * Deep-Research-Ausgaben sind Fließtext; das JSON steht am Ende, oft in einem
 * Code-Block und manchmal mit Prosa davor. Erst der Code-Block, dann der
 * äußerste geschweifte Block — statt zu verlangen, dass die Zwischenablage
 * exakt getroffen wurde.
 */
export function extractJson(raw: string): unknown {
  const trimmed = raw.trim()
  if (!trimmed) throw new Error('Kein Inhalt eingefügt.')

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidates = [fenced?.[1], trimmed, trimmed.slice(trimmed.indexOf('{'), trimmed.lastIndexOf('}') + 1)]

  for (const candidate of candidates) {
    if (!candidate?.trim()) continue
    try {
      return JSON.parse(candidate)
    } catch {
      continue
    }
  }
  throw new Error('Im eingefügten Text steht kein gültiges JSON.')
}

/**
 * Prüft die Nutzlast und trennt brauchbare Signale von fehlerhaften.
 * Ein fehlerhaftes Signal lässt den ganzen Import nicht scheitern — es wird
 * benannt und übersprungen, damit ein Tippfehler nicht 60 gute Signale blockiert.
 */
export function validateImport(input: unknown): {
  period: string | null
  valid: (ImportSignal & { category: SignalCategory; importance: ImportanceLevel })[]
  issues: ImportIssue[]
} {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Erwartet wird ein JSON-Objekt mit einem Feld "signals".')
  }
  const payload = input as Partial<ImportPayload>
  if (!Array.isArray(payload.signals)) {
    throw new Error('Feld "signals" fehlt oder ist keine Liste.')
  }

  const valid: (ImportSignal & { category: SignalCategory; importance: ImportanceLevel })[] = []
  const issues: ImportIssue[] = []

  payload.signals.forEach((signal, index) => {
    const headline = (signal?.headline ?? '').trim()
    const problems: string[] = []

    if (!headline) problems.push('Headline fehlt')
    else if (headline.length > 120) problems.push(`Headline zu lang (${headline.length}/120)`)
    if (!(signal?.summary ?? '').trim()) problems.push('Summary fehlt')
    if (!CATEGORIES.includes(signal?.category as SignalCategory)) {
      problems.push(`Kategorie "${signal?.category ?? ''}" unbekannt`)
    }
    if (signal?.importance && !IMPORTANCES.includes(signal.importance as ImportanceLevel)) {
      problems.push(`Wichtigkeit "${signal.importance}" ist nicht 1, 2 oder 3`)
    }
    if (signal?.signal_date && !/^\d{4}-\d{2}-\d{2}$/.test(signal.signal_date)) {
      problems.push(`Datum "${signal.signal_date}" ist nicht YYYY-MM-DD`)
    }

    if (problems.length > 0) {
      issues.push({ index, headline: headline || '(ohne Headline)', reason: problems.join(', ') })
      return
    }

    valid.push({
      ...signal,
      headline,
      summary: signal.summary.trim(),
      category: signal.category as SignalCategory,
      importance: (signal.importance ?? '1') as ImportanceLevel,
    })
  })

  return {
    period: typeof payload.period === 'string' && payload.period.trim() ? payload.period.trim() : null,
    valid,
    issues,
  }
}

/**
 * Vergleichsform für Wettbewerbernamen — Groß-/Kleinschreibung, Akzente und
 * Rechtsform egal, damit „Delta Pekárny a.s." aus dem Bericht denselben
 * Datensatz trifft wie „delta pekarny" aus der Datei.
 *
 * Akzente werden abgetragen statt gelöscht (`á` → `a`, nicht weg), sonst
 * kollabieren tschechische und slowenische Namen zu unkenntlichen Resten.
 * Die punktbehafteten Rechtsformen brauchen einen eigenen Schritt: `\b` greift
 * nach einem Punkt am Zeichenkettenende nicht.
 */
export function normalizeCompetitor(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\ba\.?\s?s\.?(?=\s|$)/g, ' ') // a.s. — CZ/SK
    .replace(/\bd\.?\s?d\.?(?=\s|$)/g, ' ') // d.d. — SI
    .replace(/\b(gmbh|ag|plc|ltd|nv|bv|sa|spa|srl|kg|co|comp|group|international)\b/g, ' ')
    .replace(/[^a-z0-9]/g, '')
}

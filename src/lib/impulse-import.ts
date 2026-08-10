import {
  IMPULSE_TAGS,
  RADAR_TYPES,
  type InnovationImpulse,
  type RadarType,
} from '@/types/innovation'
import type { ImportIssue } from '@/lib/signal-import'

export interface ImpulseImportPayload {
  period?: string
  impulses: unknown[]
}

/**
 * Zeile, wie sie in `innovation_impulses` geschrieben wird.
 *
 * `ratings` fehlt bewusst. Die Recherche liefert nur eine Priorität, das
 * Formular erwartet aber vier Zahlen dazu; ein halb gefülltes Objekt würde die
 * Regler dort auf `undefined` setzen. Erfundene Platzhalterzahlen wären die
 * schlechtere Antwort — sie sehen aus wie eine Bewertung, die niemand
 * vorgenommen hat. Die Priorität steht deshalb als Satz im Transfertext; die
 * Bewertung vergibt die Redaktion beim Durchsehen.
 *
 * `image_url` fehlt ebenfalls: Bilder werden manuell nachgepflegt
 * (docs/produkt-radar-erhebung.md, Abschnitt 5).
 */
export type ImpulseDraft = Pick<
  InnovationImpulse,
  | 'title' | 'radar_type' | 'short_signal' | 'oelz_relevance_short' | 'tags'
  | 'product_example' | 'category' | 'market' | 'channel' | 'main_claim'
  | 'what_is_new' | 'market_signal' | 'oelz_development_relevance'
  | 'possible_oelz_transfer' | 'source_url' | 'source_date'
>

const asText = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() ? v.trim() : null

/**
 * Prüft die Importdatei und trennt brauchbare Entwürfe von fehlerhaften.
 *
 * Bewusst nachsichtig, wie beim Rohstoff-Import: Pflicht sind nur Titel und ein
 * gültiger Radar-Typ, weil die Datenbank sie verlangt. Alles andere darf fehlen —
 * ein unvollständiger Impuls soll nachgearbeitet, nicht weggeworfen werden. Was
 * zur runden Karte fehlt, meldet der Import.
 */
export function validateImpulseImport(input: unknown): {
  period: string | null
  valid: ImpulseDraft[]
  issues: ImportIssue[]
  /** Schlagworte ausserhalb der Liste — Hinweis, dass das Vokabular zu eng ist. */
  unknownTags: { title: string; tags: string[] }[]
} {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Erwartet wird ein JSON-Objekt mit einem Feld "impulses".')
  }
  const payload = input as Partial<ImpulseImportPayload>
  if (!Array.isArray(payload.impulses)) {
    throw new Error('Feld "impulses" fehlt oder ist keine Liste.')
  }

  const valid: ImpulseDraft[] = []
  const issues: ImportIssue[] = []
  const unknownTags: { title: string; tags: string[] }[] = []

  payload.impulses.forEach((entry, index) => {
    const i = (entry ?? {}) as Record<string, unknown>
    const title = asText(i.title)
    const radarType =
      typeof i.radar_type === 'string' && (RADAR_TYPES as readonly string[]).includes(i.radar_type)
        ? (i.radar_type as RadarType)
        : null

    const problems: string[] = []
    if (!title) problems.push('Titel fehlt')
    if (!radarType) problems.push(`Radar-Typ "${String(i.radar_type ?? '')}" ist keiner der acht erlaubten`)

    if (problems.length > 0) {
      issues.push({ index, headline: title ?? '(ohne Titel)', reason: problems.join(', ') })
      return
    }

    const rawTags = Array.isArray(i.tags) ? i.tags.map(String) : []
    const tags = rawTags.filter((t) => (IMPULSE_TAGS as readonly string[]).includes(t))
    const rejected = rawTags.filter((t) => !tags.includes(t))
    if (rejected.length > 0) unknownTags.push({ title: title!, tags: rejected })

    valid.push({
      title: title!,
      radar_type: radarType!,
      short_signal: asText(i.short_signal),
      oelz_relevance_short: asText(i.oelz_relevance_short),
      tags,
      product_example: asText(i.product_example),
      category: asText(i.category),
      market: asText(i.market),
      channel: asText(i.channel),
      main_claim: asText(i.main_claim),
      what_is_new: asText(i.what_is_new),
      market_signal: asText(i.market_signal),
      oelz_development_relevance: asText(i.oelz_development_relevance),
      possible_oelz_transfer: asText(i.possible_oelz_transfer),
      source_url: asText(i.source_url),
      source_date: /^\d{4}-\d{2}-\d{2}$/.test(String(i.source_date ?? ''))
        ? String(i.source_date)
        : null,
    })
  })

  return { period: asText(payload.period), valid, issues, unknownTags }
}

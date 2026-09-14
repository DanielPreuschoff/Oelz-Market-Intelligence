import {
  EINTRAGSTYPEN,
  STUFEN,
  GELTUNGSBEREICHE,
  BEHOERDEN,
  HANDLUNGEN,
  PRODUKTKATEGORIEN,
  type Risikosignal,
} from '@/types/substance-watch'
import type { ImportIssue } from '@/lib/signal-import'

/**
 * Import fuer das Regulatorik-Radar -- Muster aus `ingredient-import.ts`.
 *
 * Die Importdatei entsteht aus dem Behoerden-Lauf (prompts/regulatorik-behoerden.md)
 * und wird unter /admin/unter-beobachtung/import eingefuegt. Feldnamen sind die
 * Spaltennamen der Tabelle, damit niemand uebersetzen muss.
 *
 * Bewusst nachsichtig: Pflicht sind nur Typ und Kurzzeile, weil ohne sie kein
 * Entwurf lesbar waere. Alles andere darf fehlen -- importiert wird als
 * Entwurf, und die Veroeffentlichungs-Huerde (missingForPublish, CHECK in
 * Migration 016) ist der eigentliche Filter. Ein unvollstaendiger Fund soll
 * nachgearbeitet werden, nicht verlorengehen.
 */
export interface RegulatorikImportPayload {
  period?: string
  entries: unknown[]
}

export type RegulatorikDraft = Pick<
  Risikosignal,
  | 'kind' | 'substance' | 'e_number' | 'teaser' | 'authority' | 'stage' | 'scope'
  | 'situation' | 'why_relevant' | 'source_name' | 'source_url' | 'source_date'
  | 'product_categories' | 'action'
>

const asText = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() ? v.trim() : null

const asEnum = <T extends readonly string[]>(list: T, v: unknown): T[number] | null =>
  typeof v === 'string' && (list as readonly string[]).includes(v) ? v : null

export function validateRegulatorikImport(input: unknown): {
  period: string | null
  valid: RegulatorikDraft[]
  issues: ImportIssue[]
  /** Kategorien, die nicht zu den fuenf Oelz-Kategorien gehoeren -- Hinweis fuer die Nacharbeit. */
  unknownCategories: { headline: string; categories: string[] }[]
} {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Erwartet wird ein JSON-Objekt mit einem Feld "entries".')
  }
  const payload = input as Partial<RegulatorikImportPayload>
  if (!Array.isArray(payload.entries)) {
    throw new Error('Feld "entries" fehlt oder ist keine Liste.')
  }

  const valid: RegulatorikDraft[] = []
  const issues: ImportIssue[] = []
  const unknownCategories: { headline: string; categories: string[] }[] = []

  payload.entries.forEach((entry, index) => {
    const e = (entry ?? {}) as Record<string, unknown>
    const kind = asEnum(EINTRAGSTYPEN, e.kind)
    const teaser = asText(e.teaser)
    const headline = teaser ?? asText(e.substance) ?? '(ohne Kurzzeile)'

    const problems: string[] = []
    if (!kind) problems.push(`Typ "${String(e.kind ?? '')}" ist keiner der drei erlaubten`)
    if (!teaser) problems.push('Kurzzeile fehlt')
    if (problems.length > 0) {
      issues.push({ index, headline, reason: problems.join(', ') })
      return
    }

    const rawCategories = Array.isArray(e.product_categories) ? e.product_categories.map(String) : []
    const categories = rawCategories.filter((k) => (PRODUKTKATEGORIEN as readonly string[]).includes(k))
    const rejected = rawCategories.filter((k) => !categories.includes(k))
    if (rejected.length > 0) unknownCategories.push({ headline, categories: rejected })

    const typ = kind as RegulatorikDraft['kind']
    valid.push({
      kind: typ,
      substance: asText(e.substance) ?? '',
      e_number: asText(e.e_number),
      teaser,
      authority: asEnum(BEHOERDEN, e.authority) as RegulatorikDraft['authority'],
      stage: typ === 'risiko' ? (asEnum(STUFEN, e.stage) as RegulatorikDraft['stage']) : null,
      scope: (asEnum(GELTUNGSBEREICHE, e.scope) ?? 'EU') as RegulatorikDraft['scope'],
      situation: asText(e.situation) ?? '',
      why_relevant: typ === 'indirekt' ? asText(e.why_relevant) : null,
      source_name: asText(e.source_name),
      source_url: asText(e.source_url),
      source_date: /^\d{4}-\d{2}-\d{2}$/.test(String(e.source_date ?? '')) ? String(e.source_date) : null,
      product_categories: typ === 'indirekt' ? [] : categories,
      action: typ === 'risiko' ? (asEnum(HANDLUNGEN, e.action) as RegulatorikDraft['action']) : null,
    })
  })

  return { period: asText(payload.period), valid, issues, unknownCategories }
}

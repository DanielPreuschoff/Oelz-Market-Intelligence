import { STRATEGIC_THEMES } from '@/types/strategic-themes'
import {
  EVIDENCE_LEVELS,
  INGREDIENT_FUNCTIONS,
  MATURITY_LEVELS,
  SUBJECT_TYPES,
  type EvidenceLevel,
  type IngredientSignal,
  type MaturityLevel,
  type SubjectType,
} from '@/types/ingredient-signals'
import type { StrategicTheme } from '@/types/strategic-themes'
import type { ImportIssue } from '@/lib/signal-import'

export interface IngredientImportPayload {
  period?: string
  signals: unknown[]
}

/**
 * Zeile, wie sie in `ingredient_signals` geschrieben wird.
 * Alles ausser Titel, Gegenstand und Art darf fehlen — importiert wird als
 * Entwurf, und die Veröffentlichungs-Hürde ist der eigentliche Filter.
 */
export type IngredientDraft = Pick<
  IngredientSignal,
  | 'title' | 'subject_name' | 'subject_type' | 'what_is_new' | 'functions'
  | 'maturity' | 'evidence' | 'source_name' | 'source_url' | 'source_date'
  | 'strategic_theme' | 'problem_solved' | 'oelz_application'
  | 'oelz_opportunity' | 'next_step'
>

const asText = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() ? v.trim() : null

const asEnum = <T extends readonly string[]>(list: T, v: unknown): T[number] | null =>
  typeof v === 'string' && (list as readonly string[]).includes(v) ? v : null

/**
 * Prüft die Importdatei und trennt brauchbare Entwürfe von fehlerhaften.
 *
 * Bewusst nachsichtig: nur Titel, Gegenstand und eine gültige Art sind Pflicht,
 * weil die Datenbank sie verlangt. Fehlt ein Kettenglied, entsteht trotzdem ein
 * Entwurf — die Admin-Liste zeigt dann an, was zum Veröffentlichen noch fehlt.
 * Ein unvollständiges Signal soll nachgearbeitet, nicht weggeworfen werden.
 */
export function validateIngredientImport(input: unknown): {
  period: string | null
  valid: IngredientDraft[]
  issues: ImportIssue[]
  /** Funde, deren Funktionen nicht in der Taxonomie stehen — Hinweis auf zu enge Liste. */
  unknownFunctions: { title: string; functions: string[] }[]
} {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Erwartet wird ein JSON-Objekt mit einem Feld "signals".')
  }
  const payload = input as Partial<IngredientImportPayload>
  if (!Array.isArray(payload.signals)) {
    throw new Error('Feld "signals" fehlt oder ist keine Liste.')
  }

  const valid: IngredientDraft[] = []
  const issues: ImportIssue[] = []
  const unknownFunctions: { title: string; functions: string[] }[] = []

  payload.signals.forEach((entry, index) => {
    const s = (entry ?? {}) as Record<string, unknown>
    const title = asText(s.title)
    const subjectName = asText(s.subject_name)
    const subjectType = asEnum(SUBJECT_TYPES, s.subject_type)

    const problems: string[] = []
    if (!title) problems.push('Titel fehlt')
    if (!subjectName) problems.push('Gegenstand fehlt')
    if (!subjectType) problems.push(`Art "${String(s.subject_type ?? '')}" ist keine der vier erlaubten`)

    if (problems.length > 0) {
      issues.push({ index, headline: title ?? '(ohne Titel)', reason: problems.join(', ') })
      return
    }

    const rawFunctions = Array.isArray(s.functions) ? s.functions.map(String) : []
    const functions = rawFunctions.filter((f) =>
      (INGREDIENT_FUNCTIONS as readonly string[]).includes(f)
    )
    const rejected = rawFunctions.filter((f) => !functions.includes(f))
    if (rejected.length > 0) {
      unknownFunctions.push({ title: title!, functions: rejected })
    }

    valid.push({
      title: title!,
      subject_name: subjectName!,
      subject_type: subjectType as SubjectType,
      what_is_new: asText(s.what_is_new),
      functions,
      maturity: asEnum(MATURITY_LEVELS, s.maturity) as MaturityLevel | null,
      evidence: asEnum(EVIDENCE_LEVELS, s.evidence) as EvidenceLevel | null,
      source_name: asText(s.source_name),
      source_url: asText(s.source_url),
      source_date: /^\d{4}-\d{2}-\d{2}$/.test(String(s.source_date ?? ''))
        ? String(s.source_date)
        : null,
      strategic_theme: asEnum(STRATEGIC_THEMES, s.strategic_theme) as StrategicTheme | null,
      problem_solved: asText(s.problem_solved),
      oelz_application: asText(s.oelz_application),
      oelz_opportunity: asText(s.oelz_opportunity),
      next_step: asText(s.next_step),
    })
  })

  return {
    period: asText(payload.period),
    valid,
    issues,
    unknownFunctions,
  }
}

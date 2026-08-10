import type { StrategicTheme } from '@/types/strategic-themes'

/** Spiegelt supabase/migrations/007_ingredient_signals.sql. */
export interface IngredientSignal {
  id: string
  // Zone „Befund"
  title: string
  subject_name: string
  subject_type: SubjectType
  what_is_new: string | null
  functions: string[]
  maturity: MaturityLevel | null
  evidence: EvidenceLevel | null
  source_name: string | null
  source_url: string | null
  source_date: string | null
  // Zone „Einschätzung"
  strategic_theme: StrategicTheme | null
  problem_solved: string | null
  oelz_application: string | null
  oelz_opportunity: string | null
  next_step: string | null
  // Workflow
  status: 'draft' | 'published'
  published_at: string | null
  ai_generated: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

/** Was gemeldet wird — der Gegenstand des Signals. */
export const SUBJECT_TYPES = ['Rohstoff', 'Ingredient', 'Technologie', 'Verfahren'] as const
export type SubjectType = (typeof SUBJECT_TYPES)[number]

/** Funktionaler Nutzen. Primäre Einstiegsachse: „Was gibt es für Frischhaltung?" */
export const INGREDIENT_FUNCTIONS = [
  'Zuckerreduktion',
  'Proteinanreicherung',
  'Ballaststoffanreicherung',
  'Frischhaltung',
  'Textur & Mundgefühl',
  'Prozessstabilität',
  'Clean Label',
] as const
export type IngredientFunction = (typeof INGREDIENT_FUNCTIONS)[number]

/** Reifegrad — Eigenschaft der Lösung. Benannte Stufen, bewusst keine Zahlen. */
export const MATURITY_LEVELS = ['Labor', 'Pilot', 'Am Markt', 'Etabliert'] as const
export type MaturityLevel = (typeof MATURITY_LEVELS)[number]

/** Evidenz — Eigenschaft der Aussage, orthogonal zum Reifegrad. */
export const EVIDENCE_LEVELS = ['Herstellerangabe', 'Einzelstudie', 'Mehrfach belegt'] as const
export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number]

/**
 * Vokabular für den nächsten Schritt. `next_step` ist Freitext; diese Verben
 * dienen der Erkennung für die Kartenanzeige, nicht der Validierung.
 * „Beobachten" ist ein vollwertiger Wert — die Relevanzkette erzwingt
 * Nachdenken, nicht Gewissheit.
 */
export const NEXT_STEP_VERBS = ['Beobachten', 'Prüfen', 'Pilotieren'] as const

/**
 * Beschriftung des nächsten Schritts auf der Karte. Folgt die Formulierung dem
 * Vokabular, steht das Verb; sonst die neutrale Beschriftung — `next_step` ist
 * Freitext, und ein abweichend formulierter Schritt darf nicht stumm von der
 * Karte verschwinden.
 */
export function nextStepLabel(nextStep: string | null): string | null {
  if (!nextStep?.trim()) return null
  const head = nextStep.trimStart()
  return (
    NEXT_STEP_VERBS.find((v) => head.toLowerCase().startsWith(v.toLowerCase())) ?? 'Nächster Schritt'
  )
}

/** Zeitfenster, in dem ein Signal als „mit der letzten Erhebung dazugekommen" gilt. */
export const NEW_WINDOW_DAYS = 30

/**
 * „Neu" misst gegen den **Stand des Moduls**, nicht gegen heute.
 *
 * Gegen `Date.now()` gemessen wäre der Zähler nach einer Erhebungspause still
 * null, obwohl der Kopf weiterhin ein Standdatum zeigt — die zuletzt
 * erhobenen Signale wären dann nirgends mehr als neu erkennbar.
 */
export function isNewSignal(
  signal: Pick<IngredientSignal, 'published_at'>,
  standIso: string | null
): boolean {
  if (!signal.published_at || !standIso) return false
  const distance = Date.parse(standIso) - Date.parse(signal.published_at)
  return distance >= 0 && distance <= NEW_WINDOW_DAYS * 86_400_000
}

/**
 * Ob eine Erhebung überhaupt noch als frisch gilt.
 *
 * Bewusst getrennt von `isNewSignal`: Das sind zwei verschiedene Fragen.
 * *Welche* Einträge zu einer Erhebung gehören, misst sich am Stand — sonst
 * verlöre eine Erhebungspause rückwirkend ihre Neuheitsmarkierung. *Ob* die
 * Erhebung noch als neu ausgewiesen wird, muss sich dagegen an heute messen.
 *
 * Ohne diese zweite Frage zählt der jüngste Eintrag immer mit — sein Abstand
 * zum Stand ist per Definition null — und das Neu-Abzeichen verschwände nie.
 * Ein Hinweis, der dauerhaft leuchtet, ist keiner mehr.
 *
 * `now` ist einsetzbar, damit die Funktion prüfbar bleibt.
 */
export function isCollectionRecent(standIso: string | null, now: number = Date.now()): boolean {
  if (!standIso) return false
  const age = now - Date.parse(standIso)
  return age >= 0 && age <= NEW_WINDOW_DAYS * 86_400_000
}

/** Die sechs Glieder der Relevanzkette plus die Belege, die sie tragen. */
const PUBLISH_REQUIREMENTS: { label: string; ok: (s: PublishCandidate) => boolean }[] = [
  { label: 'Beschreibung des Signals', ok: (s) => !!s.what_is_new?.trim() },
  { label: 'mindestens eine Funktion', ok: (s) => (s.functions?.length ?? 0) > 0 },
  { label: 'Reifegrad', ok: (s) => !!s.maturity },
  { label: 'Evidenz', ok: (s) => !!s.evidence },
  { label: 'Quellenname', ok: (s) => !!s.source_name?.trim() },
  { label: 'Quellen-URL', ok: (s) => !!s.source_url?.trim() },
  { label: 'Veröffentlichungsdatum der Quelle', ok: (s) => !!s.source_date },
  { label: 'strategisches Thema', ok: (s) => !!s.strategic_theme },
  { label: 'gelöstes Problem', ok: (s) => !!s.problem_solved?.trim() },
  { label: 'Anwendung bei Ölz', ok: (s) => !!s.oelz_application?.trim() },
  { label: 'Chance', ok: (s) => !!s.oelz_opportunity?.trim() },
  { label: 'nächster Schritt', ok: (s) => !!s.next_step?.trim() },
]

type PublishCandidate = Partial<
  Pick<
    IngredientSignal,
    | 'what_is_new' | 'functions' | 'maturity' | 'evidence'
    | 'source_name' | 'source_url' | 'source_date' | 'strategic_theme'
    | 'problem_solved' | 'oelz_application' | 'oelz_opportunity' | 'next_step'
  >
>

/**
 * Prüft die Veröffentlichungs-Hürde und benennt, was fehlt.
 * Spiegelt den CHECK `ingredient_signals_published_complete` in Migration 007 —
 * die Datenbank ist die Durchsetzung, das hier ist die Erklärung dazu.
 */
export function missingForPublish(signal: PublishCandidate): string[] {
  return PUBLISH_REQUIREMENTS.filter((r) => !r.ok(signal)).map((r) => r.label)
}

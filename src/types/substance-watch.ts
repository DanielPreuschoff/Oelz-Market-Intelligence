/**
 * Unter Beobachtung — Risikosignale im Regulatorik-Radar.
 *
 * Spec: docs/unter-beobachtung-spec.md, Tabelle: Migration 013.
 * Umzug aus dem Rohstoff-Radar: docs/adr/0006-regulatorik-radar-eigenes-modul.md.
 *
 * Ein Risikosignal beantwortet eine einzige Frage: Steht ein Stoff, auf den wir
 * bauen oder bauen könnten, unter Druck — und wie weit ist dieser Druck
 * gediehen? Nicht im Umfang: Beschaffungsrisiko (Verknappung, Preis). Deshalb
 * heißt der Eintragstyp „Unter Beobachtung" und nicht „Kritische Rohstoffe" —
 * der Begriff meint im Industriesprech genau die Beschaffungsseite.
 */

/** Die vier Stufen. Jede ist an der Quelle prüfbar, ohne zu interpretieren. */
export const STUFEN = ['kritik', 'bewertung', 'rechtsakt_in_arbeit', 'geltendes_recht'] as const
export type Stufe = (typeof STUFEN)[number]

export const STUFE_NAME: Record<Stufe, string> = {
  kritik: 'Öffentliche Kritik',
  bewertung: 'Behördliche Bewertung',
  rechtsakt_in_arbeit: 'Rechtsakt in Arbeit',
  geltendes_recht: 'Geltendes Recht',
}

/** Wer spricht — beantwortet die Frage, warum eine Meldung diese Stufe trägt. */
export const STUFE_ERKLAERUNG: Record<Stufe, string> = {
  kritik: 'Medien, NGO oder Öffentlichkeit — keine Behörde beteiligt.',
  bewertung: 'Eine Behörde prüft oder empfiehlt; noch kein Recht.',
  rechtsakt_in_arbeit: 'Entwurf, Konsultation oder beschlossen, aber nicht in Kraft.',
  geltendes_recht: 'In Kraft, mit Frist oder Höchstmenge.',
}

/**
 * Farbe trägt den Grad, nicht die Art.
 *
 * Die Plattform hat sich einmal entschieden, dass Farbe Schwere trägt — im
 * Wettbewerbsradar Grau → Braun → Orange. Eine zweite Farbsprache daneben
 * kostet mehr, als sie bringt, und Rot ist in der Ölz-Palette nicht vorgesehen.
 * Dass es sich überhaupt um eine Warnung handelt, trägt die Form der Karte
 * (Warnzeichen, durchgezogene Kante) — Muster aus dem Trend Radar, wo die
 * unterste Ebene aus demselben Grund über die Form unterschieden wird.
 */
export const STUFE_CHIP: Record<Stufe, string> = {
  kritik: 'border border-border text-muted-foreground',
  bewertung: 'border border-oelz-braun/25 bg-oelz-braun/10 text-oelz-braun',
  rechtsakt_in_arbeit: 'border border-oelz-orange/35 bg-oelz-orange/12 text-oelz-orange-text',
  geltendes_recht: 'bg-oelz-orange text-oelz-on-orange font-bold',
}

/** Rangfolge für die Sortierung: das Verbindlichste zuerst. */
export const STUFE_RANG: Record<Stufe, number> = {
  geltendes_recht: 0,
  rechtsakt_in_arbeit: 1,
  bewertung: 2,
  kritik: 3,
}

export const GELTUNGSBEREICHE = ['DE', 'AT', 'EU'] as const
export type Geltungsbereich = (typeof GELTUNGSBEREICHE)[number]

/**
 * Deutschland ist der Frühindikator, nicht der Absatzmarkt. Kai Heuberger im
 * Termin vom 27.08.2026: „Wenn in Deutschland was ist, dann folgt Österreich in
 * der Regel." Deshalb ein eigenes Feld statt einer Fußnote im Fließtext.
 */
export const GELTUNGSBEREICH_NAME: Record<Geltungsbereich, string> = {
  DE: 'Deutschland',
  AT: 'Österreich',
  EU: 'EU',
}

export const HANDLUNGEN = ['beobachten', 'pruefen', 'ersetzen'] as const
export type Handlung = (typeof HANDLUNGEN)[number]

export const HANDLUNG_NAME: Record<Handlung, string> = {
  beobachten: 'Beobachten',
  pruefen: 'Prüfen',
  ersetzen: 'Ersetzen',
}

/**
 * Die fünf Ölz-Produktkategorien aus docs/oelz-sortiment.md.
 *
 * Sie tragen die Veröffentlichungs-Hürde: Ohne mindestens eine gibt es keinen
 * veröffentlichten Eintrag. Damit ist ein Dokument lasttragend geworden, das
 * sich selbst als „abgeleitet, noch nicht mit Ölz validiert" bezeichnet — das
 * gehört bestätigt (Spec, Abschnitt 13).
 */
export const PRODUKTKATEGORIEN = [
  'Croissant & Plunder',
  'Süßes Gebäck',
  'Toast & Sandwich',
  'Snack & Mini-Format',
  'Saisonal',
] as const
export type Produktkategorie = (typeof PRODUKTKATEGORIEN)[number]

export type RisikoStatus = 'draft' | 'published' | 'ausgeraeumt'

export interface Risikosignal {
  id: string
  substance: string
  e_number: string | null
  stage: Stufe
  scope: Geltungsbereich
  situation: string
  source_name: string | null
  source_url: string | null
  source_date: string | null
  product_categories: string[]
  action: Handlung | null
  status: RisikoStatus
  published_at: string | null
  resolved_at: string | null
  ai_generated: boolean
  created_at: string
  updated_at: string
}

/**
 * Was zum Veröffentlichen fehlt — dieselbe Mechanik wie `missingForPublish`
 * im Rohstoff-Radar. Der Datenbank-CHECK ist die Durchsetzung, das hier die
 * Erklärung: Das Formular soll benennen können, was fehlt, statt nur zu
 * scheitern.
 */
const PUBLISH_REQUIREMENTS: { label: string; ok: (s: Partial<Risikosignal>) => boolean }[] = [
  { label: 'Stoff', ok: (s) => !!s.substance?.trim() },
  { label: 'Sachverhalt', ok: (s) => !!s.situation?.trim() },
  { label: 'Betroffene Produktkategorie', ok: (s) => (s.product_categories?.length ?? 0) >= 1 },
  { label: 'Handlung', ok: (s) => !!s.action },
  { label: 'Quellenname', ok: (s) => !!s.source_name?.trim() },
  { label: 'Quellen-URL', ok: (s) => !!s.source_url?.trim() },
  { label: 'Datum der Quelle', ok: (s) => !!s.source_date },
]

export function missingForPublish(signal: Partial<Risikosignal>): string[] {
  return PUBLISH_REQUIREMENTS.filter((r) => !r.ok(signal)).map((r) => r.label)
}

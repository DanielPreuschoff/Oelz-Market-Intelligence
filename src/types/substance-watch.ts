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

/**
 * Die drei Eintragstypen (Migration 016, 14.09.2026).
 *
 * Kai Heuberger will zweierlei früh erfahren: wenn die EFSA neue Rohstoffe
 * *zulässt* (eine Chance) und wenn die EU rechtliche Schritte plant — bei
 * Rohstoffen *und* Produkten. Der Reiter kannte nur Risiken zu benennbaren
 * Stoffen. `indirekt` fängt auf, was an der Hauptliste scheitert
 * (Zuckersteuer, Kennzeichnung, Präzedenzfälle), mit einem Pflichtsatz
 * statt einer Produktkategorie — sonst wäre es ein Newsfeed.
 */
export const EINTRAGSTYPEN = ['risiko', 'zulassung', 'indirekt'] as const
export type Eintragstyp = (typeof EINTRAGSTYPEN)[number]

export const EINTRAGSTYP_NAME: Record<Eintragstyp, string> = {
  risiko: 'Unter Beobachtung',
  zulassung: 'Zulassung',
  indirekt: 'Indirekt relevant',
}

export const EINTRAGSTYP_ERKLAERUNG: Record<Eintragstyp, string> = {
  risiko: 'Ein benennbarer Stoff steht unter regulatorischem oder öffentlichem Druck.',
  zulassung: 'Ein Stoff, Enzym, Aroma oder Novel Food wird zugelassen oder ist im Verfahren — eine Chance.',
  indirekt: 'Ein Rechtsakt ohne benennbaren Stoff oder ohne Ölz-Kategorie, der Ölz trotzdem treffen könnte.',
}

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

export const GELTUNGSBEREICHE = ['DE', 'AT', 'CH', 'EU'] as const
export type Geltungsbereich = (typeof GELTUNGSBEREICHE)[number]

/**
 * Deutschland ist der Frühindikator, nicht der Absatzmarkt. Kai Heuberger im
 * Termin vom 27.08.2026: „Wenn in Deutschland was ist, dann folgt Österreich in
 * der Regel." Deshalb ein eigenes Feld statt einer Fußnote im Fließtext.
 */
export const GELTUNGSBEREICH_NAME: Record<Geltungsbereich, string> = {
  DE: 'Deutschland',
  AT: 'Österreich',
  // Seit 14.09.2026 (Migration 015): Ölz verkauft in der Schweiz, und das
  // Schweizer Lebensmittelrecht ist nicht EU-harmonisiert — die einzige echte
  // Lücke unter den Ölz-Märkten. CZ, SK und SI deckt EU-Recht ab.
  CH: 'Schweiz',
  EU: 'EU',
}

/**
 * Wer die Meldung verantwortet — als Feld, nicht nur im Quellennamen, weil
 * Kai Heuberger einen Filter „EFSA / EU Regulation" wünscht (E-Mail vor dem
 * 11.09.2026). 'keine' ist der Wert für Stufe „Öffentliche Kritik".
 */
export const BEHOERDEN = ['efsa', 'eu_kommission', 'national', 'keine'] as const
export type Behoerde = (typeof BEHOERDEN)[number]

export const BEHOERDE_NAME: Record<Behoerde, string> = {
  efsa: 'EFSA',
  eu_kommission: 'EU-Kommission',
  national: 'National',
  keine: 'Keine Behörde',
}

export const BEHOERDE_ERKLAERUNG: Record<Behoerde, string> = {
  efsa: 'Gutachten, Neubewertung oder Konsultation der EFSA.',
  eu_kommission: 'Verordnung, Empfehlung, Entwurf oder Ausschussvotum (PAFF).',
  national: 'BfR, AGES, BLV oder ein nationales Ministerium.',
  keine: 'Medien, NGO oder Verbraucherschutz — Stufe „Öffentliche Kritik".',
}

/** Wörter einer Kurzzeile — die Vorgabe sind sieben bis elf. */
export function kurzzeileWoerter(text: string | null | undefined): number {
  return (text ?? '').trim().split(/\s+/).filter(Boolean).length
}
export const KURZZEILE_MIN = 7
export const KURZZEILE_MAX = 11

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
  /** Eintragstyp (Migration 016). Altfälle sind `risiko`. */
  kind: Eintragstyp
  /** Bei `indirekt` darf der Stoff leer sein ('' — die Spalte bleibt NOT NULL). */
  substance: string
  e_number: string | null
  /** Kurzzeile, sieben bis elf Wörter — was passiert gerade. Null nur bei Altfällen vor Migration 015. */
  teaser: string | null
  authority: Behoerde | null
  /** Nur bei `risiko`; Zulassung und Indirekt tragen keine Stufe. */
  stage: Stufe | null
  scope: Geltungsbereich
  situation: string
  /** Nur bei `indirekt`, dort Pflicht: „Warum könnte das Ölz betreffen?" */
  why_relevant: string | null
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
type Anforderung = { label: string; ok: (s: Partial<Risikosignal>) => boolean }

/** Für alle drei Typen gleich — der Ausweis jeder Meldung. */
const GEMEINSAM: Anforderung[] = [
  { label: 'Kurzzeile', ok: (s) => !!s.teaser?.trim() },
  { label: 'Behörde', ok: (s) => !!s.authority },
  { label: 'Sachverhalt', ok: (s) => !!s.situation?.trim() },
  { label: 'Quellenname', ok: (s) => !!s.source_name?.trim() },
  { label: 'Quellen-URL', ok: (s) => !!s.source_url?.trim() },
  { label: 'Datum der Quelle', ok: (s) => !!s.source_date },
]

const STOFF: Anforderung = { label: 'Stoff', ok: (s) => !!s.substance?.trim() }
const KATEGORIE: Anforderung = {
  label: 'Betroffene Produktkategorie',
  ok: (s) => (s.product_categories?.length ?? 0) >= 1,
}

/** Das Typspezifische — dieselbe Fallunterscheidung wie der CHECK in Migration 016. */
const JE_TYP: Record<Eintragstyp, Anforderung[]> = {
  risiko: [
    STOFF,
    KATEGORIE,
    { label: 'Stufe', ok: (s) => !!s.stage },
    { label: 'Handlung', ok: (s) => !!s.action },
  ],
  zulassung: [STOFF, KATEGORIE],
  indirekt: [{ label: 'Warum könnte das Ölz betreffen', ok: (s) => !!s.why_relevant?.trim() }],
}

export function missingForPublish(signal: Partial<Risikosignal>): string[] {
  const typ: Eintragstyp = signal.kind ?? 'risiko'
  return [...JE_TYP[typ], ...GEMEINSAM].filter((r) => !r.ok(signal)).map((r) => r.label)
}

/** Sortierung innerhalb eines Typs: Risiken nach Stufe, alles andere nach Quellendatum. */
export function vergleicheEintraege(a: Risikosignal, b: Risikosignal): number {
  if (a.kind === 'risiko' && b.kind === 'risiko') {
    const ra = a.stage ? STUFE_RANG[a.stage] : 99
    const rb = b.stage ? STUFE_RANG[b.stage] : 99
    return ra - rb || a.substance.localeCompare(b.substance, 'de')
  }
  return (b.source_date ?? '').localeCompare(a.source_date ?? '') || (a.teaser ?? a.substance).localeCompare(b.teaser ?? b.substance, 'de')
}

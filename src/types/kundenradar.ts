/**
 * Kundenradar — strategische Bewegungen der Handelskunden.
 *
 * Spec: docs/kundenradar-spec.md, Tabellen: Migration 019.
 * Entscheidung: docs/adr/0007-kundenradar-eigenes-modul.md.
 *
 * Ein Kundensignal beantwortet eine Frage: Welche Richtung schlägt dieser
 * Händler in diesem Land ein — und was heißt das für Ölz? Die Flughöhe ist
 * die der Lebensmittel Zeitung (Simon Greiner, 27.10.2026): keine Listungen,
 * keine Preise, keine Filialen.
 */

/** Die sechs Signaltypen (Spec §2). Schlüssel = Werte im CHECK von Migration 019. */
export const SIGNALTYPEN = [
  'strategie',
  'format_flaeche',
  'backstation_pos',
  'sortimentskonzept',
  'investition_expansion',
  'lieferkette',
] as const
export type Signaltyp = (typeof SIGNALTYPEN)[number]

export const SIGNALTYP_NAME: Record<Signaltyp, string> = {
  strategie: 'Strategie',
  format_flaeche: 'Format & Fläche',
  backstation_pos: 'Backstation & POS',
  sortimentskonzept: 'Sortimentskonzept',
  investition_expansion: 'Investition & Expansion',
  lieferkette: 'Lieferkette',
}

/** Beispiele aus der Spec — damit die Auswahl im Formular sich selbst erklärt. */
export const SIGNALTYP_ERKLAERUNG: Record<Signaltyp, string> = {
  strategie: 'Schwerpunkt der Kette: Eigenmarke, Protein, Bio, Convenience, Nachhaltigkeit, Preiseinstieg.',
  format_flaeche: 'Neues Filialkonzept, Verkaufsflächen, Platzierung der Warengruppen.',
  backstation_pos: 'SB-Backstation oder Bäckerei im Markt: ausgebaut, verkleinert, Konzept geändert.',
  sortimentskonzept: 'Eine Produktgruppe wird ausgebaut oder reduziert, neues Sortimentskonzept.',
  investition_expansion: 'Logistik- oder Produktionsstandort, Filialnetz, Markteintritt oder -austritt.',
  lieferkette: 'Öffentlich bekannter Lieferantenwechsel oder Lieferproblem — eine Vertriebschance.',
}

/** Wie Ölz zu einem Händler steht. Von Ölz gepflegt, nie aus Daten geraten. */
export const KUNDENSTATUS = ['kunde', 'ueber_partner', 'kein_kunde', 'unbekannt'] as const
export type Kundenstatus = (typeof KUNDENSTATUS)[number]

export const KUNDENSTATUS_NAME: Record<Kundenstatus, string> = {
  kunde: 'Kunde',
  ueber_partner: 'Über Partner',
  kein_kunde: 'Kein Kunde',
  unbekannt: 'Unbekannt',
}

/**
 * Farbe trägt die Nähe, in derselben Sprache wie im Regulatorik-Radar
 * (Grau → Braun → Orange): Direktkunde orange, über Partner braun, Rest grau.
 */
export const KUNDENSTATUS_CHIP: Record<Kundenstatus, string> = {
  kunde: 'border border-oelz-orange/35 bg-oelz-orange/12 text-oelz-orange-text',
  ueber_partner: 'border border-oelz-braun/25 bg-oelz-braun/10 text-oelz-braun',
  kein_kunde: 'border border-border text-muted-foreground',
  unbekannt: 'border border-border text-muted-foreground',
}

/** Erlaubte Länder (CHECK in Migration 019). Die Reihenfolge ist zugleich die Sortierung. */
export const LAENDER = ['DE', 'AT', 'CH', 'CZ', 'SK', 'SI', 'HR', 'RO', 'UK'] as const
export type Land = (typeof LAENDER)[number]

export const LAND_NAME: Record<Land, string> = {
  DE: 'Deutschland',
  AT: 'Österreich',
  CH: 'Schweiz',
  CZ: 'Tschechien',
  SK: 'Slowakei',
  SI: 'Slowenien',
  HR: 'Kroatien',
  RO: 'Rumänien',
  UK: 'Vereinigtes Königreich',
}

/** Richtwerte aus dem Prompt; das Formular zählt mit, blockiert aber nicht. */
export const TITEL_MAX = 70
export const KURZZEILE_MAX = 100

export type KundensignalStatus = 'draft' | 'published'

export interface Haendler {
  id: string
  name: string
  slug: string
  country: Land
  group_name: string | null
  customer_status: Kundenstatus
  profile: string | null
  profile_updated_at: string | null
  active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type HaendlerKurz = Pick<Haendler, 'id' | 'name' | 'slug' | 'country'>

export interface Kundensignal {
  id: string
  retailer_id: string
  signal_type: Signaltyp
  title: string
  teaser: string | null
  situation: string | null
  source_name: string | null
  source_url: string | null
  source_date: string | null
  oelz_relevance: string | null
  contact_trigger: boolean
  status: KundensignalStatus
  published_at: string | null
  ai_generated: boolean
  created_by: string | null
  created_at: string
  updated_at: string
  /** Nur wo die Abfrage `retailer:retailers(...)` mitlädt. */
  retailer?: HaendlerKurz | null
}

/** „Kaufland SK" — kurz genug für Listen und die Startseite. */
export function haendlerKurzname(h: Pick<Haendler, 'name' | 'country'>): string {
  return `${h.name} ${h.country}`
}

/** „Kaufland · Slowakei" — für Überschriften. */
export function haendlerLangname(h: Pick<Haendler, 'name' | 'country'>): string {
  return `${h.name} · ${LAND_NAME[h.country] ?? h.country}`
}

/**
 * Was zum Veröffentlichen fehlt — spiegelt `retailer_signals_published_complete`
 * aus Migration 019 genau. Der CHECK ist die Durchsetzung, das hier die
 * Erklärung: Das Formular benennt, woran es liegt, statt nur zu scheitern.
 */
const ANFORDERUNGEN: { label: string; ok: (s: Partial<Kundensignal>) => boolean }[] = [
  { label: 'Händler', ok: (s) => !!s.retailer_id },
  { label: 'Titel', ok: (s) => !!s.title?.trim() },
  { label: 'Kurzzeile', ok: (s) => !!s.teaser?.trim() },
  { label: 'Sachverhalt', ok: (s) => !!s.situation?.trim() },
  { label: 'Für Ölz', ok: (s) => !!s.oelz_relevance?.trim() },
  { label: 'Quellen-URL', ok: (s) => !!s.source_url?.trim() },
  { label: 'Datum der Quelle', ok: (s) => !!s.source_date },
]

export function missingForPublish(signal: Partial<Kundensignal>): string[] {
  return ANFORDERUNGEN.filter((r) => !r.ok(signal)).map((r) => r.label)
}

/** Neuestes Ereignis zuerst: Datum der Quelle, dann Anlage. */
export function vergleicheKundensignale(a: Kundensignal, b: Kundensignal): number {
  return (
    (b.source_date ?? '').localeCompare(a.source_date ?? '') ||
    b.created_at.localeCompare(a.created_at)
  )
}

const LAND_RANG = Object.fromEntries(LAENDER.map((l, i) => [l, i])) as Record<Land, number>

/** Land (in der Reihenfolge von LAENDER), dann Pflegereihenfolge, dann Name. */
export function vergleicheHaendler(a: Haendler, b: Haendler): number {
  return (
    (LAND_RANG[a.country] ?? 99) - (LAND_RANG[b.country] ?? 99) ||
    a.sort_order - b.sort_order ||
    a.name.localeCompare(b.name, 'de')
  )
}

/**
 * Gruppen für die Übersicht: Konzerne alphabetisch, darin nach Land — so stehen
 * die Kaufland-Länder nebeneinander, und der Ländervergleich braucht keinen
 * Klick (Spec §11.3). Händler ohne Konzern bilden die letzte Gruppe.
 */
export function gruppiereHaendler(liste: Haendler[]): { gruppe: string | null; haendler: Haendler[] }[] {
  const nachGruppe = new Map<string | null, Haendler[]>()
  for (const h of liste) {
    const key = h.group_name?.trim() || null
    nachGruppe.set(key, [...(nachGruppe.get(key) ?? []), h])
  }
  return [...nachGruppe.entries()]
    .sort(([a], [b]) => (a === null ? 1 : b === null ? -1 : a.localeCompare(b, 'de')))
    .map(([gruppe, haendler]) => ({ gruppe, haendler: [...haendler].sort(vergleicheHaendler) }))
}

/** „Sainsbury's" + „UK" → „sainsburys-uk". Adresse des Dossiers, Schlüssel im Import. */
export function slugify(name: string, country: string): string {
  const teil = (s: string) =>
    s
      .toLowerCase()
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  return [teil(name), teil(country)].filter(Boolean).join('-')
}

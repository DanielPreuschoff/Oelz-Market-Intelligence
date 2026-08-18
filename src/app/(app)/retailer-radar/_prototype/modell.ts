// PROTOTYP — Wegwerfcode (Branch prototype/retailer-radar-ui).
// Datenmodell des Retailer-Radars auf den echten Prototyp-Daten von Mercator (SI)
// und Košík (CZ), 17.08.2026. Der „Vorlauf" (Juli) ist SIMULIERT — deterministisch
// aus den Ist-Daten abgeleitet, damit Ereignisse, Δ und Verläufe sichtbar werden.
// Begriffe nach CONTEXT.md: Händler, Kundenstatus, Quelle, Lauf, Beobachtung,
// Listung, Artikel, Herkunft, Produktkategorie, Aktion, Grundpreis, Ereignis.

import mercatorRoh from './daten/mercator.json'
import kosikRoh from './daten/kosik.json'
import hoferRoh from './daten/hofer.json'
import sparRoh from './daten/spar.json'
import lidlRoh from './daten/lidl.json'

export type Herkunft = 'oelz' | 'eigenmarke' | 'fremdmarke' | 'unbekannt'
export type Produktkategorie = 'toast' | 'croissant_plunder' | 'suess' | 'snack' | 'brot' | 'sonstiges'
export const KATEGORIE_NAME: Record<Produktkategorie, string> = {
  toast: 'Toast & Sandwich',
  croissant_plunder: 'Croissant & Plunder',
  suess: 'Süßes Gebäck',
  snack: 'Snack & Mini',
  brot: 'Brot (Kontext)',
  sonstiges: 'Sonstiges',
}
export const HERKUNFT_NAME: Record<Herkunft, string> = {
  oelz: 'Ölz',
  eigenmarke: 'Eigenmarke',
  fremdmarke: 'Fremdmarke',
  unbekannt: 'unbekannt',
}

// Händler-Meldung: qualitatives Ereignis am Händler — Meldung, nicht Messung.
// Dieselbe Struktur wie ein Signal des Wettbewerbsradars, dieselbe Kategorie-
// Taxonomie (docs/category-taxonomy.md), aber am Händler statt am Wettbewerber.
// Stufe 1: von Hand erfasst (Kai/Admin), später aus monatlicher Recherche.
export type MeldungKategorie =
  | 'distribution' | 'pricing' | 'product_launch' | 'm_and_a' | 'hiring_signal'
  | 'production_capacity' | 'packaging_change' | 'sustainability' | 'regulatory' | 'partnership' | 'campaign' | 'technology'
export const MELDUNG_KATEGORIE_NAME: Record<MeldungKategorie, string> = {
  distribution: 'Listung & Format', pricing: 'Preispolitik', product_launch: 'Eigenmarke', m_and_a: 'Übernahme & Fusion',
  hiring_signal: 'Führung & Personal', production_capacity: 'Kapazität & Backshop', packaging_change: 'Verpackung',
  sustainability: 'Nachhaltigkeit', regulatory: 'Regulatorik', partnership: 'Partnerschaft', campaign: 'Kampagne', technology: 'Technologie',
}
export interface HaendlerMeldung {
  datum: string
  kategorie: MeldungKategorie
  titel: string
  zusammenfassung: string
  quelle: string
  quelleUrl?: string
  rollen: ('management' | 'sales' | 'marketing' | 'innovation')[]
  /** Im Prototyp: erfundene Beispielmeldung zur Veranschaulichung — sichtbar so gekennzeichnet. */
  beispiel?: boolean
}

export type Kundenstatus = 'kunde' | 'kein_kunde' | 'unbekannt'
export type Zugang = 'frei' | 'browser' | 'freigabe' | 'gesperrt' | 'keine'

export interface Haendler {
  id: string
  kette: string
  land: 'AT' | 'CZ' | 'SK' | 'SI'
  waehrung: 'EUR' | 'CZK'
  kundenstatus: Kundenstatus
  vollsortiment: { zugang: Zugang; quelle?: string }
  aktionen: { zugang: Zugang; quelle?: string }
  /** Betriebshinweise (Quelle, Einschränkung) — keine Fachinformation. */
  notizen: { datum: string; quelle: string; text: string }[]
  /** Händler-Meldungen: was der Händler selbst tut. */
  meldungen: HaendlerMeldung[]
  /** Nur eine Stichprobe, kein vollständiger Lauf — Anteilszahlen sind dann
   *  nicht aussagekräftig und werden unterdrückt. */
  stichprobe?: string
  /** Quelle zeigt nur Aktionsartikel (Lidl): Sortimentskennzahlen und die
   *  Ereignisse rund um Listungen sind dort nicht messbar. */
  nurAktionen?: boolean
}

// Kundenstatus nach Kais Liste (REWE, SPAR, Lidl, HOFER, Aldi, Kaufland, Tesco „und mehr");
// Datenverfügbarkeit nach Faktencheck 17.08. (Spec Abschnitt 4).
export const HAENDLER: Haendler[] = [
  { id: 'mercator-si', kette: 'Mercator', land: 'SI', waehrung: 'EUR', kundenstatus: 'unbekannt',
    vollsortiment: { zugang: 'frei', quelle: 'mercatoronline.si' }, aktionen: { zugang: 'frei', quelle: 'Shop' },
    notizen: [], meldungen: [] },
  { id: 'kosik-cz', kette: 'Košík', land: 'CZ', waehrung: 'CZK', kundenstatus: 'unbekannt',
    vollsortiment: { zugang: 'frei', quelle: 'kosik.cz' }, aktionen: { zugang: 'frei', quelle: 'Shop' },
    notizen: [], meldungen: [] },
  { id: 'rewe-at', kette: 'REWE (BILLA · PENNY · ADEG)', land: 'AT', waehrung: 'EUR', kundenstatus: 'kunde',
    vollsortiment: { zugang: 'freigabe', quelle: 'shop.billa.at (AGB § 6)' }, aktionen: { zugang: 'frei', quelle: 'marktguru.at · penny.at' },
    notizen: [{ datum: '2026-08-12', quelle: 'Kai Heuberger', text: 'Freigabe für Shop-Daten über den Key Account anfragen.' }] ,
    meldungen: [
      { datum: '2026-08-06', kategorie: 'hiring_signal', titel: 'Neue Einkaufsleitung Brot & Backwaren bei BILLA', beispiel: true, rollen: ['sales', 'management'],
        zusammenfassung: 'BEISPIEL (erfunden): Der Bereich Brot & Backwaren bei BILLA bekommt zum 1. September eine neue Leitung; die bisherige Leiterin wechselt in den Einkauf Molkerei. Für Ölz relevant, weil laufende Listungsgespräche mit dem neuen Ansprechpartner neu aufgesetzt werden müssen.',
        quelle: 'Beispiel — so sähe eine LZ-Notiz von Kai aus' },
    ], },
  { id: 'spar-at', kette: 'SPAR (SPAR · EUROSPAR · INTERSPAR)', land: 'AT', waehrung: 'EUR', kundenstatus: 'kunde',
    vollsortiment: { zugang: 'freigabe', quelle: 'spar.at/produktwelt — EINMALIGE STICHPROBE 18.08., Freigabe steht aus' }, aktionen: { zugang: 'frei', quelle: 'im Katalog enthalten' },
    stichprobe: 'Ölz-Suche plus drei Seiten der Kategorie „Aufbackware, Toast & Tiefkühlgebäck" — mit Eigen- und Fremdmarken, aber Ölz-lastig. Der Ölz-Anteil wird deshalb nicht ausgewiesen.',
    notizen: [{ datum: '2026-08-18', quelle: 'Metadine', text: 'Nur Demo: 106 Artikel einmalig von Hand erfasst (39 Ölz, 34 Eigenmarken, 33 Fremdmarken von Schär bis Resch&Frisch). SPARs Nutzungsbedingungen 2.1 verlangen für die Übernahme in andere Systeme eine schriftliche Genehmigung — es gibt hier bewusst KEINEN Adapter und keine laufende Erhebung. Cloudflare blockt automatisierte Zugriffe ohnehin.' }] ,
    meldungen: [
      { datum: '2026-08-11', kategorie: 'product_launch', titel: 'SPAR erweitert Eigenmarken-Linie im süßen Gebäck', beispiel: true, rollen: ['sales', 'marketing', 'innovation'],
        zusammenfassung: 'BEISPIEL (erfunden): SPAR kündigt sechs neue Artikel unter SPAR PREMIUM im süßen Feingebäck an — Striezel, Zopf und Kuchen im 400-g-Format, Regalstart Oktober. Direkter Wettbewerb zu Ölz Familien Butter Zopf und Mohn Streuselkuchen im selben Regal.',
        quelle: 'Beispiel — Presseraum SPAR / LZ' },
    ], },
  { id: 'hofer-at', kette: 'HOFER', land: 'AT', waehrung: 'EUR', kundenstatus: 'kunde',
    vollsortiment: { zugang: 'frei', quelle: 'asl.api.hofer.at (Dauersortiment, Filiale A613)' }, aktionen: { zugang: 'frei', quelle: 'marktguru.at' },
    notizen: [{ datum: '2026-08-18', quelle: 'Prototyp', text: 'Preise sind filialbezogen — fester servicePoint A613 (Wien), damit Läufe vergleichbar bleiben.' }] ,
    meldungen: [
      { datum: '2026-07-29', kategorie: 'pricing', titel: 'HOFER senkt Preise im Brot- und Backwarenregal dauerhaft', beispiel: true, rollen: ['sales', 'management'],
        zusammenfassung: 'BEISPIEL (erfunden): Im Rahmen der Aktion „HOFER Preis – dauerhaft günstiger" werden 40 Artikel im Brot- und Backwarenregal um bis zu 15 % gesenkt, darunter Toast und Sandwich der Eigenmarken. Verschiebt die Preisleiter, in der Ölz Schulmaus als einziger Markenartikel steht.',
        quelle: 'Beispiel — Presseraum HOFER' },
    ], },
  { id: 'lidl-at', kette: 'Lidl', land: 'AT', waehrung: 'EUR', kundenstatus: 'kunde',
    vollsortiment: { zugang: 'keine' }, aktionen: { zugang: 'frei', quelle: 'lidl.at (Browser-Adapter)' },
    nurAktionen: true,
    notizen: [{ datum: '2026-08-18', quelle: 'Prototyp', text: 'Lidl zeigt online ausschließlich Aktionsartikel mit Gültigkeitsfenster, kein Dauersortiment. Damit sind neue Listung, Auslistung, Wiederlistung und Preisänderung hier nicht messbar — nur Aktionen.' }] ,
    meldungen: [
      { datum: '2026-08-14', kategorie: 'production_capacity', titel: 'Lidl baut Backshop-Konzept in weiteren Filialen aus', beispiel: true, rollen: ['sales', 'management'],
        zusammenfassung: 'BEISPIEL (erfunden): Lidl Österreich rüstet bis Jahresende 60 weitere Filialen mit dem erweiterten Backshop aus (Aufbackware vor Ort, breiteres Frischgebäck). Verschiebt Fläche und Aufmerksamkeit von verpackter Ware — dem Segment, in dem Ölz bei Lidl gelistet ist — zur losen.',
        quelle: 'Beispiel — Cash / Presseraum Lidl' },
    ], },
  { id: 'tesco-sk', kette: 'Tesco', land: 'SK', waehrung: 'EUR', kundenstatus: 'kunde',
    vollsortiment: { zugang: 'browser', quelle: 'potravinydomov.itesco.sk' }, aktionen: { zugang: 'browser', quelle: 'Clubcard im Shop' },
    notizen: [], meldungen: [] },
  { id: 'kaufland-sk', kette: 'Kaufland', land: 'SK', waehrung: 'EUR', kundenstatus: 'kunde',
    vollsortiment: { zugang: 'keine' }, aktionen: { zugang: 'frei', quelle: 'predajne.kaufland.sk (640 Aktionen, inkl. Ölz)' },
    notizen: [], meldungen: [] },
  { id: 'billa-cz', kette: 'BILLA', land: 'CZ', waehrung: 'CZK', kundenstatus: 'kunde',
    vollsortiment: { zugang: 'frei', quelle: 'billa.cz/produkty (Katalog, 7 Ölz-SKUs)' }, aktionen: { zugang: 'frei', quelle: 'kupi.cz' },
    notizen: [], meldungen: [] },
  { id: 'rohlik-cz', kette: 'Rohlik', land: 'CZ', waehrung: 'CZK', kundenstatus: 'unbekannt',
    vollsortiment: { zugang: 'frei', quelle: 'rohlik.cz' }, aktionen: { zugang: 'frei', quelle: 'Shop' },
    notizen: [], meldungen: [] },
]

export interface Listung {
  id: string            // Händler + Shop-Kennung
  haendlerId: string
  name: string
  marke: string | null
  herkunft: Herkunft
  kategorie: Produktkategorie
  gtin: string | null
  menge: number | null
  einheit: string | null
  pfad: string
  url: string | null
  bild: string | null
  // Beobachtungen: [Vorlauf (simuliert), Ist]
  jetzt: Beobachtung | null       // null = im Ist-Lauf nicht mehr gesehen (Auslistung läuft)
  vorher: Beobachtung | null      // null = im Vorlauf nicht gesehen (neue Listung)
}
export interface Beobachtung {
  preis: number
  regulaer: number | null
  aktion: boolean
  rabatt: number | null
  grundpreis: number | null      // Landeswährung je Basis
  basis: string | null           // '1kg' | '1ks' …
}

export const KURS_CZK_EUR = 25.0 // Monatskurs Aug 2026 (Prototyp: gerundet)
export const LAUF_ISTS = '2026-08-17'
export const LAUF_VOR = '2026-07-15'

export function inEur(betrag: number, waehrung: 'EUR' | 'CZK') {
  return waehrung === 'CZK' ? betrag / KURS_CZK_EUR : betrag
}

// FNV-1a: deterministischer Zufall je Listung, damit der simulierte Vorlauf
// bei jedem Aufruf gleich aussieht.
function hash(s: string, salz = 0): number {
  let h = (0x811c9dc5 ^ salz) >>> 0
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 }
  return h / 0xffffffff
}

// Eigener Typ statt (typeof json)[number]: TypeScript leitet aus JSON je Zeile
// einen anderen Typ ab (null vs. number), was die Vereinigung unbrauchbar macht.
interface Roh {
  id: string; name: string; marke: string | null; preis: number; regulaer: number | null
  aktion: boolean; rabatt: number | null; grundpreis: number | null; basis: string | null
  menge: number | null; einheit: string | null; gtin: string | null
  pfad: string; url: string | null; bild: string | null; zuordnung: string; kategorie: string
}

function baueListungen(haendlerId: string, roh: Roh[]): Listung[] {
  const list: Listung[] = []
  for (const z of roh) {
    const id = `${haendlerId}:${z.id}`
    const jetzt: Beobachtung = {
      preis: z.preis, regulaer: z.regulaer ?? null, aktion: !!z.aktion, rabatt: z.rabatt ?? null,
      grundpreis: z.grundpreis ?? null, basis: z.basis ?? null,
    }
    // Simulierter Vorlauf:
    //  - 4 % der Artikel gab es im Juli noch nicht  → neue Listung
    //  - 9 % hatten einen anderen regulären Preis (±5–14 %) → Preisänderung
    //  - Aktionen: was jetzt in Aktion ist, war es im Juli meist nicht (und umgekehrt bei 3 %)
    const r1 = hash(id, 1), r2 = hash(id, 2), r3 = hash(id, 3), r4 = hash(id, 4)
    let vorher: Beobachtung | null
    if (r1 < 0.04) vorher = null
    else {
      const regJetzt = jetzt.regulaer ?? jetzt.preis
      let regVor = regJetzt
      if (r2 < 0.09) regVor = +(regJetzt * (1 + (r3 < 0.5 ? -1 : 1) * (0.05 + r4 * 0.09))).toFixed(2)
      const warAktion = jetzt.aktion ? r3 < 0.15 : r4 < 0.03
      const preisVor = warAktion ? +(regVor * 0.8).toFixed(2) : regVor
      const faktor = jetzt.grundpreis && jetzt.preis ? jetzt.grundpreis / jetzt.preis : null
      vorher = {
        preis: preisVor, regulaer: warAktion ? regVor : null, aktion: warAktion, rabatt: warAktion ? 20 : null,
        grundpreis: faktor ? +(preisVor * faktor).toFixed(2) : null, basis: jetzt.basis,
      }
    }
    list.push({
      id, haendlerId, name: z.name, marke: z.marke ?? null,
      herkunft: (z.zuordnung === 'wettbewerber' ? 'fremdmarke' : z.zuordnung) as Herkunft,
      kategorie: z.kategorie as Produktkategorie,
      gtin: z.gtin ?? null, menge: z.menge ?? null, einheit: z.einheit ?? null, pfad: z.pfad, url: z.url ?? null, bild: z.bild ?? null,
      jetzt, vorher,
    })
  }
  // 2 % zusätzliche „Geister"-Listungen: im Juli gesehen, jetzt nicht mehr → Auslistung (1. fehlender Lauf)
  const geister = roh.filter((z) => hash(`${haendlerId}:${z.id}`, 9) < 0.02).slice(0, 8)
  for (const z of geister) {
    const id = `${haendlerId}:aus-${z.id}`
    list.push({
      id, haendlerId, name: z.name.replace(/(\d+) ?g/, (m, n) => `${Math.round(Number(n) * 1.5)} g`) + ' (Vorjahresformat)',
      marke: z.marke ?? null, herkunft: (z.zuordnung === 'wettbewerber' ? 'fremdmarke' : z.zuordnung) as Herkunft,
      kategorie: z.kategorie as Produktkategorie, gtin: null, menge: z.menge ? z.menge * 1.5 : null, einheit: z.einheit ?? null,
      pfad: z.pfad, url: null, bild: null,
      jetzt: null,
      vorher: { preis: z.preis, regulaer: null, aktion: false, rabatt: null, grundpreis: z.grundpreis ?? null, basis: z.basis ?? null },
    })
  }
  return list
}

export const LISTUNGEN: Listung[] = [
  ...baueListungen('mercator-si', mercatorRoh as unknown as Roh[]),
  ...baueListungen('kosik-cz', kosikRoh as unknown as Roh[]),
  ...baueListungen('hofer-at', hoferRoh as unknown as Roh[]),
  ...baueListungen('spar-at', sparRoh as unknown as Roh[]),
  ...baueListungen('lidl-at', lidlRoh as unknown as Roh[]),
]

// ------------------------------------------------------------------ Ereignisse
export type EreignisTyp = 'neue_listung' | 'auslistung' | 'wiederlistung' | 'preisaenderung' | 'neue_eigenmarke' | 'oelz_aktion'
export const EREIGNIS_NAME: Record<EreignisTyp, string> = {
  neue_listung: 'Neue Listung', auslistung: 'Auslistung (1. fehlender Lauf)', wiederlistung: 'Wiederlistung',
  preisaenderung: 'Preisänderung', neue_eigenmarke: 'Neue Eigenmarke', oelz_aktion: 'Ölz in Aktion',
}
export interface Ereignis { typ: EreignisTyp; listung: Listung; vorher?: number | null; nachher?: number | null; delta?: number | null }

export function ereignisse(listungen: Listung[], nurAktionen = false): Ereignis[] {
  const e: Ereignis[] = []
  for (const l of listungen) {
    if (nurAktionen) {
      // Bei einer reinen Aktionsquelle heißt „neu" nur: neue Aktionswoche.
      if (l.jetzt?.aktion && l.herkunft === 'oelz') e.push({ typ: 'oelz_aktion', listung: l, vorher: l.jetzt.regulaer, nachher: l.jetzt.preis, delta: l.jetzt.rabatt != null ? -l.jetzt.rabatt / 100 : null })
      continue
    }
    if (l.jetzt && !l.vorher) {
      e.push({ typ: l.herkunft === 'eigenmarke' ? 'neue_eigenmarke' : 'neue_listung', listung: l })
      continue
    }
    if (!l.jetzt && l.vorher) { e.push({ typ: 'auslistung', listung: l }); continue }
    if (l.jetzt && l.vorher) {
      const rj = l.jetzt.regulaer ?? l.jetzt.preis
      const rv = l.vorher.regulaer ?? l.vorher.preis
      const d = rv ? (rj - rv) / rv : 0
      if (Math.abs(d) >= 0.05) e.push({ typ: 'preisaenderung', listung: l, vorher: rv, nachher: rj, delta: d })
      if (l.jetzt.aktion && l.herkunft === 'oelz') e.push({ typ: 'oelz_aktion', listung: l, vorher: l.jetzt.regulaer, nachher: l.jetzt.preis, delta: l.jetzt.rabatt != null ? -l.jetzt.rabatt / 100 : null })
    }
  }
  return e
}

// ------------------------------------------------------------------ Kennzahlen
export interface HaendlerKennzahlen {
  haendler: Haendler
  hatDaten: boolean
  artikel: number
  oelz: number
  oelzVorher: number
  eigenmarke: number
  fremdmarke: number
  unbekannt: number
  anteilOelz: number | null           // Anteil Ölz an Listungen (Backwaren, ohne Brot-Kontext? nein: alle)
  toastIndexOelz: number | null       // Median €/kg Ölz Toast / Median €/kg Toast gesamt × 100
  abstandOelzEm: number | null        // Median €/kg Ölz vs Eigenmarke (gleiche Kategorie Toast), in %
  aktionsanteilOelz: number | null
  positionsklassen: { guenstiger: number; gleich: number; teurer: number } | null // Ölz vs. EM-Median je Kategorie
  ereignisse: Ereignis[]
  listungen: Listung[]
}

const median = (a: number[]) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)] }

export function kgPreis(l: Listung, b: Beobachtung | null = l.jetzt): number | null {
  if (!b) return null
  if (b.grundpreis != null && b.basis === '1kg') return b.grundpreis
  if (l.menge && l.einheit === 'g') return +(b.preis / (l.menge / 1000)).toFixed(2)
  return null
}

export function kennzahlen(h: Haendler): HaendlerKennzahlen {
  const listungen = LISTUNGEN.filter((l) => l.haendlerId === h.id)
  const aktiv = listungen.filter((l) => l.jetzt)
  const hatDaten = aktiv.length > 0
  const zaehl = (herk: Herkunft, arr = aktiv) => arr.filter((l) => l.herkunft === herk).length
  const oelz = aktiv.filter((l) => l.herkunft === 'oelz')
  const oelzVorher = listungen.filter((l) => l.herkunft === 'oelz' && l.vorher).length
  const em = aktiv.filter((l) => l.herkunft === 'eigenmarke')
  // Bezugsgröße bewusst OHNE Ölz: sonst vergleicht sich die Marke teilweise mit
  // sich selbst. Bei SPAR sind 10 von 18 Toast-Artikeln Ölz — der Index fiele
  // dadurch von 174 auf 132 und sähe harmloser aus, als er ist.
  const toastAlle = aktiv.filter((l) => l.kategorie === 'toast' && l.herkunft !== 'oelz').map((l) => kgPreis(l)).filter((x): x is number => x != null)
  const toastOelz = oelz.filter((l) => l.kategorie === 'toast').map((l) => kgPreis(l)).filter((x): x is number => x != null)
  const toastEm = em.filter((l) => l.kategorie === 'toast').map((l) => kgPreis(l)).filter((x): x is number => x != null)
  const mO = median(toastOelz), mA = median(toastAlle), mE = median(toastEm)

  // Positionsklassen: jeder Ölz-Artikel gegen den EM-Median seiner Kategorie (±5 % = gleich)
  let pk: HaendlerKennzahlen['positionsklassen'] = null
  if (oelz.length) {
    pk = { guenstiger: 0, gleich: 0, teurer: 0 }
    for (const l of oelz) {
      const ref = median(em.filter((x) => x.kategorie === l.kategorie).map((x) => kgPreis(x)).filter((x): x is number => x != null))
        ?? median(aktiv.filter((x) => x.kategorie === l.kategorie && x.herkunft !== 'oelz').map((x) => kgPreis(x)).filter((x): x is number => x != null))
      const p = kgPreis(l)
      if (ref == null || p == null) continue
      const d = (p - ref) / ref
      if (d < -0.05) pk.guenstiger++; else if (d > 0.05) pk.teurer++; else pk.gleich++
    }
  }
  return {
    haendler: h, hatDaten,
    artikel: aktiv.length, oelz: oelz.length, oelzVorher,
    eigenmarke: zaehl('eigenmarke'), fremdmarke: zaehl('fremdmarke'), unbekannt: zaehl('unbekannt'),
    anteilOelz: hatDaten && !h.stichprobe && !h.nurAktionen ? oelz.length / aktiv.length : null,
    toastIndexOelz: mO != null && mA ? Math.round((mO / mA) * 100) : null,
    abstandOelzEm: mO != null && mE ? Math.round(((mO - mE) / mE) * 100) : null,
    aktionsanteilOelz: oelz.length ? oelz.filter((l) => l.jetzt?.aktion).length / oelz.length : null,
    positionsklassen: pk,
    ereignisse: ereignisse(listungen, h.nurAktionen),
    listungen,
  }
}

export const ALLE_KENNZAHLEN = HAENDLER.map(kennzahlen)

// Ölz-Artikel händlerübergreifend (für die Preismatrix). Ohne GTIN-Übereinstimmung
// bleibt jeder Artikel eigenständig — genau wie im Modell (Zusammenführung durch
// GTIN oder Admin). Hier: Gruppierung über GTIN, sonst je Listung.
export interface MatrixZeile { schluessel: string; name: string; kategorie: Produktkategorie; menge: string; ueberGtin: boolean; ueberName: boolean; zellen: Record<string, { listung: Listung; eur: number; kg: number | null; kgEur: number | null; delta: number | null }> }

/**
 * Zusammenführung ohne GTIN, als Demonstration. Drei Schritte:
 *  1. Namen entdiakritisieren und in Merkmalswörter übersetzen (sl/cs → deutsch),
 *  2. nach Füllmenge gruppieren (750 g Sandwich ≠ 375 g Sandwich),
 *  3. innerhalb einer Gruppe zwei Listungen verschiedener Händler zusammenlegen,
 *     wenn ihre Merkmalsmengen sich zu mindestens 60 % decken (Jaccard).
 *
 * Ausdrücklich UNSICHER: im echten Modul geht so ein Treffer in die Prüfliste,
 * nicht automatisch durch. Der Prototyp zeigt damit, was die GTIN-Liste von Ölz
 * (Frage 3 an Kai) wert wäre — mit ihr entfällt dieser ganze Abschnitt.
 */
const WORT: Record<string, string> = {
  // Warengruppe
  toast: 'toast', toust: 'toast', toustovy: 'toast',
  sendvic: 'sandwich', sendwich: 'sandwich', sandwich: 'sandwich',
  kruh: 'brot', chleb: 'brot', chlebik: 'brot',
  zavin: 'strudel', vanocka: 'striezel', pletenica: 'striezel', pletenice: 'striezel',
  rogljicki: 'kipferl', rogljic: 'kipferl', housticky: 'milchbroetchen', polzki: 'schnecke',
  burger: 'burger', vaflji: 'waffel', pecivo: '', kolac: '',
  // Sorte
  masleni: 'butter', maslova: 'butter', maslovy: 'butter', maslen: 'butter',
  veczrnati: 'mehrkorn', vicezrnny: 'mehrkorn', vecerni: '',
  psenicni: 'weizen', psenicny: 'weizen', beli: 'weiss',
  polnozrnati: 'vollkorn', celozrnny: 'vollkorn',
  mlecni: 'milch', mlecne: 'milch', mesani: 'gemischt',
  makovy: 'mohn', orechovy: 'nuss', lesnikovi: 'nuss', lesniki: 'nuss',
  cokolado: 'schoko', cokoladou: 'schoko', pirin: 'dinkel',
  velikan: 'gross', mini: 'mini', super: 'super', mehek: 'soft', soft: 'soft',
  italsky: 'italienisch', marmorno: 'marmor', brios: 'brioche', sezamom: 'sesam',
  rozinkami: 'rosinen', medem: 'honig', kremo: 'creme',
}
const ohneDia = (s: string) =>
  s.toLowerCase().replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ä/g, 'a').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')

function merkmale(name: string): Set<string> {
  return new Set(
    ohneDia(name)
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((w) => w.length > 2 && !/^(olz|olzs|pakirano|krajena|balene|farmer|classic|kos|ks)$/.test(w))
      .map((w) => (w in WORT ? WORT[w] : ''))
      .filter(Boolean)
  )
}
function deckung(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0
  let schnitt = 0
  a.forEach((x) => { if (b.has(x)) schnitt++ })
  return schnitt / (a.size + b.size - schnitt)
}

export function preismatrix(): MatrixZeile[] {
  const oelz = LISTUNGEN.filter((x) => x.herkunft === 'oelz' && x.jetzt)
  type Gruppe = { listungen: Listung[]; merkmale: Set<string>; menge: number }
  const gruppen: Gruppe[] = []

  for (const l of oelz) {
    const m = merkmale(l.name)
    const menge = l.menge ? Math.round(l.menge) : 0
    // 1) exakte GTIN-Übereinstimmung
    let ziel = l.gtin ? gruppen.find((g) => g.listungen.some((x) => x.gtin === l.gtin)) : undefined
    // 2) sonst gleiche Füllmenge (±5 %) + Merkmalsdeckung ≥ 60 %, anderer Händler
    if (!ziel && m.size) {
      ziel = gruppen.find((g) =>
        g.menge > 0 && menge > 0 && Math.abs(g.menge - menge) / g.menge <= 0.05 &&
        deckung(g.merkmale, m) >= 0.6 &&
        g.listungen.every((x) => x.haendlerId !== l.haendlerId)
      )
    }
    if (ziel) { ziel.listungen.push(l); m.forEach((x) => ziel!.merkmale.add(x)) }
    else gruppen.push({ listungen: [l], merkmale: m, menge })
  }

  return gruppen.map((g) => {
    const erste = g.listungen[0]
    const zellen: MatrixZeile['zellen'] = {}
    for (const l of g.listungen) {
      const h = HAENDLER.find((x) => x.id === l.haendlerId)!
      const kg = kgPreis(l)
      const rv = l.vorher ? (l.vorher.regulaer ?? l.vorher.preis) : null
      const rj = l.jetzt!.regulaer ?? l.jetzt!.preis
      zellen[h.id] = { listung: l, eur: inEur(l.jetzt!.preis, h.waehrung), kg, kgEur: kg != null ? inEur(kg, h.waehrung) : null, delta: rv ? (rj - rv) / rv : null }
    }
    const mitGtin = g.listungen.find((l) => l.gtin)
    return {
      schluessel: mitGtin?.gtin ?? erste.id,
      name: erste.name,
      kategorie: erste.kategorie,
      menge: g.menge ? `${g.menge} g` : '',
      ueberGtin: !!mitGtin,
      ueberName: g.listungen.length > 1 && !g.listungen.every((l) => l.gtin === mitGtin?.gtin),
      zellen,
    }
  }).sort((a, b) => a.kategorie.localeCompare(b.kategorie) || a.name.localeCompare(b.name))
}

export function preisleiter(h: Haendler, kategorie: Produktkategorie) {
  return LISTUNGEN.filter((l) => l.haendlerId === h.id && l.jetzt && l.kategorie === kategorie)
    .map((l) => ({ listung: l, kg: kgPreis(l) }))
    .filter((x): x is { listung: Listung; kg: number } => x.kg != null)
    .sort((a, b) => a.kg - b.kg)
}

export function fmtPreis(betrag: number, waehrung: 'EUR' | 'CZK') {
  return waehrung === 'CZK' ? `${betrag.toFixed(2).replace('.', ',')} Kč` : `${betrag.toFixed(2).replace('.', ',')} €`
}
export function fmtPct(x: number, vorzeichen = true) {
  const v = Math.round(x * 100)
  return `${vorzeichen && v > 0 ? '+' : ''}${v} %`
}

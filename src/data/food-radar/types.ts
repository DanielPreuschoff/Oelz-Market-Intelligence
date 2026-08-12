/**
 * Food Radar — Datenmodell der beiden Radartafeln.
 *
 * HERKUNFT: Die Einträge stammen aus den öffentlich eingebetteten Trendradaren
 * von **foodRegio Innovation** (gehostet auf FIBRES), ausgelesen am 10.08.2026.
 * Sie sind foodRegios redaktionelle Arbeit und werden hier mit Quellenangabe
 * gezeigt. Rechtestand: foodRegio sieht die fertige Umsetzung vor der Nutzung
 * durch. Siehe docs/trend-radar-spec.md, Abschnitt 0.
 *
 * Die Darstellung selbst — Ringe, Sektoren, klickbare Punkte — ist ein seit
 * Jahrzehnten verbreitetes Format und unproblematisch.
 */

/** Ebene eines Eintrags. Bestimmt Farbe und Größe des Punktes. */
export type RadarEbene = 'signal' | 'cluster' | 'trend'

/** Punktgröße, wie im Original: drei Stufen nach Zahl der verknüpften Signale. */
export type RadarGroesse = 's' | 'm' | 'l'

export interface RadarEintrag {
  /** foodRegios trendId — stabiler Schlüssel, auch für geteilte Adressen. */
  id: string
  titel: string
  beschreibung: string
  sektor: string
  ebene: RadarEbene
  groesse: RadarGroesse
  /** Grad: 0 = rechts, 90 = oben, 180 = links. */
  winkel: number
  /** Anteil des Außenradius, 0..1. Bestimmt den Ring. */
  radius: number
  /** Anlage- und Änderungsdatum, wie im Original angezeigt. */
  daten?: string
  /** Der englische Originaltitel — für die Nachvollziehbarkeit der Übersetzung. */
  titelOriginal?: string
}

export interface RadarRing {
  name: string
  /** Obere Radiusgrenze des Rings, 0..1. */
  bis: number
}

export interface RadarTafel {
  key: string
  name: string
  /** Beschriftung der Radialachse — bei den beiden Tafeln verschieden. */
  achsenName: string
  /** Von innen nach außen. */
  ringe: RadarRing[]
  /** Reihenfolge von links (180°) nach rechts (0°). */
  sektoren: string[]
  eintraege: RadarEintrag[]
}

export const EBENEN_NAME: Record<RadarEbene, string> = {
  trend: 'Trend',
  cluster: 'Signal-Cluster',
  signal: 'Signal',
}

/**
 * Ölz-Farben statt foodRegios Blau/Türkis/Cyan.
 *
 * Zwei Zwänge, die die Palette bestimmen:
 *
 * 1. Orange ist hier Grundfarbe und damit als Auswahlmarkierung verbraucht —
 *    foodRegio nutzt genau dafür Orange. Die Auswahl trägt bei uns Ölz-Braun.
 * 2. foodRegio unterscheidet die drei Ebenen über drei **Farbtöne** (Blau,
 *    Cyan, Mint). Uns stehen nur Orange und Braun zur Verfügung, also müsste
 *    die dritte Stufe über die Deckkraft laufen — und genau das bricht: Im
 *    Food-AI-Radar sind 331 von 356 Einträgen Signale, die sich stellenweise
 *    fünffach überlagern. Halbdurchsichtige Punkte addieren sich dort zu
 *    dunklen Klumpen.
 *
 * Deshalb wird die unterste Ebene über die **Form** unterschieden statt über
 * die Farbe: Signale sind hohl. Überlagerungen bleiben dadurch hell und
 * einzeln abzählbar, und der Unterschied trägt auch bei jeder Punktgröße.
 */
export const EBENEN_FARBE: Record<
  RadarEbene,
  { fill: string; opacity: number; stroke: string; strokeOpacity: number }
> = {
  trend: { fill: 'var(--oelz-orange)', opacity: 1, stroke: 'white', strokeOpacity: 1 },
  cluster: { fill: 'var(--oelz-orange)', opacity: 0.5, stroke: 'white', strokeOpacity: 1 },
  signal: { fill: 'var(--background)', opacity: 0.85, stroke: 'var(--oelz-braun)', strokeOpacity: 0.5 },
}

/** Punktradien im Koordinatensystem der Tafel (viewBox 1000 breit). */
export const GROESSE_RADIUS: Record<RadarGroesse, number> = { s: 5, m: 7.5, l: 10 }

/** Welcher Ring zu einem Radius gehört. */
export function ringFuer(tafel: RadarTafel, radius: number): RadarRing {
  return tafel.ringe.find((r) => radius <= r.bis) ?? tafel.ringe[tafel.ringe.length - 1]
}

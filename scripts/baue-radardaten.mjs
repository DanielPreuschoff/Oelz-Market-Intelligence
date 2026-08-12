/**
 * Erzeugt aus den übersetzten Rohdaten die statischen TS-Dateien des Moduls.
 *
 *   node scripts/baue-radardaten.mjs
 *
 * Quelle: research/2026-08/foodregio-*-de.json (gitignoriert)
 * Ziel:   src/data/food-radar/{future-food,food-ai}.ts
 *
 * Die Ringgrenzen werden aus der tatsächlichen Radiusverteilung abgeleitet,
 * nicht geraten: foodRegio zeichnet vier gleich breite Bänder, der äußere Rand
 * liegt bei 1.0.
 */
import { readFileSync, writeFileSync } from 'fs'

const FARBE_ZU_EBENE = {
  'rgb(54, 109, 197)': 'trend',
  'rgb(89, 200, 246)': 'cluster',
  'rgb(184, 242, 225)': 'signal',
}

/** Die drei Punktradien je Radar auf s/m/l abbilden. */
function groessenSkala(eintraege) {
  const werte = [...new Set(eintraege.map((e) => e.punktRadius))].sort((a, b) => a - b)
  const namen = ['s', 'm', 'l']
  const map = {}
  werte.forEach((w, i) => (map[w] = namen[Math.min(i, 2)]))
  return map
}

function bauen({ quelle, ziel, key, name, achsenName, ringNamen, konstante }) {
  const roh = JSON.parse(readFileSync(quelle, 'utf-8'))
  const skala = groessenSkala(roh.eintraege)

  const eintraege = roh.eintraege.map((e) => ({
    id: e.id,
    titel: e.titel,
    beschreibung: e.beschreibung,
    sektor: e.sektor,
    ebene: FARBE_ZU_EBENE[e.fill] ?? 'signal',
    groesse: skala[e.punktRadius] ?? 'm',
    winkel: e.winkel,
    // Auf den Außenrand normieren, damit kein Punkt jenseits der Tafel landet.
    radius: Math.min(1, e.radius),
    daten: e.daten || undefined,
    titelOriginal: e.titelOriginal !== e.titel ? e.titelOriginal : undefined,
  }))

  const max = Math.max(...eintraege.map((e) => e.radius))
  const ringe = ringNamen.map((n, i) => ({ name: n, bis: +((i + 1) / ringNamen.length).toFixed(3) }))

  const tafel = { key, name, achsenName, ringe, sektoren: roh.sektoren, eintraege }

  const kopf = `/**
 * Food Radar — Tafel „${name}".
 *
 * ERZEUGT von scripts/baue-radardaten.mjs — nicht von Hand ändern.
 * Quelle: foodRegio Innovation / FIBRES, öffentliches Embed, gelesen ${roh.gelesen}.
 * Texte maschinell ins Deutsche übersetzt (gpt-4o-mini).
 *
 * ${eintraege.length} Einträge · größter Radius im Original: ${max.toFixed(3)}
 */
import type { RadarTafel } from './types'

export const ${konstante}: RadarTafel = `

  writeFileSync(ziel, kopf + JSON.stringify(tafel, null, 2) + '\n', 'utf-8')

  const proEbene = {}
  eintraege.forEach((e) => (proEbene[e.ebene] = (proEbene[e.ebene] ?? 0) + 1))
  console.log(`${ziel}`)
  console.log(`  ${eintraege.length} Einträge`, proEbene)
  console.log(`  ohne Text: ${eintraege.filter((e) => !e.beschreibung).length}`)
}

bauen({
  quelle: 'research/2026-08/foodregio-future-food-de.json',
  ziel: 'src/data/food-radar/future-food.ts',
  key: 'future-food',
  name: 'Future Food',
  achsenName: 'Time to Impact',
  ringNamen: ['Mainstream (heute)', 'Maturing (1–3 J.)', 'Growing (3–5 J.)', 'Emerging (5–10 J.)'],
  konstante: 'FUTURE_FOOD',
})

bauen({
  quelle: 'research/2026-08/foodregio-food-ai-de.json',
  ziel: 'src/data/food-radar/food-ai.ts',
  key: 'food-ai',
  name: 'Food AI',
  achsenName: 'Maturity',
  ringNamen: ['< 3 Jahre', 'Growing (3–5 J.)', 'Emerging (5–10 J.)', '10+ Jahre'],
  konstante: 'FOOD_AI',
})

writeFileSync(
  'src/data/food-radar/index.ts',
  `/** ERZEUGT von scripts/baue-radardaten.mjs — nicht von Hand ändern. */
import { FUTURE_FOOD } from './future-food'
import { FOOD_AI } from './food-ai'
import type { RadarTafel } from './types'

export const TAFELN: RadarTafel[] = [FUTURE_FOOD, FOOD_AI]
`,
  'utf-8'
)
console.log('src/data/food-radar/index.ts')

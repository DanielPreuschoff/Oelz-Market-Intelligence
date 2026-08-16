/**
 * Erzeugt die Europakarte der Anmeldeseite — einmalig, offline.
 *
 *   node scripts/baue-europakarte.mjs
 *
 * Ergebnis: src/components/login/europa-karte-daten.ts (Landmasse als
 * SVG-Pfad plus die projizierten Standorte). Neu laufen lassen, wenn sich die
 * Standortliste ändert (z. B. Gradski mlin, sobald der Sitz bestätigt ist).
 *
 * Quelle der Landmasse: Natural Earth (gemeinfrei) über das npm-Paket
 * `world-atlas` (land-50m). Projektion: Lambert-azimutal flächentreu, das
 * europäische Standardbild (ETRS89-LAEA), zentriert auf 50° N / 10° E.
 * Kein Laufzeit-Paket — das Ergebnis ist eine statische TS-Datei mit einem
 * SVG-Pfad und den bereits projizierten Standorten.
 *
 * Standorte: die Wettbewerber aus supabase/seed.sql mit nachprüfbarem Sitz
 * in Europa (Stand 16.08.2026). Ausgelassen und warum:
 *   - Gradski mlin — Sitz nicht nachprüfbar (Register: „to be validated")
 *   - Bimbo        — Sitz Mexiko-Stadt, ausserhalb der Karte
 * Penam und Delta Pekárny sitzen beide in Brno und sind ein Punkt.
 */
import { readFileSync, writeFileSync } from 'fs'
import { feature } from 'topojson-client'
import { geoAzimuthalEqualArea, geoPath } from 'd3-geo'

const W = 1000
const H = 1000

// [lon, lat] — nachgeschlagen, nicht geschätzt (Firmensitze, nicht Werke)
const ORTE = [
  { name: 'Ölz — Dornbirn', lon: 9.744, lat: 47.413, tier: 'wir' },
  { name: 'Harry-Brot — Schenefeld', lon: 9.83, lat: 53.6, tier: 'high' },
  { name: 'Lieken — Lutherstadt Wittenberg', lon: 12.65, lat: 51.87, tier: 'high' },
  { name: 'Penam & Delta Pekárny — Brno', lon: 16.608, lat: 49.195, tier: 'high', doppelt: true },
  { name: 'ARYZTA — Schlieren (Zürich)', lon: 8.45, lat: 47.4, tier: 'high' },
  { name: 'Lantmännen Unibake — Kopenhagen', lon: 12.47, lat: 55.65, tier: 'high' },
  { name: '7DAYS (Chipita) — Athen', lon: 23.76, lat: 38.06, tier: 'high' },
  { name: 'Mestemacher — Gütersloh', lon: 8.38, lat: 51.91, tier: 'medium' },
  { name: 'Manner — Wien', lon: 16.37, lat: 48.21, tier: 'medium' },
  { name: 'La Boulangère — Les Essarts (Vendée)', lon: -1.23, lat: 46.77, tier: 'medium' },
  { name: 'La Fournée Dorée — Puceul', lon: -1.6, lat: 47.52, tier: 'medium' },
  { name: 'Dan Cake — Póvoa de Santa Iria', lon: -9.06, lat: 38.86, tier: 'medium' },
  { name: 'Kuchenmeister — Soest', lon: 8.11, lat: 51.57, tier: 'medium' },
  { name: 'ABF — London', lon: -0.13, lat: 51.51, tier: 'medium' },
  { name: 'Vandemoortele — Gent', lon: 3.72, lat: 51.05, tier: 'medium' },
  { name: 'Spitz — Attnang-Puchheim', lon: 13.72, lat: 48.01, tier: 'medium' },
  { name: 'Barilla — Parma', lon: 10.33, lat: 44.8, tier: 'medium' },
  { name: 'Backaldrin — Asten', lon: 14.42, lat: 48.22, tier: 'low' },
  { name: 'St Michel — Contres', lon: 1.43, lat: 47.42, tier: 'low' },
  { name: 'Warburtons — Bolton', lon: -2.43, lat: 53.58, tier: 'low' },
  { name: 'Hovis — High Wycombe', lon: -0.75, lat: 51.63, tier: 'low' },
]

// Bildausschnitt: bewusst WEITER als der sichtbare Kern (Portugal–Griechenland,
// Sizilien–Südnorwegen). Die Landmasse muss über die Ränder der orangen Fläche
// hinauslaufen — sonst endet sie in einer geraden Schnittkante, und die ist
// als „Strich" sichtbar (so war es in der ersten Prototyp-Fassung). Island,
// Nordafrika, Anatolien und Westrussland liegen deshalb mit im Datensatz;
// die Seite schiebt den Kern in den Ausschnitt und lässt den Rest unter dem
// Rand verschwinden.
const AUSSCHNITT = {
  type: 'Polygon',
  coordinates: [[[-30, 25], [-30, 75], [50, 75], [50, 25], [-30, 25]]],
}

const topo = JSON.parse(readFileSync('node_modules/world-atlas/land-50m.json', 'utf-8'))
const land = feature(topo, topo.objects.land)

const proj = geoAzimuthalEqualArea()
  .rotate([-10, -50])
  .fitExtent(
    [
      [0, 0],
      [W, H],
    ],
    AUSSCHNITT
  )
  // Zuschnitt: Die Seite zeigt den Kern (AUSSCHNITT in europa-karte.tsx,
  // 165/297 … 805/937) und bei anderen Seitenverhältnissen symmetrisch mehr
  // davon. Alles ausserhalb dieses Rechtecks plus Reserve ist nie sichtbar —
  // Sahara und Arktis fallen weg, das spart rund die Hälfte der Pfadlänge.
  // Links reicht 100, weil westlich davon nur offener Atlantik liegt.
  .clipExtent([
    [100, 230],
    [W + 60, 990],
  ])

// eine Nachkommastelle reicht: 1 Einheit ≈ 1 px, die Fläche liegt bei 16 % Deckkraft
const pfad = geoPath(proj).digits(1)
const d = pfad(land)

const orte = ORTE.map((o) => {
  const [x, y] = proj([o.lon, o.lat])
  return { ...o, x: +x.toFixed(1), y: +y.toFixed(1) }
})

const aus = `// ERZEUGT von scripts/baue-europakarte.mjs — nicht von Hand ändern.
// Landmasse: Natural Earth (gemeinfrei) via world-atlas land-50m,
// Lambert-azimutal flächentreu, 50° N / 10° E. Standorte: siehe Skript.

export const KARTE_W = ${W}
export const KARTE_H = ${H}

export type OrtTier = 'wir' | 'high' | 'medium' | 'low'
export interface Ort {
  name: string
  x: number
  y: number
  tier: OrtTier
  doppelt?: boolean
}

export const ORTE: Ort[] = ${JSON.stringify(
  orte.map(({ name, x, y, tier, doppelt }) => ({ name, x, y, tier, ...(doppelt ? { doppelt } : {}) })),
  null,
  2
)}

export const LAND_PFAD =
  ${JSON.stringify(d)}
`
writeFileSync('src/components/login/europa-karte-daten.ts', aus)
console.log(`Pfad ${(d.length / 1024).toFixed(0)} KB, ${orte.length} Orte`)
for (const o of orte) console.log(`  ${o.x.toString().padStart(6)} ${o.y.toString().padStart(6)}  ${o.tier.padEnd(6)} ${o.name}`)

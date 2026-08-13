'use client'

import {
  Cpu, Layers, Sprout, Dna, Leaf, Scale,
  Factory, Package, Truck, ShoppingCart, Utensils, Recycle,
} from 'lucide-react'
import type { RadarEbene } from '@/data/food-radar/types'

/**
 * Motiv für den Kopf der Detailansicht — gezeichnet, nicht erzeugt.
 *
 * Es gibt bewusst keine KI-Bilder. Zwei Gründe:
 *
 * 1. Jeder Bilddienst kostet laufend Geld, und für 390 Einträge fiele das
 *    bei jeder Erweiterung erneut an. SVG kostet nichts.
 * 2. Wichtiger: Die Einträge beschreiben Konzepte, die es teilweise noch gar
 *    nicht gibt. Ein fotorealistisches Bild eines 3D-gedruckten Produkts sähe
 *    aus wie ein Beleg und wäre keiner — in einem Werkzeug, das Signale von
 *    Behauptungen trennen soll, ein Eigentor. Eine Zeichnung ist erkennbar
 *    eine Zeichnung.
 *
 * Der Aufbau greift die Tafel selbst auf: konzentrische Bögen und Punkte, wie
 * das Radar. Die Lage der Bögen und Punkte wird aus der ID des Eintrags
 * berechnet — jeder Eintrag bekommt damit sein eigenes, immer gleich
 * bleibendes Motiv, ohne dass eine einzige Bilddatei entsteht.
 */

const SEKTOR_SYMBOL: Record<string, typeof Cpu> = {
  // Future Food
  'Digitalisation/AI': Cpu,
  'Additive Manufacturing': Layers,
  'Alternative Proteins': Sprout,
  'Personalisation': Dna,
  'Sustainability': Leaf,
  'Regulatory Environment': Scale,
  // Food AI
  'Agriculture': Sprout,
  'Manufacturing&Processing': Factory,
  'Packaging': Package,
  'Logistics&Distribution': Truck,
  'Retail&HoReCa': ShoppingCart,
  'Consumption': Utensils,
  'Waste Streams': Recycle,
}

/** FNV-1a — dieselbe Lage bei jedem Aufruf, ohne gespeicherten Zustand. */
function hash(s: string, salz: number): number {
  let h = (0x811c9dc5 ^ salz) >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h / 0xffffffff
}

const W = 672
const H = 128

export function Motiv({
  id,
  sektor,
  ebene,
}: {
  id: string
  sektor: string
  ebene: RadarEbene
}) {
  const Symbol = SEKTOR_SYMBOL[sektor] ?? Cpu

  // Ursprung der Bögen: links unten, leicht gestreut — so laufen sie wie beim
  // Radar von unten nach oben aus dem Bild.
  const ox = 60 + hash(id, 1) * 200
  const oy = H + 10 + hash(id, 2) * 30
  const radien = [70, 118, 166, 214].map((r, i) => r + hash(id, 10 + i) * 26)

  // Punkte auf den Bögen, wie Signale auf der Tafel
  const punkte = Array.from({ length: 7 }, (_, i) => {
    const r = radien[i % radien.length] + (hash(id, 20 + i) - 0.5) * 30
    const w = (18 + hash(id, 30 + i) * 130) * (Math.PI / 180)
    return {
      x: +(ox + r * Math.cos(w)).toFixed(2),
      y: +(oy - r * Math.sin(w)).toFixed(2),
      r: +(2 + hash(id, 40 + i) * 3.5).toFixed(2),
      voll: hash(id, 50 + i) > 0.55,
    }
  }).filter((p) => p.x > -10 && p.x < W + 10 && p.y > -10 && p.y < H + 10)

  // Die Ebene steuert die Dichte, nicht die Sichtbarkeit. Ein Signal soll
  // ruhiger wirken als ein Trend, aber nicht ausgeblichen — deshalb bleibt
  // der Boden hoch.
  const kraft = ebene === 'trend' ? 1 : ebene === 'cluster' ? 0.85 : 0.72

  return (
    <div className="relative h-32 w-full overflow-hidden" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <rect width={W} height={H} fill="var(--oelz-orange)" opacity={0.09} />
        {radien.map((r, i) => (
          <circle
            key={r}
            cx={ox}
            cy={oy}
            r={r}
            fill="none"
            stroke="var(--oelz-orange)"
            strokeWidth={i === 0 ? 2 : 1.3}
            opacity={(0.52 - i * 0.09) * kraft}
          />
        ))}
        {punkte.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.voll ? 'var(--oelz-orange)' : 'var(--background)'}
            fillOpacity={p.voll ? 0.85 * kraft : 0.92}
            stroke="var(--oelz-braun)"
            strokeOpacity={p.voll ? 0 : 0.45}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Sektorsymbol — der wiedererkennbare Teil, von Hand je Sektor gewählt
          statt zufällig erzeugt. Es sitzt in einer hellen Scheibe, damit es sich
          gegen die Bögen behauptet, ohne sie zu übertönen. */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[4.5rem] h-[4.5rem] rounded-full bg-background/70 flex items-center justify-center">
        <Symbol className="w-10 h-10 text-oelz-orange-text/75" strokeWidth={1.5} />
      </div>
    </div>
  )
}

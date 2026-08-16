/**
 * Senkrechte Wellenkante — der Ölz-Wellenbogen im Querformat (CD-Manual S. 8):
 * „von OBEN schmal nach UNTEN breiter werdend". Die orange Fläche ist die
 * linke Seitenhälfte, die Kurve ihre rechte Kante. Neu gezeichnet, nicht die
 * waagrechte `OelzWave` gedreht — die ist für 1440×40 ausgelegt und ergäbe
 * senkrecht ein anderes Verhältnis.
 *
 * Die Amplitude ist deutlich kräftiger als auf S. 8 abgebildet: auf
 * Bildschirmbreite liest sich die Manual-Kurve sonst als schiefe Kante, nicht
 * als Welle. Die weisse Begleitlinie ist Vorgabe (S. 6: „Weisse Linie …
 * Linienbreite 4 Punkt"), nicht Zierrat; `non-scaling-stroke` hält sie gleich
 * dick, obwohl das SVG mit `preserveAspectRatio="none"` auf die Fläche
 * verzerrt wird.
 *
 * `children` liegen IN der orangen Form und werden mit ihr beschnitten — so
 * schneidet dieselbe Kurve die Europakarte, ohne dass die Karte selbst etwas
 * von der Welle wissen muss.
 *
 * Der Beschnitt ist ein CSS-`clip-path: polygon(…)` in Prozent, kein
 * SVG-`clipPath` per `url(#…)`: WebKit malt bei der SVG-Referenz den Bereich
 * ausserhalb des Clips schwarz, sobald darunter etwas Beschleunigtes liegt
 * (die Karte, die Einblendung). Das Polygon tastet dieselbe Bézier-Kurve in
 * 48 Schritten ab; die Abweichung von der Kurve liegt weit unter der Breite
 * der weissen Linie, die sie überdeckt.
 */
import { cn } from '@/lib/utils'

const START = 84
const KURVE = [
  [78, 22, 78, 46, 88, 64],
  [95, 77, 100, 88, 100, 100],
] as const

function kantenPfad() {
  const c = KURVE.map((k) => 'C ' + k.join(' ')).join(' ')
  return `M${START} 0 ${c}`
}

/** Kubische Bézier-Kurve abtasten — [x, y] in Prozent. */
function abtasten(): [number, number][] {
  const punkte: [number, number][] = [[START, 0]]
  let x0 = START
  let y0 = 0
  for (const [x1, y1, x2, y2, x3, y3] of KURVE) {
    for (let i = 1; i <= 24; i++) {
      const t = i / 24
      const u = 1 - t
      const x = u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3
      const y = u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3
      punkte.push([+x.toFixed(3), +y.toFixed(3)])
    }
    x0 = x3
    y0 = y3
  }
  return punkte
}

const CLIP = `polygon(0% 0%, ${abtasten()
  .map(([x, y]) => `${x}% ${y}%`)
  .join(', ')}, 0% 100%)`

export function Wellenkante({
  className,
  children,
}: {
  /** landet auf dem beschnittenen Element selbst — siehe Hinweis unten */
  className?: string
  children?: React.ReactNode
}) {
  return (
    <>
      {/* Eine Einblend-Animation gehört HIERHER, nicht auf ein Element darum:
          WebKit macht aus dem animierten Element eine Compositing-Ebene und
          hält sie für deckend (volles oranges Rechteck darin) — liegt der
          Clip erst in einem Kind, wird die Ebene ausserhalb des Clips nicht
          geleert und erscheint schwarz. Auf dem beschnittenen Element selbst
          weiss WebKit, dass die Ebene beschnitten ist. */}
      <div className={cn('absolute inset-0', className)} style={{ clipPath: CLIP }}>
        <div className="absolute inset-0 bg-oelz-orange" />
        {children}
      </div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <path
          d={kantenPfad()}
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.92"
        />
      </svg>
    </>
  )
}

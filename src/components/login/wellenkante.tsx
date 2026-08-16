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
 * von der Welle wissen muss. Der Clip läuft in objectBoundingBox-Einheiten,
 * damit Kreise Kreise bleiben.
 */
const START = 84
const KURVE = [
  [78, 22, 78, 46, 88, 64],
  [95, 77, 100, 88, 100, 100],
] as const

function kante(s = 1) {
  const c = KURVE.map((k) => 'C ' + k.map((n) => +(n * s).toFixed(4)).join(' ')).join(' ')
  return `M${+(START * s).toFixed(4)} 0 ${c}`
}

export function Wellenkante({ children }: { children?: React.ReactNode }) {
  const clip = `M0 0 ${kante(0.01).slice(1)} L0 1 Z`
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <clipPath id="login-wellenkante" clipPathUnits="objectBoundingBox">
            <path d={clip} />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ clipPath: 'url(#login-wellenkante)' }}>
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
          d={kante()}
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

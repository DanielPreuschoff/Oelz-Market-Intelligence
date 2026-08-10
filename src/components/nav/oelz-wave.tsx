/**
 * Ölz Wellenbogen — Signature-Element aus dem CD-Manual (S. 6–8).
 * Die orange Fläche endet nicht als harte Kante, sondern läuft in einem
 * weichen Bogen aus. Im Manual selbst wird das an jedem Seitenfuß verwendet.
 *
 * Die weisse Begleitlinie ist nicht Zierrat, sondern Vorgabe: „Weisse Linie bei
 * der Logo Welle und bei der Wellenfläche — Linienbreite 4 Punkt" (S. 6, 18–20).
 * Sie ist es, die den Bogen leicht wirken lässt statt wie eine abgeschnittene
 * Kante. `withLine` erlaubt das Weglassen dort, wo hinter der Welle kein
 * heller Grund liegt und die Linie hart wirken würde.
 *
 * Die Kurve steht bewusst in absoluten Koordinaten: nur so lässt sie sich für
 * die Begleitlinie um einen festen Betrag nach oben versetzen.
 *
 * `vector-effect="non-scaling-stroke"` ist Pflicht — das SVG wird mit
 * `preserveAspectRatio="none"` verzerrt, eine mitskalierte Linie wäre
 * waagrecht dick und senkrecht hauchdünn.
 */
const EDGE = 'M1440 11.5 C1248 33.5 1032 40 780 31 C528 22 252 8.5 0 24.5'
const EDGE_RAISED = 'M1440 4.5 C1248 26.5 1032 33 780 24 C528 15 252 1.5 0 17.5'

export function OelzWave({
  className,
  withLine = true,
}: {
  className?: string
  withLine?: boolean
}) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={`M0 0 H1440 V11.5 ${EDGE.slice(EDGE.indexOf('C'))} Z`} fill="currentColor" />
      {withLine && (
        <path
          d={EDGE_RAISED}
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.9"
        />
      )}
    </svg>
  )
}

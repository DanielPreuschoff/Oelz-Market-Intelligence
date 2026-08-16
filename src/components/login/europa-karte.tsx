'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { KARTE_H, KARTE_W, LAND_PFAD, ORTE, type OrtTier } from './europa-karte-daten'

/**
 * Die Europakarte der Anmeldeseite: was das Radar beobachtet.
 *
 * Landmasse als flache Silhouette in Weiss auf der orangen Fläche (Natural
 * Earth, siehe `europa-karte-daten.ts`), darauf ein Punkt je Wettbewerbersitz
 * aus dem Register — Grösse nach Wachsamkeitsstufe, Dornbirn als „wir" in
 * Braun mit weissem Kern. Jeder Punkt ist ein realer Ort; die Karte behauptet
 * nichts, was das Werkzeug nicht tut.
 *
 * Bewegung: Jeder Punkt sendet in einem 16-s-Zyklus einen Ring aus. Die
 * Reihenfolge ist gestreut (Faktor 8, teilerfremd zu 21), damit der Puls über
 * die Karte wandert statt zu fegen, und nie mehr als etwa drei Ringe zugleich
 * sichtbar sind. Der Ring ist eine Geste, kein Zustand: Er verschwindet, sobald
 * ein Eingabefeld den Fokus hat — dann tippt jemand, dann darf nichts blinken —,
 * unter 1024 px (dort ist die Karte ohnehin ausgeblendet) und bei
 * `prefers-reduced-motion`.
 *
 * Bewusst keine Beschriftung: Die Karte soll gelesen werden, nicht studiert.
 * Ein `<title>` je Punkt beantwortet dem Neugierigen die Frage beim Überfahren.
 */

const RADIUS: Record<OrtTier, number> = { wir: 10, high: 10, medium: 8, low: 6.5 }
const ZYKLUS = 16 // Sekunden

export function EuropaKarte({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  const [still, setStill] = useState(false)

  useEffect(() => {
    const istFeld = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches('input, textarea, select')
    const rein = (e: FocusEvent) => istFeld(e.target) && setStill(true)
    const raus = (e: FocusEvent) => istFeld(e.target) && setStill(false)
    document.addEventListener('focusin', rein)
    document.addEventListener('focusout', raus)
    return () => {
      document.removeEventListener('focusin', rein)
      document.removeEventListener('focusout', raus)
    }
  }, [])

  return (
    <svg
      viewBox={`0 0 ${KARTE_W} ${KARTE_H}`}
      className={cn('block', className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <style>{`
        .ek-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: ekRing ${ZYKLUS}s ease-out infinite;
          opacity: 0;
        }
        @keyframes ekRing {
          0%   { transform: scale(1);   opacity: 0; }
          2%   { opacity: .55; }
          15%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce), (max-width: 1023px) {
          .ek-ring { animation: none; opacity: 0; }
        }
      `}</style>

      <path d={LAND_PFAD} fill="white" fillOpacity={0.16} />

      {/* Ringe zuerst, damit sie unter den Punkten liegen */}
      <g style={{ opacity: still ? 0 : 1, transition: 'opacity .4s' }}>
        {ORTE.map((o, i) => {
          const r = RADIUS[o.tier] * (o.doppelt ? 1.25 : 1)
          const rang = (i * 8) % ORTE.length
          return (
            <circle
              key={o.name}
              className="ek-ring"
              cx={o.x}
              cy={o.y}
              r={r}
              fill="none"
              stroke={o.tier === 'wir' ? 'var(--oelz-braun)' : 'white'}
              strokeWidth={1.5}
              style={{ animationDelay: `${((rang * ZYKLUS) / ORTE.length).toFixed(2)}s` }}
            />
          )
        })}
      </g>

      {ORTE.map((o) => {
        const r = RADIUS[o.tier] * (o.doppelt ? 1.25 : 1)
        if (o.tier === 'wir') {
          return (
            <g key={o.name}>
              <title>{o.name}</title>
              <circle cx={o.x} cy={o.y} r={r} fill="var(--oelz-braun)" />
              <circle cx={o.x} cy={o.y} r={r * 0.42} fill="white" />
            </g>
          )
        }
        return (
          <circle key={o.name} cx={o.x} cy={o.y} r={r} fill="white" fillOpacity={0.88}>
            <title>{o.name}</title>
          </circle>
        )
      })}
    </svg>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { LAND_PFAD, ORTE, type OrtTier } from './europa-karte-daten'

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
 *
 * Bildausschnitt: Das SVG füllt seinen Behälter exakt (100 % × 100 %), und
 * `preserveAspectRatio="xMidYMid slice"` — das SVG-Gegenstück zu
 * `object-fit: cover` — sorgt dafür, dass AUSSCHNITT bei jedem
 * Seitenverhältnis vollständig und zentriert sichtbar ist; ist der Behälter
 * breiter, kommt links und rechts symmetrisch mehr Karte dazu, ist er höher,
 * oben und unten. Weil die Daten weit über den Ausschnitt hinausreichen
 * (Island bis Anatolien, Nordafrika), erscheint dabei nie eine Schnittkante.
 * Ein früherer Ansatz (überdimensionierter Kasten mit negativen vh-Abständen)
 * hing an der SVG-Grössenlogik des Browsers und lag in Safari falsch —
 * hier gibt es nichts mehr zu raten.
 *
 * AUSSCHNITT ist so gewählt, dass Dornbirn bei ≈ 52 % Breite / 48 % Höhe
 * sitzt und Lissabon, Athen, Kopenhagen und Nordengland mit Luft drin sind.
 */

const AUSSCHNITT = { x: 165, y: 297, w: 640, h: 640 }
const RADIUS: Record<OrtTier, number> = { wir: 11, high: 11, medium: 9, low: 7 }
const ZYKLUS = 16 // Sekunden

export function EuropaKarte({ className }: { className?: string }) {
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
      viewBox={`${AUSSCHNITT.x} ${AUSSCHNITT.y} ${AUSSCHNITT.w} ${AUSSCHNITT.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
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

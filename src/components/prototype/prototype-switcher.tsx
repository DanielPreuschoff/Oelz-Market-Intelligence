'use client'

// PROTOTYP — Wegwerfcode. Schwebende Leiste zum Umschalten zwischen
// UI-Varianten (?variant=…). Im Produktionsbau unsichtbar, damit ein
// versehentlich gemergter Prototyp die Leiste nie ausliefert.
//
// Die Pfeile sind echte Links (kein Router, kein useSearchParams): Sie
// funktionieren auch, wenn die Leiste noch nicht hydriert ist — genau daran
// war die erste Fassung gescheitert. Umschalten führt immer auf die
// EINSTIEGSSEITE der Variante; alle anderen Parameter (z. B. eine geöffnete
// Detailseite ?haendler=…) werden verworfen, sonst zeigen alle Varianten
// nach einem Klick ins Detail dieselbe geteilte Unterseite.
// Tastatur ←/→ als Zugabe, sobald JavaScript da ist.

import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function PrototypeSwitcher({
  variants,
  current,
  names = {},
  pathname,
  auchProduktion = false,
}: {
  variants: string[]
  current: string
  names?: Record<string, string>
  /** Pfad der Prototyp-Route, z. B. "/retailer-radar" */
  pathname: string
  /** Auch im Produktionsbau zeigen. Nur setzen, wenn die Route selbst
   *  geschützt ist (Retailer-Radar: admin-only) — sonst schützt die
   *  NODE_ENV-Sperre davor, dass ein versehentlich gemergter Prototyp die
   *  Leiste an Nutzer ausliefert. */
  auchProduktion?: boolean
}) {
  const idx = Math.max(0, variants.indexOf(current))
  const prev = variants[(idx - 1 + variants.length) % variants.length]
  const next = variants[(idx + 1) % variants.length]
  const href = (v: string) => `${pathname}?variant=${v}`

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === 'ArrowLeft') window.location.assign(href(prev))
      if (e.key === 'ArrowRight') window.location.assign(href(next))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prev, next, pathname])

  if (process.env.NODE_ENV === 'production' && !auchProduktion) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 rounded-full bg-neutral-900 text-white shadow-lg shadow-black/30 pl-1 pr-1 py-1 text-xs font-mono select-none">
      <a href={href(prev)} className="rounded-full p-1.5 hover:bg-white/15" aria-label="vorherige Variante">
        <ChevronLeft className="size-4" />
      </a>
      <span className="px-2 tabular-nums">
        <span className="font-bold">{current}</span>
        {names[current] && <span className="opacity-70"> — {names[current]}</span>}
        <span className="opacity-40 ml-2">
          {idx + 1}/{variants.length}
        </span>
      </span>
      <a href={href(next)} className="rounded-full p-1.5 hover:bg-white/15" aria-label="nächste Variante">
        <ChevronRight className="size-4" />
      </a>
    </div>
  )
}

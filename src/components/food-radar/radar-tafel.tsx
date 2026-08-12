'use client'

import { useMemo, useState } from 'react'
import { EBENEN_FARBE, GROESSE_RADIUS, type RadarEintrag, type RadarTafel } from '@/data/food-radar/types'

/**
 * Die Radartafel als Halbscheibe — Ringe nach außen, Sektoren im Kreis.
 *
 * Nachbau des foodRegio-Radars in Ölz-Gestaltung. Zwei Entscheidungen, die
 * nicht dem Original folgen und es auch nicht sollen:
 *
 * 1. **Die Ringe laufen stark abgetönt** (6 % innen bis 18 % außen). foodRegio
 *    nutzt kräftiges Grün mit dunkelblauen Punkten darauf; Ölz-Orange in dieser
 *    Sättigung würde die orangen Punkte und die Beschriftungen schlucken.
 * 2. **Die Auswahl ist braun, nicht orange.** foodRegio markiert den gewählten
 *    Punkt orange — bei uns ist Orange die Grundfarbe und als Markierung
 *    verbraucht.
 */

const VB_W = 1000
const VB_H = 560
const CX = 500
const CY = 505
const R = 470
const LOCH = 30

/** Abgestufte Ringdeckung von außen (0) nach innen. */
const RING_DECKUNG = [0.18, 0.14, 0.1, 0.06, 0.04]

/**
 * Auf drei Nachkommastellen gerundet — Server und Browser berechnen Sinus und
 * Kosinus in der letzten Stelle verschieden (…869713 gegen …869707), und React
 * verwirft bei solchen Abweichungen die gesamte Angleichung des Baums.
 */
function polar(winkel: number, radius: number) {
  const rad = (winkel * Math.PI) / 180
  return {
    x: Math.round((CX + R * radius * Math.cos(rad)) * 1000) / 1000,
    y: Math.round((CY - R * radius * Math.sin(rad)) * 1000) / 1000,
  }
}

function halbscheibe(r: number) {
  return `M ${CX - r} ${CY} A ${r} ${r} 0 0 1 ${CX + r} ${CY} Z`
}

/** Beschriftungslänge deckeln — deutsche Titel sprengen sonst die Tafel. */
function kuerzen(titel: string) {
  return titel.length > 34 ? titel.slice(0, 32).trimEnd() + '…' : titel
}

export function RadarTafelSvg({
  tafel,
  auswahl,
  onAuswahl,
}: {
  tafel: RadarTafel
  auswahl: string | null
  onAuswahl: (id: string | null) => void
}) {
  const [hover, setHover] = useState<string | null>(null)

  // Große Punkte zuerst zeichnen, damit kleine anklickbar obenauf liegen.
  const sortiert = useMemo(
    () => [...tafel.eintraege].sort((a, b) => GROESSE_RADIUS[b.groesse] - GROESSE_RADIUS[a.groesse]),
    [tafel]
  )

  /**
   * Welche Punkte dauerhaft beschriftet werden.
   *
   * Zwei Stufen. Erstens nur Trends und Cluster — bei 356 Signalen wäre alles
   * andere eine Textwand; so hält es auch das Original. Zweitens eine
   * Kollisionsprüfung: Deutsche Titel sind deutlich länger als englische, und
   * ohne sie überlagern sich die Kästchen gegenseitig bis zur Unlesbarkeit.
   *
   * Vergeben wird gierig nach Wichtigkeit — Trends vor Clustern, größere
   * Punkte zuerst. Wer keinen Platz bekommt, zeigt seinen Titel beim
   * Überfahren oder Anklicken; verloren geht also nichts.
   */
  const beschriftet = useMemo(() => {
    const kandidaten = tafel.eintraege
      .filter((e) => e.ebene !== 'signal')
      .sort((a, b) => {
        const rang = (x: typeof a) => (x.ebene === 'trend' ? 0 : 1)
        return rang(a) - rang(b) || GROESSE_RADIUS[b.groesse] - GROESSE_RADIUS[a.groesse]
      })

    const belegt: { x1: number; y1: number; x2: number; y2: number }[] = []
    const genommen = new Set<string>()

    for (const e of kandidaten) {
      const { x, y } = polar(e.winkel, e.radius)
      const r = GROESSE_RADIUS[e.groesse]
      const rechts = x < CX + R * 0.5
      const breite = kuerzen(e.titel).length * 6.4 + 12
      const kasten = {
        x1: rechts ? x + r + 4 : x - r - 4 - breite,
        y1: y - 10,
        x2: (rechts ? x + r + 4 : x - r - 4 - breite) + breite,
        y2: y + 10,
      }
      const stoert = belegt.some(
        (b) => kasten.x1 < b.x2 && kasten.x2 > b.x1 && kasten.y1 < b.y2 && kasten.y2 > b.y1
      )
      if (!stoert) {
        belegt.push(kasten)
        genommen.add(e.id)
      }
    }
    return genommen
  }, [tafel])

  const sektorBreite = 180 / tafel.sektoren.length

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full h-auto select-none"
      style={{ fontFamily: 'var(--font-display)' }}
      onClick={() => onAuswahl(null)}
      role="img"
      aria-label={`Radartafel ${tafel.name} mit ${tafel.eintraege.length} Einträgen`}
    >
      {/* Ringe: von außen nach innen gezeichnet, jede kleinere Halbscheibe
          überdeckt die größere — übrig bleiben Bänder abnehmender Deckung. */}
      {[...tafel.ringe].reverse().map((ring, i) => (
        <path
          key={ring.name}
          d={halbscheibe(R * ring.bis)}
          fill="var(--oelz-orange)"
          opacity={RING_DECKUNG[Math.min(i, RING_DECKUNG.length - 1)]}
        />
      ))}

      {/* Trenner in Weiß, wie im Original */}
      {tafel.ringe.map((ring) => (
        <path
          key={ring.name}
          d={`M ${CX - R * ring.bis} ${CY} A ${R * ring.bis} ${R * ring.bis} 0 0 1 ${CX + R * ring.bis} ${CY}`}
          fill="none"
          stroke="white"
          strokeWidth={ring.bis === 1 ? 2.5 : 1.5}
        />
      ))}
      {tafel.sektoren.slice(1).map((_, i) => {
        const w = 180 - (i + 1) * sektorBreite
        const a = polar(w, LOCH / R)
        const b = polar(w, 1)
        return <line key={w} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="white" strokeWidth={1.5} />
      })}
      <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke="white" strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={LOCH} fill="var(--background)" />

      {/* Sektorbeschriftung entlang des äußeren Bogens */}
      <defs>
        <path
          id={`bogen-${tafel.key}`}
          d={`M ${CX - (R + 26)} ${CY} A ${R + 26} ${R + 26} 0 0 1 ${CX + (R + 26)} ${CY}`}
          fill="none"
        />
      </defs>
      {tafel.sektoren.map((s, i) => (
        <text key={s} fontSize={15} fontWeight={600} fill="var(--oelz-braun)" letterSpacing="0.03em">
          <textPath
            href={`#bogen-${tafel.key}`}
            startOffset={`${((i + 0.5) / tafel.sektoren.length) * 100}%`}
            textAnchor="middle"
          >
            {s}
          </textPath>
        </text>
      ))}

      {/* Punkte */}
      {sortiert.map((e) => {
        const { x, y } = polar(e.winkel, e.radius)
        const farbe = EBENEN_FARBE[e.ebene]
        const r = GROESSE_RADIUS[e.groesse]
        const aktiv = auswahl === e.id
        const zeigen = aktiv || hover === e.id || beschriftet.has(e.id)
        const rechts = x < CX + R * 0.5
        const kurz = kuerzen(e.titel)
        const breite = kurz.length * 6.4 + 12

        return (
          <g
            key={e.id}
            className="cursor-pointer"
            onClick={(ev) => {
              ev.stopPropagation()
              onAuswahl(aktiv ? null : e.id)
            }}
            onMouseEnter={() => setHover(e.id)}
            onMouseLeave={() => setHover(null)}
          >
            {aktiv && (
              <>
                <circle cx={x} cy={y} r={r + 6} fill="none" stroke="white" strokeWidth={6} />
                <circle cx={x} cy={y} r={r + 6} fill="none" stroke="var(--oelz-braun)" strokeWidth={2.5} />
              </>
            )}
            <circle
              cx={x}
              cy={y}
              r={hover === e.id ? r + 1.5 : r}
              fill={farbe.fill}
              fillOpacity={farbe.opacity}
              stroke={farbe.stroke}
              strokeOpacity={farbe.strokeOpacity}
              strokeWidth={1.2}
            />
            {zeigen && (
              <g pointerEvents="none">
                <rect
                  x={rechts ? x + r + 4 : x - r - 4 - breite}
                  y={y - 9.5}
                  width={breite}
                  height={19}
                  rx={4}
                  fill="white"
                  opacity={0.95}
                  stroke={aktiv ? 'var(--oelz-braun)' : 'transparent'}
                  strokeWidth={1.5}
                />
                <text
                  x={rechts ? x + r + 10 : x - r - 10}
                  y={y + 4}
                  fontSize={11.5}
                  fill="var(--oelz-braun)"
                  textAnchor={rechts ? 'start' : 'end'}
                >
                  {kurz}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* Radialachse, beidseitig beschriftet wie im Original */}
      <text
        x={CX}
        y={CY + 30}
        fontSize={13}
        fontWeight={600}
        fill="var(--muted-foreground)"
        textAnchor="middle"
      >
        {tafel.achsenName}
      </text>
      {tafel.ringe.map((ring, i) => {
        const von = i === 0 ? LOCH / R : tafel.ringe[i - 1].bis
        const mitte = (von + ring.bis) / 2
        return (
          <g key={ring.name} fontSize={10} fill="var(--muted-foreground)">
            <text x={CX - R * mitte} y={CY + 48} textAnchor="middle">
              {ring.name}
            </text>
            <text x={CX + R * mitte} y={CY + 48} textAnchor="middle">
              {ring.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

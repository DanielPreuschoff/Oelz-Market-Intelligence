'use client'

/**
 * PROTOTYP — Wegwerfcode (Branch prototype/food-radar-zellenleiste).
 *
 * Frage: Ersetzt eine Leiste am rechten Rand das Hovern über 356 Punkte?
 * Ergebnis der Grilling-Runde vom 27.08.2026:
 *
 *  · Klick auf eine ZELLE (Sektor × Ring) öffnet die Leiste, 480 px, überlagert
 *    die Tafel rechts, unter dem Kopfbalken bis unten, bleibt beim Scrollen.
 *  · Zwei Ebenen in EINEM Strang: Liste (Titel + Ebene) → Detail (Zurück-Pfeil,
 *    ‹ › und ← → blättern innerhalb der Zelle). Kein Dialog über der Leiste.
 *  · Sortierung Trends → Cluster → Signale, darin alphabetisch.
 *  · Der Ebenen-Filter der Tafel wirkt auch hier („12 von 117").
 *  · Schliessen: Esc, ×, dieselbe Zelle erneut. Andere Zelle tauscht den
 *    Inhalt und springt auf die Listenebene zurück.
 *  · Bewegung 200 ms, bei prefers-reduced-motion aus.
 *
 * Zum Ausprobieren: /food-radar?leiste=1 — ohne den Parameter bleibt alles
 * beim Dialog von heute.
 */

import { useEffect, useMemo, useRef } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Motiv } from './motiv'
import {
  EBENEN_NAME,
  ringFuer,
  type RadarEbene,
  type RadarEintrag,
  type RadarTafel,
} from '@/data/food-radar/types'

export interface Zelle {
  sektor: string
  ring: string
}

/** Trends zuerst, dann Cluster, dann Signale — innerhalb alphabetisch. */
const EBENEN_RANG: Record<RadarEbene, number> = { trend: 0, cluster: 1, signal: 2 }

export function Zellenleiste({
  tafel,
  gefiltert,
  zelle,
  eintragId,
  onEintrag,
  onSchliessen,
}: {
  /** Ungefiltert — für Gesamtzahlen der Zelle. */
  tafel: RadarTafel
  /** Nach Ebene gefiltert — das, was die Tafel gerade zeigt. */
  gefiltert: RadarTafel
  zelle: Zelle | null
  eintragId: string | null
  onEintrag: (id: string | null) => void
  onSchliessen: () => void
}) {
  const offen = !!zelle

  const inZelle = useMemo(() => {
    if (!zelle) return []
    return gefiltert.eintraege
      .filter((e) => e.sektor === zelle.sektor && ringFuer(tafel, e.radius).name === zelle.ring)
      .sort(
        (a, b) =>
          EBENEN_RANG[a.ebene] - EBENEN_RANG[b.ebene] || a.titel.localeCompare(b.titel, 'de')
      )
  }, [gefiltert, tafel, zelle])

  const gesamtInZelle = useMemo(() => {
    if (!zelle) return 0
    return tafel.eintraege.filter(
      (e) => e.sektor === zelle.sektor && ringFuer(tafel, e.radius).name === zelle.ring
    ).length
  }, [tafel, zelle])

  const index = eintragId ? inZelle.findIndex((e) => e.id === eintragId) : -1
  const eintrag = index >= 0 ? inZelle[index] : null

  // Esc schliesst; Pfeile blättern, solange ein Eintrag offen ist.
  useEffect(() => {
    if (!offen) return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === 'Escape') {
        if (eintrag) onEintrag(null)
        else onSchliessen()
        return
      }
      if (!eintrag || inZelle.length < 2) return
      if (e.key === 'ArrowLeft' && index > 0) onEintrag(inZelle[index - 1].id)
      if (e.key === 'ArrowRight' && index < inZelle.length - 1) onEintrag(inZelle[index + 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [offen, eintrag, index, inZelle, onEintrag, onSchliessen])

  // Beim Wechsel von Zelle oder Eintrag wieder nach oben.
  const körper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    körper.current?.scrollTo({ top: 0 })
  }, [zelle?.sektor, zelle?.ring, eintragId])

  if (!zelle) return null

  return (
    <aside
      // Unter dem Kopfbalken (h-16) beginnend bis unten, über der Tafel.
      className={cn(
        'fixed right-0 top-16 bottom-0 z-40 hidden w-[480px] flex-col border-l border-border bg-card md:flex',
        'shadow-[-18px_0_40px_-28px_rgba(34,28,26,0.45)]',
        'motion-safe:animate-in motion-safe:slide-in-from-right motion-safe:duration-200'
      )}
      aria-label={`${zelle.sektor}, ${zelle.ring}`}
    >
      {/* Kopf */}
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="dachzeile">{zelle.sektor}</p>
          <p className="mt-0.5 font-display text-[17px] font-bold leading-tight">{zelle.ring}</p>
          <p className="mt-1 text-xs text-muted-foreground tabular-nums">
            {inZelle.length < gesamtInZelle
              ? `${inZelle.length} von ${gesamtInZelle} Einträgen`
              : `${gesamtInZelle} ${gesamtInZelle === 1 ? 'Eintrag' : 'Einträge'}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onSchliessen}
          aria-label="Leiste schließen"
          className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div ref={körper} className="min-h-0 flex-1 overflow-y-auto">
        {eintrag ? (
          <DetailEbene
            eintrag={eintrag}
            tafel={tafel}
            index={index}
            anzahl={inZelle.length}
            onZurueck={() => onEintrag(null)}
            onBlaettern={(delta) => {
              const ziel = inZelle[index + delta]
              if (ziel) onEintrag(ziel.id)
            }}
          />
        ) : (
          <ListenEbene eintraege={inZelle} onEintrag={onEintrag} />
        )}
      </div>
    </aside>
  )
}

/** Liste: Titel + Ebene, sonst nichts (Grilling, Q6). */
function ListenEbene({
  eintraege,
  onEintrag,
}: {
  eintraege: RadarEintrag[]
  onEintrag: (id: string) => void
}) {
  if (eintraege.length === 0) {
    return (
      <p className="px-5 py-8 text-sm text-muted-foreground">
        Keine Einträge — der Ebenen-Filter blendet hier alles aus.
      </p>
    )
  }
  return (
    <ul className="motion-safe:animate-in motion-safe:slide-in-from-left-4 motion-safe:duration-200 divide-y divide-border/70">
      {eintraege.map((e) => (
        <li key={e.id}>
          <button
            type="button"
            onClick={() => onEintrag(e.id)}
            className="flex w-full items-baseline gap-3 px-5 py-3 text-left transition-colors hover:bg-[var(--waesche)]"
          >
            <span className="min-w-0 flex-1 text-[14px] leading-snug">{e.titel}</span>
            <span
              className={cn(
                'shrink-0 text-[10px] uppercase tracking-[0.1em] font-bold',
                e.ebene === 'signal' ? 'text-muted-foreground/70' : 'text-oelz-orange-text'
              )}
            >
              {EBENEN_NAME[e.ebene]}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

/** Detail: Motivband, Text, Quellen — Inhalt wie im Dialog, nur schmaler. */
function DetailEbene({
  eintrag,
  tafel,
  index,
  anzahl,
  onZurueck,
  onBlaettern,
}: {
  eintrag: RadarEintrag
  tafel: RadarTafel
  index: number
  anzahl: number
  onZurueck: () => void
  onBlaettern: (delta: -1 | 1) => void
}) {
  const ring = ringFuer(tafel, eintrag.radius)

  return (
    <div className="motion-safe:animate-in motion-safe:slide-in-from-right-4 motion-safe:duration-200">
      {/* Kopfzeile der Ebene: zurück links, blättern rechts */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-border bg-card/95 px-5 py-2.5 backdrop-blur">
        <button
          type="button"
          onClick={onZurueck}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Zur Liste
        </button>
        {anzahl > 1 && (
          <span className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onBlaettern(-1)}
              disabled={index === 0}
              aria-label="Vorheriger Eintrag"
              className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-[11px] tabular-nums text-muted-foreground">
              {index + 1} von {anzahl}
            </span>
            <button
              type="button"
              onClick={() => onBlaettern(1)}
              disabled={index === anzahl - 1}
              aria-label="Nächster Eintrag"
              className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="size-4" />
            </button>
          </span>
        )}
      </div>

      {/* Schmales Motivband statt Kopfbild (Grilling, Q15) */}
      <Motiv
        id={eintrag.id}
        sektor={eintrag.sektor}
        ebene={eintrag.ebene}
        hoehe="h-20"
        symbolGroesse="w-12 h-12"
        symbolIcon="w-6 h-6"
      />

      <div className="space-y-4 px-5 py-5">
        <h2 className="font-display text-[19px] font-bold leading-snug">{eintrag.titel}</h2>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-oelz-orange px-2.5 py-1 font-bold text-oelz-on-orange">
            {EBENEN_NAME[eintrag.ebene]}
          </span>
          <span className="text-muted-foreground">
            {eintrag.sektor} · {ring.name}
          </span>
        </div>

        <p className="whitespace-pre-line text-sm leading-relaxed">{eintrag.beschreibung}</p>

        {eintrag.quellen && eintrag.quellen.length > 0 && (
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Im Original genannte Quellen
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {eintrag.quellen.map((q, i) => (
                <span key={q.name}>
                  {i > 0 && ' · '}
                  {q.url ? (
                    <a href={q.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                      {q.name}
                    </a>
                  ) : (
                    q.name
                  )}
                </span>
              ))}
            </p>
          </div>
        )}

        <div className="space-y-1 border-t border-border pt-3">
          {eintrag.daten && <p className="text-[11px] text-muted-foreground">{eintrag.daten}</p>}
          {eintrag.titelOriginal && eintrag.titelOriginal !== eintrag.titel && (
            <p className="text-[11px] text-muted-foreground/80">Original: {eintrag.titelOriginal}</p>
          )}
          <p className="text-[10px] leading-relaxed text-muted-foreground/70">
            Quelle: foodRegio Innovation, {tafel.name}-Radar (öffentliches Embed, Stand 10.08.2026).
          </p>
        </div>
      </div>
    </div>
  )
}

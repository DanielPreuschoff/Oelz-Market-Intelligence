'use client'

/**
 * Die Signalleiste: alle Einträge der Tafel als Liste am rechten Rand.
 *
 * Antwort auf ein echtes Bedienproblem: 356 Punkte lassen sich nur einzeln
 * per Hover entdecken. Der Griff rechts klappt stattdessen eine Leiste aus —
 * Liste aller Einträge, nach Sektor gruppiert (haftende Überschriften), darin
 * Trends → Cluster → Signale, mit Suche über Titel und Text. Klick auf einen
 * Eintrag zeigt das Detail in derselben Leiste; ‹ › und ← → blättern durch
 * die gefilterte Liste. Der Ebenen-Filter der Tafel wirkt mit.
 *
 * Auf breiten Schirmen ersetzt die Leiste den Detail-Dialog (Radar-Punkte
 * öffnen sie direkt im Detail); unter 768 px existiert sie nicht — dort
 * bleibt die Sektorliste mit dem Dialog. Schließen: Esc, ×, Griff.
 *
 * Entschieden am 27.08.2026 auf prototype/food-radar-zellenleiste: der erste
 * Anlauf band die Liste an eine angeklickte Zelle (Sektor × Ring) — zu
 * umständlich, weil man erst die richtige Zelle treffen musste.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, List, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Motiv } from './motiv'
import {
  EBENEN_NAME,
  ringFuer,
  type RadarEbene,
  type RadarEintrag,
  type RadarTafel,
} from '@/data/food-radar/types'

/** Trends zuerst, dann Cluster, dann Signale — innerhalb alphabetisch. */
const EBENEN_RANG: Record<RadarEbene, number> = { trend: 0, cluster: 1, signal: 2 }

export function Signalleiste({
  tafel,
  gefiltert,
  offen,
  onOffen,
  eintragId,
  onEintrag,
}: {
  /** Ungefiltert — für die Gesamtzahl. */
  tafel: RadarTafel
  /** Nach Ebene gefiltert — das, was die Tafel gerade zeigt. */
  gefiltert: RadarTafel
  offen: boolean
  onOffen: (offen: boolean) => void
  eintragId: string | null
  onEintrag: (id: string | null) => void
}) {
  const [suche, setSuche] = useState('')
  // Sektorfilter neben der Textsuche. Die Suche greift auf Titel und Text —
  // wer „Konsum" eintippte, bekam die Eintraege, in denen das Wort vorkommt,
  // nicht den Sektor. Kai Heuberger im Termin vom 27.08.2026: „ich gehe auf
  // die Icons und dann kann ich Consumer als Suchbegriff eingeben" — genau
  // dieser Weg fuehrte ins Leere.
  const [nurSektor, setNurSektor] = useState<string | null>(null)

  const treffer = useMemo(() => {
    const q = suche.trim().toLowerCase()
    const imSektor = nurSektor
      ? gefiltert.eintraege.filter((e) => e.sektor === nurSektor)
      : gefiltert.eintraege
    const liste = q
      ? imSektor.filter(
          (e) => e.titel.toLowerCase().includes(q) || e.beschreibung.toLowerCase().includes(q)
        )
      : imSektor
    // Reihenfolge der Sektoren wie auf der Tafel, darin Ebene, dann Titel.
    const sektorRang = new Map(tafel.sektoren.map((s, i) => [s, i]))
    return [...liste].sort(
      (a, b) =>
        (sektorRang.get(a.sektor) ?? 99) - (sektorRang.get(b.sektor) ?? 99) ||
        EBENEN_RANG[a.ebene] - EBENEN_RANG[b.ebene] ||
        a.titel.localeCompare(b.titel, 'de')
    )
  }, [gefiltert, tafel.sektoren, suche, nurSektor])

  const gruppen = useMemo(() => {
    const map = new Map<string, RadarEintrag[]>()
    treffer.forEach((e) => {
      const liste = map.get(e.sektor)
      if (liste) liste.push(e)
      else map.set(e.sektor, [e])
    })
    return [...map.entries()]
  }, [treffer])

  const index = eintragId ? treffer.findIndex((e) => e.id === eintragId) : -1
  const eintrag = index >= 0 ? treffer[index] : null

  // Esc schliesst (erst Detail, dann Leiste); Pfeile blättern im Detail.
  useEffect(() => {
    if (!offen) return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        if (e.key === 'Escape') (t as HTMLInputElement).blur()
        return
      }
      if (e.key === 'Escape') {
        if (eintrag) onEintrag(null)
        else onOffen(false)
        return
      }
      if (!eintrag || treffer.length < 2) return
      if (e.key === 'ArrowLeft' && index > 0) onEintrag(treffer[index - 1].id)
      if (e.key === 'ArrowRight' && index < treffer.length - 1) onEintrag(treffer[index + 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [offen, eintrag, index, treffer, onEintrag, onOffen])

  // Beim Öffnen eines Eintrags wieder nach oben.
  const koerper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    koerper.current?.scrollTo({ top: 0 })
  }, [eintragId])

  return (
    <>
      {/* Griff am rechten Rand — verschwindet, solange die Leiste offen ist. */}
      {!offen && (
        <button
          type="button"
          onClick={() => onOffen(true)}
          className={cn(
            'fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-l-xl md:flex',
            'bg-oelz-orange py-4 pl-3 pr-2.5 text-oelz-on-orange shadow-[-6px_0_18px_-10px_rgba(34,28,26,0.5)]',
            'transition-[padding] duration-[var(--motion-mikro)] hover:pl-4'
          )}
          aria-label={`Alle ${gefiltert.eintraege.length} Einträge als Liste`}
        >
          <List className="size-4 shrink-0" />
          <span
            className="font-display text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ writingMode: 'vertical-rl' }}
          >
            Alle Einträge
          </span>
          <span className="text-[11px] font-bold tabular-nums" style={{ writingMode: 'vertical-rl' }}>
            {gefiltert.eintraege.length}
          </span>
        </button>
      )}

      <aside
        // Unter dem Kopfbalken (h-16) beginnend bis unten, über der Tafel.
        className={cn(
          'fixed right-0 top-16 bottom-0 z-40 hidden w-[480px] flex-col border-l border-border bg-card md:flex',
          'shadow-[-18px_0_40px_-28px_rgba(34,28,26,0.45)]',
          'motion-safe:animate-in motion-safe:slide-in-from-right motion-safe:duration-200',
          !offen && 'hidden md:hidden'
        )}
        aria-label={`Alle Einträge der Tafel ${tafel.name}`}
      >
        {/* Kopf: Titel, Zähler, Suche */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="dachzeile">{tafel.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                {treffer.length === tafel.eintraege.length
                  ? `${tafel.eintraege.length} Einträge`
                  : `${treffer.length} von ${tafel.eintraege.length} Einträgen`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOffen(false)}
              aria-label="Leiste schließen"
              className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={suche}
              onChange={(ev) => setSuche(ev.target.value)}
              placeholder="Titel oder Text durchsuchen…"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-oelz-orange"
            />
          </div>

          {/* Sektoren als Chips, in der Reihenfolge der Tafel. Ein zweiter Klick
              hebt den Filter wieder auf — dasselbe Muster wie der Ebenenfilter
              in der Legende. */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {tafel.sektoren.map((sk) => {
              const aktiv = nurSektor === sk
              return (
                <button
                  key={sk}
                  type="button"
                  onClick={() => setNurSektor(aktiv ? null : sk)}
                  aria-pressed={aktiv}
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[11px] transition-colors',
                    aktiv
                      ? 'border-oelz-orange bg-oelz-orange text-oelz-on-orange font-medium'
                      : 'border-border text-muted-foreground hover:bg-secondary'
                  )}
                >
                  {sk}
                </button>
              )
            })}
          </div>
        </div>

        <div ref={koerper} className="min-h-0 flex-1 overflow-y-auto">
          {eintrag ? (
            <DetailEbene
              eintrag={eintrag}
              tafel={tafel}
              index={index}
              anzahl={treffer.length}
              onZurueck={() => onEintrag(null)}
              onBlaettern={(delta) => {
                const ziel = treffer[index + delta]
                if (ziel) onEintrag(ziel.id)
              }}
            />
          ) : (
            <ListenEbene gruppen={gruppen} tafel={tafel} onEintrag={onEintrag} />
          )}
        </div>
      </aside>
    </>
  )
}

/** Liste: nach Sektor gruppiert, Zeile = Titel + Ring + Ebene. */
function ListenEbene({
  gruppen,
  tafel,
  onEintrag,
}: {
  gruppen: [string, RadarEintrag[]][]
  tafel: RadarTafel
  onEintrag: (id: string) => void
}) {
  if (gruppen.length === 0) {
    return <p className="px-5 py-8 text-sm text-muted-foreground">Keine Treffer.</p>
  }
  return (
    <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      {gruppen.map(([sektor, eintraege]) => (
        <section key={sektor}>
          <h3 className="sticky top-0 z-10 flex items-baseline justify-between gap-2 border-b border-border bg-secondary/70 px-5 py-1.5 backdrop-blur">
            <span className="dachzeile">{sektor}</span>
            <span className="text-[11px] tabular-nums text-muted-foreground">{eintraege.length}</span>
          </h3>
          <ul className="divide-y divide-border/70">
            {eintraege.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => onEintrag(e.id)}
                  className="flex w-full items-baseline gap-3 px-5 py-2.5 text-left transition-colors hover:bg-[var(--waesche)]"
                >
                  <span className="min-w-0 flex-1 text-[14px] leading-snug">{e.titel}</span>
                  <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/70">
                    {ringFuer(tafel, e.radius).name}
                  </span>
                  {e.ebene !== 'signal' && (
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-oelz-orange-text">
                      {EBENEN_NAME[e.ebene]}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
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

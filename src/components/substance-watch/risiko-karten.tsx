'use client'

/**
 * Die Karten des Regulatorik-Radars mit Detail als Dialog.
 *
 * **Die Karte ist zum Überfliegen da, der Dialog zum Lesen.** Kai Heuberger,
 * 11.09.2026: „kurz anteasern und dann Quellenverweis … ich muss nur wissen,
 * wo erfahr ich die Geschichte." Deshalb steht auf der Karte die Kurzzeile
 * (sieben bis elf Wörter), Stufe, Behörde und Quelle — der Sachverhalt erst
 * im Dialog. Altfälle ohne Kurzzeile (vor Migration 015) zeigen den Stoff
 * als Überschrift; die Karte bleibt lesbar, bis der Nachtrag eingespielt ist.
 *
 * **Der Dialogzustand liegt in der URL** (`?signal=<id>`), wie im
 * Rohstoff-Radar: Ein geöffneter Fall ist teil- und reloadfest, weil
 * „das musst du dir ansehen" die Kernnutzung für die QS sein wird. Geöffnet
 * wird lokal, die Adresse per history.replaceState nachgezogen. `openSignal`
 * kommt aufgelöst von der Seite, damit ein geteilter Link auch dann trägt,
 * wenn der aktive Filter den Fall ausblendet.
 *
 * Die Karte ist ein klickbarer Artikel, kein <button>: Der Quellenlink darauf
 * muss selbst klickbar bleiben, und interaktive Elemente dürfen nicht in
 * einem Button stecken. Tastatur: Enter und Leertaste öffnen.
 *
 * Form und Farbe wie bisher (Spec §8): Warnzeichen und durchgezogene Kante
 * tragen die Art, die Stufenfarbe den Grad, Ausgeräumtes steht unten und still.
 */

import { useState } from 'react'
import { AlertTriangle, Check, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import {
  STUFE_NAME,
  STUFE_CHIP,
  STUFE_ERKLAERUNG,
  GELTUNGSBEREICH_NAME,
  BEHOERDE_NAME,
  HANDLUNG_NAME,
  type Risikosignal,
  type Stufe,
  type Geltungsbereich,
  type Handlung,
} from '@/types/substance-watch'

const datum = (iso: string) => format(new Date(iso), 'd. MMM yyyy', { locale: de })

function StufenChip({ stufe, gross = false }: { stufe: Stufe; gross?: boolean }) {
  return (
    <span
      title={`${STUFE_NAME[stufe]} — ${STUFE_ERKLAERUNG[stufe]}`}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full font-medium',
        gross ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]',
        STUFE_CHIP[stufe]
      )}
    >
      {STUFE_NAME[stufe]}
    </span>
  )
}

/** Die Kennzeile unter der Überschrift — auf Karte und im Dialog dieselbe. */
function Kennzeile({ s, gross = false }: { s: Risikosignal; gross?: boolean }) {
  const ausgeraeumt = s.status === 'ausgeraeumt'
  const punkt = <span className="opacity-50">·</span>
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground',
        gross ? 'text-sm' : 'text-xs'
      )}
    >
      <StufenChip stufe={s.stage} gross={gross} />
      <span>{GELTUNGSBEREICH_NAME[s.scope as Geltungsbereich] ?? s.scope}</span>
      {s.authority && (
        <>
          {punkt}
          <span>{BEHOERDE_NAME[s.authority]}</span>
        </>
      )}
      {s.action && (
        <>
          {punkt}
          <span className="font-semibold text-foreground">{HANDLUNG_NAME[s.action as Handlung] ?? s.action}</span>
        </>
      )}
      {ausgeraeumt && (
        <>
          {punkt}
          <span className="font-medium">ausgeräumt</span>
        </>
      )}
    </div>
  )
}

function Quelle({ s, className }: { s: Risikosignal; className?: string }) {
  if (!s.source_url) return null
  return (
    <a
      href={s.source_url}
      target="_blank"
      rel="noopener noreferrer"
      // Der Klick gehört dem Link, nicht der Karte darunter.
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-oelz-orange-text',
        className
      )}
    >
      {s.source_name ?? 'Quelle'}
      {s.source_date && <span className="opacity-70">· {datum(s.source_date)}</span>}
      <ExternalLink className="size-3" />
    </a>
  )
}

function Karte({ s, onOpen }: { s: Risikosignal; onOpen: (s: Risikosignal) => void }) {
  const ausgeraeumt = s.status === 'ausgeraeumt'
  const ueberschrift = s.teaser?.trim() || s.substance
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${ueberschrift} — Details öffnen`}
      onClick={() => onOpen(s)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(s)
        }
      }}
      className={cn(
        'cursor-pointer rounded-xl border border-border/80 bg-card p-5 transition-colors duration-[var(--motion-mikro)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        ausgeraeumt
          ? 'rounded-l-none border-l-4 border-l-border pl-4 opacity-70 hover:opacity-90'
          : 'rounded-l-none border-l-4 border-l-oelz-orange pl-4 hover:bg-[var(--waesche)]'
      )}
    >
      <div className="flex items-start gap-3">
        {ausgeraeumt ? (
          <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
        ) : (
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-oelz-orange-text" aria-hidden />
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="font-display text-base font-bold leading-snug tracking-wide text-foreground">
            {ueberschrift}
          </h3>
          {/* Mit Kurzzeile ist der Stoff die Unterzeile; ohne ist er schon die Überschrift. */}
          {s.teaser && (
            <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span>{s.substance}</span>
              {s.e_number && (
                <span className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[11px]">{s.e_number}</span>
              )}
            </p>
          )}

          <Kennzeile s={s} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap gap-1">
              {s.product_categories.map((k) => (
                <span key={k} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                  {k}
                </span>
              ))}
            </div>
            <Quelle s={s} />
          </div>
        </div>
      </div>
    </article>
  )
}

function Detail({ s }: { s: Risikosignal }) {
  const ueberschrift = s.teaser?.trim() || s.substance
  return (
    <DialogContent className="sm:max-w-2xl max-h-[86vh] overflow-y-auto p-0 gap-0" showCloseButton>
      <div className="border-b border-border p-6 pb-5">
        <p className="mb-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
          <span>{s.substance}</span>
          {s.e_number && (
            <span className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[11px]">{s.e_number}</span>
          )}
        </p>
        <DialogTitle className="pr-8 font-display text-xl font-bold leading-snug">{ueberschrift}</DialogTitle>
        <div className="mt-3">
          <Kennzeile s={s} gross />
        </div>
      </div>

      <div className="space-y-5 px-6 py-5">
        <div>
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-oelz-orange-text">
            Was der Fall ist
          </h3>
          <p className="text-sm leading-relaxed">{s.situation}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap gap-1">
            {s.product_categories.map((k) => (
              <span key={k} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                {k}
              </span>
            ))}
          </div>
          <Quelle s={s} className="text-primary hover:underline" />
        </div>
      </div>
    </DialogContent>
  )
}

export function RisikoKarten({
  aktiv,
  erledigt,
  openSignal = null,
}: {
  aktiv: Risikosignal[]
  erledigt: Risikosignal[]
  openSignal?: Risikosignal | null
}) {
  const [active, setActive] = useState<Risikosignal | null>(openSignal)

  function syncUrl(id: string | null) {
    const params = new URLSearchParams(window.location.search)
    if (id) params.set('signal', id)
    else params.delete('signal')
    const query = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`)
  }

  function open(s: Risikosignal) {
    setActive(s)
    syncUrl(s.id)
  }

  function close() {
    setActive(null)
    syncUrl(null)
  }

  return (
    <>
      {aktiv.length === 0 ? (
        <div className="rounded-xl border bg-card py-10 text-center text-sm text-muted-foreground">
          Für diese Auswahl steht nichts unter Beobachtung.
        </div>
      ) : (
        <div className="space-y-3">
          {aktiv.map((s) => (
            <Karte key={s.id} s={s} onOpen={open} />
          ))}
        </div>
      )}

      {erledigt.length > 0 && (
        <section className="space-y-3 pt-2">
          <h2 className="dachzeile text-muted-foreground">
            Ausgeräumt{' '}
            <span className="font-normal normal-case tracking-normal">
              · Entwarnung gegeben, zur Nachvollziehbarkeit erhalten
            </span>
          </h2>
          {erledigt.map((s) => (
            <Karte key={s.id} s={s} onOpen={open} />
          ))}
        </section>
      )}

      <Dialog open={!!active} onOpenChange={(isOpen) => !isOpen && close()}>
        {active && <Detail s={active} />}
      </Dialog>
    </>
  )
}

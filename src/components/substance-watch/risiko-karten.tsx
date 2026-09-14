'use client'

/**
 * Die Karten des Regulatorik-Radars mit Detail als Dialog — drei Eintragstypen
 * (Unter Beobachtung · Zulassung · Indirekt relevant), Ausgeräumtes zuletzt.
 *
 * **Die Karte ist zum Überfliegen da, der Dialog zum Lesen.** Kai Heuberger,
 * 11.09.2026: „kurz anteasern und dann Quellenverweis … ich muss nur wissen,
 * wo erfahr ich die Geschichte." Deshalb steht auf der Karte die Kurzzeile
 * (sieben bis elf Wörter), Stufe oder Typ, Behörde und Quelle — der
 * Sachverhalt erst im Dialog. Altfälle ohne Kurzzeile zeigen den Stoff als
 * Überschrift.
 *
 * **Form unterscheidet die Art** (Spec §8), Farbe den Grad: Ein Risiko trägt
 * Warnzeichen und orange Kante, eine Zulassung Haken und braune Kante, ein
 * indirekter Fall Info-Zeichen und graue Kante — leiser, weil er es ist.
 * Die Stufenfarbe bleibt den Risiken vorbehalten.
 *
 * **Der Dialogzustand liegt in der URL** (`?signal=<id>`), wie im
 * Rohstoff-Radar: teil- und reloadfest. Geöffnet wird lokal, die Adresse per
 * history.replaceState nachgezogen. `openSignal` kommt aufgelöst von der
 * Seite, damit ein geteilter Link auch dann trägt, wenn der aktive Filter den
 * Fall ausblendet.
 *
 * Die Karte ist ein klickbarer Artikel, kein <button>: Der Quellenlink darauf
 * muss selbst klickbar bleiben. Tastatur: Enter und Leertaste öffnen.
 */

import { useState } from 'react'
import { AlertTriangle, Check, CircleCheck, ExternalLink, Info } from 'lucide-react'
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
  EINTRAGSTYP_NAME,
  EINTRAGSTYP_ERKLAERUNG,
  type Risikosignal,
  type Stufe,
  type Geltungsbereich,
  type Handlung,
  type Eintragstyp,
} from '@/types/substance-watch'

const datum = (iso: string) => format(new Date(iso), 'd. MMM yyyy', { locale: de })

/** Kante und Zeichen je Typ — die Form trägt die Art. */
const FORM: Record<Eintragstyp, { kante: string; Zeichen: typeof AlertTriangle; zeichenFarbe: string }> = {
  risiko: { kante: 'border-l-oelz-orange', Zeichen: AlertTriangle, zeichenFarbe: 'text-oelz-orange-text' },
  zulassung: { kante: 'border-l-oelz-braun', Zeichen: CircleCheck, zeichenFarbe: 'text-oelz-braun' },
  indirekt: { kante: 'border-l-border', Zeichen: Info, zeichenFarbe: 'text-muted-foreground' },
}

const TYP_CHIP: Record<Exclude<Eintragstyp, 'risiko'>, string> = {
  zulassung: 'border border-oelz-braun/25 bg-oelz-braun/10 text-oelz-braun',
  indirekt: 'border border-border text-muted-foreground',
}

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

function TypChip({ typ, gross = false }: { typ: Exclude<Eintragstyp, 'risiko'>; gross?: boolean }) {
  return (
    <span
      title={`${EINTRAGSTYP_NAME[typ]} — ${EINTRAGSTYP_ERKLAERUNG[typ]}`}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full font-medium',
        gross ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]',
        TYP_CHIP[typ]
      )}
    >
      {EINTRAGSTYP_NAME[typ]}
    </span>
  )
}

/** Die Kennzeile unter der Überschrift — auf Karte und im Dialog dieselbe. */
function Kennzeile({ s, gross = false }: { s: Risikosignal; gross?: boolean }) {
  const erledigt = s.status === 'ausgeraeumt'
  const punkt = <span className="opacity-50">·</span>
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground',
        gross ? 'text-sm' : 'text-xs'
      )}
    >
      {s.kind === 'risiko' && s.stage ? <StufenChip stufe={s.stage} gross={gross} /> : null}
      {s.kind !== 'risiko' && <TypChip typ={s.kind} gross={gross} />}
      <span>{GELTUNGSBEREICH_NAME[s.scope as Geltungsbereich] ?? s.scope}</span>
      {s.authority && (
        <>
          {punkt}
          <span>{BEHOERDE_NAME[s.authority]}</span>
        </>
      )}
      {s.kind === 'risiko' && s.action && (
        <>
          {punkt}
          <span className="font-semibold text-foreground">{HANDLUNG_NAME[s.action as Handlung] ?? s.action}</span>
        </>
      )}
      {erledigt && (
        <>
          {punkt}
          <span className="font-medium">{s.kind === 'risiko' ? 'ausgeräumt' : 'abgeschlossen'}</span>
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

function Kategorien({ s }: { s: Risikosignal }) {
  if (s.product_categories.length === 0) return <span />
  return (
    <div className="flex flex-wrap gap-1">
      {s.product_categories.map((k) => (
        <span key={k} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
          {k}
        </span>
      ))}
    </div>
  )
}

function Karte({ s, onOpen }: { s: Risikosignal; onOpen: (s: Risikosignal) => void }) {
  const erledigt = s.status === 'ausgeraeumt'
  const ueberschrift = s.teaser?.trim() || s.substance
  const { kante, Zeichen, zeichenFarbe } = FORM[s.kind]
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
        'cursor-pointer rounded-xl rounded-l-none border border-l-4 border-border/80 bg-card p-5 pl-4 transition-colors duration-[var(--motion-mikro)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        erledigt ? 'border-l-border opacity-70 hover:opacity-90' : cn(kante, 'hover:bg-[var(--waesche)]')
      )}
    >
      <div className="flex items-start gap-3">
        {erledigt ? (
          <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
        ) : (
          <Zeichen className={cn('mt-0.5 size-4 shrink-0', zeichenFarbe)} aria-hidden />
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="font-display text-base font-bold leading-snug tracking-wide text-foreground">
            {ueberschrift}
          </h3>
          {/* Mit Kurzzeile ist der Stoff die Unterzeile; ohne ist er schon die Überschrift. */}
          {s.teaser && s.substance && (
            <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              <span>{s.substance}</span>
              {s.e_number && (
                <span className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[11px]">{s.e_number}</span>
              )}
            </p>
          )}

          <Kennzeile s={s} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <Kategorien s={s} />
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
        {s.substance && (
          <p className="mb-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
            <span>{s.substance}</span>
            {s.e_number && (
              <span className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[11px]">{s.e_number}</span>
            )}
          </p>
        )}
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

        {s.kind === 'indirekt' && s.why_relevant && (
          <div className="rounded-lg border-l-2 border-oelz-orange/40 bg-muted/40 px-4 py-3">
            <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-oelz-orange-text">
              Warum das Ölz betreffen könnte
            </h3>
            <p className="text-sm leading-relaxed">{s.why_relevant}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="space-y-1">
            {s.kind === 'zulassung' && s.product_categories.length > 0 && (
              <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Wo Ölz den Stoff einsetzen könnte</p>
            )}
            <Kategorien s={s} />
          </div>
          <Quelle s={s} className="text-primary hover:underline" />
        </div>
      </div>
    </DialogContent>
  )
}

function Abschnitt({
  titel,
  unterzeile,
  eintraege,
  onOpen,
  mitTitel,
}: {
  titel: string
  unterzeile?: string
  eintraege: Risikosignal[]
  onOpen: (s: Risikosignal) => void
  mitTitel: boolean
}) {
  if (eintraege.length === 0) return null
  return (
    <section className="space-y-3">
      {mitTitel && (
        <h2 className="dachzeile text-muted-foreground">
          {titel}{' '}
          <span className="font-normal normal-case tracking-normal">
            · {eintraege.length}
            {unterzeile && ` · ${unterzeile}`}
          </span>
        </h2>
      )}
      {eintraege.map((s) => (
        <Karte key={s.id} s={s} onOpen={onOpen} />
      ))}
    </section>
  )
}

export function RisikoKarten({
  risiko,
  zulassung,
  indirekt,
  erledigt,
  openSignal = null,
}: {
  risiko: Risikosignal[]
  zulassung: Risikosignal[]
  indirekt: Risikosignal[]
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

  const aktivGesamt = risiko.length + zulassung.length + indirekt.length
  // Ein Abschnittstitel lohnt sich erst, wenn es etwas zu trennen gibt.
  const mitTitel = [risiko, zulassung, indirekt].filter((l) => l.length > 0).length > 1

  return (
    <>
      {aktivGesamt === 0 ? (
        <div className="rounded-xl border bg-card py-10 text-center text-sm text-muted-foreground">
          Für diese Auswahl gibt es keinen offenen Fall.
        </div>
      ) : (
        <div className="space-y-6">
          <Abschnitt titel="Unter Beobachtung" eintraege={risiko} onOpen={open} mitTitel={mitTitel} />
          <Abschnitt titel="Zulassungen" eintraege={zulassung} onOpen={open} mitTitel={mitTitel} />
          <Abschnitt
            titel="Indirekt relevant"
            unterzeile="ohne benennbaren Stoff oder Ölz-Kategorie, aber mit Grund"
            eintraege={indirekt}
            onOpen={open}
            mitTitel={mitTitel}
          />
        </div>
      )}

      <Abschnitt
        titel="Ausgeräumt oder abgeschlossen"
        unterzeile="zur Nachvollziehbarkeit erhalten"
        eintraege={erledigt}
        onOpen={open}
        mitTitel
      />

      <Dialog open={!!active} onOpenChange={(isOpen) => !isOpen && close()}>
        {active && <Detail s={active} />}
      </Dialog>
    </>
  )
}

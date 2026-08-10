'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { IngredientSignalCard } from './ingredient-signal-card'
import { isNewSignal, type IngredientSignal } from '@/types/ingredient-signals'

/**
 * Kachelgrid mit Detail als Dialog.
 *
 * Der Dialogzustand liegt in der URL (`?signal=<id>`), damit ein geöffnetes
 * Signal teil- und reloadfest ist — „das musst du dir ansehen" ist eine der
 * Kernnutzungen des Moduls. Geöffnet wird lokal (sofort, kein Server-Roundtrip),
 * die Adresse wird per history.replaceState nachgezogen.
 *
 * `openSignal` kommt fertig aufgelöst von der Seite und nicht als ID, weil ein
 * geteilter Link auch dann das richtige Signal zeigen muss, wenn die aktive
 * Filterauswahl es aus der Kachelliste ausschließt.
 */
export function IngredientSignalGrid({
  signals,
  stand,
  openSignal = null,
}: {
  signals: IngredientSignal[]
  stand: string | null
  openSignal?: IngredientSignal | null
}) {
  const [active, setActive] = useState<IngredientSignal | null>(openSignal)

  function syncUrl(signalId: string | null) {
    const params = new URLSearchParams(window.location.search)
    if (signalId) params.set('signal', signalId)
    else params.delete('signal')
    const query = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`)
  }

  function open(signal: IngredientSignal) {
    setActive(signal)
    syncUrl(signal.id)
  }

  function close() {
    setActive(null)
    syncUrl(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {signals.map((signal) => (
          <button
            key={signal.id}
            type="button"
            onClick={() => open(signal)}
            aria-label={`${signal.title} — Details öffnen`}
            className="text-left rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <IngredientSignalCard signal={signal} isNew={isNewSignal(signal, stand)} />
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(isOpen) => !isOpen && close()}>
        {active && <SignalDetail signal={active} />}
      </Dialog>
    </>
  )
}

function SignalDetail({ signal }: { signal: IngredientSignal }) {
  const meta: [string, string | null][] = [
    ['Funktion', signal.functions.join(', ') || null],
    ['Reifegrad', signal.maturity],
    ['Evidenz', signal.evidence],
    [
      'Quelle',
      [signal.source_name, signal.source_date && format(new Date(signal.source_date), 'd. MMM yyyy', { locale: de })]
        .filter(Boolean)
        .join(' · ') || null,
    ],
  ]

  const chain: [string, string | null][] = [
    ['Strategisches Thema', signal.strategic_theme],
    ['Gelöstes Problem', signal.problem_solved],
    ['Anwendung bei Ölz', signal.oelz_application],
    ['Chance', signal.oelz_opportunity],
    ['Nächster Schritt', signal.next_step],
  ]
  const chainShown = chain.filter(([, value]) => !!value)

  return (
    <DialogContent className="sm:max-w-2xl max-h-[86vh] overflow-y-auto p-0 gap-0" showCloseButton>
      <div className="p-6 pb-5 border-b border-border">
        <p className="text-xs text-muted-foreground mb-1">
          {signal.subject_type} · {signal.subject_name}
        </p>
        <DialogTitle className="font-display text-xl font-bold leading-snug pr-8">
          {signal.title}
        </DialogTitle>
      </div>

      {/* Zone „Befund". Steht im gestapelten Dialog vor der Kette — sonst liest
          man fünf Einschätzungen, bevor klar ist, worum es überhaupt geht. */}
      <div className="px-6 py-5 bg-muted/40 border-b border-border">
        <h3 className="text-[11px] uppercase tracking-[0.14em] text-oelz-orange-text font-bold mb-2.5">
          Grundlage
        </h3>
        {signal.what_is_new && (
          <p className="text-sm leading-relaxed mb-4">{signal.what_is_new}</p>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {meta.map(([label, value]) =>
            value ? (
              <span key={label}>
                <span className="text-muted-foreground">{label} </span>
                <span className="font-medium">{value}</span>
              </span>
            ) : null
          )}
        </div>
        {signal.source_url && (
          <a
            href={signal.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
          >
            Quelle öffnen <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Zone „Einschätzung" — die Relevanzkette als verbundener Fluss. */}
      <div className="px-6 py-6">
        <h3 className="text-[11px] uppercase tracking-[0.14em] text-oelz-orange-text font-bold mb-5">
          Was wir daraus machen
        </h3>
        {chainShown.map(([label, value], i) => (
          <div key={label} className="relative pl-5">
            {i < chainShown.length - 1 && (
              <span className="absolute left-[5px] top-4 bottom-0 w-px bg-border" />
            )}
            <span className="absolute left-0 top-[6px] w-[11px] h-[11px] rounded-full border-2 border-primary bg-background" />
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">
              {label}
            </p>
            <p className="text-sm leading-snug mt-0.5 mb-4">{value}</p>
          </div>
        ))}
      </div>
    </DialogContent>
  )
}

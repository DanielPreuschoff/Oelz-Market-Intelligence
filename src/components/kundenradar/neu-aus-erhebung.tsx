import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { SIGNALTYP_NAME, type Signaltyp } from '@/types/kundenradar'

/** So viele stehen offen da; der Rest ist einen Klick entfernt. */
const SICHTBAR = 6

export interface NeuEintrag {
  id: string
  title: string
  signal_type: Signaltyp
  contact_trigger: boolean
  source_date: string | null
  haendler: string
  slug: string
}

/**
 * „Neu aus der letzten Erhebung" — was der jüngste Lauf gebracht hat, über
 * alle Händler.
 *
 * Bewusst nicht „seit deinem letzten Besuch": Der `ModulbesuchMelder` setzt
 * den Lesestand, sobald die Navigation steht — oft bevor diese Seite ihre
 * Daten gelesen hat. Eine Liste, die am Besuch hängt, war deshalb im Test vom
 * 27.10.2026 schon leer, bevor man sie sah. Das Erhebungsfenster ist dieselbe
 * Regel wie auf der Startseite und im Rohstoff-Radar und rutscht nicht weg;
 * das Persönliche („ungesehen") trägt der Zähler in der Seitenleiste.
 */
export function NeuAusErhebung({ eintraege }: { eintraege: NeuEintrag[] }) {
  if (eintraege.length === 0) return null
  const oben = eintraege.slice(0, SICHTBAR)
  const rest = eintraege.slice(SICHTBAR)

  return (
    <section className="space-y-3">
      <h2 className="dachzeile">
        Neu aus der letzten Erhebung{' '}
        <span className="font-normal normal-case tracking-normal text-muted-foreground">· {eintraege.length}</span>
      </h2>
      <div className="karte divide-y divide-border/70 overflow-hidden">
        {oben.map((e) => (
          <NeuZeile key={e.id} e={e} />
        ))}
        {rest.length > 0 && (
          // Natives <details>: kein Client-JavaScript, und die Liste bleibt
          // stehen, wenn der Lesestand die Seite neu rendert.
          <details className="group/mehr">
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-oelz-orange-text transition-colors hover:bg-[var(--waesche)] [&::-webkit-details-marker]:hidden">
              <span className="group-open/mehr:hidden">Alle {eintraege.length} anzeigen</span>
              <span className="hidden group-open/mehr:inline">Weniger anzeigen</span>
            </summary>
            <div className="divide-y divide-border/70 border-t border-border/70">
              {rest.map((e) => (
                <NeuZeile key={e.id} e={e} />
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}

function NeuZeile({ e }: { e: NeuEintrag }) {
  return (
    <Link
      href={`/kundenradar/${e.slug}#${e.id}`}
      className="group flex items-start gap-4 px-4 py-3 transition-colors hover:bg-[var(--waesche)]"
    >
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[15px] font-bold leading-snug transition-colors group-hover:text-primary">
          {e.title}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">{e.haendler}</span>
          <span>· {SIGNALTYP_NAME[e.signal_type]}</span>
          {e.contact_trigger && (
            <span className="rounded-full bg-oelz-orange px-2 py-0.5 text-[10px] font-bold text-oelz-on-orange">
              Anlass
            </span>
          )}
        </span>
      </span>
      {e.source_date && (
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {format(new Date(e.source_date), 'd. MMM', { locale: de })}
        </span>
      )}
    </Link>
  )
}

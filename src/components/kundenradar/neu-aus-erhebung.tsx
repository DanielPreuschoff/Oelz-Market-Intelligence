import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { SIGNALTYP_NAME, type Signaltyp } from '@/types/kundenradar'

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

  return (
    <section className="space-y-3">
      <h2 className="dachzeile">
        Neu aus der letzten Erhebung{' '}
        <span className="font-normal normal-case tracking-normal text-muted-foreground">· {eintraege.length}</span>
      </h2>
      <div className="karte divide-y divide-border/70 overflow-hidden">
        {eintraege.map((e) => (
          <Link
            key={e.id}
            href={`/kundenradar/${e.slug}#${e.id}`}
            className="group flex items-start gap-4 px-4 py-3 transition-colors hover:bg-[var(--waesche)]"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[15px] font-bold leading-snug transition-colors group-hover:text-primary">
                {e.title}
              </span>
              <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <span>{e.haendler}</span>
                <span>· {SIGNALTYP_NAME[e.signal_type]}</span>
                {e.contact_trigger && (
                  <span className="inline-flex items-center gap-1 font-medium text-oelz-orange-text">
                    <span className="size-1.5 rounded-full bg-oelz-orange" aria-hidden />
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
        ))}
      </div>
    </section>
  )
}

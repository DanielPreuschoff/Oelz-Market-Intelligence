import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  KUNDENSTATUS_CHIP,
  KUNDENSTATUS_NAME,
  LAND_NAME,
  gruppiereHaendler,
  type Haendler,
} from '@/types/kundenradar'

export interface KachelStand {
  anzahl: number
  /** Signale aus der letzten Erhebung (Regel wie auf der Startseite). */
  neu: number
  /** Signale mit „Anlass für Kundenkontakt". */
  anlass: number
  juengstes: { title: string; source_date: string | null } | null
}

/**
 * Die Händler als Kacheln, nach Konzern gruppiert. Innerhalb eines Konzerns
 * stehen die Länder nebeneinander — der Ländervergleich, den Simons Mail als
 * Ziel nennt, braucht so keinen Klick (Spec §11.3).
 */
export function HaendlerKacheln({
  haendler,
  stand,
}: {
  haendler: Haendler[]
  stand: ReadonlyMap<string, KachelStand>
}) {
  return (
    <div className="space-y-8">
      {gruppiereHaendler(haendler).map(({ gruppe, haendler: liste }) => (
        <section key={gruppe ?? '—'} className="space-y-3">
          <h2 className="dachzeile">{gruppe ?? 'Weitere Händler'}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {liste.map((h) => {
              const s = stand.get(h.id) ?? { anzahl: 0, neu: 0, anlass: 0, juengstes: null }
              return (
                <Link
                  key={h.id}
                  href={`/kundenradar/${h.slug}`}
                  className="karte group flex flex-col gap-3 p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                        {h.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{LAND_NAME[h.country]}</p>
                    </div>
                    {s.neu > 0 && (
                      <span className="shrink-0 rounded-full bg-oelz-orange px-2 py-0.5 text-[11px] font-bold text-oelz-on-orange">
                        {s.neu} neu
                      </span>
                    )}
                  </div>

                  <div className="flex-1 text-sm leading-relaxed">
                    {s.juengstes ? (
                      <>
                        <p className="line-clamp-2 text-foreground">{s.juengstes.title}</p>
                        {s.juengstes.source_date && (
                          <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                            {format(new Date(s.juengstes.source_date), 'd. MMM yyyy', { locale: de })}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-muted-foreground">Noch kein Signal</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-border/70 pt-3">
                    {/* Fast alle sind Kunde — der Chip steht nur, wo er etwas unterscheidet. */}
                    <span className="flex items-center gap-2">
                      {h.customer_status !== 'kunde' && (
                        <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', KUNDENSTATUS_CHIP[h.customer_status])}>
                          {KUNDENSTATUS_NAME[h.customer_status]}
                        </span>
                      )}
                      {s.anlass > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-oelz-orange-text">
                          <span className="size-1.5 rounded-full bg-oelz-orange" aria-hidden />
                          {s.anlass === 1 ? '1 Anlass' : `${s.anlass} Anlässe`}
                        </span>
                      )}
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {s.anzahl} {s.anzahl === 1 ? 'Signal' : 'Signale'}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

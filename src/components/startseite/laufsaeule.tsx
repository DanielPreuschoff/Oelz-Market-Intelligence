/**
 * Die Laufsäule: Anreißer aus dem Produkt- & Innovationsradar, die langsam nach
 * oben laufen — das eine Ambient-Element der Plattform (ADR 0005).
 *
 * Bewegung nach der Referenzaufnahme (Trendhunter, `research/referenz/`):
 * konstant linear, 0,2 Karten pro Sekunde, harte Kanten oben und unten (kein
 * Verlauf), Hover hält sofort an. Die Spur enthält jede Karte zweimal;
 * `translateY(-50 %)` ergibt daraus eine nahtlose Schleife.
 *
 * Die Fensterhöhe ist ein Inline-Stil, keine Klasse: Sie ergibt sich aus der
 * Kartenzahl und muss auch dann stimmen, wenn CSS noch nicht geladen ist.
 * Karten sind gleich hoch, weil Titel und Anreißer je zwei Zeilen reservieren.
 *
 * Unter 1024 px wird aus der Säule eine waagrechte Wischreihe ohne Lauf; bei
 * `prefers-reduced-motion` steht sie still.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { ImpulsTeaser } from '@/lib/startseite/daten'

/** Kartenabstand in px (Kartenhöhe + Lücke) — Grundlage von Tempo und Fenster. */
const KARTEN_ABSTAND = 175
/** Geschwindigkeit: 0,2 Karten pro Sekunde wie in der Referenz. */
const TEMPO = KARTEN_ABSTAND * 0.2

export function Laufsaeule({
  impulse,
  sichtbar = 3,
  className,
  style,
}: {
  impulse: ImpulsTeaser[]
  /** Wie viele Karten das Fenster zeigt. Alles Weitere läuft hindurch. */
  sichtbar?: number
  className?: string
  style?: React.CSSProperties
}) {
  const karten = impulse.filter((im) => im.image_url)
  if (karten.length === 0) return null

  const spur = [...karten, ...karten]
  const dauer = `${Math.round((karten.length * KARTEN_ABSTAND) / TEMPO)}s`
  const fensterHoehe = sichtbar * KARTEN_ABSTAND - 12

  return (
    <div className={cn('relative', className)} style={style} aria-label="Impulse aus dem Produkt- und Innovationsradar">
      <div className="bildlauf-halt overflow-hidden" style={{ height: fensterHoehe }}>
        <ul
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0 bildlauf"
          style={{ '--bildlauf-dauer': dauer } as React.CSSProperties}
        >
          {spur.map((im, idx) => {
            const kopie = idx >= karten.length
            return (
              <li
                key={`${im.id}-${idx}`}
                className={cn('shrink-0 snap-start w-[21rem] lg:w-auto', kopie && 'hidden lg:block')}
                aria-hidden={kopie}
              >
                <Link
                  href={`/produkt-radar?type=${encodeURIComponent(im.radar_type)}`}
                  tabIndex={kopie ? -1 : undefined}
                  className={cn(
                    'group relative grid grid-cols-[7.5rem_1fr] sm:grid-cols-[10.5rem_1fr] gap-4 items-stretch rounded-xl p-3',
                    'bg-card text-card-foreground shadow-[0_1px_2px_rgba(34,28,26,0.08)]',
                    'transition-colors duration-[var(--motion-mikro)] ease-[var(--ease-weich)]',
                    // Die Säule steht auf oranger Fläche: Hover kippt sie auf Braun,
                    // nicht auf Orange — sonst verschwände die Karte im Grund.
                    'hover:bg-oelz-on-orange hover:text-card',
                  )}
                >
                  {/* Bild füllt die Kartenhöhe; oben und unten derselbe Abstand zum Rand. */}
                  <span className="relative block h-full min-h-[7rem] overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={im.image_url!} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  </span>

                  <span className="min-w-0 flex flex-col sm:min-h-[7rem]">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-oelz-orange-text transition-colors group-hover:text-oelz-orange">
                        Produktradar · {im.radar_type}
                      </span>
                      <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted-foreground transition-colors group-hover:text-card/70">
                        {format(new Date(im.created_at), 'd. MMM', { locale: de })}
                      </span>
                    </span>

                    {/* Zwei Zeilen reserviert, Überlauf mit „…" — alle Karten gleich hoch. */}
                    <span className="mt-1 font-display font-bold text-[17px] lg:text-[18px] leading-[1.15] line-clamp-2 min-h-[2.3em]">
                      {im.title}
                    </span>
                    <span className="mt-1.5 text-[13px] leading-snug line-clamp-2 min-h-[2.75em] text-muted-foreground transition-colors group-hover:text-card/75">
                      {im.short_signal ?? ''}
                    </span>

                    <span className="mt-auto pt-2.5 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1 rounded-full bg-oelz-on-orange text-card px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-[var(--motion-mikro)] group-hover:bg-oelz-orange group-hover:text-oelz-on-orange">
                        Öffnen <ArrowRight className="size-3" />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/**
 * Der Einstieg ins Wettbewerbsradar: die aktuelle Edition als Bühne, das
 * Archiv als Monatskacheln darunter.
 *
 * Die Bühne beantwortet zwei Fragen auf einmal — worum geht es in dieser
 * Ausgabe (Titel und Vorspann links) und was ist darin kritisch (Liste
 * rechts, als Direkteinstieg). Die Logoleiste zeigt, wer in der Ausgabe
 * vorkommt; das ist die Frage, mit der die meisten die Seite öffnen.
 *
 * Das Archiv liegt im Raster statt in einer Liste: in der breiten Spalte
 * hätten Listenzeilen rund 1000 px Leere zwischen Titel und Pfeil.
 */

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import type { Edition, ImportanceLevel } from '@/types/database'
import { wettbewerberLogo } from '@/lib/wettbewerber-logos'

/** Was die Bühne von einem Signal braucht — nicht der ganze Datensatz. */
export interface BuehnenSignal {
  id: string
  headline: string
  importance: ImportanceLevel
  competitor: { id: string; short_name: string; logo_url: string | null } | null
}

const monat = (iso: string) => format(new Date(iso), 'MMMM yyyy', { locale: de })

export function EditionsBuehne({
  latest,
  archive,
  countMap,
  latestSignale,
}: {
  latest: Edition
  archive: Edition[]
  countMap: Record<string, number>
  latestSignale: BuehnenSignal[]
}) {
  const kritische = latestSignale.filter((s) => s.importance === '3').slice(0, 5)

  // Je Wettbewerber ein Logo, in der Reihenfolge des Erscheinens in der Edition.
  const wettbewerber = new Map<string, { short_name: string; logo: string | null }>()
  latestSignale.forEach((s) => {
    if (s.competitor && !wettbewerber.has(s.competitor.id)) {
      wettbewerber.set(s.competitor.id, {
        short_name: s.competitor.short_name,
        logo: s.competitor.logo_url ?? wettbewerberLogo(s.competitor.short_name),
      })
    }
  })
  const logos = [...wettbewerber.values()].filter((w) => w.logo)
  const href = `/editions/${latest.id}`

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card">
        <div className="grid lg:grid-cols-5">
          <div className="flex flex-col gap-4 p-7 lg:col-span-3 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="dachzeile">Aktuelle Edition</span>
              <span className="text-sm text-muted-foreground">{monat(latest.period_month)}</span>
            </div>
            <Link href={href} className="group block">
              <h2 className="font-display text-2xl font-bold leading-tight tracking-wide transition-colors group-hover:text-primary sm:text-3xl">
                {latest.title}
              </h2>
            </Link>
            {latest.editorial_summary && (
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{latest.editorial_summary}</p>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
              <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Alle {countMap[latest.id] ?? 0} Signale lesen <ChevronRight className="size-4" />
              </Link>
              {logos.length > 0 && (
                <div className="flex items-center gap-2 sm:ml-auto">
                  <span className="text-xs text-muted-foreground">Im Blick:</span>
                  {/* Kreise mit 40 px statt 28: bei 28 waren Wortmarken wie
                      „La Boulangère" oder „Kuchenmeister" nicht mehr lesbar,
                      die Reihe wirkte wie eine Punktkette. Die Überlappung
                      wächst proportional mit, damit das Staffelbild bleibt. */}
                  <div className="flex -space-x-2">
                    {logos.slice(0, 9).map((w) => (
                      <span
                        key={w.short_name}
                        title={w.short_name}
                        className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-white p-1.5 ring-2 ring-card"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={w.logo!} alt={w.short_name} className="max-h-full max-w-full object-contain" loading="lazy" />
                      </span>
                    ))}
                    {logos.length > 9 && (
                      <span className="flex size-10 items-center justify-center rounded-full border border-border/70 bg-secondary text-[11px] font-bold text-muted-foreground ring-2 ring-card">
                        +{logos.length - 9}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {kritische.length > 0 && (
            <div className="border-t border-border/70 bg-secondary/30 p-6 lg:col-span-2 lg:border-l lg:border-t-0 lg:p-7">
              <p className="dachzeile mb-3">Kritisch in dieser Edition</p>
              <ul className="divide-y divide-border/60">
                {kritische.map((s) => {
                  const logo = s.competitor?.logo_url ?? wettbewerberLogo(s.competitor?.short_name)
                  return (
                    <li key={s.id}>
                      <Link href={href} className="group flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-white p-1">
                          {logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logo} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
                          ) : (
                            <span className="size-1.5 rounded-full bg-oelz-orange" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 font-display text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                            {s.headline}
                          </span>
                          <span className="text-xs text-muted-foreground">{s.competitor?.short_name}</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      {archive.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-baseline gap-3">
            <span className="dachzeile">Archiv</span>
            <span className="text-sm text-muted-foreground">
              {archive.length} {archive.length === 1 ? 'frühere Edition' : 'frühere Editionen'}
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {archive.map((edition) => (
              <Link key={edition.id} href={`/editions/${edition.id}`} className="karte group flex flex-col gap-2 p-5">
                <p className="dachzeile">{monat(edition.period_month)}</p>
                <p className="line-clamp-2 font-display text-base font-bold leading-snug tracking-wide transition-colors group-hover:text-primary">
                  {edition.title}
                </p>
                <p className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span>{countMap[edition.id] ?? 0} Signale</span>
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

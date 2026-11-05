/**
 * MUSTER Stufe 2 — Übersicht. Wegwerf-Seite zur Abstimmung (siehe _bausteine.tsx).
 * Liest echte Daten; nur das Aussehen und die Anordnung sind neu.
 */
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ArrowRight, MessageSquareQuote } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { cn } from '@/lib/utils'
import { NeuAusErhebung, type NeuEintrag } from '@/components/kundenradar/neu-aus-erhebung'
import {
  KUNDENSTATUS_CHIP,
  KUNDENSTATUS_NAME,
  LAENDER,
  LAND_NAME,
  SIGNALTYP_NAME,
  haendlerKurzname,
  type Haendler,
  type Kundensignal,
} from '@/types/kundenradar'
import { LandCode, Marke, MusterHinweis, TypChip } from './_bausteine'

type Sig = Pick<Kundensignal, 'id' | 'retailer_id' | 'signal_type' | 'title' | 'teaser' | 'oelz_relevance' | 'source_date' | 'contact_trigger'>

interface PageProps {
  searchParams: Promise<{ sicht?: string }>
}

export default async function KundenradarMusterPage({ searchParams }: PageProps) {
  if (!(await isCurrentUserAdmin())) notFound()
  const { sicht } = await searchParams
  const nachLand = sicht === 'land'

  const supabase = await createClient()
  const [{ data: hRoh }, { data: sRoh }] = await Promise.all([
    supabase.from('retailers').select('*').eq('active', true),
    supabase
      .from('retailer_signals')
      .select('id, retailer_id, signal_type, title, teaser, oelz_relevance, source_date, contact_trigger')
      .eq('status', 'published'),
  ])
  const haendler = (hRoh ?? []) as unknown as Haendler[]
  const signale = ((sRoh ?? []) as unknown as Sig[]).sort((a, b) =>
    (b.source_date ?? '').localeCompare(a.source_date ?? '')
  )
  const nachId = new Map(haendler.map((h) => [h.id, h]))
  const vonHaendler = (id: string) => signale.filter((s) => s.retailer_id === id)

  const anlaesse = signale.filter((s) => s.contact_trigger && nachId.has(s.retailer_id))
  const laender = new Set(haendler.map((h) => h.country))

  // Ketten: eine Zeile je Kettenname, die Länder als Felder daneben.
  const ketten = new Map<string, Haendler[]>()
  for (const h of haendler) ketten.set(h.name, [...(ketten.get(h.name) ?? []), h])
  const rang = (h: Haendler) => LAENDER.indexOf(h.country)
  const kettenListe = [...ketten.entries()]
    .map(([name, liste]) => ({ name, liste: liste.sort((a, b) => rang(a) - rang(b)) }))
    .sort((a, b) => b.liste.length - a.liste.length || rang(a.liste[0]) - rang(b.liste[0]) || a.name.localeCompare(b.name))

  const neu: NeuEintrag[] = signale
    .filter((s) => nachId.has(s.retailer_id))
    .map((s) => {
      const h = nachId.get(s.retailer_id)!
      return { id: s.id, title: s.title, signal_type: s.signal_type, contact_trigger: s.contact_trigger, source_date: s.source_date, haendler: haendlerKurzname(h), slug: h.slug }
    })

  return (
    <div className="space-y-10">
      <MusterHinweis />

      {/* Kopf mit Kennzahlen-Leiste */}
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <p className="dachzeile">Vertrieb · Handelskunden</p>
          <h1 className="font-display text-4xl font-bold tracking-wide text-foreground">Kundenradar</h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Welche Richtung unsere Handelskunden einschlagen — je Händler und Land, mit dem Satz, was das für
            Ölz heißt.
          </p>
        </div>
        <dl className="grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-border bg-border text-center">
          {[
            [signale.length, 'Signale'],
            [anlaesse.length, 'Anlässe'],
            [haendler.length, 'Händler'],
            [laender.size, 'Länder'],
          ].map(([n, l]) => (
            <div key={l} className="bg-card px-5 py-3">
              <dt className="font-display text-2xl font-bold tabular-nums text-foreground">{n}</dt>
              <dd className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Gesprächsanlässe */}
      {anlaesse.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold">
              <MessageSquareQuote className="size-5 text-oelz-orange" />
              Gesprächsanlässe
            </h2>
            <span className="text-xs text-muted-foreground">die jüngsten {Math.min(6, anlaesse.length)} von {anlaesse.length}</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {anlaesse.slice(0, 6).map((s) => {
              const h = nachId.get(s.retailer_id)!
              return (
                <Link
                  key={s.id}
                  href={`/kundenradar/muster/${h.slug}#${s.id}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-oelz-orange/30 bg-gradient-to-br from-oelz-orange/10 via-card to-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <Marke name={h.name} groesse="sm" />
                    <span className="text-sm font-semibold">{h.name}</span>
                    <LandCode land={h.country} />
                    {s.source_date && (
                      <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                        {format(new Date(s.source_date), 'd. MMM', { locale: de })}
                      </span>
                    )}
                  </div>
                  <p className="font-display text-[17px] font-bold leading-snug group-hover:text-primary">{s.title}</p>
                  {s.oelz_relevance && (
                    <p className="line-clamp-3 border-l-2 border-oelz-orange/60 pl-3 text-sm leading-relaxed text-foreground/80">
                      {s.oelz_relevance}
                    </p>
                  )}
                  <div className="mt-auto pt-1">
                    <TypChip typ={s.signal_type} name={SIGNALTYP_NAME[s.signal_type]} klein />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Händler */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-bold">Händler</h2>
          <div className="inline-flex rounded-full border border-border bg-card p-0.5 text-xs">
            <Link href="/kundenradar/muster" className={cn('rounded-full px-3 py-1', !nachLand ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary')}>
              nach Kette
            </Link>
            <Link href="/kundenradar/muster?sicht=land" className={cn('rounded-full px-3 py-1', nachLand ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary')}>
              nach Land
            </Link>
          </div>
        </div>

        {!nachLand ? (
          // Raster statt Zeilen: Eine Kette belegt so viel Breite, wie sie Länder hat —
          // Kaufland die ganze Reihe, Lidl und SPAR je die Hälfte, alle anderen ein Viertel.
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {kettenListe.map(({ name, liste }) => {
              const n = liste.length
              return (
                <div
                  key={name}
                  className={cn(
                    'karte flex flex-col gap-3 p-4',
                    n >= 3 && 'md:col-span-2 xl:col-span-4',
                    n === 2 && 'md:col-span-2 xl:col-span-2'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Marke name={name} />
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold leading-tight">{name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {liste[0].group_name ?? 'eigenständig'}
                        {n > 1 && ` · ${n} Länder`}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'grid flex-1 gap-2',
                      n >= 3 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
                      n === 2 && 'sm:grid-cols-2'
                    )}
                  >
                    {liste.map((h) => {
                      const eigene = vonHaendler(h.id)
                      const anlass = eigene.filter((s) => s.contact_trigger).length
                      return (
                        <Link
                          key={h.id}
                          href={`/kundenradar/muster/${h.slug}`}
                          className="group flex flex-col gap-1.5 rounded-xl border border-border/80 bg-background/60 p-3 transition-colors hover:border-oelz-orange/50 hover:bg-card"
                        >
                          <div className="flex items-center gap-2">
                            <LandCode land={h.country} />
                            <span className="text-sm font-medium">{LAND_NAME[h.country]}</span>
                            {h.customer_status !== 'kunde' && (
                              <span className={cn('ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-medium', KUNDENSTATUS_CHIP[h.customer_status])}>
                                {KUNDENSTATUS_NAME[h.customer_status]}
                              </span>
                            )}
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-foreground">
                            {eigene[0]?.title ?? 'Noch kein Signal'}
                          </p>
                          <div className="mt-auto flex items-center gap-2 pt-1 text-[11px] tabular-nums text-muted-foreground">
                            <span>{eigene.length} {eigene.length === 1 ? 'Signal' : 'Signale'}</span>
                            {anlass > 0 && (
                              <span className="inline-flex items-center gap-1 font-medium text-oelz-orange-text">
                                <span className="size-1.5 rounded-full bg-oelz-orange" />
                                {anlass} {anlass === 1 ? 'Anlass' : 'Anlässe'}
                              </span>
                            )}
                            <ArrowRight className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {LAENDER.filter((l) => laender.has(l)).map((land) => (
              <div key={land} className="karte p-4">
                <div className="mb-3 flex items-center gap-2">
                  <LandCode land={land} />
                  <h3 className="font-display text-lg font-bold">{LAND_NAME[land]}</h3>
                </div>
                <div className="divide-y divide-border/70">
                  {haendler
                    .filter((h) => h.country === land)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((h) => {
                      const eigene = vonHaendler(h.id)
                      return (
                        <Link key={h.id} href={`/kundenradar/muster/${h.slug}`} className="group flex items-center gap-3 py-2.5">
                          <Marke name={h.name} groesse="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold group-hover:text-primary">{h.name}</span>
                            <span className="block truncate text-xs text-muted-foreground">{eigene[0]?.title ?? 'Noch kein Signal'}</span>
                          </span>
                          <span className="text-xs tabular-nums text-muted-foreground">{eigene.length}</span>
                        </Link>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <NeuAusErhebung eintraege={neu} />
    </div>
  )
}

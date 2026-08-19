/**
 * Startseite — das Briefing (CONTEXT.md, ADR 0004).
 *
 * Aufbau: orange Bühne mit dem Monat, dem Intro-/Monatstext und den Neu-Zahlen;
 * rechts die Laufsäule aus dem Produkt- & Innovationsradar. Darunter die beiden
 * Listen (Wettbewerbsradar, Rohstoff-Radar), Studien, die Module und die
 * geplanten Module. Ausschliesslich Lesezugriffe; Sichtbarkeit entscheidet
 * `visibleModules()`, RLS entscheidet über die Daten.
 */

import Link from 'next/link'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import {
  ArrowRight,
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
} from 'lucide-react'
import { OelzWave } from '@/components/nav/oelz-wave'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { visibleModules } from '@/lib/modules'
import { ladeStartseitenDaten } from '@/lib/startseite/daten'
import { INTRO_TEXT, analyseText, monatstext } from '@/lib/startseite/monatstext'
import { Laufsaeule } from '@/components/startseite/laufsaeule'
import {
  ListenKopf, RestZeile, RohstoffZeile, SignalZeile, StudieZeile,
} from '@/components/startseite/briefing-listen'
import { cn } from '@/lib/utils'

/** Höchstens so viele Einträge je Modul im Briefing — der Rest bleibt im Modul. */
const MAX_JE_MODUL = 5

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
}

const monatName = (iso: string) => format(new Date(iso), 'LLLL', { locale: de })
const tag = (iso: string) => format(new Date(iso), 'd. MMMM', { locale: de })
const tagKurz = (iso: string) => format(new Date(iso), 'd. MMM', { locale: de })

export default async function StartseitePage() {
  const [profile, daten] = await Promise.all([getCurrentProfile(), ladeStartseitenDaten()])
  const isAdmin = !!profile?.is_admin

  const sichtbareModule = visibleModules(isAdmin)
  const aktive = sichtbareModule.filter((m) => m.status === 'active')
  const geplant = sichtbareModule.filter((m) => m.status === 'coming_soon')
  const sichtbar = (id: string) => aktive.some((m) => m.id === id)

  const { edition, letzteEdition, signale, impulse, rohstoffsignale, studien, saeule, stats } = daten

  // Was das Briefing zeigen darf: Modul sichtbar UND es gibt neue Einträge.
  const zeigeSignale = sichtbar('wettbewerb') && signale.length > 0
  const zeigeRohstoff = sichtbar('rohstoff') && rohstoffsignale.length > 0
  const zeigeStudien = sichtbar('studien') && studien.length > 0
  const zeigeImpulse = sichtbar('produkt') && impulse.length > 0
  const leer = !zeigeSignale && !zeigeRohstoff && !zeigeStudien && !zeigeImpulse

  const standDatum = Object.values(stats)
    .map((s) => s.stand)
    .filter((s): s is string => !!s)
    .sort()
    .at(-1)

  const aufmacher = edition ?? letzteEdition
  const bezugsmonat = leer && letzteEdition ? letzteEdition.period_month : daten.monat
  const redaktion = INTRO_TEXT ?? monatstext(bezugsmonat)
  const buehnenText = redaktion ?? analyseText(daten)

  const zahlen = [
    { id: 'wettbewerb', n: zeigeSignale ? signale.length : 0, label: 'Signale', href: '#wettbewerbsradar' },
    { id: 'produkt', n: zeigeImpulse ? impulse.length : 0, label: 'Impulse', href: '/produkt-radar' },
    { id: 'rohstoff', n: zeigeRohstoff ? rohstoffsignale.length : 0, label: 'Rohstoffe', href: '#rohstoff-radar' },
    { id: 'studien', n: zeigeStudien ? studien.length : 0, label: 'Studien', href: '#studien' },
  ].filter((z) => z.n > 0)

  // Gestaffeltes Einblenden: fortlaufender Index über die ganze Seite.
  let i = 0
  const naechste = () => ({ '--i': i++ }) as React.CSSProperties

  return (
    <div className="pb-16">
      {/* ------------------------------------------------------------- Bühne */}
      <section
        className="relative bg-oelz-orange text-oelz-on-orange [--dachzeile-farbe:var(--oelz-on-orange)]"
        aria-labelledby="buehne-titel"
      >
        <div className="grid gap-10 px-8 pt-8 pb-12 lg:grid-cols-12 lg:items-stretch lg:px-12">
          <div className={cn('flex flex-col einblenden', saeule.length > 0 ? 'lg:col-span-6' : 'lg:col-span-8')} style={naechste()}>
            <div>
              <p className="dachzeile opacity-80">Briefing{standDatum && <> · Stand {tag(standDatum)}</>}</p>
              <h1 id="buehne-titel" className="mt-3 font-display leading-[0.92] tracking-tight">
                {leer && letzteEdition ? (
                  <>
                    <span className="block text-[34px] font-light lg:text-[40px]">Nichts Neues</span>
                    <span className="block text-[72px] font-bold lg:text-[96px]">seit {monatName(letzteEdition.period_month)}</span>
                  </>
                ) : (
                  <>
                    <span className="block text-[34px] font-light lg:text-[40px]">Neu aus</span>
                    <span className="block text-[72px] font-bold lg:text-[96px]">{monatName(daten.monat)}</span>
                  </>
                )}
              </h1>
            </div>

            {/* Text und Zahlen als ein Block direkt unter dem Titel. */}
            <div className="mt-8 space-y-5">
              {buehnenText && (
                <p className={cn('max-w-xl text-[15px] leading-relaxed line-clamp-5', redaktion ? 'opacity-95' : 'opacity-80')}>
                  {buehnenText}
                </p>
              )}

              {leer ? (
                letzteEdition && (
                  <p className="text-[14px] opacity-85">
                    Seit dem {tag(letzteEdition.published_at ?? daten.monat)} ist nichts Neues veröffentlicht.
                  </p>
                )
              ) : (
                <ul className="flex flex-wrap gap-2" aria-label="Neu je Modul">
                  {zahlen.map((z) => (
                    <li key={z.id}>
                      <Link
                        href={z.href}
                        className="inline-flex items-baseline gap-1.5 rounded-full bg-card/95 pl-3 pr-3.5 py-1.5 text-foreground shadow-[0_1px_2px_rgba(34,28,26,0.08)] transition-colors duration-[var(--motion-mikro)] hover:bg-oelz-on-orange hover:text-card"
                      >
                        <span className="font-display text-[18px] font-bold leading-none tabular-nums">{z.n}</span>
                        <span className="text-[13px] font-medium">{z.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {saeule.length > 0 && sichtbar('produkt') && (
            <div className="lg:col-span-6 einblenden" style={naechste()}>
              <div className="mb-4 flex items-baseline justify-between gap-4 px-1">
                <p className="dachzeile opacity-85">
                  Produktradar · neu und zuletzt
                  {stats.produkt && (
                    <span className="ml-2 font-sans font-medium normal-case tracking-normal tabular-nums opacity-80">
                      {stats.produkt.total} Impulse
                      {stats.produkt.newCount > 0 && <> · {stats.produkt.newCount} neu</>}
                    </span>
                  )}
                </p>
                <Link href="/produkt-radar" className="text-[11px] font-semibold opacity-80 transition-opacity hover:opacity-100">
                  Alle Impulse →
                </Link>
              </div>
              <Laufsaeule impulse={saeule} sichtbar={3} />
            </div>
          )}
        </div>
      </section>
      <OelzWave className="-mt-px block h-8 w-full text-oelz-orange lg:h-10" />

      {/* ---------------------------------------------------------- Briefing */}
      <div className="space-y-14 px-8 pt-10 lg:px-12">
        {(zeigeSignale || zeigeRohstoff) && (
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2 lg:items-stretch">
            {zeigeSignale && aufmacher && (
              <section id="wettbewerbsradar" className="flex flex-col scroll-mt-24">
                <ListenKopf
                  name="Wettbewerbsradar"
                  zusatz={`Edition ${monatName(aufmacher.period_month)} · ${signale.length} neue Signale`}
                  href={`/editions/${aufmacher.id}`}
                  linkText="Zur Edition"
                  style={naechste()}
                />
                <div className="karte flex flex-1 flex-col divide-y divide-border/70 overflow-hidden einblenden" style={naechste()}>
                  {aufmacher.editorial_summary && (
                    <p className="bg-secondary/40 px-4 py-3 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
                      <span className="mr-1.5 font-display font-bold text-foreground/80">Zur Edition:</span>
                      {aufmacher.editorial_summary}
                    </p>
                  )}
                  {signale.slice(0, MAX_JE_MODUL).map((s) => (
                    <SignalZeile key={s.id} signal={s} href={`/editions/${aufmacher.id}`} />
                  ))}
                  <RestZeile n={signale.length - MAX_JE_MODUL} href={`/editions/${aufmacher.id}`} wo="in der Edition" />
                </div>
              </section>
            )}

            {zeigeRohstoff && (
              <section id="rohstoff-radar" className="flex flex-col scroll-mt-24">
                <ListenKopf
                  name="Rohstoff-Radar"
                  zusatz={`${rohstoffsignale.length} neue Rohstoffsignale`}
                  href="/rohstoff-radar"
                  linkText="Zum Rohstoff-Radar"
                  style={naechste()}
                />
                <div className="karte flex flex-1 flex-col divide-y divide-border/70 overflow-hidden einblenden" style={naechste()}>
                  {rohstoffsignale.slice(0, MAX_JE_MODUL).map((r) => (
                    <RohstoffZeile key={r.id} signal={r} />
                  ))}
                  <RestZeile n={rohstoffsignale.length - MAX_JE_MODUL} href="/rohstoff-radar" wo="im Rohstoff-Radar" />
                </div>
              </section>
            )}
          </div>
        )}

        {zeigeStudien && (
          <section id="studien" className="max-w-3xl scroll-mt-24">
            <ListenKopf
              name="Ad-hoc Studien"
              zusatz={`${studien.length} neu`}
              href="/studien"
              linkText="Alle Studien"
              style={naechste()}
            />
            <div className="karte divide-y divide-border/70 overflow-hidden einblenden" style={naechste()}>
              {studien.slice(0, MAX_JE_MODUL).map((st) => (
                <StudieZeile key={st.id} studie={st} />
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------------------------------------- Module */}
        <section aria-label="Module" className="einblenden" style={naechste()}>
          <h2 className="dachzeile mb-4">Module</h2>
          <div className="flex flex-wrap gap-3">
            {aktive.map((m) => {
              const Icon = ICONS[m.icon] ?? Target
              const s = stats[m.id]
              return (
                <Link key={m.id} href={m.href} className="karte group flex min-w-60 items-center gap-3 py-2.5 pl-3 pr-4">
                  <span className="rounded-md bg-secondary p-2 text-foreground/70 transition-colors duration-[var(--motion-mikro)] group-hover:text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-display text-[14px] font-bold leading-tight tracking-wide transition-colors duration-[var(--motion-mikro)] group-hover:text-primary">
                        {m.shortName ?? m.name}
                      </span>
                      {s && s.newCount > 0 && (
                        <span className="rounded-full bg-oelz-orange px-2 py-0.5 text-[11px] font-bold text-oelz-on-orange tabular-nums">
                          {s.newCount} neu
                        </span>
                      )}
                    </span>
                    <span className="block text-[11px] text-muted-foreground tabular-nums">
                      {s && s.total > 0 ? (
                        <>
                          {s.total} {s.total === 1 ? s.unit.one : s.unit.many}
                          {s.stand && <> · Stand {tagKurz(s.stand)}</>}
                        </>
                      ) : (
                        <>Öffnen</>
                      )}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>

          {geplant.length > 0 && (
            <p className="mt-5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/70">In Vorbereitung:</span>{' '}
              {geplant.map((m, k) => (
                <span key={m.id}>
                  {k > 0 && <span className="mx-1.5 opacity-50">·</span>}
                  {m.shortName ?? m.name}
                  {m.eta && <span className="opacity-70"> ({m.eta})</span>}
                </span>
              ))}
            </p>
          )}
        </section>

        {leer && !letzteEdition && (
          <p className="max-w-2xl text-sm text-muted-foreground">
            Es ist noch nichts veröffentlicht. Sobald die erste Edition erscheint, steht sie hier.
          </p>
        )}

        {leer && letzteEdition && (
          <p className="max-w-2xl text-sm text-muted-foreground">
            Zuletzt erschienen:{' '}
            <Link href={`/editions/${letzteEdition.id}`} className="font-semibold text-primary hover:underline">
              {letzteEdition.title}
            </Link>{' '}
            <ArrowRight className="inline size-3.5" />
          </p>
        )}
      </div>
    </div>
  )
}

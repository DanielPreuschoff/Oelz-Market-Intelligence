/**
 * MUSTER Stufe 2 — Dossier als Briefing. Wegwerf-Seite zur Abstimmung (siehe
 * ../_bausteine.tsx). Liest echte Daten; neu sind Aufbau und Aussehen.
 */
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ArrowLeft, Croissant, ExternalLink, Layers, MessageSquareQuote, Store, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { cn } from '@/lib/utils'
import {
  KUNDENSTATUS_CHIP,
  KUNDENSTATUS_NAME,
  LAENDER,
  LAND_NAME,
  SIGNALTYP_NAME,
  teileKurzprofil,
  vergleicheKundensignale,
  type Haendler,
  type Kundensignal,
} from '@/types/kundenradar'
import { KENNZAHLEN, LandCode, Marke, MusterHinweis, TYP_STIL, TypChip } from '../_bausteine'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DossierMusterPage({ params }: PageProps) {
  if (!(await isCurrentUserAdmin())) notFound()
  const { slug } = await params

  const supabase = await createClient()
  const { data: hRoh } = await supabase.from('retailers').select('*').eq('slug', slug).maybeSingle()
  if (!hRoh) notFound()
  const h = hRoh as unknown as Haendler

  const [{ data: sRoh }, { data: schwesternRoh }] = await Promise.all([
    supabase.from('retailer_signals').select('*').eq('retailer_id', h.id).eq('status', 'published'),
    supabase.from('retailers').select('id, name, slug, country').eq('name', h.name).eq('active', true).neq('id', h.id),
  ])
  const signale = ((sRoh ?? []) as unknown as Kundensignal[]).sort(vergleicheKundensignale)
  const anlaesse = signale.filter((s) => s.contact_trigger)
  const schwestern = ((schwesternRoh ?? []) as unknown as Pick<Haendler, 'id' | 'name' | 'slug' | 'country'>[]).sort(
    (a, b) => LAENDER.indexOf(a.country) - LAENDER.indexOf(b.country)
  )
  const profil = h.profile ? teileKurzprofil(h.profile) : null
  const kz = KENNZAHLEN[h.slug]

  // Zeitleiste nach Monat der Quelle
  const monate = new Map<string, Kundensignal[]>()
  for (const s of signale) {
    const key = s.source_date ? s.source_date.slice(0, 7) : 'ohne'
    monate.set(key, [...(monate.get(key) ?? []), s])
  }

  return (
    <div className="space-y-8">
      <MusterHinweis />
      <Link href="/kundenradar/muster" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Alle Händler
      </Link>

      {/* Kopf */}
      <header className="karte overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-5 p-6">
          <Marke name={h.name} groesse="lg" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <h1 className="font-display text-4xl font-bold tracking-wide text-foreground">{h.name}</h1>
            <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <LandCode land={h.country} />
              <span className="font-medium text-foreground/80">{LAND_NAME[h.country]}</span>
              {h.group_name && <span>· {h.group_name}</span>}
              <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', KUNDENSTATUS_CHIP[h.customer_status])}>
                {KUNDENSTATUS_NAME[h.customer_status]}
              </span>
            </p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p className="font-display text-2xl font-bold tabular-nums text-foreground">{signale.length}</p>
            <p>Signale seit Januar</p>
          </div>
        </div>
        {kz && (
          <dl className="grid grid-cols-2 gap-px border-t border-border bg-border lg:grid-cols-4">
            {[
              { icon: Store, label: 'Filialen', wert: kz.filialen },
              { icon: TrendingUp, label: 'Stellung', wert: kz.stellung },
              { icon: Croissant, label: 'Backen im Markt', wert: kz.backen },
              { icon: Layers, label: 'Eigenmarken Backwaren', wert: kz.eigenmarken },
            ].map(({ icon: Icon, label, wert }) => (
              <div key={label} className="bg-card px-5 py-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <Icon className="size-3.5 text-oelz-orange" /> {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-snug">{wert}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Hauptspalte */}
        <div className="space-y-8">
          {anlaesse.length > 0 && (
            <section className="rounded-2xl border border-oelz-orange/35 bg-gradient-to-br from-oelz-orange/12 via-card to-card p-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
                <MessageSquareQuote className="size-5 text-oelz-orange" />
                Gesprächsaufhänger
              </h2>
              <ol className="space-y-4">
                {anlaesse.slice(0, 3).map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-oelz-orange text-xs font-bold text-oelz-on-orange">
                      {i + 1}
                    </span>
                    <div className="space-y-1">
                      <a href={`#${s.id}`} className="font-display text-[15px] font-bold leading-snug hover:text-primary">
                        {s.title}
                      </a>
                      <p className="text-sm leading-relaxed text-foreground/80">{s.oelz_relevance}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="space-y-6">
            <h2 className="font-display text-lg font-bold">Zeitleiste</h2>
            {[...monate.entries()].map(([monat, liste]) => (
              <div key={monat} className="relative space-y-3 border-l-2 border-border pl-6">
                <h3 className="-ml-[33px] flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="size-4 rounded-full border-2 border-border bg-background" />
                  {monat === 'ohne' ? 'ohne Datum' : format(new Date(`${monat}-01`), 'MMMM yyyy', { locale: de })}
                </h3>
                {liste.map((s) => (
                  <article
                    key={s.id}
                    id={s.id}
                    className={cn(
                      'scroll-mt-24 rounded-xl border border-border/80 bg-card p-5 target:ring-2 target:ring-oelz-orange/50',
                      s.contact_trigger && 'border-l-4 border-l-oelz-orange'
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <TypChip typ={s.signal_type} name={SIGNALTYP_NAME[s.signal_type]} />
                      {s.contact_trigger && (
                        <span className="rounded-full bg-oelz-orange px-2 py-0.5 text-[11px] font-bold text-oelz-on-orange">Anlass</span>
                      )}
                      {s.source_date && (
                        <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                          {format(new Date(s.source_date), 'd. MMM yyyy', { locale: de })}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-3 font-display text-lg font-bold leading-snug">{s.title}</h4>
                    {s.teaser && <p className="mt-1 text-sm text-muted-foreground">{s.teaser}</p>}
                    {s.oelz_relevance && (
                      <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3">
                        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-oelz-orange-text">Für Ölz</p>
                        <p className="text-sm leading-relaxed">{s.oelz_relevance}</p>
                      </div>
                    )}
                    <details className="group/sv mt-3">
                      <summary className="flex cursor-pointer list-none items-center gap-3 text-xs font-medium text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                        <span className="group-open/sv:hidden">Sachverhalt lesen</span>
                        <span className="hidden group-open/sv:inline">Sachverhalt zuklappen</span>
                        {s.source_url && (
                          <a href={s.source_url} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 hover:text-oelz-orange-text">
                            {s.source_name ?? 'Quelle'} <ExternalLink className="size-3" />
                          </a>
                        )}
                      </summary>
                      {s.situation && <p className="mt-2 text-sm leading-relaxed">{s.situation}</p>}
                    </details>
                  </article>
                ))}
              </div>
            ))}
          </section>
        </div>

        {/* Seitenspalte */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="karte p-5">
            <h2 className="dachzeile mb-2">
              Kurzprofil
              {h.profile_updated_at && (
                <span className="font-normal normal-case tracking-normal text-muted-foreground">
                  {' '}· Stand {format(new Date(h.profile_updated_at), 'd. MMM yyyy', { locale: de })}
                </span>
              )}
            </h2>
            {profil ? (
              <>
                <p className="text-sm leading-relaxed">{profil.text}</p>
                {profil.quellen.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/70 pt-3">
                    {profil.quellen.map((q) => (
                      <a key={q.url} href={q.url} target="_blank" rel="noopener noreferrer" title={q.url} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-oelz-orange-text">
                        {q.name} <ExternalLink className="size-3" />
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Noch kein Kurzprofil.</p>
            )}
          </section>

          {schwestern.length > 0 && (
            <section className="karte p-5">
              <h2 className="dachzeile mb-3">{h.name} in anderen Ländern</h2>
              <div className="space-y-1">
                {schwestern.map((x) => (
                  <Link key={x.id} href={`/kundenradar/muster/${x.slug}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary">
                    <LandCode land={x.country} />
                    {LAND_NAME[x.country]}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="karte p-5">
            <h2 className="dachzeile mb-3">Signaltypen</h2>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(TYP_STIL).map(([typ]) => {
                const n = signale.filter((s) => s.signal_type === typ).length
                if (!n) return null
                return (
                  <span key={typ} className="inline-flex items-center gap-1">
                    <TypChip typ={typ as Kundensignal['signal_type']} name={`${SIGNALTYP_NAME[typ as Kundensignal['signal_type']]} · ${n}`} klein />
                  </span>
                )
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

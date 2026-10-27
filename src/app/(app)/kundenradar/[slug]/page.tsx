import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { cn } from '@/lib/utils'
import { KundensignalKarte } from '@/components/kundenradar/kundensignal-karte'
import { TypFilter } from '@/components/kundenradar/typ-filter'
import {
  KUNDENSTATUS_CHIP,
  KUNDENSTATUS_NAME,
  LAND_NAME,
  SIGNALTYPEN,
  vergleicheKundensignale,
  type Haendler,
  type Kundensignal,
  type Signaltyp,
} from '@/types/kundenradar'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ typ?: string }>
}

/**
 * Das Dossier eines Händlers: Kurzprofil, darunter alles Veröffentlichte über
 * die Zeit. Die Seite für „vor dem Kundenbesuch einlesen" — Simon Greiner,
 * 27.10.2026: „Kaufland Slowakei, da lese ich mich ein."
 *
 * Schmal gesetzt, obwohl /kundenradar in BREITE_ROUTEN steht: Die Übersicht
 * braucht Breite für die Kacheln, das Dossier ist Lesetext.
 */
export default async function DossierPage({ params, searchParams }: PageProps) {
  if (!(await isCurrentUserAdmin())) notFound()
  const [{ slug }, { typ: typRoh }] = await Promise.all([params, searchParams])
  // Ein unbekannter Typ wäre kein Fehler, nur eine leere Liste — stumm ignorieren.
  const typ = (SIGNALTYPEN as readonly string[]).includes(typRoh ?? '') ? (typRoh as Signaltyp) : undefined

  const supabase = await createClient()
  const { data: haendlerRoh } = await supabase.from('retailers').select('*').eq('slug', slug).maybeSingle()
  if (!haendlerRoh) notFound()
  const h = haendlerRoh as unknown as Haendler
  if (!h.active) notFound()

  const { data: signaleRoh } = await supabase
    .from('retailer_signals')
    .select('*')
    .eq('retailer_id', h.id)
    .eq('status', 'published')
  const alle = ((signaleRoh ?? []) as unknown as Kundensignal[]).sort(vergleicheKundensignale)
  const gezeigt = typ ? alle.filter((s) => s.signal_type === typ) : alle
  const vorhanden = new Set(alle.map((s) => s.signal_type))

  const href = (t?: Signaltyp) => `/kundenradar/${h.slug}${t ? `?typ=${t}` : ''}`

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        href="/kundenradar"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Alle Händler
      </Link>

      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">{h.name}</h1>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>{LAND_NAME[h.country]}</span>
          {h.group_name && <span>· {h.group_name}</span>}
          <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', KUNDENSTATUS_CHIP[h.customer_status])}>
            {KUNDENSTATUS_NAME[h.customer_status]}
          </span>
        </p>
      </div>

      <section className="karte p-5">
        <h2 className="dachzeile mb-2">
          Kurzprofil
          {h.profile_updated_at && (
            <span className="font-normal normal-case tracking-normal text-muted-foreground">
              {' '}· Stand {format(new Date(h.profile_updated_at), 'd. MMM yyyy', { locale: de })}
            </span>
          )}
        </h2>
        {h.profile ? (
          <p className="whitespace-pre-line text-sm leading-relaxed">{h.profile}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Noch kein Kurzprofil — es kommt mit dem Erstlauf oder lässt sich im Admin pflegen.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="dachzeile">
            Kundensignale{' '}
            <span className="font-normal normal-case tracking-normal text-muted-foreground">· {alle.length}</span>
          </h2>
        </div>
        <TypFilter vorhanden={vorhanden} aktiv={typ} href={href} />

        {gezeigt.length === 0 ? (
          <div className="rounded-xl border border-border bg-card px-5 py-8 text-center text-sm text-muted-foreground">
            {alle.length === 0
              ? 'Noch kein Kundensignal veröffentlicht.'
              : 'Kein Signal dieses Typs.'}
          </div>
        ) : (
          <div className="space-y-4">
            {gezeigt.map((s) => (
              <KundensignalKarte key={s.id} s={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

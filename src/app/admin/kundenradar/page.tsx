import Link from 'next/link'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button-variants'
import { DeleteButton } from '@/components/admin/delete-button'
import { AlleVeroeffentlichenButton } from '@/components/admin/alle-veroeffentlichen-button'
import { cn } from '@/lib/utils'
import {
  loescheHaendler,
  loescheKundensignal,
  veroeffentlicheFertigeKundensignale,
} from './actions'
import {
  KUNDENSTATUS_CHIP,
  KUNDENSTATUS_NAME,
  LAND_NAME,
  SIGNALTYP_NAME,
  haendlerKurzname,
  missingForPublish,
  vergleicheHaendler,
  vergleicheKundensignale,
  type Haendler,
  type Kundensignal,
} from '@/types/kundenradar'

/**
 * Admin des Kundenradars: Händler oben (wenige, selten geändert), Signale
 * darunter (viele, Entwürfe zuerst — die brauchen Arbeit).
 */
export default async function AdminKundenradarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const [{ data: haendlerRoh, error: haendlerFehler }, { data: signaleRoh }] = await Promise.all([
    supabase.from('retailers').select('*'),
    supabase
      .from('retailer_signals')
      .select('*, retailer:retailers(id, name, slug, country)')
      .order('created_at', { ascending: false }),
  ])

  const haendler = ((haendlerRoh ?? []) as unknown as Haendler[]).sort(vergleicheHaendler)
  const signale = ((signaleRoh ?? []) as unknown as Kundensignal[]).sort(
    (a, b) =>
      Number(a.status === 'published') - Number(b.status === 'published') ||
      vergleicheKundensignale(a, b)
  )
  const entwuerfe = signale.filter((s) => s.status === 'draft')
  const bereit = entwuerfe.filter((s) => missingForPublish(s).length === 0).length

  const zaehle = (id: string) => {
    const eigene = signale.filter((s) => s.retailer_id === id)
    return { alle: eigene.length, entwuerfe: eigene.filter((s) => s.status === 'draft').length }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Kundenradar</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Entscheidungen der Zentrale je Händler und Land — Flughöhe Lebensmittel Zeitung. Die
            Läufe je Land kommen über den Import, Einzelfunde über das Formular.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <AlleVeroeffentlichenButton
            bereit={bereit}
            unvollstaendig={entwuerfe.length - bereit}
            onPublish={veroeffentlicheFertigeKundensignale}
            einheit={{ eins: 'Kundensignal', viele: 'Kundensignale' }}
            huerde="Veröffentlicht werden nur Entwürfe mit Titel, Kurzzeile, Sachverhalt, Für-Ölz-Satz, Quelle und Datum — bitte vorher die Quelle aufgerufen."
            ziel="Veröffentlichte Signale erscheinen sofort im Kundenradar und auf der Startseite."
          />
          <Link href="/admin/kundenradar/import" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
            Importieren
          </Link>
          <Link href="/admin/kundenradar/haendler/neu" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
            Neuer Händler
          </Link>
          <Link href="/admin/kundenradar/signale/neu" className={cn(buttonVariants({ size: 'sm' }))}>
            Neues Signal
          </Link>
        </div>
      </div>

      {haendlerFehler ? (
        <div className="rounded-xl border-2 border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          <p className="font-medium">Die Tabellen fehlen noch</p>
          <p className="mt-1 text-xs">Migration 019 im Supabase-SQL-Editor einspielen.</p>
        </div>
      ) : (
        <>
          {/* ------------------------------------------------------ Händler */}
          <section className="space-y-2">
            <h2 className="dachzeile text-muted-foreground">
              Händler <span className="font-normal normal-case tracking-normal">· {haendler.length}</span>
            </h2>
            {haendler.map((h) => {
              const n = zaehle(h.id)
              return (
                <div key={h.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{haendlerKurzname(h)}</span>
                      <span className="text-xs text-muted-foreground">{LAND_NAME[h.country]}</span>
                      <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', KUNDENSTATUS_CHIP[h.customer_status])}>
                        {KUNDENSTATUS_NAME[h.customer_status]}
                      </span>
                      {h.group_name && <span className="text-xs text-muted-foreground">{h.group_name}</span>}
                      {!h.active && (
                        <span className="rounded bg-secondary px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          inaktiv
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-mono">/{h.slug}</span>
                      {' · '}
                      {n.alle} {n.alle === 1 ? 'Signal' : 'Signale'}
                      {n.entwuerfe > 0 && ` (${n.entwuerfe} ${n.entwuerfe === 1 ? 'Entwurf' : 'Entwürfe'})`}
                      {' · '}
                      {h.profile_updated_at
                        ? `Kurzprofil: Stand ${format(new Date(h.profile_updated_at), 'd. MMM yyyy', { locale: de })}`
                        : <span className="text-amber-700">Kurzprofil fehlt</span>}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      href={`/admin/kundenradar/signale/neu?haendler=${h.id}`}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
                    >
                      Neues Signal
                    </Link>
                    <Link
                      href={`/admin/kundenradar/haendler/${h.id}/edit`}
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                    >
                      Bearbeiten
                    </Link>
                    <DeleteButton
                      label={`Händler ${haendlerKurzname(h)}${n.alle > 0 ? ` samt ${n.alle} ${n.alle === 1 ? 'Signal' : 'Signalen'}` : ''}`}
                      onDelete={async () => {
                        'use server'
                        await loescheHaendler(h.id)
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </section>

          {/* ------------------------------------------------------ Signale */}
          <section className="space-y-2">
            <h2 className="dachzeile text-muted-foreground">
              Kundensignale{' '}
              <span className="font-normal normal-case tracking-normal">
                · {signale.length}{entwuerfe.length > 0 && `, davon ${entwuerfe.length} Entwürfe`}
              </span>
            </h2>
            {signale.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-border py-10 text-center text-sm text-muted-foreground">
                <p className="font-medium">Noch kein Kundensignal erfasst</p>
                <p className="mt-1 text-xs">Den Erstlauf über „Importieren“ einspielen (prompts/kundenradar.md).</p>
              </div>
            ) : (
              signale.map((s) => {
                const fehlt = s.status === 'draft' ? missingForPublish(s) : []
                return (
                  <div key={s.id} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          {s.retailer ? haendlerKurzname(s.retailer) : '(ohne Händler)'}
                        </span>
                        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {SIGNALTYP_NAME[s.signal_type]}
                        </span>
                        {s.status === 'draft' && (
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-800">
                            Entwurf
                          </span>
                        )}
                        {s.contact_trigger && (
                          <span className="rounded-full bg-oelz-orange px-2 py-0.5 text-[11px] font-bold text-oelz-on-orange">
                            Anlass
                          </span>
                        )}
                        {s.source_date && (
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {format(new Date(s.source_date), 'd. MMM yyyy', { locale: de })}
                          </span>
                        )}
                      </div>
                      <p className="font-medium leading-snug">{s.title}</p>
                      {s.teaser && <p className="line-clamp-2 text-sm text-muted-foreground">{s.teaser}</p>}
                      {fehlt.length > 0 && (
                        <p className="text-xs text-amber-700">Zum Veröffentlichen fehlt: {fehlt.join(', ')}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Link
                        href={`/admin/kundenradar/signale/${s.id}/edit`}
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                      >
                        Bearbeiten
                      </Link>
                      <DeleteButton
                        label={`Kundensignal „${s.title}"`}
                        onDelete={async () => {
                          'use server'
                          await loescheKundensignal(s.id)
                        }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </section>
        </>
      )}
    </div>
  )
}

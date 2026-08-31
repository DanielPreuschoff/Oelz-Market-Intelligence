import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button-variants'
import { DeleteButton } from '@/components/admin/delete-button'
import { ZustandsButton } from '@/components/admin/zustands-button'
import { cn } from '@/lib/utils'
import { loescheRisikosignal, raeumeAus, nimmWiederAuf } from './actions'
import {
  STUFE_NAME,
  STUFE_CHIP,
  STUFE_RANG,
  GELTUNGSBEREICH_NAME,
  missingForPublish,
  type Risikosignal,
  type Geltungsbereich,
} from '@/types/substance-watch'

export default async function AdminUnterBeobachtungPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data } = await supabase
    .from('substance_watch')
    .select('*')
    .order('created_at', { ascending: false })

  const signale = (data ?? []) as unknown as Risikosignal[]

  // Reihenfolge wie im Reiter: das Verbindlichste zuerst, Ausgeräumtes zuletzt.
  const aktiv = signale
    .filter((s) => s.status !== 'ausgeraeumt')
    .sort(
      (a, b) =>
        Number(a.status === 'published') - Number(b.status === 'published') ||
        STUFE_RANG[a.stage] - STUFE_RANG[b.stage] ||
        a.substance.localeCompare(b.substance, 'de')
    )
  const erledigt = signale.filter((s) => s.status === 'ausgeraeumt')

  function Zeile({ s }: { s: Risikosignal }) {
    const fehlt = s.status === 'draft' ? missingForPublish(s) : []
    return (
      <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{s.substance}</span>
            {s.e_number && (
              <span className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                {s.e_number}
              </span>
            )}
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-medium',
                STUFE_CHIP[s.stage]
              )}
            >
              {STUFE_NAME[s.stage]}
            </span>
            <span className="text-xs text-muted-foreground">
              {GELTUNGSBEREICH_NAME[s.scope as Geltungsbereich] ?? s.scope}
            </span>
            {s.status === 'draft' && (
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-medium text-amber-800">
                Entwurf
              </span>
            )}
            {s.status === 'ausgeraeumt' && (
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                ausgeräumt
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{s.situation}</p>
          {fehlt.length > 0 && (
            <p className="text-xs text-amber-700">Zum Veröffentlichen fehlt: {fehlt.join(', ')}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Link
            href={`/admin/unter-beobachtung/${s.id}/edit`}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Bearbeiten
          </Link>
          {s.status === 'ausgeraeumt' ? (
            <ZustandsButton
              label="Wieder aufnehmen"
              onAction={async () => {
                'use server'
                await nimmWiederAuf(s.id)
              }}
            />
          ) : (
            s.status === 'published' && (
              <ZustandsButton
                label="Ausräumen"
                bestaetigung={`„${s.substance}" ausräumen? Der Eintrag verschwindet aus der aktiven Ansicht, bleibt aber erhalten.`}
                onAction={async () => {
                  'use server'
                  await raeumeAus(s.id)
                }}
              />
            )
          )}
          <DeleteButton
            label={s.substance}
            onDelete={async () => {
              'use server'
              await loescheRisikosignal(s.id)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Unter Beobachtung</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Stoffe unter regulatorischem oder öffentlichem Druck. Erscheint eine Behördenmeldung,
            gehört sie hier hinein — der Monatslauf findet systematisch, dieser Weg sofort.
          </p>
        </div>
        <Link
          href="/admin/unter-beobachtung/neu"
          className={cn(buttonVariants({ size: 'sm' }), 'shrink-0')}
        >
          Neues Risikosignal
        </Link>
      </div>

      {signale.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          <p className="font-medium">Noch kein Risikosignal erfasst</p>
          <p className="mt-1 text-xs">
            Fehlt die Tabelle noch, ist Migration 013 einzuspielen.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {aktiv.map((s) => (
              <Zeile key={s.id} s={s} />
            ))}
          </div>

          {erledigt.length > 0 && (
            <section className="space-y-2 pt-2">
              <h2 className="dachzeile text-muted-foreground">
                Ausgeräumt{' '}
                <span className="font-normal normal-case tracking-normal">
                  · zur Nachvollziehbarkeit erhalten
                </span>
              </h2>
              {erledigt.map((s) => (
                <Zeile key={s.id} s={s} />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  )
}

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button-variants'
import { DeleteButton } from '@/components/admin/delete-button'
import { ZustandsButton } from '@/components/admin/zustands-button'
import { AlleVeroeffentlichenButton } from '@/components/admin/alle-veroeffentlichen-button'
import { cn } from '@/lib/utils'
import { loescheRisikosignal, raeumeAus, nimmWiederAuf, veroeffentlicheFertigeRisikosignale } from './actions'
import {
  STUFE_NAME,
  STUFE_CHIP,
  GELTUNGSBEREICH_NAME,
  EINTRAGSTYP_NAME,
  vergleicheEintraege,
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

  // Entwuerfe zuerst (die brauchen Arbeit), dann wie im Regulatorik-Radar:
  // Risiken nach Stufe, alles andere nach Quellendatum; Ausgeraeumtes zuletzt.
  const aktiv = signale
    .filter((s) => s.status !== 'ausgeraeumt')
    .sort(
      (a, b) =>
        Number(a.status === 'published') - Number(b.status === 'published') ||
        a.kind.localeCompare(b.kind) ||
        vergleicheEintraege(a, b)
    )
  const erledigt = signale.filter((s) => s.status === 'ausgeraeumt').sort(vergleicheEintraege)
  const entwuerfe = signale.filter((s) => s.status === 'draft')
  const bereit = entwuerfe.filter((s) => missingForPublish(s).length === 0).length

  function Zeile({ s }: { s: Risikosignal }) {
    const fehlt = s.status === 'draft' ? missingForPublish(s) : []
    return (
      <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{s.substance || s.teaser || '(ohne Stoff)'}</span>
            {s.e_number && (
              <span className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                {s.e_number}
              </span>
            )}
            {s.kind === 'risiko' && s.stage ? (
              <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', STUFE_CHIP[s.stage])}>
                {STUFE_NAME[s.stage]}
              </span>
            ) : (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {EINTRAGSTYP_NAME[s.kind]}
              </span>
            )}
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
          {/* Mit Kurzzeile (seit Migration 015) steht sie hier, sonst der Sachverhalt. */}
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {s.substance ? (s.teaser?.trim() || s.situation) : s.situation}
          </p>
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
                bestaetigung={`„${s.substance || s.teaser}" ausräumen? Der Eintrag verschwindet aus der aktiven Ansicht, bleibt aber erhalten.`}
                onAction={async () => {
                  'use server'
                  await raeumeAus(s.id)
                }}
              />
            )
          )}
          <DeleteButton
            label={s.substance || s.teaser || 'Eintrag'}
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Regulatorik-Radar</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Zulassungen, Stoffe unter Druck und indirekt relevante Rechtsakte. Der Behörden-Lauf
            findet systematisch (Import), das Formular sofort — eine BfR-Warnung zählt am Tag, an
            dem sie erscheint.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <AlleVeroeffentlichenButton
            bereit={bereit}
            unvollstaendig={entwuerfe.length - bereit}
            onPublish={veroeffentlicheFertigeRisikosignale}
            einheit={{ eins: 'Eintrag', viele: 'Einträge' }}
            huerde="Veröffentlicht werden nur Entwürfe, denen zu ihrem Typ nichts mehr fehlt — bitte vorher gegen die Primärquelle geprüft."
            ziel="Veröffentlichte Einträge erscheinen sofort im Regulatorik-Radar."
          />
          <Link
            href="/admin/unter-beobachtung/import"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Importieren
          </Link>
          <Link href="/admin/unter-beobachtung/neu" className={cn(buttonVariants({ size: 'sm' }))}>
            Neuer Eintrag
          </Link>
        </div>
      </div>

      {signale.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          <p className="font-medium">Noch kein Eintrag erfasst</p>
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
                Ausgeräumt oder abgeschlossen{' '}
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

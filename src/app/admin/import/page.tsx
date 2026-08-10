import Link from 'next/link'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/server'
import { ImportForm } from '@/components/admin/import-form'

/** Abdeckung: welche Wettbewerber tauchten in den letzten Importen auf? */
const COVERAGE_WINDOW_DAYS = 45

export default async function ImportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const since = new Date(Date.now() - COVERAGE_WINDOW_DAYS * 86_400_000).toISOString()

  const [{ data: runs }, { data: competitors }, { data: recentRuns }] = await Promise.all([
    supabase.from('research_runs').select('*').order('created_at', { ascending: false }).limit(12),
    supabase.from('competitors').select('id, short_name, watch_priority').eq('active', true),
    supabase.from('research_runs').select('competitors_searched').gte('created_at', since),
  ])

  const coveredIds = new Set<string>(
    (recentRuns ?? []).flatMap((r) => (r.competitors_searched ?? []) as string[])
  )
  const active = (competitors ?? []) as { id: string; short_name: string; watch_priority: string }[]
  const missing = active.filter((c) => !coveredIds.has(c.id))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Signal-Import</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Deep-Research-Berichte werden ausserhalb der App erstellt und hier als JSON eingespielt.
          Der Prompt dafür liegt in <code className="text-xs">prompts/wettbewerber-deep-research.md</code>.
        </p>
      </div>

      <ImportForm />

      {/* Abdeckung — bei wechselnder Auswahl die einzige Stelle, die zeigt,
          wer zuletzt durchs Raster gefallen ist. */}
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Abdeckung letzte {COVERAGE_WINDOW_DAYS} Tage
        </h2>
        <p className="text-sm">
          {active.length - missing.length} von {active.length} aktiven Wettbewerbern importiert.
        </p>
        {missing.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {missing.map((c) => (
              <span
                key={c.id}
                className={`text-xs px-2 py-0.5 rounded-full border ${
                  c.watch_priority === 'high'
                    ? 'border-amber-300 bg-amber-50 text-amber-900'
                    : 'border-border text-muted-foreground'
                }`}
                title={c.watch_priority === 'high' ? 'Intensiv beobachtet' : undefined}
              >
                {c.short_name}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Bisherige Läufe
        </h2>
        {!runs?.length ? (
          <p className="text-sm text-muted-foreground">Noch nichts importiert.</p>
        ) : (
          <div className="divide-y border rounded-xl bg-card overflow-hidden">
            {runs.map((run) => (
              <Link
                key={run.id}
                href={`/admin/import/${run.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">
                    {run.label ?? format(new Date(run.created_at), 'd. MMMM yyyy', { locale: de })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {run.candidates_found ?? 0} Kandidaten
                    {' · '}
                    {(run.competitors_searched ?? []).length} Wettbewerber
                    {' · '}
                    {format(new Date(run.created_at), 'd. MMM yyyy', { locale: de })}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Durchsehen →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

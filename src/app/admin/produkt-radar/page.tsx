import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button-variants'
import { DeleteButton } from '@/components/admin/delete-button'
import { cn } from '@/lib/utils'
import { deleteImpulse } from './actions'
import type { InnovationImpulse } from '@/types/innovation'

export default async function AdminProduktRadarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data: impulses } = await supabase
    .from('innovation_impulses')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produkt- & Innovationsradar</h1>
        <div className="flex items-center gap-2">
          {/* Der Import ist der Regelweg (Monatslauf), das Einzelformular der
              Ausnahmefall — deshalb steht er vorn und trägt die Hauptfarbe. */}
          <Link href="/admin/produkt-radar/import" className={cn(buttonVariants({ size: 'sm' }))}>
            Impulse importieren
          </Link>
          <Link
            href="/admin/produkt-radar/new"
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            Einzeln hinzufügen
          </Link>
        </div>
      </div>

      {!impulses?.length ? (
        <div className="py-16 text-center text-muted-foreground text-sm">Noch keine Impulse angelegt.</div>
      ) : (
        <div className="divide-y border rounded-xl bg-card overflow-hidden">
          {(impulses as InnovationImpulse[]).map((impulse) => (
            <div key={impulse.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors">
              <div className="space-y-0.5 flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{impulse.title}</p>
                <p className="text-xs text-muted-foreground">
                  {impulse.status === 'published'
                    ? <span className="text-emerald-600 font-medium">Veröffentlicht</span>
                    : <span className="text-amber-600 font-medium">Entwurf</span>}
                  {' · '}{impulse.radar_type}
                  {impulse.tags.length > 0 && ` · ${impulse.tags.slice(0, 2).join(', ')}`}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link href={`/admin/produkt-radar/${impulse.id}/edit`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
                  Bearbeiten
                </Link>
                <DeleteButton label="Impuls löschen" onDelete={deleteImpulse.bind(null, impulse.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button-variants'
import { DeleteButton } from '@/components/admin/delete-button'
import { cn } from '@/lib/utils'
import { deleteIngredientSignal } from './actions'
import { missingForPublish, type IngredientSignal } from '@/types/ingredient-signals'

export default async function AdminRohstoffRadarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data } = await supabase
    .from('ingredient_signals')
    .select('*')
    .order('created_at', { ascending: false })

  const signals = (data ?? []) as IngredientSignal[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Rohstoff-Radar</h1>
        <div className="flex items-center gap-2">
          <Link href="/admin/rohstoff-radar/import" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
            Importieren
          </Link>
          <Link href="/admin/rohstoff-radar/new" className={cn(buttonVariants({ size: 'sm' }))}>
            Rohstoffsignal hinzufügen
          </Link>
        </div>
      </div>

      {signals.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground text-sm">
          Noch keine Rohstoffsignale angelegt.
        </div>
      ) : (
        <div className="divide-y border rounded-xl bg-card overflow-hidden">
          {signals.map((signal) => {
            const missing = missingForPublish(signal)
            return (
              <div key={signal.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{signal.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {signal.status === 'published'
                      ? <span className="text-emerald-600 font-medium">Veröffentlicht</span>
                      : <span className="text-amber-600 font-medium">Entwurf</span>}
                    {' · '}{signal.subject_type}
                    {signal.functions.length > 0 && ` · ${signal.functions.slice(0, 2).join(', ')}`}
                    {signal.status === 'draft' && missing.length > 0 && (
                      <span className="text-muted-foreground/80">
                        {' · '}{missing.length} {missing.length === 1 ? 'Angabe fehlt' : 'Angaben fehlen'} zum Veröffentlichen
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/admin/rohstoff-radar/${signal.id}/edit`}
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  >
                    Bearbeiten
                  </Link>
                  <DeleteButton
                    label="Rohstoffsignal löschen"
                    onDelete={deleteIngredientSignal.bind(null, signal.id)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

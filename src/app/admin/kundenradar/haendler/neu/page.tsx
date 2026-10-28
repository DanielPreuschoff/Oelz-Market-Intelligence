import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { HaendlerForm } from '@/components/admin/haendler-form'
import { speichereHaendler } from '../../actions'

export default async function NeuerHaendlerPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Neuer Händler</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Eine Handelskette in einem Land. Kaufland Slowakei und Kaufland Deutschland sind zwei
          Händler desselben Konzerns.
        </p>
      </div>
      <HaendlerForm onSpeichern={speichereHaendler} />
    </div>
  )
}

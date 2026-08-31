import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RisikosignalForm } from '@/components/admin/risikosignal-form'
import { speichereRisikosignal } from '../actions'

export default async function NeuesRisikosignalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Neues Risikosignal</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Ein Stoff, der unter regulatorischem oder öffentlichem Druck steht. Beschaffungsrisiko
          gehört nicht hierher — Verknappung und Preis sind ein anderes Thema.
        </p>
      </div>
      <RisikosignalForm onSpeichern={speichereRisikosignal} />
    </div>
  )
}

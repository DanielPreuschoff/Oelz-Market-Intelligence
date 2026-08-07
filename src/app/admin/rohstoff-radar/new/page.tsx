import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IngredientSignalForm } from '@/components/admin/ingredient-signal-form'

export default async function NewIngredientSignalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Rohstoffsignal hinzufügen</h1>
      <IngredientSignalForm />
    </div>
  )
}

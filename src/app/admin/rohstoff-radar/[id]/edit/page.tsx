import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IngredientSignalForm } from '@/components/admin/ingredient-signal-form'

export default async function EditIngredientSignalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data: signal } = await supabase
    .from('ingredient_signals').select('*').eq('id', id).single()
  if (!signal) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Rohstoffsignal bearbeiten</h1>
      <IngredientSignalForm initialValues={signal} signalId={id} />
    </div>
  )
}

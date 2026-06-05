import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { ImpulseForm } from '@/components/admin/impulse-form'

export default async function EditImpulsePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data: impulse } = await supabase.from('innovation_impulses').select('*').eq('id', id).single()
  if (!impulse) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Impuls bearbeiten</h1>
      <ImpulseForm initialValues={impulse} impulseId={id} />
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { StudyForm } from '@/components/admin/study-form'

export default async function EditStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data: study } = await supabase.from('studies').select('*').eq('id', id).single()
  if (!study) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Studie bearbeiten</h1>
      <StudyForm initialValues={study} studyId={id} />
    </div>
  )
}

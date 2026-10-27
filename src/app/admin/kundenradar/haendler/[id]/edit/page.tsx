import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { HaendlerForm } from '@/components/admin/haendler-form'
import { speichereHaendler } from '../../../actions'
import { haendlerLangname, type Haendler } from '@/types/kundenradar'

export default async function HaendlerBearbeitenPage({
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

  const { data } = await supabase.from('retailers').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  const haendler = data as unknown as Haendler

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{haendlerLangname(haendler)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Händler bearbeiten. Das Kurzprofil ist der Teil, der am häufigsten nachgezogen wird.
        </p>
      </div>
      <HaendlerForm haendler={haendler} onSpeichern={speichereHaendler} />
    </div>
  )
}

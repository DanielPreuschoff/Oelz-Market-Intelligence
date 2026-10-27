import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { KundensignalForm } from '@/components/admin/kundensignal-form'
import { speichereKundensignal } from '../../../actions'
import { vergleicheHaendler, type Haendler, type Kundensignal } from '@/types/kundenradar'

export default async function KundensignalBearbeitenPage({
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

  const [{ data }, { data: haendlerRoh }] = await Promise.all([
    supabase.from('retailer_signals').select('*').eq('id', id).maybeSingle(),
    supabase.from('retailers').select('*'),
  ])
  if (!data) notFound()
  const signal = data as unknown as Kundensignal
  const haendler = ((haendlerRoh ?? []) as unknown as Haendler[]).sort(vergleicheHaendler)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{signal.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kundensignal bearbeiten. Vor dem Veröffentlichen die Quelle einmal aufrufen.
        </p>
      </div>
      <KundensignalForm signal={signal} haendler={haendler} onSpeichern={speichereKundensignal} />
    </div>
  )
}

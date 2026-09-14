import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RisikosignalForm } from '@/components/admin/risikosignal-form'
import { speichereRisikosignal } from '../../actions'
import type { Risikosignal } from '@/types/substance-watch'

export default async function RisikosignalBearbeitenPage({
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

  const { data } = await supabase.from('substance_watch').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  const signal = data as unknown as Risikosignal

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{signal.substance || signal.teaser}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Eintrag bearbeiten. Bei Risiken ist eine Stufe höher der häufigste Fall — etwa wenn ein
          Entwurf im Amtsblatt erscheint.
        </p>
      </div>
      <RisikosignalForm signal={signal} onSpeichern={speichereRisikosignal} />
    </div>
  )
}

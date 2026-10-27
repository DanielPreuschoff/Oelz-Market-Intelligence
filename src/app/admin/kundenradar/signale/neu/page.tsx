import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { KundensignalForm } from '@/components/admin/kundensignal-form'
import { speichereKundensignal } from '../../actions'
import { vergleicheHaendler, type Haendler } from '@/types/kundenradar'

export default async function NeuesKundensignalPage({
  searchParams,
}: {
  searchParams: Promise<{ haendler?: string }>
}) {
  const { haendler: vorauswahl } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/')

  const { data } = await supabase.from('retailers').select('*')
  const haendler = ((data ?? []) as unknown as Haendler[]).sort(vergleicheHaendler)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Neues Kundensignal</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Eine Entscheidung der Zentrale, groß genug für die Lebensmittel Zeitung. Einzelne
          Listungen, Preise, Filialen und Personalien gehören nicht hierher.
        </p>
      </div>
      <KundensignalForm haendler={haendler} vorauswahl={vorauswahl} onSpeichern={speichereKundensignal} />
    </div>
  )
}

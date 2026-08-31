import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Einen erledigten Kandidaten zurück auf „offen" setzen.
 *
 * Gegenstück zu reject und approve: Verwerfen ist ein Statuswechsel, kein
 * Löschen — ohne diesen Weg brauchte ein Fehlklick einen Griff in die
 * Datenbank. Bewusst nur für `rejected`: ein bestätigter Kandidat hat bereits
 * ein Signal erzeugt, das Zurücknehmen müsste dieses Signal mit entfernen und
 * ist damit eine andere, riskantere Operation.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { error } = await supabase
    .from('signal_candidates')
    .update({ status: 'pending', reviewed_by: null, reviewed_at: null })
    .eq('id', id)
    .eq('status', 'rejected')

  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 })

  return NextResponse.json({ ok: true })
}

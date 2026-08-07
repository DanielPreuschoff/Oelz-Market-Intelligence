import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Sammel-Ablehnung. Das Gegenstueck zum Bestaetigen gibt es bewusst nicht:
 * ein „alle bestaetigen" wuerde die Redaktionsregel aushebeln, dass
 * KI-Entwuerfe vor der Veroeffentlichung gelesen werden (content-guidelines.md).
 * Das Wegraeumen des Ausschusses ist dagegen die Massenbewegung.
 */
export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { ids } = await request.json()
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'Keine Kandidaten übergeben' }, { status: 400 })
  }

  // .eq('status','pending') als Wettlauf-Schutz: bereits bearbeitete Kandidaten
  // bleiben unangetastet, auch wenn sie noch in der Auswahl stecken.
  const { data, error } = await supabase
    .from('signal_candidates')
    .update({
      status: 'rejected',
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .in('id', ids)
    .eq('status', 'pending')
    .select('id')

  if (error) {
    console.error('[reject-many]', error)
    return NextResponse.json({ error: 'Ablehnen fehlgeschlagen' }, { status: 500 })
  }

  return NextResponse.json({ rejected: data?.length ?? 0 })
}

import { createClient } from '@/lib/supabase/server'
import { extractImpulse } from '@/lib/ai/extract-impulse'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) return Response.json({ error: 'Forbidden' }, { status: 403 })

  const { text } = await request.json()
  if (!text || text.trim().length < 20) {
    return Response.json({ error: 'Text zu kurz' }, { status: 400 })
  }

  const extraction = await extractImpulse(text)
  return Response.json(extraction)
}

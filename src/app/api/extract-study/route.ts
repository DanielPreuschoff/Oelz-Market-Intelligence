import { createClient } from '@/lib/supabase/server'
import { extractStudyMetadata } from '@/lib/ai/extract-study'
import { extractText } from 'unpdf'

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

  const formData = await request.formData()
  const file = formData.get('pdf') as File | null
  if (!file) return Response.json({ error: 'No PDF provided' }, { status: 400 })

  const buffer = await file.arrayBuffer()
  const { text } = await extractText(new Uint8Array(buffer), { mergePages: true })

  if (!text || text.trim().length < 50) {
    return Response.json({ error: 'Could not extract text from PDF' }, { status: 400 })
  }

  const extraction = await extractStudyMetadata(text)
  return Response.json(extraction)
}

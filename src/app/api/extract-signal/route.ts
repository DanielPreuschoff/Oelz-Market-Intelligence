import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { extractSignal } from '@/lib/ai/extract-signal'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const rawText: string = body.rawText

  if (!rawText || typeof rawText !== 'string' || rawText.trim().length < 20) {
    return NextResponse.json({ error: 'rawText must be at least 20 characters' }, { status: 400 })
  }

  try {
    const extracted = await extractSignal(rawText)
    return NextResponse.json(extracted)
  } catch (err) {
    console.error('AI extraction error:', err)
    return NextResponse.json(
      { error: 'AI extraction failed. Please fill in the fields manually.' },
      { status: 500 }
    )
  }
}

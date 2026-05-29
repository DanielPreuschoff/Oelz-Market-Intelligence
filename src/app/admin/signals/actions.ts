'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function deleteSignal(id: string) {
  const supabase = await createClient()
  await supabase.from('signals').delete().eq('id', id)
  revalidatePath('/admin/signals')
}

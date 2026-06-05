'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteImpulse(id: string) {
  const supabase = await createClient()
  await supabase.from('innovation_impulses').delete().eq('id', id)
  revalidatePath('/admin/produkt-radar')
}

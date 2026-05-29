'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function deleteEdition(id: string) {
  const supabase = await createClient()
  await supabase.from('editions').delete().eq('id', id)
  revalidatePath('/admin/editions')
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteIngredientSignal(id: string) {
  const supabase = await createClient()
  await supabase.from('ingredient_signals').delete().eq('id', id)
  revalidatePath('/admin/rohstoff-radar')
}

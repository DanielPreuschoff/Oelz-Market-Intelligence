'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { missingForPublish, type IngredientSignal } from '@/types/ingredient-signals'

export async function deleteIngredientSignal(id: string) {
  const supabase = await createClient()
  await supabase.from('ingredient_signals').delete().eq('id', id)
  revalidatePath('/admin/rohstoff-radar')
}

/**
 * Veröffentlicht alle Entwürfe, deren Relevanzkette vollständig ist.
 *
 * Die Hürde bleibt bestehen: Entwürfe mit Lücken werden übersprungen, nicht
 * durchgedrückt — der CHECK `ingredient_signals_published_complete` würde sie
 * ohnehin ablehnen. Die Auswahl passiert hier serverseitig und frisch aus der
 * Datenbank; was der Bildschirm anzeigt, spielt keine Rolle. Schreiben darf
 * ohnehin nur der Admin (RLS).
 */
export async function publishReadyIngredientSignals(): Promise<{
  veroeffentlicht: number
  uebersprungen: number
}> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('ingredient_signals')
    .select('*')
    .eq('status', 'draft')

  const entwuerfe = (data ?? []) as IngredientSignal[]
  const bereit = entwuerfe.filter((s) => missingForPublish(s).length === 0)

  if (bereit.length > 0) {
    const { error } = await supabase
      .from('ingredient_signals')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .in('id', bereit.map((s) => s.id))
    if (error) throw new Error(`Veröffentlichen fehlgeschlagen: ${error.message}`)
    revalidatePath('/admin/rohstoff-radar')
    revalidatePath('/rohstoff-radar')
    revalidatePath('/')
  }

  return { veroeffentlicht: bereit.length, uebersprungen: entwuerfe.length - bereit.length }
}

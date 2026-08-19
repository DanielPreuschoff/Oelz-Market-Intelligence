'use server'

/**
 * Modulbesuch merken — der Schreibweg des Lesestands (Ungesehen-Zähler).
 *
 * Als Server Action, aus dem Browser aufgerufen, sobald die Seite steht
 * (`ModulbesuchMelder`). Bewusst nicht beim Rendern der Seite: Next.js rendert
 * Seiten hinter Links vorab, und ein Modul gälte dann als gesehen, sobald
 * jemand mit der Maus über den Menüpunkt fährt.
 *
 * Nach dem Schreiben wird das Layout neu validiert, damit die Zähler in der
 * Navigation den neuen Stand zeigen, bevor der Nutzer weiterklickt — bei
 * Client-Navigation bliebe das Layout sonst mit den alten Zahlen stehen.
 */

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { MODULES } from '@/lib/modules'

export async function merkeModulbesuch(moduleId: string): Promise<void> {
  // Nur bekannte Module — der Schlüssel kommt vom Client.
  if (!MODULES.some((m) => m.id === moduleId)) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('module_visits')
    .upsert(
      { user_id: user.id, module_id: moduleId, last_seen_at: new Date().toISOString() },
      { onConflict: 'user_id,module_id' }
    )

  if (error) {
    // Fehlt die Tabelle (Migration 010 nicht eingespielt) oder greift RLS,
    // bleibt der Zähler eben stehen — das ist kein Grund, die Seite zu stören.
    console.error('[module-visits] Lesestand nicht geschrieben:', error.message)
    return
  }

  revalidatePath('/', 'layout')
}

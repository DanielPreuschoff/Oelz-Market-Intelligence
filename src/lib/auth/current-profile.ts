import { createClient } from '@/lib/supabase/server'
import type { UserProfile } from '@/types/database'

/**
 * Profil des angemeldeten Nutzers.
 *
 * Existiert, weil das Muster `from('user_profiles').select(...).single()` ohne
 * Filter auf die eigene ID **nur zufällig funktioniert**: die Leseregel macht
 * Admins alle Profile sichtbar, also liefert `.single()` für einen Admin
 * PGRST116 (mehr als eine Zeile), sobald ein zweiter Nutzer existiert. Das
 * Profil ist dann `null`, `is_admin` wird `false` — und Admin-Bedienelemente
 * verschwinden lautlos, obwohl der Nutzer Admin ist.
 *
 * Gefunden an fünf Leseseiten; der sichtbarste Fall war der „Neue Edition"-
 * Button in der Editionsübersicht.
 */
export async function getCurrentProfile(): Promise<UserProfile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  return (data as UserProfile | null) ?? null
}

/** Kurzform für die häufigste Frage an das Profil. */
export async function isCurrentUserAdmin(): Promise<boolean> {
  return !!(await getCurrentProfile())?.is_admin
}

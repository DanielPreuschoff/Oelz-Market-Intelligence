import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { UserProfile } from '@/types/database'

/**
 * Profil des angemeldeten Nutzers.
 *
 * In `cache()` gewickelt: Layout und Seite laufen im selben Rendervorgang und
 * fragen beide nach dem Profil. Ohne die Hülle sind das vier Netzwerkrunden
 * statt zwei — jede Runde zur Supabase-Instanz kostet warm rund 120 ms, kalt
 * ein Vielfaches. React verwirft den Zwischenspeicher am Ende jeder Anfrage,
 * er kann also nicht zwischen Nutzern durchschlagen.
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
/**
 * Der angemeldete Nutzer, einmal je Anfrage beim Auth-Server erfragt.
 *
 * Getrennt von `getCurrentProfile()`, weil „nicht angemeldet" und „angemeldet,
 * aber ohne Profilzeile" verschiedene Fälle sind: Nur der erste rechtfertigt
 * eine Weiterleitung auf `/login`. Beim zweiten würde die Middleware den
 * gültigen Nutzer dort sofort wieder wegschicken — eine Endlosschleife.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

export const getCurrentProfile = cache(async (): Promise<UserProfile | null> => {
  const user = await getCurrentUser()
  if (!user) return null

  const supabase = await createClient()
  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  return (data as UserProfile | null) ?? null
})

/** Kurzform für die häufigste Frage an das Profil. */
export async function isCurrentUserAdmin(): Promise<boolean> {
  return !!(await getCurrentProfile())?.is_admin
}

/**
 * Module, die für diesen Nutzer einzeln freigeschaltet sind (Tabelle
 * `modul_freigaben`, Migration 022). Leer, solange die Tabelle fehlt oder
 * nichts freigegeben ist — der Code darf also vor der Migration live gehen.
 */
export const getModulFreigaben = cache(async (): Promise<string[]> => {
  const user = await getCurrentUser()
  if (!user) return []

  const supabase = await createClient()
  const { data } = await supabase.from('modul_freigaben').select('module_id').eq('user_id', user.id)
  return (data ?? []).map((r) => r.module_id as string)
})

/** Darf der Nutzer dieses Modul sehen? Admins immer, sonst nur mit Freigabe. */
export async function darfModul(moduleId: string): Promise<boolean> {
  const [profile, freigaben] = await Promise.all([getCurrentProfile(), getModulFreigaben()])
  return !!profile?.is_admin || freigaben.includes(moduleId)
}

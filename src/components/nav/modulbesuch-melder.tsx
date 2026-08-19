'use client'

/**
 * Meldet den Besuch eines Moduls, sobald die Seite im Browser steht.
 *
 * Rendert nichts. Sitzt im App-Layout, kennt den Pfad über `usePathname` und
 * ordnet ihn über `moduleForPath` zu — dieselbe Liste, die den Menüpunkt
 * hervorhebt. Geschrieben wird nur, wenn es für dieses Modul Ungesehenes
 * gibt: ein Besuch ohne Ungesehenes ändert am Zähler nichts, und jeder
 * Schreibvorgang zieht eine Neuvalidierung des Layouts nach sich.
 *
 * Der Ref merkt sich das zuletzt gemeldete Modul: Reacts doppelter Effektlauf
 * im Entwicklungsmodus meldet so nicht zweimal, und nach der Neuvalidierung
 * (ungesehen wird 0) löst der Effekt nicht erneut aus. Wechselt das Modul,
 * wird der Ref freigegeben — sonst bliebe ein Modul nach A → B → A stumm.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { moduleForPath } from '@/lib/modules'
import { merkeModulbesuch } from '@/lib/module-visits'
import type { ModuleStats } from '@/lib/module-stats'

export function ModulbesuchMelder({ stats }: { stats: Record<string, ModuleStats> }) {
  const pathname = usePathname()
  const modulId = moduleForPath(pathname)?.id ?? null
  const ungesehen = modulId ? (stats[modulId]?.unseenCount ?? 0) : 0
  const gemeldet = useRef<string | null>(null)

  useEffect(() => {
    if (gemeldet.current !== modulId) gemeldet.current = null
    if (!modulId || ungesehen === 0 || gemeldet.current === modulId) return
    gemeldet.current = modulId
    void merkeModulbesuch(modulId)
  }, [modulId, ungesehen])

  return null
}

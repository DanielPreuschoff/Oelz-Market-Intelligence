'use client'

/**
 * Die Inhaltsspalte neben der Modulnavigation.
 *
 * Alle Lesestrecken laufen in `max-w-5xl` mit Innenabstand — das hält Zeilen
 * lesbar. Die Startseite ist die eine Ausnahme (ADR 0004): Sie nutzt die volle
 * Breite und setzt Abstände selbst, weil ihre orange Bühne bis an die Kanten
 * reichen muss. Da Layouts serverseitig keinen Pfad kennen, entscheidet das
 * hier ein schmaler Client-Baustein; die Kinder bleiben Server-Komponenten.
 */

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function HauptSpalte({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const vollbreit = pathname === '/'

  return (
    <main className={cn('flex-1 min-w-0', !vollbreit && 'px-8 py-8 max-w-5xl')}>
      {children}
    </main>
  )
}

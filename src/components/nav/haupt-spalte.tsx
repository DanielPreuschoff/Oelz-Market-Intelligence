'use client'

/**
 * Die Inhaltsspalte neben der Modulnavigation. Drei Breiten, je Route:
 *
 * - schmal (Regelfall, `max-w-5xl`) für Lesestrecken — das hält Zeilen lesbar.
 * - breit (`max-w-[1400px]`) für Kartenraster wie den Produktradar. Dort ist
 *   die Zeilenlänge kein Argument, weil jede Karte ihren eigenen kurzen
 *   Textkörper hat; die schmale Spalte liess auf grossen Schirmen dagegen die
 *   halbe Fläche leer und erlaubte nur drei Karten je Zeile.
 * - voll für die Startseite (ADR 0004): Sie setzt Abstände selbst, weil ihre
 *   orange Bühne bis an die Kanten reichen muss.
 *
 * Da Layouts serverseitig keinen Pfad kennen, entscheidet das hier ein schmaler
 * Client-Baustein; die Kinder bleiben Server-Komponenten.
 */

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const BREITE_ROUTEN = ['/produkt-radar', '/studien/']

export function HauptSpalte({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const vollbreit = pathname === '/'
  // Exakter Treffer oder Präfix mit Schrägstrich (Detailseiten wie /studien/<id>).
  const breit = BREITE_ROUTEN.some((r) => (r.endsWith('/') ? pathname.startsWith(r) : pathname === r))

  return (
    <main
      className={cn(
        'flex-1 min-w-0',
        !vollbreit && ['px-8 py-8', breit ? 'max-w-[1400px]' : 'max-w-5xl']
      )}
    >
      {children}
    </main>
  )
}

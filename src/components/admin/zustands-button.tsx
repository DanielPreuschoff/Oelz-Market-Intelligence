'use client'

/**
 * Knopf für einen Zustandswechsel, der kein Löschen ist.
 *
 * Ausräumen und Wiederaufnehmen sind umkehrbar — sie verdienen deshalb nicht
 * den Rückfragedialog des Löschknopfes, aber der Nutzer soll trotzdem sehen,
 * dass etwas passiert. Mit `bestaetigung` lässt sich eine Rückfrage anfordern,
 * wo sie angebracht ist.
 */

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'

export function ZustandsButton({
  label,
  onAction,
  bestaetigung,
}: {
  label: string
  onAction: () => Promise<void>
  /** Wenn gesetzt: Rückfrage vor dem Ausführen. */
  bestaetigung?: string
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={isPending}
      onClick={() => {
        if (bestaetigung && !window.confirm(bestaetigung)) return
        startTransition(async () => {
          await onAction()
        })
      }}
    >
      {isPending ? '…' : label}
    </Button>
  )
}

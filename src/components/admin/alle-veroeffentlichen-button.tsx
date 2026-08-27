'use client'

/**
 * Sammel-Veröffentlichung im Rohstoff-Radar-Admin.
 *
 * Veröffentlicht auf einen Klick alle Entwürfe, deren Relevanzkette vollständig
 * ist — Entwürfe mit Lücken bleiben liegen und werden im Bestätigungsdialog
 * beziffert. Das ist bewusst KEIN Durchdrücken an der Hürde vorbei: die
 * eigentliche Auswahl trifft die Server-Action frisch aus der Datenbank, und
 * der CHECK aus Migration 007 bliebe ohnehin die letzte Instanz.
 *
 * (Im Wettbewerbs-Import gibt es absichtlich kein Sammel-Bestätigen — dort
 * geht es um ungeprüfte Kandidaten. Hier geht es um eigene Entwürfe, deren
 * Vollständigkeit maschinell prüfbar ist; das Urteil ist die Kette selbst.)
 */

import { useState, useTransition } from 'react'
import { Upload } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function AlleVeroeffentlichenButton({
  bereit,
  unvollstaendig,
  onPublish,
}: {
  /** Entwürfe mit vollständiger Relevanzkette. */
  bereit: number
  /** Entwürfe, denen noch Angaben fehlen — bleiben liegen. */
  unvollstaendig: number
  onPublish: () => Promise<{ veroeffentlicht: number; uebersprungen: number }>
}) {
  const [open, setOpen] = useState(false)
  const [ergebnis, setErgebnis] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (bereit === 0 && !ergebnis) return null

  function handleConfirm() {
    startTransition(async () => {
      try {
        const r = await onPublish()
        setErgebnis(
          `${r.veroeffentlicht} ${r.veroeffentlicht === 1 ? 'Rohstoffsignal' : 'Rohstoffsignale'} veröffentlicht` +
            (r.uebersprungen > 0 ? ` · ${r.uebersprungen} mit Lücken übersprungen` : ''),
        )
      } catch {
        setErgebnis('Veröffentlichen fehlgeschlagen — bitte erneut versuchen.')
      } finally {
        setOpen(false)
      }
    })
  }

  return (
    <>
      {bereit > 0 ? (
        <Button variant="outline" size="sm" onClick={() => setOpen(true)} disabled={isPending}>
          <Upload className="w-3.5 h-3.5" />
          {isPending ? 'Veröffentliche…' : `${bereit} ${bereit === 1 ? 'Entwurf' : 'Entwürfe'} veröffentlichen`}
        </Button>
      ) : (
        <span className="text-xs text-muted-foreground">{ergebnis}</span>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bereit} {bereit === 1 ? 'Entwurf' : 'Entwürfe'} veröffentlichen?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Veröffentlicht werden nur Entwürfe mit vollständiger Relevanzkette.
              {unvollstaendig > 0 && (
                <>
                  {' '}
                  {unvollstaendig} {unvollstaendig === 1 ? 'Entwurf bleibt' : 'Entwürfe bleiben'} liegen, weil noch
                  Angaben fehlen.
                </>
              )}{' '}
              Veröffentlichte Signale erscheinen sofort im Rohstoff-Radar und auf der Startseite.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
              {isPending ? 'Veröffentliche…' : 'Veröffentlichen'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

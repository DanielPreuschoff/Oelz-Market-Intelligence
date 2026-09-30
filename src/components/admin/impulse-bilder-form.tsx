'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Check, ImageDown, Loader2, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { bilderUebernehmen, impulseVeroeffentlichen } from '@/app/admin/produkt-radar/bilder/actions'
import type { BildErgebnis } from '@/app/admin/produkt-radar/bilder/actions'

/** Bilder je Serveraufruf — klein genug für das Zeitlimit der Serverfunktion. */
const PAKET = 4

export function ImpulseBilderForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [raw, setRaw] = useState('')
  const [fehler, setFehler] = useState<string | null>(null)
  const [ergebnisse, setErgebnisse] = useState<BildErgebnis[]>([])
  const [fortschritt, setFortschritt] = useState<{ fertig: number; gesamt: number } | null>(null)
  const [veroeffentlicht, setVeroeffentlicht] = useState<number | null>(null)

  const bereit = ergebnisse.filter((e) => e.ok && e.vollstaendig && e.id)

  function uebernehmen() {
    setFehler(null)
    setErgebnisse([])
    setVeroeffentlicht(null)
    startTransition(async () => {
      let start = 0
      let gesamt = Infinity
      const alle: BildErgebnis[] = []
      while (start < gesamt) {
        const res = await bilderUebernehmen(raw, start, PAKET)
        if (!res.ok) {
          setFehler(res.error)
          return
        }
        gesamt = res.gesamt
        alle.push(...res.ergebnisse)
        start += PAKET
        setErgebnisse([...alle])
        setFortschritt({ fertig: Math.min(start, gesamt), gesamt })
      }
      router.refresh()
    })
  }

  function veroeffentlichen() {
    startTransition(async () => {
      const res = await impulseVeroeffentlichen(bereit.map((e) => e.id!))
      if (!res.ok) {
        setFehler(res.error)
        return
      }
      setVeroeffentlicht(res.veroeffentlicht)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={8}
        placeholder='{"bilder": [{"title": "Titel genau wie im Entwurf", "image_url": "https://…/bild.jpg"}]}'
        className="font-mono text-xs"
      />

      <div className="flex items-center gap-3">
        <Button type="button" onClick={uebernehmen} disabled={!raw.trim() || isPending}>
          {isPending && fortschritt === null
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Lade Bilder…</>
            : <><ImageDown className="w-4 h-4" /> Bilder übernehmen</>}
        </Button>
        <p className="text-xs text-muted-foreground">
          {fortschritt
            ? `${fortschritt.fertig} von ${fortschritt.gesamt} bearbeitet`
            : 'Nur Entwürfe ohne Bild. Jedes Bild wird in den eigenen Speicher geladen.'}
        </p>
      </div>

      {fehler && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">{fehler}</p>
        </div>
      )}

      {ergebnisse.length > 0 && (
        <div className="divide-y rounded-xl border bg-card overflow-hidden">
          {ergebnisse.map((e, i) => (
            <div key={`${e.id ?? e.title}-${i}`} className="flex items-center gap-4 px-4 py-3">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                {e.image_url && <Image src={e.image_url} alt={e.title} fill sizes="80px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">
                  {e.ok
                    ? e.vorhanden ? 'hatte schon ein Bild' : 'Bild übernommen'
                    : e.fehler}
                  {e.ok && e.vollstaendig === false && ' · Entwurf noch unvollständig, wird nicht veröffentlicht'}
                </p>
              </div>
              {e.ok
                ? <Check className="size-4 shrink-0 text-emerald-600" aria-label="übernommen" />
                : <X className="size-4 shrink-0 text-destructive" aria-label="fehlgeschlagen" />}
            </div>
          ))}
        </div>
      )}

      {!isPending && bereit.length > 0 && veroeffentlicht === null && (
        <div className="flex items-center gap-3">
          <Button type="button" onClick={veroeffentlichen} style={{ backgroundColor: '#F07D00', borderColor: '#F07D00', color: 'white' }}>
            <Send className="w-4 h-4" /> {bereit.length} {bereit.length === 1 ? 'Impuls' : 'Impulse'} veröffentlichen
          </Button>
          <p className="text-xs text-muted-foreground">Erst die Bilder ansehen — unpassende im Einzelformular tauschen.</p>
        </div>
      )}

      {veroeffentlicht !== null && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-medium text-emerald-900">
            {veroeffentlicht} {veroeffentlicht === 1 ? 'Impuls' : 'Impulse'} veröffentlicht
          </p>
        </div>
      )}
    </div>
  )
}

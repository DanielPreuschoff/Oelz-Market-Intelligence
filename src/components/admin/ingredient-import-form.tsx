'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { importIngredientSignals } from '@/app/admin/rohstoff-radar/import/actions'
import type { IngredientImportResult } from '@/app/admin/rohstoff-radar/import/actions'

export function IngredientImportForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [raw, setRaw] = useState('')
  const [result, setResult] = useState<IngredientImportResult | null>(null)

  function handleImport() {
    setResult(null)
    startTransition(async () => {
      const res = await importIngredientSignals(raw)
      setResult(res)
      if (res.ok) {
        setRaw('')
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={10}
        placeholder="JSON aus der Aufbereitung der Rohstoffberichte einfügen — Code-Block oder rohes Objekt, beides geht."
        className="font-mono text-xs"
      />

      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleImport} disabled={!raw.trim() || isPending}>
          {isPending
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Importiere…</>
            : <><Upload className="w-4 h-4" /> Entwürfe anlegen</>}
        </Button>
        <p className="text-xs text-muted-foreground">
          Signale landen als Entwurf. Veröffentlicht wird erst, wenn die Relevanzkette vollständig ist.
        </p>
      </div>

      {result && !result.ok && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">{result.error}</p>
        </div>
      )}

      {result?.ok && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 space-y-2">
          <p className="text-sm font-medium text-emerald-900">
            {result.created} {result.created === 1 ? 'Entwurf' : 'Entwürfe'} angelegt
            {result.completeDrafts > 0 && ` · ${result.completeDrafts} davon vollständig und sofort veröffentlichbar`}
          </p>

          {/* Der eigentliche Ertrag des Explorationslaufs: Funde, für die die
              Funktionsliste zu eng ist. */}
          {result.unknownFunctions.length > 0 && (
            <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2">
              <p className="text-xs font-semibold text-amber-900">
                {result.unknownFunctions.length} Fund
                {result.unknownFunctions.length === 1 ? '' : 'e'} passt nicht in die Funktionsliste
              </p>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc text-xs text-amber-900/85">
                {result.unknownFunctions.map((u) => (
                  <li key={u.title}>{u.title} — vorgeschlagen: {u.functions.join(', ')}</li>
                ))}
              </ul>
              <p className="text-[11px] text-amber-800 mt-1.5">
                Häufen sich Funde mit demselben Nenner, ist die Taxonomie zu eng — dann eine
                Funktion ergänzen statt die Signale zu verwerfen.
              </p>
            </div>
          )}

          {result.duplicates.length > 0 && (
            <details className="text-xs text-emerald-900/80">
              <summary className="cursor-pointer">
                {result.duplicates.length} übersprungen — Quelle schon bekannt
              </summary>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc">
                {result.duplicates.map((d) => <li key={d.source_url}>{d.title}</li>)}
              </ul>
            </details>
          )}

          {result.issues.length > 0 && (
            <details className="text-xs text-amber-800">
              <summary className="cursor-pointer">
                {result.issues.length} fehlerhaft und übersprungen
              </summary>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc">
                {result.issues.map((i) => <li key={i.index}>{i.headline} — {i.reason}</li>)}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}

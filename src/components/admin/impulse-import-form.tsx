'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { importImpulses } from '@/app/admin/produkt-radar/import/actions'
import type { ImpulseImportResult } from '@/app/admin/produkt-radar/import/actions'

export function ImpulseImportForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [raw, setRaw] = useState('')
  const [result, setResult] = useState<ImpulseImportResult | null>(null)

  function handleImport() {
    setResult(null)
    startTransition(async () => {
      const res = await importImpulses(raw)
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
        placeholder="JSON aus der Aufbereitung der Produktberichte einfügen — Code-Block oder rohes Objekt, beides geht."
        className="font-mono text-xs"
      />

      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleImport} disabled={!raw.trim() || isPending}>
          {isPending
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Importiere…</>
            : <><Upload className="w-4 h-4" /> Entwürfe anlegen</>}
        </Button>
        <p className="text-xs text-muted-foreground">
          Impulse landen als Entwurf. Bilder und Bewertungen werden beim Durchsehen ergänzt.
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
            {result.completeDrafts > 0 && ` · ${result.completeDrafts} davon vollständig`}
          </p>

          {/* Arbeitsliste für die Durchsicht, keine Fehlermeldung: unvollständige
              Impulse sind erwünscht, sie sollen nur nicht übersehen werden. */}
          {result.incomplete.length > 0 && (
            <details className="text-xs text-emerald-900/80">
              <summary className="cursor-pointer">
                {result.incomplete.length} {result.incomplete.length === 1 ? 'Entwurf braucht' : 'Entwürfe brauchen'} noch Nacharbeit
              </summary>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc">
                {result.incomplete.map((i) => (
                  <li key={i.title}>{i.title} — es fehlt: {i.missing.join(', ')}</li>
                ))}
              </ul>
            </details>
          )}

          {/* Gegenstück zu „passt nicht in die Funktionsliste" beim Rohstoff-Import:
              häufen sich dieselben abgelehnten Schlagworte, ist das Vokabular zu eng. */}
          {result.unknownTags.length > 0 && (
            <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2">
              <p className="text-xs font-semibold text-amber-900">
                {result.unknownTags.length} Impuls
                {result.unknownTags.length === 1 ? '' : 'e'} mit Schlagworten ausserhalb der Liste
              </p>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc text-xs text-amber-900/85">
                {result.unknownTags.map((u) => (
                  <li key={u.title}>{u.title} — verworfen: {u.tags.join(', ')}</li>
                ))}
              </ul>
              <p className="text-[11px] text-amber-800 mt-1.5">
                Wiederholt sich dasselbe Schlagwort, gehört es in IMPULSE_TAGS ergänzt.
              </p>
            </div>
          )}

          {result.duplicates.length > 0 && (
            <details className="text-xs text-emerald-900/80">
              <summary className="cursor-pointer">
                {result.duplicates.length} übersprungen — Quelle und Titel schon bekannt
              </summary>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc">
                {result.duplicates.map((d) => <li key={d.title}>{d.title}</li>)}
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

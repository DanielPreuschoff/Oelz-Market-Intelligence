'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { importiereRegulatorikEintraege } from '@/app/admin/unter-beobachtung/import/actions'
import type { RegulatorikImportResult } from '@/app/admin/unter-beobachtung/import/actions'

export function RegulatorikImportForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [raw, setRaw] = useState('')
  const [result, setResult] = useState<RegulatorikImportResult | null>(null)

  function handleImport() {
    setResult(null)
    startTransition(async () => {
      const res = await importiereRegulatorikEintraege(raw)
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
        placeholder="JSON aus der Aufbereitung des Behörden-Laufs einfügen — Code-Block oder rohes Objekt, beides geht."
        className="font-mono text-xs"
      />

      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleImport} disabled={!raw.trim() || isPending}>
          {isPending
            ? <><Loader2 className="size-4 animate-spin" /> Importiere…</>
            : <><Upload className="size-4" /> Entwürfe anlegen</>}
        </Button>
        <p className="text-xs text-muted-foreground">
          Einträge landen als Entwurf. Veröffentlicht wird erst, wenn die Pflichtfelder des Typs
          vollständig sind — und die Quelle geprüft ist.
        </p>
      </div>

      {result && !result.ok && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">{result.error}</p>
        </div>
      )}

      {result?.ok && (
        <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-medium text-emerald-900">
            {result.created} {result.created === 1 ? 'Entwurf' : 'Entwürfe'} angelegt
            {result.completeDrafts > 0 && ` · ${result.completeDrafts} davon vollständig — bitte trotzdem gegen die Quelle prüfen`}
          </p>

          {result.unknownCategories.length > 0 && (
            <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2">
              <p className="text-xs font-semibold text-amber-900">
                {result.unknownCategories.length} Eintrag
                {result.unknownCategories.length === 1 ? '' : 'e'} mit unbekannter Produktkategorie
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-amber-900/85">
                {result.unknownCategories.map((u) => (
                  <li key={u.headline}>{u.headline} — verworfen: {u.categories.join(', ')}</li>
                ))}
              </ul>
              <p className="mt-1.5 text-[11px] text-amber-800">
                Erlaubt sind nur die fünf Ölz-Kategorien. Der Eintrag ist als Entwurf da, die
                Kategorie muss von Hand gesetzt werden.
              </p>
            </div>
          )}

          {result.duplicates.length > 0 && (
            <details className="text-xs text-emerald-900/80">
              <summary className="cursor-pointer">
                {result.duplicates.length} übersprungen — Quelle und Gegenstand schon bekannt
              </summary>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {result.duplicates.map((d) => <li key={`${d.source_url}-${d.headline}`}>{d.headline}</li>)}
              </ul>
            </details>
          )}

          {result.issues.length > 0 && (
            <details className="text-xs text-amber-800">
              <summary className="cursor-pointer">
                {result.issues.length} fehlerhaft und übersprungen
              </summary>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {result.issues.map((i) => <li key={i.index}>{i.headline} — {i.reason}</li>)}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { importiereKundensignale } from '@/app/admin/kundenradar/import/actions'
import type { KundenradarImportResult } from '@/app/admin/kundenradar/import/actions'

/** Muster: regulatorik-import-form.tsx, dazu unbekannte Händler und Kurzprofile. */
export function KundenradarImportForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [raw, setRaw] = useState('')
  const [result, setResult] = useState<KundenradarImportResult | null>(null)

  function handleImport() {
    setResult(null)
    startTransition(async () => {
      const res = await importiereKundensignale(raw)
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
        placeholder="JSON aus der Aufbereitung der Läufe je Land einfügen — Code-Block oder rohes Objekt, beides geht."
        className="font-mono text-xs"
      />

      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleImport} disabled={!raw.trim() || isPending}>
          {isPending
            ? <><Loader2 className="size-4 animate-spin" /> Importiere…</>
            : <><Upload className="size-4" /> Entwürfe anlegen</>}
        </Button>
        <p className="text-xs text-muted-foreground">
          Signale landen als Entwurf. Kurzprofile werden nur in leere Felder geschrieben.
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
            {result.completeDrafts > 0 && ` · ${result.completeDrafts} davon vollständig — bitte trotzdem die Quelle aufrufen`}
          </p>
          {(result.profilesSet > 0 || result.profilesSkipped.length > 0) && (
            <p className="text-xs text-emerald-900/85">
              {result.profilesSet} {result.profilesSet === 1 ? 'Kurzprofil' : 'Kurzprofile'} gesetzt
              {result.profilesSkipped.length > 0 &&
                ` · ${result.profilesSkipped.length} übersprungen, weil schon vorhanden (${result.profilesSkipped.join(', ')})`}
            </p>
          )}

          {result.unknownSlugs.length > 0 && (
            <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2">
              <p className="text-xs font-semibold text-amber-900">
                Unbekannte Händler: {result.unknownSlugs.join(', ')}
              </p>
              <p className="mt-1 text-[11px] text-amber-800">
                Erst unter „Neuer Händler“ mit genau dieser Adresse anlegen, dann denselben JSON-Block
                erneut einfügen — Bekanntes wird dabei übersprungen.
              </p>
            </div>
          )}

          {result.duplicates.length > 0 && (
            <details className="text-xs text-emerald-900/80">
              <summary className="cursor-pointer">
                {result.duplicates.length} übersprungen — Händler und Quelle schon bekannt
              </summary>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {result.duplicates.map((d) => (
                  <li key={`${d.retailer_slug}-${d.source_url}`}>{d.retailer_slug}: {d.headline}</li>
                ))}
              </ul>
            </details>
          )}

          {result.issues.length > 0 && (
            <details className="text-xs text-amber-800">
              <summary className="cursor-pointer">
                {result.issues.length} fehlerhaft und übersprungen
              </summary>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {result.issues.map((i) => <li key={`${i.index}-${i.headline}`}>{i.headline} — {i.reason}</li>)}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}

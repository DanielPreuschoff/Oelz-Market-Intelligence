'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { importSignals } from '@/app/admin/import/actions'
import type { ImportResult } from '@/app/admin/import/actions'

export function ImportForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [raw, setRaw] = useState('')
  const [result, setResult] = useState<ImportResult | null>(null)

  function handleImport() {
    setResult(null)
    startTransition(async () => {
      const res = await importSignals(raw)
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
        placeholder='JSON aus der Signal-Extraktion einfügen — Code-Block oder rohes Objekt, beides geht.'
        className="font-mono text-xs"
      />

      <div className="flex items-center gap-3">
        <Button type="button" onClick={handleImport} disabled={!raw.trim() || isPending}>
          {isPending
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Importiere…</>
            : <><Upload className="w-4 h-4" /> Kandidaten anlegen</>}
        </Button>
        <p className="text-xs text-muted-foreground">
          Signale landen als Kandidaten zur Bestätigung, nicht direkt im Reader.
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
            {result.created} {result.created === 1 ? 'Kandidat' : 'Kandidaten'} angelegt
            {' · '}
            <a href={`/admin/import/${result.runId}`} className="underline underline-offset-2">
              zur Durchsicht
            </a>
          </p>

          {result.duplicates.length > 0 && (
            <details className="text-xs text-emerald-900/80">
              <summary className="cursor-pointer">
                {result.duplicates.length} übersprungen — Quelle schon bekannt
              </summary>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc">
                {result.duplicates.map((d) => <li key={d.source_url}>{d.headline}</li>)}
              </ul>
            </details>
          )}

          {result.unmatchedCompetitors.length > 0 && (
            <p className="text-xs text-amber-800">
              Wettbewerber nicht zugeordnet: {result.unmatchedCompetitors.join(', ')}.
              Diese Signale liegen als marktweit ohne Zuordnung vor.
            </p>
          )}

          {result.issues.length > 0 && (
            <details className="text-xs text-amber-800">
              <summary className="cursor-pointer">
                {result.issues.length} fehlerhaft und übersprungen
              </summary>
              <ul className="mt-1 space-y-0.5 pl-4 list-disc">
                {result.issues.map((i) => (
                  <li key={i.index}>{i.headline} — {i.reason}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}

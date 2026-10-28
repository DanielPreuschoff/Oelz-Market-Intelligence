'use client'

/**
 * Import ins Kundenradar.
 *
 * Regelweg (Daniel, 27.10.2026: „so wenig Arbeit wie möglich"): die
 * Deep-Research-Berichte als .md hochladen. Jeder Bericht geht einzeln an den
 * Server und wird dort aufbereitet; nacheinander, damit der zweite Dienst die
 * Entwürfe des ersten als „bereits erfasst" sieht. Danach genügt ein Klick auf
 * „Alle vollständigen veröffentlichen".
 *
 * Notweg: fertiges JSON einfügen, wie bisher.
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { importiereBericht, importiereKundensignale } from '@/app/admin/kundenradar/import/actions'
import type { KundenradarImportResult } from '@/app/admin/kundenradar/import/actions'

/** Server-Actions nehmen standardmäßig höchstens 1 MB an. */
const MAX_BYTES = 900_000

type Lauf = { datei: string; status: 'wartet' | 'laeuft' | 'fertig'; ergebnis?: KundenradarImportResult }

export function KundenradarImportForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [laeufe, setLaeufe] = useState<Lauf[]>([])
  const [raw, setRaw] = useState('')
  const [jsonErgebnis, setJsonErgebnis] = useState<KundenradarImportResult | null>(null)

  function berichteHochladen(dateien: FileList | null) {
    if (!dateien || dateien.length === 0) return
    const liste = [...dateien]
    setLaeufe(liste.map((d) => ({ datei: d.name, status: 'wartet' })))
    startTransition(async () => {
      for (const [i, datei] of liste.entries()) {
        const setze = (lauf: Partial<Lauf>) =>
          setLaeufe((alt) => alt.map((l, j) => (j === i ? { ...l, ...lauf } : l)))
        setze({ status: 'laeuft' })
        const ergebnis: KundenradarImportResult =
          datei.size > MAX_BYTES
            ? { ok: false, error: `${datei.name} ist größer als 900 KB — bitte aufteilen.` }
            : await importiereBericht(datei.name, await datei.text()).catch((e: unknown) => ({
                ok: false as const,
                error: `${datei.name}: ${e instanceof Error ? e.message : 'Verarbeitung abgebrochen.'}`,
              }))
        setze({ status: 'fertig', ergebnis })
      }
      router.refresh()
    })
  }

  function jsonImportieren() {
    setJsonErgebnis(null)
    startTransition(async () => {
      const res = await importiereKundensignale(raw)
      setJsonErgebnis(res)
      if (res.ok) {
        setRaw('')
        router.refresh()
      }
    })
  }

  const fertige = laeufe.filter((l) => l.ergebnis?.ok)
  const summe = (f: (r: Extract<KundenradarImportResult, { ok: true }>) => number) =>
    fertige.reduce((n, l) => n + (l.ergebnis?.ok ? f(l.ergebnis) : 0), 0)

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------- Berichte (.md) */}
      <section className="space-y-3">
        <label
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors hover:border-oelz-orange/60 hover:bg-oelz-orange/5 ${isPending ? 'pointer-events-none opacity-60' : ''}`}
        >
          <Upload className="size-6 text-muted-foreground" />
          <span className="text-sm font-medium">Deep-Research-Berichte hochladen</span>
          <span className="text-xs text-muted-foreground">
            .md-Dateien, mehrere auf einmal — die App zerlegt sie in Signale, prüft die Quellen und legt Entwürfe an.
          </span>
          <input
            type="file"
            accept=".md,.markdown,.txt,text/markdown,text/plain"
            multiple
            className="sr-only"
            disabled={isPending}
            onChange={(e) => {
              berichteHochladen(e.target.files)
              e.target.value = ''
            }}
          />
        </label>

        {laeufe.length > 0 && (
          <div className="space-y-2">
            {laeufe.map((l) => (
              <BerichtZeile key={l.datei} lauf={l} />
            ))}
            {!isPending && fertige.length > 0 && (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                Zusammen {summe((r) => r.created)} {summe((r) => r.created) === 1 ? 'Entwurf' : 'Entwürfe'}, davon {summe((r) => r.completeDrafts)} vollständig.
                Zurück zur Übersicht und „Alle vollständigen veröffentlichen“ — vorher gern ein, zwei Quellen anklicken.
              </p>
            )}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------ JSON (Notweg) */}
      <details className="rounded-xl border border-border px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium">JSON einfügen (Notweg)</summary>
        <div className="mt-3 space-y-3">
          <Textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={8}
            placeholder="JSON in der Form aus prompts/kundenradar.md — Code-Block oder rohes Objekt."
            className="font-mono text-xs"
          />
          <Button type="button" variant="outline" onClick={jsonImportieren} disabled={!raw.trim() || isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Entwürfe anlegen
          </Button>
          {jsonErgebnis && <Ergebnis ergebnis={jsonErgebnis} />}
        </div>
      </details>
    </div>
  )
}

function BerichtZeile({ lauf }: { lauf: Lauf }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2 text-sm">
        {lauf.status === 'laeuft' ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-oelz-orange-text" />
        ) : (
          <FileText className="size-4 shrink-0 text-muted-foreground" />
        )}
        <span className="font-medium">{lauf.datei}</span>
        <span className="text-xs text-muted-foreground">
          {lauf.status === 'wartet' && 'wartet'}
          {lauf.status === 'laeuft' && 'wird aufbereitet — bis zu einer Minute'}
        </span>
      </div>
      {lauf.ergebnis && (
        <div className="mt-2">
          <Ergebnis ergebnis={lauf.ergebnis} />
        </div>
      )}
    </div>
  )
}

function Ergebnis({ ergebnis }: { ergebnis: KundenradarImportResult }) {
  if (!ergebnis.ok) {
    return <p className="text-sm text-destructive">{ergebnis.error}</p>
  }
  const r = ergebnis
  return (
    <div className="space-y-1.5 text-xs">
      <p className="text-sm text-emerald-900">
        {r.created} {r.created === 1 ? 'Entwurf' : 'Entwürfe'} angelegt
        {r.completeDrafts > 0 && ` · ${r.completeDrafts} vollständig`}
        {r.profilesSet > 0 && ` · ${r.profilesSet} ${r.profilesSet === 1 ? 'Kurzprofil' : 'Kurzprofile'} gesetzt`}
        {r.profilesSkipped.length > 0 && ` · ${r.profilesSkipped.length} Kurzprofil(e) übersprungen (schon vorhanden)`}
      </p>

      {r.toteQuellen && r.toteQuellen.length > 0 && (
        <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-amber-900">
          <p className="font-semibold">
            {r.toteQuellen.length} {r.toteQuellen.length === 1 ? 'Quelle führt' : 'Quellen führen'} ins Leere — diese Signale bleiben Entwurf:
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4">
            {r.toteQuellen.map((q) => (
              <li key={q.source_url}>{q.headline} — <span className="break-all">{q.source_url}</span></li>
            ))}
          </ul>
        </div>
      )}

      {r.unknownSlugs.length > 0 && (
        <p className="text-amber-800">
          Unbekannte Händler: {r.unknownSlugs.join(', ')} — erst unter „Neuer Händler“ anlegen, dann erneut hochladen.
        </p>
      )}

      {r.duplicates.length > 0 && (
        <details className="text-muted-foreground">
          <summary className="cursor-pointer">{r.duplicates.length} übersprungen — Händler und Quelle schon bekannt</summary>
          <ul className="mt-1 list-disc space-y-0.5 pl-4">
            {r.duplicates.map((d) => <li key={`${d.retailer_slug}-${d.source_url}`}>{d.retailer_slug}: {d.headline}</li>)}
          </ul>
        </details>
      )}

      {r.verworfen && r.verworfen.length > 0 && (
        <details className="text-muted-foreground">
          <summary className="cursor-pointer">{r.verworfen.length} bewusst nicht übernommen</summary>
          <ul className="mt-1 list-disc space-y-0.5 pl-4">
            {r.verworfen.map((v, i) => <li key={`${i}-${v.titel}`}>{v.titel} — {v.grund}</li>)}
          </ul>
        </details>
      )}

      {r.issues.length > 0 && (
        <details className="text-amber-800">
          <summary className="cursor-pointer">{r.issues.length} fehlerhaft und übersprungen</summary>
          <ul className="mt-1 list-disc space-y-0.5 pl-4">
            {r.issues.map((i) => <li key={`${i.index}-${i.headline}`}>{i.headline} — {i.reason}</li>)}
          </ul>
        </details>
      )}
    </div>
  )
}

'use client'

/**
 * Formular für einen Händler (Kette × Land) — anlegen und ändern in einem.
 *
 * Die Adresse (Slug) leitet sich aus Name und Land ab, solange niemand sie
 * anfasst. Beim Bearbeiten bleibt sie, wie sie ist: Sie steht in Links und
 * im Import, und eine stille Änderung bräche beides.
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  KUNDENSTATUS,
  KUNDENSTATUS_NAME,
  LAENDER,
  LAND_NAME,
  slugify,
  type Haendler,
  type Land,
} from '@/types/kundenradar'

const feld =
  'w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'
const beschriftung = 'block text-sm font-medium mb-1.5'

export function HaendlerForm({
  haendler,
  onSpeichern,
}: {
  haendler?: Haendler
  onSpeichern: (id: string | null, fd: FormData) => Promise<void>
}) {
  const router = useRouter()
  const [fehler, setFehler] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState(haendler?.name ?? '')
  const [land, setLand] = useState<Land | ''>(haendler?.country ?? '')
  const [slug, setSlug] = useState(haendler?.slug ?? '')
  const [slugManuell, setSlugManuell] = useState(!!haendler)

  const slugAnzeige = slugManuell ? slug : slugify(name, land)

  function absenden(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form
    if (!form) return
    const fd = new FormData(form)
    fd.set('slug', slugAnzeige)
    setFehler(null)
    startTransition(async () => {
      try {
        await onSpeichern(haendler?.id ?? null, fd)
      } catch (err) {
        // Der redirect nach dem Speichern wirft eine Kontrollausnahme.
        const m = err instanceof Error ? err.message : 'Speichern fehlgeschlagen.'
        if (m.includes('NEXT_REDIRECT')) return
        setFehler(m)
      }
    })
  }

  return (
    <form className="space-y-6 max-w-2xl">
      <fieldset className="space-y-4" disabled={isPending}>
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <div>
            <label htmlFor="name" className={beschriftung}>
              Kette <span className="font-normal text-muted-foreground">— ohne Land, „Kaufland“</span>
            </label>
            <input
              id="name" name="name" required value={name}
              onChange={(e) => setName(e.target.value)} className={feld}
            />
          </div>
          <div>
            <label htmlFor="country" className={beschriftung}>Land</label>
            <select
              id="country" name="country" required value={land}
              onChange={(e) => setLand(e.target.value as Land)} className={feld}
            >
              <option value="">— wählen —</option>
              {LAENDER.map((l) => (
                <option key={l} value={l}>{LAND_NAME[l]} ({l})</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="slug" className={beschriftung}>
            Adresse{' '}
            <span className="font-normal text-muted-foreground">
              — /kundenradar/{slugAnzeige || '…'}, zugleich Schlüssel im Import
            </span>
          </label>
          <input
            id="slug" value={slugAnzeige}
            onChange={(e) => {
              setSlugManuell(true)
              setSlug(e.target.value)
            }}
            className={`${feld} font-mono`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="group_name" className={beschriftung}>
              Konzern <span className="font-normal text-muted-foreground">optional</span>
            </label>
            <input
              id="group_name" name="group_name" defaultValue={haendler?.group_name ?? ''}
              placeholder="Schwarz-Gruppe" className={feld}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Händler eines Konzerns stehen in der Übersicht nebeneinander.
            </p>
          </div>
          <div>
            <label htmlFor="customer_status" className={beschriftung}>Kundenstatus</label>
            <select
              id="customer_status" name="customer_status"
              defaultValue={haendler?.customer_status ?? 'kunde'} className={feld}
            >
              {KUNDENSTATUS.map((k) => (
                <option key={k} value={k}>{KUNDENSTATUS_NAME[k]}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              „Über Partner“: Ein Vertriebspartner beliefert die Kette.
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="profile" className={beschriftung}>
            Kurzprofil{' '}
            <span className="font-normal text-muted-foreground">
              — drei bis sechs Zeilen: Filialen, Formate, Backstation, Eigenmarken bei Backwaren
            </span>
          </label>
          <textarea
            id="profile" name="profile" rows={7} defaultValue={haendler?.profile ?? ''}
            className={feld}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Der Stand rückt nur vor, wenn sich dieser Text ändert.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="active" defaultChecked={haendler?.active ?? true} />
            Aktiv — erscheint im Kundenradar
          </label>
          <label className="flex items-center gap-2 text-sm">
            Reihenfolge
            <input
              type="number" name="sort_order" defaultValue={haendler?.sort_order ?? 0}
              className={`${feld} w-24`}
            />
          </label>
        </div>
      </fieldset>

      {fehler && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {fehler}
        </p>
      )}

      <div className="flex items-center gap-2">
        <Button type="button" onClick={absenden} disabled={isPending || !name.trim() || !land}>
          Speichern
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isPending}>
          Abbrechen
        </Button>
      </div>
    </form>
  )
}

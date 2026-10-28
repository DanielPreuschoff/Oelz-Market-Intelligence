'use client'

/**
 * Formular für ein Kundensignal — anlegen und ändern in einem.
 *
 * Muster: risikosignal-form.tsx. Die Hürde wird benannt, nicht nur erzwungen:
 * Unter dem Formular steht live, was zum Veröffentlichen noch fehlt. Der CHECK
 * in Migration 019 ist die Durchsetzung, diese Zeile die Erklärung.
 *
 * Titel und Kurzzeile zählen ihre Zeichen mit. Die Grenzen sind Vorgabe, keine
 * Sperre — die Zahl mahnt, das Speichern verhindert sie nicht.
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  KURZZEILE_MAX,
  SIGNALTYPEN,
  SIGNALTYP_ERKLAERUNG,
  SIGNALTYP_NAME,
  TITEL_MAX,
  haendlerKurzname,
  missingForPublish,
  type Haendler,
  type Kundensignal,
  type Signaltyp,
} from '@/types/kundenradar'

const feld =
  'w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'
const beschriftung = 'block text-sm font-medium mb-1.5'

function Zaehler({ n, max }: { n: number; max: number }) {
  return (
    <p className={cn('mt-1 text-xs tabular-nums', n > max ? 'text-amber-700' : 'text-muted-foreground')}>
      {n} / {max} Zeichen{n > max && ' — bitte kürzen'}
    </p>
  )
}

export function KundensignalForm({
  signal,
  haendler,
  vorauswahl,
  onSpeichern,
}: {
  signal?: Kundensignal
  haendler: Pick<Haendler, 'id' | 'name' | 'country'>[]
  /** Händler-ID aus `?haendler=` — „Neues Signal" aus der Händlerzeile. */
  vorauswahl?: string
  onSpeichern: (id: string | null, fd: FormData) => Promise<void>
}) {
  const router = useRouter()
  const [fehler, setFehler] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Gespiegelt wird nur, was die Fehlt-Zeile und die Zähler brauchen.
  const [retailerId, setRetailerId] = useState(signal?.retailer_id ?? vorauswahl ?? '')
  const [typ, setTyp] = useState<Signaltyp>(signal?.signal_type ?? 'strategie')
  const [title, setTitle] = useState(signal?.title ?? '')
  const [teaser, setTeaser] = useState(signal?.teaser ?? '')
  const [situation, setSituation] = useState(signal?.situation ?? '')
  const [quelleUrl, setQuelleUrl] = useState(signal?.source_url ?? '')
  const [quelleDatum, setQuelleDatum] = useState(signal?.source_date ?? '')
  const [fuerOelz, setFuerOelz] = useState(signal?.oelz_relevance ?? '')

  const fehlt = missingForPublish({
    retailer_id: retailerId || undefined,
    title,
    teaser: teaser || null,
    situation: situation || null,
    oelz_relevance: fuerOelz || null,
    source_url: quelleUrl || null,
    source_date: quelleDatum || null,
  })

  function absenden(absicht: 'entwurf' | 'veroeffentlichen') {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const form = e.currentTarget.form
      if (!form) return
      const fd = new FormData(form)
      fd.set('absicht', absicht)
      setFehler(null)
      startTransition(async () => {
        try {
          await onSpeichern(signal?.id ?? null, fd)
        } catch (err) {
          const m = err instanceof Error ? err.message : 'Speichern fehlgeschlagen.'
          if (m.includes('NEXT_REDIRECT')) return
          setFehler(m)
        }
      })
    }
  }

  return (
    <form className="space-y-6 max-w-2xl">
      {/* -------------------------------------------- Händler und Typ */}
      <fieldset className="space-y-4" disabled={isPending}>
        <div>
          <label htmlFor="retailer_id" className={beschriftung}>Händler</label>
          <select
            id="retailer_id" name="retailer_id" required value={retailerId}
            onChange={(e) => setRetailerId(e.target.value)} className={feld}
          >
            <option value="">— wählen —</option>
            {haendler.map((h) => (
              <option key={h.id} value={h.id}>{haendlerKurzname(h)}</option>
            ))}
          </select>
        </div>

        <div>
          <span className={beschriftung}>Typ</span>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {SIGNALTYPEN.map((t) => (
              <label
                key={t}
                className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:bg-secondary/60 has-checked:border-oelz-orange has-checked:bg-oelz-orange/5"
              >
                <input
                  type="radio" name="signal_type" value={t} checked={typ === t}
                  onChange={() => setTyp(t)} className="mt-0.5"
                />
                <span className="text-sm">
                  <span className="font-medium">{SIGNALTYP_NAME[t]}</span>
                  <span className="block text-xs text-muted-foreground">{SIGNALTYP_ERKLAERUNG[t]}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* ---------------------------------------------------- Zone Befund */}
      <fieldset className="space-y-4" disabled={isPending}>
        <legend className="dachzeile mb-2">Befund · was die Quelle sagt</legend>

        <div>
          <label htmlFor="title" className={beschriftung}>
            Titel <span className="font-normal text-muted-foreground">— was der Händler tut, als Schlagzeile</span>
          </label>
          <input
            id="title" name="title" required value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Kaufland Slowakei baut SB-Backstationen in allen Filialen aus"
            className={feld}
          />
          <Zaehler n={title.length} max={TITEL_MAX} />
        </div>

        <div>
          <label htmlFor="teaser" className={beschriftung}>
            Kurzzeile{' '}
            <span className="font-normal text-muted-foreground">
              — sagt etwas anderes als der Titel: die konkreteste Zahl oder Frist
            </span>
          </label>
          <input
            id="teaser" name="teaser" value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            placeholder="Umbau von 70 Filialen bis Mitte 2027, Brotregal wird verkleinert"
            className={feld}
          />
          <Zaehler n={teaser.length} max={KURZZEILE_MAX} />
        </div>

        <div>
          <label htmlFor="situation" className={beschriftung}>
            Sachverhalt <span className="font-normal text-muted-foreground">— zwei bis vier Sätze, nur was in der Quelle steht</span>
          </label>
          <textarea
            id="situation" name="situation" rows={5} value={situation}
            onChange={(e) => setSituation(e.target.value)} className={feld}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
          <div>
            <label htmlFor="source_name" className={beschriftung}>Quelle</label>
            <input
              id="source_name" name="source_name" defaultValue={signal?.source_name ?? ''}
              placeholder="Tovar & Predaj" className={feld}
            />
          </div>
          <div>
            <label htmlFor="source_url" className={beschriftung}>URL</label>
            <input
              id="source_url" name="source_url" type="url" value={quelleUrl}
              onChange={(e) => setQuelleUrl(e.target.value)} className={feld}
            />
          </div>
          <div>
            <label htmlFor="source_date" className={beschriftung}>Datum</label>
            <input
              id="source_date" name="source_date" type="date" value={quelleDatum}
              onChange={(e) => setQuelleDatum(e.target.value)} className={feld}
            />
          </div>
        </div>
        <p className="-mt-2 text-xs text-muted-foreground">
          Fachpresse, Wirtschaftspresse oder der Händler selbst — die URL einmal aufgerufen haben.
        </p>
      </fieldset>

      {/* ----------------------------------------------- Zone Einschätzung */}
      <fieldset className="space-y-4 border-l-2 border-oelz-orange/40 pl-4" disabled={isPending}>
        <legend className="dachzeile mb-2">Einschätzung · redaktionell</legend>

        <div>
          <label htmlFor="oelz_relevance" className={beschriftung}>
            Für Ölz{' '}
            <span className="font-normal text-muted-foreground">
              — ein bis zwei Sätze, im Konjunktiv. Ohne ihn keine Veröffentlichung
            </span>
          </label>
          <textarea
            id="oelz_relevance" name="oelz_relevance" rows={3} value={fuerOelz}
            onChange={(e) => setFuerOelz(e.target.value)} className={feld}
            placeholder="Für Ölz könnten Teiglinge für die Backstation das bessere Gesprächsangebot sein als neue Sorten fürs Brotregal."
          />
        </div>

        <label className="flex items-start gap-2.5 text-sm">
          <input
            type="checkbox" name="contact_trigger" defaultChecked={signal?.contact_trigger ?? false}
            className="mt-0.5"
          />
          <span>
            <span className="font-medium">Anlass für Kundenkontakt</span>
            <span className="block text-xs text-muted-foreground">
              Nur, wenn im Für-Ölz-Satz ein Gesprächsaufhänger steht.
            </span>
          </span>
        </label>
      </fieldset>

      {fehler && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {fehler}
        </p>
      )}

      {fehlt.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Zum Veröffentlichen fehlt noch:{' '}
          <span className="font-medium text-foreground">{fehlt.join(', ')}</span>. Als Entwurf
          lässt sich das Signal jederzeit sichern.
        </p>
      )}

      <div className="flex items-center gap-2">
        <Button type="button" onClick={absenden('veroeffentlichen')} disabled={isPending || fehlt.length > 0}>
          Veröffentlichen
        </Button>
        <Button
          type="button" variant="outline" onClick={absenden('entwurf')}
          disabled={isPending || !retailerId || !title.trim()}
        >
          Als Entwurf sichern
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isPending}>
          Abbrechen
        </Button>
      </div>
    </form>
  )
}

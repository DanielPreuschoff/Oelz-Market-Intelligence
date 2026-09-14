'use client'

/**
 * Formular für ein Risikosignal — anlegen und ändern in einem.
 *
 * Zwei Dinge unterscheiden es vom Rohstoff-Formular:
 *
 * **Die Hürde wird benannt, nicht nur erzwungen.** Unter dem Formular steht
 * live, was zum Veröffentlichen noch fehlt. Der CHECK in der Datenbank ist die
 * Durchsetzung; diese Zeile ist die Erklärung. Ohne sie scheitert das Speichern
 * mit einer Datenbankmeldung, und niemand weiß, an welchem Feld es lag.
 *
 * **Die Stufe trägt ihre Erklärung mit.** Wer den Unterschied zwischen
 * „Behördliche Bewertung" und „Rechtsakt in Arbeit" nicht im Kopf hat, soll ihn
 * nicht nachschlagen müssen — die Auswahl erklärt sich selbst.
 *
 * **Der Typ steuert die Felder** (Migration 016): Stufe und Handlung nur bei
 * „Unter Beobachtung", Produktkategorie bei Beobachtung und Zulassung, der
 * Pflichtsatz „Warum könnte das Ölz betreffen?" nur bei „Indirekt relevant".
 * Was der Typ nicht zeigt, schreibt die Server-Action auch nicht.
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  STUFEN,
  STUFE_NAME,
  STUFE_ERKLAERUNG,
  GELTUNGSBEREICHE,
  GELTUNGSBEREICH_NAME,
  HANDLUNGEN,
  HANDLUNG_NAME,
  BEHOERDEN,
  BEHOERDE_NAME,
  BEHOERDE_ERKLAERUNG,
  PRODUKTKATEGORIEN,
  KURZZEILE_MIN,
  KURZZEILE_MAX,
  EINTRAGSTYPEN,
  EINTRAGSTYP_NAME,
  EINTRAGSTYP_ERKLAERUNG,
  kurzzeileWoerter,
  missingForPublish,
  type Risikosignal,
  type Eintragstyp,
} from '@/types/substance-watch'

const KURZZEILE_BEISPIEL: Record<Eintragstyp, string> = {
  risiko: 'EFSA leitet akute Referenzdosis für Glycerin ab, Backwaren nicht adressiert',
  zulassung: 'EFSA bewertet Steviol-Glykoside aus Fermentation positiv, Kommissionsentwurf folgt',
  indirekt: 'Österreich diskutiert Zuckersteuer auf Limonaden, Ausweitung auf Süßwaren offen',
}

const feld =
  'w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'
const beschriftung = 'block text-sm font-medium mb-1.5'

export function RisikosignalForm({
  signal,
  onSpeichern,
}: {
  signal?: Risikosignal
  onSpeichern: (id: string | null, fd: FormData) => Promise<void>
}) {
  const router = useRouter()
  const [fehler, setFehler] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Spiegelt nur, was für die Fehlt-Zeile gebraucht wird — der Rest steht
  // uncontrolled im Formular und wird beim Absenden gelesen.
  const [kind, setKind] = useState<Eintragstyp>(signal?.kind ?? 'risiko')
  const [stufe, setStufe] = useState<string>(signal?.stage ?? 'bewertung')
  const [warum, setWarum] = useState(signal?.why_relevant ?? '')
  const [substance, setSubstance] = useState(signal?.substance ?? '')
  const [teaser, setTeaser] = useState(signal?.teaser ?? '')
  const [behoerde, setBehoerde] = useState<string>(signal?.authority ?? '')
  const [situation, setSituation] = useState(signal?.situation ?? '')
  const [kategorien, setKategorien] = useState<string[]>(signal?.product_categories ?? [])
  const [handlung, setHandlung] = useState<string>(signal?.action ?? '')
  const [quelleName, setQuelleName] = useState(signal?.source_name ?? '')
  const [quelleUrl, setQuelleUrl] = useState(signal?.source_url ?? '')
  const [quelleDatum, setQuelleDatum] = useState(signal?.source_date ?? '')

  const woerter = kurzzeileWoerter(teaser)
  const woerterOk = woerter >= KURZZEILE_MIN && woerter <= KURZZEILE_MAX

  const fehlt = missingForPublish({
    kind,
    substance,
    teaser: teaser || null,
    authority: behoerde ? (behoerde as Risikosignal['authority']) : null,
    stage: kind === 'risiko' && stufe ? (stufe as Risikosignal['stage']) : null,
    situation,
    why_relevant: warum || null,
    product_categories: kategorien,
    action: handlung ? (handlung as Risikosignal['action']) : null,
    source_name: quelleName || null,
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
          // Der redirect nach dem Speichern wirft eine Kontrollausnahme, die
          // hier nicht als Fehler erscheinen darf.
          const m = err instanceof Error ? err.message : 'Speichern fehlgeschlagen.'
          if (m.includes('NEXT_REDIRECT')) return
          setFehler(m)
        }
      })
    }
  }

  return (
    <form className="space-y-6 max-w-2xl">
      {/* ------------------------------------------------------- Typ */}
      <fieldset className="space-y-2" disabled={isPending}>
        <legend className="dachzeile mb-2">Art des Eintrags</legend>
        <div className="grid gap-1.5 sm:grid-cols-3">
          {EINTRAGSTYPEN.map((t) => (
            <label
              key={t}
              className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:bg-secondary/60 has-checked:border-oelz-orange has-checked:bg-oelz-orange/5"
            >
              <input
                type="radio" name="kind" value={t} checked={kind === t}
                onChange={() => setKind(t)} className="mt-0.5"
              />
              <span className="text-sm">
                <span className="font-medium">{EINTRAGSTYP_NAME[t]}</span>
                <span className="block text-xs text-muted-foreground">{EINTRAGSTYP_ERKLAERUNG[t]}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ---------------------------------------------------- Zone Befund */}
      <fieldset className="space-y-4" disabled={isPending}>
        <legend className="dachzeile mb-2">Befund · was gemeldet wurde</legend>

        {/* Die Kurzzeile steht zuerst, weil sie das ist, was auf der Karte
            steht: Wer sie nicht in einem Satz sagen kann, hat den Fall noch
            nicht verstanden. Sieben bis elf Wörter sind Vorgabe, keine Sperre —
            die Zahl mahnt, das Speichern verhindert sie nicht. */}
        <div>
          <label htmlFor="teaser" className={beschriftung}>
            Kurzzeile{' '}
            <span className="font-normal text-muted-foreground">
              — was passiert gerade, in {KURZZEILE_MIN} bis {KURZZEILE_MAX} Wörtern
            </span>
          </label>
          <input
            id="teaser" name="teaser" required value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            placeholder={KURZZEILE_BEISPIEL[kind]}
            className={feld}
          />
          <p className={cn('mt-1 text-xs tabular-nums', woerter === 0 ? 'text-muted-foreground' : woerterOk ? 'text-muted-foreground' : 'text-amber-700')}>
            {woerter} {woerter === 1 ? 'Wort' : 'Wörter'}
            {woerter > 0 && !woerterOk && ` — Vorgabe ${KURZZEILE_MIN} bis ${KURZZEILE_MAX}`}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <div>
            <label htmlFor="substance" className={beschriftung}>
              Stoff{' '}
              {kind === 'indirekt' && <span className="font-normal text-muted-foreground">optional</span>}
            </label>
            <input
              id="substance" name="substance" required={kind !== 'indirekt'} value={substance}
              onChange={(e) => setSubstance(e.target.value)}
              placeholder="Glycerin (Glycerol)" className={feld}
            />
          </div>
          <div>
            <label htmlFor="e_number" className={beschriftung}>
              E-Nummer <span className="font-normal text-muted-foreground">optional</span>
            </label>
            <input
              id="e_number" name="e_number" defaultValue={signal?.e_number ?? ''}
              placeholder="E 422" className={feld}
            />
          </div>
        </div>

        {kind === 'risiko' && (
        <div>
          <span className={beschriftung}>Stufe</span>
          <div className="space-y-1.5">
            {STUFEN.map((st) => (
              <label
                key={st}
                className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:bg-secondary/60 has-checked:border-oelz-orange has-checked:bg-oelz-orange/5"
              >
                <input
                  type="radio" name="stage" value={st} required
                  checked={stufe === st}
                  onChange={() => setStufe(st)}
                  className="mt-0.5"
                />
                <span className="text-sm">
                  <span className="font-medium">{STUFE_NAME[st]}</span>
                  <span className="block text-xs text-muted-foreground">{STUFE_ERKLAERUNG[st]}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="authority" className={beschriftung}>Behörde</label>
            <select
              id="authority" name="authority" value={behoerde}
              onChange={(e) => setBehoerde(e.target.value)} className={feld}
            >
              <option value="">— wählen —</option>
              {BEHOERDEN.map((b) => (
                <option key={b} value={b}>{BEHOERDE_NAME[b]}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              {behoerde
                ? BEHOERDE_ERKLAERUNG[behoerde as (typeof BEHOERDEN)[number]]
                : 'Wer die Meldung verantwortet — nach ihr lässt sich filtern.'}
            </p>
          </div>
          <div>
            <label htmlFor="scope" className={beschriftung}>
              Geltungsbereich{' '}
              <span className="font-normal text-muted-foreground">— DE ist Frühindikator für AT</span>
            </label>
            <select id="scope" name="scope" defaultValue={signal?.scope ?? 'EU'} className={feld}>
              {GELTUNGSBEREICHE.map((g) => (
                <option key={g} value={g}>{GELTUNGSBEREICH_NAME[g]}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="situation" className={beschriftung}>
            Was der Fall ist{' '}
            <span className="font-normal text-muted-foreground">
              — zwei bis vier Sätze. Liegt der Anlass außerhalb der Backwaren, hier benennen
            </span>
          </label>
          <textarea
            id="situation" name="situation" rows={6} required value={situation}
            onChange={(e) => setSituation(e.target.value)} className={feld}
          />
        </div>

        {kind === 'indirekt' && (
          <div>
            <label htmlFor="why_relevant" className={beschriftung}>
              Warum könnte das Ölz betreffen?{' '}
              <span className="font-normal text-muted-foreground">
                — ein Satz, Pflicht. Wer ihn nicht formulieren kann, hat keinen Eintrag
              </span>
            </label>
            <textarea
              id="why_relevant" name="why_relevant" rows={2} required value={warum}
              onChange={(e) => setWarum(e.target.value)} className={feld}
              placeholder="Die Debatte greift bereits auf zuckerfreie Limonaden über — Süßwaren und Feingebäck könnten die nächste Stufe sein."
            />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
          <div>
            <label htmlFor="source_name" className={beschriftung}>Quelle</label>
            <input
              id="source_name" name="source_name" value={quelleName}
              onChange={(e) => setQuelleName(e.target.value)}
              placeholder="BfR, Stellungnahme 030/2026" className={feld}
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
          Amtliche Primärquelle — BfR, EFSA, AGES, EUR-Lex. Fachpresse nur, wo es keine
          Behördenquelle gibt (Stufe „Öffentliche Kritik“).
        </p>
      </fieldset>

      {/* ----------------------------------------------- Zone Einschätzung */}
      {kind !== 'indirekt' && (
      <fieldset className="space-y-4 border-l-2 border-oelz-orange/40 pl-4" disabled={isPending}>
        <legend className="dachzeile mb-2">Einschätzung · redaktionell</legend>

        <div>
          <span className={beschriftung}>
            {kind === 'zulassung' ? 'Wo Ölz den Stoff einsetzen könnte' : 'Betroffene Produktkategorie'}{' '}
            <span className="font-normal text-muted-foreground">
              {kind === 'zulassung'
                ? '— mindestens eine; passt keine, ist es „Indirekt relevant"'
                : '— mindestens eine, sonst keine Veröffentlichung'}
            </span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRODUKTKATEGORIEN.map((k) => {
              const an = kategorien.includes(k)
              return (
                <label
                  key={k}
                  className={cn(
                    'cursor-pointer rounded-full border px-2.5 py-1 text-xs transition-colors',
                    an ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary'
                  )}
                >
                  <input
                    type="checkbox" name="product_categories" value={k} checked={an}
                    onChange={(e) =>
                      setKategorien((v) => (e.target.checked ? [...v, k] : v.filter((x) => x !== k)))
                    }
                    className="sr-only"
                  />
                  {k}
                </label>
              )
            })}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Nicht „setzen wir den Stoff ein“ — das weiß die Plattform nicht. Sondern: Welche
            Kategorie würde der Stoff berühren?
          </p>
        </div>

        {kind === 'risiko' && (
        <div>
          <label htmlFor="action" className={beschriftung}>Handlung</label>
          <select
            id="action" name="action" value={handlung}
            onChange={(e) => setHandlung(e.target.value)} className={feld}
          >
            <option value="">— wählen —</option>
            {HANDLUNGEN.map((h) => (
              <option key={h} value={h}>{HANDLUNG_NAME[h]}</option>
            ))}
          </select>
        </div>
        )}
      </fieldset>
      )}

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
        <Button type="button" variant="outline" onClick={absenden('entwurf')} disabled={isPending}>
          Als Entwurf sichern
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isPending}>
          Abbrechen
        </Button>
      </div>
    </form>
  )
}

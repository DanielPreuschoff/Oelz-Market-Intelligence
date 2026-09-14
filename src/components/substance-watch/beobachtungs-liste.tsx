/**
 * Die Liste der Risikosignale („Unter Beobachtung") im Regulatorik-Radar:
 * Stufen-Erklärung, zwei Filterreihen, dann die Karten.
 *
 * Spec: docs/unter-beobachtung-spec.md (Nachtrag 14.09.2026)
 * Umzug aus dem Rohstoff-Radar: docs/adr/0006-regulatorik-radar-eigenes-modul.md
 *
 * Server-Komponente: Die Filter sind Links, die die Seite baut (`baueUrl`).
 * Karten und Detail-Dialog leben in `RisikoKarten` (Client), weil der
 * Dialog Zustand braucht — und eine Funktion wie `baueUrl` lässt sich nicht
 * an eine Client-Komponente reichen.
 *
 * Zwei Filter: **Kategorie** (die fünf Ölz-Kategorien, seit dem Reiter) und
 * **Behörde** (EFSA · EU-Kommission · National · Keine) — Kai Heubergers
 * wörtlicher Wunsch, „die Filter um EFSA und EU Regulation zu erweitern".
 * Kein Stufenfilter: Die Stufe steht als Chip auf jeder Karte und sortiert
 * die Liste; ein Filter brächte wenig dazu.
 */

import { cn } from '@/lib/utils'
import {
  STUFEN,
  STUFE_NAME,
  STUFE_ERKLAERUNG,
  STUFE_RANG,
  BEHOERDEN,
  BEHOERDE_NAME,
  type Risikosignal,
} from '@/types/substance-watch'
import { RisikoKarten } from './risiko-karten'

function Filterreihe({
  label,
  optionen,
  aktiv,
  href,
}: {
  label: string
  optionen: readonly { key: string; name: string }[]
  aktiv?: string
  href: (key: string) => string
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="w-20 text-xs font-medium text-muted-foreground">{label}</span>
      {optionen.map((o) => (
        <a
          key={o.key}
          href={href(o.key)}
          className={cn(
            'rounded-full border px-2.5 py-1 text-xs transition-colors',
            aktiv === o.key
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border hover:bg-secondary'
          )}
        >
          {o.name}
        </a>
      ))}
    </div>
  )
}

export function BeobachtungsListe({
  signale,
  kategorie,
  behoerde,
  baueUrl,
  kategorien,
  openSignal = null,
}: {
  signale: Risikosignal[]
  kategorie?: string
  behoerde?: string
  baueUrl: (patch: Record<string, string | undefined>) => string
  kategorien: readonly string[]
  openSignal?: Risikosignal | null
}) {
  const aktiv = signale
    .filter((s) => s.status !== 'ausgeraeumt')
    .sort((a, b) => STUFE_RANG[a.stage] - STUFE_RANG[b.stage] || a.substance.localeCompare(b.substance, 'de'))
  const erledigt = signale.filter((s) => s.status === 'ausgeraeumt')
  const hatFilter = !!(kategorie || behoerde)

  if (signale.length === 0 && !hatFilter) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border py-12 text-center text-sm text-muted-foreground">
        <p className="font-medium">Kein Stoff unter Beobachtung</p>
        <p className="mt-1 text-xs">
          Hier stehen Stoffe, die unter regulatorischem oder öffentlichem Druck stehen.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Was die vier Stufen bedeuten — eine stille Zeile statt eines
          Hilfe-Symbols. Die Frage stellt sich beim ersten Blick; wer sie
          beantwortet hat, liest darüber hinweg. */}
      <p className="text-[11px] leading-relaxed text-muted-foreground/80">
        {STUFEN.map((st) => `${STUFE_NAME[st]}: ${STUFE_ERKLAERUNG[st]}`).join('  ·  ')}
      </p>

      <div className="space-y-2">
        <Filterreihe
          label="Kategorie"
          optionen={kategorien.map((k) => ({ key: k, name: k }))}
          aktiv={kategorie}
          href={(k) => baueUrl({ kategorie: kategorie === k ? undefined : k })}
        />
        <Filterreihe
          label="Behörde"
          optionen={BEHOERDEN.map((b) => ({ key: b, name: BEHOERDE_NAME[b] }))}
          aktiv={behoerde}
          href={(b) => baueUrl({ behoerde: behoerde === b ? undefined : b })}
        />
        {hatFilter && (
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-xs text-muted-foreground">
              {aktiv.length} {aktiv.length === 1 ? 'Fall' : 'Fälle'}
              {erledigt.length > 0 && ` · ${erledigt.length} ausgeräumt`}
            </span>
            <a
              href={baueUrl({ kategorie: undefined, behoerde: undefined })}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Alle Filter zurücksetzen
            </a>
          </div>
        )}
      </div>

      <RisikoKarten aktiv={aktiv} erledigt={erledigt} openSignal={openSignal} />
    </div>
  )
}

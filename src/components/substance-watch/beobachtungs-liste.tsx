/**
 * Die Liste des Regulatorik-Radars: Stufen-Erklärung, drei Filterreihen,
 * dann die Karten nach Typ.
 *
 * Spec: docs/unter-beobachtung-spec.md (Nachträge 14.09.2026)
 * Umzug aus dem Rohstoff-Radar: docs/adr/0006-regulatorik-radar-eigenes-modul.md
 *
 * Server-Komponente: Die Filter sind Links, die die Seite baut (`baueUrl`).
 * Karten und Detail-Dialog leben in `RisikoKarten` (Client), weil der
 * Dialog Zustand braucht — und eine Funktion wie `baueUrl` lässt sich nicht
 * an eine Client-Komponente reichen.
 *
 * Drei Filter: **Typ** (Unter Beobachtung · Zulassung · Indirekt relevant),
 * **Behörde** (EFSA · EU-Kommission · National · Keine — Kai Heubergers
 * wörtlicher Wunsch) und **Kategorie** (die fünf Ölz-Kategorien). Kein
 * Stufenfilter: Die Stufe steht als Chip auf jeder Risikokarte und sortiert
 * den Abschnitt; ein Filter brächte wenig dazu.
 */

import { cn } from '@/lib/utils'
import {
  STUFEN,
  STUFE_NAME,
  STUFE_ERKLAERUNG,
  BEHOERDEN,
  BEHOERDE_NAME,
  EINTRAGSTYPEN,
  EINTRAGSTYP_NAME,
  vergleicheEintraege,
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
  typ,
  kategorie,
  behoerde,
  baueUrl,
  kategorien,
  openSignal = null,
}: {
  signale: Risikosignal[]
  typ?: string
  kategorie?: string
  behoerde?: string
  baueUrl: (patch: Record<string, string | undefined>) => string
  kategorien: readonly string[]
  openSignal?: Risikosignal | null
}) {
  const offen = signale.filter((s) => s.status !== 'ausgeraeumt').sort(vergleicheEintraege)
  const risiko = offen.filter((s) => s.kind === 'risiko')
  const zulassung = offen.filter((s) => s.kind === 'zulassung')
  const indirekt = offen.filter((s) => s.kind === 'indirekt')
  const erledigt = signale.filter((s) => s.status === 'ausgeraeumt').sort(vergleicheEintraege)
  const hatFilter = !!(typ || kategorie || behoerde)

  if (signale.length === 0 && !hatFilter) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border py-12 text-center text-sm text-muted-foreground">
        <p className="font-medium">Noch kein Eintrag</p>
        <p className="mt-1 text-xs">
          Hier stehen Zulassungen und Stoffe unter regulatorischem oder öffentlichem Druck.
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
          label="Typ"
          optionen={EINTRAGSTYPEN.map((t) => ({ key: t, name: EINTRAGSTYP_NAME[t] }))}
          aktiv={typ}
          href={(t) => baueUrl({ typ: typ === t ? undefined : t })}
        />
        <Filterreihe
          label="Behörde"
          optionen={BEHOERDEN.map((b) => ({ key: b, name: BEHOERDE_NAME[b] }))}
          aktiv={behoerde}
          href={(b) => baueUrl({ behoerde: behoerde === b ? undefined : b })}
        />
        <Filterreihe
          label="Kategorie"
          optionen={kategorien.map((k) => ({ key: k, name: k }))}
          aktiv={kategorie}
          href={(k) => baueUrl({ kategorie: kategorie === k ? undefined : k })}
        />
        {hatFilter && (
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-xs text-muted-foreground">
              {offen.length} {offen.length === 1 ? 'Fall' : 'Fälle'}
              {erledigt.length > 0 && ` · ${erledigt.length} erledigt`}
            </span>
            <a
              href={baueUrl({ typ: undefined, kategorie: undefined, behoerde: undefined })}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Alle Filter zurücksetzen
            </a>
          </div>
        )}
      </div>

      <RisikoKarten
        risiko={risiko}
        zulassung={zulassung}
        indirekt={indirekt}
        erledigt={erledigt}
        openSignal={openSignal}
      />
    </div>
  )
}

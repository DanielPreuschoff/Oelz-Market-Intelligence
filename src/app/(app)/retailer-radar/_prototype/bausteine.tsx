// PROTOTYP — Wegwerfcode. Gemeinsame Bausteine der drei Varianten.
// Bewusst geteilt: Kachel, KPI, Positionsring, Preisleiter, Baum, Ereignisliste,
// Sparkline, Händler-Detail. NICHT geteilt: das Layout der Einstiegsseite —
// das ist die Frage, die der Prototyp beantwortet.

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  ALLE_KENNZAHLEN, EREIGNIS_NAME, HERKUNFT_NAME, KATEGORIE_NAME, LAUF_ISTS, LAUF_VOR, MELDUNG_KATEGORIE_NAME,
  fmtPct, fmtPreis, inEur, kgPreis, preisleiter,
  type Ereignis, type HaendlerKennzahlen, type HaendlerMeldung, type Herkunft, type Listung, type Produktkategorie, type Zugang,
} from './modell'

// ------------------------------------------------------------ Farben je Herkunft
export const HERKUNFT_FARBE: Record<Herkunft, string> = {
  oelz: 'bg-oelz-orange',
  eigenmarke: 'bg-oelz-braun/70',
  fremdmarke: 'bg-stone-400',
  unbekannt: 'bg-stone-200',
}
export const HERKUNFT_TEXT: Record<Herkunft, string> = {
  oelz: 'text-oelz-orange-text',
  eigenmarke: 'text-oelz-braun',
  fremdmarke: 'text-stone-600',
  unbekannt: 'text-stone-400',
}

export function Zugangsplakette({ zugang, quelle }: { zugang: Zugang; quelle?: string }) {
  const map: Record<Zugang, { t: string; c: string }> = {
    frei: { t: 'frei', c: 'bg-emerald-100 text-emerald-800' },
    browser: { t: 'per Browser', c: 'bg-amber-100 text-amber-800' },
    freigabe: { t: 'nach Freigabe', c: 'bg-orange-100 text-orange-800' },
    gesperrt: { t: 'gesperrt', c: 'bg-red-100 text-red-800' },
    keine: { t: 'keine', c: 'bg-stone-100 text-stone-500' },
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px]">
      <span className={cn('px-1.5 py-0.5 rounded font-medium', map[zugang].c)}>{map[zugang].t}</span>
      {quelle && <span className="text-muted-foreground truncate max-w-[14rem]">{quelle}</span>}
    </span>
  )
}

export function Kundenplakette({ status }: { status: 'kunde' | 'kein_kunde' | 'unbekannt' }) {
  if (status === 'kunde') return <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-oelz-orange text-oelz-on-orange">Kunde</span>
  if (status === 'kein_kunde') return <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-stone-200 text-stone-600">kein Kunde</span>
  return <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border border-dashed border-border text-muted-foreground">Kundenstatus offen</span>
}

// ------------------------------------------------------------ KPI
export function Kpi({ label, wert, delta, hinweis, klein }: { label: string; wert: string; delta?: string | null; hinweis?: string; klein?: boolean }) {
  return (
    <div className={cn('rounded-lg border border-border bg-card', klein ? 'px-3 py-2' : 'px-4 py-3')}>
      <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className={cn('font-display font-bold text-foreground', klein ? 'text-lg' : 'text-2xl')}>{wert}</p>
        {delta && <p className={cn('text-xs font-medium', delta.startsWith('+') ? 'text-emerald-700' : delta.startsWith('−') || delta.startsWith('-') ? 'text-red-700' : 'text-muted-foreground')}>{delta}</p>}
      </div>
      {hinweis && <p className="text-[11px] text-muted-foreground mt-0.5">{hinweis}</p>}
    </div>
  )
}

// ------------------------------------------------------------ Positionsring (Ölz vs. Eigenmarke)
export function Positionsring({ pk, groesse = 64 }: { pk: NonNullable<HaendlerKennzahlen['positionsklassen']>; groesse?: number }) {
  const n = pk.guenstiger + pk.gleich + pk.teurer || 1
  const teile = [
    ['guenstiger', pk.guenstiger, 'var(--oelz-braun)'],
    ['gleich', pk.gleich, 'oklch(0.85 0.03 60)'],
    ['teurer', pk.teurer, 'var(--oelz-orange)'],
  ] as const
  const r = 15.9155
  let offset = 25
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 42 42" width={groesse} height={groesse} aria-hidden>
        <circle cx="21" cy="21" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        {teile.map(([k, v, farbe]) => {
          const pct = (v / n) * 100
          const el = <circle key={k} cx="21" cy="21" r={r} fill="none" stroke={farbe} strokeWidth="6" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={offset} />
          offset -= pct
          return el
        })}
      </svg>
      <div className="text-[11px] leading-tight space-y-0.5">
        <p><span className="inline-block w-2 h-2 rounded-full bg-oelz-braun mr-1" />{pk.guenstiger} günstiger als EM</p>
        <p><span className="inline-block w-2 h-2 rounded-full bg-[oklch(0.85_0.03_60)] mr-1" />{pk.gleich} gleich (±5 %)</p>
        <p><span className="inline-block w-2 h-2 rounded-full bg-oelz-orange mr-1" />{pk.teurer} teurer</p>
      </div>
    </div>
  )
}

// ------------------------------------------------------------ Händler-Kachel
// Bewusst schlank: zwei Kennzahlen, kein Positionsring. Auf der Übersicht
// entscheidet man „bin ich drin" und „wie teuer bin ich" — alles Weitere ist
// eine Ebene tiefer. Zehn Kacheln mit je vier Kennzahlen und einem Ring waren
// der Grund, warum die Seite erdrückend wirkte (146 Textelemente über der Falz).
export function HaendlerKachel({ k, href }: { k: HaendlerKennzahlen; href: string }) {
  const h = k.haendler
  const dOelz = k.oelz - k.oelzVorher
  const delta = dOelz === 0 ? '±0' : dOelz > 0 ? `+${dOelz}` : `−${Math.abs(dOelz)}`
  return (
    <Link href={href} className="block rounded-xl border border-border bg-card hover:border-oelz-orange/60 transition-colors p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display font-bold text-foreground leading-tight truncate">
            {h.kette.split(' (')[0]} <span className="text-muted-foreground font-normal">/ {h.land}</span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {k.artikel} {h.stichprobe ? 'Artikel (Stichprobe)' : h.nurAktionen ? 'Aktionsartikel' : 'Backwaren-Artikel'}
          </p>
        </div>
        <Kundenplakette status={h.kundenstatus} />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Ölz-Artikel</p>
          <p className="font-display font-bold text-2xl leading-tight">
            {k.oelz}{' '}
            <span className={cn('text-xs font-medium', dOelz > 0 ? 'text-emerald-700' : dOelz < 0 ? 'text-red-700' : 'text-muted-foreground')}>{delta}</span>
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Abstand zur Eigenmarke</p>
          <p className="font-display font-bold text-2xl leading-tight">
            {k.abstandOelzEm != null ? `${k.abstandOelzEm > 0 ? '+' : ''}${k.abstandOelzEm} %` : <span className="text-muted-foreground text-lg">–</span>}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/60 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span><span className="font-bold text-foreground">{k.ereignisse.length}</span> Ereignisse</span>
        {h.meldungen.length > 0 && <span className="text-oelz-braun">⚑ <span className="font-bold">{h.meldungen.length}</span> Meldung{h.meldungen.length > 1 ? 'en' : ''}</span>}
        {h.stichprobe && <span className="text-amber-700">Stichprobe</span>}
        {h.nurAktionen && <span className="text-sky-700">nur Aktionen</span>}
      </div>
    </Link>
  )
}

// ------------------------------------------------------------ Händler-Zeile (ohne Lauf)
// Händler ohne Daten belegten als Kacheln 48 % der Fläche der Übersicht, ohne
// Information zu tragen. Die Lücke muss sichtbar bleiben — sie ist das
// Argument für die Freigabe-Gespräche — aber sie braucht eine Zeile, keine Kachel.
export function HaendlerZeile({ k, href }: { k: HaendlerKennzahlen; href: string }) {
  const h = k.haendler
  const grund =
    h.vollsortiment.zugang === 'freigabe' ? 'wartet auf Freigabe'
    : h.vollsortiment.zugang === 'browser' ? 'Adapter folgt'
    : 'kein Vollsortiment online'
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border/70 bg-card/60 hover:border-oelz-orange/50 transition-colors text-xs"
    >
      <Kundenplakette status={h.kundenstatus} />
      <span className="font-medium truncate min-w-0 flex-1">
        {h.kette.split(' (')[0]} <span className="text-muted-foreground font-normal">/ {h.land}</span>
      </span>
      <span className="text-muted-foreground shrink-0 hidden sm:inline">{grund}</span>
      <Zugangsplakette zugang={h.vollsortiment.zugang} />
      {h.meldungen.length > 0 && <span className="text-oelz-braun shrink-0">⚑ {h.meldungen.length}</span>}
    </Link>
  )
}

// ------------------------------------------------------------ Ereignisliste
export function EreignisZeile({ e, mitHaendler }: { e: Ereignis; mitHaendler?: boolean }) {
  const l = e.listung
  const h = ALLE_KENNZAHLEN.find((k) => k.haendler.id === l.haendlerId)!.haendler
  const farbe: Record<string, string> = {
    neue_listung: 'bg-emerald-500', neue_eigenmarke: 'bg-oelz-braun', auslistung: 'bg-red-500', wiederlistung: 'bg-sky-500', preisaenderung: 'bg-amber-500', oelz_aktion: 'bg-oelz-orange',
  }
  return (
    <div className="flex items-start gap-3 py-2 border-b border-border/60 last:border-0">
      <span className={cn('mt-1.5 w-2 h-2 rounded-full shrink-0', farbe[e.typ])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-tight">
          <span className="font-medium">{EREIGNIS_NAME[e.typ]}</span>
          {mitHaendler && <span className="text-muted-foreground"> · {h.kette}/{h.land}</span>}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          <span className={cn('font-medium', HERKUNFT_TEXT[l.herkunft])}>{HERKUNFT_NAME[l.herkunft]}</span> · {l.name}
          {e.typ === 'preisaenderung' && e.vorher != null && e.nachher != null && (
            <> · {fmtPreis(e.vorher, h.waehrung)} → <span className="font-medium text-foreground">{fmtPreis(e.nachher, h.waehrung)}</span> ({fmtPct(e.delta ?? 0)})</>
          )}
          {e.typ === 'oelz_aktion' && e.nachher != null && (
            <> · {e.vorher != null ? `${fmtPreis(e.vorher, h.waehrung)} → ` : ''}<span className="font-medium text-foreground">{fmtPreis(e.nachher, h.waehrung)}</span>{e.delta != null ? ` (${fmtPct(e.delta)})` : ''}</>
          )}
        </p>
      </div>
    </div>
  )
}

// ------------------------------------------------------------ Händler-Meldung
// Meldung, nicht Messung: qualitativ, kuratiert, mit Quelle. Im Prototyp sind
// alle Meldungen erfunden und tragen deshalb sichtbar „Beispiel".
export function MeldungKarte({ m, kette, land, kompakt }: { m: HaendlerMeldung; kette?: string; land?: string; kompakt?: boolean }) {
  return (
    <div className={cn('rounded-lg border border-oelz-braun/25 bg-oelz-braun/[0.04]', kompakt ? 'px-3 py-2' : 'px-4 py-3')}>
      <div className="flex items-center gap-2 flex-wrap text-[10px]">
        <span className="uppercase tracking-wider font-bold text-oelz-braun">Meldung</span>
        <span className="px-1.5 py-0.5 rounded bg-oelz-braun/10 text-oelz-braun font-medium">{MELDUNG_KATEGORIE_NAME[m.kategorie]}</span>
        {kette && <span className="text-muted-foreground">{kette}/{land}</span>}
        <span className="text-muted-foreground">{m.datum}</span>
        {m.beispiel && <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold" title="Erfundene Beispielmeldung — zeigt, wie eine Notiz aus der Fachpresse hier aussähe">Beispiel · erfunden</span>}
      </div>
      <p className={cn('font-display font-bold leading-snug mt-1', kompakt ? 'text-sm' : 'text-base')}>{m.titel}</p>
      {!kompakt && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.zusammenfassung}</p>}
      <p className="text-[11px] text-muted-foreground mt-1">Quelle: {m.quelleUrl ? <a className="underline" href={m.quelleUrl} target="_blank" rel="noopener noreferrer">{m.quelle}</a> : m.quelle} · für {m.rollen.join(', ')}</p>
    </div>
  )
}

// ------------------------------------------------------------ Sparkline (2 Läufe)
/**
 * Zwei-Punkt-Verlauf des **Grundpreises** (€/kg) vom Vorlauf zum aktuellen Lauf.
 *
 * WICHTIG: Solange es nur einen echten Lauf gibt, ist der linke Punkt
 * SIMULIERT. Die Linie ist deshalb gestrichelt und blass — sie zeigt die Form,
 * die die Spalte ab dem zweiten echten Lauf bekommt, nicht eine Messung.
 * Bei Quellen ohne sinnvollen Vorlauf (reine Aktionsquelle, Stichprobe) wird
 * die Spalte gar nicht erst angeboten.
 */
export function Sparkline({ l, waehrung }: { l: Listung; waehrung: 'EUR' | 'CZK' }) {
  const kgV = kgPreis(l, l.vorher)
  const kgJ = kgPreis(l, l.jetzt)
  if (kgV == null || kgJ == null) {
    return <span className="text-[10px] text-muted-foreground italic">{kgV == null ? 'kein Vorlauf' : 'im Lauf fehlend'}</span>
  }
  const max = Math.max(kgV, kgJ) * 1.15
  const min = Math.min(kgV, kgJ) * 0.85
  const y = (x: number) => 18 - ((x - min) / (max - min || 1)) * 14
  const gleich = Math.abs(kgJ - kgV) / kgV < 0.005
  const eur = (x: number) => `${inEur(x, waehrung).toFixed(2).replace('.', ',')} €`
  return (
    <span className="inline-flex items-center gap-1.5 opacity-55" title="Vorlauf simuliert — echte Werte ab dem zweiten Lauf">
      <svg width="44" height="20" viewBox="0 0 44 20" aria-hidden>
        <polyline
          points={`4,${y(kgV)} 40,${y(kgJ)}`}
          fill="none"
          strokeDasharray="3 2"
          stroke={gleich ? 'var(--border)' : kgJ > kgV ? 'oklch(0.55 0.15 25)' : 'oklch(0.55 0.15 150)'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="4" cy={y(kgV)} r="1.8" fill="none" stroke="var(--muted-foreground)" strokeWidth="1" />
        <circle cx="40" cy={y(kgJ)} r="2.5" fill="var(--foreground)" />
      </svg>
      <span className="text-[10px] text-muted-foreground tabular-nums">{eur(kgV)} → {eur(kgJ)}</span>
    </span>
  )
}

// ------------------------------------------------------------ Preisleiter
export function Preisleiter({ k, kategorie }: { k: HaendlerKennzahlen; kategorie: Produktkategorie }) {
  const h = k.haendler
  const stufen = preisleiter(h, kategorie)
  if (!stufen.length) return <p className="text-xs text-muted-foreground">Keine Artikel mit Grundpreis in dieser Kategorie.</p>
  const max = stufen[stufen.length - 1].kg
  return (
    <div className="space-y-1">
      {stufen.map(({ listung: l, kg }) => (
        <div key={l.id} className="flex items-center gap-2 text-[11px]">
          <div className="w-44 truncate text-right text-muted-foreground" title={l.name}>
            <span className={cn('font-medium', HERKUNFT_TEXT[l.herkunft])}>{l.herkunft === 'oelz' ? 'Ölz' : l.herkunft === 'eigenmarke' ? 'EM' : ''}</span> {l.name}
          </div>
          <div className="flex-1 h-3 rounded bg-secondary overflow-hidden">
            <div className={cn('h-full rounded', HERKUNFT_FARBE[l.herkunft], l.herkunft === 'oelz' && 'ring-1 ring-oelz-braun/40')} style={{ width: `${(kg / max) * 100}%` }} />
          </div>
          <div className="w-24 tabular-nums text-right">{fmtPreis(kg, h.waehrung)}<span className="text-muted-foreground">/kg</span></div>
        </div>
      ))}
    </div>
  )
}

// ------------------------------------------------------------ Sortimentsbaum
export function Sortimentsbaum({ k }: { k: HaendlerKennzahlen }) {
  const kats = (Object.keys(KATEGORIE_NAME) as Produktkategorie[])
  const aktiv = k.listungen.filter((l) => l.jetzt)
  const vorher = k.listungen.filter((l) => l.vorher)
  return (
    <div className="space-y-2">
      {kats.map((kat) => {
        const a = aktiv.filter((l) => l.kategorie === kat)
        if (!a.length) return null
        const v = vorher.filter((l) => l.kategorie === kat).length
        const d = a.length - v
        const herk = (['oelz', 'eigenmarke', 'fremdmarke', 'unbekannt'] as Herkunft[]).map((x) => ({ x, n: a.filter((l) => l.herkunft === x).length }))
        return (
          <div key={kat}>
            <div className="flex items-baseline justify-between text-xs">
              <span className="font-medium">{KATEGORIE_NAME[kat]}</span>
              <span className="text-muted-foreground tabular-nums">{a.length} <span className={cn(d > 0 ? 'text-emerald-700' : d < 0 ? 'text-red-700' : '')}>{d === 0 ? '±0' : d > 0 ? `+${d}` : `−${Math.abs(d)}`}</span></span>
            </div>
            <div className="flex h-2.5 rounded overflow-hidden mt-1">
              {herk.filter((x) => x.n).map((x) => <div key={x.x} className={HERKUNFT_FARBE[x.x]} style={{ width: `${(x.n / a.length) * 100}%` }} title={`${HERKUNFT_NAME[x.x]}: ${x.n}`} />)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">{herk.filter((x) => x.n).map((x) => `${HERKUNFT_NAME[x.x]} ${x.n}`).join(' · ')}</p>
          </div>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------ Händler-Detail (geteilt)
export function HaendlerDetail({ k, zurueck }: { k: HaendlerKennzahlen; zurueck: string }) {
  const h = k.haendler
  const oelz = k.listungen.filter((l) => l.herkunft === 'oelz' && (l.jetzt || l.vorher))
  // Ein Verlauf braucht einen Vorlauf, der etwas bedeutet. Bei einer reinen
  // Aktionsquelle (Lidl: Aktionswoche) und bei einer Stichprobe (SPAR) gibt es
  // keinen — dort wird die Spalte gar nicht angeboten.
  const zeigtVerlauf = !h.nurAktionen && !h.stichprobe
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link href={zurueck} className="text-xs text-muted-foreground hover:text-foreground">← Alle Händler</Link>
          <h2 className="font-display text-2xl font-bold mt-1">{h.kette} <span className="text-muted-foreground font-normal">/ {h.land}</span></h2>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <Kundenplakette status={h.kundenstatus} />
            <span className="text-[11px] text-muted-foreground">Vollsortiment</span><Zugangsplakette zugang={h.vollsortiment.zugang} quelle={h.vollsortiment.quelle} />
            <span className="text-[11px] text-muted-foreground">Aktionen</span><Zugangsplakette zugang={h.aktionen.zugang} quelle={h.aktionen.quelle} />
          </div>
        </div>
        {k.hatDaten && (
          <p className="text-xs text-muted-foreground text-right">Stand {LAUF_ISTS} · Vorlauf {LAUF_VOR} (simuliert)
            {h.stichprobe && <><br /><span className="text-amber-700 font-medium">Stichprobe, kein vollständiger Lauf</span></>}
          </p>
        )}
      </div>

      {h.nurAktionen && (
        <div className="rounded-lg border border-sky-300 bg-sky-50 px-4 py-2 text-xs text-sky-900">
          <strong>Reine Aktionsquelle.</strong> {h.notizen[0]?.text}
        </div>
      )}

      {h.stichprobe && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <strong>Einmalige Stichprobe für die Demonstration.</strong> {h.stichprobe} {h.notizen[0]?.text}
        </div>
      )}

      {!k.hatDaten ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Für diesen Händler gibt es noch keinen Lauf. Sobald {h.vollsortiment.zugang === 'freigabe' ? 'die Freigabe vorliegt' : h.vollsortiment.zugang === 'browser' ? 'der Browser-Adapter steht' : 'eine Aktionsquelle angebunden ist'}, erscheinen hier Kennzahlen, Sortiment und Ereignisse.
            {h.notizen.length > 0 && <ul className="mt-3 space-y-1">{h.notizen.map((n) => <li key={n.datum} className="text-xs"><span className="text-muted-foreground">{n.datum} · {n.quelle}:</span> {n.text}</li>)}</ul>}
          </div>
          {h.meldungen.length > 0 && (
            <section className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-display font-bold mb-2">Meldungen aus dem Handel <span className="text-muted-foreground font-normal text-sm">{h.meldungen.length}</span></h3>
              <div className="space-y-2">{h.meldungen.map((m) => <MeldungKarte key={m.datum + m.titel} m={m} />)}</div>
            </section>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            <Kpi label="Backwaren-Artikel" wert={String(k.artikel)} hinweis={`${k.eigenmarke} EM · ${k.fremdmarke} Fremd · ${k.unbekannt} unbek.`} />
            <Kpi label="Ölz-Artikel" wert={String(k.oelz)} delta={k.oelz - k.oelzVorher === 0 ? '±0' : k.oelz - k.oelzVorher > 0 ? `+${k.oelz - k.oelzVorher}` : `−${k.oelzVorher - k.oelz}`} hinweis="vs. Vorlauf" />
            <Kpi label="Anteil Ölz" wert={k.anteilOelz != null ? `${Math.round(k.anteilOelz * 100)} %` : '–'} hinweis={h.stichprobe ? 'in einer Stichprobe nicht messbar' : h.nurAktionen ? 'ohne Dauersortiment nicht messbar' : 'an gelisteten Artikeln'} />
            <Kpi label="Toast €/kg-Index" wert={k.toastIndexOelz != null ? String(k.toastIndexOelz) : '–'} hinweis="Ölz-Median ggü. Kategorie ohne Ölz" />
            <Kpi label="Abstand zu Eigenmarke" wert={k.abstandOelzEm != null ? `${k.abstandOelzEm > 0 ? '+' : ''}${k.abstandOelzEm} %` : '–'} hinweis="Toast, Median €/kg" />
            <Kpi label="Ölz in Aktion" wert={k.aktionsanteilOelz != null ? `${Math.round(k.aktionsanteilOelz * 100)} %` : '–'} hinweis="der Ölz-Artikel" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <section className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h3 className="font-display font-bold">Sortiment nach Produktkategorie</h3>
              <Sortimentsbaum k={k} />
              {k.positionsklassen && <div className="pt-2 border-t border-border"><p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-2">Ölz gegen Eigenmarke (€/kg, je Kategorie)</p><Positionsring pk={k.positionsklassen} /></div>}
            </section>
            <section className="rounded-xl border border-border bg-card p-4 space-y-3 lg:col-span-2">
              <h3 className="font-display font-bold">Preisleiter Toast & Sandwich <span className="text-muted-foreground font-normal text-sm">€/kg, alle Artikel der Kategorie</span></h3>
              <Preisleiter k={k} kategorie="toast" />
            </section>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <section className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-display font-bold mb-1">Zeitleiste <span className="text-muted-foreground font-normal text-sm">{h.meldungen.length} Meldungen · {k.ereignisse.length} Ereignisse aus dem Lauf</span></h3>
              <p className="text-[11px] text-muted-foreground mb-2">Meldungen (was der Händler tut) und berechnete Ereignisse (was der Lauf im Regal sieht) — chronologisch, am selben Händler.</p>
              <div className="max-h-[26rem] overflow-y-auto pr-1 space-y-2">
                {h.meldungen.map((m) => <MeldungKarte key={m.datum + m.titel} m={m} />)}
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-2 mb-1">Lauf {LAUF_ISTS} — Ereignisse gegenüber {LAUF_VOR}</p>
                  {k.ereignisse.slice(0, 60).map((e, i) => <EreignisZeile key={i} e={e} />)}
                </div>
              </div>
            </section>
            <section className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-display font-bold mb-2">Ölz-Artikel bei {h.kette} <span className="text-muted-foreground font-normal text-sm">{oelz.length}</span></h3>
              <table className="w-full text-xs">
                <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr className="text-left">
                    <th className="py-1 font-bold">Artikel</th>
                    <th className="py-1 font-bold text-right">Preis</th>
                    <th className="py-1 font-bold text-right pr-4">€/kg</th>
                    {zeigtVerlauf && (
                      <th className="py-1 font-bold border-l border-border pl-3">
                        €/kg-Verlauf <span className="normal-case font-normal text-amber-700">· Vorlauf simuliert</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {oelz.map((l) => {
                    const kg = kgPreis(l)
                    return (
                      <tr key={l.id} className="border-t border-border/60">
                        <td className="py-1.5 pr-2"><span className="line-clamp-1">{l.name}</span>{l.jetzt?.aktion && <span className="text-[10px] text-oelz-orange-text font-bold">Aktion −{l.jetzt.rabatt} %</span>}{!l.jetzt && <span className="text-[10px] text-red-700 font-bold">im Lauf fehlend</span>}</td>
                        <td className="py-1.5 text-right tabular-nums whitespace-nowrap">{l.jetzt ? fmtPreis(l.jetzt.preis, h.waehrung) : '–'}</td>
                        <td className="py-1.5 text-right tabular-nums whitespace-nowrap pr-4">{kg != null ? `${inEur(kg, h.waehrung).toFixed(2).replace('.', ',')} €` : '–'}</td>
                        {zeigtVerlauf && <td className="py-1.5 border-l border-border pl-3"><Sparkline l={l} waehrung={h.waehrung} /></td>}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          </div>
        </>
      )}
    </div>
  )
}

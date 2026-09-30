import { createClient } from '@/lib/supabase/server'
import { BeobachtungsListe } from '@/components/substance-watch/beobachtungs-liste'
import { PRODUKTKATEGORIEN, BEHOERDEN, EINTRAGSTYPEN, type Risikosignal } from '@/types/substance-watch'

interface PageProps {
  searchParams: Promise<{
    /** Typfilter: risiko · zulassung · indirekt. */
    typ?: string
    /** Kategoriefilter (eine der fünf Ölz-Kategorien). */
    kategorie?: string
    /** Behördenfilter: efsa · bfr · eu_kommission · national · keine. */
    behoerde?: string
    /** Geöffneter Fall — Detail-Dialog, teil- und reloadfest. */
    signal?: string
  }>
}

/**
 * Regulatorik-Radar — eigenes Modul seit 14.09.2026.
 *
 * Bis dahin stand derselbe Inhalt als Reiter „Unter Beobachtung" im
 * Rohstoff-Radar. Warum er umgezogen ist und was dabei verloren geht:
 * docs/adr/0006-regulatorik-radar-eigenes-modul.md.
 *
 * Bis 30.09.2026 nur für Admins, seitdem für alle Angemeldeten freigeschaltet.
 * Die Tabelle `substance_watch` war schon vorher für Angemeldete lesbar
 * (Migration 013) — die Einträge sind öffentliche Behördenmeldungen.
 *
 * Schmale Inhaltsspalte (nicht in BREITE_ROUTEN): Die Karten sind Lesetext,
 * keine Kacheln.
 */
export default async function RegulatorikRadarPage({ searchParams }: PageProps) {
  const { typ: typRoh, kategorie, behoerde: behoerdeRoh, signal: openId } = await searchParams
  // Ein unbekannter Wert im Filter wäre kein Fehler, nur eine leere Liste —
  // deshalb stumm ignorieren.
  const behoerde = (BEHOERDEN as readonly string[]).includes(behoerdeRoh ?? '') ? behoerdeRoh : undefined
  const typ = (EINTRAGSTYPEN as readonly string[]).includes(typRoh ?? '') ? typRoh : undefined
  const supabase = await createClient()

  // Frühere Stände kommen gleich mit (Migration 018), neueste Änderung zuerst.
  const MIT_VERLAUF = '*, verlauf:substance_watch_history(*)'
  const ordneVerlauf = (s: Risikosignal): Risikosignal => ({
    ...s,
    verlauf: [...(s.verlauf ?? [])].sort((a, b) => b.changed_at.localeCompare(a.changed_at)),
  })

  // Rückfall ohne Verlauf, solange Migration 018 nicht eingespielt ist — sonst
  // bliebe das Radar leer, weil die Beziehung unbekannt ist.
  const laden = (felder: string) =>
    supabase.from('substance_watch').select(felder).in('status', ['published', 'ausgeraeumt'])
  const mitVerlauf = await laden(MIT_VERLAUF)
  const data = mitVerlauf.error ? (await laden('*')).data : mitVerlauf.data

  const signale = ((data ?? []) as unknown as Risikosignal[]).map(ordneVerlauf)
  const gefiltert = signale.filter(
    (s) =>
      (!typ || s.kind === typ) &&
      (!kategorie || s.product_categories.includes(kategorie)) &&
      (!behoerde || s.authority === behoerde)
  )

  // Ein geteilter Link muss seinen Fall auch dann öffnen, wenn der aktive
  // Filter ihn ausblendet. Alles Sichtbare ist schon geladen; nur ein
  // Entwurf (für Admins lesbar) bräuchte eine zweite Abfrage.
  let openSignal = openId ? signale.find((s) => s.id === openId) ?? null : null
  if (openId && !openSignal) {
    const einzeln = (felder: string) => supabase.from('substance_watch').select(felder).eq('id', openId).maybeSingle()
    const erster = await einzeln(MIT_VERLAUF)
    const single = erster.error ? (await einzeln('*')).data : erster.data
    openSignal = single ? ordneVerlauf(single as unknown as Risikosignal) : null
  }

  function baueUrl(patch: Record<string, string | undefined>) {
    const merged: Record<string, string | undefined> = { typ, kategorie, behoerde, ...patch }
    const params = new URLSearchParams()
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    const str = params.toString()
    return `/regulatorik-radar${str ? `?${str}` : ''}`
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Regulatorik-Radar</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Zulassungen und regulatorischer Druck auf Rohstoffe und Produkte — aus amtlichen Quellen, bevor
          sie bindend werden.
        </p>
      </div>

      <BeobachtungsListe
        signale={gefiltert}
        typ={typ}
        kategorie={kategorie}
        behoerde={behoerde}
        baueUrl={baueUrl}
        kategorien={PRODUKTKATEGORIEN}
        openSignal={openSignal}
      />
    </div>
  )
}

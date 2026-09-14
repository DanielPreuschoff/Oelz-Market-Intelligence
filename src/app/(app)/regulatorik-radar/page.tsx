import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { BeobachtungsListe } from '@/components/substance-watch/beobachtungs-liste'
import { PRODUKTKATEGORIEN, type Risikosignal } from '@/types/substance-watch'

interface PageProps {
  searchParams: Promise<{
    /** Kategoriefilter der Liste. */
    kategorie?: string
  }>
}

/**
 * Regulatorik-Radar — eigenes Modul seit 14.09.2026.
 *
 * Bis dahin stand derselbe Inhalt als Reiter „Unter Beobachtung" im
 * Rohstoff-Radar. Warum er umgezogen ist und was dabei verloren geht:
 * docs/adr/0006-regulatorik-radar-eigenes-modul.md.
 *
 * Ausrollstufe: `adminOnly` in src/lib/modules.ts blendet das Modul in
 * Navigation und Startseite aus, `notFound()` hier schliesst die Route. Die
 * Tabelle `substance_watch` bleibt für Angemeldete lesbar (Migration 013) —
 * bewusst: Die Einträge sind öffentliche Behördenmeldungen, und so braucht
 * das Freischalten kein SQL, nur das Entfernen von `adminOnly`.
 *
 * Schmale Inhaltsspalte (nicht in BREITE_ROUTEN): Die Karten sind Lesetext,
 * keine Kacheln.
 */
export default async function RegulatorikRadarPage({ searchParams }: PageProps) {
  if (!(await isCurrentUserAdmin())) notFound()

  const { kategorie } = await searchParams
  const supabase = await createClient()

  const { data } = await supabase
    .from('substance_watch')
    .select('*')
    .in('status', ['published', 'ausgeraeumt'])

  const signale = (data ?? []) as unknown as Risikosignal[]
  const gefiltert = kategorie ? signale.filter((s) => s.product_categories.includes(kategorie)) : signale

  function baueUrl(patch: Record<string, string | undefined>) {
    const merged: Record<string, string | undefined> = { kategorie, ...patch }
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
        kategorie={kategorie}
        baueUrl={baueUrl}
        kategorien={PRODUKTKATEGORIEN}
      />
    </div>
  )
}

import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { HaendlerKacheln, type KachelStand } from '@/components/kundenradar/haendler-kacheln'
import { NeuAusErhebung, type NeuEintrag } from '@/components/kundenradar/neu-aus-erhebung'
import { isCollectionRecent, NEW_WINDOW_DAYS } from '@/types/ingredient-signals'
import { haendlerKurzname, type Haendler, type Signaltyp } from '@/types/kundenradar'

type SignalZeile = {
  id: string
  retailer_id: string
  signal_type: Signaltyp
  title: string
  source_date: string | null
  published_at: string | null
  contact_trigger: boolean
}

/**
 * Kundenradar — Übersicht über die Händler.
 *
 * Spec: docs/kundenradar-spec.md, Entscheidung: docs/adr/0007-kundenradar-eigenes-modul.md.
 *
 * Ausrollstufe: nur für Admins, bis der Erstlauf gesichtet ist. `adminOnly`
 * in modules.ts blendet Navigation und Startseite aus; diese Prüfung sperrt
 * die Route selbst. Die Daten sind für Angemeldete lesbar (Migration 019) —
 * Freischalten braucht dann kein SQL.
 *
 * „Neu" folgt der Plattform-Regel (Startseite, Rohstoff-Radar): was mit der
 * letzten Erhebung veröffentlicht wurde, solange diese selbst frisch ist.
 * Nicht am Lesestand — warum, steht in neu-aus-erhebung.tsx.
 */
export default async function KundenradarPage() {
  if (!(await isCurrentUserAdmin())) notFound()

  const supabase = await createClient()
  const [{ data: haendlerRoh }, { data: signaleRoh }] = await Promise.all([
    supabase.from('retailers').select('*').eq('active', true),
    supabase
      .from('retailer_signals')
      .select('id, retailer_id, signal_type, title, source_date, published_at, contact_trigger')
      .eq('status', 'published'),
  ])

  const haendler = (haendlerRoh ?? []) as unknown as Haendler[]
  const signale = (signaleRoh ?? []) as unknown as SignalZeile[]

  // Neu: im 30-Tage-Fenster vor dem Stand des Moduls — und nur, solange der
  // Stand selbst jung ist. Dieselbe Regel wie imFenster() in startseite/daten.ts.
  const veroeffentlicht = signale.map((s) => Date.parse(s.published_at ?? '')).filter(Number.isFinite)
  const standMs = veroeffentlicht.length > 0 ? Math.max(...veroeffentlicht) : null
  const standIso = standMs ? new Date(standMs).toISOString() : null
  const istNeu = (s: SignalZeile) => {
    const ms = Date.parse(s.published_at ?? '')
    if (!Number.isFinite(ms) || standMs === null || !isCollectionRecent(standIso)) return false
    return standMs - ms <= NEW_WINDOW_DAYS * 86_400_000
  }

  const stand = new Map<string, KachelStand>()
  for (const h of haendler) {
    const eigene = signale
      .filter((s) => s.retailer_id === h.id)
      .sort((a, b) => (b.source_date ?? '').localeCompare(a.source_date ?? ''))
    stand.set(h.id, {
      anzahl: eigene.length,
      neu: eigene.filter(istNeu).length,
      juengstes: eigene[0] ? { title: eigene[0].title, source_date: eigene[0].source_date } : null,
    })
  }

  const nachId = new Map(haendler.map((h) => [h.id, h]))
  const neu: NeuEintrag[] = signale
    .filter(istNeu)
    .filter((s) => nachId.has(s.retailer_id))
    .sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? '') || (b.source_date ?? '').localeCompare(a.source_date ?? ''))
    .map((s) => {
      const h = nachId.get(s.retailer_id)!
      return {
        id: s.id,
        title: s.title,
        signal_type: s.signal_type,
        contact_trigger: s.contact_trigger,
        source_date: s.source_date,
        haendler: haendlerKurzname(h),
        slug: h.slug,
      }
    })

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Kundenradar</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Welche Richtung unsere Handelskunden einschlagen — je Händler und Land, mit dem Satz, was
          das für Ölz heißt. Zum Einlesen vor dem Kundengespräch: den Händler öffnen.
        </p>
      </div>

      <NeuAusErhebung eintraege={neu} />

      {haendler.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          <p className="font-medium">Noch kein Händler angelegt</p>
          <p className="mt-1 text-xs">Migration 019 bringt den Startbestand mit.</p>
        </div>
      ) : (
        <HaendlerKacheln haendler={haendler} stand={stand} />
      )}

      <p className="border-t border-border pt-4 text-xs text-muted-foreground">
        Keine Listungen, Preise oder Filialen — das Kundenradar zeigt Entscheidungen der Zentrale,
        die groß genug für die Lebensmittel Zeitung wären.
      </p>
    </div>
  )
}

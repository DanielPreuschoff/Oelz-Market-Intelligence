import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser, isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { HaendlerKacheln, type KachelStand } from '@/components/kundenradar/haendler-kacheln'
import { NeuSeitBesuch, type NeuEintrag } from '@/components/kundenradar/neu-seit-besuch'
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
 * „Ungesehen" folgt derselben Regel wie die Zähler in module-stats.ts: alles,
 * was nach dem letzten Besuch veröffentlicht wurde; ohne Besuch die Signale
 * der letzten Erhebung.
 */
export default async function KundenradarPage() {
  if (!(await isCurrentUserAdmin())) notFound()

  const supabase = await createClient()
  const user = await getCurrentUser()

  const [{ data: haendlerRoh }, { data: signaleRoh }, { data: besuch }] = await Promise.all([
    supabase.from('retailers').select('*').eq('active', true),
    supabase
      .from('retailer_signals')
      .select('id, retailer_id, signal_type, title, source_date, published_at, contact_trigger')
      .eq('status', 'published'),
    user
      ? supabase
          .from('module_visits')
          .select('last_seen_at')
          .eq('user_id', user.id)
          .eq('module_id', 'kunden')
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ])

  const haendler = (haendlerRoh ?? []) as unknown as Haendler[]
  const signale = (signaleRoh ?? []) as unknown as SignalZeile[]
  const zuletzt = (besuch as { last_seen_at?: string } | null)?.last_seen_at ?? null

  // Ungesehen: nach dem letzten Besuch veröffentlicht. Ohne Besuch die
  // Erhebung um den Stand des Moduls, solange sie selbst frisch ist.
  const veroeffentlicht = signale.map((s) => Date.parse(s.published_at ?? '')).filter(Number.isFinite)
  const standMs = veroeffentlicht.length > 0 ? Math.max(...veroeffentlicht) : null
  const standIso = standMs ? new Date(standMs).toISOString() : null
  const ungesehen = (s: SignalZeile) => {
    const ms = Date.parse(s.published_at ?? '')
    if (!Number.isFinite(ms)) return false
    if (zuletzt) return ms > Date.parse(zuletzt)
    return isCollectionRecent(standIso) && standMs !== null && standMs - ms <= NEW_WINDOW_DAYS * 86_400_000
  }

  const stand = new Map<string, KachelStand>()
  for (const h of haendler) {
    const eigene = signale
      .filter((s) => s.retailer_id === h.id)
      .sort((a, b) => (b.source_date ?? '').localeCompare(a.source_date ?? ''))
    stand.set(h.id, {
      anzahl: eigene.length,
      ungesehen: eigene.filter(ungesehen).length,
      juengstes: eigene[0] ? { title: eigene[0].title, source_date: eigene[0].source_date } : null,
    })
  }

  const nachId = new Map(haendler.map((h) => [h.id, h]))
  const neu: NeuEintrag[] = signale
    .filter(ungesehen)
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

      <NeuSeitBesuch
        eintraege={neu}
        ueberschrift={zuletzt ? 'Neu seit deinem letzten Besuch' : 'Neu aus der letzten Erhebung'}
      />

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

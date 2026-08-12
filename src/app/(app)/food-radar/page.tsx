import { notFound } from 'next/navigation'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { FoodRadarView } from '@/components/food-radar/food-radar-view'
import { TAFELN } from '@/data/food-radar'

export default async function FoodRadarPage() {
  // Ausrollstufe: vorerst nur für Admins. notFound() statt redirect, damit die
  // Route für andere nicht einmal als existierend erkennbar ist — dasselbe
  // Muster wie im Rohstoff-Radar. Die Daten sind statisch, es gibt also keine
  // RLS-Schranke dahinter; dieses Gate ist die einzige.
  if (!(await isCurrentUserAdmin())) notFound()

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Food Radar</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Trendradare der Lebensmittelbranche — Entwicklungsrichtungen nach Themenfeld und
          zeitlicher Nähe. Anders als die übrigen Module beantwortet dieses nicht „was ist
          passiert", sondern „wohin bewegt sich das Feld".
        </p>
      </div>

      <FoodRadarView tafeln={TAFELN} />

      <p className="text-xs text-muted-foreground/80 border-t border-border pt-3 max-w-3xl">
        Inhalte: <strong>foodRegio Innovation</strong>, betrieben auf FIBRES. Übernommen aus den
        öffentlich eingebetteten Radaren, Stand 10. August 2026, Texte maschinell übersetzt.
        Darstellung und Gestaltung: Ölz. Die Nutzung ist mit foodRegio abzustimmen.
      </p>
    </div>
  )
}

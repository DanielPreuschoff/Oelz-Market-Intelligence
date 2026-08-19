import { notFound } from 'next/navigation'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { FoodRadarView } from '@/components/food-radar/food-radar-view'
import { TAFELN } from '@/data/food-radar'

export default async function FoodRadarPage() {
  // Ausrollstufe: vorerst nur für Admins. notFound() statt redirect, damit die
  // Route für andere nicht einmal als existierend erkennbar ist — dasselbe
  // Muster wie im Rohstoff-Radar. Die Tafeln sind statische Daten im Repo, es
  // gibt also keine RLS-Schranke dahinter; dieses Gate ist die einzige.
  // Zum Freischalten diesen Block entfernen und `adminOnly` in
  // src/lib/modules.ts streichen.
  if (!(await isCurrentUserAdmin())) notFound()

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Food Radar</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Trendradare der Lebensmittelbranche — Entwicklungsrichtungen nach Themenfeld und
          zeitlicher Nähe. Anders als die übrigen Module beantwortet dieses nicht &bdquo;was ist
          passiert&ldquo;, sondern &bdquo;wohin bewegt sich das Feld&ldquo;.
        </p>
      </div>

      <FoodRadarView tafeln={TAFELN} />

      {/* Herkunft getrennt ausgewiesen: die Systematik und die Einträge sind
          foodRegios redaktionelle Arbeit, die deutschen Texte sind unsere.
          „Maschinell übersetzt" stimmte nach der Überarbeitung nicht mehr. */}
      <p className="text-xs text-muted-foreground/80 border-t border-border pt-3 max-w-3xl">
        Inhaltliche Systematik und Einträge: <strong>foodRegio Innovation</strong>, betrieben auf
        FIBRES, übernommen aus den öffentlich eingebetteten Radaren am 10. August 2026. Texte
        übersetzt und redaktionell überarbeitet sowie Darstellung und Gestaltung: Ölz. Die Nutzung
        ist mit foodRegio abzustimmen.
      </p>
    </div>
  )
}

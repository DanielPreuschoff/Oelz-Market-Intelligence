import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { FoodRadarView } from '@/components/food-radar/food-radar-view'
import { TAFELN } from '@/data/food-radar'

export default async function FoodRadarPage() {
  // Ausrollstufe 20.08.2026: Future Food (34 Einträge) ist für alle frei,
  // Food AI bleibt bis zur Abstimmung mit foodRegio den Admins vorbehalten.
  // Die Weiche sitzt serverseitig: Nicht-Admins bekommen die zweite Tafel
  // gar nicht erst ausgeliefert — auch ein geteilter Link ?tafel=food-ai
  // fällt im View auf die erste Tafel zurück. Die Tafeln sind statische
  // Daten im Repo, es gibt keine RLS-Schranke dahinter.
  const istAdmin = await isCurrentUserAdmin()
  const tafeln = istAdmin ? TAFELN : TAFELN.filter((t) => t.key === 'future-food')

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Trend Radar</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Trendradare der Lebensmittelbranche — Entwicklungsrichtungen nach Themenfeld und
          zeitlicher Nähe. Anders als die übrigen Module beantwortet dieses nicht &bdquo;was ist
          passiert&ldquo;, sondern &bdquo;wohin bewegt sich das Feld&ldquo;.
        </p>
      </div>

      <FoodRadarView tafeln={tafeln} />

      {/* Herkunft getrennt ausgewiesen: die Systematik und die Einträge sind
          foodRegios redaktionelle Arbeit, die deutschen Texte sind unsere.
          Nur für Admins sichtbar — der Abstimmungsvorbehalt ist eine interne
          Notiz und gehört nicht vor die Ölz-Leser (Entscheidung 20.08.2026). */}
      {istAdmin && (
        <p className="text-xs text-muted-foreground/80 border-t border-border pt-3 max-w-3xl">
          Inhaltliche Systematik und Einträge: <strong>foodRegio Innovation</strong>, betrieben auf
          FIBRES, übernommen aus den öffentlich eingebetteten Radaren am 10. August 2026. Texte
          übersetzt und redaktionell überarbeitet sowie Darstellung und Gestaltung: Ölz. Die Nutzung
          ist mit foodRegio abzustimmen.
        </p>
      )}
    </div>
  )
}

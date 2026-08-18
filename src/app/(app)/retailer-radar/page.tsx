import { notFound } from 'next/navigation'
import { isCurrentUserAdmin } from '@/lib/auth/current-profile'
import { PrototypeSwitcher } from '@/components/prototype/prototype-switcher'
import { VariantA, name as nameA } from './_prototype/variant-a'
import { VariantB, name as nameB } from './_prototype/variant-b'

/**
 * Retailer-Radar — PROTOTYP im Admin-Bereich.
 *
 * Bewusst noch kein fertiges Modul: Zwei Entwürfe der Einstiegsseite (A
 * „Scorecard-first", B „Matrix-first") laufen auf echten Erhebungsdaten vom
 * 17./18.08.2026 und sind über die Leiste unten umschaltbar. Zweck ist die
 * Vorführung beim Kunden — welcher Aufbau trägt? —, nicht der Betrieb.
 *
 * Deshalb admin-only: `adminOnly: true` in `src/lib/modules.ts` blendet das
 * Modul aus Startseite und Navigation der übrigen Rollen aus, `notFound()`
 * hier schliesst die Route selbst. Beides zusammen, weil das eine ohne das
 * andere nur die Anzeige oder nur den Zugang schützt.
 *
 * Was noch fehlt (siehe docs/retailer-radar-spec.md): Datenbank statt
 * statischer Dateien, monatlicher Lauf, Admin-Prüfliste, Freigabe-Schalter.
 */
export default async function RetailerRadarPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string; haendler?: string }>
}) {
  if (!(await isCurrentUserAdmin())) notFound()

  const VARIANTS = ['A', 'B'] as const
  const { variant: v, haendler } = await searchParams
  const variant = (VARIANTS as readonly string[]).includes(v ?? '') ? (v as 'A' | 'B') : 'A'
  const basis = `/retailer-radar?variant=${variant}`

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Retailer-Radar</h1>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Listungen, Preise, Aktionen und Eigenmarken im Handel — je Händler und Land.
        </p>
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900 max-w-3xl">
        <strong>Prototyp, nur für Admins sichtbar.</strong> Zwei Entwürfe der Einstiegsseite, unten umschaltbar.
        Die Zahlen stammen aus einer echten Erhebung vom 17./18.08.2026 (Mercator SI, Košík CZ, HOFER AT, Lidl AT
        sowie eine einmalige SPAR-Stichprobe). Der Vergleichslauf vom Juli ist <strong>simuliert</strong>, damit
        Δ-Werte und Ereignisse sichtbar werden; die vier Meldungen &bdquo;Aus dem Handel&ldquo; sind{' '}
        <strong>erfundene Beispiele</strong> und als solche gekennzeichnet.
      </div>

      {variant === 'A' && <VariantA haendler={haendler} basis={basis} />}
      {variant === 'B' && <VariantB haendler={haendler} basis={basis} />}

      <PrototypeSwitcher
        variants={[...VARIANTS]}
        current={variant}
        names={{ A: nameA, B: nameB }}
        pathname="/retailer-radar"
        auchProduktion
      />
    </div>
  )
}

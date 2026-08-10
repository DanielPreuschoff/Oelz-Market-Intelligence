export type ModuleStatus = 'active' | 'coming_soon'

export interface ModuleSubItem {
  label: string
  href: string
}

export interface IntelligenceModule {
  id: string
  name: string
  /**
   * Kurzform für die Navigation. Der volle Name passt dort nicht in die Spalte
   * und wurde bisher stumm abgeschnitten („Produkt- & Innovati…"). Eine eigene
   * Kurzform ist ehrlicher als eine Ellipse: sie ist gewählt, nicht gekappt.
   * Fehlt sie, gilt `name`.
   */
  shortName?: string
  description: string
  icon: string
  status: ModuleStatus
  /**
   * Ausrollstufe: Modul ist fertig, aber vorerst nur für Admins erreichbar.
   * Blendet den Sidebar-Eintrag und die Kachel auf der Startseite aus; die
   * Route und die RLS-Policies müssen zusätzlich gesperrt sein, sonst ist es
   * nur Verstecken. Zum Freischalten hier entfernen — siehe
   * docs/rohstoff-radar-spec.md, Abschnitt „Ausrollstufe".
   */
  adminOnly?: boolean
  href: string
  iconBg: string
  iconColor: string
  eta?: string
  plannedContent?: string[]
  subItems?: ModuleSubItem[]
}

/** Module, die dieser Nutzer sehen darf. */
export function visibleModules(isAdmin: boolean): IntelligenceModule[] {
  return MODULES.filter((m) => !m.adminOnly || isAdmin)
}

export const MODULES: IntelligenceModule[] = [
  {
    id: 'wettbewerb',
    name: 'Wettbewerbsradar',
    description: 'Aktivitäten der wichtigsten Wettbewerber — neue Produkte, Claims, Kampagnen und strategische Bewegungen.',
    icon: 'Target',
    status: 'active',
    href: '/editions',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    id: 'produkt',
    name: 'Produkt- & Innovationsradar',
    shortName: 'Produktradar',
    description: 'Neue Produktkonzepte, Claims und Sortimentsimpulse im Markt für Backwaren und Convenience.',
    icon: 'Lightbulb',
    status: 'active',
    href: '/produkt-radar',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    id: 'rohstoff',
    name: 'Rohstoff-Radar',
    description: 'Rohstoffe, Ingredients, Technologien und Verfahren mit strategischer Bedeutung für Produktentwicklung und Portfolio.',
    icon: 'FlaskConical',
    status: 'active',
    adminOnly: true,
    href: '/rohstoff-radar',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    id: 'retailer',
    name: 'Retailer-Radar',
    description: 'Neue Listungen, Handelsaktivitäten, Eigenmarken und Promotion-Signale aus dem Handel.',
    icon: 'ShoppingCart',
    status: 'coming_soon',
    href: '/retailer-radar',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    eta: 'Q1 2027',
    plannedContent: [
      'Neue Listungen & Auslistungen',
      'Eigenmarken-Entwicklungen',
      'Handelsaktivitäten & Promotions',
      'Category-Management-Signale',
    ],
  },
  {
    id: 'packaging',
    name: 'Packaging- & Claim-Radar',
    shortName: 'Packaging-Radar',
    description: 'Verpackungsdesign, Packungsgrößen, Nutzenversprechen und Nährwertkommunikation im Wettbewerbsumfeld.',
    icon: 'Package',
    status: 'coming_soon',
    href: '/packaging-radar',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    eta: '2027',
    plannedContent: [
      'Verpackungsdesign-Entwicklungen',
      'Packungsgrößen & Formate',
      'Claim-Kommunikation',
      'Nährwertkennzeichnung & Logos',
    ],
  },
  {
    id: 'laender',
    name: 'Länder- & CEE-Radar',
    shortName: 'Länder-Radar',
    description: 'Relevante Entwicklungen in Österreich, Deutschland, Schweiz, Tschechien, Slowakei und Slowenien.',
    icon: 'Globe',
    status: 'coming_soon',
    href: '/laender-radar',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
    eta: '2027',
    plannedContent: [
      'Marktentwicklungen je Land',
      'Länderspezifische Wettbewerbsbewegungen',
      'Regulatorische Entwicklungen',
      'Retail-Signale pro Markt',
    ],
  },
  {
    id: 'snapshot',
    name: 'Management-Snapshot',
    description: 'Monatliche Verdichtung der wichtigsten Signale für Führungskräfte — kompakt und entscheidungsrelevant.',
    icon: 'BarChart3',
    status: 'coming_soon',
    href: '/management-snapshot',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
    eta: 'Q3 2026',
    plannedContent: [
      'Monatliches Top-10-Signal-Briefing',
      'Wettbewerber-Bewegungen auf einen Blick',
      'Strategisch relevante Trends',
      'Handlungsempfehlungen',
    ],
  },
  {
    id: 'social',
    name: 'Social Listening Radar',
    shortName: 'Social Listening',
    description: 'Relevante Marken- und Produktdiskussionen in sozialen Medien — Stimmungen, Reichweiten und Trends im Blick.',
    icon: 'Radio',
    status: 'coming_soon',
    href: '/social-radar',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
    eta: '2027',
    plannedContent: [
      'Social-Media-Erwähnungen relevanter Marken',
      'Sentiment-Analyse zu Produktthemen',
      'Influencer- und Community-Signale',
      'Trend-Hashtags & virale Inhalte im Segment',
    ],
  },
  {
    id: 'studien',
    name: 'Ad-hoc Studien',
    description: 'Gezielte Markt- und Trendstudien zu aktuellen Fragestellungen — durchsuchbar und als PDF abrufbar.',
    icon: 'BookOpen',
    status: 'active',
    href: '/studien',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
]

import Link from 'next/link'
import { format, formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'
import { ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { visibleModules } from '@/lib/modules'
import { ModuleCard } from '@/components/module-card'
import type { Edition } from '@/types/database'
import type { InnovationImpulse } from '@/types/innovation'
import { RADAR_TYPE_COLORS } from '@/types/innovation'
import Image from 'next/image'

export default async function ModuleHubPage() {
  const supabase = await createClient()

  const [{ data: editions }, { data: impulses }, profile] = await Promise.all([
    supabase
      .from('editions')
      .select('*')
      .eq('status', 'published')
      .order('period_month', { ascending: false })
      .limit(1),
    supabase
      .from('innovation_impulses')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3),
    // Aus dem Anfrage-Zwischenspeicher des Layouts — kostet hier nichts mehr.
    getCurrentProfile(),
  ])

  const latestEdition = editions?.[0] as Edition | undefined
  const recentImpulses = (impulses ?? []) as InnovationImpulse[]
  const hasContent = latestEdition || recentImpulses.length > 0
  const isAdmin = !!profile?.is_admin

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Ölz Market Intelligence</h1>
        <p className="text-sm text-muted-foreground/80">
          Plattform-Übersicht — wähle ein Modul, um loszulegen.
        </p>
      </div>

      {/* Briefing-Sektion */}
      {hasContent && (
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-oelz-orange-text">Zuletzt aktualisiert</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Neueste Edition */}
            {latestEdition && (
              <Link href={`/editions/${latestEdition.id}`} className="group block">
                <div className="border rounded-xl p-5 bg-card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 space-y-3 h-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">Wettbewerbsradar</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(latestEdition.period_month), 'MMMM yyyy', { locale: de })}
                    </span>
                    {latestEdition.published_at && (
                      <span className="ml-auto text-xs text-muted-foreground/60">
                        vor {formatDistanceToNow(new Date(latestEdition.published_at), { locale: de })}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground font-medium">Neueste Edition</p>
                    <h3 className="font-display font-bold text-[17px] leading-snug group-hover:text-primary transition-colors">
                      {latestEdition.title}
                    </h3>
                    {latestEdition.editorial_summary && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {latestEdition.editorial_summary}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary">
                    Edition öffnen <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            )}

            {/* Neueste Impulse */}
            {recentImpulses.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Neueste Impulse</p>
                  <Link href="/produkt-radar" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                    Alle <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="divide-y border rounded-xl bg-card overflow-hidden">
                  {recentImpulses.map((impulse) => {
                    const colors = RADAR_TYPE_COLORS[impulse.radar_type]
                    return (
                      <Link
                        key={impulse.id}
                        href="/produkt-radar"
                        className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-secondary/40 transition-colors group"
                      >
                        {impulse.image_url ? (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                            <Image src={impulse.image_url} alt="" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className={`w-10 h-10 rounded-lg shrink-0 ${colors.bg} flex items-center justify-center`}>
                            <span className={`text-[10px] font-bold ${colors.text}`}>{impulse.radar_type.slice(0, 2)}</span>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-snug truncate group-hover:text-primary transition-colors">
                            {impulse.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{impulse.radar_type}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )
                  })}
                </div>
                <Link
                  href="/produkt-radar"
                  className="block text-xs text-center text-muted-foreground hover:text-foreground transition-colors pt-1"
                >
                  Alle Impulse im Produkt- & Innovationsradar →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modul-Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-oelz-orange-text">Module</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleModules(isAdmin).map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  )
}

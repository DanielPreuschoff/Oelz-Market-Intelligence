'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Target, Lightbulb, ShoppingCart, TrendingUp,
  Package, Globe, BarChart3, Radio, BookOpen, FlaskConical, Menu, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { visibleModules, isModuleActive } from '@/lib/modules'
import type { ModuleStats } from '@/lib/module-stats'
import { OelzWave } from '@/components/nav/oelz-wave'

const ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  Target, Lightbulb, ShoppingCart, TrendingUp, Package, Globe, BarChart3, Radio, BookOpen, FlaskConical,
}

/**
 * Modulnavigation für schmale Bildschirme.
 *
 * Die Seitenleiste ist `hidden md:flex` — unterhalb von 768 px gab es damit
 * **gar keinen** Weg zwischen den Modulen außer über die Startseite. Für eine
 * Plattform, deren Zielgruppe unterwegs liest, war das der handfesteste Mangel.
 *
 * Bewusst eine eigene Komponente statt einer Erweiterung von `ModuleNav`: die
 * Seitenleiste ist ein Layoutelement, das hier ist eine Überlagerung mit
 * eigenem Zustand. Zusammengelegt müsste eine Komponente beides sein.
 *
 * Gliederung wie in der Seitenleiste: die Startseite oben und abgesetzt, dann
 * die Gruppe „Module". Auf dem Handy ist das der einzige Weg zum Briefing —
 * das Logo im Kopfbalken ist dort zu klein, um als Navigation zu taugen.
 */
export function MobileModuleNav({
  isAdmin = false,
  stats,
}: {
  isAdmin?: boolean
  stats?: Record<string, ModuleStats>
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Beim Seitenwechsel schließen — sonst bleibt die Schublade über dem Ziel
  // stehen, das man gerade angesteuert hat.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Hintergrund nicht mitscrollen lassen, solange die Schublade offen ist.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const modules = visibleModules(isAdmin).filter((m) => m.status === 'active')
  const startseiteAktiv = pathname === '/'

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Navigation anzeigen"
        aria-expanded={open}
        className="flex items-center justify-center w-9 h-9 -ml-1 rounded-md text-oelz-on-orange hover:bg-white/25 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-oelz-braun/40 backdrop-blur-[1px]"
          />

          <nav className="relative w-64 max-w-[80vw] h-full bg-card shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="relative bg-oelz-orange px-4 h-16 flex items-center justify-between shrink-0">
              <span className="font-display text-sm font-bold tracking-wide text-oelz-on-orange">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="flex items-center justify-center w-8 h-8 rounded-md text-oelz-on-orange hover:bg-white/25 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
              <OelzWave className="absolute inset-x-0 top-full h-5 w-full text-oelz-orange pointer-events-none" />
            </div>

            <div className="p-2 pt-5 pb-3 border-b border-border/70">
              <Link
                href="/"
                aria-current={startseiteAktiv ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-display transition-colors',
                  startseiteAktiv
                    ? 'bg-oelz-orange text-oelz-on-orange font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-oelz-orange/12'
                )}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span className="flex-1 leading-tight">Startseite</span>
              </Link>
            </div>

            <p className="px-5 pt-4 pb-1 text-[10px] uppercase tracking-[0.16em] font-bold text-oelz-orange-text">
              Module
            </p>

            <div className="flex flex-col gap-0.5 p-2 pt-1 overflow-y-auto">
              {modules.map((module) => {
                const Icon = ICONS[module.icon] ?? Target
                const active = isModuleActive(module, pathname)
                // Wie in der Seitenleiste: das aktive Modul zeigt keinen Zähler.
                const ungesehen = active ? 0 : (stats?.[module.id]?.unseenCount ?? 0)

                return (
                  <Link
                    key={module.id}
                    href={module.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-display transition-colors',
                      active
                        ? 'bg-oelz-orange text-oelz-on-orange font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-oelz-orange/12'
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 leading-tight">{module.shortName ?? module.name}</span>
                    {ungesehen > 0 && (
                      <span
                        aria-label={`${ungesehen} ungesehen`}
                        className="shrink-0 text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center bg-oelz-orange text-oelz-on-orange"
                      >
                        {ungesehen}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { OelzWave } from '@/components/nav/oelz-wave'
import { MobileModuleNav } from '@/components/nav/mobile-module-nav'
import type { UserProfile } from '@/types/database'
import type { ModuleStats } from '@/lib/module-stats'
import { ROLE_LABELS } from '@/types/database'

const ADMIN_NAV_ITEMS = [
  { href: '/admin/import', label: 'Signal-Import' },
  { href: '/admin/signals/new', label: 'Neues Signal' },
  { href: '/admin/editions/new', label: 'Neue Edition' },
  { href: '/admin/studien/new', label: 'Studie hochladen' },
  { href: '/admin/produkt-radar/new', label: 'Impuls hinzufügen' },
  { href: '/admin/rohstoff-radar/new', label: 'Rohstoffsignal hinzufügen' },
]

interface AppNavProps {
  profile: UserProfile | null
  /** Für die Neu-Zähler in der Schublade auf schmalen Bildschirmen. */
  moduleStats?: Record<string, ModuleStats>
}

export function AppNav({ profile, moduleStats }: AppNavProps) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 bg-oelz-orange">
      <div className="w-full px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-8">
          <MobileModuleNav isAdmin={!!profile?.is_admin} stats={moduleStats} />
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/oelz-logo.png"
              alt="Rudolf Ölz Meisterbäcker"
              width={42}
              height={32}
              className="object-contain transition-transform group-hover:scale-[1.03] duration-300"
              priority
            />
            <div className="hidden sm:block h-6 w-[1px] bg-oelz-on-orange/25" />
            {/* Unter sm bleibt nur das Logo — der Schriftzug bräche sonst um und
                liefe aus dem 64px hohen Balken heraus. */}
            <div className="hidden sm:flex flex-col text-oelz-on-orange">
              <span className="font-display text-[15px] font-bold tracking-wide leading-tight">
                Ölz Meisterbäcker
              </span>
              <span className="font-display text-[9px] uppercase tracking-[0.18em] font-bold opacity-80">
                Market &amp; Competitor Intelligence
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {profile?.is_admin && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-oelz-on-orange/30 bg-white/20 text-oelz-on-orange hover:bg-white/35 hover:text-oelz-on-orange"
                  >
                    Admin
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                {ADMIN_NAV_ITEMS.map((item) => (
                  <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/admin/signals" />}>
                  Signale verwalten
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/admin/editions" />}>
                  Editionen verwalten
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/admin/competitors" />}>
                  Wettbewerber verwalten
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/admin/rohstoff-radar" />}>
                  Rohstoffsignale verwalten
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-oelz-on-orange hover:bg-white/25 hover:text-oelz-on-orange"
                >
                  <span className="hidden sm:block opacity-80">
                    {profile?.full_name ?? profile?.role ?? 'Account'}
                  </span>
                  {profile?.role && (
                    <span className="text-xs bg-white/30 px-1.5 py-0.5 rounded">
                      {ROLE_LABELS[profile.role]}
                    </span>
                  )}
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSignOut}>
                Abmelden
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Wellenbogen: läuft unter dem Balken aus, ohne die Höhe zu verändern
          (die Sidebar hängt an top-16 / h-[calc(100vh-4rem)]).
          h-5 statt h-3.5: die weisse Begleitlinie aus dem Manual braucht Platz
          innerhalb der Fläche, sonst fällt sie mit der Unterkante zusammen. */}
      <OelzWave className="absolute inset-x-0 top-full h-5 w-full text-oelz-orange pointer-events-none" />
    </header>
  )
}

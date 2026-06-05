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
import type { UserProfile } from '@/types/database'
import { ROLE_LABELS } from '@/types/database'

const ADMIN_NAV_ITEMS = [
  { href: '/admin/research', label: 'Research Agent' },
  { href: '/admin/signals/new', label: 'New Signal' },
  { href: '/admin/editions/new', label: 'New Edition' },
  { href: '/admin/studien/new', label: 'Studie hochladen' },
  { href: '/admin/produkt-radar/new', label: 'Impuls hinzufügen' },
]

interface AppNavProps {
  profile: UserProfile | null
}

export function AppNav({ profile }: AppNavProps) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="border-b border-border/80 bg-white/90 dark:bg-card/90 backdrop-blur-md sticky top-0 z-40 shadow-[0_1px_3px_0_rgba(34,28,26,0.04)]">
      <div className="w-full px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/oelz-logo.png"
              alt="Rudolf Ölz Meisterbäcker"
              width={42}
              height={32}
              className="object-contain transition-transform group-hover:scale-[1.03] duration-300"
              priority
            />
            <div className="hidden sm:block h-6 w-[1px] bg-border/80" />
            <div className="flex flex-col">
              <span className="font-serif text-[15px] font-bold tracking-wide text-foreground leading-tight">
                Ölz Meisterbäcker
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                Market &amp; Competitor Intelligence
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {profile?.is_admin && (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm">Admin</Button>} />
              <DropdownMenuContent align="end">
                {ADMIN_NAV_ITEMS.map((item) => (
                  <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/admin/signals" />}>
                  Manage Signals
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/admin/editions" />}>
                  Manage Editions
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/admin/competitors" />}>
                  Manage Competitors
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <span className="hidden sm:block text-muted-foreground">
                    {profile?.full_name ?? profile?.role ?? 'Account'}
                  </span>
                  {profile?.role && (
                    <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                      {ROLE_LABELS[profile.role]}
                    </span>
                  )}
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

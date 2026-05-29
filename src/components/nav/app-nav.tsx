'use client'

import Link from 'next/link'
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
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-semibold text-sm tracking-tight">
            Ölz Intelligence
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
              <DropdownMenuItem render={<Link href="/profile" />}>
                Profile &amp; Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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

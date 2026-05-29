import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppNav } from '@/components/nav/app-nav'
import { ModuleNav } from '@/components/nav/module-nav'
import type { UserProfile } from '@/types/database'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-background">
      <AppNav profile={profile as UserProfile | null} />
      <div className="flex">
        <ModuleNav />
        <main className="flex-1 min-w-0 px-8 py-8 max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  )
}

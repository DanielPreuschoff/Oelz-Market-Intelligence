import { redirect } from 'next/navigation'
import { AppNav } from '@/components/nav/app-nav'
import { ModuleNav } from '@/components/nav/module-nav'
import { getCurrentUser, getCurrentProfile } from '@/lib/auth/current-profile'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Beide Aufrufe sind per cache() an die Anfrage gebunden und teilen sich eine
  // Auth-Runde. Seiten, die ihrerseits nach dem Profil fragen, erben das
  // Ergebnis von hier, statt den Auth-Server erneut zu befragen.
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const profile = await getCurrentProfile()

  return (
    <div className="min-h-screen bg-background">
      <AppNav profile={profile} />
      <div className="flex">
        <ModuleNav isAdmin={!!profile?.is_admin} />
        <main className="flex-1 min-w-0 px-8 py-8 max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  )
}

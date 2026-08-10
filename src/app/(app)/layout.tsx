import { redirect } from 'next/navigation'
import { AppNav } from '@/components/nav/app-nav'
import { ModuleNav } from '@/components/nav/module-nav'
import { getCurrentUser, getCurrentProfile } from '@/lib/auth/current-profile'
import { getModuleStats } from '@/lib/module-stats'

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

  // Die Kennzahlen tragen den Neu-Zähler in der Seitenleiste. Sie laufen
  // parallel zueinander und kosten damit zusammen eine Netzwerkrunde — gelesen
  // wird je Modul nur die Datumsspalte.
  const [profile, moduleStats] = await Promise.all([getCurrentProfile(), getModuleStats()])

  return (
    <div className="min-h-screen bg-background">
      <AppNav profile={profile} moduleStats={moduleStats} />
      <div className="flex">
        <ModuleNav isAdmin={!!profile?.is_admin} stats={moduleStats} />
        <main className="flex-1 min-w-0 px-8 py-8 max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  )
}

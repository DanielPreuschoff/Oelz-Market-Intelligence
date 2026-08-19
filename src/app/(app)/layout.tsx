import { redirect } from 'next/navigation'
import { AppNav } from '@/components/nav/app-nav'
import { ModuleNav } from '@/components/nav/module-nav'
import { HauptSpalte } from '@/components/nav/haupt-spalte'
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
        <HauptSpalte>{children}</HauptSpalte>
      </div>
    </div>
  )
}

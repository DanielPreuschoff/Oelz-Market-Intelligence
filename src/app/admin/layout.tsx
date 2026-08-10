import { redirect } from 'next/navigation'
import { AppNav } from '@/components/nav/app-nav'
import { getCurrentUser, getCurrentProfile } from '@/lib/auth/current-profile'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  // Teilt sich die Auth-Runde mit getCurrentUser(); die Admin-Seiten darunter
  // erben dieselbe Antwort, statt sie ein drittes Mal zu holen.
  const profile = await getCurrentProfile()
  if (!profile?.is_admin) redirect('/')

  return (
    <div className="min-h-screen bg-background">
      <AppNav profile={profile} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

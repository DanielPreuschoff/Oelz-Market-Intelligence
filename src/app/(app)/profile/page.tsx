import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from '@/components/profile-form'
import type { UserProfile } from '@/types/database'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profil & Rolle</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Set your role to see signals most relevant to you.
        </p>
      </div>
      <ProfileForm profile={profile as UserProfile | null} />
    </div>
  )
}

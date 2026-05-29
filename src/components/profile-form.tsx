'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROLE_LABELS, type UserProfile, type UserRole } from '@/types/database'
import { Loader2 } from 'lucide-react'

interface ProfileFormProps {
  profile: UserProfile | null
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter()
  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [role, setRole] = useState<UserRole | ''>(profile?.role ?? '')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSave() {
    setSaving(true)
    setSuccess(false)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    await supabase
      .from('user_profiles')
      .update({ full_name: fullName || null, role: role || null })
      .eq('id', user!.id)

    setSaving(false)
    setSuccess(true)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <Label>Your role at Ölz</Label>
        <p className="text-xs text-muted-foreground">
          Signals tagged for your role will be highlighted throughout the app.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(ROLE_LABELS) as [UserRole, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setRole(key === role ? '' : key)}
              className={`text-sm px-4 py-2.5 rounded-lg border text-left transition-colors ${
                role === key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {success && (
        <p className="text-sm text-green-600">Profile saved.</p>
      )}

      <Button onClick={handleSave} disabled={saving}>
        {saving ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Saving...</> : 'Save Profile'}
      </Button>
    </div>
  )
}

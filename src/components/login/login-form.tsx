'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Supabase liefert seine Meldungen auf Englisch. Übersetzt sind nur die zwei
 * Fälle, die realistisch vorkommen; alles andere bekommt einen neutralen Satz,
 * damit nie ein englischer Text mitten in der deutschen Oberfläche steht.
 */
function meldung(m: string): string {
  const s = m.toLowerCase()
  if (s.includes('invalid login credentials')) return 'E-Mail-Adresse oder Passwort ist nicht korrekt.'
  if (s.includes('rate limit') || s.includes('too many'))
    return 'Zu viele Versuche. Bitte einen Moment warten und dann erneut anmelden.'
  return 'Anmeldung derzeit nicht möglich. Bitte später noch einmal versuchen.'
}

/**
 * Das Anmeldeformular. Bewusst grösser als die App-Dichte (44-px-Felder,
 * 16-px-Schrift): Die Anmeldeseite ist der einzige Ort, an dem Konsistenz mit
 * den dichten Ansichten nichts einbringt — hier gibt es keine Nachbarelemente,
 * mit denen die Felder stimmen müssten, und 44 px ist auch auf dem Handy das
 * richtige Mass.
 *
 * Kein „Passwort vergessen" und kein SSO im Pilot; Zugänge legt Metadine an.
 * Der Fuss sagt das, damit die Sackgasse beschriftet ist und niemand bei der
 * Ölz-IT anruft, die nichts davon weiss.
 */
export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(meldung(error.message))
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  const feld = 'h-11 px-3.5 text-base md:text-base'

  return (
    <div className="w-full">
      <div className="mb-7">
        <h1 className="font-display text-[1.75rem] font-bold tracking-wide text-foreground leading-none">
          Anmelden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Mit den zugeteilten Zugangsdaten anmelden.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading} className="space-y-5 disabled:opacity-70">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              E-Mail-Adresse
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@oelz.at"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
              className={feld}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">
              Passwort
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={feld}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-11 text-base bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wide"
          >
            {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {loading ? 'Anmeldung läuft…' : 'Anmelden'}
          </Button>
        </fieldset>
      </form>

      <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
        Zugänge werden für Ölz-Mitarbeitende eingerichtet. Kein Passwort erhalten oder
        ausgesperrt? Bitte bei Metadine melden.
      </p>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OelzWave } from '@/components/nav/oelz-wave'

/**
 * Die einzige Seite, die jeder Nutzer sieht — und die einzige ohne Datenlast.
 * Deshalb trägt hier die CI: orange Fläche mit Wellenbogen als Kopf der Karte,
 * darunter das Formular auf Papierweiss. Vorbild ist der Anzeigenaufbau des
 * Manuals (S. 18) und die orange Fläche im ÖlzNet.
 */
export default function LoginPage() {
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
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border/70 bg-card shadow-[0_2px_16px_-4px_rgba(90,58,41,0.14)] overflow-hidden">
          {/* Kopf: orange Fläche, die im Wellenbogen ausläuft */}
          <div className="relative bg-oelz-orange pt-8 pb-5 px-6 text-center">
            <div className="flex justify-center">
              <Image
                src="/oelz-logo.png"
                alt="Rudolf Ölz Meisterbäcker"
                width={104}
                height={78}
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <p className="mt-3 font-display text-[11px] uppercase tracking-[0.2em] font-bold text-oelz-on-orange/85">
              Market &amp; Competitor Intelligence
            </p>
            {/* Die Welle hängt unter der Fläche und läuft in den hellen Teil der
                Karte aus — so ist die Grenze der Bogen selbst, nicht eine gerade
                Kante. Die weisse Linie liegt dadurch auf Orange, wie im Manual. */}
            <OelzWave className="absolute inset-x-0 top-full h-5 w-full text-oelz-orange" />
          </div>

          <div className="px-6 pt-7 pb-8 space-y-6">
            <div className="space-y-1 text-center">
              <h1 className="font-display text-2xl font-bold tracking-wide text-foreground">
                Ölz Intelligence
              </h1>
              <p className="text-sm text-muted-foreground">
                Markt- und Wettbewerbsbeobachtung
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@oelz.at"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Anmeldung läuft…' : 'Anmelden'}
              </Button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          Zugang nur für autorisierte Ölz-Mitarbeitende.
        </p>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { ImpulseBilderForm } from '@/components/admin/impulse-bilder-form'

export default async function ImpulseBilderPage() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  if (!profile.is_admin) redirect('/')

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/produkt-radar"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Produkt- &amp; Innovationsradar
        </Link>
        <h1 className="text-2xl font-semibold">Bilder übernehmen</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Für importierte Entwürfe in einem Durchgang: Die Liste aus der Aufbereitung nennt je Titel
          eine Bildadresse, die App lädt jedes Bild in den eigenen Speicher und hängt es an den
          Entwurf. Danach lassen sich alle vollständigen Entwürfe mit Bild auf einmal veröffentlichen.
        </p>
      </div>

      <ImpulseBilderForm />
    </div>
  )
}

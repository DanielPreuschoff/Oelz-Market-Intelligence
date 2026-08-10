import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getCurrentProfile } from '@/lib/auth/current-profile'
import { ImpulseImportForm } from '@/components/admin/impulse-import-form'

export default async function ImpulseImportPage() {
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
        <h1 className="text-2xl font-semibold">Impulse importieren</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Die Deep-Research-Berichte werden ausserhalb der App aufbereitet und hier als JSON
          eingespielt. Prompts: <code className="text-xs">prompts/produkt-marktscan.md</code>{' '}
          (was entsteht) und <code className="text-xs">prompts/produkt-transfer.md</code>{' '}
          (was springt). Ablauf: <code className="text-xs">docs/produkt-radar-erhebung.md</code>.
        </p>
      </div>

      <ImpulseImportForm />
    </div>
  )
}

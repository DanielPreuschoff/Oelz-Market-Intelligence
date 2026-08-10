import { EditionForm } from '@/components/admin/edition-form'

export default function NewEditionPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Neue Edition</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new monthly intelligence edition.
        </p>
      </div>
      <EditionForm />
    </div>
  )
}

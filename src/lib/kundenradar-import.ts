import { SIGNALTYPEN, type Kundensignal } from '@/types/kundenradar'
import type { ImportIssue } from '@/lib/signal-import'

/**
 * Import für das Kundenradar — Muster aus `regulatorik-import.ts`.
 *
 * Die Importdatei entsteht aus den Läufen je Land (prompts/kundenradar.md) und
 * wird unter /admin/kundenradar/import eingefügt. Feldnamen sind die
 * Spaltennamen der Tabelle; der Händler kommt als Slug, weil die Aufbereitung
 * keine IDs kennt.
 *
 * Bewusst nachsichtig: Pflicht sind nur Händler, Typ und Titel, weil ohne sie
 * kein Entwurf einen Ort hätte. Alles andere darf fehlen — importiert wird als
 * Entwurf, und die Veröffentlichungs-Hürde (missingForPublish, CHECK in
 * Migration 019) ist der eigentliche Filter.
 */
export interface KundenradarImportPayload {
  period?: string
  signals: unknown[]
  profiles?: unknown[]
}

export type KundensignalEntwurf = Pick<
  Kundensignal,
  | 'retailer_id' | 'signal_type' | 'title' | 'teaser' | 'situation'
  | 'source_name' | 'source_url' | 'source_date' | 'oelz_relevance' | 'contact_trigger'
> & { retailer_slug: string }

export interface KurzprofilEntwurf {
  retailer_id: string
  retailer_slug: string
  profile: string
}

const asText = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() ? v.trim() : null

/** Der Prompt sagt „ja | nein", das JSON-Beispiel einen Boolean — beides gilt. */
const asJaNein = (v: unknown): boolean =>
  v === true || (typeof v === 'string' && ['ja', 'true'].includes(v.trim().toLowerCase()))

export function validateKundenradarImport(
  input: unknown,
  slugZuId: ReadonlyMap<string, string>
): {
  period: string | null
  valid: KundensignalEntwurf[]
  profiles: KurzprofilEntwurf[]
  issues: ImportIssue[]
  /** Slugs, die es nicht gibt — erst den Händler anlegen, dann erneut importieren. */
  unknownSlugs: string[]
} {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Erwartet wird ein JSON-Objekt mit einem Feld "signals".')
  }
  const payload = input as Partial<KundenradarImportPayload>
  if (!Array.isArray(payload.signals)) {
    throw new Error('Feld "signals" fehlt oder ist keine Liste.')
  }

  const valid: KundensignalEntwurf[] = []
  const profiles: KurzprofilEntwurf[] = []
  const issues: ImportIssue[] = []
  const unknownSlugs = new Set<string>()

  payload.signals.forEach((entry, index) => {
    const e = (entry ?? {}) as Record<string, unknown>
    const slug = asText(e.retailer_slug)
    const retailerId = slug ? slugZuId.get(slug) : undefined
    const typ = (SIGNALTYPEN as readonly string[]).includes(String(e.signal_type ?? ''))
      ? (e.signal_type as Kundensignal['signal_type'])
      : null
    const title = asText(e.title)
    const headline = title ?? '(ohne Titel)'

    const problems: string[] = []
    if (!slug) problems.push('Händler-Slug fehlt')
    else if (!retailerId) {
      problems.push(`Händler-Slug "${slug}" ist unbekannt`)
      unknownSlugs.add(slug)
    }
    if (!typ) problems.push(`Typ "${String(e.signal_type ?? '')}" ist keiner der sechs erlaubten`)
    if (!title) problems.push('Titel fehlt')
    if (problems.length > 0 || !slug || !retailerId || !typ || !title) {
      issues.push({ index, headline, reason: problems.join(', ') })
      return
    }

    valid.push({
      retailer_id: retailerId,
      retailer_slug: slug,
      signal_type: typ,
      title,
      teaser: asText(e.teaser),
      situation: asText(e.situation),
      source_name: asText(e.source_name),
      source_url: asText(e.source_url),
      source_date: /^\d{4}-\d{2}-\d{2}$/.test(String(e.source_date ?? '')) ? String(e.source_date) : null,
      oelz_relevance: asText(e.oelz_relevance),
      contact_trigger: asJaNein(e.contact_trigger),
    })
  })

  const roheProfile = Array.isArray(payload.profiles) ? payload.profiles : []
  roheProfile.forEach((entry, index) => {
    const p = (entry ?? {}) as Record<string, unknown>
    const slug = asText(p.retailer_slug)
    const retailerId = slug ? slugZuId.get(slug) : undefined
    const text = asText(p.profile)
    const headline = `Kurzprofil ${slug ?? '(ohne Slug)'}`

    if (!slug || !retailerId || !text) {
      const grund = !slug
        ? 'Händler-Slug fehlt'
        : !retailerId
          ? `Händler-Slug "${slug}" ist unbekannt`
          : 'Profiltext fehlt'
      if (slug && !retailerId) unknownSlugs.add(slug)
      issues.push({ index, headline, reason: grund })
      return
    }

    // Eine eigene Spalte für die Quellen gibt es nicht. Sie stillschweigend
    // fallen zu lassen hieße, die einzige Herkunft des Profils zu verlieren —
    // also hängen sie am Text; die Redaktion kann kürzen.
    const quellen = Array.isArray(p.sources)
      ? p.sources.filter((q): q is string => typeof q === 'string' && q.trim() !== '')
      : []
    profiles.push({
      retailer_id: retailerId,
      retailer_slug: slug,
      profile: quellen.length > 0 ? `${text}\n\nQuellen: ${quellen.join(', ')}` : text,
    })
  })

  return {
    period: asText(payload.period),
    valid,
    profiles,
    issues,
    unknownSlugs: [...unknownSlugs],
  }
}

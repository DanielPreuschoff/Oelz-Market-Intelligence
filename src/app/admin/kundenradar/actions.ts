'use server'

/**
 * Schreibwege für das Kundenradar: Händler und Kundensignale.
 *
 * Spec: docs/kundenradar-spec.md, Muster: src/app/admin/unter-beobachtung/actions.ts.
 * Anders als dort gibt es kein Ausräumen — ein Kundensignal veraltet nicht,
 * es rückt nach unten. Dafür gibt es den Händler als eigene Entität.
 */

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  KUNDENSTATUS,
  LAENDER,
  SIGNALTYPEN,
  missingForPublish,
  slugify,
  type Kundensignal,
  type Kundenstatus,
  type Land,
  type Signaltyp,
} from '@/types/kundenradar'

/**
 * Alle Ansichten, die einen Händler oder ein Kundensignal zeigen. Die
 * Startseite gehört dazu (Block und Zähler); das Dossier ist eine dynamische
 * Route, deshalb das Muster statt eines einzelnen Pfads.
 */
function neuLaden() {
  revalidatePath('/admin/kundenradar')
  revalidatePath('/kundenradar')
  revalidatePath('/kundenradar/[slug]', 'page')
  revalidatePath('/')
}

function textOderNull(v: FormDataEntryValue | null): string | null {
  const s = typeof v === 'string' ? v.trim() : ''
  return s === '' ? null : s
}

// =============================================================== Händler

/**
 * Anlegen oder ändern.
 *
 * `profile_updated_at` ist der „Stand" des Kurzprofils, auf den sich der
 * Vertrieb verlässt — er rückt nur vor, wenn sich der Text ändert. Sonst
 * würde jede Änderung an der Reihenfolge das Profil frischer aussehen lassen,
 * als es ist.
 */
export async function speichereHaendler(id: string | null, fd: FormData) {
  const supabase = await createClient()

  const name = textOderNull(fd.get('name'))
  if (!name) throw new Error('Der Name fehlt.')
  const landRoh = String(fd.get('country') ?? '')
  if (!(LAENDER as readonly string[]).includes(landRoh)) throw new Error('Bitte ein Land wählen.')
  const country = landRoh as Land
  const statusRoh = String(fd.get('customer_status') ?? '')
  const customer_status: Kundenstatus = (KUNDENSTATUS as readonly string[]).includes(statusRoh)
    ? (statusRoh as Kundenstatus)
    : 'unbekannt'
  const slug = textOderNull(fd.get('slug')) ?? slugify(name, country)
  const profile = textOderNull(fd.get('profile'))

  const zeile: Record<string, unknown> = {
    name,
    slug,
    country,
    group_name: textOderNull(fd.get('group_name')),
    customer_status,
    profile,
    active: fd.get('active') === 'on',
    sort_order: Number.parseInt(String(fd.get('sort_order') ?? ''), 10) || 0,
  }

  if (id) {
    const { data: vorher } = await supabase.from('retailers').select('profile').eq('id', id).maybeSingle()
    if ((vorher?.profile ?? null) !== profile) zeile.profile_updated_at = profile ? new Date().toISOString() : null
    const { error } = await supabase.from('retailers').update(zeile).eq('id', id)
    if (error) throw new Error(fehlerText(error, 'Speichern'))
  } else {
    if (profile) zeile.profile_updated_at = new Date().toISOString()
    const { error } = await supabase.from('retailers').insert(zeile)
    if (error) throw new Error(fehlerText(error, 'Anlegen'))
  }

  neuLaden()
  redirect('/admin/kundenradar')
}

/** Löscht den Händler samt seinen Signalen (on delete cascade, Migration 019). */
export async function loescheHaendler(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('retailers').delete().eq('id', id)
  if (error) throw new Error(`Löschen fehlgeschlagen: ${error.message}`)
  neuLaden()
}

/** Ein doppelter Slug soll nicht als Name eines Constraints beim Admin ankommen. */
function fehlerText(error: { code?: string; message: string }, was: string): string {
  if (error.code === '23505') return 'Diese Adresse (Slug) ist schon vergeben — bitte eine andere wählen.'
  return `${was} fehlgeschlagen: ${error.message}`
}

// ========================================================= Kundensignale

function signalAusFormular(fd: FormData) {
  const typRoh = String(fd.get('signal_type') ?? '')
  const signal_type: Signaltyp = (SIGNALTYPEN as readonly string[]).includes(typRoh)
    ? (typRoh as Signaltyp)
    : 'strategie'
  return {
    retailer_id: textOderNull(fd.get('retailer_id')),
    signal_type,
    title: (fd.get('title') as string | null)?.trim() ?? '',
    teaser: textOderNull(fd.get('teaser')),
    situation: textOderNull(fd.get('situation')),
    source_name: textOderNull(fd.get('source_name')),
    source_url: textOderNull(fd.get('source_url')),
    source_date: textOderNull(fd.get('source_date')),
    oelz_relevance: textOderNull(fd.get('oelz_relevance')),
    contact_trigger: fd.get('contact_trigger') === 'on',
  }
}

/**
 * Anlegen oder ändern — der Status kommt aus dem abgesendeten Knopf. Die Hürde
 * greift erst beim Veröffentlichen und benennt dann, was fehlt, statt den
 * CHECK der Datenbank durchschlagen zu lassen.
 */
export async function speichereKundensignal(id: string | null, fd: FormData) {
  const supabase = await createClient()
  const werte = signalAusFormular(fd)
  const veroeffentlichen = fd.get('absicht') === 'veroeffentlichen'

  if (!werte.retailer_id) throw new Error('Bitte einen Händler wählen.')
  if (!werte.title) throw new Error('Der Titel fehlt.')
  if (veroeffentlichen) {
    const fehlt = missingForPublish(werte as Partial<Kundensignal>)
    if (fehlt.length > 0) throw new Error(`Zum Veröffentlichen fehlt noch: ${fehlt.join(', ')}.`)
  }

  const zeile: Record<string, unknown> = { ...werte }
  if (veroeffentlichen) zeile.status = 'published'
  else if (!id) zeile.status = 'draft'

  if (id) {
    // published_at nur beim ersten Mal: Ein erneut veröffentlichtes Signal
    // soll nicht wieder als neu gelten. Gleiche Regel wie in den anderen Modulen.
    if (veroeffentlichen) {
      const { data: vorher } = await supabase
        .from('retailer_signals').select('published_at').eq('id', id).maybeSingle()
      if (!vorher?.published_at) zeile.published_at = new Date().toISOString()
    }
    const { error } = await supabase.from('retailer_signals').update(zeile).eq('id', id)
    if (error) throw new Error(`Speichern fehlgeschlagen: ${error.message}`)
  } else {
    if (veroeffentlichen) zeile.published_at = new Date().toISOString()
    const { data: { user } } = await supabase.auth.getUser()
    zeile.created_by = user?.id ?? null
    const { error } = await supabase.from('retailer_signals').insert(zeile)
    if (error) throw new Error(`Anlegen fehlgeschlagen: ${error.message}`)
  }

  neuLaden()
  redirect('/admin/kundenradar')
}

/**
 * Sammel-Veröffentlichung: alle Entwürfe, denen nichts mehr fehlt. Die Hürde
 * ist der Filter, nicht der Bildschirm; Lücken bleiben liegen und stehen in
 * der Liste benannt.
 */
export async function veroeffentlicheFertigeKundensignale(): Promise<{
  veroeffentlicht: number
  uebersprungen: number
}> {
  const supabase = await createClient()
  const { data } = await supabase.from('retailer_signals').select('*').eq('status', 'draft')
  const entwuerfe = (data ?? []) as unknown as Kundensignal[]
  const bereit = entwuerfe.filter((s) => missingForPublish(s).length === 0)

  if (bereit.length > 0) {
    const { error } = await supabase
      .from('retailer_signals')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .in('id', bereit.map((s) => s.id))
    if (error) throw new Error(`Veröffentlichen fehlgeschlagen: ${error.message}`)
    neuLaden()
  }
  return { veroeffentlicht: bereit.length, uebersprungen: entwuerfe.length - bereit.length }
}

export async function loescheKundensignal(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('retailer_signals').delete().eq('id', id)
  if (error) throw new Error(`Löschen fehlgeschlagen: ${error.message}`)
  neuLaden()
}

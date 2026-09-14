'use server'

/**
 * Schreibwege für Risikosignale („Unter Beobachtung").
 *
 * Spec: docs/unter-beobachtung-spec.md
 *
 * Vier Aktionen, weil das Modul vier Bewegungen kennt: anlegen, ändern,
 * hochstufen (dasselbe wie ändern) und ausräumen. Das Ausräumen ist die
 * einzige, die eine eigene Aktion verdient — es ist kein Feld unter vielen,
 * sondern der Grund, warum die Liste nicht verrottet.
 */

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { missingForPublish, type Risikosignal } from '@/types/substance-watch'

/** Alle Ansichten, die ein Risikosignal zeigen. */
function neuLaden() {
  revalidatePath('/admin/unter-beobachtung')
  // Seit 14.09.2026 das Regulatorik-Radar statt des Rohstoff-Radars (ADR 0006).
  revalidatePath('/regulatorik-radar')
}

function textOderNull(v: FormDataEntryValue | null): string | null {
  const s = typeof v === 'string' ? v.trim() : ''
  return s === '' ? null : s
}

/**
 * Aus dem Formular gelesen, ohne zu raten.
 *
 * `product_categories` kommt als mehrfaches Feld gleichen Namens — das ist die
 * gewöhnliche Form für Kontrollkästchen und braucht `getAll`.
 */
function ausFormular(fd: FormData) {
  return {
    substance: (fd.get('substance') as string | null)?.trim() ?? '',
    e_number: textOderNull(fd.get('e_number')),
    // Seit Migration 015 (14.09.2026): Kurzzeile und Behoerde, beide Pflicht
    // beim Veroeffentlichen — die Huerde in missingForPublish und im CHECK.
    teaser: textOderNull(fd.get('teaser')),
    authority: textOderNull(fd.get('authority')),
    stage: fd.get('stage') as string,
    scope: fd.get('scope') as string,
    situation: (fd.get('situation') as string | null)?.trim() ?? '',
    source_name: textOderNull(fd.get('source_name')),
    source_url: textOderNull(fd.get('source_url')),
    source_date: textOderNull(fd.get('source_date')),
    product_categories: fd.getAll('product_categories').map(String),
    action: textOderNull(fd.get('action')),
  }
}

/**
 * Anlegen oder ändern.
 *
 * Der Status kommt aus dem abgesendeten Knopf: „Als Entwurf sichern" oder
 * „Veröffentlichen". Ein unvollständiger Entwurf ist erlaubt — die Hürde
 * greift erst beim Veröffentlichen, und dann benennt die Meldung, was fehlt,
 * statt den CHECK der Datenbank durchschlagen zu lassen.
 */
export async function speichereRisikosignal(id: string | null, fd: FormData) {
  const supabase = await createClient()
  const werte = ausFormular(fd)
  const veroeffentlichen = fd.get('absicht') === 'veroeffentlichen'

  if (veroeffentlichen) {
    const fehlt = missingForPublish(werte as Partial<Risikosignal>)
    if (fehlt.length > 0) {
      throw new Error(`Zum Veröffentlichen fehlt noch: ${fehlt.join(', ')}.`)
    }
  }

  const zeile: Record<string, unknown> = { ...werte }
  if (veroeffentlichen) {
    zeile.status = 'published'
    // published_at nur beim ersten Mal setzen: Ein erneut veröffentlichtes
    // Altsignal soll nicht wieder als frisch gelten. Gleiche Regel wie im
    // Rohstoff-Radar.
    if (!id) zeile.published_at = new Date().toISOString()
  } else if (!id) {
    zeile.status = 'draft'
  }

  if (id) {
    zeile.updated_at = new Date().toISOString()
    if (veroeffentlichen) {
      const { data: vorher } = await supabase
        .from('substance_watch').select('published_at').eq('id', id).maybeSingle()
      if (!vorher?.published_at) zeile.published_at = new Date().toISOString()
    }
    const { error } = await supabase.from('substance_watch').update(zeile).eq('id', id)
    if (error) throw new Error(`Speichern fehlgeschlagen: ${error.message}`)
  } else {
    const { error } = await supabase.from('substance_watch').insert(zeile)
    if (error) throw new Error(`Anlegen fehlgeschlagen: ${error.message}`)
  }

  neuLaden()
  redirect('/admin/unter-beobachtung')
}

/**
 * Ausräumen: Entwarnung gegeben oder Debatte ausgelaufen.
 *
 * Der Eintrag verschwindet aus der aktiven Ansicht, bleibt aber erhalten —
 * ohne diesen Zustand wächst die Liste nur und verrottet.
 */
export async function raeumeAus(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('substance_watch')
    .update({ status: 'ausgeraeumt', resolved_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(`Ausräumen fehlgeschlagen: ${error.message}`)
  neuLaden()
}

/** Zurück in die aktive Liste — Gegenstück zum Ausräumen, für den Fehlklick. */
export async function nimmWiederAuf(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('substance_watch')
    .update({ status: 'published', resolved_at: null })
    .eq('id', id)
  if (error) throw new Error(`Wiederaufnehmen fehlgeschlagen: ${error.message}`)
  neuLaden()
}

export async function loescheRisikosignal(id: string) {
  const supabase = await createClient()
  await supabase.from('substance_watch').delete().eq('id', id)
  neuLaden()
}

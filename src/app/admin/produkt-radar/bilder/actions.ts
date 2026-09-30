'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { extractJson } from '@/lib/signal-import'
import { missingForImpulse } from '@/types/innovation'

/**
 * Bilder für importierte Impulse in einem Durchgang nachziehen.
 *
 * Die Kacheln rendern mit next/image, und next.config erlaubt nur den eigenen
 * Supabase-Speicher — ein Link auf ein fremdes Bild würde die Kachel brechen.
 * Deshalb holt der Server jedes Bild von der angegebenen Adresse und lädt es
 * in den Bucket `innovation-images`, genau wie das Einzelformular es tut.
 *
 * Bisher hieß das: 20 Entwürfe öffnen, Quelle aufrufen, Bild speichern,
 * hochladen (Daniel, 30.09.2026). Die Bildadressen sucht die Aufbereitung
 * gleich mit heraus; hier kommt nur noch die Liste an.
 */

const BUCKET = 'innovation-images'
const MAX_BYTES = 8 * 1024 * 1024
/** Unter dieser Größe ist es meist ein Platzhalter oder Tracking-Pixel. */
const MIN_BYTES = 5_000
const ENDUNG: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

export type BildErgebnis = {
  title: string
  id?: string
  ok: boolean
  image_url?: string
  fehler?: string
  /** Trägt der Entwurf alles, was die Karte braucht (missingForImpulse)? */
  vollstaendig?: boolean
  /** Hatte schon vorher ein Bild — nichts hochgeladen. */
  vorhanden?: boolean
}

export type BilderResult =
  | { ok: false; error: string }
  | { ok: true; ergebnisse: BildErgebnis[]; gesamt: number }

async function alsAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { supabase, fehler: 'Nicht angemeldet.' }
  const { data: profile } = await supabase.from('user_profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) return { supabase, fehler: 'Keine Adminrechte.' }
  return { supabase, fehler: null }
}

/** Titelvergleich unabhängig von Schreibweise, Anführungszeichen und Leerraum. */
function titelSchluessel(titel: string): string {
  return titel
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[„“”"'’‘«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function holeBild(adresse: string): Promise<{ bytes: ArrayBuffer; typ: string } | { fehler: string }> {
  let url: URL
  try {
    url = new URL(adresse)
  } catch {
    return { fehler: 'keine gültige Adresse' }
  }
  if (url.protocol !== 'https:') return { fehler: 'nur https-Adressen' }

  let res: Response
  try {
    res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/png,image/jpeg,*/*;q=0.5',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
    })
  } catch {
    return { fehler: 'nicht erreichbar' }
  }
  if (!res.ok) return { fehler: `Abruf fehlgeschlagen (HTTP ${res.status})` }

  const typ = (res.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase()
  if (!ENDUNG[typ]) return { fehler: `kein unterstütztes Bildformat (${typ || 'ohne Angabe'})` }
  if (Number(res.headers.get('content-length') ?? 0) > MAX_BYTES) return { fehler: 'größer als 8 MB' }

  const bytes = await res.arrayBuffer()
  if (bytes.byteLength > MAX_BYTES) return { fehler: 'größer als 8 MB' }
  if (bytes.byteLength < MIN_BYTES) return { fehler: 'zu klein — vermutlich kein echtes Bild' }
  return { bytes, typ }
}

/**
 * Verarbeitet `anzahl` Einträge ab `start`. Das Formular ruft in Paketen auf,
 * damit kein einzelner Aufruf an das Zeitlimit der Serverfunktion stößt.
 */
export async function bilderUebernehmen(raw: string, start = 0, anzahl = 4): Promise<BilderResult> {
  const { supabase, fehler } = await alsAdmin()
  if (fehler) return { ok: false, error: fehler }

  let eintraege: { title: string; image_url: string | null }[]
  try {
    const json = extractJson(raw) as { bilder?: unknown } | unknown[]
    const liste = Array.isArray(json) ? json : (json as { bilder?: unknown }).bilder
    if (!Array.isArray(liste)) throw new Error('Erwartet wird {"bilder": [{"title": …, "image_url": …}]}.')
    eintraege = liste.map((e) => {
      const o = (e ?? {}) as Record<string, unknown>
      return {
        title: typeof o.title === 'string' ? o.title.trim() : '',
        image_url: typeof o.image_url === 'string' && o.image_url.trim() ? o.image_url.trim() : null,
      }
    })
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unlesbare Eingabe.' }
  }

  // Nur Entwürfe: Veröffentlichte Impulse haben ihr Bild schon bewusst bekommen.
  const { data: entwuerfe, error: ladeFehler } = await supabase
    .from('innovation_impulses')
    .select('*')
    .eq('status', 'draft')
  if (ladeFehler) return { ok: false, error: ladeFehler.message }
  const nachTitel = new Map((entwuerfe ?? []).map((i) => [titelSchluessel(i.title), i]))

  const ergebnisse: BildErgebnis[] = []
  // Nacheinander statt parallel: schont die Quellserver, und ein Fehler bleibt einem Titel zugeordnet.
  for (const e of eintraege.slice(start, start + anzahl)) {
    const impuls = e.title ? nachTitel.get(titelSchluessel(e.title)) : undefined
    if (!impuls) {
      ergebnisse.push({ title: e.title || '(ohne Titel)', ok: false, fehler: 'kein Entwurf mit diesem Titel' })
      continue
    }
    const vollstaendig = missingForImpulse(impuls).length === 0
    if (impuls.image_url) {
      ergebnisse.push({ title: impuls.title, id: impuls.id, ok: true, image_url: impuls.image_url, vollstaendig, vorhanden: true })
      continue
    }
    if (!e.image_url) {
      ergebnisse.push({ title: impuls.title, id: impuls.id, ok: false, fehler: 'keine Bildadresse angegeben', vollstaendig })
      continue
    }

    const bild = await holeBild(e.image_url)
    if ('fehler' in bild) {
      ergebnisse.push({ title: impuls.title, id: impuls.id, ok: false, fehler: bild.fehler, vollstaendig })
      continue
    }

    const pfad = `${crypto.randomUUID()}.${ENDUNG[bild.typ]}`
    const { error: uploadFehler } = await supabase.storage
      .from(BUCKET)
      .upload(pfad, bild.bytes, { contentType: bild.typ })
    if (uploadFehler) {
      ergebnisse.push({ title: impuls.title, id: impuls.id, ok: false, fehler: `Upload: ${uploadFehler.message}`, vollstaendig })
      continue
    }
    const { data: oeffentlich } = supabase.storage.from(BUCKET).getPublicUrl(pfad)
    const { error: updateFehler } = await supabase
      .from('innovation_impulses')
      .update({ image_url: oeffentlich.publicUrl })
      .eq('id', impuls.id)
    if (updateFehler) {
      ergebnisse.push({ title: impuls.title, id: impuls.id, ok: false, fehler: updateFehler.message, vollstaendig })
      continue
    }
    ergebnisse.push({ title: impuls.title, id: impuls.id, ok: true, image_url: oeffentlich.publicUrl, vollstaendig })
  }

  revalidatePath('/admin/produkt-radar')
  return { ok: true, ergebnisse, gesamt: eintraege.length }
}

/** Veröffentlicht die genannten Entwürfe — nur solche mit Bild. */
export async function impulseVeroeffentlichen(
  ids: string[]
): Promise<{ ok: false; error: string } | { ok: true; veroeffentlicht: number }> {
  const { supabase, fehler } = await alsAdmin()
  if (fehler) return { ok: false, error: fehler }
  if (ids.length === 0) return { ok: true, veroeffentlicht: 0 }

  const { data, error } = await supabase
    .from('innovation_impulses')
    .update({ status: 'published' })
    .in('id', ids)
    .eq('status', 'draft')
    .not('image_url', 'is', null)
    .select('id')
  if (error) return { ok: false, error: error.message }

  // Neu-Zähler auf Startseite und Navigation hängen am Layout.
  revalidatePath('/', 'layout')
  return { ok: true, veroeffentlicht: data?.length ?? 0 }
}

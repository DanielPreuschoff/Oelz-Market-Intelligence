/**
 * Ob eine Quellen-URL existiert — die Prüfung, die bisher beim Aufbereiten von
 * Hand lief („URL tatsächlich aufgerufen").
 *
 * Bewusst streng nur in eine Richtung: Als tot gilt eine Adresse erst bei 404
 * oder 410 oder wenn der Server gar nicht antwortet. Fachpresse und Händler
 * sperren Abrufe aus Rechenzentren oft mit 403 oder lassen sie ins Leere laufen
 * (Lebensmittel Zeitung, The Grocer) — das heißt nicht, dass es den Artikel
 * nicht gibt. Erfundene URLs dagegen enden fast immer in 404.
 */

export type Quellenstand = 'ok' | 'tot' | 'unklar'

const TIMEOUT_MS = 8000
const KOPF = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36' }

async function abruf(url: string, method: 'HEAD' | 'GET'): Promise<number> {
  const res = await fetch(url, {
    method,
    redirect: 'follow',
    headers: KOPF,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: 'no-store',
  })
  // Den Körper nicht lesen — nur der Status zählt.
  await res.body?.cancel().catch(() => {})
  return res.status
}

export async function pruefeQuelle(url: string): Promise<Quellenstand> {
  let adresse: URL
  try {
    adresse = new URL(url)
  } catch {
    return 'tot'
  }
  if (adresse.protocol !== 'http:' && adresse.protocol !== 'https:') return 'tot'

  try {
    let status = await abruf(adresse.href, 'HEAD')
    // Manche Server kennen HEAD nicht oder antworten darauf anders als auf GET.
    if (status === 405 || status === 501 || status === 404) status = await abruf(adresse.href, 'GET')
    if (status === 404 || status === 410) return 'tot'
    if (status >= 200 && status < 400) return 'ok'
    return 'unklar'
  } catch (e) {
    // Name nicht auflösbar oder Verbindung verweigert: die Adresse gibt es nicht.
    const ursache = (e as { cause?: { code?: string } }).cause?.code
    if (ursache === 'ENOTFOUND' || ursache === 'ECONNREFUSED' || ursache === 'ERR_INVALID_URL') return 'tot'
    // Zeitüberschreitung und Ähnliches: nicht entscheidbar.
    return 'unklar'
  }
}

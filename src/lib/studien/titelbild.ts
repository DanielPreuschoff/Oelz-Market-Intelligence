'use client'

/**
 * Titelbild einer Studie: die erste PDF-Seite als PNG.
 *
 * Läuft bewusst im Browser des Admins, nicht auf dem Server: pdf.js braucht
 * dort kein natives Canvas-Paket, und die Bibliothek (~1 MB) wird nur geladen,
 * wenn jemand eine Studie einstellt — der Reader bleibt davon unberührt.
 *
 * Aus dem Titelbild wird ein PNG mit 900 px Breite (A4 hochkant → ~1270 px
 * hoch); das reicht für die Anzeige in Retina-Auflösung und bleibt klein.
 */

const BREITE_PX = 900

export async function titelbildAusPdf(pdf: Blob | ArrayBuffer): Promise<Blob> {
  // Dynamisch, damit pdf.js nicht in den normalen Bundle wandert.
  const pdfjs = await import('pdfjs-dist')
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

  const daten = pdf instanceof Blob ? await pdf.arrayBuffer() : pdf
  const dokument = await pdfjs.getDocument({ data: new Uint8Array(daten) }).promise
  try {
    const seite = await dokument.getPage(1)
    const basis = seite.getViewport({ scale: 1 })
    const viewport = seite.getViewport({ scale: BREITE_PX / basis.width })

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(viewport.width)
    canvas.height = Math.round(viewport.height)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas nicht verfügbar')

    await seite.render({ canvasContext: ctx, viewport }).promise

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG konnte nicht erzeugt werden'))), 'image/png')
    })
  } finally {
    await dokument.destroy()
  }
}

/** Pfad des Titelbilds im Bucket — neben dem PDF, gleicher Stamm. */
export function titelbildPfad(pdfPfadOderUrl: string): string {
  // Query und Anker abschneiden: öffentliche Storage-URLs können ein ?t= tragen.
  const ohneAnhang = pdfPfadOderUrl.split(/[?#]/)[0]
  const datei = ohneAnhang.split('/').pop() || 'studie.pdf'
  return datei.replace(/\.pdf$/i, '') + '-cover.png'
}

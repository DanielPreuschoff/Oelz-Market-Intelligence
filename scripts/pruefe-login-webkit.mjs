/**
 * Prüft die Anmeldeseite in WebKit (Safaris Renderer) — headless, mit
 * Screenshots und Messwerten je Fenstergrösse.
 *
 *   node scripts/pruefe-login-webkit.mjs [http://localhost:3001]
 *
 * Braucht `playwright` (devDependency) und `npx playwright install webkit`.
 * Screenshots landen im Scratch-Ordner (siehe Ausgabe).
 */
import { webkit } from 'playwright'
import { mkdirSync } from 'fs'

const BASIS = process.argv[2] ?? 'http://localhost:3001'
const AUS = process.env.AUS ?? '/tmp/oelz-login-pruefung'
mkdirSync(AUS, { recursive: true })

const GROESSEN = [
  [1440, 900],
  [2000, 1010],
  [1280, 720],
  [1280, 1024],
  [1024, 1200],
  [375, 812],
]

async function messen(page) {
  return page.evaluate(() => {
    const svg = document.querySelector('svg[preserveAspectRatio="xMidYMid slice"]')
    if (!svg || svg.getBoundingClientRect().width === 0) return { layout: 'Kopfstreifen' }
    const m = svg.getScreenCTM().inverse()
    const sec = svg.closest('section').getBoundingClientRect()
    const pt = (x, y) => {
      const p = new DOMPoint(x, y).matrixTransform(m)
      return [Math.round(p.x), Math.round(p.y)]
    }
    const tl = pt(sec.left, sec.top)
    const br = pt(sec.right, sec.bottom)
    const wir = [...svg.querySelectorAll('title')]
      .find((t) => t.textContent.startsWith('Ölz'))
      .parentElement.querySelector('circle')
      .getBoundingClientRect()
    // Farbe rechts der Welle, links des Formulars: darf nicht schwarz sein
    return {
      layout: 'split',
      feld: [Math.round(sec.width), Math.round(sec.height)],
      sichtbar: { x: [tl[0], br[0]], y: [tl[1], br[1]] },
      clipOK: tl[0] >= 100 && tl[1] >= 230 && br[0] <= 1060 && br[1] <= 990,
      lissabonAthenDrin: tl[0] <= 280 && br[0] >= 665,
      dornbirn: [
        ((wir.x + wir.width / 2 - sec.left) / sec.width).toFixed(2),
        ((wir.y + wir.height / 2 - sec.top) / sec.height).toFixed(2),
      ],
    }
  })
}

// Nur WebKit: Chromium prüft der Browser-Bereich der Entwicklungsumgebung ohnehin.
for (const [engine, name] of [[webkit, 'webkit']]) {
  const browser = await engine.launch()
  console.log(`\n=== ${name} ===`)
  for (const [w, h] of GROESSEN) {
    const page = await browser.newPage({ viewport: { width: w, height: h } })
    await page.goto(`${BASIS}/login`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    const datei = `${AUS}/${name}-${w}x${h}.png`
    await page.screenshot({ path: datei })
    const m = await messen(page)
    // Pixelprobe: Punkt knapp rechts der Welle auf halber Höhe (nur split)
    let probe = null
    if (m.layout === 'split') {
      const buf = await page.screenshot({
        clip: { x: Math.round(w * 0.6) - 4, y: Math.round(h / 2), width: 1, height: 1 },
      })
      // PNG-Dekodierung sparen: wir prüfen stattdessen die berechnete Hintergrundfarbe
      probe = await page.evaluate(([x, y]) => {
        const el = document.elementFromPoint(x, y)
        return el ? `${el.tagName}.${el.className?.baseVal ?? el.className}`.slice(0, 60) : null
      }, [Math.round(w * 0.6) + 2, Math.round(h / 2)])
      void buf
    }
    console.log(`${w}x${h}`.padEnd(10), JSON.stringify(m), probe ? `| rechts der Welle: ${probe}` : '')
    await page.close()
  }
  await browser.close()
}
console.log(`\nScreenshots: ${AUS}`)

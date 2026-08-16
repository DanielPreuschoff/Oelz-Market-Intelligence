import Image from 'next/image'
import { OelzWave } from '@/components/nav/oelz-wave'
import { EuropaKarte } from '@/components/login/europa-karte'
import { LoginForm } from '@/components/login/login-form'
import { Wellenkante } from '@/components/login/wellenkante'

/**
 * Die Anmeldeseite — die einzige Seite, die jeder Nutzer sieht, und die
 * einzige ohne Datenlast. Deshalb trägt hier die Marke.
 *
 * Grundriss: geteilter Schirm, orange Markenfläche links (60 %), Formular
 * rechts. Die Naht ist die senkrechte Wellenkante nach CD-Manual S. 8 — das
 * Signature-Element als tragende Struktur der Seite, nicht als Zierleiste.
 * Auf der Fläche liegt die Europakarte mit den beobachteten Standorten
 * (siehe `EuropaKarte`); das Logo sitzt oben links über dem Atlantik, wo die
 * Karte leer ist. Über dem Formular steht nur „Anmelden" — der Name des
 * Werkzeugs steht bereits auf der Markenfläche.
 *
 * Die Karte füllt die Fläche exakt; ihren Bildausschnitt bestimmt sie selbst
 * (`viewBox` + `slice`, siehe `EuropaKarte`) — der Kern mit allen Standorten
 * ist bei jedem Seitenverhältnis und in jedem Browser vollständig zu sehen,
 * ohne Schnittkante.
 *
 * Der geteilte Schirm gilt ab 1024 px Breite UND im Querformat (Variante
 * `split:` in globals.css). Darunter — und in hochkanten Fenstern wie einem
 * aufrechten Tablet, wo eine schmale hohe orange Spalte die Karte seitlich
 * beschneiden würde — kippt er: oranger Kopfstreifen mit Logo und
 * waagrechter Welle, Formular darunter, keine Karte (auf 375 px wird Europa
 * zur Briefmarke, und pulsierende Punkte kosten Akku). Unter 500 px Höhe
 * (Handy quer) fällt auch der Streifen weg — dann nur ein kleines Logo über
 * dem Formular.
 *
 * Bewegung: ein einziges Einblenden beim Laden (300 ms, Formular 80 ms
 * versetzt), danach Ruhe; `motion-reduce` schaltet es ab.
 *
 * Entstanden aus neun Prototyp-Varianten auf dem Branch
 * `prototype/login-2026-08` (Gewinner: E „Karte auf Orange"), Entscheidung
 * in docs/adr/0002-login-karte-auf-orange.md.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background split:grid split:grid-cols-[3fr_2fr]">
      {/* Markenfläche */}
      <section className="relative split:overflow-hidden split:min-h-screen">
        <div className="hidden split:block absolute inset-0 animate-in fade-in duration-300 fill-mode-both motion-reduce:animate-none">
          <Wellenkante>
            <EuropaKarte className="absolute inset-0" />
          </Wellenkante>
        </div>

        {/* schmal: Kopfstreifen mit waagrechter Welle */}
        <div className="split:hidden relative bg-oelz-orange h-[200px] [@media(max-height:500px)]:hidden">
          <OelzWave className="absolute inset-x-0 top-full h-6 w-full text-oelz-orange" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden split:flex flex-col pt-[8vh] pl-[8%] animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-both motion-reduce:animate-none">
            <Logo breite={230} />
            <Werkzeugname className="mt-5" />
          </div>
          <div className="split:hidden flex h-[200px] items-center justify-center [@media(max-height:500px)]:hidden">
            <Logo breite={150} />
          </div>
        </div>
      </section>

      {/* Formular */}
      <section className="flex items-center justify-center px-6 py-12 split:py-10 split:min-h-screen">
        <div
          className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both motion-reduce:animate-none"
          style={{ animationDelay: '80ms' }}
        >
          <div className="hidden [@media(max-height:500px)]:block split:!hidden mb-6">
            <Logo breite={90} priority={false} />
          </div>
          <LoginForm />
        </div>
      </section>
    </div>
  )
}

/** Logo aus dem CD-Manual (S. 5, 600 dpi, freigestellt) — 900 px breit, trägt auch Retina. */
function Logo({ breite, priority = true }: { breite: number; priority?: boolean }) {
  return (
    <Image
      src="/oelz-logo-hd.png"
      alt="Rudolf Ölz Meisterbäcker"
      width={breite}
      height={Math.round(breite * (714 / 900))}
      className="object-contain drop-shadow-[0_2px_6px_rgba(90,58,41,0.18)]"
      priority={priority}
    />
  )
}

/** Werkzeugname als ruhige Versalzeile unter dem Logo, auf Orange in Ölz-Braun (6.2:1). */
function Werkzeugname({ className }: { className?: string }) {
  return (
    <p
      className={`font-display text-[13px] uppercase tracking-[0.24em] font-bold text-oelz-on-orange/85 ${className ?? ''}`}
    >
      Market &amp; Competitor Intelligence
    </p>
  )
}

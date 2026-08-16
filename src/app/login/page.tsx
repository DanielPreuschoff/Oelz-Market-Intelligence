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
 * Die Karte läuft über alle Ränder der Fläche hinaus (Kasten grösser als die
 * Fläche, Lage komplett in vh, damit Kern und Massstab bei jedem
 * Seitenverhältnis gleich bleiben): sichtbar ist nur Land oder Meer, nie ein
 * Kastenrand. Die Werte −67 vh / −42 vh / 192 vh sind im Prototyp am Bild
 * abgestimmt (Dornbirn ≈ 55 % Breite, 48 % Höhe).
 *
 * Unter 1024 px kippt der Schirm: oranger Kopfstreifen mit Logo und
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
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[3fr_2fr]">
      {/* Markenfläche */}
      <section className="relative lg:overflow-hidden lg:min-h-screen">
        <div className="hidden lg:block absolute inset-0 animate-in fade-in duration-300 fill-mode-both motion-reduce:animate-none">
          <Wellenkante>
            {/* Breite UND Höhe explizit: Safari leitet die Breite eines
                SVG nicht aus dem Seitenverhältnis ab und würde den Kasten
                stauchen — dann ragen seine Kanten ins Bild. */}
            <EuropaKarte className="absolute top-[-67vh] left-[-42vh] h-[192vh] w-[192vh] max-w-none" />
          </Wellenkante>
        </div>

        {/* schmal: Kopfstreifen mit waagrechter Welle */}
        <div className="lg:hidden relative bg-oelz-orange h-[200px] [@media(max-height:500px)]:hidden">
          <OelzWave className="absolute inset-x-0 top-full h-6 w-full text-oelz-orange" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden lg:flex flex-col pt-[8vh] pl-[8%] animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-both motion-reduce:animate-none">
            <Logo breite={230} />
            <Werkzeugname className="mt-5" />
          </div>
          <div className="lg:hidden flex h-[200px] items-center justify-center [@media(max-height:500px)]:hidden">
            <Logo breite={150} />
          </div>
        </div>
      </section>

      {/* Formular */}
      <section className="flex items-center justify-center px-6 py-12 lg:py-10 lg:min-h-screen">
        <div
          className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both motion-reduce:animate-none"
          style={{ animationDelay: '80ms' }}
        >
          <div className="hidden [@media(max-height:500px)]:block lg:!hidden mb-6">
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

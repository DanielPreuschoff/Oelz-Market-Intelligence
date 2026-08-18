# Startseite — Design-Brief

Stand: 18.08.2026, Ergebnis einer Grilling-Runde (drei Runden, 22 Fragen). Entscheidungen mit
Begründung: `docs/adr/0004-startseite-als-briefing-mit-buehne.md`. Begriffe: `CONTEXT.md`
(Startseite, Briefing, Neu, Stand, Sichtbarkeit). Dieser Brief ist die **Primärquelle für die
drei Prototypen** — jede Prototyp-Session startet frisch und liest nur dieses Dokument, den ADR
und das Glossar.

Anlass: Die heutige Startseite (`src/app/(app)/page.tsx`) sieht „zusammengesetzt" aus —
shadcn-Defaults, keine Hierarchie, Modulfarben gegen die CI, kein Bild, keine Bewegung, und
sie ist ein Verteiler, obwohl der Nutzer monatlich kommt und wissen will, was neu ist.
Referenz für „sieht gestaltet aus": `trendhunter.com/food` — eine Akzentfarbe konsequent,
Bild-links/Text-rechts-Karten, große Display-Type, Hover-Farbwäsche, Einblend-Choreografie.
Bei uns: Orange statt Lime, hell statt dunkel, gezähmt statt laut.

---

## 1. Was die Seite ist

- **Job: Briefing.** „Was hat sich seit dem letzten Mal getan?" — über Wettbewerbsradar,
  Produkt- & Innovationsradar, Rohstoff-Radar und Ad-hoc Studien. Erst danach führt sie in die
  Module. Kein Verteiler, kein Magazin-Feed.
- **Für alle gleich**, entworfen mit Kai Heuberger (Head of Product Development & Innovation,
  Primärnutzer) als Maßstab. Rollen färben nichts um.
- **Anker ist der Monat** — „Briefing · August 2026", abgeleitet aus `period_month` der jüngsten
  veröffentlichten Edition, sonst aus dem laufenden Monat. Kein Produkt-H1 (das Logo im
  Kopfbalken trägt den Namen), keine persönliche Begrüßung.
- **Kanonischer Produktname**, wo er doch gebraucht wird: **Ölz Intelligence Radar**.
- **Sprache:** durchgehend Deutsch.

## 2. Inhaltshierarchie

Von oben nach unten, mit fallendem Gewicht:

1. **Bühne** — eine große, ruhige Fläche (orange *oder* dunkelbraun; Wahl je Prototyp) mit
   Wellenkante. Trägt den Aufmacher: die **jüngste Edition** (Titel, Monat, `editorial_summary`
   in 2–3 Zeilen, Aufruf „Edition öffnen") und darunter den **Monatsstand** in einer Zeile:
   „3 neue Signale · 6 neue Impulse · 12 neue Rohstoffsignale · Stand 12. Aug" — Zahlen aus
   `getModuleStats()` (`newCount`, `stand`), Module ohne Neues werden weggelassen, nicht mit 0
   gezeigt.
2. **Briefing** — das Neue aus den vier Modulen (Definition „Neu": Glossar). Höchstens **5
   Einträge je Modul**, danach „alle N im Modul →". Ordnung ist Sache des Archetyps (§7).
3. **Module** — kompakte Zeile: Icon, Name, `total` + Einheit, Stand, Neu-Zähler (orange).
   Nur `visibleModules(isAdmin)`. Kein Kachelraster mehr.
4. **In Vorbereitung** — die geplanten Module (Packaging, Länder, Snapshot, Social) als kleine
   Textzeile mit ETA. Sichtbar, nie gleichwertig mit Inhalt.

Das Design nimmt den **freigeschalteten Rohstoff-Radar** an (Kai sieht ihn heute noch nicht —
`adminOnly`). Die echte Seite gated über Sichtbarkeit; die Prototypen zeigen ihn.
Retailer- und Food-Radar sind **nicht** im Briefing, bis sie belastbare Daten haben.

## 3. Karten-Inhalt je Einheit und Klickziel

| Einheit | Zeigt | Klick führt zu |
|---|---|---|
| **Edition** (nur Bühne) | Titel, Monat, `editorial_summary`, Anzahl Signale | `/editions/[id]` |
| **Signal** | Headline, Wettbewerber (Logo + Kurzname), Land, Kategorie als neutraler Text-Chip, `importance` (Orange nur bei `critical`), Bild wenn vorhanden | `/editions/[id]` der Edition (kein Signal-Deep-Link vorhanden) |
| **Impuls** | Titel, `radar_type` als Chip, strategisches Thema, Bild wenn vorhanden | `/produkt-radar?type=<radar_type>` (kein Impuls-Deep-Link vorhanden) |
| **Rohstoffsignal** | Gegenstand als Titel, Neuigkeit in einer Zeile, Funktion-Chips, Reifegrad — **nur Befund, keine Einschätzung** (die Chance ohne die Kette davor hängt in der Luft; markierte Meinung passt in keine 3-Zeilen-Karte) | `/rohstoff-radar?signal=<id>` |
| **Studie** | Titel, Datum, Kurzbeschreibung wenn vorhanden | `/studien/[id]` |

Keine neuen Routen in diesem Vorhaben. Fehlende Deep-Links (Impuls, Signal) sind Folge-Tickets.

## 4. Datenlagen — der Schalter, den jeder Prototyp haben muss

Ein Konzept, das nur mit vierzig Karten funktioniert, ist wertlos. Jeder Prototyp läuft mit
demselben Mock-Datensatz und einem Schalter `daten=voll|typisch|leer`:

| Lage | Wettbewerb | Produkt | Rohstoff | Studien |
|---|---|---|---|---|
| **voll** | 1 Edition mit 14 Signalen (4 mit Bild, 1 `critical`) | 9 Impulse (5 mit Bild) | 15 Rohstoffsignale | 2 Studien |
| **typisch** (Maßstab) | 1 Edition mit 8 Signalen (2 mit Bild) | 4 Impulse (2 mit Bild) | 6 Rohstoffsignale | 0 Studien |
| **leer** | keine neue Edition (letzte: Juli, Stand 3. Aug) | 0 neu (Bestand 31) | 0 neu (Bestand 96) | 0 |

**Leerzustand:** Die Bühne zeigt den **letzten Stand** („Zuletzt: Edition Juli 2026 · Stand
3. August") — kein Datumsversprechen („nächste Erhebung Anfang September"), weil die Erhebung
händisch läuft. Das Briefing verschwindet nicht; es sagt ehrlich, dass nichts neu ist, und die
Modulzeile trägt Bestand und Stand.

Mock-Daten: Wettbewerbernamen aus `docs/competitor-registry.md`, Gegenstände und Funktionen aus
`docs/rohstoff-register.md`, Radar-Typen aus `src/types/innovation.ts` — Headlines erfunden,
aber plausibel; Bilder als Platzhalter-Fotos von Backwaren (lokal unter `public/prototype/`,
keine externen Quellen). Auch **„typisch" muss ohne ein einziges Foto** gestaltet aussehen —
das ist die Prüfung der Bild-Ersatz-Regel (§5).

## 5. Gestaltungsregeln — fix für alle drei Prototypen

### Fläche & Farbe
- Grund **hell-warm** (`--background` bleibt), Karten **Papierweiß** (`--card`, kein
  `bg-white`-Hardcode; Manual S. 19 meidet hartes Weiß).
- **Eine Bühne** oben, orange (`--oelz-orange`) oder dunkelbraun (`--oelz-braun`-Familie);
  auf Orange steht Text in `--oelz-on-orange`, **nie in Weiß** (2,35:1). Weißer Text nur auf
  Dunkelbraun.
- **Orange ist der einzige Akzent**: Neu-Zähler, `critical`, Aufrufe/Links, aktive Zustände,
  Dachzeilen (`--oelz-orange-text`, 4,5:1-tauglich). Keine Modulfarben (`iconBg`/`iconColor`
  aus `modules.ts` bleiben dort, die Startseite ignoriert sie), keine Kategoriefarben —
  Kategorien sind neutrale Chips.
- Volloranger Lesetext ist verboten (Kontrast). Orange als Displayfarbe nur über
  `--oelz-orange-dark` und nur ab ~30 px fett.

### Typografie
- **MADE Tommy Soft** (`font-display`) für alle Display-Größen: Bühnentitel 40–56 px Bold,
  Kartentitel 17–20 px Bold, Dachzeilen 11–12 px Bold, Uppercase, `tracking-wider`.
- Laut, aber gezähmt: Uppercase nur in Dachzeilen und höchstens einem Bühnenwort — keine
  brüllenden Publisher-Headlines. Fließtext bleibt `font-sans`.
- Ein Titel je Karte, eine Zeile Kontext, sonst nichts. Dichte kommt aus Ordnung, nicht aus
  Kleinschrift.

### CI-Signaturen (verbindlich)
- **Welle** an der Bühnenkante, mit **weißer Begleitlinie** (Manual S. 6: 4 pt) — vorhandene
  Bausteine `src/components/nav/oelz-wave.tsx` (waagrecht) und
  `src/components/login/wellenkante.tsx` (senkrecht) als Ausgangspunkt.
- Braun auf Orange, MADE Tommy Soft, Papierweiß — siehe oben.

### Bild-Ersatz-Hierarchie (bild-optional)
Karte hat ein Foto → Foto (`object-cover`, festes Seitenverhältnis 4:3 oder 1:1 je Archetyp).
Sonst, in dieser Reihenfolge:
1. **Wettbewerber-Logo** (`logo_url`) auf Papierweiß, klein zentriert.
2. **Typo-Kachel**: Gegenstand/Initialen in MADE Tommy Soft Bold auf Orange (Braun-Schrift)
   oder Dunkelbraun (Papierweiß-Schrift) — je Karte deterministisch aus der ID gewählt, damit
   dieselbe Karte immer gleich aussieht.
3. **Wellenmotiv** auf Sekundärfläche als letzter Rückfall.
Nie ein graues „kein Bild"-Rechteck, nie ein generisches Icon als Bildersatz.

### Bewegung
- **Mikro** (Hover, Fokus, Farbwechsel): 150–200 ms, `ease-out`. **Eine** Hover-Regel für alle
  Karten der Seite — Farbwäsche (Orange bei 6–10 % über der Karte, Titel wird `--primary`)
  *oder* Lift (`-translate-y-0.5` + Schatten), nicht beides gemischt. Modulkarten und
  Signalkarten verhalten sich gleich.
- **Choreografie** beim Laden: Bühne zuerst, dann Briefing-Karten gestaffelt (40–60 ms
  Versatz, je 400–500 ms, `translate-y` 8 px → 0 + Opazität). Einmalig, nicht scroll-gebunden.
- **Kein Ambient** — nichts bewegt sich dauerhaft. Das gehört der Login-Bühne (ADR 0002).
- `prefers-reduced-motion`: Choreografie aus, Mikro auf reinen Farbwechsel reduziert.
- **Erst CSS/Tailwind.** Eine Bibliothek (`motion`) nur, wenn ein Prototyp konkret zeigt, dass
  CSS nicht reicht — dann wird das dort begründet, nicht vorher entschieden.

### Breite & Raster
- Die Startseite nutzt die **volle Breite** neben der Seitenleiste (Layout gibt heute
  `max-w-5xl` vor — die Startseite darf das für sich aufheben; Kopfbalken und Seitenleiste
  bleiben unangetastet).
- Desktop zuerst (Maßstab 1280–1440 px). Muss auf 390 px in **einer Spalte** sauber
  zusammenfallen — kein eigenes Mobildesign, aber kein Auseinanderfallen.

### Token-Schicht
Was die Startseite an gemeinsamen Regeln braucht, kommt als **additive Tokens/Utilities** in
`src/app/globals.css` (Kartenfläche, Hover-Wäsche, Dachzeile, Motion-Dauern/Easing,
Stagger-Utility) — nicht als Startseiten-eigene Klassen. Andere Seiten übernehmen sie später;
die Startseite ist damit Vorreiter, keine Insel. Bestehende Tokens werden nicht umdefiniert.

## 6. Bewertung der Prototypen

Beurteilt wird bei `daten=typisch` und `daten=leer`, bei 1280 px und 390 px, mit Maus
(Hover, Choreografie). Prüffragen, alle mit ja/nein:

1. Sieht die Seite **ohne ein einziges Foto** gestaltet aus?
2. Ist in fünf Sekunden klar, **was neu ist** — und wo sich Öffnen lohnt?
3. Ist Orange der **einzige** Akzent, und stehen die vier CI-Signaturen drin?
4. Trägt der **Leerzustand** die Seite noch — oder bricht sie zusammen?
5. Ist die Bewegung **spürbar, aber nicht auffällig**? (Wer sie beschreibt, hat sie zu viel.)
6. Fällt sie bei 390 px in **eine saubere Spalte**?
7. Würde jemand sagen: „das hat ein Designer gemacht"?

Daniel entscheidet; Kai sieht den Sieger (ggf. Top 2) als „so wird es aussehen — passt das?"
— nicht drei rohe Varianten. Die Prototypen müssen deshalb nicht deploy-tauglich sein.

## 7. Die drei Archetypen

Fix ist alles aus §1–§6. **Variiert** wird der Charakter der Bühne und die Ordnung des
Briefings — gekoppelt zu drei Archetypen, damit Konzepte verglichen werden, nicht Farbnuancen.
Die Bühnenfarbe (Orange / Dunkelbraun) ist je Prototyp frei.

| | **A „Ausgabe"** | **B „Radar-Wall"** | **C „Cockpit"** |
|---|---|---|---|
| Bühne | **editorial** — die Edition als Titelseite: großer Titel, Vorspann, Signalanzahl; Monatsstand als ruhige Zeile | **bildgeführt** — das jüngste Signal/Impuls mit Bild groß, Edition als Aufmacher-Text daneben; Monatsstand als Chips | **kennzahlgeführt** — die vier Neu-Zahlen groß in Displaygröße (`--oelz-orange-dark`), Edition als Zeile darunter |
| Ordnung des Briefings | **ein Block je Modul**, Dachzeile in Orange, Karten als kompakte Liste; wie Ressorts einer Ausgabe | **ein gemischter Strom** neuester Einträge, jede Karte trägt einen Modul-Chip; Bild-links/Text-rechts wie Trendhunter | **Matrix Modul × Zeit** — Zeilen = Module, Spalten = Wochen des Monats; Karten in der Zelle ihres Datums, Bestand als Balken |
| Charakter | ruhig, redaktionell, dicht | lebendig, visuell, scrollend | analytisch, überblickend, kompakt |
| Risiko | wirkt wie eine schönere Version von heute | leer bei `typisch`, dünn ohne Bilder | wird zum Dashboard, verliert die Stimme |

Jeder Archetyp muss auf allen drei Datenlagen laufen. Wenn ein Archetyp bei `leer` nicht mehr
funktioniert, ist das ein Ergebnis, kein Grund zum Nachbessern — dann scheidet er aus.

## 8. Prototyp-Aufbau

- **Ein Branch** `prototype/startseite-2026-08` von `dev`, wie beim Login
  (`prototype/login-2026-08`, ADR 0002).
- **Eine Route** `/prototype/startseite?variant=ausgabe|wall|cockpit&daten=voll|typisch|leer`,
  innerhalb der App-Shell (Kopfbalken, Seitenleiste, Fonts) — vorhandener
  `src/components/prototype/prototype-switcher.tsx` als Umschalter.
- **Gemeinsamer Mock-Datensatz** in einer Datei (`src/components/prototype/startseite/daten.ts`),
  Typen aus `src/types/` wiederverwendet — kein Supabase-Zugriff, keine Migration.
- **Drei Sessions**, je Archetyp eine, damit die Varianten sich nicht angleichen; jede liest
  nur diesen Brief, den ADR und `CONTEXT.md`. Reihenfolge: A → B → C.
- Wegwerf-Code, aber Primärquelle: Der Branch bleibt bestehen; die Umsetzung auf `dev`
  verweist darauf. Der Sieger wird nicht gemergt, sondern in `src/app/(app)/page.tsx` mit
  echten Daten neu gebaut.

## 9. Außerhalb des Vorhabens (Folge-Tickets, nicht vergessen)

- Detailrouten für Impuls und Signal (Deep-Links aus dem Briefing).
- Kategoriefarben global zähmen (Design-Analyse §3e).
- Mobile Modulnavigation (Design-Analyse §3b).
- Login-Untertitel und Startseite-H1 auf „Ölz Intelligence Radar" ziehen (kleine Textänderung,
  Teil der Umsetzung des Siegers).
- Rollen-Hervorhebung auf der Startseite (später, wenn echte Nutzer da sind).
- Retailer- und Food-Radar ins Briefing (sobald belastbare Daten).
- Dark Mode (Tokens existieren, nicht im Pilot — ADR 0002).

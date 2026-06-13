# UI/UX Optimization Plan for Market Intelligence Platform

> Erstellt: Juni 2026 | Status: Entwurf | Scope: Ölz Market Intelligence Platform v1

---

## 1. Executive Summary

Die Plattform ist technisch solide und funktional vollständig für die aktiven Module. Das Fundament — Supabase-Backend, Next.js App Router, shadcn-Komponenten, Serif-Typografie, modulare Architektur — ist richtig gewählt.

**Wo die Plattform heute steht:** Sie fühlt sich wie ein gut gebautes internes Tool an. Die Kernfunktionen sind da, aber das Produkt kommuniziert noch nicht die strategische Relevanz und den Premium-Charakter, die ein B2B-Intelligence-Produkt für eine Führungskraft braucht. Es fehlt die Sprache des Produkts, die visuelle Hierarchie, die dem Nutzer sofort sagt: *Das hier ist die wichtigste Information dieser Woche.*

**Die drei größten Probleme:**
1. **Keine Priorisierung von Informationen** — die Homepage ist ein Modul-Grid ohne Intelligenz; es gibt keine "was ist jetzt wichtig"-Schicht
2. **Inkonsistente Sprache und Typografie** — Englisch/Deutsch-Mix, unterschiedliche Heading-Stile, Markenbegriffe die nicht konsequent eingesetzt werden
3. **Markenfarbe nicht verankert** — `#F07D00` (Ölz Orange) wird nur in 2 hardcodierten Stellen verwendet; der `--primary` Token ist ein dunkles Rotbraun, das mit der Marke nicht übereinstimmt

**Zielzustand:** Eine ruhige, analytische Intelligence-Plattform mit klarer Hierarchie, konsequenter Sprache, starker visueller Differenzierung zwischen Modulen und einem sofort erkennbaren "Premium B2B"-Charakter — ohne große technische Umbauten.

---

## 2. Current Product Impression

### Was das Produkt heute kommuniziert

- **Positiv:** Sauber, strukturiert, funktional. Die Karten-Layouts, die Serif-Typografie in Headlines und die Modularchitektur sind die richtigen Fundamente.
- **Negativ:** Die Plattform fühlt sich an wie ein gut gemeintes Open-Source-Dashboard — nicht wie ein kuratiertes Intelligence-Produkt, für das ein Unternehmen bezahlt.

### Wo es hinter Premium B2B zurückbleibt

| Bereich | Aktueller Zustand | Problem |
|---|---|---|
| Homepage | Modul-Grid | Kein Intelligence-Briefing, keine Orientierung |
| Markenfarbe | Hardcodiert in 2 Stellen | Fehlende Brand-Konsistenz im gesamten System |
| Sprache | Englisch/Deutsch-Mix | Wirkt unfertig und nicht für den Kunden gemacht |
| Typografie | Inkonsistente Page-Header-Stile | Kein einheitliches Design-System |
| Datenfrische | Keine Timestamp-Layer | Nutzer weiß nicht, wie aktuell Inhalte sind |
| Leerzustände | Ein-Satz-Platzhalter | Kein Orientierungsangebot bei fehlenden Daten |
| Filterleiste Produkt-Radar | 28+ Chips gleichzeitig sichtbar | Massive kognitive Belastung |
| Wettbewerber-Seite | Englische Labels | "high priority", "Signals", "No published signals" |
| Competitor-Detail | `{typedCompetitor.watch_priority} priority` | Roh-Datenwert direkt angezeigt |
| Login-Seite | "Market & Competitor Radar" | Veralteter Produktname |
| Sidebar | 6 gesperrte Module sichtbar | Wirkt wie ein unvollständiges Produkt |

---

## 3. Target Experience

Die folgenden 7 Designprinzipien definieren den Zielzustand:

1. **Editorial first** — Jede Seite beginnt mit dem wichtigsten Inhalt, nicht mit Navigation oder Filtern. Die Struktur orientiert sich an kuratierten Nachrichtenprodukten und Analystenbriefings.

2. **Signal vor Rauschen** — Wichtige Signale (Critical/High) sind visuell sofort von Routineeinträgen unterscheidbar. Der Nutzer soll den wichtigsten Inhalt ohne Scrollen identifizieren können.

3. **Konsequente Markensprache** — Deutsche Begriffe durchgängig. Modul-Namen, Badges, Buttons, Leerzustände — alles in einer Stimme, die das Produkt als premium und partnerschaftlich positioniert.

4. **Vertrauen durch Transparenz** — Quellenangaben, Erstellungsdatum, AI-Kennzeichnung und Zuletzt-aktualisiert-Hinweise geben dem Nutzer das Gefühl, die Informationsbasis beurteilen zu können.

5. **Ölz-spezifische Sprache** — Kategorien, Filter und Beschriftungen sprechen die Welt von Ölz. Nicht "Competitor" sondern "Wettbewerber". Nicht "signal_date" sondern "Signaldatum". Produkt-Kategorien aus dem Ölz-Portfolio.

6. **Ruhige visuelle Hierarchie** — Weißraum ist Inhalt. Weniger Badges, weniger Borders, weniger Farbe — aber präziser eingesetzt, um das wirklich Wichtige zu betonen.

7. **Handlungsorientierung** — Jede Karte, jeder Impuls, jedes Signal endet mit einem impliziten oder expliziten Handlungsschritt: Was bedeutet das für Ölz? Was sollte als nächstes passieren?

---

## 4. Key User Personas and Jobs To Be Done

### Persona 1 — Kai Heuberger, Leiter Produktentwicklung & Innovation
- **Kontext:** Schaut etwa einmal pro Woche auf die Plattform
- **Job To Be Done:** *"Zeig mir, welche Produktinnovationen im Markt gerade passieren und ob etwas für Ölz's Sortiment relevant ist."*
- **Primärmodule:** Produkt- & Innovationsradar, Ad-hoc Studien
- **Kritischer Moment:** Das Modal eines Impulses öffnen und sofort die Ölz-Relevanz verstehen
- **Pain Points heute:** Filterleiste zu überwältigend, kein "das ist neu seit deinem letzten Besuch"-Signal, Relevanzfeld nicht prominent genug

### Persona 2 — Marketing / Category Management (zukünftig)
- **Job:** *"Welche Kampagnen, Claims und Distributionsbewegungen zeigen meine Wettbewerber gerade?"*
- **Primärmodule:** Wettbewerbsradar (Editions), Wettbewerber-Detail
- **Kritischer Moment:** Eine Edition öffnen und die Critical-Signals sofort identifizieren
- **Pain Points heute:** Keine visuelle Priorisierung von Critical vs. Notable innerhalb einer Edition

### Persona 3 — Daniel Preuschoff (Admin/Kurator)
- **Job:** *"Effizient Inhalte anlegen, bearbeiten und strukturieren"*
- **Admin-Seiten:** Signal/Impuls/Studie anlegen, Editions builder, Research Agent
- **Pain Points:** Kein Problem im Scope dieses Plans (Admin-UX ist sekundär)

---

## 5. Main UX Problems

Priorisiert nach Business Impact:

### Problem 1 — Die Homepage liefert keine Intelligenz

**Problem:** Die Homepage (`/`) zeigt nur ein Grid von Modul-Kacheln. Keine aktuellen Signale, keine Highlights, kein "was ist diese Woche wichtig".

**Warum es wichtig ist:** Kai öffnet die Plattform einmal pro Woche. Der erste Bildschirm entscheidet, ob er das Produkt als wertvoll wahrnimmt oder nicht. Ein Modul-Grid ist kein Intelligence-Briefing — es ist eine Startseite.

**Wo:** `src/app/(app)/page.tsx`

**Empfehlung:** Homepage in zwei Abschnitte teilen: (1) "Letzte Woche wichtig" — die neueste Edition + die 2-3 letzten Impulse als horizontale Vorschau-Strip — (2) darunter das Modul-Grid. Die Daten dafür sind bereits vorhanden.

**Komplexität:** Mittel

---

### Problem 2 — Primärfarbe stimmt nicht mit der Marke überein

**Problem:** `--primary` in `globals.css` ist `oklch(0.44 0.165 25.0)` — ein dunkles Rotbraun. Die Ölz Markenfarbe Orange `#F07D00` wird nur in 2 hardcodierten `style=`-Props verwendet (Login-Button, PDF-Download-Button).

**Warum es wichtig ist:** Das Produkt soll für Ölz gemacht wirken. Der primäre Interaktionsfarbe (aktiver Sidebar-Eintrag, Focus-Ring, Active-Filter-Chip) sollte entweder die Markenfarbe oder eine dazu passende Neutralfarbe sein. Aktuell entsteht ein unbewusster Disconnect.

**Wo:** `src/app/globals.css` (`:root`), `src/components/nav/module-nav.tsx` (active state), `src/app/(app)/editions/[id]/page.tsx` (active filter chips), `src/app/(app)/produkt-radar/page.tsx` (active filter chips)

**Empfehlung:** `--primary` auf Ölz Orange umstellen: `oklch(0.68 0.17 48.5)` entspricht `#F07D00`. Damit werden alle `bg-primary`, `text-primary`, `border-primary`-Klassen automatisch konsistent. Die 2 hardcodierten `style=`-Props können dann entfernt werden.

**Komplexität:** Niedrig (ein Token ändern, zwei `style=`-Props entfernen)

---

### Problem 3 — Inkonsistente Page-Header-Typografie

**Problem:** Verschiedene Seiten verwenden unterschiedliche Heading-Klassen:
- Edition-Detail: `font-serif text-3xl sm:text-4xl font-bold tracking-wide` ✓
- Produkt-Radar: `text-2xl font-semibold` ✗ (kein Serif)
- Studien: `text-2xl font-semibold` ✗
- Competitors: `text-2xl font-semibold` ✗
- Competitor-Detail: `text-3xl font-semibold` ✗ (kein Serif)
- Module-Placeholder: `text-2xl font-semibold` ✗

**Warum es wichtig ist:** Die Serif-Typografie ist das stärkste visuelle Signal für "editoriales Premium-Produkt". Wo sie fehlt, wirkt die Seite generisch.

**Wo:** 6 Dateien betroffen (siehe oben)

**Empfehlung:** Standard-Heading-Klasse `font-serif text-3xl font-bold tracking-wide text-foreground` für alle primären Page-Titles durchsetzen. Als Utility-Pattern in den einzelnen Dateien konsistent anwenden.

**Komplexität:** Niedrig

---

### Problem 4 — Englisch/Deutsch-Sprachmix

**Problem:** Viele Begriffe sind auf Englisch obwohl die Plattform für einen deutschen Kunden ist:
- "Competitors" (Page-Title, h1)
- "high priority" / "medium priority" (Competitor-Seite und Detail)
- "signals" (Edition-Archiv: "14 signals")
- "Source" (SignalCard Footer)
- "Published" (Edition-Cards)
- "No published signals for this competitor yet." (Competitor-Detail)
- "Category" / "Competitor" (Filter-Labels in Edition-Detail)
- "Clear all filters" (Edition-Detail)
- "Aktiv" (Modul-Card Badge — ok, aber inkonsistent wenn andere Badges auf Deutsch sind)
- "Archive" (Edition-Archiv-Label)
- Login: "Sign in" / "Signing in..."
- Admin: "Research Agent", "New Signal", "New Edition", "Manage Signals" etc.

**Warum es wichtig ist:** Für Kai Heuberger signalisiert dies: "Das wurde nicht wirklich für uns gemacht."

**Wo:** `src/app/(app)/competitors/page.tsx`, `src/app/(app)/competitors/[id]/page.tsx`, `src/components/signal-card/signal-card.tsx`, `src/app/(app)/editions/page.tsx`, `src/app/(app)/editions/[id]/page.tsx`, `src/app/login/page.tsx`, `src/components/nav/app-nav.tsx`

**Empfehlung:** Vollständige Übersetzung aller user-facing Labels. Admin-Menü darf auf Englisch bleiben (nur Daniel sieht es).

**Komplexität:** Niedrig

---

### Problem 5 — Filter-Overload auf Produkt-Radar

**Problem:** Die Filterleiste in `/produkt-radar` zeigt gleichzeitig: Suchfeld + 8 Radar-Typ-Chips + 20 Tag-Chips = bis zu 29 interaktive Elemente als Filter-Area oben auf der Seite.

**Warum es wichtig ist:** Kognitiver Overhead vor dem ersten Inhalt. Die 20 Tags sind fast nie alle gleichzeitig relevant — sie sind "Options" in einer Auswahlliste, keine primären Filter.

**Wo:** `src/app/(app)/produkt-radar/page.tsx`

**Empfehlung:** Die Tag-Filter in ein Collapsed-Dropdown oder "Mehr Filter"-Pattern verschieben. Primär sichtbar: Suchfeld + Radar-Typ-Chips (8 Stück) + Anzahl der Ergebnisse. Tags erst bei Bedarf zugänglich.

**Komplexität:** Mittel

---

### Problem 6 — Keine Datenfrische-Indikatoren

**Problem:** Nutzer sehen keine Information darüber, wann Inhalte zuletzt aktualisiert wurden. Eine Edition hat ein `published_at`-Feld, Signale haben `signal_date`, Impulse haben `created_at`. Keine davon ist prominent als "Zuletzt aktualisiert" kommuniziert.

**Warum es wichtig ist:** Intelligence-Produkte leben von Aktualität. Wenn Kai nicht weiß, ob ein Impuls aus dieser Woche oder vor 3 Monaten stammt, verliert das Produkt an strategischem Wert.

**Wo:** Alle Listing-Seiten, Edition-Header, Impuls-Cards

**Empfehlung:** Subtile "Zuletzt aktualisiert: vor 3 Tagen"-Label in Edition-Header und auf Modul-Übersichtsseiten einführen. Relative Zeitangaben (date-fns `formatDistanceToNow`) statt absoluter Daten wo sinnvoll.

**Komplexität:** Niedrig

---

### Problem 7 — Sidebar zeigt 6 gesperrte Module

**Problem:** Die linke Navigation (`module-nav.tsx`) zeigt alle 9 Module, davon 6 mit Lock-Icon und 45% Opacity. Für Kai sieht dies aus wie ein unfertiges Produkt.

**Warum es wichtig ist:** In einem Premium-B2B-Kontext kommuniziert eine vollgefüllte Navigation mit Locks entweder "du hast nicht die richtige Lizenz" oder "das ist unfertig". Beides ist schlechter als gar keine gesperrten Elemente zu zeigen.

**Wo:** `src/components/nav/module-nav.tsx`

**Empfehlung:** Option A (empfohlen): Gesperrte Module aus der Sidebar entfernen — sie bleiben auf der Homepage sichtbar. Sidebar zeigt nur aktive Module. Option B: Gesperrte Module am Ende als eine zusammengeklappte "Bald verfügbar"-Section gruppieren.

**Komplexität:** Niedrig

---

### Problem 8 — Kein strategischer Kontext in SignalCard

**Problem:** Die `SignalCard` zeigt: Category-Badge, Importance-Badge, Competitor, Date, Headline, Summary, Role-Tags, Source-Link. Es fehlt: strategische Implikation, Handlungsempfehlung für Ölz, Konfidenzindikator.

**Warum es wichtig ist:** Ein Market-Intelligence-Signal ohne "Was bedeutet das für uns?" ist Rohstoff, kein Insight. Kai liest Signale um Entscheidungen zu treffen, nicht um informiert zu sein.

**Wo:** `src/components/signal-card/signal-card.tsx`, `src/types/database.ts` (kein `strategic_implication`-Feld vorhanden)

**Empfehlung:** Kurzfristig: das bestehende `summary`-Feld umbenennen zu "Einschätzung" und konsequent als Implikation formulieren lassen (AI Prompt-Anpassung). Mittelfristig: ein optionales `oelz_implication`-Feld in der Signals-Tabelle ergänzen (einfacher DB-Alter).

**Komplexität:** Niedrig bis Mittel

---

### Problem 9 — Competitor-Detail wirkt wie eine rohe Datensicht

**Problem:** Die Competitor-Detail-Seite (`/competitors/[id]`) zeigt: `{typedCompetitor.watch_priority} priority` (Rohwert ohne Label), `country_ids` als Array von ISO-Codes (z.B. "AT, DE"), englische Heading "Signals (14)".

**Wo:** `src/app/(app)/competitors/[id]/page.tsx`

**Empfehlung:** Watch-Priority übersetzen ("Intensiv beobachten" / "Beobachten" / "Radar"), Country IDs in lesbare Namen umwandeln oder gegen die `countries`-Tabelle joinen, Heading "Aktuelle Signale" statt "Signals".

**Komplexität:** Niedrig

---

### Problem 10 — Leerzustände ohne Orientierung

**Problem:** Leerzustände sind minimale Ein-Satz-Texte: "Keine Impulse gefunden.", "No published signals for this competitor yet." Kein Icon, keine Handlungsempfehlung, keine positive Formulierung.

**Wo:** Alle Listing-Seiten, Edition-Detail, Competitor-Detail

**Empfehlung:** Strukturierter Leerzustand mit Icon + Titel + Untertitel + (falls Admin) CTA-Button. Für Nicht-Admins: erklärende Formulierung ("Für diesen Wettbewerber wurden noch keine Signale veröffentlicht. Neue Signale erscheinen nach der nächsten Recherche.").

**Komplexität:** Niedrig bis Mittel

---

## 6. Visual Design Recommendations

### Layout

- **Content-Breite:** `max-w-5xl` im App-Layout (`layout.tsx:31`) ist für Signal-Listen gut, für das 3-spaltigen Impuls-Grid etwas eng. Empfehlung: `max-w-6xl` oder modul-spezifische Breite über eine eigene `max-w-`-Klasse auf der Page-Ebene.
- **Vertikaler Rhythmus:** `space-y-8` zwischen Sektionen konsequent verwenden (aktuell mix aus `space-y-6`, `space-y-8`, `space-y-4` auf Page-Ebene).
- **Page-Header-Section:** Für alle Pages eine konsistente Struktur: `Back-Link → Breadcrumb → Meta-Zeile (Datum, Anzahl) → h1 → Beschreibung`. Kein Mix.

### Typografie

| Element | Aktuell (uneinheitlich) | Soll |
|---|---|---|
| Page Title (h1) | `text-2xl font-semibold` oder `font-serif text-3xl` | `font-serif text-3xl font-bold tracking-wide` |
| Section Header (h2) | variiert | `text-sm font-semibold uppercase tracking-wider text-muted-foreground` |
| Card Title | `font-serif font-bold text-base` oder `text-[17px]` | `font-serif font-bold text-[17px] leading-snug` |
| Meta-Label | `text-xs text-muted-foreground font-medium` | einheitlich beibehalten |
| Body-Text | `text-sm leading-relaxed` | einheitlich beibehalten |

### Farbe — Primärfarbe umstellen

```css
/* globals.css — Ölz Orange als Primary */
--primary: oklch(0.68 0.17 48.5);        /* #F07D00 */
--primary-foreground: oklch(1 0 0);       /* weiß */
--ring: oklch(0.68 0.17 48.5);
```

Damit werden automatisch: aktive Sidebar-Links, Focus-Rings, aktive Filter-Chips, Module-Card hover-State konsistent in Ölz Orange. Die 2 hardcodierten `style={{ backgroundColor: '#F07D00' }}` können zu `className="bg-primary text-primary-foreground"` werden.

### Spacing

- Karten-Innenabstand: `p-5` ist gut, nicht ändern
- Filter-Abstand zur Karte-Grid: `space-y-6` beibehalten
- Sidebar-Item-Padding: `px-3 py-2` ist gut

### Cards

- **Border Radius:** `rounded-xl` ist konsistent — beibehalten
- **Shadow:** `hover:shadow-md` ist gut. `shadow-[0_1px_2px_...]` auf Default-Cards leicht verstärken: `shadow-sm` statt der aktuellen Custom-Shadow für subtilen Depth-Effekt
- **Card-Hintergrund:** `bg-white` explizit auf allen content-Cards beibehalten (kein `bg-card` auf Karten die auf dem leicht-grauen Background liegen)
- **Critical-Signal-Card:** Die aktuelle `border-primary/20 bg-primary/[0.02]`-Behandlung für `importance === '3'` ist zu subtil. Empfehlung: `border-l-4 border-l-[#F07D00]` als deutlicheres Signal — aber nur für Critical.

### Buttons

- Primär: `bg-primary text-white` (Ölz Orange nach Farbänderung)
- Sekundär: `variant="outline"` beibehalten
- Destruktiv: `variant="destructive"` beibehalten
- Keine `style=`-Props mehr nach Primärfarbänderung

### Tags und Badges

- **Radar-Typ-Badge** (ImpulseCard): gut — farbkodiert, klar abgegrenzt
- **Category-Badge** (SignalCard): gut — farbkodiert
- **Importance-Badge:** "Critical" Badge visueller stärken — aktuell zu ähnlich zu "Important"
- **Role-Relevance-Tags** unten in SignalCard: gut — aber übersetzen (Management, Vertrieb, Innovation, Marketing, Verpackung)
- **"Aktiv"-Badge** auf Modul-Cards: entfernen — unnötig, der Card-Link kommuniziert es bereits
- **Watch-Priority-Badge** auf Competitor-Detail: in deutschsprachige Begriffe umwandeln

### Icons

Aktuelle Lucide-Icon-Auswahl ist passend. Zusätzlich empfehlenswert:
- `Calendar` für Datumsangaben statt bloßer Text
- `TrendingUp` / `TrendingDown` für Importance-Indikatoren
- `Sparkles` für AI-generierte Inhalte (konsistenter als der aktuelle Text-Badge)
- `Clock` für "Zuletzt aktualisiert"-Indikatoren

### Motion und Microinteractions

Aktuell: `hover:-translate-y-0.5`, `hover:shadow-md`, `hover:translate-x-0.5` (Chevron). Das ist gut und zurückhaltend. Nicht mehr hinzufügen.

---

## 7. Information Architecture Recommendations

### Navigation — Sidebar

**Aktuell:** 9 Module (3 aktiv, 6 gesperrt) immer sichtbar.

**Empfehlung:**
```
Sidebar zeigt nur:
├── Wettbewerbsradar          [aktiv]
├── Produkt- & Innovationsradar [aktiv]
└── Ad-hoc Studien            [aktiv]

Auf der Homepage: Modul-Grid zeigt alle 9 (aktiv + coming soon)
```

Wenn zukünftig ein Modul aktiviert wird: `status: 'active'` in `modules.ts` → automatisch in Sidebar.

### Navigation — Modul-Sub-Navigation

**Problem:** Im Wettbewerbsradar gibt es conceptuell zwei Bereiche: Editions (kuratierte Berichte) und Wettbewerber-Profile. Diese Unterscheidung ist in der Sidebar nicht sichtbar — Editions ist der Einstieg, aber es gibt keine Möglichkeit direkt zu "Wettbewerber" zu navigieren ohne die globale `/competitors` URL zu kennen.

**Empfehlung:** Optionale Modul-Sub-Nav wenn ein Modul aktiv ist — unter dem aktiven Modul-Link eingeblendet:
```
► Wettbewerbsradar
   ├── Editions
   └── Wettbewerber
```

Implementierbar in `module-nav.tsx` mit einem optionalen `subItems`-Array im `MODULES`-Config.

### Page Hierarchy

Alle Seiten folgen diesem Muster:
```
[Breadcrumb / Back-Link]
[Page Header Section]
  [h1 — Serif, 3xl, bold]
  [Meta-Zeile — Datum, Anzahl, Status]
  [Beschreibung — 1-2 Sätze]
[Filter / Controls]
[Content]
[Pagination]
```

### User Flow — Wettbewerbsradar

```
Homepage → Wettbewerbsradar → Edition-Liste → Edition-Detail → Signal (expanded inline)
                             ↘ Wettbewerber-Liste → Wettbewerber-Detail
```

Der direkte Link zu Wettbewerber-Profilen fehlt aktuell in der Hauptnavigation.

---

## 8. Module-by-Module Recommendations

### 8.1 Homepage — Modul-Hub

**Aktueller Zustand:** Grid aus 9 Modul-Kacheln (3 aktiv, 6 coming soon).

**UX/UI-Schwächen:**
- Kein Intelligence-Content auf der wichtigsten Seite
- "Aktiv"-Badge auf aktiven Kacheln ist redundant und marketing-artig
- Dashed-Border auf coming-soon-Kacheln wirkt unfertig
- Keine Information darüber, was seit dem letzten Besuch neu ist

**Zielzustand:** Intelligence Briefing + Modul-Grid:

```
[Page: Ölz Market Intelligence]

## Diese Woche
[Neueste Edition — Featured Card mit Titel + Summary-Teaser + CTA "Zur Edition"]
[Neueste 3 Impulse — horizontaler Strip mit Mini-Cards]

## Module
[Modul-Grid — aber ohne "Aktiv"-Badge, coming-soon Kacheln dezenter]
```

**Spezifische Änderungen:**
- `src/app/(app)/page.tsx`: Server Component um Supabase-Calls für letzte Edition + letzte 3 Impulse erweitern
- `src/components/module-card.tsx`: "Aktiv"-Badge entfernen; Coming-soon-Kacheln: `opacity-50` statt `opacity-60`, Dashed-Border beibehalten aber feiner
- Neuer Abschnitt "Diese Woche" mit `LatestEditionTeaser` + `RecentImpulseStrip`-Komponenten

---

### 8.2 Wettbewerbsradar — Edition-Liste

**Aktueller Zustand:** Neueste Edition featured, ältere als Archive-Liste.

**UX/UI-Schwächen:**
- "Latest" Badge in Secondary-Color — zu wenig Kontrast/Bedeutung
- "signals" (Englisch) im Featured Card und im Archiv
- "Published" Datum (Englisch)
- Archive-Label auf Englisch
- Kein Signal-Count im featured Card-Header

**Zielzustand:**
- "Aktuelle Ausgabe" statt "Latest" Badge (in Primärfarbe = Ölz Orange)
- "X Signale" statt "X signals"
- "Veröffentlicht" statt "Published"
- "Archiv" statt "Archive"
- Featured Card: Datum prominent, Signal-Count sichtbar

**Dateien:** `src/app/(app)/editions/page.tsx`

---

### 8.3 Wettbewerbsradar — Edition-Detail

**Aktueller Zustand:** Back-Link, Header-Meta, h1, Editorial-Summary, Filter-Chips, Signal-Cards, Pagination.

**UX/UI-Schwächen:**
- Filter-Label "Category" und "Competitor" auf Englisch
- "Clear all filters" auf Englisch
- "X–Y von Z Signals" — "Signals" auf Englisch
- "← Zurück" und "Weiter →" — Pfeile als Text-Arrows, nicht als Icons (inkonsistent mit anderen Hover-Arrows die Icon nutzen)
- "Editions" Back-Link ohne klare Breadcrumb-Semantik

**Zielzustand:**
- "Kategorie" / "Wettbewerber" als Filter-Labels
- "Alle Filter zurücksetzen"
- "X–Y von Z Signalen"
- `ArrowLeft`/`ArrowRight` Lucide Icons in Pagination-Buttons
- Back-Link: "← Alle Editions" mit `ChevronLeft`-Icon

**Dateien:** `src/app/(app)/editions/[id]/page.tsx`

---

### 8.4 SignalCard — Komponente

**Aktueller Zustand:** Category + Importance Badges, Headline, Summary, Role-Tags, Source.

**UX/UI-Schwächen:**
- "Source" als Link-Label (Englisch)
- "AI"-Badge Text-only ohne Icon — wirkt technisch
- Role-Relevance-Labels auf Englisch (werden in DB als 'management', 'sales' etc. gespeichert und über `ROLE_LABELS` auf "Management", "Sales" etc. übersetzt — gut, aber "Sales" sollte "Vertrieb" werden)
- Importance "Critical" visuell zu wenig hervorgehoben
- Kein Hinweis auf strategische Bedeutung oder Ölz-Relevanz

**Zielzustand:**
- "Quelle" statt "Source" als Link-Label (oder Link-Icon nur ohne Text)
- `Sparkles`-Icon statt "AI"-Text-Badge
- "Vertrieb" statt "Sales" in ROLE_LABELS
- Critical-Signal: deutlicher linker Rand in Ölz Orange (`border-l-4 border-l-primary`) statt der aktuellen subtilen Hintergrund-Tönung
- Optional: ein optionales `oelz_implication`-Feld als grau-border Absatz am Ende

**Dateien:** `src/components/signal-card/signal-card.tsx`, `src/types/database.ts` (ROLE_LABELS)

---

### 8.5 Wettbewerber-Liste

**Aktueller Zustand:** Gruppiert nach high/medium/low priority, Divider-Liste, Signal-Count.

**UX/UI-Schwächen:**
- h1 "Competitors" auf Englisch
- "high priority", "medium priority", "low priority" auf Englisch
- `country_ids` als Array von ISO-Codes (z.B. ["AT", "DE"]) ohne lesbare Namen
- Kein Eingangselement (Beschreibungstext fehlt)

**Zielzustand:**
- h1: "Wettbewerber-Profile"
- Section-Labels: "Intensiv beobachtet" / "Im Blick" / "Auf dem Radar"
- Country-IDs: entweder gegen eine Map übersetzen (AT → Österreich) oder aus der `countries`-Tabelle joinen
- Kurze Beschreibung unter dem h1

**Dateien:** `src/app/(app)/competitors/page.tsx`

---

### 8.6 Wettbewerber-Detail

**Aktueller Zustand:** Name, Full-Name, Watch-Priority Badge, Country-Tags, Categories, Description, Signal-Liste.

**UX/UI-Schwächen:**
- `{typedCompetitor.watch_priority} priority` — Rohwert direkt angezeigt ("high priority")
- h2 "Signals" auf Englisch
- Leerzustand "No published signals for this competitor yet." auf Englisch
- Kein Back-Link zur Competitor-Liste
- `country_ids` als ISO-Code-Array

**Zielzustand:**
- Watch-Priority in deutschem Label: "Intensiv beobachtet" / "Im Blick" / "Auf dem Radar"
- Back-Link "← Alle Wettbewerber"
- h2: "Aktuelle Signale (14)"
- Leerzustand auf Deutsch mit erklärendem Text

**Dateien:** `src/app/(app)/competitors/[id]/page.tsx`

---

### 8.7 Produkt- & Innovationsradar

**Aktueller Zustand:** h1 (ohne Serif), Beschreibung, Suchfeld, 8 Typ-Chips, 20 Tag-Chips, 3-spaltiges ImpulseCard-Grid, Pagination.

**UX/UI-Schwächen:**
- h1 `text-2xl font-semibold` — kein Serif (Inkonsistenz)
- 28+ Filter-Elemente gleichzeitig sichtbar
- Tag-Filter und Typ-Filter optisch nicht differenziert (beide `px-2.5 py-1 rounded-full border`)
- Kein Ergebnis-Counter ("X Impulse")
- Aktiver Type-Filter: `bg-foreground text-background` (schwarz) — inkonsistent mit Edition-Detail-Filters die `bg-primary` nutzen

**Zielzustand:**
- Serif-h1
- Primärfilter: Suchfeld + Typ-Chips
- Sekundärfilter: "Weitere Filter" Dropdown für Tags (collapsed by default)
- Typ-Filter: aktiv mit Primärfarbe (Ölz Orange) statt Schwarz
- Ergebnis-Counter: "23 Impulse gefunden"

**Dateien:** `src/app/(app)/produkt-radar/page.tsx`

---

### 8.8 ImpulseCard + Modal

**Aktueller Zustand:** Bild, Radar-Typ-Badge, Datum, Titel (Serif), Short-Signal, Ölz-Relevanz (amber border-l), Tags, "Detail ansehen" CTA → Modal.

**UX/UI-Schwächen:**
- Cards ohne Bild wirken deutlich schwächer (Leerraum wo Bild sein sollte — das Bild fehlt schlicht, kein Fallback-Design)
- "Detail ansehen" Text ist zu klein und zu wenig prominent als CTA
- Im Modal: Section-Labels "Was ist neu oder bemerkenswert?", "Marktsignal", "Produktbeleg / Marktbeispiel" sind sehr lang und wenig scannable
- `sm:max-w-lg` — Modal könnte breiter sein für bessere Lesbarkeit: `sm:max-w-xl`
- Kein Schließen-Button sichtbar in der Vorschau (ist per `showCloseButton` drin aber UI-Test empfohlen)

**Zielzustand:**
- Cards ohne Bild: Fallback-Gradient oder Radar-Typ-Color als Hintergrundfläche
- Section-Labels im Modal kürzer: "Neuheit", "Marktbewegung", "Beispiel aus dem Markt"
- Modal: `sm:max-w-xl`

**Dateien:** `src/components/impulse-card.tsx`

---

### 8.9 Ad-hoc Studien

**Aktueller Zustand:** h1 (ohne Serif), Suchfeld, Tag-Chips, 2-spaltiges Grid mit StudyCards, Detail-Seite.

**UX/UI-Schwächen:**
- h1 `text-2xl font-semibold` — kein Serif
- StudyCard: `FileText`-Icon + "Studie öffnen" — könnte ansprechender sein
- Detail-Seite: PDF-Download-Button mit hardcodiertem `style={{ backgroundColor: '#F07D00' }}`
- Detail-Seite: kein `max-w-`-Constraint auf dem Content-Body → breiter Text ist schwer lesbar

**Zielzustand:**
- Serif-h1
- StudyCard: PDF-Icon prominent, ggf. Seitenanzahl wenn verfügbar
- Detail-Seite: PDF-Button via `bg-primary text-primary-foreground`
- Detail-Seite: `max-w-prose` auf dem Text-Content-Bereich

**Dateien:** `src/app/(app)/studien/page.tsx`, `src/app/(app)/studien/[id]/page.tsx`, `src/components/study-card.tsx`

---

### 8.10 Module Placeholder (Coming Soon)

**Aktueller Zustand:** Back-Link, Icon, Modul-Name + Lock-Badge, Beschreibung, "Geplante Inhalte"-Liste.

**UX/UI-Schwächen:**
- h1 `text-2xl font-semibold` — kein Serif
- `CheckCircle2`-Icons vor "Geplanten Inhalten" klingt wie "bereits erledigt" — falsche Semantik
- Keine ETA-Prominenz
- Kein Kontakt/Anfrage-Hinweis

**Zielzustand:**
- Serif-h1
- `CircleDot` oder `Clock`-Icons statt `CheckCircle2`
- ETA prominent: "Geplant für Q1 2027" als eigene Zeile
- Optional: "Haben Sie Interesse an diesem Modul? Kontaktieren Sie Ihren Ansprechpartner."

**Dateien:** `src/components/module-placeholder.tsx`

---

### 8.11 Login-Seite

**Aktueller Zustand:** Logo, "Ölz Intelligence" / "Market & Competitor Radar", Email + Password, Sign-in-Button.

**UX/UI-Schwächen:**
- "Market & Competitor Radar" ist der alte Produktname — sollte "Market Intelligence Plattform" sein
- "Sign in" / "Signing in..." auf Englisch
- Keine visuelle Differenzierung zwischen Login-Seite und App (selbes Background-Color)

**Zielzustand:**
- Untertitel: "Market Intelligence Plattform"
- Button: "Anmelden" / "Anmeldung läuft…"
- Optional: leicht dunklerer oder strukturierter Background auf Login-Seite

**Dateien:** `src/app/login/page.tsx`

---

## 9. Insight Card and Detail View Redesign

### Empfohlene Struktur — SignalCard (Wettbewerbsradar)

```
┌─────────────────────────────────────────────────────────┐
│ [Kategorie-Badge]  [Wichtigkeit-Badge]  [Wettbewerber]  │ ← Header-Row
│                                           [Datum]       │
├─────────────────────────────────────────────────────────┤
│ Headline (Serif, 17px, bold)                            │ ← Titel
│ Summary / Marktbeobachtung (sm, muted, 2-3 Zeilen)     │ ← Body
├─────────────────────────────────────────────────────────┤
│ [Rollenrelevanz-Tags] ................... [Quelle ↗]   │ ← Footer
└─────────────────────────────────────────────────────────┘

Bei importance='3' (Kritisch):
┌─ orange ─────────────────────────────────────────────────┐
│ (border-l-4 in Primärfarbe)                              │
│ Wie oben, aber mit subtil anderem Hintergrund            │
└─────────────────────────────────────────────────────────┘
```

### Empfohlene Struktur — ImpulseCard (Produkt-Radar)

```
┌─────────────────────────────────────────────────────────┐
│ [Bild — 4:3, full-width] ODER [Typ-Color-Gradient]     │ ← Visual
├─────────────────────────────────────────────────────────┤
│ [Radar-Typ Badge]                    [Datum]            │
│ Impulstitel (Serif, bold)                               │
│ Kurzsignal (xs, muted, max 2 Zeilen)                   │
├─── amber left-border ──────────────────────────────────┤
│ Ölz-Relevanz (xs, amber-Akzent)                        │
├─────────────────────────────────────────────────────────┤
│ [Tag] [Tag] [Tag]                    Detail →           │
└─────────────────────────────────────────────────────────┘
```

### Empfohlene Modal-Struktur (ImpulseModal)

```
Sektion 1 — Visual + Kontext
  Bild (falls vorhanden, aspect-video)
  Radar-Typ Badge · Datum · [Tags]
  Impulstitel (h2, Serif, xl)

Sektion 2 — Schnell scannen (2-col Grid, bordered)
  Kategorie | Markt
  Kanal     | Hauptclaim

Sektion 3 — Was passiert im Markt?
  "Neuheit"        → what_is_new
  "Marktbewegung"  → market_signal
  "Beispiel"       → product_example

Sektion 4 — Trend-Resonanz (amber-50 bg, 3 Einträge)

Sektion 5 — Relevanz für Ölz (hervorgehoben)
  "Relevanz für Ölz"     → oelz_development_relevance
  "Möglicher Transfer"   → possible_oelz_transfer (italic, border-l)

Sektion 6 — Quelle
  Externer Link
```

### Empfohlene Felder für zukünftige Signal-Erweiterung

| Feld | Typ | Zweck |
|---|---|---|
| `oelz_implication` | text | Konkrete strategische Implikation für Ölz |
| `time_sensitivity` | enum: 'sofort' / '3 Monate' / '12 Monate' | Handlungsdringlichkeit |
| `confidence` | enum: 'hoch' / 'mittel' / 'niedrig' | Quellenqualität / Sicherheit |
| `related_signal_ids` | uuid[] | Verlinkung ähnlicher Signale |

---

## 10. Customer-Specific Adaptation Layer

Die Plattform soll für Kai Heuberger *maßgeschneidert* wirken, nicht generisch. Folgende Anpassungsebenen sind empfohlen:

### Produktkategorien als Filter

Ölz's Kernkategorien als explizite Filter in Produkt-Radar und Wettbewerbsradar:
- Croissant & Plunder
- Süßes Gebäck
- Toast & Sandwich
- Snack & Mini-Format
- Saisonal

Diese Kategorien können als erste Ebene der `IMPULSE_TAGS` und `SignalCategory`-Taxonomie verankert werden.

### Strategische Themen als Filter-Ebene

Übergeordnete strategische Themen die Kai relevant sind:
- Proteinisierung
- Clean Label
- Premiumisierung
- Convenience / On-the-go
- Nachhaltigkeit

Implementierbar als optionale `strategic_theme`-Spalte in `innovation_impulses` (und ggf. in `signals`).

### Sprache der Ölz-Produktwelt

Alle AI-Prompts (extract-impulse, extract-signal) sollten explizit auf Ölz's Sortiment verweisen — das ist bereits in `extract-impulse.ts` teilweise vorhanden, sollte aber noch stärker werden (Croissant, Kipferl, Laugen, Gugelhupf, Striezel etc.).

### Markt-Fokus als Default

In Filtern: AT / DE / CH als primäre Märkte, CZ / SK / SI als sekundär. Diese Gewichtung sollte sich in der Reihenfolge der Country-Filter und in AI-Priorisierungen widerspiegeln.

### Branding-Akzente

- Der Ölz-Orange-Primary-Token einmalig setzen → überall konsistent
- Das Ölz-Logo in der Nav konsequent als Identitätsanker verwenden (bereits vorhanden — gut)
- Modul-Farben (Blau für Wettbewerb, Emerald für Innovation, Amber für Studien) als Leitsystem konsequent einsetzen — z.B. als subtiler farbiger Balken oben auf Modul-Pages

---

## 11. Design System Plan

### Bestehende Komponenten — Status

| Komponente | Datei | Status | Problem | Empfehlung |
|---|---|---|---|---|
| `AppNav` | `nav/app-nav.tsx` | Gut | Admin-Items auf Englisch | Deutsch-Labels für admin items |
| `ModuleNav` | `nav/module-nav.tsx` | Funktional | Zeigt alle 9 Module | Nur aktive zeigen |
| `ModuleCard` | `module-card.tsx` | Gut | "Aktiv"-Badge redundant | Badge entfernen |
| `ModulePlaceholder` | `module-placeholder.tsx` | Funktional | Kein Serif-h1, falsche Icons | Anpassen |
| `SignalCard` | `signal-card/signal-card.tsx` | Gut | Englische Labels, schwaches Critical-Styling | Überarbeiten |
| `ImpulseCard` | `impulse-card.tsx` | Gut | Cards ohne Bild wirken leer, Modal zu schmal | Fallback + Breite |
| `StudyCard` | `study-card.tsx` | Gut | Kein Serif-h1 auf Übersichtsseite | Seitenebene |
| `Badge` | `ui/badge.tsx` | Gut | — | Keine Änderung |
| `Button` | `ui/button.tsx` | Gut | Primärfarbe nach Token-Änderung ok | — |
| `Dialog` | `ui/dialog.tsx` | Gut | — | — |

### Neu zu erstellende Komponenten

| Komponente | Zweck | Dateipfad |
|---|---|---|
| `PageHeader` | Einheitlicher Page-Header (Back-Link + Meta + h1 + Beschreibung) | `src/components/page-header.tsx` |
| `EmptyState` | Wiederverwendbarer Leerzustand (Icon + Titel + Untertitel + optional CTA) | `src/components/empty-state.tsx` |
| `FilterChips` | Chip-Gruppe für Filter mit Active/Inactive State | `src/components/filter-chips.tsx` |
| `FreshnessTag` | "Aktualisiert vor X Tagen" Label | `src/components/freshness-tag.tsx` |
| `LatestEditionTeaser` | Featured-Karte für Homepage-Briefing | `src/components/latest-edition-teaser.tsx` |
| `RecentImpulseStrip` | Horizontaler Strip der letzten 3 Impulse | `src/components/recent-impulse-strip.tsx` |
| `PriorityBadge` (DE) | Deutsch-sprachige Watch-Priority-Anzeige | Teil von `src/components/competitor-card.tsx` |

---

## 12. Implementation Roadmap

### Phase 1 — Schnelle Gewinne (0,5–1 Tag)

**Ziel:** Sprache, Typografie und Markenfarbe konsistent machen. Keine neuen Komponenten nötig.

| Task | Datei(en) | Impact |
|---|---|---|
| Primärfarbe auf Ölz Orange setzen | `globals.css` | Hoch |
| Hardcodierte `style={{ backgroundColor: '#F07D00' }}` entfernen | `login/page.tsx`, `studien/[id]/page.tsx` | Niedrig |
| Alle h1-Headings auf Serif-Klassen vereinheitlichen | `produkt-radar/page.tsx`, `studien/page.tsx`, `competitors/page.tsx`, `competitors/[id]/page.tsx`, `module-placeholder.tsx` | Mittel |
| Englische Labels übersetzen | `editions/page.tsx`, `editions/[id]/page.tsx`, `competitors/page.tsx`, `competitors/[id]/page.tsx`, `signal-card.tsx`, `login/page.tsx` | Mittel |
| "Aktiv"-Badge aus ModuleCard entfernen | `module-card.tsx` | Niedrig |
| Gesperrte Module aus Sidebar entfernen | `module-nav.tsx` | Niedrig |
| Login-Seitenuntertitel aktualisieren | `login/page.tsx` | Niedrig |
| Watch-Priority auf Deutsch | `competitors/page.tsx`, `competitors/[id]/page.tsx` | Niedrig |

**Risiko:** Minimal — nur CSS-Token und Text-Labels.

---

### Phase 2 — Core UX Redesign (1–2 Tage)

**Ziel:** Informationsarchitektur verbessern, Filter-Overload reduzieren, Leerzustände aufwerten.

| Task | Datei(en) | Impact |
|---|---|---|
| Homepage: "Diese Woche"-Sektion mit letzter Edition + Impulsen | `app/(app)/page.tsx` | Hoch |
| Tag-Filter in Produkt-Radar kollapsieren | `produkt-radar/page.tsx` | Mittel |
| `EmptyState`-Komponente erstellen und einsetzen | Alle Listing-Seiten | Mittel |
| Critical-Signal visuell stärken (border-l-4 Primärfarbe) | `signal-card/signal-card.tsx` | Mittel |
| ImpulseCard-Fallback für fehlende Bilder (Gradient) | `impulse-card.tsx` | Mittel |
| Modal-Breite auf `sm:max-w-xl` | `impulse-card.tsx` | Niedrig |
| Back-Link zur Competitor-Liste in Competitor-Detail | `competitors/[id]/page.tsx` | Niedrig |
| country_ids lesbar machen | `competitors/page.tsx`, `competitors/[id]/page.tsx` | Niedrig |

**Risiko:** Gering — serverseitige Datenlogik für Homepage minimal, keine Breaking Changes.

---

### Phase 3 — Premium SaaS Polish (1–2 Tage)

**Ziel:** Datenfrische-Indikatoren, Paginierungs-Verbesserungen, Typografie-Mikrokorrekturen.

| Task | Datei(en) | Impact |
|---|---|---|
| `FreshnessTag`-Komponente für Modules und Edition-Header | Neue Komponente + Integration | Mittel |
| `PageHeader`-Komponente erstellen und einheitlich einsetzen | Neue Komponente + 5 Seiten | Mittel |
| Pagination-Arrows als Icons statt Text | `editions/[id]/page.tsx`, `produkt-radar/page.tsx` | Niedrig |
| Modul-Sub-Navigation für Wettbewerbsradar | `module-nav.tsx`, `modules.ts` | Mittel |
| Ergebnis-Counter in Filtersektionen | `produkt-radar/page.tsx`, `studien/page.tsx` | Niedrig |
| `Sparkles`-Icon für AI-Badge statt Text | `signal-card/signal-card.tsx` | Niedrig |
| Module-Farbbalken (top-border) auf Modul-Pages | `produkt-radar/page.tsx`, `studien/page.tsx` | Niedrig |

**Risiko:** Gering — keine Backend-Änderungen.

---

### Phase 4 — Customer-Specific Adaptation (1–2 Tage)

**Ziel:** Ölz-spezifische Taxonomie tiefer verankern.

| Task | Datei(en) | Impact |
|---|---|---|
| Ölz-Produktkategorien als primäre Filter-Ebene | `types/innovation.ts`, `produkt-radar/page.tsx` | Mittel |
| Strategic-Theme-Tags (`Proteinisierung`, `Clean Label`, etc.) | `types/innovation.ts`, DB-Migration | Mittel |
| AI-Prompts stärker auf Ölz-Portfolio-Sprache ausrichten | `lib/ai/extract-impulse.ts`, `lib/ai/extract-signal.ts` | Mittel |
| Markt-Sortierung (AT/DE/CH primär in Filter-Listen) | `types/database.ts`, Query-Ordering | Niedrig |

**Risiko:** Gering für Prompt-Anpassungen, Mittel für DB-Migrationen (backward-kompatibel).

---

### Phase 5 — Enterprise Readiness (2–3 Tage, zukünftig)

**Ziel:** Export, Saved Views, Confidence-Indikatoren, Onboarding.

| Task | Datei(en) | Impact |
|---|---|---|
| PDF-Export für Editions (Print-CSS) | Neue Route + Print-Styles | Hoch |
| Saved Filter Views (localStorage oder DB) | Neue Komponente + Schema | Mittel |
| Confidence-Indikator für Signale und Impulse | DB-Migration + UI | Mittel |
| Onboarding-Modal für neue Nutzer | Neue Komponente | Mittel |
| Erster-Besuch-Hinweis "Zuletzt aktiv: nie" | User-Profile-Ergänzung | Niedrig |

**Risiko:** Mittel — einige neue DB-Felder und komplexere UI-Komponenten.

---

## 13. Prioritized Backlog

| Prio | Task | Impact | Komplexität | Owner-Rolle | Akzeptanzkriterium |
|---|---|---|---|---|---|
| P0 | Primärfarbe → Ölz Orange (`globals.css`) | Hoch | Niedrig | Frontend | Alle `text-primary`, `bg-primary`-Klassen zeigen `#F07D00` |
| P0 | Alle h1-Headings auf Serif vereinheitlichen | Hoch | Niedrig | Frontend | 6 Seiten zeigen `font-serif text-3xl font-bold` |
| P0 | Englische Labels übersetzen (6 Dateien) | Hoch | Niedrig | Frontend | Kein englisches Label in user-facing UI außer Admin-Menü |
| P1 | Gesperrte Module aus Sidebar | Mittel | Niedrig | Frontend | Sidebar zeigt nur 3 aktive Module |
| P1 | "Aktiv"-Badge von ModuleCard entfernen | Niedrig | Niedrig | Frontend | Keine grünen "Aktiv"-Badges |
| P1 | Homepage: Letzte Edition + Impulse anzeigen | Hoch | Mittel | Full-Stack | Homepage zeigt Briefing-Sektion mit aktuellen Inhalten |
| P1 | EmptyState-Komponente + einsetzen | Mittel | Niedrig | Frontend | Alle Leerzustände haben Icon + Titel + Text |
| P1 | Critical-Signal-Card: border-l-4 primär | Mittel | Niedrig | Frontend | Critical-Signale haben deutlichen orangefarbenen Rand |
| P2 | Tag-Filter in Produkt-Radar kollapsieren | Mittel | Mittel | Frontend | Nur 8 Typ-Filter sofort sichtbar, Tags hinter "Weitere Filter" |
| P2 | ImpulseCard-Fallback für fehlende Bilder | Mittel | Niedrig | Frontend | Cards ohne Bild zeigen Radar-Typ-Farbgradient |
| P2 | Watch-Priority auf Deutsch + Back-Link in Competitor-Detail | Niedrig | Niedrig | Frontend | Keine englischen Priority-Labels, Back-Link vorhanden |
| P2 | country_ids lesbar machen | Niedrig | Niedrig | Frontend | AT → Österreich, DE → Deutschland etc. |
| P2 | PageHeader-Komponente | Mittel | Mittel | Frontend | Alle Seiten nutzen einheitliche Header-Struktur |
| P2 | FreshnessTag-Komponente | Mittel | Niedrig | Frontend | Editions + Module zeigen relative Zeitangabe |
| P3 | Modul-Sub-Navigation Wettbewerbsradar | Mittel | Mittel | Frontend | Sidebar zeigt Editions + Wettbewerber als Sub-Items |
| P3 | AI-Badge: Sparkles-Icon statt Text | Niedrig | Niedrig | Frontend | AI-generierte Signale zeigen Sparkles-Icon |
| P3 | Login: Produktname + deutsche Labels | Niedrig | Niedrig | Frontend | "Market Intelligence Plattform", "Anmelden" |
| P4 | Strategic-Theme-Tags in Impulse-Typen | Mittel | Mittel | Full-Stack | Neue Tag-Gruppe "Strategische Themen" in Produkt-Radar |
| P4 | PDF-Export für Editions | Hoch | Hoch | Full-Stack | Edition kann als PDF exportiert werden |

---

## 14. Concrete File-Level Recommendations

| Datei | Änderungstyp | Beschreibung |
|---|---|---|
| `src/app/globals.css` | Token-Änderung | `--primary` auf Ölz Orange (`oklch(0.68 0.17 48.5)`) setzen; `--primary-foreground: oklch(1 0 0)` |
| `src/app/login/page.tsx` | Text + Styling | "Market Intelligence Plattform", "Anmelden", hardcodiertes `style=` entfernen |
| `src/app/(app)/page.tsx` | Neue Logik | Supabase-Calls für neueste Edition + letzte 3 Impulse; neuen "Diese Woche"-Abschnitt |
| `src/app/(app)/editions/page.tsx` | Text | "Latest"→"Aktuelle Ausgabe", "signals"→"Signale", "Published"→"Veröffentlicht", "Archive"→"Archiv" |
| `src/app/(app)/editions/[id]/page.tsx` | Text + Icons | "Category"→"Kategorie", "Competitor"→"Wettbewerber", "Clear all filters"→"Alle zurücksetzen", Pagination-Icons |
| `src/app/(app)/competitors/page.tsx` | Text + Daten | h1 auf Deutsch, Priority-Labels auf Deutsch, country_ids übersetzen |
| `src/app/(app)/competitors/[id]/page.tsx` | Text + Daten | Back-Link, Priority-Badge auf Deutsch, h2 auf Deutsch, Leerzustand auf Deutsch |
| `src/app/(app)/produkt-radar/page.tsx` | Serif h1, Filter-UX | Serif-Klassen auf h1, Tag-Filter kollapsieren, aktiver Filter in Primärfarbe statt Schwarz |
| `src/app/(app)/studien/page.tsx` | Serif h1 | Klassen auf h1 |
| `src/app/(app)/studien/[id]/page.tsx` | Styling | `style=` entfernen → `bg-primary text-primary-foreground`; `max-w-prose` auf Content |
| `src/components/nav/module-nav.tsx` | Logik | Gesperrte Module aus Sidebar filtern |
| `src/components/module-card.tsx` | UI | "Aktiv"-Badge entfernen |
| `src/components/module-placeholder.tsx` | Text + Icons | Serif-h1, `CheckCircle2` → `CircleDot`, ETA prominenter |
| `src/components/signal-card/signal-card.tsx` | Text + Styling | Englische Labels, Critical-Signal-Border, AI-Icon |
| `src/components/impulse-card.tsx` | UI | Fallback für fehlende Bilder, Modal-Breite `sm:max-w-xl`, Section-Labels kürzer |
| `src/components/study-card.tsx` | Minor | Kein Änderungsbedarf (Card selbst ist gut) |
| `src/types/database.ts` | Text | `ROLE_LABELS`: "Sales"→"Vertrieb" |
| `src/lib/modules.ts` | Kein Änderungsbedarf | Struktur ist gut |

---

## 15. Acceptance Criteria

Nach Implementierung gelten folgende Kriterien als Erfolg:

### Visuelle Konsistenz
- [ ] Alle primären Page-Titles (`h1`) verwenden `font-serif text-3xl font-bold tracking-wide`
- [ ] Alle interaktiven Primärelemente (aktive Filter, aktive Nav-Links, primäre Buttons, Focus-Rings) erscheinen in Ölz Orange
- [ ] Kein hardcodiertes `style={{ backgroundColor: '#F07D00' }}` mehr im Code

### Sprache
- [ ] Kein englischer Term in user-facing UI außerhalb des Admin-Menüs (das nur Daniel sieht)
- [ ] Watch-Priority-Labels auf Deutsch im gesamten Competitor-Bereich
- [ ] Login-Seite vollständig auf Deutsch

### Information Architecture
- [ ] Sidebar zeigt nur aktive Module (3 Stück)
- [ ] Homepage zeigt aktuelle Inhalte (letzte Edition + Impulse) vor dem Modul-Grid
- [ ] Competitor-Detail-Seite hat einen Back-Link zur Competitor-Liste

### UX
- [ ] Produkt-Radar zeigt maximal 8 Typ-Filter prominent; Tags sind hinter "Weitere Filter" zugänglich
- [ ] Critical-Signale sind visuell sofort von Notable-Signalen unterscheidbar
- [ ] Alle Leerzustände haben Icon + Titel + erklärenden Text (kein Ein-Satz-Placeholder mehr)
- [ ] ImpulseCards ohne Bild zeigen einen visuellen Fallback (kein weißer Leerraum)

### Performance und Technik
- [ ] Keine neuen TypeScript-Fehler durch die Änderungen
- [ ] Build auf `main` erfolgreich
- [ ] Keine Regression in bestehenden Funktionen (Filter, Pagination, Modals)

---

## 16. Open Questions

1. **Primärfarbe:** Soll `--primary` wirklich auf Ölz Orange wechseln, oder soll die Markenfarbe nur als Akzentfarbe eingesetzt werden (separate `--brand`-Variable) und `--primary` als Dunkelton bleiben? → Entscheidung beeinflusst Scope von Änderung 1.

2. **Homepage-Briefing-Tiefe:** Reicht eine featured Edition + 3 Impuls-Mini-Cards? Oder soll auch die Signal-Gesamtzahl / ein Chart (z.B. Signale nach Kategorie) Teil der Homepage werden? → Beeinflusst Komplexität von Phase 2.

3. **Competitor-Sub-Navigation:** Soll `/competitors` als eigener Punkt in der Sidebar erscheinen (unter dem Wettbewerbsradar) oder durch Modul-Sub-Items abgedeckt werden? → Beeinflusst `module-nav.tsx` Architektur.

4. **Tag-Filter Kollaps:** Sollen die Tag-Filter per `<details>`/`<summary>` HTML-nativ kollabiert werden (kein JS, kein Client-Component) oder als `useState`-Toggle (Client Component, smoother Animation)? → Beeinflusst ob `produkt-radar/page.tsx` weiterhin reines Server Component bleiben kann.

5. **Kai-spezifische Startseite:** Hat Kai ein Profil mit `role = 'innovation'`? Wenn ja, könnte die Homepage automatisch die für Innovation relevantesten Inhalte oben zeigen (Role-based personalization). → Beeinflusst, ob `profile.role` auf der Homepage verwendet wird.

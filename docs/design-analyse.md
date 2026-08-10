# Design-Analyse — Erscheinungsbild und Nutzererlebnis

Stand: August 2026, nach dem Grundstock des Rohstoff-Radars. Grundlage: das
CD-Manual (`docs/brand/2023_Oelz_CD_Manual_V1_09_2023.pdf`, 42 Seiten), das
ÖlzNet-Beispielbild des Ansprechpartners (`docs/brand/Beispielbild.png`) und
eine Durchsicht aller Lesestrecken der App. Reine Analyse — noch keine
Umsetzung.

Leitidee: **Die App soll nicht dekorierter werden, sondern Ölz-typischer und
nützlicher.** Jede Empfehlung hier muss eines von beidem einlösen; was nur
schmückt, steht unter „bewusst nicht".

---

## 1. Was die CI hergibt — drei ungenutzte Funde

Die Grundübersetzung (Orange `#F39200`, Braun, MADE Tommy Soft, Welle,
Kontrastregel) steht bereits — siehe `docs/brand/README.md`. Beim erneuten
Durchgehen des Manuals mit der Frage „was fehlt der App noch?" bleiben drei
Dinge übrig, die das Manual ausdrücklich vorsieht und die App nicht nutzt:

### a) Die Welle trägt eine weiße Begleitlinie (S. 6, 18–20)

Das Manual definiert die Welle nie als nackte Kante: **„Weisse Linie bei der
Logo Welle und bei der Wellenfläche — Linienbreite 4 Punkt"**. Unsere Welle
unter dem Kopfbalken (`oelz-wave.tsx`) ist eine reine Orangefläche. Mit der
weißen Linie bekäme sie genau die Leichtigkeit, die das Original von einer
bloßen Zackenkante unterscheidet — eine Zeile SVG, großer Wiedererkennungswert.

### b) Das Manual vermeidet hartes Weiß (S. 19)

Wörtlich: bei reinweißem Papier wird, **„um ein kaltes, hartes WEISS im
Hintergrund zu vermeiden"**, eine Fläche in Y3/K1 unterlegt — ein warmes
Papierweiß (≈ `#FCFAF3`). Unser `--background` ist bereits leicht warm, aber
**alle Karten sind pures Weiß** (`--card: oklch(1 0 0)`), und an mehreren
Stellen ist `bg-white` hart einkodiert (Startseite, Editionsübersicht).
Die Karten einen Hauch Richtung Papierweiß zu schieben macht die App wärmer,
ohne dass jemand benennen könnte, was sich geändert hat. Die `bg-white`-
Hardcodes sind ohnehin ein Fehler — sie ignorieren auch den Dark Mode.

### c) Orange ist als Headline-Farbe vorgesehen (S. 19–20, Variante B)

„Orange Schrift auf weißem/beigem Font" ist eine offizielle Anzeigenvariante.
Unsere Seitentitel sind durchweg dunkelbraun. **Aber:** `#F39200` erreicht auf
Weiß nur 2,35:1 und verfehlt damit die WCAG-Grenze selbst für große Schrift
(3:1). Vollorange Titel scheiden aus. Zwei saubere Wege:

- **Orange Akzente statt orange Titel:** die kleinen Dachzeilen über Titeln
  („Einschätzung der Redaktion"-Stil), Zierlinien, aktive Filterchips — dort
  ist Orange Signal, nicht Lesetext.
- Das bereits definierte `--oelz-orange-dark` (≈ 3,2:1) für Displaygrößen,
  falls doch orange Schrift gewünscht — nur für Titel ab ~30 px fett.

### d) Referenz ÖlzNet (Beispielbild)

Das Intranet zeigt, wie Ölz Orange intern großflächig einsetzt: oranger
Kopfbalken **plus eine vollflächig orange Randspalte** mit weißen Kacheln
darauf. Übertragen heißt das nicht „mehr orange Flächen überall", sondern:
Orange darf **eine** große, ruhige Fläche sein — nicht nur ein 64-px-Balken.
Kandidat: die Login-Seite (siehe 3a).

---

## 2. Was heute schon stimmt

Ehrlichkeit auch in die andere Richtung — das hier nicht kaputt machen:

- **Kopfbalken mit Welle, Orange in der Navigation, Braun auf Orange** — die
  Kernentscheidungen sitzen und sind dokumentiert.
- **MADE Tommy Soft mit echten Schnitten** statt Faux-Bold.
- **Die Relevanzkette im Rohstoff-Dialog** (Zonen „Grundlage" / „Was wir
  daraus machen", Kette mit Punkten und Verbindungslinie) ist das inhaltlich
  stärkste Stück UI der App — dieses Muster verdient Ausweitung, nicht Ersatz.
- **Ruhige, dichte Karten.** Ein internes Arbeitswerkzeug braucht keine
  Illustrationswolken. Die Dichte ist richtig.

---

## 3. Befunde und Empfehlungen

Sortiert nach Wirkung je Aufwand, nicht nach Kategorie.

### P1 — größte Wirkung

**3a. Die Login-Seite verschenkt den ersten Eindruck.**
Logo auf beigem Grund, englische Feldbeschriftungen („Email", „Password"),
keine Welle, kein Orange außer dem Knopf. Das ist die eine Seite, die *jeder*
Nutzer sieht, und die einzige ohne Datenlast — hier darf die CI auftrumpfen:
orange Fläche mit Welle (Hochformat-Welle von links, wie Manual S. 7 bzw.
ÖlzNet-Randspalte), Anmeldeformular auf warmem Weiß, deutsche Beschriftungen.
*Aufwand: klein. Risiko: keines — die Seite hat keine Logik.*

**3b. Auf dem Handy gibt es keine Modulnavigation.**
`module-nav.tsx` ist `hidden md:flex` — unterhalb von 768 px existiert die
Seitenleiste schlicht nicht, und der Kopfbalken bietet keinen Ersatz. Wer auf
dem Handy im Wettbewerbsradar steht, kommt nur über den Umweg Startseite in
ein anderes Modul. Für eine Plattform, deren Zielgruppe Management und
Vertrieb unterwegs ist, ist das der größte tatsächliche UX-Mangel der App.
Lösung: ein Menüknopf im Kopfbalken, der die Modulliste als Schublade öffnet.
*Aufwand: mittel.*

**3c. Die Startseite weiß nicht, was neu ist.**
„Zuletzt aktualisiert" zeigt nur die letzte Edition und drei Impulse — das
Rohstoff-Radar mit 15 frischen Signalen kommt nicht vor, Studien auch nicht.
Die Modulkarten sind stumm: kein Stand, keine Zahlen. Dabei existiert die
Logik bereits (`isNewSignal`, Stand-Berechnung im Rohstoff-Radar). Empfehlung:
jede Modulkarte trägt Stand und Neu-Zähler („15 Signale · 15 neu" als oranges
Badge), die Briefing-Sektion speist sich aus allen Modulen. Damit wird die
Startseite vom Verteiler zum täglichen Einstieg — der Kern dessen, was
„Intelligence-Plattform" verspricht.
*Aufwand: mittel. Nutzt vorhandene Logik.*

**3d. Sprachmischung im Reader-Bereich.**
„Intelligence Editions", „Sign out", Platzhalter „you@oelz.at", Admin-Menü
halb englisch („New Signal", „Manage Editions") — gegen durchweg deutsche
Inhalte. Für die Zielgruppe (österreichisches Traditionsunternehmen) wirkt
das unfertig. Durchgängig Deutsch im Reader; im Admin-Bereich zweitrangig,
aber im selben Zug billig zu haben.
*Aufwand: klein — reine Textänderungen.*

### P2 — deutliche Verbesserung

**3e. Dreizehn Kategorienfarben kämpfen gegen die CI.**
`CATEGORY_COLORS` verteilt Violett, Pink, Cyan, Indigo, Grün, Gelb … über die
Signalkarten. Jede Karte bringt so ihre eigene Farbwelt mit; in Summe wirkt
die Liste bunter als die Marke. Empfehlung: Kategorien auf eine gedeckte,
enge Palette ziehen (warme Erdtöne + wenige Neutrale) und **Farbe primär der
Wichtigkeit** vorbehalten (Orange-Akzent für „Critical" existiert schon).
Kategorie bleibt als Text-Badge unterscheidbar — sie muss nicht leuchten.
*Aufwand: klein (eine Tabelle in `database.ts`). Sichtbarkeit: hoch.*

**3f. Kein Ladezustand, karge Leerzustände.**
Es gibt keine `loading.tsx` — bei jedem Seitenwechsel steht die alte Seite,
bis die neue fertig ist. Gerade nach der Latenz-Arbeit wäre ein
Skeleton-Raster (drei graue Kachelzeilen) der günstigste gefühlte
Geschwindigkeitsgewinn. Leerzustände („Noch keine Editions veröffentlicht")
sind nackte Textzeilen — eine kleine Wellengrafik und ein nächster Schritt
machen daraus einen gestalteten Moment.
*Aufwand: klein bis mittel.*

**3g. Die Radar-Köpfe sind vier Einzelanfertigungen.**
Wettbewerb, Produkt, Rohstoff, Studien: jede Übersicht baut Titel, Stand,
Filter anders. Das Rohstoff-Radar hat das reifste Muster (Titel →
Stand-Zeile mit Neu-Zähler → Filterzeilen mit Chips). Empfehlung: dieses
Muster als gemeinsamen „Radar-Kopf" auf die anderen Module übertragen —
gleiche Stelle, gleiche Chips, gleiche Stand-Zeile. Wiedererkennung senkt
Lernaufwand für jedes künftige Modul.
*Aufwand: mittel, modulweise machbar.*

### P3 — Feinschliff, wenn P1/P2 stehen

- **Welle auch am Seitenfuß** (Manual setzt sie auf jeder Seite unten ein) —
  als dezenter Abschluss langer Übersichten, Orange auf 8–10 % Deckung.
- **Dachzeilen vereinheitlichen:** „Einschätzung der Redaktion" (Rohstoff)
  ist ein gutes Muster — als wiederkehrendes Element auch für „Aktuelle
  Ausgabe", „Zuletzt aktualisiert" etc., in Orange.
- **Hover-Verhalten vereinheitlichen:** Modulkarten heben sich (`-translate-y`),
  Signalkarten nicht — eines von beiden für alle.
- **Management-Snapshot** ist noch Platzhalter — wenn er kommt: Zahlen in
  Displaygröße (`--oelz-orange-dark`), Balken in den bereits definierten
  Chart-Farben, keine Fremdbibliothek nötig.

---

## 4. Bewusst nicht

- **Kein Redesign der Struktur.** Kopfbalken + Seitenleiste + Kachelraster
  tragen; das Problem ist Feinschliff, nicht Architektur.
- **Keine vollorangen Titel** — scheitert messbar am Kontrast (2,35:1).
- **Keine Illustrationen/Fotowelten** im Arbeitsbereich. Die Manual-Fotografie
  (warm, sonnig, menschlich) passt zur Werbung, nicht zwischen Datenkarten.
  Einzige Ausnahme: Login.
- **Keine neue Komponentenbibliothek, keine Animationsbibliothek.** Alles hier
  geht mit Bordmitteln (Tailwind, shadcn, SVG).

---

## 5. Vorschlag: drei Pakete

| Paket | Inhalt | Charakter |
|---|---|---|
| **1 — Marke sichtbar** | Welle mit weißer Linie · warme Kartenfläche + `bg-white`-Hardcodes raus · Login-Seite · Sprache Deutsch · orange Dachzeilen | fast nur Oberfläche, kein Logikrisiko |
| **2 — Nutzwert** | Modulkarten mit Stand/Neu-Zähler + Briefing aus allen Modulen · mobile Modulnavigation · Skeletons + Leerzustände | kleine Logik, große Alltagswirkung |
| **3 — Konsistenz** | einheitlicher Radar-Kopf · Kategorienfarben zähmen · Hover/Fuß-Welle | modulweise, gut aufteilbar |

Reihenfolge ist Empfehlung: Paket 1 zuerst — es macht den Unterschied, den
der Kunde *sieht*, bevor Paket 2 den Unterschied macht, den er *spürt*.

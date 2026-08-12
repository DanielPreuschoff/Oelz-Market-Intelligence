# Trend-Radar — Spezifikation

Beschlossen im August 2026. Ein eigenes Modul mit der Radar-Darstellung, wie
foodRegio Innovation sie auf FIBRES betreibt — nachgebaut in Ölz-Gestaltung.

## 0. Rechtestand

foodRegio wurde angefragt. Antwort: **die Vorbereitung fertigstellen und dann
gemeinsam draufschauen**; eine Nutzung für den Kunden ist wahrscheinlich, aber
nicht zugesagt.

Daraus folgt für den Bau:

- Die **Darstellung** ist unbedenklich. Konzentrische Ringe, Sektoren, klickbare
  Punkte, Detailleiste — ein seit Jahrzehnten verbreitetes Format.
- Der **Sektorenschnitt** wird von foodRegio übernommen (Entscheidung des
  Auftraggebers) und ist als deren Systematik zu kennzeichnen.
- Die **Einträge** — Signale, Cluster, Trends samt Texten und Illustrationen —
  sind foodRegios redaktionelle Arbeit. Sie werden **nicht** vor der
  ausdrücklichen Freigabe übernommen. Bis dahin wird das Modul aus eigener
  Recherche befüllt.

Das ist keine Verzögerung: Die eigene Befüllung ist ohnehin der Teil, der das
Modul von einem der vier frei verfügbaren Food-Trend-Radare unterscheidet — sie
trägt die Ölz-Relevanz, die keines der anderen hat.

## 1. Abgrenzung zu den bestehenden Modulen

| Modul | Gegenstand | Zeithorizont |
|---|---|---|
| Wettbewerbsradar | was ein Wettbewerber **getan hat** | Vergangenheit, Monate |
| Produkt-Radar | ein **Konzept**, das irgendwo existiert | Gegenwart, Monate bis 2 Jahre |
| Rohstoff-Radar | ein **Stoff oder Verfahren**, dessen Entscheidungslage sich geändert hat | Gegenwart bis 3 Jahre |
| **Trend-Radar** | eine **Entwicklungsrichtung** der Branche | 0 bis 10 Jahre |

Der Trend-Radar ist das einzige Modul ohne konkretes Ereignis als Auslöser. Er
beantwortet nicht „was ist passiert", sondern „wohin bewegt sich das Feld".
Deshalb trägt er auch als einziges eine Zukunftsachse.

Faustregel für Grenzfälle: Lässt sich der Fund auf ein datiertes Ereignis mit
Quelle zurückführen, gehört er in eines der drei anderen Module. Ist er eine
Verdichtung vieler Ereignisse, gehört er hierher.

## 2. Aufbau: ein Modul, zwei Radare

Das Modul hält mehrere **Radartafeln**, jede mit eigenem Sektorensatz. Start mit
zweien, entsprechend foodRegios Angebot:

**Tafel 1 — Future Food**
`Digitalisation/AI · Additive Manufacturing · Alternative Proteins ·
Personalisation · Sustainability · Regulatory Environment`

**Tafel 2 — Food AI**
`Agriculture · Manufacturing/Processing · Packaging · Logistics & Distribution ·
Retail & HoReCa · Consumption · Waste Streams`

Die zweite Tafel zielt auf eine andere Leserschaft — Produktion, Technik, IT —
als die bisherigen Module. Das ist ein bewusster Schritt über die heutige
Zielgruppe hinaus und sollte bei der Einführung benannt werden.

Sektorennamen bleiben englisch, wie bei foodRegio. Sie sind Fachbegriffe der
Branche; eine Eindeutschung („Additive Fertigung") würde sie schlechter
auffindbar machen.

## 3. Die zwei Achsen

**Ringe — Time to Impact.** Vier Stufen, von innen nach außen:

| Ring | Bedeutung |
|---|---|
| Mainstream | wirkt heute |
| Maturing | 1–3 Jahre |
| Growing | 3–5 Jahre |
| Emerging | 5–10 Jahre |

Die Mitte ist die Gegenwart. Je weiter außen, desto ferner die Wirkung.

**Sektoren — je Tafel.** Sechs beziehungsweise sieben, gleichmäßig über den
Halbkreis verteilt.

## 4. Drei Ebenen

Wie bei foodRegio, auf Wunsch des Auftraggebers:

| Ebene | Was es ist | Darstellung |
|---|---|---|
| **Signal** | eine einzelne Beobachtung mit Quelle | kleinster Punkt, hellste Farbe, ohne Beschriftung |
| **Cluster** | mehrere Signale mit gemeinsamem Nenner | mittlerer Punkt, mittlere Farbe, beschriftet |
| **Trend** | eine benannte Entwicklungsrichtung | größter Punkt, kräftigste Farbe, beschriftet |

Die Punktgröße richtet sich zusätzlich nach der Zahl der zugeordneten Signale —
so wie es bei foodRegio erkennbar ist. Ein Trend mit zwölf Signalen ist größer
als einer mit dreien.

**Aufwandshinweis:** Cluster entstehen nicht von selbst. Sie sind der Teil, der
Handarbeit verlangt — jemand muss sehen, dass fünf Signale dasselbe meinen. Wenn
sich das im Betrieb als zu aufwendig erweist, ist die Ebene weglassbar, ohne dass
Signale und Trends darunter leiden.

## 5. Ölz-Gestaltung

**Das Farbproblem.** foodRegio nutzt blasses Grün für die Ringe, dunkle Punkte
darauf und **Orange für die Auswahl**. Ölz-Orange ist die Grundfarbe — damit ist
Orange als Auswahlmarkierung verbraucht und die Ringe dürfen nicht kräftig sein,
sonst verschwinden Punkte und Beschriftungen.

Vorschlag:

| Element | Farbe |
|---|---|
| Ringe | Ölz-Orange, von 6 % (innen) auf 18 % (außen) Deckung |
| Ringtrenner | Weiß, wie im Original |
| Trend | Ölz-Orange, voll |
| Cluster | Ölz-Orange, 60 % |
| Signal | Ölz-Braun, 35 % |
| Auswahl | Ring in Ölz-Braun plus weißer Hof — nicht Orange |
| Beschriftung | Ölz-Braun auf weißer Fläche, wie im Original |
| Sektorbeschriftung | Ölz-Braun, entlang des Bogens gedreht |

Schrift durchgehend MADE Tommy Soft.

**Wellenbogen:** naheliegend, aber hier fehl am Platz. Der Halbkreis ist bereits
eine starke Form; ein zweiter Bogen darunter würde mit ihm konkurrieren.

## 6. Interaktion

Aus dem Original übernommen:

- **Klick auf einen Punkt** öffnet rechts eine Detailleiste, das Radar schrumpft
  nach links. Der gewählte Punkt wird hervorgehoben, seine Beschriftung umrandet.
- **Detailleiste enthält:** Bild, Titel, Typplakette, Anlagedatum und Datum der
  letzten Bearbeitung, Beschreibungstext, Schließkreuz.
- **Bedienelemente oben links:** Schwenken, Zoom, Schriftgröße, Info, Vollbild.

Ergänzungen, die aus eurem Bestand naheliegen:

- **Ölz-Relevanz** als eigener Abschnitt in der Detailleiste. Das ist der
  Unterschied zu jedem frei verfügbaren Radar.
- **Zugeordnete Signale** bei Clustern und Trends auflistbar, mit Quellenlink.
- **Adresse merken** (`?eintrag=<id>`), damit ein geöffneter Eintrag teilbar ist
  — dasselbe Muster wie im Rohstoff-Radar.
- **Filter nach Ebene** (nur Trends zeigen), weil ein volles Radar sonst
  unübersichtlich wird.

**Auf schmalen Bildschirmen** ist ein Halbkreis mit Beschriftungen unlesbar. Dort
statt des Radars eine nach Sektor gruppierte Liste — dieselben Daten, andere
Darstellung. Kein Zoom-und-Schieben auf dem Handy.

## 7. Befüllung

Derselbe Ablauf wie in den anderen Modulen: Deep Research außerhalb der App,
Berichte als `.md`, Aufbereitung, Import als Entwürfe, redaktionelle Durchsicht.

Unterschied zum Rhythmus der anderen: Ein Trend-Radar altert langsam. **Quartalsweise**
reicht, mit einem größeren Erstlauf zur Befüllung. Ein Radar wirkt erst ab etwa
40 Einträgen wie ein Radar — der Erstlauf muss also entsprechend angelegt sein.

Je Tafel ein eigener Prompt, weil die Sektoren verschieden sind.

## 8. Offene Punkte

1. **Freigabe durch foodRegio** — bestimmt, ob deren Einträge übernommen werden
   dürfen oder das Modul dauerhaft aus eigener Recherche lebt.
2. **Zuschreibung** — falls übernommen: wo und wie wird foodRegio genannt?
   Mein Vorschlag: Fußzeile der Radartafel plus Quellenangabe je Eintrag.
3. **Zielgruppe der Food-AI-Tafel** — Produktion und Technik nutzen die App
   heute nicht. Braucht es dafür eine eigene Rolle in der Rechteverwaltung?
4. **Datenmodell** — noch nicht entworfen. Die drei Ebenen verlangen eine
   Verknüpfung Signal → Cluster → Trend, die es in keinem bestehenden Modul gibt.
5. **Bilder** — foodRegio nutzt KI-generierte Illustrationen. Für Ölz zu klären:
   selbst erzeugen, weglassen, oder durch ein Symbol je Sektor ersetzen.

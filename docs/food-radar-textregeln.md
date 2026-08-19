# Food Radar — Textregeln

Diese Regeln sind zugleich das Regelwerk für die Redaktion und der Prompt für den
Lauf, der die 390 Einträge neu schreibt. Wer sie ändert, ändert beides.

## Wozu

Die Einträge des Food Radars stammen aus foodRegios Recherche und wurden 2026
maschinell übersetzt. Was dabei entstand, sind keine Radar-Texte, sondern die
Rohtexte der Quellen: Blogartikel, Produktseiten, Pressemitteilungen — mitsamt
ihrer Stimme („Lass uns kochen"), ihrer Länge (Median 2.600 Zeichen, Maximum
11.900) und ihrer Rückstände (Newsletter-Aufrufe, Copyright-Zeilen,
Redaktionsnotizen, „4 Minuten Lesezeit").

Die Aufgabe ist deshalb nicht Übersetzen, sondern **aus der englischen Quelle
einen Radar-Eintrag schreiben**. Der Leser klickt einen Punkt auf der Tafel an
und will in einem Satz wissen, worum es geht, und in vier, was daran steht.

## Der Titel

- Höchstens **70 Zeichen**. Er ist die Beschriftung eines Punktes, keine
  Schlagzeile.
- Benennt den Gegenstand, nicht das Ereignis: „Kaseinkartoffeln aus molekularer
  Landwirtschaft", nicht „Finally Foods kündigt ersten Feldversuch an".
- Deutsch, sofern kein Eigenname. Firmen-, Produkt- und Projektnamen bleiben:
  Nestlé, KITRO, R-AI-VQC.
- Keine Presseüberschriften. Wo die Quelle eine hat, wird sie zum Gegenstand
  zusammengezogen.

## Die Beschreibung

**Drei bis fünf Sätze, etwa 350–600 Zeichen. Ein Absatz, keine Zeilenumbrüche.**

- **Satz 1 sagt, was es ist.** Keine Hinführung, kein „X verändert gerade jede
  Branche", keine Wiederholung des Titels als Satz.
- **Danach die Substanz:** wer, was, wo, wie weit, mit welchem Beleg. Zahlen,
  Orte, Institutionen und Namen aus der Quelle gehören hierher — sie sind das,
  was den Eintrag von einer Behauptung unterscheidet.
- **Dann Schluss.** Kein Ausblick, keine Einordnung, kein „bleibt abzuwarten".

## Was nicht hineingehört

- **Keine Ich-, Wir- oder Du-Form.** Die Stimme der Quelle ist nicht unsere.
  „Wir haben Fortschritte gesehen" → „Die Entwicklung ist fortgeschritten".
  Kein Ansprechen des Lesers.
- **Keine Werbesprache.** „revolutioniert", „bahnbrechend", „einzigartig",
  „nahtlos", „Game Changer" werden zur Sachaussage: was tut es, statt wie toll
  es ist. Superlative nur, wenn die Quelle sie belegt („erster Feldversuch").
- **Keine Quellenrückstände:** Lesezeitangaben, Autorennamen, Bildnachweise,
  Newsletter- und Kontaktaufrufe, Menüpunkte, Copyright-Zeilen, Adressen,
  E-Mail-Adressen, nackte URLs, Redaktionsnotizen der Quelle.
- **Keine Kundenstimmen und Auszeichnungen**, außer die Auszeichnung ist der
  Befund selbst.
- **Kein Meta-Text über das Radar.** Sätze wie „dieser Trend wird auf einem
  Reifegrad bewertet, der als mittel eingeschätzt wird" beschreiben die
  Darstellung, nicht die Sache. Der Ring auf der Tafel sagt das bereits.
- **Keine Rückfragen der Quelle** („Wie könnten wir Diäten gestalten, die …?").

## Zeit und Belege

- **Relative Zeitangaben werden absolut oder fallen weg.** „nächste Woche",
  „vor 10 Monaten", „letztes Jahr" sind ohne Anker sinnlos. Geht das Jahr aus
  der Quelle hervor, wird es genannt; sonst entfällt die Angabe.
- **Belege bleiben, Fundstellen gehen.** Studien, Institutionen und Firmen
  werden im Text genannt; Domainnamen und Links nicht — die stehen unter dem
  Text im Feld `quellen`.

## Abgeschnittene Quellen

Rund 60 Beschreibungen brechen mitten im Satz ab. **Der neue Text endet am
letzten vollständigen Gedanken.** Es wird nichts ergänzt, nichts erfunden und
nichts geraten. Lieber drei Sätze als vier mit einer Erfindung.

## Einheitliche Begriffe

Dieselbe Sache heißt überall gleich:

| Englisch | Deutsch |
|---|---|
| AI, artificial intelligence | **KI** (nie „AI", nie „Artificial Intelligence") |
| machine learning | **maschinelles Lernen** |
| supply chain | **Lieferkette** |
| food waste | **Lebensmittelverschwendung** |
| plant-based | **pflanzlich** |
| cultivated / cultured meat | **kultiviertes Fleisch** |
| retailer / retail | **Einzelhandel**, **Händler** |
| farmer | **Landwirt** |
| tool | **Werkzeug** (Software: **Anwendung**) |
| insights | **Erkenntnisse** |
| stakeholder | **Beteiligte** |

Englisch bleibt nur, wo der deutsche Fachgebrauch es führt: Computer Vision,
Clean Label, Start-up, Blockchain, Upcycling, Food Service, HoReCa.

## Form

- Deutsche Anführungszeichen „…", deutscher Gedankenstrich — mit Leerzeichen.
- Prozent mit schmalem Abstand: „39 %". Zahlen bis zwölf ausgeschrieben, außer
  in Messwerten, Preisen und Jahreszahlen.
- Jede Beschreibung endet mit einem Satzzeichen.

## Achse, Ringe, Sektoren

Beschriftungen der Tafel sind deutsch und zwischen beiden Tafeln einheitlich:

- Achse: **Zeit bis zur Wirkung**
- Ringe: **Heute · 1–3 Jahre · 3–5 Jahre · 5–10 Jahre · 10+ Jahre**
  (Future Food nutzt die ersten vier, Food AI alle fünf)
- Sektoren übersetzt, das Kaufmanns-Und mit Leerzeichen:
  Digitalisierung/KI · Additive Fertigung · Alternative Proteine ·
  Personalisierung · Nachhaltigkeit · Regulatorik ·
  Landwirtschaft · Herstellung & Verarbeitung · Verpackung ·
  Logistik & Distribution · Handel & HoReCa · Konsum · Abfallströme

Der Sektorenschnitt bleibt foodRegios Systematik (Spec §0) — übersetzt wird die
Beschriftung, nicht die Einteilung.

## Das Datumsfeld

`daten` steht heute zu 100 % englisch unter jedem Eintrag („Aug 15th 2024
2 years ago"). Es wird zu einem deutschen Datum ohne Altersangabe:
**„15. August 2024"**. Die Angabe „vor 2 Jahren" entfällt — sie war zum
Auslesezeitpunkt richtig und altert falsch.

## Herkunft

Der Hinweis am Fuß der Modulseite benennt beides getrennt:

> Inhaltliche Systematik und Einträge: foodRegio Innovation, betrieben auf
> FIBRES, übernommen am 10. August 2026. Texte übersetzt und redaktionell
> überarbeitet: Ölz. Die Nutzung ist mit foodRegio abzustimmen.

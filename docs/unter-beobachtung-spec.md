# Unter Beobachtung — Risikosignale im Regulatorik-Radar

**Stand: 14.09.2026. Status: umgesetzt (31.08.2026), Ort geändert (14.09.2026).**
Entstanden aus dem Termin mit Kai Heuberger am 27.08.2026 und einer
Grilling-Sitzung am 31.08.2026 (fünf Runden, sechzehn Entscheidungen).

> **Nachtrag 14.09.2026.** Der Reiter im Rohstoff-Radar ist zum eigenen Modul
> `/regulatorik-radar` geworden — siehe
> [ADR 0006](adr/0006-regulatorik-radar-eigenes-modul.md). Abschnitt 8, Nicht-Ziel
> „Kein eigenes Modul" und Akzeptanzkriterium 4 gelten seitdem nicht mehr; der
> Querverweis aus Kriterium 6 ist ein offener Folgeschritt. Alles andere
> (Eintragstyp, Stufen, Felder, Hürde, Erhebung) gilt unverändert.
>
> **Nachtrag 14.09.2026, Auslieferung 2 (Migration 015).** Drei Änderungen am
> Eintrag, alle aus dem Termin vom 11.09. und Kais E-Mail davor:
> - **Kurzzeile** (sieben bis elf Wörter) als Pflichtfeld. Die Karte zeigt nur
>   noch Kurzzeile, Stufe, Behörde und Quelle; der Sachverhalt steht im
>   Detail-Dialog (`?signal=<id>`, teil- und reloadfest, Muster Rohstoff-Radar).
>   Kai wörtlich: „kurz anteasern und dann Quellenverweis".
> - **Behörde** kommt als Feld zurück (EFSA · EU-Kommission · National · Keine),
>   weil Kai einen Filter „EFSA / EU Regulation" will — der Quellenname allein
>   trägt keinen Filter. Abschnitt 5 hatte das Feld gestrichen; das ist damit
>   aufgehoben. `Keine` ist der Wert für Stufe „Öffentliche Kritik".
> - **Geltungsbereich um CH.** Ölz verkauft in der Schweiz, deren
>   Lebensmittelrecht nicht EU-harmonisiert ist — die einzige echte Lücke.
>   Beantwortet Abschnitt 13, Punkt 4 zur Hälfte; CZ, SK und SI bleiben über
>   EU-Recht abgedeckt, nationale Alleingänge dort sind ein Folgeschritt.
>
> Die Hürde verlangt Kurzzeile und Behörde ab sofort; für die 15 Bestandsfälle
> wurden beide per Nachtrag-SQL ergänzt (Kurzzeilen geprüft), erst danach ist
> der CHECK für den Bestand validiert.

---

## 1. Anlass

Kai Heuberger im Termin: *„Können wir dann noch ein weiteres Suchkriterium
ergänzen? Kritische Rohstoffe."* Sein Fall war Glycerin — in der EU **quantum
satis** zugelassen, also ohne Höchstmenge, und plötzlich in der Kritik wegen
gesundheitlicher Risiken für Kleinkinder. Ausgelöst hatte es die Verwendung in
Slush-Getränken, wo der Stoff überdosiert wird; daraus entstand eine Warnung des
Bundesinstituts für Risikobewertung, die auch Backwarenhersteller adressiert.

Zwei Sätze von ihm tragen die ganze Konstruktion:

> „Wenn in Deutschland was ist, dann folgt Österreich in der Regel."

> „Shitstorm ist das eine — wenn die Bundesregierung ein Gesetz erlässt
> bezüglich der Einsatzmenge von Glyzerin, ist das mehr als ein Shitstorm."

Der erste macht den **Geltungsbereich** zum Pflichtfeld, der zweite die
**Eskalationsstufe**.

---

## 2. Zweck und Abgrenzung

Ein Risikosignal beantwortet eine einzige Frage: **Steht ein Stoff, auf den wir
bauen oder bauen könnten, unter Druck — und wie weit ist dieser Druck gediehen?**

**Im Umfang:** Regulatorik (Gesetze, Verordnungen, Höchstmengen), behördliche
Risikobewertungen (EFSA, BfR, AGES) und ernstzunehmende öffentliche Kritik
(Medien, NGO-Kampagnen) ohne Rechtsakt.

**Ausdrücklich nicht im Umfang: Beschaffungsrisiko.** Verknappung, Preissprünge,
geopolitische Abhängigkeit — Kakao, Butter, Eier. Das ist der Grund, warum das
Modul **nicht „Kritische Rohstoffe" heißt**: im Industriesprech meint der Begriff
genau diese Beschaffungsseite, und wer ihn liest, sucht Kakao und findet
Titandioxid. Der Einkauf hat dafür eigene Werkzeuge und einen völlig anderen
Datenkreislauf.

### Abgrenzung zu den drei Nachbarn

Regulatorik taucht in der Plattform bereits zweimal auf: als Signalkategorie
`regulatory` im Wettbewerbsradar und als Sektor „Regulatorik" im Trend Radar.
Ohne Regel landet eine Glycerin-Höchstmenge an drei Stellen oder an keiner.

**Die Trennachse ist der Gegenstand, nicht das Thema:**

| Modul | Gegenstand | Beispiel |
|---|---|---|
| Wettbewerbsradar | ein Wettbewerber, der etwas tut | Harry-Brot passt Rezepturen an neue Grenzwerte an |
| Trend Radar | eine Richtung mit Jahren Horizont | „Regulatorik" als Sektor des Future-Food-Radars |
| **Unter Beobachtung** | **ein benennbarer Stoff** | **Glycerin (E 422) unter BfR-Bewertung** |

Faustregel: **Wenn du den Stoff nennen kannst, gehört es hierher.**

---

## 3. Warum ein eigener Eintragstyp

Die erste Idee im Termin war, „Risikofaktor" als achte **Funktion** zu den
sieben vorhandenen zu stellen. Das scheitert an drei Stellen, und die Gründe
sind es wert, festgehalten zu werden:

1. **Die Veröffentlichungs-Hürde.** `ingredient_signals` lässt sich nur
   veröffentlichen, wenn die vollständige Relevanzkette gefüllt ist — Thema,
   Funktion, gelöstes Problem, Anwendung bei Ölz, **Chance**, nächster Schritt.
   Durchgesetzt per CHECK-Bedingung in der Datenbank, nicht nur im Formular.
   Ein Risiko hat keine Chance. Es scheitert an mindestens drei Gliedern, und
   die Hürde für alle aufzuweichen hieße, die einzige strukturelle Sperre gegen
   einen generischen Newsfeed aufzugeben.

2. **Es gibt keinen Wirt.** Glycerin hat kein Rohstoffsignal, an das sich ein
   Risiko hängen ließe. Es ist kein neuer Fund, sondern ein etablierter Stoff,
   der neu unter Beschuss steht. Genau das ist der Normalfall.

3. **Eine Funktion und ein Risiko sind verschiedene Fragen.** Eine Funktion
   sagt, was ein Stoff für uns tun kann; ein Risiko, was er uns kosten kann.
   Im selben Filter nebeneinander bedeutet dasselbe Bedienelement zwei Dinge.
   Und derselbe Stoff kann beides sein: **Glycerin ist ein
   Zuckerreduktions-Ingredient und steht unter Beschuss.** Diese Doppelung
   sichtbar zu machen ist der eigentliche Erkenntniswert.

**Gegenargument, das erwogen und verworfen wurde.** Die Rohstoff-Spec begründet
„kein Patentradar" damit, dass *„Patente gewöhnliche Quellen mit
Evidenz-Einstufung"* sind — kein eigener Mechanismus für eine bloß andere
Quellensorte. Nach derselben Logik wäre eine BfR-Stellungnahme auch nur eine
Quelle. Der Unterschied, der trägt: Ein Patent belegt eine Chance und passt in
die Kette. Eine Höchstmengenbeschränkung ist das Gegenteil einer Chance.

---

## 4. Die vier Stufen

Kais Unterscheidung zwischen Shitstorm und Gesetz, ausbuchstabiert. Jede Stufe
ist an der Quelle prüfbar — man muss nicht interpretieren, um sie zu setzen.

| Stufe | Bedeutung | Wer spricht |
|---|---|---|
| 1 | **Öffentliche Kritik** | Medien, NGO, Social — keine Behörde beteiligt |
| 2 | **Behördliche Bewertung** | EFSA, BfR, AGES prüfen oder empfehlen; noch kein Recht |
| 3 | **Rechtsakt in Arbeit** | Entwurf, Konsultation, beschlossen aber nicht in Kraft |
| 4 | **Geltendes Recht** | in Kraft, mit Frist oder Höchstmenge |

Dazu ein Abschlusszustand **„ausgeräumt"**: Gibt eine Behörde Entwarnung oder
läuft die Debatte aus, wird der Eintrag geschlossen — er verschwindet aus der
aktiven Ansicht, bleibt aber erhalten. Ohne diesen Zustand wächst die Liste nur
und verrottet; nach zwei Jahren stünde Glycerin dort noch als Bedrohung,
obwohl die Sache längst durch ist.

---

## 5. Der Eintrag: sieben Felder

Bewusst schlank. Das Modul lebt davon, dass eine Karte in fünfzehn Sekunden
lesbar ist; eine juristische Würdigung gehört nicht hierher.

**Zone Befund** — was gemeldet wurde:

| Feld | Anmerkung |
|---|---|
| Stoff | Name plus **E-Nummer, wo es eine gibt**. `E 422` ist über Sprachgrenzen eindeutig, „Glycerin" nicht. Optional, weil Prozesskontaminanten (Acrylamid, MOSH/MOAH) keine tragen |
| Stufe | eine der vier aus Abschnitt 4 |
| Geltungsbereich | DE · AT · EU. **Deutschland ist der Frühindikator für Österreich** — Kais Regel, deshalb ein eigenes Feld und keine Fußnote |
| Was der Fall ist | zwei bis vier Sätze. Liegt der Anlass außerhalb der Backwaren, wird er hier benannt |
| Quelle | Name, URL, Datum |

**Zone Einschätzung** — redaktionell verantwortet, als solche ausgezeichnet:

| Feld | Anmerkung |
|---|---|
| Betroffene Produktkategorie | Mehrfachauswahl aus den fünf Ölz-Kategorien. **Pflichtfeld — siehe Abschnitt 6** |
| Handlung | **Beobachten · Prüfen · Ersetzen**, parallel zum vorhandenen Beobachten / Prüfen / Pilotieren |

Gestrichen wurden: **Behörde** (steckt im Quellennamen), **Frist** (nur bei
Stufe 4 sinnvoll, passt als Satz in den Text) und ein eigenes Feld für den
Ölz-Bezug (siehe unten).

---

## 6. Die Veröffentlichungs-Hürde

Bei Chancen ist es die Relevanzkette. Hier ist es die **Produktkategorie**.

Der naheliegende Weg — „setzen wir den Stoff ein, ja oder nein" — ist nicht
gangbar: **Ölz-Rezepturen liegen nicht in der Plattform.** Das
Sortimentsdokument führt fünf Produktkategorien, keine Zutatenlisten, und ist
selbst als „abgeleitet, noch nicht mit Ölz validiert" gekennzeichnet. Verlangte
man Gewissheit über den Einsatz, blockierte man genau die Fälle, die am
wichtigsten sind — man weiß ja noch nicht, ob man betroffen ist, und deshalb
schaut man hin.

**Die Regel:** Ein Risikosignal wird nur veröffentlicht, wenn **mindestens eine
der fünf Ölz-Produktkategorien benannt ist**. Keine Ausnahme, kein
Kontexteintrag, kein „keine erkennbare Berührung".

**Die Relevanz hängt am Stoff, nicht am Anlass.** Das ist die Feinheit, an der
Kais eigener Gründungsfall hängt: Glycerin kam über Slush-Getränke auf, mit
Backwaren hatte der Auslöser nichts zu tun. Prüfte man auf den Anlass, fiele
genau dieser Fall durch. Der Prüfsatz für Recherche und Redaktion lautet
deshalb:

> **Wird der Stoff in Backwaren eingesetzt — oder könnte eine anderswo gesetzte
> Grenze auf Backwaren übertragen werden?**

Nur wenn ja, entsteht ein Eintrag. Ein Süßstoff, der in Backwaren nie vorkommt,
fällt raus, so laut die Debatte auch sein mag. Glycerin, Titandioxid,
Azofarbstoffe fallen rein.

Die Hürde kostet dreißig Sekunden, ist mit öffentlichem Wissen beantwortbar —
und erzwingt genau den einen Gedanken, der eine Behördenmeldung von einem
Signal unterscheidet.

---

## 7. Erhebung

**Monatlich im Regellauf, jederzeit von Hand.**

Der Monatslauf bekommt einen eigenen Prompt über die Behördenquellen: BfR und
Bundesanzeiger für Deutschland als Frühindikator, AGES für Österreich, EFSA und
EU-Kommission für den Rahmen, dazu Fachpresse für die Kritikstufe.

Daneben ein Formular, mit dem ein Fall sofort eingestellt werden kann. Eine
BfR-Warnung ist dann relevant, wenn sie erscheint, nicht vier Wochen später.
Ein eigener Wochenrhythmus wurde erwogen und verworfen: Ihn würde niemand
durchhalten, ein Handeintrag kostet nichts und deckt genau den dringenden Fall.

**Quellenregel, ohne Ausnahme: amtliche Primärquelle.** BfR-Stellungnahme,
EFSA-Opinion, EUR-Lex, AGES. Nicht Fachpresse, nicht Aggregatoren. Der Grund
steht im Register des Produkt-Radars: Am 31.08.2026 hat ein englischer
Reiseführer der Recherche ein „dessert bread" untergeschoben, das es nicht
gibt, und daraus wurde ein vollständiger Produktimpuls samt Ölz-Transfer. Bei
Regulatorik wäre das kein Ärgernis, sondern ein Kunstfehler — eine erfundene
Höchstmenge, auf die jemand eine Rezepturentscheidung stützt.

---

## 8. Darstellung

**Ein Reiter innerhalb `/rohstoff-radar`, kein neuer Menüpunkt.** Kai sagte
wörtlich „einen Reiter zu haben"; die Seitenleiste trägt schon sechs Module;
und fachlich gehört es zusammen — derselbe Stoff kann links als Chance und
rechts als Risiko stehen.

> *Überholt seit 14.09.2026:* eigenes Modul, ADR 0006. Die Begründung war
> richtig, solange es nur Risiken gab; mit Zulassungen als zweitem Eintragstyp
> ist der Gegenstand nicht mehr der Rohstoff, sondern das Verfahren.

**Form unterscheidet die Art, Farbe den Grad.** Die erste Idee war ein rotes
Element. Zwei Einwände: Rot ist in der Ölz-Palette nicht vorgesehen, und die
Plattform hat sich einmal entschieden, dass Farbe **Schwere** trägt (im
Wettbewerbsradar Grau → Braun → Orange). Eine zweite Farbsprache daneben kostet
mehr, als sie bringt. Sähen Risikosignale aber aus wie Chancensignale, wäre die
Unterscheidung, die Abschnitt 3 ins Datenmodell baut, unsichtbar.

Also: Das Risikosignal bekommt eine **eigene Kartenform** — Warnzeichen und
durchgezogene Kante links —, die vier Stufen laufen auf der **vorhandenen
Schwereskala**. Präzedenzfall im Haus: Im Trend Radar wird die unterste Ebene
„über die Form unterschieden statt über die Farbe", weil die Farbe anderswo
verbraucht war. Dieselbe Not, dieselbe Lösung.

**Nicht auf der Startseite.** Weder eigener Block noch Zähler. Die Startseite
ist gerade erst entrümpelt worden; ob geltendes Recht mit Frist eine lautere
Behandlung verdient, wird entschieden, wenn der Reiter sich bewährt hat — nicht
vorher für einen Fall, den es noch nie gab.

---

## 9. Datenmodell

**Eigene Tabelle**, nicht ein Diskriminator in `ingredient_signals`. Eine
gemeinsame Tabelle bräuchte zwei sich ausschließende Pflichtfeld-Sätze in einer
CHECK-Bedingung, und die Relevanzkette müsste für alle aufgeweicht werden.

Skizze, keine Migration:

- `substanz` (Text, Pflicht), `e_nummer` (Text, optional)
- `stufe` (Enum: `kritik` · `bewertung` · `rechtsakt_in_arbeit` · `geltendes_recht`)
- `geltungsbereich` (Enum: `DE` · `AT` · `EU`)
- `sachverhalt` (Text, Pflicht)
- `quelle_name`, `quelle_url`, `quelle_datum`
- `produktkategorien` (Text-Array, **mindestens ein Eintrag für `published`**)
- `handlung` (Enum: `beobachten` · `pruefen` · `ersetzen`)
- `status` (`draft` · `published` · `ausgeraeumt`), `published_at`, `ausgeraeumt_am`
- Workflow-Felder wie im Rohstoff-Radar (`ai_generated`, `created_by`, Zeitstempel)

Die Veröffentlichungs-Hürde aus Abschnitt 6 gehört als CHECK-Bedingung in die
Datenbank, nicht nur ins Formular — gleiche Begründung wie bei der
Relevanzkette: Sie muss auch bei direktem Schreibzugriff halten.

---

## 10. Erstbefüllung

**Durchgeführt am 31.08.2026. Ergebnis: 15 Einträge** (14 aktiv, 1 ausgeräumt),
Zeitraum Januar bis 31. August 2026, ausnahmslos amtlich belegt.

Vier parallele Recherchen nach Quellendomäne — BfR und Bundesanzeiger, EFSA,
EUR-Lex und PAFF-Ausschuss, sowie ein eigener Lauf für Glycerin, AGES und die
Kritikstufe — ergaben 48 belegte Funde. Ursprünglich waren acht Einträge
vorgesehen; die Zahl wurde erhöht, weil die Ausbeute es trug.

Verteilung: drei auf Stufe 4, vier auf Stufe 3, sechs auf Stufe 2, zwei auf
Stufe 1. **Jede Sprosse ist besetzt, ohne dass eine aufgefüllt werden musste.**

Die Daten liegen in `docs/unter-beobachtung-saat.json`, die Begründung der
Auswahl in `research/2026-09/SICHTUNGSLISTE-UNTER-BEOBACHTUNG.md`. Die
Saatdatei liegt bewusst im Repo und nicht unter `research/`: Das Modul ist
noch nicht gebaut, und die Recherche darf bis dahin nicht verlorengehen. Nach
dem Import kann sie entfallen.

**Ein Befund aus der Recherche gehört in die Spec**, weil er Abschnitt 3
bestätigt: Dieselben Läufe fanden drei Novel-Food-Zulassungen mit Höchstmengen
ausdrücklich für Backwaren — entfettetes Rapspulver, Pilzprotein, angereicherter
Karottenextrakt. Das sind **Chancen**, keine Risiken; sie gehören als gewöhnliche
Rohstoffsignale ins bestehende Modul. Dass ein Auftrag beide Sorten produziert
und sie sich sauber trennen lassen, ist der praktische Beleg dafür, dass ein
Risiko keine achte Funktion sein kann.

---

## 11. Nicht-Ziele

- **Kein Beschaffungsrisiko** (Abschnitt 2) — der häufigste Grund, warum dieses
  Modul falsch verstanden wird
- **Keine Rechtsberatung.** Der Eintrag benennt einen Stand, keine Bewertung
  seiner Rechtsfolgen
- **Kein Rezepturabgleich.** Die Plattform weiß nicht, was in Ölz-Produkten
  steckt, und soll es in Version 1 auch nicht erfahren
- **Kein Newsfeed.** Ohne Produktkategorie keine Veröffentlichung
- ~~**Kein eigenes Modul** in der Seitenleiste~~ — aufgehoben 14.09.2026 (ADR 0006)
- **Keine Benachrichtigung** bei neuen Einträgen — die Frage stellt sich erst,
  wenn Stufe 4 mit Frist real vorkommt

---

## 12. Akzeptanzkriterien

1. Ein Risikosignal ohne benannte Produktkategorie lässt sich **nicht**
   veröffentlichen — durchgesetzt in der Datenbank, nicht nur im Formular
2. Die vier Stufen sind am Bestand sichtbar unterscheidbar, ohne die Legende zu
   lesen
3. Ein ausgeräumter Fall verschwindet aus der aktiven Ansicht, bleibt aber
   auffindbar
4. ~~Der Reiter erscheint unter `/rohstoff-radar`, nicht als Menüpunkt~~ —
   seit 14.09.2026 eigenes Modul `/regulatorik-radar` (ADR 0006); alte Links
   leiten weiter
5. Jeder Eintrag der Erstbefüllung trägt eine erreichbare amtliche URL
6. Ein Stoff, der zugleich Chance und Risiko ist, ist in beiden Ansichten
   auffindbar — und man sieht das eine vom anderen aus *(seit dem Umzug offen:
   der Querverweis ist der Folgeschritt nach dem Hauptlauf, ADR 0006)*

---

## 13. Offene Punkte für den nächsten Termin mit Kai

1. **Die fünf Produktkategorien tragen jetzt die Veröffentlichungs-Hürde.** Sie
   stammen aus einem Dokument, das sich selbst als „abgeleitet, noch nicht mit
   Ölz validiert" bezeichnet. Damit ist ein unbestätigtes Vokabular
   lasttragend geworden — das gehört bestätigt, bevor die Erstbefüllung läuft.
2. **Die sieben Funktionen des Rohstoff-Radars** sind ebenfalls noch nicht
   kundenbestätigt, und die Spec parkt die Frage „Funktionsliste erweitern?"
   ausdrücklich bis nach dem ersten Redaktionslauf. Beides in einem Aufwasch.
3. **Wer pflegt die Handlung?** „Ersetzen" ist eine Entwicklungsentscheidung,
   keine Rechercheleistung. Braucht es dafür eine Rolle, die schreiben darf?
4. **Reicht DE · AT · EU?** Tschechien, Slowakei und Slowenien sind über EU-Recht
   abgedeckt, solange es um Zusatzstoffe geht. Nationale Alleingänge außerhalb
   des harmonisierten Rechts wären eine Lücke.

# Kundenradar — strategische Bewegungen der Handelskunden

Stand: 2026-10-27 · Status: **umgesetzt** (Migration 019, Branch `feat/kundenradar`) — Erstlauf steht aus
Herkunft: Idee von Simon Greiner (Vertrieb, Inland + Export) · Mail vom Oktober 2026 und Termin am 27.10.2026 · Vorab von Kai Heuberger am 02.10.2026 als Weiterentwicklung gewünscht
Begriffe: [CONTEXT.md](../CONTEXT.md) Abschnitt „Kundenradar" · Entscheidung: [ADR 0007](adr/0007-kundenradar-eigenes-modul.md)

Das Modul ist **von Grund auf neu gedacht**. Die Retailer-Radar-Spec vom August
(Listungen, Preise, Shop-Abrufe) war ein anderer Ansatz mit anderem Gegenstand; sie
wird nicht fortgeschrieben, nur der Begriff „Händler" wird übernommen.

---

## 1. Anlass

Ölz beliefert inzwischen Kunden in ganz Europa, hat aber keine Marktforschung und
Außendienst nur in DE, AT und CH. Der Vertrieb muss sich das Wissen über seine Kunden
selbst ziehen — und das passiert heute per Zufall: ein Außendienstmitarbeiter schickt
ein Foto, ein Artikel steht in der Lebensmittel Zeitung, ein Marktbesuch liefert eine
Momentaufnahme zum Zeitpunkt X.

Simons Fehlerbild: Er bietet einem Händler drei neue Sorten fürs Backregal an. Der Händler
hat in der Vorwoche entschieden, das Regal zugunsten der SB-Backstation zu verkleinern.
„Unprofessionell, wenn ich im Kundengespräch keine Ahnung habe, was bei dem im Land
passiert."

Sein Ziel ist nicht ein Newsfeed, sondern **Kompetenzaufbau**: gegenüber dem Kunden
dessen Markt kennen. Das verlangt zwei Dinge — laufend erfahren, was sich ändert, und
vor einem Besuch gesammelt nachlesen können, was man über diesen Händler weiß.

---

## 2. Zweck und Abgrenzung

Ein Kundensignal beantwortet eine Frage: **Welche Richtung schlägt dieser Händler in
diesem Land ein — und was heißt das für Ölz?**

**Die Flughöhe ist hoch, und das ist eine Entscheidung, keine Einschränkung.** Simon
auf die Frage nach seinen Top 3: eine einzige Antwort — „grundlegende Richtungen, die der
Handel einschlägt", Schlagzeilen, die groß genug für die Lebensmittel Zeitung wären, nur
eben für die anderen Länder. Wörtlich: „lieber eine zu hohe Flughöhe als eine zu tiefe",
weil viele Länder mal viele Kunden bei wenig Zeit sonst erschlagen.

**Im Umfang** — Entscheidungen der Zentrale, die Backwaren berühren:

| Typ | Schlüssel | Beispiel |
|---|---|---|
| Strategie | `strategie` | Kette setzt verstärkt auf Eigenmarke, Protein, Bio, Convenience, Nachhaltigkeit |
| Format & Fläche | `format_flaeche` | neues Filialkonzept, Verkaufsflächen, Platzierung der Warengruppen |
| Backstation & POS | `backstation_pos` | SB-Backstation vergrößert, verkleinert, Konzept geändert, Personalprobleme beim Aufbacken |
| Sortimentskonzept | `sortimentskonzept` | Produktgruppe wird ausgebaut oder reduziert, neues Sortimentskonzept |
| Investition & Expansion | `investition_expansion` | Logistik- oder Produktionsstandort, Filialnetz, Markteintritt oder -austritt |
| Lieferkette | `lieferkette` | öffentlich bekannter Lieferantenwechsel oder Lieferproblem — eine Vertriebschance |

**Ausdrücklich nicht im Umfang**, und das steht sichtbar auf der Modulseite, damit es
niemand erwartet:

- **Listungen, Auslistungen, Preise** einzelner Artikel. In Simons Mail stand das noch;
  im Gespräch hat er es verworfen („muss nicht im Detail sein"). Es wäre außerdem nur
  per Shop-Abruf zu haben, und der scheitert an AGB und Bot-Schutz.
- **Filialebene.** Die Zentrale entscheidet, das gilt für alle Filialen. Dass eine
  Edeka-Selbständige abweicht, ist bekannt und wird bewusst ignoriert — „sonst wird es zu
  komplex" (Simon).
- **Personalien** (neuer Einkaufsleiter) und Werbeaktionen.
- **Ländergrundwissen** über Konsumenten (Slowenien ist brotlastig, ist Dinkel außerhalb
  DE/AT ein Thema). Das ist ein anderer Baustein mit anderen Quellen (YouGov, Nielsen).
- **Industriekunden** wie Bahlsen. Ein Händler ist eine Handelskette; Bahlsen braucht
  einen anderen Signalgegenstand und bleibt vorerst draußen.

### Abgrenzung zu den Nachbarn

Die Trennachse ist auch hier der **Gegenstand**:

| Modul | Gegenstand | Beispiel |
|---|---|---|
| Wettbewerbsradar | ein Hersteller, der etwas tut | Harry-Brot startet Protein-Toast |
| Produkt- & Innovationsradar | ein Konzept, egal von wem | Croissant als Eishülle |
| **Kundenradar** | **ein Händler in einem Land, der eine Richtung einschlägt** | **Kaufland SK baut Backstationen aus** |

Zwei Grauzonen brauchen eine Regel:

- **Eigenmarken.** Ein einzelnes neues Eigenmarken-Produkt (K-Classic Mini Hefegebäckrollen)
  ist ein Konzept oder ein Wettbewerbssignal, kein Kundensignal. Ein strategischer
  Eigenmarkenausbau („Kaufland verdoppelt den Eigenmarkenanteil bei Backwaren") ist eines.
- **Backstation.** Das Backstation-Konzept eines Händlers gehört hierher (der Absender
  zählt). Ein neuartiges Backstation-Produkt gehört ins Produktradar (das Konzept zählt);
  dort ist „In-Store-Bakery des Handels" schon Nachbarfeld.

---

## 3. Leitentität: Händler = Kette × Land

Kaufland SK und Kaufland DE sind zwei Händler. Beide hängen am Konzern (Schwarz-Gruppe),
und genau dieser Zusammenhang macht den **Ländervergleich** möglich, den Simons Mail als
Ziel nennt: „Entwicklungen eines Kunden über mehrere Länder hinweg vergleichen."

Je Händler steht sein **Kundenstatus** (Kunde · über Partner · kein Kunde · unbekannt),
von Ölz gepflegt, nie aus Daten geraten. „Über Partner" ist neu: In SI, HR und UK
beliefert Ölz die Ketten nicht selbst, sondern über Vertriebspartner. Der Partner ist kein
Händler; die Signale hängen an den Ketten, die er beliefert.

**Händler für den Start** (Simons Export-Kunden; das Inland hat Außendienst und
Lebensmittel Zeitung und kommt später als weitere Zeilen dazu, ohne Änderung am Modul):

| Land | Händler | Kundenstatus | Stand |
|---|---|---|---|
| DE | Kaufland | Kunde | aus Simons Mail |
| CZ | Kaufland | Kunde | aus Simons Mail |
| SK | Kaufland | Kunde | aus Simons Mail |
| HR | Kaufland | Kunde | aus Simons Mail |
| RO | Kaufland | Kunde | aus Simons Mail |
| SI | SPAR, Mercator | über Partner | **Annahme — mit Simon zu bestätigen** |
| HR | Konzum | über Partner | **Annahme — mit Simon zu bestätigen** |
| UK | Tesco, Sainsbury's | über Partner | **Annahme — mit Simon zu bestätigen** |

Elf Zeilen. Kai hatte am 02.10. von 10–15 Accounts gesprochen; das passt.

---

## 4. Das Kundensignal

Zwei Zonen wie überall: **Befund** (aus der Quelle) und **Einschätzung** (redaktionell
verantwortet).

| Feld | Zone | Pflicht für Veröffentlichung |
|---|---|---|
| Händler | Befund | ja |
| Typ (einer von sechs) | Befund | ja |
| Titel (≤ 70 Zeichen) | Befund | ja |
| Kurzzeile (≤ 100 Zeichen, sagt etwas anderes als der Titel) | Befund | ja |
| Sachverhalt (2–4 Sätze, nur was in der Quelle steht) | Befund | ja |
| Quelle (Name), URL, Datum des Dokuments | Befund | ja |
| „Für Ölz" (1–2 Sätze, beginnt mit „Für Ölz", im Konjunktiv) | Einschätzung | ja |
| Anlass für Kundenkontakt (ja/nein) | Einschätzung | nein |

Der „Für Ölz"-Satz ist die Veröffentlichungs-Hürde — wie die Relevanzkette im
Rohstoff-Radar und die Produktkategorie im Regulatorik-Radar. Ein Signal ohne diesen Satz
ist eine Nachricht, und Nachrichten hat Simon genug. **Anlass für Kundenkontakt** ist
Kais Ziel vom 02.10. („ein guter Zeitpunkt, den mal anzuschreiben"); ein Häkchen reicht,
die Begründung steht im „Für Ölz"-Satz.

Der Test für ein Signal: *Würde Simon vor dem nächsten Gespräch mit diesem Händler anders
auftreten, wenn er das wüsste?* Nur dann ist es eines.

---

## 5. Das Dossier und das Kurzprofil

Die bestehenden Module zeigen Zeitscheiben: eine Ausgabe, ein Monat, die Neuen seit dem
letzten Besuch. Simon braucht zusätzlich den **Blick auf einen Händler über die Zeit** —
„Kaufland Slowakei, da lese ich mich vor dem Besuch ein." Das ist die Seite, die es bisher
nirgends gibt, und das eigentlich Neue am Modul.

Das Dossier je Händler besteht aus:

1. **Kurzprofil** — drei bis sechs Zeilen Freitext, die sich selten ändern: Filialzahl,
   Formate, SB-Backstation ja/nein, Eigenmarken im Backwarenbereich, Besonderheiten. Der
   erste Entwurf kommt aus dem Erstlauf (siehe 7), danach pflegt ihn die Redaktion von
   Hand. Mit Stand-Datum, damit man sieht, wie alt es ist.
2. **Alle veröffentlichten Signale**, chronologisch absteigend, filterbar nach Typ.

Kein Dossier für den Konzern. Der Ländervergleich entsteht in der Übersicht, wo die
Händler eines Konzerns nebeneinander stehen.

---

## 6. Erhebung

**Monatlich im Hauptlauf**, zusammen mit den übrigen Modulen. Simon würde wöchentlich
10–15 Minuten hineinschauen, hat aber gesagt, dass monatlich reicht — und wöchentlich
hieße einen zweiten Rhythmus neben allem anderen.

**Ein Prompt je Land, nicht je Händler.** Die Fachpresse ist national, die Suche läuft in
Landessprache, und drei Kaufland-Länder in einem Lauf vermischen die Quellen.
`prompts/kundenradar.md` bekommt Land, die beobachteten Händler dort, Zeitraum und die
Liste „bereits erfasst". Höchstens acht Signale je Land und Dienst.

| Land | Fachpresse (Stand: Annahme, beim ersten Lauf prüfen) |
|---|---|
| DE | Lebensmittel Zeitung, Lebensmittel Praxis |
| CZ | Zboží & Prodej, Retail News |
| SK | Tovar & Predaj |
| HR | Ja Trgovac, Progressive |
| RO | Progresiv, Retail-FMCG |
| SI | noch zu bestimmen |
| UK | The Grocer, Retail Gazette |

Dazu je Händler die Pressemitteilungen des Landes-Auftritts, Geschäfts- und
Nachhaltigkeitsberichte des Konzerns, Interviews der Landesleitung.

**Belegpflicht wie im Regulatorik-Radar.** „Händler X plant Y" ist anfälliger für
Erfindungen als ein Produktlaunch, weil die Dienste Absichten gern aus Trendartikeln
ableiten. Als Quelle zählt die Fachpresse oder der Händler selbst; die URL muss
tatsächlich aufgerufen sein; Trendartikel ohne konkreten Händler sind kein Signal.

Sieben Läufe je Dienst. Beim Regulatorik-Radar war Gemini kaum brauchbar (formal belegt,
inhaltlich verbogen); für den Erstlauf reichen **ChatGPT und Perplexity**, Gemini nur,
wenn Zeit ist.

Das [Kunden-Register](kunden-register.md) ist Ausschlussliste und Gedächtnis für
Verworfenes, wie bei Produkt- und Rohstoff-Radar.

---

## 7. Erstbefüllung

**Alles ab 01.01.2026**, maßgeblich ist das Datum der Quelle. Strategische Bewegungen sind
langsamer als Produktlaunches; mit einem Fenster von sechs Wochen wären die Dossiers beim
Start leer, und ein leeres Dossier beweist Simon nichts.

Der Erstlauf liefert zusätzlich je Händler ein **Kurzprofil** als Entwurf (eigener Block im
Prompt, nur beim Erstlauf). Danach nur noch der Vormonat, ohne Kurzprofil.

Erwartung: 15–40 Signale gesamt bei elf Händlern. Hohe Flughöhe heißt wenige Signale; wer
mehr findet, war zu tief.

Der Prompt kann vor der Oberfläche fertig sein. Läuft er mit dem Hauptlauf am 01.11.2026
mit, liegen die Berichte bereit, bis die Import-Seite steht.

---

## 8. Darstellung

- **`/kundenradar`** — Übersicht: Kacheln je Händler, gruppiert nach Konzern, innerhalb
  des Konzerns nach Land. Kaufland zeigt fünf Kacheln nebeneinander — das ist der
  Ländervergleich. Je Kachel: Flagge/Land, Kundenstatus, Zahl der Signale, jüngstes
  Signal mit Datum, Ungesehen-Zähler. Darunter oder daneben: „Neu seit deinem letzten
  Besuch" über alle Händler, als Liste. Am Fuß der Seite die bewusste Lücke: „Keine
  Listungen, Preise oder Filialen — das Modul zeigt Entscheidungen der Zentrale."
- **`/kundenradar/[slug]`** — Dossier (Abschnitt 5). Slug ist Kette plus Land,
  `kaufland-sk`.
- **Startseite** — Block „Kundenradar" mit den neuen Signalen, wie bei Produkt- und
  Rohstoff-Radar; Eintrag in `SOURCES` (`src/lib/module-stats.ts`), damit
  Ungesehen-Zähler und Lesestand laufen. Anders als beim Regulatorik-Radar gehört das
  Modul auf die Startseite: Simons „wöchentlich 10 Minuten, was ist neu" ist genau das.
- **Admin** — `/admin/kundenradar`: Händler anlegen, Kundenstatus und Kurzprofil pflegen;
  Signale bearbeiten; Import (JSON einfügen → Entwürfe); Sammel-Veröffentlichung.
  Muster: Regulatorik.
- **Sichtbarkeit:** `adminOnly`, bis der Erstlauf gesichtet ist. Dann Daniel zeigt es
  Simon und Kai; Freischalten für alle entscheidet Kai.

---

## 9. Datenmodell

Zwei Tabellen, Spaltennamen englisch wie im übrigen Schema, Anzeigetexte deutsch im Code.

**`retailers`** — der Händler

- `name` (Text, Pflicht — der Kettenname, „Kaufland"), `slug` (Text, eindeutig)
- `country` (Text, ISO-2, Pflicht; CHECK auf die bekannten Länder) — **kein Fremdschlüssel
  auf `countries`**: Diese Tabelle gehört dem Wettbewerbsradar und steuert dessen
  Länderseiten; HR, RO, UK dort anzulegen hieße leere Länderkarten im anderen Modul.
- `group_name` (Text, optional — Konzern, „Schwarz-Gruppe")
- `customer_status` (Enum: `kunde` · `ueber_partner` · `kein_kunde` · `unbekannt`)
- `profile` (Text, optional — Kurzprofil), `profile_updated_at`
- `active`, `sort_order`, Zeitstempel

**`retailer_signals`** — das Kundensignal

- `retailer_id` (FK, Pflicht, `on delete cascade` — wer einen Händler löscht, löscht seine Signale mit; die Admin-Liste nennt die Zahl vorher)
- `signal_type` (Enum mit den sechs Schlüsseln aus Abschnitt 2)
- `title`, `teaser`, `situation` (Text)
- `source_name`, `source_url`, `source_date`
- `oelz_relevance` (Text — der „Für Ölz"-Satz)
- `contact_trigger` (Boolean, Standard false)
- `status` (`draft` · `published`), `published_at`, `ai_generated`, `created_by`, Zeitstempel

Die Hürde als CHECK: `published` verlangt Titel, Kurzzeile, Sachverhalt, `oelz_relevance`,
`source_url` und `source_date`. Dubletten beim Import über `retailer_id` + `source_url` — geprüft in der Import-Aktion, nicht per Unique-Index: Ein Geschäftsbericht darf zwei Signale verschiedenen Typs tragen.

RLS wie bei `substance_watch`: Veröffentlichtes für alle Angemeldeten lesbar, Entwürfe und
Schreiben nur Admin über `(select public.is_admin())`.

---

## 10. Nicht-Ziele

Listungen und Preise · Filialebene · Personalien und Werbeaktionen · Ländergrundwissen
über Konsumenten · Industriekunden · wöchentlicher Rhythmus · automatische Feeds der
Fachpresse · kundenspezifische Präsentationen (eigenes Vorhaben, von Kai und Simon
unabhängig voneinander gewünscht) · Inland-Händler im Erstlauf.

---

## 11. Akzeptanzkriterien

1. Simon öffnet `/kundenradar/kaufland-sk` und findet ein Kurzprofil mit Stand-Datum und
   mindestens drei Signale ab 01.01.2026, jedes mit aufgerufener Quelle.
2. Jedes veröffentlichte Signal trägt einen „Für Ölz"-Satz; die Datenbank lässt kein
   Veröffentlichen ohne ihn zu.
3. In der Übersicht stehen die fünf Kaufland-Länder nebeneinander; der Vergleich braucht
   keinen Klick.
4. Kein veröffentlichtes Signal liegt unterhalb der Schwelle (einzelne Listung, Preis,
   Filiale, Personalie) — Prüfung bei der Sichtung des Erstlaufs.
5. Die Startseite zeigt neue Kundensignale; der Ungesehen-Zähler zählt sie.
6. Die Modulseite benennt die Lücke (keine Listungen, Preise, Filialen).
7. Der Erstlauf bleibt unter 40 veröffentlichten Signalen.

---

## 12. Offene Punkte

| Für | Frage |
|---|---|
| Simon | Welche Ketten in SI, HR und UK beliefern seine Partner? (Annahmen in Abschnitt 3) |
| Simon | Nach dem Erstlauf: Trifft die Flughöhe? Was fehlt, was ist zu viel? |
| Kai | Inland-Händler (Aldi, Lidl, REWE, Edeka, SPAR AT …) als weitere Zeilen — wann, und wer pflegt den Kundenstatus? |
| Kai | Freischalten für alle Rollen nach der Sichtung |
| Daniel | Fachpresse SI; Prüfung der Annahmen in der Quellentabelle beim ersten Lauf |
| später | Vertriebspartner als eigene Einträge? Bahlsen und andere Industriekunden? Ländergrundwissen als zweiter Baustein? |

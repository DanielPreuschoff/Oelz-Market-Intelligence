# Retailer-Radar — Ergebnis der Grilling-Session

Stand: 2026-08-17 · Status: **geplant** — nächster Schritt Daten-Prototyp (siehe 14)
Herkunft: Kandidat K1 aus [marktrecherche-module.md](marktrecherche-module.md) · Verortungsentscheidung: ADR folgt mit dem Datenmodell

---

## 1. Zweck

Sichtbar machen, was im Handel mit Backwaren passiert — aus Sicht von Ölz' Handelskunden. Drei Fragen, alle online messbar:

1. **Wo und wie werden Ölz-Artikel bepreist und beworben?** (Ölz-Sicht je Kunde)
2. **Wie stehen wir zu Wettbewerbern und Eigenmarken?** (Preisabstand, Aktionstiefe)
3. **Was kommt ins Regal, was fliegt raus?** (Listungen, Auslistungen, neue Eigenmarken-Artikel)

Ausdrücklich **nicht** Teil des Moduls: Regalanteil / Share of Shelf. Der ist online nicht messbar (dafür bräuchte es Regalfotos aus dem Außendienst) und wird im Modul als bewusste Lücke benannt, damit der Vertrieb ihn nicht erwartet.

Später (nächster Iterationsschritt, von Kai Heuberger gewünscht): strategische Bewegungen der Kunden — „Kette X macht nur noch online", Formatwechsel, Eigenmarkenstrategie — Wissen, das Kai heute aus der Lebensmittel Zeitung zieht. Das Modul ist so angelegt, dass diese Nachrichten am Kunden andocken (siehe 5 und 9), ohne Umbau.

## 2. Bezeichnung

- Sidebar-Eintrag und Seitentitel: **„Retailer-Radar"** (bewusst so belassen; Nutzerentscheidung)
- Route: `/retailer-radar`, Modul-`id: 'retailer'` (Platzhalter existiert bereits in `src/lib/modules.ts`, Status `coming_soon`, ETA Q1 2027 — wird abgelöst)
- Unterzeile: „Listungen, Preise, Aktionen und Eigenmarken im Handel — je Handelskunde und Land."

## 3. Leitentität: Handelskunde = Kette × Land

Das Modul organisiert sich **um Ölz' Handelskunden**, nicht um auslesbare Shops. Zu den Kunden zählen laut Ölz mindestens REWE, SPAR, Lidl, HOFER, Aldi, Kaufland, Tesco („und mehr"). Ein Kunde ist immer *Kette × Land* (REWE/AT, SPAR/AT, HOFER/AT, Lidl/AT, Tesco/SK, Kaufland/CZ, Mercator/SI, Rohlik/CZ, Košík/CZ …).

Je Kunde steht sichtbar, **welche Daten es gibt und welche nicht**:

| Datenart | Ausprägung |
|---|---|
| Vollsortiment online | ja (Quelle) / nein / nur nach Freigabe |
| Aktionen | Quelle (Shop, Aggregator) / keine |
| Nachrichten | Stufe 1: manuelle Notiz mit Quelle · später automatisch |

Lücken werden gezeigt, nicht versteckt: Eine Kachel „SPAR/AT — Vollsortiment nicht öffentlich, Aktionen via marktguru" ist ehrlicher und nützlicher als eine Liste, in der SPAR fehlt.

**Länder.** Modell länderfähig (Kette × Land). **Stufe 1 = AT/CZ/SK/SI** (die Länder der Datenbank). Deutschland (Aldi, Kaufland, REWE, Lidl) erst nach Rückfrage bei Kai — es ist unklar, ob Ölz dort mit Marke oder nur als Eigenmarken-Lieferant im Regal steht, und das ändert, was gesucht wird.

## 4. Beobachtungsraum

Je Shop wird die **gesamte Backwaren-Kategorie** erfasst — nicht nur Ölz' Kategorien und keine feste Artikelliste. Grund: Listungen rein/raus sieht man nur, wenn man die ganze Kategorie hält; eine feste Liste sieht nur, was man schon kennt. Mehraufwand gegenüber einer Teilerfassung: null.

Jeder Artikel wird nach **Ölz-Kategorie** getaggt: Toast & Sandwich · Croissant & Plunder · Süßes Gebäck · Snack & Mini-Format · Brot (Kontext) · Sonstiges.

**Quellen Stufe 1** (Stand der Prüfung 17.08.2026, Details in [marktrecherche-module.md](marktrecherche-module.md) Abschnitt 3.7):

| Land | Vollsortiment mit Preisen | Aktionen |
|---|---|---|
| AT | HOFER (Dauersortiment, nur per Browser) · BILLA **erst nach Freigabe** (AGB § 6) | marktguru.at (alle Ketten, strukturiert) · lidl.at · penny.at |
| CZ | Košík · Rohlik (offen) | kupi.cz |
| SK | Tesco (nur per Browser) | Tesco (Clubcard-Aktionen im Shop) |
| SI | Mercator Online (offen) | Mercator (Aktionen im Shop) |

Nicht möglich: INTERSPAR (Cloudflare), Kaufland CZ (Cloudflare), Albert (kein Shop mehr), Lidl/Penny-Vollsortiment. Bot-Schutz wird nicht umgangen. Reihenfolge nach Risiko: Mercator, Košík/Rohlik → Tesco, HOFER → BILLA.

## 5. Datenmodell (Grobstruktur — Feinheit im Domain-Modeling)

**Eigene Tabellen**, kein neunter Signaltyp — mit ADR wie beim Rohstoff-Radar. Preise über Zeit sind Zeitreihen (grob 500 Artikel × 6 Shops × 12 Läufe ≈ 36.000 Zeilen/Jahr), keine Signale mit Freitext.

- **Handelskunde** — Kette, Land, Datenverfügbarkeit (Vollsortiment/Aktionen/Nachrichten je Quelle), Händlermarken-Liste („Clever", „S-BUDGET", „Ja! Natürlich", „Happy Harvest", „Tesco", „Mercator" …)
- **Erhebungslauf** — Zeitpunkt, Quelle, Status (ok / fehlgeschlagen / teilweise), Protokoll
- **Artikelbeobachtung** — Shop × Lauf: Name wie im Shop, Marke (Shop-Feld), Preis, Grundpreis, Füllmenge, Aktion (Aktionspreis, Vorher-Preis, Gültigkeit), Verfügbarkeit, URL, Bild-URL
- **Kanonischer Artikel** — je Shop ein Eintrag über Läufe hinweg; Zuordnung *Ölz / Wettbewerber X / Händler-Eigenmarke / unbekannt*; Ölz-Kategorie; Kennzeichen **„Hersteller: Ölz (Eigenmarke)"** (siehe 8); GTIN/EAN, sobald verfügbar; Zuordnung bleibt, einmal gesetzt
- **Kunden-Notiz** — manuell, mit Datum und Quelle („Kaufland stellt Onlineshop CZ ein, LZ 12.08.")
- **Ereignis** — berechnet (siehe 6), je Kunde und Artikel

Historie: **alle Läufe dauerhaft**; Standardansicht 12 Monate; Preisverlauf je Artikel; Ereignis-Zeitleiste je Kunde. Ereignisse können später als Signale ins Wettbewerbsradar gespiegelt werden — das ist ein Export, keine Datenhaltung.

## 6. Ereignisse

| Ereignis | Definition |
|---|---|
| Neue Listung | Artikel im Shop erstmals gesehen |
| Auslistung | Artikel in **zwei aufeinanderfolgenden Läufen** fehlend (einmal fehlend = meist Ausverkauf); bei Monatsrhythmus also zwei Monate Verzug — bewusst in Kauf genommen |
| Preisänderung | Regalpreis ± 5 % oder mehr gegenüber dem letzten Lauf |
| Neue Eigenmarke | Artikel mit Händlermarke erstmals gesehen |
| Ölz in Aktion | Ölz-Artikel mit Aktionspreis im Lauf |

## 7. Kennzahlen und Währung

- Vergleichsmaß **Grundpreis €/kg** (Toast 500 g vs. 750 g sind sonst nicht vergleichbar); Shop-Angabe, wo vorhanden (BILLA, Tesco, Mercator zeigen ihn), sonst aus Füllmenge gerechnet.
- Preise in **Landeswährung wie im Shop** plus **EUR-Umrechnung zum Monatskurs** (CZK) für den Vergleich über Länder — eines der Bilder, die Ölz sonst nirgends bekommt.
- Je Kunde: **Preisabstand Ölz zu Eigenmarke** (getrennt nach Ölz-Fertigung / Fremdfertigung, siehe 8), Anzahl Ölz-/Wettbewerber-/Eigenmarken-Artikel in der Kategorie, Aktionsanteil.

## 8. Von Ölz produzierte Eigenmarken

Stellt Ölz für eine Kette die Eigenmarke her, ist „Preisabstand Ölz zu Eigenmarke" dort ein Vergleich Ölz gegen Ölz — die Aussage kippt. Kein Shop-Abruf kann das wissen. Deshalb Kennzeichen am kanonischen Artikel, vom Admin nach Kais Angabe gesetzt; die Kennzahlen unterscheiden Ölz-Marke / Ölz-Eigenmarkenfertigung / Fremd-Eigenmarke.

## 9. Kunden-Nachrichten (Stufe 1 manuell)

Je Kunde kann der Admin eine Notiz mit Datum und Quelle eintragen. Kostet fast nichts und gibt Kai sofort einen Ort für das, was er heute aus der Lebensmittel Zeitung im Kopf trägt. Die automatische Erfassung (Ereigniskatalog K5 der Recherche) kommt im nächsten Schritt.

## 10. Erhebung: Rhythmus, Ort, Ausfall

- **Monatlich** (Nutzerentscheidung; wöchentlich reicht später als Cron-Änderung). Aktionen sind damit eine Momentaufnahme der Laufwoche, nicht lückenlos — bewusste Einschränkung.
- **GitHub Actions als Cron**: kostenlos, kein neuer Dienst, Playwright für Browser-Shops (HOFER, Tesco) möglich, schreibt per Service-Key in Supabase, Protokoll je Lauf sichtbar. Dasselbe Skript lokal als Rückfallebene. **Erstes Modul mit automatischer Erhebung** — alle bisherigen leben von manuell gestarteten Recherche-Läufen.
- Redaktionelle Einordnung monatlich, im Takt der anderen Module.
- **Ausfall**: bricht ein Shop-Adapter (Layoutänderung), schlägt der Lauf sichtbar fehl (GitHub-Mail), der Kunde zeigt „Stand veraltet seit …" — statt still leerer Daten.

## 11. Rechtlicher Rahmen

- Nichts gegen AGB: **BILLA nicht abrufen**, bis REWE freigibt (AT-Aktionen über marktguru.at). Die Freigabe läuft über Ölz' Key-Account-Beziehung.
- **HOFER**: einmal monatlich eine Kategorie-Seite wie ein Besucher laden ist verhältnismäßig; im ADR festgehalten; sofortiger Stopp bei Blockade.
- INTERSPAR/Kaufland: Bot-Schutz wird nicht umgangen.

## 12. Ölz-Artikelreferenz und Kuration

- Ölz-Artikel werden **jetzt aus den Shops abgeleitet** (Suche „Ölz" je Shop); die **GTIN/EAN-Liste** kommt von Ölz nach (ERP-Export) und macht das Matching exakt.
- **Zuordnung**: Regeln zuerst (Markenfeld des Shops, Namensmuster, Händlermarken-Liste je Kette), alles Unsichere in eine **Prüfliste im Admin** — ein Klick, einmal zugeordnet bleibt es. Beim ersten Lauf ist die Liste lang, ab dem zweiten enthält sie nur Neuzugänge — genau die, die man als „neue Listung" ohnehin ansehen will. „Unbekannt" zählt in den Summen mit.

## 13. Sichtbarkeit und Einstieg

- **Zuerst nur Admin.** Freigabe über einen **Schalter in der Datenbank, im Admin umlegbar, generisch für alle Module** („nur Admin / alle"); Startseite und Navigation lesen ihn. Kein Deploy nötig — der Bedarf ist zum dritten Mal aufgetreten (Rohstoff-, Food-, Retailer-Radar). Danach alle Rollen, `sales` mit Priorität.
- **Einstiegssicht**: Kunden-Kacheln (Stand, Kennzahlen, Ereignisse seit letztem Lauf) mit einem Ereignis-Streifen darüber („seit dem letzten Lauf: 3 neue Listungen, 1 Auslistung, 2 Ölz-Aktionen"); Klick öffnet den Kunden. Genaue Gestalt per Prototype-Skill (Varianten wie beim Login).

## 14. Vorgehen

1. **Daten-Prototyp** — Wegwerf-Skript, ein Lauf gegen Mercator und Košík: Datenqualität, Matching-Quote, Kategorie-Stabilität, Grundpreise vorhanden? Beantwortet „tragen die Quellen?" *vor* Tabellen, Prüfliste und Oberfläche.
2. **Datenmodell** — Domain-Modeling-Skill, ADR.
3. **UI-Varianten** — Prototype-Skill.
4. **Bau** — Adapter je Shop, GitHub-Actions-Cron, Admin-Prüfliste, Freigabe-Schalter; Matching-Regeln testgetrieben.

## 15. Fragen an Kai Heuberger — vor dem Bau klären

1. Vollständige Kundenliste je Land — und je Kunde: Marke, Eigenmarke oder beides?
2. Bei welchen Kunden liefert Ölz Eigenmarke? (entscheidet die Preisabstands-Kennzahl, Abschnitt 8)
3. Ölz-Artikelliste je Markt mit GTIN/EAN (ERP-Export).
4. Darf Metadine BILLA-Shop-Daten abrufen — Freigabe über den Key Account bei REWE?
5. Deutschland: Ist Ölz dort mit Marke im Regal (Aldi, Kaufland, REWE, Lidl)?
6. Welche Kunden-Nachrichten liest er heute (LZ, Cash, Regal) — als Vorgabe für die spätere Automatisierung.

## 16. Bewusst nicht in Stufe 1

Share of Shelf · Deutschland · automatische Kunden-Nachrichten · wöchentlicher Rhythmus · Spiegelung der Ereignisse ins Wettbewerbsradar · Regalfotos aus dem Außendienst (Field Intelligence, K7 der Recherche).

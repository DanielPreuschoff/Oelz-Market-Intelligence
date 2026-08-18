# Retailer-Radar — Ergebnis der Grilling-Session

Stand: 2026-08-17 · Status: **Datenmodell festgelegt** — nächster Schritt UI-Varianten (siehe 14)
Herkunft: Kandidat K1 aus [marktrecherche-module.md](marktrecherche-module.md) · Begriffe: [CONTEXT.md](../CONTEXT.md) Abschnitt „Retailer-Radar" · Verortungsentscheidung: [ADR-0003](adr/0003-retailer-radar-zeitreihe-und-zweistufige-artikelidentitaet.md)

---

## 1. Zweck

Sichtbar machen, was im Handel mit Backwaren passiert — aus Sicht der Händler, die Ölz beliefert oder beobachtet. Drei Fragen, alle online messbar:

1. **Wo und wie werden Ölz-Artikel bepreist und beworben?** (Ölz-Sicht je Kunde)
2. **Wie stehen wir zu Wettbewerbern und Eigenmarken?** (Preisabstand, Aktionstiefe)
3. **Was kommt ins Regal, was fliegt raus?** (Listungen, Auslistungen, neue Eigenmarken-Artikel)

Ausdrücklich **nicht** Teil des Moduls: Regalanteil / Share of Shelf. Der ist online nicht messbar (dafür bräuchte es Regalfotos aus dem Außendienst) und wird im Modul als bewusste Lücke benannt, damit der Vertrieb ihn nicht erwartet.

Später (nächster Iterationsschritt, von Kai Heuberger gewünscht): strategische Bewegungen der Kunden — „Kette X macht nur noch online", Formatwechsel, Eigenmarkenstrategie — Wissen, das Kai heute aus der Lebensmittel Zeitung zieht. Das Modul ist so angelegt, dass diese Nachrichten am Kunden andocken (siehe 5 und 9), ohne Umbau.

## 2. Bezeichnung

- Sidebar-Eintrag und Seitentitel: **„Retailer-Radar"** (bewusst so belassen; Nutzerentscheidung)
- Route: `/retailer-radar`, Modul-`id: 'retailer'` (Platzhalter existiert bereits in `src/lib/modules.ts`, Status `coming_soon`, ETA Q1 2027 — wird abgelöst)
- Unterzeile: „Listungen, Preise, Aktionen und Eigenmarken im Handel — je Händler und Land."

## 3. Leitentität: Händler = Kette × Land (mit Kundenstatus)

Das Modul organisiert sich **um Händler**, nicht um auslesbare Shops — und ein Händler ist immer *Kette × Land* (REWE/AT, SPAR/AT, HOFER/AT, Lidl/AT, Tesco/SK, Kaufland/CZ, Mercator/SI, Rohlik/CZ, Košík/CZ …). Ob ein Händler **Ölz-Kunde** ist, sagt sein **Kundenstatus** (Kunde / kein Kunde / unbekannt), den Ölz pflegt — nicht sein Name. Zu den Kunden zählen laut Ölz mindestens REWE, SPAR, Lidl, HOFER, Aldi, Kaufland, Tesco („und mehr"); Košík und Rohlik sind vermutlich keine, aber beobachtenswert. *(Domain-Modeling 17.08.: „Händler + Kundenstatus" statt „Handelskunde", weil die Kundenliste unvollständig ist und das Modul sonst wissen müsste, was es nicht weiß.)*

Je Händler steht sichtbar, **welche Daten es gibt und welche nicht**:

| Datenart | Ausprägung |
|---|---|
| Vollsortiment online | ja (Quelle) / nein / nur nach Freigabe |
| Aktionen | Quelle (Shop, Aggregator) / keine |
| Nachrichten | Stufe 1: manuelle Notiz mit Quelle · später automatisch |

Lücken werden gezeigt, nicht versteckt: Eine Kachel „SPAR/AT — Vollsortiment nach Freigabe, Aktionen via marktguru" ist ehrlicher und nützlicher als eine Liste, in der SPAR fehlt. **Vertriebslinien** (BILLA/PENNY/ADEG unter REWE/AT; SPAR/EUROSPAR/INTERSPAR unter SPAR/AT) sind ein Merkmal von Quelle und Listung, keine eigene Ebene.

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

Nicht möglich: INTERSPAR-Shop (Cloudflare), Kaufland-Marketplace (Cloudflare), Albert (kein Shop mehr), Lidl/Penny-Vollsortiment. Bot-Schutz wird nicht umgangen. Reihenfolge nach Risiko: Mercator, Košík/Rohlik → Tesco, HOFER → BILLA.

**Nachtrag 17.08.2026 — Faktencheck weiterer Kunden-Shops** (Rohbericht in `marktrecherche-module-anhang.md`, Teil 5). Vier Befunde verändern die Quellentabelle:

| Kunde | Befund | Konsequenz |
|---|---|---|
| **SPAR/AT** | `spar.at/produktwelt/brot-gebaeck` ist ein strukturierter Katalog: **1.810 Artikel** mit Preis, statt-Preis, Grundpreis, Aktionsart, Markenfilter inkl. Ölz — nicht der gesperrte INTERSPAR-Shop. Cloudflare auf der Startseite (per Browser erreichbar); **Nutzungsbedingungen 2.1: Übernahme in andere Systeme nur mit schriftlicher Genehmigung.** | SPAR ist nicht „nicht möglich", sondern **„nach Freigabe"** — wie BILLA. Gleiche Frage an Kai, gleicher Weg über den Key Account. |
| **BILLA/CZ** | Kein Shop, aber Produktkatalog mit Preisen: **12.638 Produktseiten**, Toustový chléb 30 Artikel inkl. 7 Ölz-SKUs; per HTTP frei, robots nur Sitemap. BILLA/SK: 3.402 Produktseiten mit EUR-Preisen, unstrukturierter. | **BILLA/CZ als Vollsortimentsquelle in Stufe 1** (VOP auf Abruf-Klausel noch prüfen). |
| **Kaufland/SK, Kaufland/DE** | Marketplace gesperrt, aber `predajne.kaufland.sk/aktualna-ponuka/prehlad.html` liefert **640 Aktionen als JSON inkl. Ölz** („Mliečne žemle s čokoládou 2,19 €"); DE analog `filiale.kaufland.de`. Kaufland/SI existiert nicht. | Kaufland als **Aktionsquelle** SK (und DE) — Vollsortiment nein. |
| **Tesco/CZ** | `nakup.itesco.cz` Kategorie Pekárna **407 Artikel** inkl. Ölz Super soft sandwich (Clubcard-Preis), per Browser; **Nutzungsbedingungen: nur persönliche Nutzung, Kopieren untersagt.** | Wie Tesco/SK technisch möglich, aber rechtlich zu klären — vorerst „nach Freigabe". |

Weitere Befunde: Aldi Nord/DE Vollsortiment per HTTP (Algolia-JSON, 40 Brot/Toast + 21 Croissants) — beste DE-Quelle, falls DE kommt; Aldi Süd/DE nur per Browser, filialbezogene Preise; REWE/DE Preise erst nach Marktwahl (Cloudflare); Lidl/DE ungeeignet; Lidl CZ/SK/SI wie lidl.at (nur Aktionen); Penny/CZ ohne Backwaren. **marktguru.de-AGB 4.e verbietet automatisches Auslesen ausdrücklich — die AGB von marktguru.at sind noch zu prüfen, bevor marktguru als AT-Aktionsquelle gesetzt wird.**

## 5. Datenmodell (Domain-Modeling 17.08.2026)

Begriffe verbindlich in [CONTEXT.md](../CONTEXT.md), Entscheidung in [ADR-0003](adr/0003-retailer-radar-zeitreihe-und-zweistufige-artikelidentitaet.md). **Eigene Tabellen**, kein neunter Signaltyp: Preise über Zeit sind Zeitreihen (grob 500 Artikel × 6 Quellen × 12 Läufe ≈ 36.000 Zeilen/Jahr), keine Signale mit Freitext.

```
Händler (Kette × Land)
 ├─ Kundenstatus (Kunde / kein Kunde / unbekannt — von Ölz gepflegt)
 ├─ Händlermarken (Liste: „Clever", „S-BUDGET", „T5M", „Tesco" …)
 ├─ Händler-Meldung *                   (kuratiert: Kategorie, Titel, Zusammenfassung, Quelle, Datum, Rollen)
 ├─ Notiz *                             (Betriebshinweis: Quelle, Einschränkung — keine Fachinformation)
 └─ Quelle *                            (Art: Vollsortiment | Aktionen · Vertriebslinie ·
      │                                   Zugang: frei | Browser | nach Freigabe | gesperrt ·
      │                                   Adapter-Kennung · Regel „markenlos = Eigenmarke")
      └─ Abruf *  ──────────── Lauf     (Lauf: Zeitpunkt, Auslöser; Abruf: ok | teilweise | fehlgeschlagen, Protokoll)
           └─ Beobachtung *  ── Listung (Beobachtung: Preis, Grundpreis + Basis, Füllmenge, Aktion?
                                          Aktionspreis, regulärer Preis, Gültigkeit, Verfügbarkeit,
                                          Name wie gezeigt, Marke wie gezeigt, Kategoriepfad, URL, Bild-URL,
                                          Preis in EUR zum Monatskurs)
Listung (Händler × Kennung der Quelle)  ── Artikel
 ├─ Vertriebslinie, Status aktiv | ausgelistet, erste/letzte Beobachtung, „nur aus Aktionsquelle bekannt"
Artikel (das Produkt)
 ├─ Name (kanonisch), Marke, Füllmenge, GTIN?, Produktkategorie, Herkunft
 │    (Ölz | Ölz-Fertigung | Eigenmarke | Fremdmarke | unbekannt), Wettbewerber-Bezug?
 ├─ Zuordnungsquelle (Regel | Admin), Prüfstatus (offen | geprüft)
Ereignis * (Listung, Lauf, Typ, Vorher/Nachher-Werte)
```

Schlüssel und Regeln:

- **Listung** = Händler + Kennung, mit der die Quelle den Artikel führt (Shop-ID, Produkt-URL); bleibt über Läufe stabil. Erste Beobachtung eröffnet sie, zwei fehlende Läufe schließen sie (Auslistung), eine spätere Beobachtung öffnet sie wieder (Wiederlistung).
- **Artikel** startet eins zu eins mit seiner Listung. Zusammengeführt wird automatisch über GTIN (Mercator liefert sie zu 100 %), sonst durch den Admin. Herkunft und Produktkategorie hängen am Artikel und gelten damit für alle Listungen und Läufe.
- **Herkunft „Ölz-Fertigung"** wird ausschließlich nach Angabe von Ölz gesetzt (Frage 2 an Kai). **Herkunft „Fremdmarke"** kann auf einen Eintrag des Wettbewerbsregisters (`competitors`) zeigen, wenn die Marke dort geführt wird (Penam, 7 Days, Harry …).
- **Beobachtung** ist unveränderlich; genau eine je Listung und Lauf. Preisänderung vergleicht reguläre Preise; eine Aktion ist ein Merkmal der Beobachtung, kein Preis.
- **Grundpreis** wie vom Händler ausgezeichnet (€/kg, Kč/kg, ggf. je Stück); fehlt er, aus Preis und Füllmenge gerechnet und als „gerechnet" markiert.
- **Händler-Kennzahlen** (Ölz-/Eigenmarken-/Fremdmarken-Anteil, Preisabstand Ölz zu Eigenmarke, Aktionsanteil) werden aus dem jüngsten Lauf abgeleitet, nicht gespeichert.
- **Historie**: alle Läufe dauerhaft; Standardansicht 12 Monate; Preisverlauf je Listung; Ereignis-Zeitleiste je Händler.

Was das Modell bewusst **nicht** hat: eine Entität „Vertriebslinie" (Merkmal, keine Entität — ADR-0003), eine Filial- oder Regionsebene (Preise sind die des Onlineshops bzw. Katalogs), ein Freigabe-Workflow je Beobachtung (Daten sind Messwerte, keine Redaktion).

## 6. Ereignisse

| Ereignis | Definition |
|---|---|
| Neue Listung | Artikel im Shop erstmals gesehen |
| Auslistung | Artikel in **zwei aufeinanderfolgenden Läufen** fehlend (einmal fehlend = meist Ausverkauf); bei Monatsrhythmus also zwei Monate Verzug — bewusst in Kauf genommen |
| Preisänderung | Regalpreis ± 5 % oder mehr gegenüber dem letzten Lauf |
| Neue Eigenmarke | Artikel mit Händlermarke erstmals gesehen |
| Ölz in Aktion | Ölz-Artikel mit Aktionspreis im Lauf |
| Wiederlistung | Eine ausgelistete Listung wird wieder beobachtet — bei Saisonartikeln (Vánočka, Striezel) das eigentlich interessante Ereignis; hält die Verbindung, die „Auslistung + neue Listung" verlieren würde |

## 7. Kennzahlen und Währung

- Vergleichsmaß **Grundpreis €/kg** (Toast 500 g vs. 750 g sind sonst nicht vergleichbar); Shop-Angabe, wo vorhanden (BILLA, Tesco, Mercator zeigen ihn), sonst aus Füllmenge gerechnet.
- Preise in **Landeswährung wie im Shop** plus **EUR-Umrechnung zum Monatskurs** (CZK) für den Vergleich über Länder — eines der Bilder, die Ölz sonst nirgends bekommt.
- Je Kunde: **Preisabstand Ölz zu Eigenmarke** (getrennt nach Ölz-Fertigung / Fremdfertigung, siehe 8), Anzahl Ölz-/Wettbewerber-/Eigenmarken-Artikel in der Kategorie, Aktionsanteil.

## 8. Von Ölz produzierte Eigenmarken

Stellt Ölz für eine Kette die Eigenmarke her, ist „Preisabstand Ölz zu Eigenmarke" dort ein Vergleich Ölz gegen Ölz — die Aussage kippt. Kein Shop-Abruf kann das wissen. Deshalb Kennzeichen am kanonischen Artikel, vom Admin nach Kais Angabe gesetzt; die Kennzahlen unterscheiden Ölz-Marke / Ölz-Eigenmarkenfertigung / Fremd-Eigenmarke.

## 9. Händler-Meldungen (Stufe 1 manuell)

Kais zweite Frage — „was tut der Händler selbst?" — ist eine **Meldung, nicht eine Messung**: selten, folgenreich, qualitativ, aus Fachpresse (LZ, Cash, Regal), Presseräumen und Key-Account-Gesprächen. Modelliert wie ein Signal des Wettbewerbsradars (Kategorie aus `docs/category-taxonomy.md`: `distribution`, `pricing`, `product_launch` = Eigenmarke, `m_and_a`, `hiring_signal`, `production_capacity`, `packaging_change`, `sustainability`, `regulatory`, `partnership` …), aber **am Händler** — eigene Entität im Retailer-Radar (ADR-0003-konform), Export ins Wettbewerbsradar später möglich.

Darstellung: auf der Händlerseite in **einer Zeitleiste mit den berechneten Ereignissen** („Auslistung Weißbrot 375 g" neben „SPAR startet Eigenmarken-Linie, LZ 12.08."), im Digest als Abschnitt **„Aus dem Handel"** über den Zahlen. Stufe 1: von Hand erfasst (Kai/Admin). Stufe 2: monatlicher Recherchelauf je Händler gegen frei zugängliche Quellen (Presseräume, Handelsverband, offene Fachpresse) → Prüfliste → Meldung. Stufe 3: Presseraum-RSS/Nachrichtensuche als Kandidaten (K5). Die LZ bleibt Paywall — Kais Lektüre kommt als manuelle Meldung ins System.

Fragen an Kai dazu: (a) drei bis fünf konkrete Beispiele der letzten zwölf Monate, die Ölz betroffen haben — sie definieren die Kategorien; (b) Wochen oder Monate — entscheidet Digest vs. Meldung; (c) für ihn/KAM oder auch GF — entscheidet die Rollenrelevanz. Betriebshinweise (Quelle, Filiale, Stichprobe) sind davon getrennt: das sind Notizen, keine Meldungen.

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

## 17. Ergebnis des Daten-Prototyps (17.08.2026)

Ein Lauf gegen Mercator Online (SI) und Košík (CZ); Wegwerf-Skript, Rohdaten und Auswertung auf dem Branch `prototype/retailer-radar-daten` (`scripts/prototype-retailer-radar/`). Frage: *Tragen die Quellen?* — **Ja, beide.**

| | Mercator (SI) | Košík (CZ) |
|---|---|---|
| Zugang | JSON-Endpunkt `getProducts` (der, den der Shop selbst nutzt), ohne Sitzung, ohne Browser | JSON-Endpunkt `api/front/page/products/flexible` mit `page_display=full`, ohne Sitzung |
| Artikel Backwaren | **328** in 4 s (2 Kategoriebäume: „Svež kruh in pecivo", „Pecivo, rolade") | **784** in 80 s (Baum „Pekárna a cukrárna", 68 Pfade; Kategorie ist tiefer als bei Mercator) |
| Ölz-Artikel | **24** (Toast, Sandwich, Rogljički, Pletenica, Mini polžki, Brioš Burger …) | **14** (Toust, Super Soft Sandwich, Vánočka, Závin, Mléčné houstičky) |
| Marke | 100 % (Feld `brand_name`) | 92 %; 8 % ohne Marke = frische Backshop-Ware („Právě dopečené") → faktisch Eigenmarke |
| Grundpreis / Füllmenge / GTIN | 100 % / 100 % / **100 %** | 100 % / 99 % / 0 % |
| Aktionen | 34 (10 %) mit `normal_price` | 52 (7 %) mit `recommendedPrice` + `percentageDiscount` |
| Erste Kennzahl | Toast €/kg (Median): Ölz 6,58 · Eigenmarke 3,18 · Kategorie 7,59 | Toast Kč/kg (Median): Ölz 99,87 · Eigenmarke 74,4 · Kategorie 174,75 |

Was der Prototyp gelehrt hat — Konsequenzen für das Datenmodell:

1. **Zuordnung per Markenfeld reicht als Erstregel**, aber die **Händlermarken-Liste ist je Shop zu pflegen** (Mercator: MERCATOR, T5M; Košík: Baskeeto, Authentic, Pekárna Brod, und *ohne Marke* = Eigenfertigung). Bestätigt Abschnitt 12.
2. **Ölz-Kategorie braucht ein Wörterbuch je Sprache** (cz „toust", si „toast"; cz „loupák" = Plunder; „vánočka"/„závin" = süß) — Namensmuster allein ordnen zu viel unter „sonstiges" ein (Košík 171, v. a. Backmischungen, Knäcke, glutenfrei — Kontext, kein Fokus). Der Shop-Kategoriepfad ist der bessere erste Schlüssel, das Wörterbuch die zweite Stufe, die Admin-Prüfliste die dritte.
3. **GTIN kommt bei Mercator frei Haus** — damit ist die Ölz-Artikelreferenz für SI sofort exakt; für CZ bleibt Namens-Matching bis Kais EAN-Liste da ist.
4. **Košík: Cursor-Paginierung liefert dieselbe Seite** — Blattkategorien mit > 30 Artikeln sind im Prototyp nur mit den ersten 30 erfasst (784 von geschätzt ~1.000). Im Adapter zu klären (der Shop lädt Folgeseiten offenbar über einen anderen Dienst, vermutlich Luigi's Box). Kein Hindernis, aber offen.
5. **Aufwand je Adapter ist klein** (je ~60 Zeilen), solange ein JSON-Endpunkt existiert; die Browser-Fälle (HOFER, Tesco, SPAR) sind teurer und kommen später in der Reihenfolge.

## 15. Fragen an Kai Heuberger — vor dem Bau klären

1. Vollständige Kundenliste je Land — und je Kunde: Marke, Eigenmarke oder beides?
2. Bei welchen Kunden liefert Ölz Eigenmarke? (entscheidet die Preisabstands-Kennzahl, Abschnitt 8)
3. Ölz-Artikelliste je Markt mit GTIN/EAN (ERP-Export).
4. Darf Metadine BILLA-Shop-Daten (AT) und den SPAR-Produktkatalog abrufen — Freigabe über die Key Accounts bei REWE und SPAR? (Beide Nutzungsbedingungen verlangen schriftliche Zustimmung; Tesco CZ ebenso.)
5. Deutschland: Ist Ölz dort mit Marke im Regal (Aldi, Kaufland, REWE, Lidl)?
6. Welche Kunden-Nachrichten liest er heute (LZ, Cash, Regal) — als Vorgabe für die spätere Automatisierung.

## 16. Bewusst nicht in Stufe 1

Share of Shelf · Deutschland · automatische Kunden-Nachrichten · wöchentlicher Rhythmus · Spiegelung der Ereignisse ins Wettbewerbsradar · Regalfotos aus dem Außendienst (Field Intelligence, K7 der Recherche).

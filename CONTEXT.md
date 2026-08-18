# Ölz Market & Competitor Intelligence

Interne Intelligence-Plattform für Rudolf Ölz Meisterbäcker: kuratierte Wettbewerbs-, Produkt- und Rohstoffsignale mit redaktioneller Freigabe (human-in-the-loop), organisiert in Modulen.

## Language

### Plattform

**Modul**:
Ein fachlicher Bereich der Plattform mit eigenem Sidebar-Eintrag (z.B. Wettbewerbsradar, Produkt- & Innovationsradar, Rohstoff-Radar).
_Avoid_: Dashboard, App, Bereich

**Signal**:
Atomare Intelligence-Einheit im Wettbewerbsradar: ein Ereignis = eine Karte. Wird redaktionell geprüft, bevor es veröffentlicht wird.
_Avoid_: News, Meldung, Artikel

**Edition**:
Monatlich kuratierte Ausgabe des Wettbewerbsradars — ein Container aus Signalen mit redaktioneller Einleitung.
_Avoid_: Newsletter, Report

**Impuls**:
Atomare Einheit des Produkt- & Innovationsradars: ein konzeptzentriertes Produktsignal aus dem Markt (nicht akteurszentriert).
_Avoid_: Trend, Idee

**Rolle**:
Funktionsbereich eines Nutzers (Management, Vertrieb, Innovation, Marketing, Verpackung). Steuert Hervorhebung, nie Sichtbarkeit — es gibt keine harten Wände.
_Avoid_: Berechtigung, Zielgruppe

**Sichtbarkeit**:
Ob ein Modul für alle Nutzer erscheint oder nur für den Admin (Ausrollstufe). Ein Schalter je Modul, ohne Deploy umlegbar — die einzige harte Wand der Plattform, und sie gilt Modulen, nicht Nutzern.
_Avoid_: Freigabe (als Nomen), Feature-Flag, Beta

### Rohstoff-Radar

**Rohstoffsignal**:
Atomare Einheit des Rohstoff-Radars: ein Ereignis zu einem Rohstoff, Ingredient, Verfahren oder einer Technologie — ein Ereignis = eine Karte. Derselbe Gegenstand kann über die Zeit mehrere Rohstoffsignale erzeugen.
_Avoid_: Rohstoff-Dossier, Rohstoffprofil, Eintrag

**Gegenstand**:
Das, worüber ein Rohstoffsignal berichtet: benannt (z.B. „Enzym X") und typisiert als Rohstoff, Ingredient, Technologie oder Verfahren.
_Avoid_: Produkt, Material

**Relevanzkette**:
Die sechs Glieder, die jedes veröffentlichte Rohstoffsignal verbinden muss: strategisches Thema → funktionale Lösung → gelöstes Problem → Anwendung bei Ölz → Chance → nächster Schritt. Ohne vollständige Kette keine Veröffentlichung.
_Avoid_: Begründung, Storyline

**Befund**:
Die Zone eines Rohstoffsignals, die wiedergibt, was die Quelle meldet: Neuigkeit, Funktion, Reifegrad, Evidenz, Quelle, Datum.
_Avoid_: Fakten, Daten

**Einschätzung**:
Die Zone eines Rohstoffsignals, die die redaktionelle Deutung trägt: Ölz-Anwendung, Chance, nächster Schritt. Immer sichtbar als Meinung der Redaktion ausgezeichnet, nie als Befund darstellbar.
_Avoid_: Analyse, Bewertung

**Funktion**:
Der funktionale Nutzen, den ein Gegenstand ermöglicht, aus einer geschlossenen Liste (Zuckerreduktion, Proteinanreicherung, Ballaststoffanreicherung, Frischhaltung, Textur & Mundgefühl, Prozessstabilität, Clean Label). Ein Rohstoffsignal kann mehrere Funktionen tragen.
_Avoid_: Eigenschaft, Feature, Benefit

**Strategisches Thema**:
Modulübergreifende, geschlossene Trend-Taxonomie (Proteinisierung, Clean Label, Premiumisierung, Convenience, Nachhaltigkeit). Gehört der Plattform, nicht einem einzelnen Modul.
_Avoid_: Trend (als Feldname), Megatrend, Kategorie

**Reifegrad**:
Wie weit die Lösung selbst ist: Labor, Pilot, Am Markt, Etabliert. Eigenschaft des Gegenstands, nicht der Meldung.
_Avoid_: Reife, Maturity, TRL

**Evidenz**:
Wie belastbar die Aussage ist: Herstellerangabe, Einzelstudie, Mehrfach belegt. Eigenschaft der Meldung, nicht des Gegenstands — orthogonal zum Reifegrad.
_Avoid_: Konfidenz, Quality-Score, Belastbarkeit

**Nächster Schritt**:
Der empfohlene Prüfschritt am Ende der Relevanzkette, als kurzer Satz. „Beobachten" ist ein vollwertiger Wert — die Kette erzwingt Nachdenken, nicht Gewissheit. Vokabular angelehnt an Beobachten / Prüfen / Pilotieren.
_Avoid_: To-do, Maßnahme, Empfehlung

**Erhebung**:
Der monatliche Recherche- und Kuratierungslauf, aus dem neue Rohstoffsignale hervorgehen. Ein Rhythmus, kein Artefakt — es gibt bewusst keine Ausgabe-Entität wie die Edition im Wettbewerbsradar.
_Avoid_: Ausgabe, Edition, Issue, Runde

**Stand**:
Das Datum der jüngsten Veröffentlichung im Modul. Abgeleitet, nicht gespeichert.
_Avoid_: Redaktionsschluss, Version

**Neu**:
Ein Rohstoffsignal ist neu, wenn es mit der letzten Erhebung dazugekommen ist (technisch: veröffentlicht in den letzten 30 Tagen). Zeitbasiert, nicht pro Nutzer.
_Avoid_: Ungelesen

### Retailer-Radar

**Händler**:
Eine Handelskette in einem Land (Kette × Land), z. B. SPAR/AT, Tesco/SK, Mercator/SI. Leitentität des Retailer-Radars; ob er Ölz-Kunde ist, sagt sein Kundenstatus, nicht sein Name.
_Avoid_: Handelskunde, Retailer (im Fließtext), Shop, Kunde (allein)

**Kundenstatus**:
Ob ein Händler Ölz beliefert wird: Kunde, kein Kunde, unbekannt. Von Ölz gepflegt, nie aus Daten geraten.
_Avoid_: Key Account, Kundenflag

**Vertriebslinie**:
Der Auftritt, unter dem ein Händler Ware anbietet, wenn er mehrere hat (BILLA, PENNY, ADEG unter REWE/AT; SPAR, EUROSPAR, INTERSPAR unter SPAR/AT). Ein Merkmal von Quelle und Listung, keine eigene Entität.
_Avoid_: Banner, Format, Marke (des Händlers)

**Quelle**:
Ein Ort, an dem ein Händler Sortiment oder Aktionen öffentlich zeigt: Onlineshop, Produktkatalog, Aktionsseite oder Aggregator. Trägt Art (Vollsortiment / Aktionen), Vertriebslinie und Zugangsart (frei / nur per Browser / nach Freigabe / gesperrt).
_Avoid_: Adapter, Scraper, Feed, Website

**Lauf**:
Ein automatischer Durchlauf über alle Quellen zu einem Zeitpunkt — das Artefakt, zu dem jede Beobachtung gehört. Der Retailer-Radar hat damit anders als der Rohstoff-Radar eine Lauf-Entität; „Erhebung" bleibt der Rhythmus.
_Avoid_: Scan, Crawl, Snapshot, Erhebung (für den einzelnen Durchlauf)

**Abruf**:
Der Teil eines Laufs, der eine einzelne Quelle liest, mit eigenem Ausgang: ok, teilweise, fehlgeschlagen. Der Stand eines Händlers ist der Zeitpunkt seines jüngsten erfolgreichen Abrufs.
_Avoid_: Request, Fetch, Job

**Beobachtung**:
Was eine Quelle bei einem Abruf für eine Listung gezeigt hat: Preis, Grundpreis, Füllmenge, Aktion, Verfügbarkeit, Adresse. Unveränderlich, einmal je Listung und Lauf.
_Avoid_: Messung, Datenpunkt, Zeile, Preis (allein)

**Listung**:
Ein Artikel im Sortiment eines Händlers, über Läufe hinweg: beginnt mit der ersten Beobachtung, ist aktiv oder ausgelistet, kann wieder gelistet werden. Neue Listung, Auslistung und Wiederlistung sind ihr Anfang, Ende und Neubeginn.
_Avoid_: Angebot (das ist im Handel die Aktion), Produkt, SKU, Eintrag

**Artikel**:
Das Produkt selbst, unabhängig vom Händler: Marke, Füllmenge, GTIN (wenn bekannt), Produktkategorie, Herkunft. Zwei Listungen mit derselben GTIN zeigen auf denselben Artikel; ohne GTIN bleiben es zwei Artikel, bis der Admin sie zusammenführt.
_Avoid_: Produkt, SKU, Item

**Herkunft**:
Wessen Artikel es ist: Ölz · Ölz-Fertigung (Eigenmarke eines Händlers, von Ölz produziert) · Eigenmarke (des Händlers, fremd gefertigt) · Fremdmarke (Wettbewerber, wenn möglich mit Bezug zum Wettbewerbsregister) · unbekannt. Ölz-Fertigung wird nur nach Angabe von Ölz gesetzt.
_Avoid_: Zuordnung (das ist der Vorgang), Markentyp, Hersteller (allein)

**Produktkategorie**:
Die Ölz-Sicht auf einen Artikel: Toast & Sandwich, Croissant & Plunder, Süßes Gebäck, Snack & Mini-Format, Saisonal, dazu Brot als Kontext und Sonstiges. Erste Stufe der Zuordnung ist der Kategoriepfad des Händlers, zweite ein Wörterbuch je Sprache, dritte die Prüfliste.
_Avoid_: Kategorie (allein — kollidiert mit den Signal-Kategorien), Warengruppe, Segment

**Aktion**:
Eine Beobachtung, in der der Händler den Artikel unter dem regulären Preis anbietet, mit Aktionspreis, regulärem Preis und — wenn bekannt — Gültigkeit. Preisänderungen werden am regulären Preis gemessen, nie an Aktionen.
_Avoid_: Angebot, Promotion, Deal, Rabatt (als Nomen für das Ganze)

**Grundpreis**:
Der Preis je Kilogramm (oder je Stück, wo der Händler so auszeichnet) als einziges Vergleichsmaß über Füllmengen, Händler und Länder hinweg; in Landeswährung und in EUR zum Monatskurs.
_Avoid_: Kilopreis, Unit Price, Normpreis

**Ereignis**:
Was der Vergleich zweier Läufe über eine Listung aussagt: neue Listung, Auslistung (nach zwei fehlenden Läufen), Wiederlistung, Preisänderung (± 5 % regulär), neue Eigenmarke, Ölz in Aktion. Berechnet und gespeichert, damit es angezeigt und später ins Wettbewerbsradar gespiegelt werden kann — dort wird es zum Signal, hier ist es keines.
_Avoid_: Signal, Alert, Meldung, Änderung

**Prüfliste**:
Die Warteschlange der Artikel, deren Herkunft oder Produktkategorie die Regeln nicht sicher setzen konnten; der Admin entscheidet je Artikel einmal, die Entscheidung bleibt.
_Avoid_: Inbox, Review-Queue, To-dos

**Händler-Notiz**:
Eine von Hand erfasste Beobachtung zu einem Händler mit Datum und Quelle („stellt Onlineshop CZ ein, LZ 12.08.") — der Platz für Wissen, das nicht aus Läufen kommt.
_Avoid_: Nachricht, Kommentar, News


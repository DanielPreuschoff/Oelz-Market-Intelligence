# Deep Research — Produkt-Marktscan International

**Rhythmus: monatlich, ein Lauf, Fenster = Vormonat.** Der Blick in die Quellmärkte:
Was ist dort im letzten Monat an Produktkonzepten aufgetaucht, das nach Europa
wandern könnte? Kein Rückblick weiter als das Fenster — Erstbefüllung gibt es bei
diesem Modul bewusst nicht, es lebt von Frische.

`{ZEITRAUM}` und `{BEKANNT}` ersetzen. Ergebnis ablegen als
`research/JJJJ-MM/produkt-marktscan.md`.

Abgrenzung zum Wettbewerbsradar: Dort ist der **Absender** das Signal (die beobachteten
Wettbewerber im DACH/CEE-Markt). Hier ist das **Konzept** das Signal — wer es macht,
ist zweitrangig.

---

## Prompt

```
Du recherchierst Produktkonzept-Impulse für Rudolf Ölz Meisterbäcker, einen
österreichischen Premium-Hersteller von Feinbackwaren. Heimatmarkt Österreich,
weitere Märkte Tschechien, Slowakei, Slowenien.

ÖLZ-SORTIMENT (Fakt):
Croissant & Plunder · Süßes Gebäck · Toast & Sandwich · Snack & Mini-Format · Saisonal.
Produktsprache: Croissant, Kipferl, Laugengebäck, Gugelhupf, Striezel, Plundergebäck,
Toastbrot, Brioche.

QUELLMÄRKTE
Kern: USA und Großbritannien. Beobachtungsfeld: Japan und Südkorea — dort entstehen
Formate und Texturen, die mit Jahren Verzug im Westen ankommen (Beispiele der
Vergangenheit: Mochi-Gebäck, Croffle, Cloud Bread).

KATEGORIEN
Kern: süßes Gebäck, Viennoiserie, Toast/Brioche, süße Snacks.
Ausdrücklich auch die Nachbarfelder, aus denen Konzepte in die Backwarenkategorie
überspringen: Frühstücksangebote von Schnellrestaurant- und Kaffeeketten,
In-Store-Bakery des Handels, Süßwaren- und Dessertkonzepte mit Gebäckbezug.

ZEITRAUM: {ZEITRAUM}
Nur Konzepte, die in diesem Fenster neu aufgetaucht, neu gelauncht oder erstmals
sichtbar geworden sind. Ältere Konzepte nur, wenn in diesem Fenster etwas Neues mit
ihnen passiert ist — und dann steht das Neue im Mittelpunkt.

BEREITS ERFASST — nicht erneut melden:
{BEKANNT}

WAS EIN IMPULS AUSMACHT
Der Test: Würde ein Ölz-Produktentwickler nach dieser Meldung eine Konzeptidee
notieren, die vorher nicht naheliegend war? Nur dann ist es ein Impuls.

Früherkennung geht vor Absicherung: Ein Konzept aus einer einzelnen Bäckerei oder
einem einzelnen Kettenversuch zählt, wenn das Konzept übertragbar ist — der Crookie
begann in genau einer Pariser Bäckerei. Kennzeichne die Traktion aber ehrlich
(siehe Ausgabeformat), damit Frühsignal und belegter Trend unterscheidbar bleiben.

KEINE IMPULSE SIND
- Neuheiten von Backwarenherstellern aus AT/DE/CH/CZ/SK/SI im dortigen Handel —
  die gehören in ein anderes Modul (Wettbewerbsbeobachtung)
- Reine Geschmacksvarianten bekannter Produkte ohne neues Konzept dahinter
- Preisaktionen, Werbekampagnen, Verpackungsrelaunches ohne Konzeptänderung
- Allgemeine Trendberichte ohne konkretes Produkt oder konkrete Kette
- Wiederholungen aus der Liste oben

Findest du nichts Belastbares, schreib das hin. Ein leerer Bericht ist brauchbar,
ein aufgefüllter nicht.

QUELLEN
Produktankündigungen von Ketten und Herstellern, Handels- und Foodservice-Fachpresse,
Menü-Neuheiten großer Ketten, Social-Media-Trends mit konkretem Produkt dahinter,
Messeberichte. Englisch-, deutsch- und gern auch japanisch-/koreanischsprachig suchen;
melde auf Deutsch.

AUSGABEFORMAT
Für jeden Fund genau diesen Block:

## IMPULS
TITEL: Das Konzept als Überschrift, höchstens 70 Zeichen. Kein Analysesatz —
  "Croissant als Eishülle erreicht den Handel", nicht "Die gastronomische Praxis,
  Croissants als Trägerhülle für Speiseeis zu nutzen, springt in den Handel".
KURZSIGNAL: Ein Satz, höchstens 100 Zeichen, der etwas ANDERES sagt als der Titel —
  die konkreteste Zahl oder Beobachtung des Funds. Keine Wiederholung der Überschrift.
PRODUKTBEISPIEL: Konkretes Produkt und Anbieter (z.B. "Crookie — Boulangerie Louvard, Paris")
RADAR_TYP: Format | Claim | Rezeptur & Genuss | Occasion | Verpackung | Saison | Handel
KATEGORIE: Produktkategorie in 2-4 Worten
MARKT: Quellmarkt (Land)
KANAL: LEH | QSR/Kette | In-Store-Bakery | Café/Bäckerei | Social/Direktvertrieb
WAS_IST_NEU: 2-3 Sätze. Nur was in der Quelle steht.
HAUPT_CLAIM: Wie das Produkt beworben wird, möglichst im Wortlaut
TRAKTION: Frühsignal (einzelne Sichtung) | Nachahmer sichtbar | Im Quellmarkt etabliert
MARKTSIGNAL: 1-2 Sätze — woran die Traktion ablesbar ist (Listung, Ausverkauft-Meldungen,
  Nachahmer, Reichweite). Bei Frühsignal: was die Sichtung bemerkenswert macht.
QUELLE: Name des Mediums, der Kette oder des Herstellers
URL: vollständig und tatsächlich aufgerufen
DATUM: YYYY-MM-DD

--- ab hier Einschätzung, im Konjunktiv ---
TRANSFERSTATUS: Nur Quellmarkt | Erste Sprünge (wohin) | In Europa angekommen (wo)
ÖLZ_RELEVANZ: 1-2 Sätze — warum das für einen Feinbackwaren-Hersteller interessant ist
MÖGLICHER_TRANSFER: 1-2 Sätze, als Vermutung — wie eine Ölz-Umsetzung aussehen könnte.
  Fällt dir keine plausible ein, schreib das; ein Fund ohne Transferidee ist ehrlich.
PRIORITÄT: Beobachten | Prüfen | Pilotieren, Doppelpunkt, ein konkreter Schritt

Am Ende: ## ENDE — N Impulse

REGELN
- Trenne strikt Befund und Einschätzung.
- Erfinde keine Produkte, Ketten, Zahlen oder URLs.
- Höchstens acht Impulse — lieber fünf gute als acht dünne.
- Deutsch, auch wenn die Quellen englisch sind.
- Der Bericht besteht ausschließlich aus den IMPULS-Blöcken und der Endzeile —
  keine Einleitung, keine Zusammenfassung, kein Fazit.
```

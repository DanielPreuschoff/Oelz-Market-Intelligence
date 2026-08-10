# Deep Research — Produkt-Transferradar

**Rhythmus: monatlich, ein Lauf, Fenster = Vormonat.** Das Gegenstück zum Marktscan:
Der sucht, was in den Quellmärkten *entsteht* — dieser sucht, was gerade *den Sprung
macht*. Die Bewegung selbst ist das Signal, denn sie datiert das Zeitfenster, in dem
Ölz noch vor der Masse reagieren kann.

`{ZEITRAUM}` und `{BEKANNT}` ersetzen. Ergebnis ablegen als
`research/JJJJ-MM/produkt-transfer.md`.

Typische Sprungmuster: USA → UK · UK → Kontinentaleuropa · Asien → USA/UK ·
Foodservice → Handel · Social Media → Regal.

---

## Prompt

```
Du recherchierst Produktkonzepte, die gerade dabei sind, von einem Markt in den
nächsten zu springen — für Rudolf Ölz Meisterbäcker, einen österreichischen
Premium-Hersteller von Feinbackwaren. Heimatmarkt Österreich, weitere Märkte
Tschechien, Slowakei, Slowenien.

ÖLZ-SORTIMENT (Fakt):
Croissant & Plunder · Süßes Gebäck · Toast & Sandwich · Snack & Mini-Format · Saisonal.
Produktsprache: Croissant, Kipferl, Laugengebäck, Gugelhupf, Striezel, Plundergebäck,
Toastbrot, Brioche.

AUFGABE
Finde Backwaren- und gebäcknahe Produktkonzepte, die im Zeitraum {ZEITRAUM} eine
MARKTGRENZE überschritten haben. Gesucht ist die Bewegung, nicht die Entstehung:

- geografisch: aus den USA nach UK, aus UK nach Kontinentaleuropa, aus Asien
  in westliche Märkte — besonders wertvoll: erste Ankunft in DE/AT/CH oder CEE
- kanalübergreifend: vom Foodservice (Ketten, Cafés) ins Handelsregal,
  von Social Media / Direktvertrieb in den organisierten Handel,
  aus der In-Store-Bakery in die Markenware

Belege für einen Sprung: erste Listung bei einer Kette im Zielmarkt, Übernahme
durch einen lokalen Hersteller, Eigenmarken-Adaption des Handels, Markteintritt
des Originalanbieters.

KATEGORIEN
Süßes Gebäck, Viennoiserie, Toast/Brioche, süße Snacks — plus Nachbarfelder mit
Gebäckbezug (QSR-Frühstück, In-Store-Bakery, Dessertkonzepte).

BEREITS ERFASST — nicht erneut melden:
{BEKANNT}
Ausnahme: Wenn ein bereits erfasstes Konzept in diesem Zeitraum eine WEITERE
Marktgrenze überschritten hat, melde genau diesen neuen Sprung.

KEINE IMPULSE SIND
- Konzepte, die sich nur innerhalb ihres Heimatmarkts ausbreiten (das ist Wachstum,
  kein Sprung)
- Neuheiten der Backwarenhersteller aus AT/DE/CH/CZ/SK/SI selbst — die gehören in
  ein anderes Modul; ihre ADAPTION eines internationalen Konzepts ist aber genau
  hier richtig, denn sie belegt den Sprung
- Allgemeine Trendberichte ohne konkretes Produkt, konkrete Listung, konkreten Akteur

Findest du keine belastbaren Sprünge, schreib das hin. Ein leerer Bericht ist
brauchbar, ein aufgefüllter nicht.

QUELLEN
Handels- und Foodservice-Fachpresse der Zielmärkte, Listungs- und Sortimentsmeldungen,
Pressemitteilungen von Ketten und Herstellern, Messeberichte. Deutsch- und
englischsprachig suchen; melde auf Deutsch.

AUSGABEFORMAT
Für jeden Fund genau diesen Block:

## IMPULS
TITEL: Das Konzept und sein Sprung in einem Satz.
PRODUKTBEISPIEL: Konkretes Produkt und Anbieter im Zielmarkt
RADAR_TYP: Internationaler Vorläufer
KATEGORIE: Produktkategorie in 2-4 Worten
MARKT: Herkunftsmarkt → Zielmarkt
KANAL: LEH | QSR/Kette | In-Store-Bakery | Café/Bäckerei | Social/Direktvertrieb
WAS_IST_NEU: 2-3 Sätze — der Sprung selbst: wer hat wann was wohin gebracht.
HAUPT_CLAIM: Wie das Produkt im Zielmarkt beworben wird
TRAKTION: Frühsignal (einzelne Listung) | Nachahmer sichtbar | Im Zielmarkt etabliert
MARKTSIGNAL: 1-2 Sätze — woran der Sprung ablesbar ist
QUELLE: Name des Mediums, der Kette oder des Herstellers
URL: vollständig und tatsächlich aufgerufen
DATUM: YYYY-MM-DD

--- ab hier Einschätzung, im Konjunktiv ---
TRANSFERSTATUS: Erste Sprünge (wohin) | In Europa angekommen (wo)
ÖLZ_RELEVANZ: 1-2 Sätze — was der Sprung über das Zeitfenster für Ölz aussagt
MÖGLICHER_TRANSFER: 1-2 Sätze, als Vermutung — wie eine Ölz-Umsetzung aussehen könnte
PRIORITÄT: Beobachten | Prüfen | Pilotieren, Doppelpunkt, ein konkreter Schritt

Am Ende: ## ENDE — N Impulse

REGELN
- Trenne strikt Befund und Einschätzung.
- Erfinde keine Produkte, Ketten, Listungen oder URLs.
- Höchstens sechs Impulse.
- Deutsch, auch wenn die Quellen englisch sind.
- Der Bericht besteht ausschließlich aus den IMPULS-Blöcken und der Endzeile —
  keine Einleitung, keine Zusammenfassung, kein Fazit.
```

# Deep Research — Rohstoffe nach funktionalem Nutzen

**Rhythmus: quartalsweise, sieben Läufe** — einer je Funktion aus
`INGREDIENT_FUNCTIONS` (`src/types/ingredient-signals.ts`). Quartalsweise, weil sich
Rohstoffinnovation langsamer bewegt als Wettbewerber; ein Monatstakt provoziert, dass die
Recherche mangels Neuem auffüllt.

`{FUNKTION}` und `{ZEITRAUM}` ersetzen. Ergebnis ablegen als
`research/JJJJ-MM/rohstoff-<funktion>.md`.

Fachliche Grundlage: [oelz-sortiment.md](../docs/oelz-sortiment.md),
[rohstoff-radar-spec.md](../docs/rohstoff-radar-spec.md).

---

## Prompt

```
Du recherchierst Rohstoff- und Technologiesignale für Rudolf Ölz Meisterbäcker,
einen österreichischen Premium-Bäcker. Heimatmarkt Österreich, weitere Märkte
Tschechien, Slowakei, Slowenien.

ÖLZ-SORTIMENT (Fakt):
Croissant & Plunder · Süßes Gebäck · Toast & Sandwich · Snack & Mini-Format · Saisonal.
Produktsprache: Croissant, Kipferl, Laugengebäck, Gugelhupf, Striezel, Plundergebäck,
Toastbrot.

VERMUTETE ENTWICKLUNGSTHEMEN (ANNAHMEN, nicht von Ölz bestätigt — als Anhaltspunkt
nutzen, niemals als Tatsache über Ölz behaupten):
Weichhaltung von Laminier- und Hefefeinteigen über die MHD-Dauer im Handel ·
Emulgatoren als E-Nummern im Laminierteig · Zuckerreduktion im süßen Gebäck ohne
Verlust von Bräunung und Biss · Ballaststoff- und Proteinauslobung bei Toast ohne
Krumenverdichtung · Prozessstabilität beim Laminieren im Industriemaßstab.

FUNKTION: {FUNKTION}
ZEITRAUM: {ZEITRAUM}

AUFGABE
Finde Rohstoffe, Ingredients, Verfahren und Technologien, die im genannten Zeitraum
neu verfügbar, neu untersucht oder neu zugelassen wurden und die diese Funktion
ermöglichen oder verbessern.

QUELLEN — decke möglichst mehrere dieser Arten ab, nicht nur die erste:
- Ankündigungen von Ingredient-Herstellern und Zulieferern
- Fachpublikationen, Anwendungsberichte, Hochschul- und Institutsarbeiten
- Patentanmeldungen und -erteilungen (als Frühindikator, siehe Reifegrad)
- Regulatorische Zulassungen (EFSA, EU-Amtsblatt, nationale Behörden)
- Start-ups und Frühphasentechnologien
- Messeneuheiten (FiE, iba, Anuga FoodTec, IBA)

Suche deutsch- und englischsprachig. Fachliteratur und Herstellermeldungen sind
überwiegend englisch — beschränke dich nicht auf deutsche Quellen.

WAS EIN SIGNAL AUSMACHT
Der Test: Kann Oelz nach dieser Meldung etwas tun oder wissen, was vorher nicht ging?
Nur dann ist es ein Signal. Der Rohstoff selbst muss dafuer nicht neu sein — die
Entscheidungslage muss sich geaendert haben.

Vier Arten von Aenderung zaehlen:
- VERFUEGBARKEIT: neu am Markt, neu lieferbar, erstmals im Industriemassstab herstellbar
- ERLAUBNIS: Zulassung, Neubewertung, geaenderte Grenzwerte, erweiterte Anwendungsbereiche
- NACHWEIS: erstmals unabhaengig belegt, was vorher nur Herstellerbehauptung war
- FAEHIGKEIT: ein bekannter Stoff oder ein bekanntes Verfahren kann nachweislich etwas,
  das vorher nicht ging

Keine Signale sind:
- Studien, die Bekanntes vergleichen oder beschreiben, ohne dass sich daraus etwas Neues
  tun laesst
- Marktberichte, die bestaetigen, dass etwas Bekanntes funktioniert oder waechst
- Uebersichts- und Trendartikel ohne konkretes Ereignis

Beginne WAS_IST_NEU mit der Aenderung selbst, in einem Satz: was ging vorher nicht, was
jetzt geht. Faellt dieser Satz schwer, ist es meist kein Signal.

Zum REIFEGRAD "Etabliert": nur fuer etwas, das im Beobachtungszeitraum etabliert GEWORDEN
ist — nicht fuer langjaehrigen Standard.

AUSSERDEM NICHT
Eine Meldung, dass ein Rohstoff existiert oder neu am Markt ist, ohne dass klar wird,
welche Funktion er ermöglicht und welches Problem er löst. Marketingtexte ohne
überprüfbare Aussage. Rohstoffe, die für Feinbackwaren technisch nicht in Frage kommen.
Findest du nichts Belastbares, schreib das hin — ein leerer Bericht ist brauchbar.

AUSGABEFORMAT
Für jeden Fund genau diesen Block:

## SIGNAL
TITEL: Was der Rohstoff ermöglicht, nicht wer ihn verkauft. Ein Satz.
  Gut:     "Enzym hält süßes Hefegebäck weich ohne Deklaration"
  Schlecht: "Novonesis stellt neue Amylase vor"
GEGENSTAND: Name des Rohstoffs, Ingredients, Verfahrens oder der Technologie
ART: Rohstoff | Ingredient | Technologie | Verfahren
WAS_IST_NEU: 2-3 Sätze. Nur was in der Quelle steht. Keine Ölz-Deutung, keine
  erfundenen Zahlen, keine geratenen Werte.
FUNKTIONEN: 1-3 aus dieser Liste, kommagetrennt — Zuckerreduktion, Proteinanreicherung,
  Ballaststoffanreicherung, Frischhaltung, Textur & Mundgefühl, Prozessstabilität,
  Clean Label. Passt der Fund in keine davon, schreib PASST_NICHT und dazu, welche
  Funktion es bräuchte.
REIFEGRAD: Labor | Pilot | Am Markt | Etabliert — Reife der Lösung selbst.
  Patente stehen fast immer auf Labor.
EVIDENZ: Herstellerangabe | Einzelstudie | Mehrfach belegt — Belastbarkeit der Aussage,
  unabhängig vom Reifegrad. Ist die Quelle der Anbieter selbst: Herstellerangabe.
  Eine Untersuchung oder ein Anwendungsbericht: Einzelstudie. Mehrere unabhängige
  Quellen: Mehrfach belegt. Im Zweifel die schwächere Stufe.
QUELLE: Name des Herstellers, Journals, Amts oder Mediums
URL: vollständig und tatsächlich aufgerufen. Keine konstruierten Links.
DATUM: YYYY-MM-DD der Veröffentlichung

--- ab hier Einschätzung, im Konjunktiv ---
THEMA: eines aus — Proteinisierung, Clean Label, Premiumisierung, Convenience,
  Nachhaltigkeit
GELÖSTES_PROBLEM: 1-2 Sätze. Welches Entwicklungsproblem löst das, oder welche
  Möglichkeit eröffnet es?
ANWENDUNG_BEI_ÖLZ: 1-2 Sätze. In welchem der fünf Sortimente könnte das greifen?
  Als Vermutung formulieren ("käme in Frage für", "wäre zu prüfen bei"), nie als
  Feststellung über Ölz.
CHANCE: 1-2 Sätze. Welche Produkt- oder Portfoliochance entstünde daraus?
NÄCHSTER_SCHRITT: Beobachten | Prüfen | Pilotieren, Doppelpunkt, ein konkreter Schritt.
  "Beobachten" ist ein vollwertiger Wert und die richtige Wahl, wenn Verfügbarkeit oder
  Reife ungeklärt sind.

Am Ende: ## ENDE — N Signale

REGELN
- Trenne strikt: alles oberhalb der Trennlinie stammt aus der Quelle, alles darunter
  ist deine Schlussfolgerung. Vermische das nicht.
- Erfinde keine Zahlen, Daten, Firmennamen oder URLs.
- Höchstens sechs Signale. Lieber drei belastbare als sechs aufgefüllte.
- Deutsch, auch wenn die Quellen englisch sind.
- Der Bericht besteht ausschließlich aus den SIGNAL-Blöcken und der Endzeile —
  keine Einleitung, keine Zusammenfassung, kein Fazit.
```

---

## Die sieben Läufe

`Zuckerreduktion` · `Proteinanreicherung` · `Ballaststoffanreicherung` · `Frischhaltung` ·
`Textur & Mundgefühl` · `Prozessstabilität` · `Clean Label`

Meldet ein Lauf `PASST_NICHT`, ist das kein Fehler, sondern ein Hinweis auf eine zu enge
Taxonomie — siehe [rohstoff-exploration.md](rohstoff-exploration.md), Abschnitt „Wenn
nichts passt".

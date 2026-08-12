# Deep Research — Rohstoff-Exploration

**Rhythmus: monatlich, ein Lauf.** Der Gegenpol zu den Funktionsläufen: die suchen im
bekannten Terrain, dieser sucht daneben. Er beantwortet die Frage, die eine geschlossene
Funktionsliste strukturell nicht beantworten kann — was man nicht weiß, dass man es nicht
weiß.

`{LINSE}`, `{ZEITRAUM}` und `{BEKANNT}` ersetzen. Ergebnis ablegen als
`research/JJJJ-MM/rohstoff-exploration-<linse>.md`.

---

## Die Linsen — rotierend

Nicht nach Kalender, sondern **nach Zahl der bisherigen Explorationsläufe**, damit sich
nichts verschiebt, wenn ein Monat ausfällt. Der aktuelle Stand steht in
[docs/rohstoff-register.md](../docs/rohstoff-register.md).

| # | Linse | Sucht nach |
|---|---|---|
| 1 | Verfahren und Prozesstechnik | Neue Herstell-, Ferment- oder Aufbereitungsverfahren |
| 2 | Nebenströme und Regionales | Upcycling, Reststoffverwertung, regionale Rohstoffquellen |
| 3 | Regulatorik | Zulassungen, Kennzeichnungsänderungen, neue Grenzwerte |
| 4 | Frühphase | Start-ups, Ausgründungen, Pilotanlagen, Finanzierungsrunden |
| 5 | Angrenzende Kategorien | Was in Süßwaren, Molkerei, Snacks oder Fleischalternativen funktioniert und auf Feinbackwaren übertragbar wäre |

Linse 5 ist die wertvollste und die, die man am ehesten auslässt. Dort liegen die
Übertragungen, die niemand sucht, weil sie nicht im Backwarenregal stehen.

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

BLICKFELD: {LINSE}
ZEITRAUM: {ZEITRAUM}

AUFGABE
Finde Rohstoffe, Ingredients, Verfahren und Technologien in diesem Blickfeld, die für
industrielle Feinbackwaren relevant werden könnten.

Dies ist ausdrücklich eine Suche ins Offene. Beschränke dich NICHT auf die naheliegenden
Themen der Backbranche. Interessant ist gerade, was Ölz noch nicht auf dem Schirm hat.

BEREITS ERFASST — nicht erneut melden:
{BEKANNT}

Wenn du zu einem dieser Punkte etwas wesentlich Neues findest, das über den bekannten
Stand hinausgeht, melde es und schreib dazu, was daran neu ist.

QUELLEN
Herstellerankündigungen, Fachpublikationen, Patente, regulatorische Bekanntmachungen,
Start-up- und Finanzierungsmeldungen, Messeberichte. Suche bewusst auch ausserhalb der
Backwaren-Fachpresse — und deutsch- wie englischsprachig; Fachliteratur und
Herstellermeldungen sind überwiegend englisch.

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
Allgemeine Trendberichte ohne konkreten Rohstoff oder konkretes Verfahren. Marketingtexte
ohne überprüfbare Aussage. Wiederholungen aus der Liste oben.
Findest du nichts Belastbares, schreib das hin. Ein leerer Bericht ist brauchbar, ein
aufgefüllter nicht.

AUSGABEFORMAT
Für jeden Fund genau diesen Block:

## SIGNAL
TITEL: Was der Rohstoff ermöglicht, nicht wer ihn verkauft. Als Überschrift,
  höchstens 70 Zeichen — kein Analysesatz. Die Kachel im Modul kappt bei zwei
  Zeilen, ein längerer Titel wird also abgeschnitten.
  Gut:    "Zitrusfaser bindet das Achtfache ihres Gewichts an Fett"
  Zu lang: "Hochfunktionale, aus Nebenströmen upgecycelte Zitrusfasern binden das
           Achtfache ihres Eigengewichts an Fett und ersetzen so komplexe
           Hydrokolloid- und Emulgatorsysteme"
GEGENSTAND: Name des Rohstoffs, Ingredients, Verfahrens oder der Technologie
ART: Rohstoff | Ingredient | Technologie | Verfahren
WAS_IST_NEU: 2-3 Sätze. Nur was in der Quelle steht.
FUNKTIONEN: 1-3 aus dieser Liste, kommagetrennt — Zuckerreduktion, Proteinanreicherung,
  Ballaststoffanreicherung, Frischhaltung, Textur & Mundgefühl, Prozessstabilität,
  Clean Label.
  Passt der Fund in keine davon: schreib PASST_NICHT und dahinter, welche Funktion es
  bräuchte. Das ist erwünscht, kein Fehler — siehe unten.
REIFEGRAD: Labor | Pilot | Am Markt | Etabliert
EVIDENZ: Herstellerangabe | Einzelstudie | Mehrfach belegt. Im Zweifel die schwächere.
QUELLE: Name des Herstellers, Journals, Amts oder Mediums
URL: vollständig und tatsächlich aufgerufen
DATUM: YYYY-MM-DD

--- ab hier Einschätzung, im Konjunktiv ---
THEMA: Proteinisierung | Clean Label | Premiumisierung | Convenience | Nachhaltigkeit
GELÖSTES_PROBLEM: 1-2 Sätze
ANWENDUNG_BEI_ÖLZ: 1-2 Sätze, als Vermutung formuliert. Wenn dir keine plausible
  Anwendung einfällt, schreib das — ein Fund ohne Ölz-Bezug ist ein ehrlicher Fund.
CHANCE: 1-2 Sätze
NÄCHSTER_SCHRITT: Beobachten | Prüfen | Pilotieren, Doppelpunkt, ein konkreter Schritt

Am Ende: ## ENDE — N Signale

REGELN
- Trenne strikt Befund und Schlussfolgerung.
- Erfinde keine Zahlen, Daten, Firmennamen oder URLs.
- Höchstens sechs Signale.
- Deutsch, auch wenn die Quellen englisch sind.
- Der Bericht besteht ausschließlich aus den SIGNAL-Blöcken und der Endzeile —
  keine Einleitung, keine Zusammenfassung, kein Fazit.
```

---

## Wenn nichts passt

`PASST_NICHT` ist das eigentliche Produkt dieses Laufs. Die sieben Funktionen sind eine
geschlossene Liste, und die Veröffentlichungs-Hürde verlangt mindestens eine davon — ein
Fund ausserhalb lässt sich also nicht veröffentlichen.

Das ist gewollt: Häufen sich Funde mit demselben fehlenden Nenner, ist nicht das Signal
falsch, sondern die Taxonomie zu eng. Dann wird eine Funktion ergänzt — an drei Stellen,
die zusammenpassen müssen:

1. `INGREDIENT_FUNCTIONS` in `src/types/ingredient-signals.ts`
2. Die Aufzählungen in diesem und in `rohstoff-funktion.md`
3. Ein neuer Quartalslauf für die neue Funktion

Bis dahin bleibt der Entwurf liegen. Das ist der Preis dafür, dass die Filterachse nicht
zum Sammelbecken wird — und die Antwort auf die offene Frage in
`docs/rohstoff-radar-spec.md` Abschnitt 14, ob die sieben Funktionen ausreichen. Statt es
zu raten, lässt du es dir zeigen.

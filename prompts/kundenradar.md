# Deep Research — Kundenradar (ein Lauf je Land)

**Rhythmus: monatlich, ein Lauf je Land**, zusammen mit den übrigen Läufen am
Monatswechsel. Länder im Erstlauf: DE, CZ, SK, HR, RO, SI, UK — sieben Läufe je Dienst.
Für den Erstlauf reichen ChatGPT und Perplexity.

**Erstbefüllung (Lauf vom 01.11.2026): alles ab 01.01.2026**, maßgeblich ist das Datum der
Quelle, plus ein Kurzprofil je Händler (Block KURZPROFIL, nur beim Erstlauf — danach den
Block aus dem Prompt streichen). Ab dem zweiten Lauf nur noch der Vormonat.

Ersetzen: `{LAND}` (Name), `{FACHPRESSE}` (aus der Tabelle unten), `{HAENDLER}` (Liste
aus [docs/kunden-register.md](../docs/kunden-register.md), Abschnitt „Händler", nur
dieses Land), `{ZEITRAUM}`, `{BEKANNT}` (Register, Abschnitt „Signale", nur dieses Land —
beim Erstlauf „noch nichts"). Ergebnis ablegen als
`research/JJJJ-MM/kundenradar.<land>.<dienst>.md`.

Fachliche Grundlage: [docs/kundenradar-spec.md](../docs/kundenradar-spec.md) (Flughöhe,
Typen, Abgrenzung), [ADR 0007](../docs/adr/0007-kundenradar-eigenes-modul.md).

| Land | `{FACHPRESSE}` (Annahme — beim ersten Lauf prüfen und hier berichtigen) |
|---|---|
| DE | Lebensmittel Zeitung, Lebensmittel Praxis |
| CZ | Zboží & Prodej, Retail News (retailnews.cz) |
| SK | Tovar & Predaj |
| HR | Ja Trgovac, Progressive |
| RO | Progresiv, Retail-FMCG |
| SI | noch zu bestimmen — Wirtschaftspresse (Finance, Delo) und Händlerseiten |
| UK | The Grocer, Retail Gazette |

---

## Prompt

```
Du recherchierst für den Vertrieb von Rudolf Ölz Meisterbäcker, einem österreichischen
Premium-Hersteller von Feinbackwaren (Croissants, Plundergebäck, süßes Gebäck, Toast,
Brioche, Convenience-Backwaren; verpackt im Regal und als Teiglinge für die
SB-Backstation). Ölz beliefert Handelsketten in mehreren europäischen Ländern, hat aber
dort keinen Außendienst. Der Vertrieb will wissen, welche Richtung seine Handelskunden
einschlagen, bevor er zum Gespräch fährt.

LAND: {LAND}

BEOBACHTETE HÄNDLER in diesem Land — nur diese:
{HAENDLER}

ZEITRAUM: {ZEITRAUM}
Nur Entscheidungen und Ankündigungen, die in diesem Fenster öffentlich wurden. Ältere
nur, wenn im Fenster ein neuer Schritt dazukam — dann steht der neue Schritt im
Mittelpunkt.

BEREITS ERFASST — nicht erneut melden:
{BEKANNT}

AUFGABE
Finde, welche grundlegenden Richtungen diese Händler in diesem Land einschlagen, soweit
sie Backwaren berühren — direkt (Backstation, Brotregal, Eigenmarken bei Backwaren) oder
indirekt (Filialkonzept, Flächen, Eigenmarkenstrategie, Expansion, Logistik).

DIE FLUGHÖHE
Hoch. Der Maßstab: Wäre die Meldung groß genug für die Lebensmittel Zeitung? Dann ist sie
ein Signal. Beispiele für die richtige Höhe (erfunden):
- "Kaufland Slowakei baut die SB-Backstationen in allen Filialen aus"
- "Lidl Kroatien verkleinert das Brotregal zugunsten der Backstation"
- "Tesco verdoppelt den Eigenmarkenanteil bei Backwaren bis 2027"
- "Kaufland Rumänien eröffnet Logistikzentrum und 20 neue Filialen"
- "Mercator streicht Bäckereien im Eingangsbereich wegen Personalkosten"

Die Zentrale entscheidet, und das gilt für alle Filialen. Was eine einzelne Filiale tut,
ist kein Signal.

Der Test: Würde ein Ölz-Vertriebler vor dem nächsten Gespräch mit diesem Händler anders
auftreten, wenn er das wüsste? Nur dann ist es ein Signal.

TYP — genau einer dieser Schlüssel:
strategie              Schwerpunkt: Eigenmarke, Protein, Bio, Convenience, Nachhaltigkeit,
                       Preiseinstieg, Premium
format_flaeche         Filialkonzept, Verkaufsfläche, Platzierung der Warengruppen
backstation_pos        SB-Backstation oder Bäckerei im Markt: ausgebaut, verkleinert,
                       Konzept geändert, Personalprobleme beim Aufbacken
sortimentskonzept      eine Produktgruppe wird ausgebaut oder reduziert, neues
                       Sortimentskonzept
investition_expansion  Logistik- oder Produktionsstandort, Filialnetz, Markteintritt,
                       Marktaustritt, Übernahme
lieferkette            öffentlich bekannter Lieferantenwechsel, Lieferproblem, Rückruf
                       mit Sortimentsfolge — eine Vertriebschance

KEINE SIGNALE SIND
- Einzelne Listungen, Auslistungen oder Preise von Artikeln
- Werbeaktionen, Prospekte, Rabattwochen
- Personalien (neuer Einkaufsleiter, neuer Geschäftsführer)
- Quartals- oder Jahreszahlen ohne Richtungsaussage
- Ereignisse einzelner Filialen
- Neuheiten von Backwarenherstellern (anderes Modul: Wettbewerbsradar)
- Einzelne neue Eigenmarken-Produkte ohne strategische Aussage dahinter
- Allgemeine Handelstrends ohne konkreten Händler
- Händler, die nicht in der Liste oben stehen
- Wiederholungen aus BEREITS ERFASST

Findest du nichts Belastbares, schreib das hin. Ein leerer Bericht ist brauchbar, ein
aufgefüllter nicht — und hohe Flughöhe heißt wenige Funde.

QUELLEN
Die Fachpresse des Landes: {FACHPRESSE}. Pressemitteilungen des Händlers im Land und des
Konzerns (Geschäftsbericht, Nachhaltigkeitsbericht, Investorenseiten), Interviews der
Landesleitung in Wirtschaftspresse und Fachpresse. Suche in der Landessprache und auf
Englisch; melde auf Deutsch.

Belegpflicht: Als Quelle zählt die Fachpresse, die Wirtschaftspresse oder der Händler
selbst. Trendartikel, Blogs und Aggregatoren zeigen den Weg, sind aber kein Beleg. Was
du nicht belegen kannst, lässt du weg. Jede URL musst du tatsächlich aufgerufen haben.

AUSGABEFORMAT
Für jeden Fund genau diesen Block:

## SIGNAL
HÄNDLER: genau wie in der Liste oben
TYP: einer der sechs Schlüssel
TITEL: höchstens 70 Zeichen — was der Händler tut, als Schlagzeile. Kein Analysesatz.
KURZZEILE: ein Satz, höchstens 100 Zeichen, der etwas ANDERES sagt als der Titel — die
  konkreteste Zahl, Frist oder Beobachtung des Funds.
SACHVERHALT: 2–4 Sätze. Nur was in der Quelle steht. Zahlen, Fristen und Orte wörtlich
  aus der Quelle. Keine Deutung.
QUELLE: Name des Mediums oder des Händlers
URL: vollständig und tatsächlich aufgerufen
DATUM: YYYY-MM-DD — Datum der Veröffentlichung, nicht des Abrufs

--- ab hier Einschätzung, im Konjunktiv ---
FÜR_ÖLZ: 1–2 Sätze, beginnend mit "Für Ölz" — was die Richtung für den Vertrieb
  bedeuten könnte: welches Sortiment passt jetzt besser oder schlechter, welches
  Gespräch läge nahe. Fällt dir nichts ein, schreib das; ein Signal ohne Bedeutung für
  Ölz ist ehrlich.
ANLASS: ja | nein — ob die Meldung ein konkreter Anlass wäre, den Händler jetzt
  anzusprechen. ja nur, wenn ein Gesprächsaufhänger in FÜR_ÖLZ steht.

KURZPROFIL (nur beim Erstlauf)
Zusätzlich für jeden Händler aus der Liste genau einen Block, unabhängig vom ZEITRAUM:

## KURZPROFIL
HÄNDLER: genau wie in der Liste oben
PROFIL: 3–6 Zeilen Fließtext — Filialzahl im Land, Formate, SB-Backstation oder
  Bäckerei im Markt (ja/nein, Konzept), Eigenmarken im Backwarenbereich, Marktstellung,
  Besonderheiten. Nur Belegtes; Zahlen mit Jahr.
QUELLEN: die zwei bis vier wichtigsten Adressen, tatsächlich aufgerufen

Am Ende: ## ENDE — N Signale, M Kurzprofile

REGELN
- Trenne strikt Befund und Einschätzung.
- Erfinde keine Entscheidungen, Zahlen, Zitate oder URLs. Eine Absicht, die du aus einem
  Trendartikel ableitest, ist kein Signal.
- Höchstens acht Signale — lieber drei belegte als acht dünne.
- Deutsch, auch wenn die Quellen in der Landessprache oder englisch sind; Eigennamen
  bleiben.
- Der Bericht besteht ausschließlich aus den SIGNAL- und KURZPROFIL-Blöcken und der
  Endzeile — keine Einleitung, keine Zusammenfassung, kein Fazit.
```

---

## Danach: Import

Die Berichte liegen in `research/JJJJ-MM/kundenradar.<land>.<dienst>.md` (gitignored).
Claude führt die Dienste je Land zusammen (Dubletten über Händler + Quelle), prüft die
URLs, prüft die Flughöhe (alles unterhalb geht mit Begründung ins Register, Abschnitt
„Verworfen") und baut die Importdatei. Sie wird unter `/admin/kundenradar/import`
eingefügt und legt **Entwürfe** an; Kurzprofile gehen als Entwurf in das Feld des
Händlers, sofern es leer ist.

Erwartetes JSON — Feldnamen sind die Spaltennamen der Tabelle:

```json
{
  "period": "Januar bis Oktober 2026",
  "signals": [
    {
      "retailer_slug": "kaufland-sk",
      "signal_type": "backstation_pos",
      "title": "Kaufland Slowakei baut SB-Backstationen in allen Filialen aus",
      "teaser": "Umbau von 70 Filialen bis Mitte 2027, Brotregal wird verkleinert",
      "situation": "…",
      "oelz_relevance": "Für Ölz …",
      "contact_trigger": true,
      "source_name": "Tovar & Predaj",
      "source_url": "https://…",
      "source_date": "2026-09-12"
    }
  ],
  "profiles": [
    {
      "retailer_slug": "kaufland-sk",
      "profile": "…",
      "sources": ["https://…", "https://…"]
    }
  ]
}
```

`retailer_slug`, `signal_type` und `title` sind Pflicht, alles andere darf fehlen — der
Entwurf zeigt in der Admin-Liste, was zum Veröffentlichen noch fehlt. Unbekannte Slugs
und ungültige Typen werden benannt und übersprungen.

# Deep Research — ein Wettbewerber

Für den monatlichen Lauf: dieser Prompt wird **einmal pro Wettbewerber** in ChatGPT
Deep Research ausgeführt. `{WETTBEWERBER}` und `{ZEITRAUM}` vor dem Absenden ersetzen.

Das Ergebnis wird als Datei abgelegt — ein Bericht pro Wettbewerber, benannt nach dem
Kurznamen, zum Beispiel `research/2026-08/harry-brot.md`. Aus diesen Dateien entstehen
die Importkandidaten; das Ausgabeformat unten ist so gewählt, dass die Extraktion nicht
raten muss.

Fachliche Grundlage: [category-taxonomy.md](../docs/category-taxonomy.md),
[content-guidelines.md](../docs/content-guidelines.md),
[competitor-registry.md](../docs/competitor-registry.md).

---

## Prompt

```
Du recherchierst Wettbewerbssignale für Rudolf Ölz Meisterbäcker, einen österreichischen
Premium-Bäcker (Croissants, Plundergebäck, süßes Gebäck, Toast, Convenience-Backwaren).
Relevante Märkte: Österreich als Heimatmarkt, dazu Tschechien, Slowakei, Slowenien.

WETTBEWERBER: {WETTBEWERBER}
ZEITRAUM: {ZEITRAUM}

Recherchiere, was dieser Wettbewerber im genannten Zeitraum getan hat. Suche in
Fachpresse, Unternehmensmitteilungen, Handelsmedien, LinkedIn und Branchenportalen —
deutschsprachig und englischsprachig, für CZ/SK/SI auch landessprachlich.

WAS ZÄHLT ALS SIGNAL
Ein Signal ist ein konkretes, belegbares Ereignis. Der Test: Würde jemand bei Ölz sagen
"das muss ich weitergeben" oder "da müssen wir etwas tun"? Wenn nein, weglassen.
Keine Allgemeinplätze, keine Wiederholung von Bekanntem, keine Vermutungen ohne Beleg.

Wenn du im Zeitraum nichts Belegbares findest, schreib das hin. Ein leerer Bericht ist
brauchbar; ein aufgefüllter ist es nicht.

KATEGORIEN — genau eine je Signal, exakt einer dieser Schlüssel:
product_launch     Neues Produkt, Sortimentserweiterung, Saisonartikel
packaging_change   Format, Material, Redesign, Nachhaltigkeitsumstellung
distribution       Neue Listung, Marktein- oder -austritt, Kanalausbau, Auslistung
production_capacity Werk, Linienausbau, Kapazitätsinvestition, Automatisierung
m_and_a            Übernahme, Fusion, Joint Venture, Beteiligung, Börsengang
campaign           Große Kampagne, Markenrelaunch, Sponsoring, PR-Aktion
pricing            Sichtbare Preisänderung, Promotion, Bundle
hiring_signal      Strategische Personalie, die eine Richtung anzeigt
technology         Digitalisierung, Automatisierung, KI, Patent, neues Verfahren
sustainability     ESG-Claim, Zertifizierung, CO2-Zusage, Verpackungsversprechen
startup_signal     Neue Marke oder neues Geschäftsmodell im Segment
regulatory         Gesetz, Kennzeichnungspflicht, Zertifizierungsstandard
partnership        Co-Branding, Lizenz, Handelskooperation

Bei Zweifeln die kommerziell bedeutsamste Lesart wählen. m_and_a hat Vorrang vor
distribution, wenn es um Eigentümerwechsel geht. hiring_signal nur, wenn die Rolle eine
strategische Richtung anzeigt (neues Land, neue Funktion, C-Level).

WICHTIGKEIT — 1, 2 oder 3:
1  Wissenswert, geringe Dringlichkeit. Schwaches Signal, Trendbestätigung.
2  Verlangt Aufmerksamkeit. Könnte Ölz kommerziell oder strategisch berühren.
3  Verlangt Handeln oder Diskussion. Großer Zug, direkte Bedrohung oder Chance.
Im Zweifel 1. Eine 3 soll selten sein.

AUSGABEFORMAT
Für jedes Signal genau diesen Block, in dieser Reihenfolge, ohne zusätzliche Ebenen:

## SIGNAL
HEADLINE: Ein Satz, maximal 80 Zeichen. Nennt Wettbewerber und Handlung. Muss ohne
  den Rest verständlich sein. Nicht "Neues Produkt", sondern "Harry-Brot listet neue
  Roggentoast-Reihe bei Billa Österreich".
KATEGORIE: einer der Schlüssel oben
WICHTIGKEIT: 1, 2 oder 3
LAND: AT, CZ, SK oder SI — oder leer, wenn marktübergreifend
DATUM: YYYY-MM-DD, wann das Ereignis stattfand. Nicht das Abrufdatum.
QUELLE: Name des Mediums oder der Organisation
URL: vollständige, direkt aufrufbare Adresse. Keine geratenen oder konstruierten Links.
SUMMARY: Zwei bis fünf Sätze in dieser Reihenfolge — was ist passiert, welche
  Größenordnung und welche Details, was heißt das für Ölz. Der letzte Satz beginnt mit
  "Für Ölz" und benennt die kommerzielle oder strategische Folge. Keine Spekulation über
  die Quelle hinaus; Schlussfolgerungen als solche kennzeichnen ("das deutet darauf hin").

Am Ende des Berichts eine Zeile:
## ENDE — N Signale

REGELN
- Erfinde keine Zahlen, Daten, Firmennamen oder URLs. Was du nicht belegen kannst,
  lässt du weg.
- Jede URL muss du tatsächlich aufgerufen haben.
- Höchstens acht Signale. Wenn mehr in Frage kommen, nimm die wichtigsten.
- Deutsch, auch wenn die Quellen englisch sind.
```

---

## Danach

Alle Berichte eines Monats liegen in `research/JJJJ-MM/`. Der Ordner ist in `.gitignore` —
das sind fremde Inhalte, die nicht ins Repo gehören.

Aus den Dateien entsteht die Importdatei; sie wird unter `/admin/import` eingefügt und
erzeugt Kandidaten zur Durchsicht. Das erwartete JSON:

```json
{
  "period": "August 2026",
  "signals": [
    {
      "competitor": "Harry-Brot",
      "headline": "Harry-Brot listet neue Roggentoast-Reihe bei Billa Österreich",
      "summary": "…  Für Ölz bedeutet das …",
      "category": "product_launch",
      "importance": "2",
      "country": "AT",
      "source_name": "LEBENSMITTELpraxis",
      "source_url": "https://…",
      "signal_date": "2026-07-14"
    }
  ]
}
```

`competitor` wird über Name oder Kurzname aufgelöst, Groß-/Kleinschreibung und Rechtsform
sind egal. Unbekannte Namen führen nicht zum Abbruch — das Signal wird als marktweit
angelegt und im Ergebnis benannt. Bereits bekannte `source_url`s werden übersprungen.

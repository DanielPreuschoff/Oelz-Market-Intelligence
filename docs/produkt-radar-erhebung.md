# Produkt-Radar — Erhebungsablauf

Beschlossen im August 2026. Regelt, wie das Produkt- & Innovationsradar monatlich
befüllt wird — nach demselben Muster wie Wettbewerbs- und Rohstoff-Radar: Deep
Research außerhalb der App, Berichte als `.md`, Aufbereitung, Import als Entwürfe,
redaktionelle Durchsicht.

## 1. Abgrenzung zum Wettbewerbsradar

> **Wettbewerbsradar:** Der *Absender* ist das Signal — einer der beobachteten
> Wettbewerber im DACH/CEE-Markt tut etwas, auch ein Produktlaunch.
> **Produkt-Radar:** Das *Konzept* ist das Signal — wer es macht, ist zweitrangig.
> Interessant ist, dass es existiert und noch nicht (oder gerade erst) in unserem
> Markt angekommen ist.

Entscheidungsregel für Grenzfälle: Neuheiten von Backwarenherstellern aus
AT/DE/CH/CZ/SK/SI im dortigen Handel → Wettbewerbsradar. Deren *Adaption eines
internationalen Konzepts* ist zugleich ein Transferbeleg und darf im Produkt-Radar
als Sprung erscheinen — der Impuls handelt dann vom Konzept, nicht vom Wettbewerber.

Die internationale Herkunft ist die Standardperspektive der Recherche, nicht eine
Kategorie unter acht. Der Radar-Typ „Internationaler Vorläufer" bleibt für Funde
des Transferradars reserviert.

## 2. Das Impulskriterium — Früherkennung vor Absicherung

*Würde ein Ölz-Produktentwickler nach dieser Meldung eine Konzeptidee notieren,
die vorher nicht naheliegend war?*

Traktion ist ausdrücklich **keine** Bedingung — der Crookie begann in einer
einzigen Pariser Bäckerei. Stattdessen wird die Belegstärke ehrlich ausgewiesen
(Traktionsstufen: Frühsignal · Nachahmer sichtbar · Etabliert) und fließt in die
redaktionelle Priorität ein, nicht in die Aufnahme.

Keine Impulse: reine Geschmacksvarianten, Preis- und Werbeaktionen,
Trendberichte ohne konkretes Produkt.

## 3. Quellmärkte und Kategoriebreite

- **Kern:** USA, Großbritannien
- **Beobachtungsfeld:** Japan, Südkorea (Formate/Texturen mit Jahren Verzug)
- **Kategorien:** Ölz-Sortimentsfelder plus Nachbarfelder, aus denen Konzepte
  überspringen — QSR-Frühstück, In-Store-Bakery, Kaffeeketten-Gebäck,
  Dessertkonzepte mit Gebäckbezug. Nachbarfeld-Funde werden als solche etikettiert
  (Feld „Kategorie"/„Kanal").

## 4. Rhythmus und Menge

- **Monatlich am 1.**, gemeinsam mit Wettbewerber- und Rohstofferhebung.
- **Fenster = Vormonat.** Keine Rückbefüllung — das Modul lebt von Frische;
  erster Lauf: 1. September 2026 für den August.
- **Ziel: 5–10 veröffentlichte Impulse je Monat.** Lieber fünf gute als zehn dünne.
- Zwei Läufe je Erhebung: `produkt-marktscan.md` (was entsteht) und
  `produkt-transfer.md` (was springt). Beide Prompts liegen in `prompts/`.

## 5. Ablauf

1. Daniel ersetzt `{ZEITRAUM}` und `{BEKANNT}` (aus [impuls-register.md](impuls-register.md))
   und fährt beide Prompts auf den Deep-Research-Diensten (ChatGPT, Gemini, Perplexity).
2. Berichte nach `research/JJJJ-MM/` (gitignoriert), Benennung wie in den Prompts.
3. Aufbereitung (Claude): Zitatmarker entfernen, Dubletten über die Dienste
   zusammenführen, URLs prüfen, auf die Impuls-Felder abbilden, Import-JSON bauen.
   Das Register wird dabei fortgeschrieben — auch um Verworfenes mit Begründung.
4. Import als Entwürfe, `ai_generated = true`.
5. Redaktionelle Durchsicht: Bewertungen (Fit, Neuheit, Machbarkeit, Claim-Potenzial)
   setzt die Redaktion beim Durchsehen — nicht die Recherche. **Bilder werden manuell
   nachgepflegt** (Entscheidung Q6); ohne Bild wird nicht veröffentlicht, wenn die
   Kachel dadurch leidet — Einzelfallentscheidung.
6. Veröffentlichen; die Neu-Zähler auf Startseite und Navigation laufen automatisch mit.

## 6. Feld-Abbildung Bericht → `innovation_impulses`

| Berichtsfeld | Datenbankfeld | Anmerkung |
|---|---|---|
| TITEL | `title` | |
| PRODUKTBEISPIEL | `product_example` | |
| RADAR_TYP | `radar_type` | Transferradar immer „Internationaler Vorläufer" |
| KATEGORIE | `category` | |
| MARKT | `market` | beim Transfer: „Herkunft → Ziel" |
| KANAL | `channel` | |
| WAS_IST_NEU | `what_is_new` | |
| HAUPT_CLAIM | `main_claim` | |
| TRAKTION + MARKTSIGNAL | `market_signal` | Stufe vorangestellt: „Frühsignal — …" |
| QUELLE/URL/DATUM | `source_url`, `source_date` | |
| TRANSFERSTATUS + ÖLZ_RELEVANZ | `oelz_development_relevance` | |
| MÖGLICHER_TRANSFER | `possible_oelz_transfer` | |
| PRIORITÄT | `ratings.priority` | übrige Bewertungen redaktionell |
| TITEL (kurz) | `short_signal` | bei der Aufbereitung verdichtet |
| — | `tags` | bei der Aufbereitung aus `IMPULSE_TAGS` vergeben |
| — | `image_url` | manuell nachgepflegt |

## 7. Offene Baustelle

**Sammelimport für Impulse existiert noch nicht** — heute gibt es nur das
Einzelformular mit KI-Extraktion. Bis der Import gebaut ist (Muster:
`/admin/rohstoff-radar/import`), werden aufbereitete Impulse einzeln über das
Formular erfasst; bei 5–10 je Monat ist das vertretbar, aber der Import ist der
Plan. Umsetzung vor dem ersten Lauf am 1. September.

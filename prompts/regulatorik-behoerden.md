# Deep Research — Regulatorik-Radar (Behörden-Lauf)

**Rhythmus: monatlich, ein Lauf**, zusammen mit den übrigen Läufen am Monatswechsel. Dazu
das Formular unter `/admin/unter-beobachtung/neu` für alles, was nicht vier Wochen warten
kann — eine BfR-Warnung zählt am Tag, an dem sie erscheint.

**Erste Befüllung (Lauf vom 30.09./01.10.2026): alles ab 01.01.2026**, maßgeblich ist das
Datum der Quelle. Ein Verfahren, das schon 2025 begann, gehört hinein, wenn es 2026 einen
neuen Schritt hatte (Gutachten, Ausschussvotum, Entwurf). Danach nur noch der Vormonat.

Für den ersten Lauf sind ZEITRAUM und die Liste „BEREITS ERFASST" im Prompt schon
eingesetzt (Stand 14.09.2026, die 15 veröffentlichten Fälle aus `substance_watch`). Vor
jedem weiteren Lauf beide Stellen erneuern: ZEITRAUM = Vormonat, Liste = alle
veröffentlichten Fälle mit Stoff, Stufe, Geltungsbereich und Kurzzeile — damit der Lauf
nicht wiederholt, was steht, sondern meldet, was sich daran **geändert** hat. Ergebnis
ablegen als `research/JJJJ-MM/regulatorik.md`.

Fachliche Grundlage: [docs/unter-beobachtung-spec.md](../docs/unter-beobachtung-spec.md)
(Stufen, Hürde, Abgrenzung), [ADR 0006](../docs/adr/0006-regulatorik-radar-eigenes-modul.md).

---

## Die drei Eintragstypen

| Typ | Was hineingehört | Pflicht |
|---|---|---|
| **RISIKO** (Unter Beobachtung) | Ein benennbarer Stoff steht unter regulatorischem oder öffentlichem Druck: Neubewertung, Höchstgehalt, Verbot, Kritik | Stoff, Stufe, Handlung, Ölz-Kategorie |
| **ZULASSUNG** | Ein Stoff, Enzym, Aroma oder Novel Food wird zugelassen oder ist im Verfahren — eine Chance, kein Risiko | Stoff, Ölz-Kategorie („wo könnte Ölz den Stoff einsetzen") |
| **INDIREKT** (Indirekt relevant) | Ein Rechtsakt ohne benennbaren Stoff oder ohne Ölz-Kategorie, der Ölz trotzdem treffen könnte: Zuckersteuer, Kennzeichnung, Werbebeschränkung, Präzedenzfall in einer Nachbarkategorie | Der Satz „Warum könnte das Ölz betreffen?" |

Faustregel aus der Spec: **Wenn du den Stoff nennen kannst, ist es RISIKO oder ZULASSUNG.**
Kannst du ihn nicht nennen oder passt keine Ölz-Kategorie, ist es INDIREKT — oder nichts.

**Nicht hinein:** Beschaffungsrisiko (Verknappung, Preis, Kakao, Butter, Eier),
Produktrückrufe und Chargenwarnungen (RASFF), Wettbewerber-Meldungen (Wettbewerbsradar),
Trend-Artikel ohne konkretes Verfahren.

---

## Quellen — nur amtliche Primärquellen

Die Regel gilt ohne Ausnahme: **Der Beleg ist die Behörde selbst**, nicht die Fachpresse
und kein Aggregator. Fachpresse darf den Weg zur Quelle zeigen; als URL zählt nur die
amtliche. Grund: Am 31.08.2026 hat ein Reiseführer der Recherche ein „dessert bread"
untergeschoben, das es nicht gibt. Bei Regulatorik wäre das kein Ärgernis, sondern ein
Kunstfehler — eine erfundene Höchstmenge, auf die jemand eine Rezepturentscheidung stützt.

| Quelle | Wofür | Adresse |
|---|---|---|
| EFSA — Veröffentlichungen | Gutachten, Neubewertungen, Novel-Food- und Zusatzstoffbewertungen (RISIKO und ZULASSUNG) | https://www.efsa.europa.eu/en/publications · RSS: https://www.efsa.europa.eu/en/rss |
| EFSA — Konsultationen und laufende Anträge | Frühestes Signal: Antrag eingegangen, Entwurfsgutachten zur Konsultation | https://connect.efsa.europa.eu/RM/s/consultations · https://open.efsa.europa.eu/questions |
| EFSA — Plenarprotokolle (FAF, CONTAM, NDA) | Beschlüsse etwa zwei Monate vor der Veröffentlichung | https://www.efsa.europa.eu/en/events |
| EU-Kommission — PAFF-Ausschuss | Tagesordnungen und Berichte: konkrete Entwürfe vor der Abstimmung, das stärkste Signal für kommendes Recht | https://food.ec.europa.eu/horizontal-topics/committees/paff-committees_en |
| EU-Kommission — Have Your Say | Geplante Initiativen und Entwürfe mit Feedbackphase | https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en |
| EUR-Lex — Amtsblatt L | Verabschiedete Verordnungen, Änderungen der Unionslisten (Zusatzstoffe 1333/2008, Novel Food 2017/2470, Kontaminanten 2023/915, Aromen 1334/2008, MRL 396/2005) | https://eur-lex.europa.eu |
| BfR (DE) | Stellungnahmen — Deutschland ist der Frühindikator für Österreich | https://www.bfr.bund.de/de/publikationen/stellungnahmen-und-mitteilungen/ |
| AGES und BMSGPK (AT) | Bewertungen, nationale Verordnungen, Codex-Kapitel B 18 Backerzeugnisse | https://www.ages.at · https://www.verbrauchergesundheit.gv.at |
| BLV (CH) | Vernehmlassungen und Newsletter Lebensmittelrecht — die Schweiz ist nicht EU-harmonisiert | https://www.blv.admin.ch/blv/de/home/lebensmittel-und-ernaehrung/rechts-und-vollzugsgrundlagen/vernehmlassungen-und-anhoerungen.html |
| Parlament AT / Bundestag DE | Steuern und Kennzeichnung sind national — Zuckersteuer, Nutri-Score, Werbeverbote (INDIREKT) | https://www.parlament.gv.at · https://dip.bundestag.de |

Für Stufe „Öffentliche Kritik" (RISIKO ohne Behörde) zählen auch NGO und Verbraucherschutz
(Greenpeace, VKI, foodwatch) — dann ist die Kampagne selbst die Quelle, Behörde = KEINE.

---

## Suchkriterien

**Verfahren:** novel food · Union list · food additive re-evaluation · specifications
(231/2012) · food enzyme · flavouring · maximum levels · MRL · public consultation · call
for data · draft act · Durchführungsverordnung · Höchstgehalt · Neubewertung

**E-Nummern aus Feinbackwaren:** E 422 Glycerin · E 471, E 472e, E 481/482 Emulgatoren ·
E 200–203, E 280–283 Konservierung · E 300, E 920 Mehlbehandlung · E 450, E 500, E 341
Backtriebmittel · E 160a/b, E 150a–d Farbe · E 412, E 415, E 466 Verdickung · E 420,
E 965 Zuckeraustausch · E 942 Lachgas · E 1520 Aromaträger · Süßstoffe (Sucralose,
Steviol-Glykoside)

**Kontaminanten und Rückstände:** Acrylamid · MOSH/MOAH · 3-MCPD/Glycidylester ·
Deoxynivalenol, T-2/HT-2, Ochratoxin A · Mutterkorn-Alkaloide · Tropan- und
Pyrrolizidinalkaloide · Cadmium, Blei, Nickel · Ethylenoxid (Sesam, Saaten) · PFAS ·
Glyphosat · Chinolizidinalkaloide (Lupine) · Thebain/Oripavin (Mohn)

**Produkte und Ernährungspolitik (INDIREKT):** Zuckersteuer · Salz- und Zuckerreduktion ·
Trans-Fettsäuren · Nutri-Score · Werbebeschränkungen für Kinderprodukte (HFSS) ·
Nährwertkennzeichnung · Herkunftskennzeichnung Mehl/Ei

---

## Prompt

```
Du recherchierst regulatorische Signale für Rudolf Ölz Meisterbäcker, einen
österreichischen Premium-Bäcker (Croissants, Plundergebäck, süßes Gebäck, Toast,
Convenience-Backwaren). Märkte: Österreich, Deutschland, Schweiz, Tschechien, Slowakei,
Slowenien. Das Schweizer Lebensmittelrecht ist nicht EU-harmonisiert.

ÖLZ-KATEGORIEN (genau diese fünf Schreibweisen):
Croissant & Plunder · Süßes Gebäck · Toast & Sandwich · Snack & Mini-Format · Saisonal

ZEITRAUM: 01.01.2026 bis 30.09.2026

BEREITS ERFASST — nicht erneut melden, nur Änderungen dazu:
Stand 14.09.2026, 15 Fälle im Regulatorik-Radar, alle Typ RISIKO. Melde nur, was sich
daran geändert hat: neue Stufe, neues Gutachten, Amtsblatt, Frist.
- 3-MCPD, 3-MCPD-Fettsäureester und Glycidyl-Fettsäureester | Geltendes Recht | EU | Stand: Höchstgehalte für 3-MCPD und Glycidylester gelten seit August für fetthaltige Lebensmittel | Quelle: Verordnung (EU) 2026/1825, 30.07.2026
- Nickel in Getreide, Schalenfrüchten und Ölsaaten | Geltendes Recht | EU | Stand: Nickel-Höchstgehalte für Getreide, Hafer und Nüsse gelten seit Juli 2026 | Quelle: Verordnung (EU) 2024/1987, 31.07.2024
- Reinheitsspezifikationen für Hydrokolloide (E 410, E 412, E 414, E 415, E 440, E 1450) | Geltendes Recht | EU | Stand: Neue Reinheits- und Keimzahlvorgaben für Johannisbrotkernmehl, Guar, Xanthan und Pektin | Quelle: Verordnung (EU) 2026/196, 29.01.2026
- Acrylamid | Rechtsakt in Arbeit | EU | Stand: Kommission bereitet erste verbindliche Acrylamid-Höchstgehalte vor, Konsultation im September | Quelle: Ständiger Ausschuss PAFF, Summary Report vom 19.06.2026, 19.06.2026
- Chinolizidinalkaloide in Lupinen | Rechtsakt in Arbeit | EU | Stand: EU empfiehlt Überwachung von Chinolizidinalkaloiden in Lupinen-Backwaren, Meldepflicht an EFSA | Quelle: Empfehlung (EU) 2026/1241, 15.06.2026
- Distickstoffmonoxid (Lachgas) (E 942) | Rechtsakt in Arbeit | EU | Stand: Lachgas (E 942) als reproduktionstoxisch eingestuft, EFSA bewertet Zusatzstoff vorrangig neu | Quelle: EFSA, Protokoll der 65. FAF-Plenarsitzung, 26.03.2026
- MOAH — aromatische Mineralölkohlenwasserstoffe | Rechtsakt in Arbeit | EU | Stand: MOAH-Höchstgehalte im EU-Ausschuss beschlossen, Vollzug läuft schon vor dem Amtsblatt | Quelle: Ständiger Ausschuss PAFF, Summary Report vom 13.05.2026, 13.05.2026
- Cadmium | Behördliche Bewertung | DE | Stand: BfR: Getreideprodukte liefern 40 bis 50 Prozent der Cadmiumaufnahme | Quelle: BfR, Stellungnahme 030/2026, 29.05.2026
- Dioxine und dioxinähnliche PCB | Behördliche Bewertung | EU | Stand: EFSA senkt tolerierbare Wochendosis für Dioxine auf weniger als ein Drittel | Quelle: EFSA Journal 24(6):e10103, 10.06.2026
- Glycerin (Glycerol) (E 422) | Behördliche Bewertung | EU | Stand: EFSA leitet akute Referenzdosis für Glycerin ab, Backwaren nicht adressiert | Quelle: EFSA Journal 24(5):e10057, 05.05.2026
- Sucralose (E 955) | Behördliche Bewertung | EU | Stand: EFSA bestätigt Sucralose-ADI, Ausweitung auf feine Backwaren bleibt offen | Quelle: EFSA Journal 24(2):e9854, 17.02.2026
- Thebain und Oripavin in Mohnsamen | Behördliche Bewertung | EU | Stand: EFSA bewertet Thebain und Oripavin in Mohnsamen, bisher nicht limitiert | Quelle: EFSA, Protokoll der 161. CONTAM-Plenarsitzung, 18.06.2026
- Allurarot AC und Tartrazin (E 129, E 102) | Öffentliche Kritik | AT | Stand: VKI beanstandet fehlenden Warnhinweis, Hersteller ersetzt Azofarbstoffe binnen neun Wochen | Quelle: VKI / KONSUMENT.AT, Lebensmittel-Check und Nachkontrolle, 28.07.2026
- Zusatzstoffe und Enzyme in Tiefkühl-Teiglingen | Öffentliche Kritik | AT | Stand: Greenpeace kritisiert Zusatzstoffe und nicht deklarierte Enzyme in Supermarkt-Backboxen | Quelle: Greenpeace Österreich, Marktcheck Backboxen, 23.03.2026
- 2-Chlorethanol | AUSGERÄUMT (Entwarnung) | DE | Stand: BfR stuft 2-Chlorethanol nicht mehr als erbgutschädigend ein, Referenzwerte abgeleitet | Quelle: BfR, Stellungnahme 017/2026, 27.02.2026

AUFGABE
Finde amtliche Vorgänge in diesem Zeitraum, die Rohstoffe, Zusatzstoffe, Kontaminanten
oder Produkte industrieller Feinbackwaren betreffen. Drei Typen:

RISIKO     Ein benennbarer Stoff steht unter Druck — Neubewertung, Höchstgehalt, Verbot,
           öffentliche Kritik.
ZULASSUNG  Ein Stoff, Enzym, Aroma oder Novel Food wird zugelassen oder ist im Verfahren.
           Das ist eine Chance: Was kann Ölz damit tun, was vorher nicht ging?
INDIREKT   Ein Rechtsakt ohne benennbaren Stoff oder ohne Ölz-Kategorie, der Ölz trotzdem
           treffen könnte — Zuckersteuer, Kennzeichnung, Werbebeschränkung, Präzedenzfall.
           Nur mit einem Satz, warum. Fehlt der Satz, ist es kein Eintrag.

Lieber weiter als enger: Was heute eine Nachbarkategorie trifft (Limonaden, Süßwaren,
Snacks), kann morgen Feingebäck treffen. Aber jeder Fund braucht einen Beleg bei der
Behörde selbst.

QUELLEN — nur amtliche Primärquellen: EFSA (Veröffentlichungen, Konsultationen,
Plenarprotokolle), EU-Kommission (PAFF-Ausschuss, Have Your Say), EUR-Lex/Amtsblatt,
BfR, AGES, BLV, nationale Parlamente. Fachpresse darf den Weg zeigen, zählt aber nicht als
Beleg. Für Stufe "Öffentliche Kritik" sind NGO und Verbraucherschutz die Quelle.

STUFE (nur RISIKO) — genau einer dieser Schlüssel:
kritik               Medien, NGO, Öffentlichkeit — keine Behörde beteiligt
bewertung            Eine Behörde prüft oder empfiehlt; noch kein Recht
rechtsakt_in_arbeit  Entwurf, Konsultation, Ausschussvotum — beschlossen, nicht in Kraft
geltendes_recht      In Kraft, mit Frist oder Höchstmenge

BEHÖRDE — genau einer: efsa | eu_kommission | national | keine

GELTUNGSBEREICH — genau einer: EU | DE | AT | CH
Deutschland ist der Frühindikator für Österreich: Eine BfR-Bewertung ist ein Signal für
AT, auch ohne österreichischen Vorgang.

AUSGABEFORMAT
Für jeden Fund genau diesen Block:

## EINTRAG
TYP: RISIKO | ZULASSUNG | INDIREKT
KURZZEILE: Sieben bis elf Wörter — was passiert gerade. Muss ohne den Rest verständlich
  sein. Gut: "EFSA leitet akute Referenzdosis für Glycerin ab, Backwaren nicht adressiert".
  Schlecht: "Neue Entwicklung bei Glycerin".
STOFF: Name des Stoffs, bei INDIREKT leer erlaubt
E_NUMMER: falls es eine gibt, sonst leer
STUFE: (nur RISIKO) einer der vier Schlüssel
BEHÖRDE: efsa | eu_kommission | national | keine
GELTUNGSBEREICH: EU | DE | AT | CH
SACHVERHALT: Zwei bis vier Sätze. Nur was in der Quelle steht. Zahlen, Fristen und
  Höchstgehalte wörtlich aus der Quelle. Liegt der Anlass außerhalb der Backwaren, hier
  benennen.
WARUM_OELZ: (nur INDIREKT) ein Satz, Pflicht
KATEGORIEN: (RISIKO, ZULASSUNG) eine bis fünf der Ölz-Kategorien, kommagetrennt, exakte
  Schreibweise. Bei ZULASSUNG: wo Ölz den Stoff einsetzen könnte.
HANDLUNG: (nur RISIKO) beobachten | pruefen | ersetzen
QUELLE: Name der Behörde und des Dokuments, z. B. "EFSA Journal 24(5):e10057",
  "Verordnung (EU) 2026/1825", "BfR, Stellungnahme 030/2026"
URL: vollständig, amtlich, tatsächlich aufgerufen
DATUM: YYYY-MM-DD — Datum des Dokuments, nicht des Abrufs

Am Ende: ## ENDE — N Einträge

REGELN
- Erfinde keine Zahlen, Fristen, Höchstgehalte, Aktenzeichen oder URLs. Was du nicht
  bei der Behörde belegen kannst, lässt du weg.
- Jede URL muss du tatsächlich aufgerufen haben; keine geratenen oder konstruierten Links.
- Höchstens zwölf Einträge. Bei der ersten Befüllung (ab 01.01.2026) höchstens zwanzig.
- Findest du nichts Belastbares, schreib das hin. Ein leerer Bericht ist brauchbar, ein
  aufgefüllter nicht.
- Deutsch, auch wenn die Quellen englisch sind; Fachbegriffe und Aktenzeichen bleiben.
- Der Bericht besteht ausschließlich aus den EINTRAG-Blöcken und der Endzeile.
```

---

## Danach: Import

Der Bericht liegt in `research/JJJJ-MM/regulatorik.md` (gitignored). Daraus entsteht die
Importdatei; sie wird unter `/admin/unter-beobachtung/import` eingefügt und legt
**Entwürfe** an. Veröffentlicht wird erst nach Prüfung gegen die Primärquelle — jeder
Eintrag, entweder einzeln oder mit „Alle vollständigen veröffentlichen".

Das erwartete JSON — Feldnamen sind die Spaltennamen der Tabelle:

```json
{
  "period": "Januar bis September 2026",
  "entries": [
    {
      "kind": "risiko",
      "teaser": "EFSA leitet akute Referenzdosis für Glycerin ab, Backwaren nicht adressiert",
      "substance": "Glycerin (Glycerol)",
      "e_number": "E 422",
      "stage": "bewertung",
      "authority": "efsa",
      "scope": "EU",
      "situation": "…",
      "product_categories": ["Croissant & Plunder", "Süßes Gebäck"],
      "action": "pruefen",
      "source_name": "EFSA Journal 24(5):e10057",
      "source_url": "https://www.efsa.europa.eu/en/efsajournal/pub/10057",
      "source_date": "2026-05-20"
    },
    {
      "kind": "zulassung",
      "teaser": "…",
      "substance": "…",
      "authority": "efsa",
      "scope": "EU",
      "situation": "…",
      "product_categories": ["Toast & Sandwich"],
      "source_name": "…", "source_url": "…", "source_date": "2026-03-04"
    },
    {
      "kind": "indirekt",
      "teaser": "…",
      "authority": "national",
      "scope": "AT",
      "situation": "…",
      "why_relevant": "…",
      "source_name": "…", "source_url": "…", "source_date": "2026-06-11"
    }
  ]
}
```

`kind` und `teaser` sind Pflicht, alles andere darf fehlen — der Entwurf zeigt dann in
der Admin-Liste, was zum Veröffentlichen noch fehlt. Ungültige Schlüssel (Stufe, Behörde,
Handlung) werden verworfen, unbekannte Kategorien benannt. Dubletten über Quelle **und**
Stoff werden übersprungen: Ein EFSA-Protokoll trägt mehrere Fälle unter einer URL.

Wenn die Liste „BEREITS ERFASST" gepflegt ist, kommen Wiederfunde selten; die
Dublettenprüfung ist das zweite Netz.

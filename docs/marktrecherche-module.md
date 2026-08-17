# Marktrecherche: Was Market-Intelligence-Plattformen anbieten — und welche Module Ölz nützen

Stand: 17.08.2026 · Recherche gegen Primärquellen (Produkt-, Feature-, Doku- und Preisseiten der Anbieter, Behörden- und Registerseiten, robots.txt/AGB der Shops). Belegte Fakten sind mit Quelle markiert; alles, was Bewertung ist, steht ausdrücklich als **Einschätzung**. Angaben, die nur aus Such-Snippets stammen, sind mit *[Snippet]* gekennzeichnet.

## 1. Fragestellung

Unabhängig von den heutigen Platzhaltern in der App: Welche Module bieten etablierte Market- und Competitive-Intelligence-Plattformen an, was davon wäre für einen Markenhersteller von Backwaren im LEH in AT/CZ/SK/SI (Ölz) nützlich, und in welcher Reihenfolge?

Bestand in der App: Wettbewerbsradar · Produkt- & Innovationsradar · Rohstoff-Radar · Food Radar (foodRegio-Nachbau) · Ad-hoc Studien. Platzhalter „coming soon": Retailer-Radar · Packaging- & Claim-Radar · Länder- & CEE-Radar · Management-Snapshot · Social Listening Radar.

## 2. Vorgehen und Quellenlage

Vier Teilrecherchen, jeweils gegen Anbieter- bzw. Behördenseiten (WebFetch/curl; wo Bot-Schutz griff, per Browser; CAPTCHAs wurden nicht umgangen):

1. CI-Generalisten (Crayon, Klue, Kompyte, Contify, AlphaSense, Similarweb, Meltwater) und Food/FMCG-Datenanbieter (Mintel, Innova, NielsenIQ, Circana, Worldpanel/Kantar, Euromonitor, Spoonshot, Tastewise, Ai Palette, Trendtracker) — 78 URLs.
2. Social-/Media-Intelligence und Kuratierungsplattformen (Brandwatch, Talkwalker, Valona, Comintelli, Feedly, Onclusive/Digimind, Owler, Craft) — 33 URLs.
3. Öffentliche Datenquellen: Rückrufe/Regulatorik (RASFF, lebensmittelwarnung.de, AGES, SZPI, ŠVPS, GOV.SI, EUR-Lex, EFSA), Patente/Marken (EPO OPS, EUIPO/TMview, DPMA, ÖPA, WIPO), Web-Change-Werkzeuge, Ausschreibungen (TED), Firmendaten/Bilanzen (AT/CZ/SK/SI/DE, North Data), Werbebibliotheken (Google/Meta/TikTok), Open Food Facts — 54 URLs.
4. Trend/Foresight (ITONICS, TrendOne, Trendwatching, FIBRES, Trend Hunter, Springwise, WGSN, foodRegio), Preis-/Regal-Monitoring (Prisync, Competera, Wiser, Flywheel, Trax, XPLN, Idealo/Geizhals), **die Onlineshops der LEH-Ketten in AT/CZ/SK/SI** und Prospekt-Aggregatoren — 53 URL-Gruppen.

Nicht erreichbar oder nicht auswertbar (nichts geraten): Spoonshot (TLS abgelaufen), Trend Hunter (403, „don't scrape"), Springwise-Pricing (403), INTERSPAR-Shop und Kaufland.cz (Cloudflare-Prüfung), Kantar-Worldpanel-Seiten (404, firmiert jetzt „Worldpanel by Numerator"), Digimind (301 auf Onclusive), Byzzer (Login-Maske), diverse Hilfeseiten (EUIPO, Espacenet, EUR-Lex). Öffentliche Preise gab es nur bei einer Minderheit — sie sind unten jeweils genannt.

## 3. Was Plattformen anbieten — nach Anbieter (kompakt, belegt)

### 3.1 CI-Generalisten (B2B-Herkunft)

| Anbieter | Kernmodule (was sie tun) | Preis/Zugang |
|---|---|---|
| **Crayon** | Aggregate (Website-Änderungen before/after, Preis-Updates, News, Reviews; Import aus Sales-Calls; täglicher Digest) · Organize (Tags, Saved Searches, Sparks) · Crayon AI (Importance Score, 80+ Unterkategorien, Zusammenfassungen, MCP) · Battlecards · Measure (Win/Loss). crayon.co/product/aggregate, /crayon-ai, /measure | nicht öffentlich |
| **Klue** | Compete Agent (Research Analyst, Deal Assistant) · Auto Insights (Objection Handling, Talk Tracks, Pricing & Packaging, Recent News 30 T.) · Ask Klue in Slack/Salesforce · Win-Loss Suite (AI Interviewer). klue.com/compete-agent, /win-loss | nicht öffentlich |
| **Kompyte** (Semrush) | Competitor Tracking (Websites, Reviews, Social, Ads, **Job-Postings**) · AI Daily Summaries · Battlecards · Listening Alerts (25/100/200 Keywords, 50–150 URLs je Firma). kompyte.com/plans | Struktur öffentlich (10/20/∞ Firmen), Beträge nicht |
| **Contify** | Newsfeeds aus „1 Mn+ vetted sources", 117+ Sprachen · **Business-Event-Taxonomie** (Führungswechsel, Funding, M&A, Website-/Positionierungsänderung, Events) · Dashboards · Battlecards · Alerts/Newsletter · Athena AI · News-API. contify.com/platform/ | nicht öffentlich |
| **AlphaSense** | 500 Mio.+ Dokumente (Filings, Broker-Research, Expert-Transkripte 280.000+) · Generative Search · Deep Research · Monitoring/Agents · interne Drives. alpha-sense.com/platform/ | nicht öffentlich (Enterprise) |
| **Similarweb** | Web-Traffic/Engagement/Kanäle je Domain · Demand Analysis (Suchtrends) · SEO/Ads · Gen-AI-Sichtbarkeit · Shopper Intelligence (Amazon/US-lastig). similarweb.com/pricing/ | **öffentlich**: 125–542 USD/Monat (1 User, jährlich) |
| **Meltwater** | Media Monitoring (200 Mio.+ Online, 400.000+ Print, Broadcast, Podcasts, Social, LLM-Antworten) · Real-time Alerting (Spike vs. Baseline, 2–5 min) · Consumer Insights · Explore+ (24+ Monate) · Newsletter · MCP. meltwater.com/en/products/… | Pläne benannt, Beträge nicht; 12 Monate Mindestlaufzeit |

### 3.2 Social-/Media-Intelligence und Kuratierungsplattformen

| Anbieter | Kernmodule | Preis/Zugang |
|---|---|---|
| **Brandwatch** | Consumer Research (1,2 Bio. Dokumente, Historie ab 2008, 44 Sprachen) · Sentiment/Topics/Entities/Demografie · Regeln/Tags · Alerts & Signals (Peaks) · Dashboards/Reports · Bildanalyse (Logos) · Iris AI. brandwatch.com/products/consumer-research/features/ | nicht öffentlich |
| **Talkwalker** (Hootsuite) | Social Listening (150 Mio. Quellen, 187 Sprachen, 5 J.) · Media Monitoring · Benchmarking · Blue Silk AI (Emotionen, 40.000+ Logos, Forecast) · Alerts. talkwalker.com/pricing | Tiers, nur Angebot |
| **Valona** (ex M-Brain/Cipher) | 200.000+ kuratierte Quellen inkl. Paywall-Fachmedien · **Wettbewerberprofile mit validierten Finanzdaten (auch private Firmen)** · VAL (KI-Analyst) · Alerts/Newsletter · Foresight-Radare · MCP-Server. valonaintelligence.com/market-intelligence-software | nicht öffentlich |
| **Comintelli** Intelligence2day | 250.000+ Quellen · Taxonomie + KI-Klassifikation · Alerts/Newsletter, Report-Templates, Redaktions-Workflow · FIRE (Fotos vom POS → Einträge). comintelli.com/platform-intelligence2day/ | Kern + pro Nutzer + Add-ons, Beträge nicht |
| **Feedly** Market Intelligence | AI Feeds aus 10.000+ Modellen (Product Launches, Partnerships, Funding, New Deals, Market Share …) · Insights Cards · Emerging-Trends-Dashboard · AI Overviews (executive-Abschnitte) · Newsletter ohne Seat. feedly.com/market-intelligence/pricing | **öffentlich**: 1.600 / 2.400 USD pro Monat |
| **Onclusive** (ex Digimind) | Social Listening (25+ Plattformen, 24 Monate) · AI Sense · Sentinel (Sentiment-Alerts) · Media Monitoring (3 Mio.+ Online, Print, Broadcast) · Analytics (Share of Voice) · AI Brand Visibility. onclusive.com/products/… | nicht öffentlich |
| **Owler** (Meltwater) | Firmenprofile (20 Mio.+, community-basiert) · Competitive Graph · Daily Snapshot (E-Mail) · Instant Insights (20+ Event-Typen). owler.com/checkout/owlerpro | **öffentlich**: 0 / 39 USD pro Monat |
| **Craft** | Supplier-Risk: Data Fabric (250.000+ Attribute), Profile, **Craft Protect (40+ Risiko-Alert-Typen nach Commodity/Standort/Keyword)**, AI Risk Assessments, N-Tier-Mapping. global.craft.co/platform/ | nicht öffentlich |

### 3.3 Food-/FMCG-Datenanbieter (Lizenzdaten)

| Anbieter | Kernmodule | Preis/Zugang |
|---|---|---|
| **Mintel GNPD** | Launch-Datenbank: 45.000+ Launches/Monat, 86 Länder, 290 Unterkategorien, 175 Claims, 200 Verpackungsattribute, 47.000+ Zutaten · Landscapes (Attribut-Trends mit 2-J.-Prognose) · Leap (KI) · Dragonfly (Pack-Aufmerksamkeit). mintel.com/products/mintel-gnpd/ | nicht öffentlich; Einzelreports „individually priced" |
| **Innova** | New Products DB (600.000+ Records/Jahr, 300 Unterkategorien, 250+ Claims, 1.500+ Nährwertpunkte) · Consumer DB · Market Sizing · Genius-Dashboards (Ingredient/Flavor mit Prognose) · SprintAI. innovamarketinsights.com/platform/databases/ | nicht öffentlich |
| **NielsenIQ** | **RMS** (POS-Scanning ~900.000 Stores, monatlich: Marktanteil, Preis, Distribution %ACV/TDP, Velocity, Promo-Effekt) · Consumer Panel/Homescan · Product Insight (Attribute × Absatz) · BASES · Byzzer (KMU, nur US). nielseniq.com/global/en/products/retail-measurement-services-rms/ | nicht öffentlich |
| **Circana** (ex IRI) | Unify+ (BI mit Data Alerts + Performance-Narrativen) · Complete Market (POS) · Complete Consumer (Panel) · Liquid Data Go (KMU-Portal). circana.com/solutions/unify-plus | nicht öffentlich; belegt US-Datenbasis |
| **Worldpanel by Numerator** (ex Kantar) | Purchase Panel (Penetration, Loyalität, Wiederkauf, Switcher, Preissensitivität) · Usage Panel · Out-of-Home · PanelVoice. worldpanelbynumerator.com/panels/purchase-panel | nicht öffentlich; **Länderliste AT/CZ/SK/SI nicht belegt** |
| **Euromonitor Passport** | Marktgrößen/-anteile, Marken-/Firmendaten, Prognosen; **Baked Goods** (Bread, Cakes, Pastries, Frozen …) je Land · Passport AI · API. euromonitor.com/baked-goods-in-austria/report | Abo nicht öffentlich; **Einzelreport „Baked Goods in Austria" EUR 1.125** |
| **Tastewise** | Trends Agent (Lifecycle emerging→fading mit „Runway", 39+ Märkte) · Launch Tracker (**derzeit nur USA**) · TasteGPT · Concept Testing. tastewise.io/agentic-ai/trends-agent | nicht öffentlich |
| **Ai Palette** | Foresight Engine (Trend-Reife je Kategorie, Prognose) · Concept Genie · Screen Winner · Arya (30+ Märkte). aipalette.com/platform/foresight-engine/ | nicht öffentlich |
| **Trendtracker** | 20.000+ Quellen (Papers, Patente, Startups, News) · 6.000+ Trends · automatischer Radar mit Trend Strength Index. trendtracker.ai/platform/features/trend-radar | Pläne, Beträge nicht |
| **Spoonshot** | *nicht erreichbar* — Module nur *[Snippet]* | — |

### 3.4 Trend/Foresight-Werkzeuge

| Anbieter | Kernmodule | Preis/Zugang |
|---|---|---|
| **ITONICS** | Radar (Bewertung, „Speed of Change") · Insights/Signals (Publikationen, Patente, News, RSS; AI-Add-on) · Scouting · Roadmap · REST API. itonics-innovation.com/pricing | Core/Pro/Enterprise, keine Preise |
| **TrendOne** | Explorer (60.000+ Micro-Trends, ~250 neue/Monat, **Search Agents mit Benachrichtigung**) · Trend Radar (Act/Prepare/Watch, unbegrenzte Bewerter) · Strategizer. trendone.com/en/platform | **öffentlich**: 5.880 / 11.880 / 13.880 EUR pro Jahr (je 5 Lizenzen) |
| **FIBRES** | Trend-DB · Horizon Scanning (eigene RSS/Websites, FIBRESEED) · Radar Builder · Trend Network · Foresight Agents. fibresonline.com/pricing | **öffentlich**: 6.900 EUR/Jahr (10 Nutzer), Enterprise 19.800; Add-ons 2.800–4.800 |
| **WGSN Food & Drink** | 200+ F&D-Prognosen (2/5/10 J.) · TrendCurve · Trade-Show-Coverage · The Feed · Shelf-Daten (300 Mio.+ SKUs täglich, 200+ Händler). wgsn.com/en/products/food-drink | nur Demo |
| **Trendwatching** | Innovations-DB (32.000+), Reports, AI-Playbooks. trendwatching.com | **öffentlich**: 990 USD/Jahr; Enterprise 625 USD/Monat |
| **Springwise** | ~50 verifizierte Innovationen/Woche, Alerts, Scout AI, SDG-Tagging. springwise.com | Pricing 403 |
| **Trend Hunter** | *403* — nur *[Snippet]*: PRO 199 USD/Monat/Nutzer | — |
| **foodRegio** | FUTURE FOOD Radar, FOOD AI Radar (>200 Signale); Pipeline täglich >300 kuratierte Quellen inkl. Patentanmeldungen; Vollzugang für Mitglieder. foodregio.de/de/trendradar | Mitgliedschaft |

### 3.5 Preis-/Sortiments-/Regal-Monitoring

| Anbieter | Kernmodule | Preis/Zugang |
|---|---|---|
| **XPLN** (DE) | Gatekeeper (Preis/Rabatt/MAP, Alerts) · **Benchmarker (Sortimentsvergleich: Zu-/Abgänge, Ersetzungen, Bestseller, Exklusivartikel)** · Pure Data (Matching, DE-Hosting). xpln.com/solutions/benchmarker | nicht öffentlich |
| **Prisync** | URL-basiertes Preistracking 3×/Tag, Verfügbarkeit, Alerts, Historie, API. prisync.com/pricing/ | **öffentlich**: 99/199/399 USD pro Monat (100/1.000/5.000 Produkte) |
| **Wiser** | Digital Shelf (Preis & Promo, Verfügbarkeit/Listungen/Launch-Timing, Reviews, Preislagen, Alerts). wiser.com/products/market-intelligence/ | nicht öffentlich; E-Com-Marktplätze |
| **Flywheel** (ex Edge/Ascential) | Digital Shelf, Market Share (Item-Level wöchentlich), Retail Insights, Retail Media. flywheeldigital.com/market-intelligence | nicht öffentlich; keine europ. Grocer genannt |
| **Trax** | Regal-Bilderkennung (OSA, Share of Shelf, Preis-/Planogramm-Compliance, Wettbewerber-SKUs). traxretail.com/solutions/ | nicht öffentlich; AT/CEE nicht belegt |
| **Competera** | Matching/Scraping, Pricing Platform, Promo — für Händler gebaut. competera.ai | nicht öffentlich |
| **Idealo PWS / Geizhals** | reine Händler-API bzw. keine Lebensmittel — **irrelevant**. idealo.github.io/partner-web-service/docs/v2 | — |

### 3.6 Öffentliche Datenquellen (kostenlos), die die Plattformen intern nutzen

| Bereich | Quelle | Was sie liefert · Zugang |
|---|---|---|
| Rückrufe DE | lebensmittelwarnung.de | Produkt, Hersteller, Charge, Grund, Bundesland · **RSS gesamt/je Land/je Produktgruppe** |
| Rückrufe AT | AGES Produktwarnungen | Produkt, Firma, Grund · App + Newsletter, **kein RSS** (Scraping nötig) |
| Rückrufe CZ | SZPI „Potraviny na pranýři" | beanstandete Lebensmittel **mit Klarnamen** von Hersteller/Verkäufer, Foto · **RSS** (potravinynapranyri.cz/Rss.aspx) |
| Rückrufe SK / SI | ŠVPS (WordPress-Feed) / GOV.SI Zbirke | Produkt, Verkäufer, Befund · Feed bzw. E-Mail-Abo |
| Rückrufe EU | RASFF Window | Gefahr, Kategorie, Länder — **ohne Marken/Firmen** · Web, kein offizielles API |
| Recht | EUR-Lex (Such-RSS nach EU-Login), EFSA-RSS, Health-Claims-Register (FIP), Novel-Food-Katalog | Feeds kostenlos |
| Marken | EUIPO eSearch plus / TMview | Monitor-/Watch-Alerts, **kostenlose API** (dev.euipo.europa.eu); DPMAkurier (E-Mail); ÖPA see.ip; WIPO (Automatisierung untersagt) |
| Patente | Espacenet / EPO OPS | Klasse **A21D** (Teig/Backen/Backwaren); OPS-API kostenlos (Fair Use 4 GB/Woche) |
| Ausschreibungen | TED | CPV **15810000** (Brot, Feinbackwaren) · RSS nach Land/CPV, anonymes API, Bulk-XML |
| Bilanzen | Firmenbuch AT (Urkunde 1,52 €) · or.justice.cz (kostenlos, Open Data) · **registeruz.sk (kostenloses JSON-API)** · AJPES SI (5 J. kostenlos) · Unternehmensregister DE · North Data (49 €/Monat, API ab 500 €/Monat) | |
| Werbung | **Meta Ad Library API** (EU-Ads 1 J., Reichweite nach Land/Alter/Geschlecht, kostenlos nach ID-Verifikation) · Google Ads Transparency (Web) · TikTok CCL (Antrag) | |
| Web-Änderungen | changedetection.io (Open Source / 8,99 USD pro Monat), Visualping, Distill | |
| Produktdaten | Open Food Facts (AT 22.460, CZ 20.138 Produkte; tägliche Delta-Exporte) | ODbL, lückenhaft |
| Handelsaktionen | **marktguru.at** (strukturierte Aktionen aller AT-Ketten, z. B. Ölz Weißbrot 2,99 statt 3,99 bei Lidl) · **kupi.cz** (Pečivo, z. B. Ölz Sandwich Soft 49,90 Kč) · kimbino.sk (Prospekte) · ceneje.si (Kataloge) | keine APIs; interne Endpunkte per robots gesperrt |
| LEH-Onlineshops | siehe 3.7 | |

### 3.7 Onlineshops der LEH-Ketten in AT/CZ/SK/SI — geprüft am 17.08.2026

| Shop | Backwaren mit Preisen? | Zugang / rechtlicher Befund |
|---|---|---|
| **shop.billa.at** | **ja** — Kategorie Brot & Gebäck, Preis + Grundpreis, Marken (Ölz Super Soft Sandwich), Aktionen | frei abrufbar; **billa.at/agb § 6: Speicherung in Datenbanken/Vervielfältigung nur mit schriftlicher Zustimmung** |
| **hofer.at** | **ja** — Dauersortiment mit Preisen (Ölz Schulmaus 3,39 €, American Sandwich 1,80 €, Aktionen mit Vorher-Preis) | nur per Browser (curl 403 Akamai) |
| **lidl.at** | nur **Aktionsartikel** (Ölz Weißbrot 750 g 3,99 → 2,99, 17.–19.08.) | frei |
| **penny.at** | Angebote mit Preisen (Ölz Butter-/Mehrkorntoast 2,79 €); Vollpreise nicht durchgängig | frei |
| interspar.at | **nicht prüfbar** — Cloudflare-Turnstile | — |
| **rohlik.cz** | **ja** — Pečivo (Chléb, slané, sladké), Penam, Eigenmarken | frei; robots erlaubt GPTBot/ClaudeBot ausdrücklich |
| **kosik.cz** | **ja** — Pekárna (Penam Toust 39,90 Kč, DELTA Toast Tip 29,90 Kč, Rabatt-% + Gültigkeit) | frei |
| albert.cz | **nein** — Albert Online zum 23.12.2025 eingestellt | — |
| kaufland.cz | **nicht prüfbar** — Cloudflare | — |
| **potravinydomov.itesco.sk** | **ja** — Pekáreň 400 Artikel, Preis + €/kg, Clubcard-Aktionen | nur per Browser (403 Akamai); Sitemaps für Produkte + Promotions |
| **mercatoronline.si** | **ja** — TOAST 39 Artikel: Toast Ölz 500 g 2,99 €, Super mehek sendvič Ölz 750 g 4,39 €, Žito, Eigenmarke 1,19 € | robots erlaubt alles; Pogoji ohne Bot-Klausel |

**Einschätzung:** Ohne Lizenzkosten belastbar sind BILLA (AT), HOFER (AT, per Browser), Rohlik und Košík (CZ), Tesco (SK, per Browser), Mercator (SI) — jeweils mit Toast-/Brot-Kategorien, Marken- und Eigenmarkenpreisen und Aktionskennzeichnung. Der einzige harte rechtliche Vorbehalt ist die BILLA-AGB; dafür braucht es eine Freigabe oder man beschränkt sich dort auf marktguru.at.

## 4. Was alle gemeinsam haben — und was das für unsere Plattform heißt

Über alle Anbieter hinweg (Beleg: die Feature-Seiten in 3.1–3.4) wiederholen sich sieben Bausteine:

1. **Ereigniskatalog** als Rückgrat: Contify (Business Events), Owler (20+ Event-Typen), Feedly (AI Models: Launch, Partnership, Funding, New Deals), Valona (Launches, Führungswechsel, Patente), Craft (40+ Risk-Alerts). Kein Anbieter sammelt „News" — alle sammeln **getaggte Ereignisse je Wettbewerber**.
2. **Alerts mit Auslöser** — Peak/Spike gegen Baseline (Meltwater, Brandwatch, Talkwalker), Ereigniseintritt (Owler, Contify), Schwellwert (Craft).
3. **Digest/Newsletter als Verteilkanal** an Empfänger ohne Login (Feedly, Owler Daily Snapshot, Meltwater, Comintelli, Valona).
4. **Taxonomie + Auto-Klassifikation** (Comintelli, Brandwatch Rules, Crayon 80+ Unterkategorien).
5. **KI-Schicht** mit Namen (Iris, Blue Silk, VAL, Telli, Athena, Feedly AI, Passport AI, SprintAI): Zusammenfassung, natürlichsprachige Abfrage über den eigenen Bestand, executive-taugliche Abschnitte.
6. **Export/Embedding** (PPT/PDF/Power BI) und seit 2025 **MCP-Server** (Valona, Crayon, Meltwater, Similarweb, Tastewise).
7. **Field Intelligence**: E-Mail/Teams/Foto-Eingang aus dem Vertrieb (Comintelli FIRE, Klue, Crayon).

**Einschätzung:** Die Ölz-App hat 1 (teilweise, per Modul), 4 (Kategorien/Themen) und Ansätze von 3 (Neu-Zähler). Es fehlen ein expliziter Ereigniskatalog über Module hinweg, ein Digest ohne Login und Field Intelligence aus dem Ölz-Vertrieb. Das sind keine neuen Module, sondern Querschnitt — und billiger als jedes Modul.

## 5. Modul-Kandidaten (Cluster)

Je Kandidat: was · Daten (frei/lizenz) · wer bei Ölz · Aufwand (manuell / halbautomatisch / automatisch) · Belege.

**K1 — Retailer-Radar: Online-Regal + Aktionen.** Listungen, Eigenmarken, Preisabstände und Promotions je Kette, monatlich (Aktionen wöchentlich). Daten frei: BILLA, HOFER, Rohlik, Košík, Tesco SK, Mercator (3.7) + marktguru.at, kupi.cz (3.6). Nutzer: Vertrieb/KAM, Marketing, GF. Aufwand: halbautomatisch (Abruf je Shop, Matching der Ölz-/Wettbewerber-SKUs; HOFER/Tesco per Browser-Automation; BILLA nur mit Freigabe). Vorbild: XPLN Benchmarker, Wiser Digital Shelf.

**K2 — Rückruf- & Regulatorik-Radar.** Warnungen/Rückrufe DE/AT/CZ/SK/SI mit Klarnamen (außer RASFF), dazu EU-Rechtsänderungen (EUR-Lex-Such-RSS, EFSA, Health-Claims/Novel-Food). Daten frei, meist RSS. Nutzer: QM/Produktentwicklung, GF, Marketing (Claims). Aufwand: automatisch, redaktionell nur beim Einordnen. Vorbild: Feedly „Risk & Regulatory"-Template, Craft Protect.

**K3 — Marken- & Patent-Frühwarnung.** Neue Markenanmeldungen der Wettbewerber (Nizza-Klasse 30) via EUIPO-API/TMview + DPMAkurier; Patente in A21D via EPO OPS. Daten frei (APIs kostenlos). Nutzer: Marketing, Produktentwicklung, Recht. Aufwand: automatisch. Vorbild: Valona (Patente als Ereignis), ITONICS/foodRegio (Patente als Signalquelle).

**K4 — Kampagnen-Radar.** Wettbewerber-Werbung mit EU-Reichweite/Zielgruppen aus der Meta Ad Library API, Google Ads Transparency (Web), TikTok CCL; Handelswerbung aus Prospekt-Aggregatoren. Daten frei. Nutzer: Marketing. Aufwand: halbautomatisch. Vorbild: Kompyte (Ads), Similarweb Ads Intel.

**K5 — Wettbewerber-Ereignisse & Bilanzen (Upgrade des Wettbewerbsradars).** Ereigniskatalog (Launch, Listung, Führungswechsel, Investition/Werk, M&A, Ausschreibungsgewinn, Rückruf, Kampagne, Stellenanzeige, Website-Änderung, Bilanz) je Wettbewerber; Bilanzen aus Firmenbuch AT (Cent-Beträge), justice.cz (kostenlos), registeruz.sk (API), AJPES, Unternehmensregister; Website-Änderungen via changedetection.io; TED CPV 15810000. Nutzer: GF, Vertrieb. Aufwand: gemischt. Vorbild: Contify, Owler, Valona-Profile, Crayon Aggregate.

**K6 — Management-Digest.** Monatlicher (oder wöchentlicher) Auszug „neu seit dem letzten Lauf" über alle Module, per E-Mail an Empfänger ohne Login, mit 3–5 KI-Sätzen je Modul und Links. Daten: die eigenen Signale. Nutzer: GF, Bereichsleiter. Aufwand: gering, automatisch. Vorbild: Feedly AI Overviews, Owler Daily Snapshot, Meltwater Newsletter.

**K7 — Field Intelligence (Eingang aus dem Vertrieb).** Foto/Notiz vom Regal per E-Mail oder Formular → wird zum Signal (Listung gesehen, Aktion, Zweitplatzierung). Daten: eigene. Nutzer: Außendienst/KAM als Lieferant, alle als Leser. Aufwand: gering. Vorbild: Comintelli FIRE, Klue/Crayon Field Intel.

**K8 — Marktanteile & Distribution (Lizenz).** POS-Scanner-Daten (Marktanteil, Preis, Distribution, Promo) für Toast/Brot/Gebäck AT/CZ/SK/SI. Daten: NielsenIQ RMS (Preis nicht öffentlich; Circana in Europa nicht belegt). Nutzer: GF, Vertrieb, Marketing. Aufwand: Vertrag + Import.

**K9 — Launch-Datenbank (Lizenz).** Systematische Wettbewerber-Launches mit Claims, Zutaten, Verpackungsbild für AT/CZ/SK/SI. Daten: Mintel GNPD oder Innova (Enterprise, nicht öffentlich). Nutzer: Produktentwicklung, Marketing. Aufwand: Vertrag; ersetzt/ergänzt die monatlichen Deep-Research-Läufe des Produkt-Radars.

**K10 — Marktkontext (günstige Lizenz).** Marktgröße, Marken-/Firmenanteile, 5-Jahres-Prognose je Land. Daten: Euromonitor-Einzelreports (Baked Goods in Austria 1.125 EUR; CZ/SK/SI analog). Nutzer: GF, Strategie. Aufwand: 1× jährlich, manuell.

**K11 — Käuferverhalten (Lizenz).** Penetration, Loyalität, Wiederkauf, Switching zwischen Marken. Daten: Worldpanel/Numerator (Abdeckung AT/CZ/SK/SI nicht belegt), historisch GfK/YouGov-Haushaltspanels *(unbelegt)*. Nutzer: Marketing, GF. Aufwand: Vertrag.

**K12 — Food-Trend-Foresight (Lizenz, Ersatz für foodRegio-Daten).** Falls foodRegio die Nutzung nicht freigibt: TrendOne Explorer (5.880 EUR/Jahr) oder FIBRES Business (6.900 EUR/Jahr) mit eigenen Quellen; WGSN Food & Drink als Premium-Jahresinput. Nutzer: Produktentwicklung, Marketing.

**K13 — Social Listening (Lizenz).** Marken-/Produktdiskussionen, Sentiment, Peaks. Daten: Brandwatch/Talkwalker/Meltwater/Onclusive (nicht öffentlich, Jahresverträge). Nutzer: Marketing.

**K14 — Web-/Such-Benchmark.** Traffic von Wettbewerber-Domains und Händlershops, Suchnachfrage nach Produkttypen. Daten: Similarweb ab 125 USD/Monat, Google Trends (Web). Nutzer: Marketing.

**K15 — Konzept-KI.** Konzeptgenerierung/-screening (Ai Palette Concept Genie, Mintel Spark, Tastewise). Lizenz. Nutzer: Produktentwicklung.

**K16 — Rohstoff-Risiko (Erweiterung des Rohstoff-Radars).** RASFF-Gefahren je Rohstoff, Warnmeldungen, Rechtsänderungen (aus K2) als Facette am Rohstoff; später Preisreihen. Daten frei. Nutzer: Einkauf, Produktentwicklung. Vorbild: Craft Protect (Commodity-Alerts).

## 6. Ranking für Ölz

Kriterien (**Einschätzung**): Entscheidungsnutzen für die vier Nutzergruppen (Marketing, Produktentwicklung, Vertrieb/KAM, GF) · ob der Kunde die Information heute *nicht* hat · Datenverfügbarkeit ohne Lizenz · Aufwand für Metadine im Monatsrhythmus.

### (a) Hoher Mehrwert, mit öffentlichen Daten machbar — in dieser Reihenfolge

1. **K1 Retailer-Radar (Online-Regal + Aktionen).** Die einzige Sicht, die Ölz' eigene Produkte neben Wettbewerbern und Eigenmarken *mit Preisen* zeigt — und die Recherche belegt, dass sie ohne Lizenz geht (sechs Shops, zwei Aktionsaggregatoren; Ölz-Artikel sind dort sichtbar). Trifft Vertrieb/KAM und Marketing zugleich. Bestätigt den Platzhalter — mit konkretem Datenweg und einer offenen Rechtsfrage (BILLA-AGB).
2. **K6 Management-Digest.** Geringster Aufwand, größte Reichweite: Der Wert der Plattform hängt daran, dass die Signale bei denen ankommen, die sich nicht einloggen. Jede Plattform hat das; wir noch nicht. Bestätigt den Platzhalter — als automatischer Auszug aus dem Bestand, nicht als eigene Redaktion.
3. **K2 Rückruf- & Regulatorik-Radar.** Kostenlos, per RSS automatisierbar, mit Klarnamen der Wettbewerber in DE/CZ/SK/SI; für Ölz als Hersteller zusätzlich Risiko-Frühwarnung (Rohstoffe, Allergene). Neu.
4. **K5 Wettbewerber-Ereignisse & Bilanzen.** Kein neues Modul, sondern die Schärfung des Wettbewerbsradars nach dem Muster aller Generalisten: Ereigniskatalog statt Fließtext, plus die kostenlosen Bilanzen (CZ/SK/AT) und Ausschreibungen. Trifft die GF.
5. **K3 Marken- & Patent-Frühwarnung.** 6–18 Monate Vorlauf vor einem Launch, kostenlose APIs, kaum Pflege. Neu — und ein Alleinstellungsmerkmal gegenüber dem, was Ölz heute sieht.
6. **K4 Kampagnen-Radar.** Faktenbasierter Ersatz für „Social Listening": Wer wirbt womit, wo, mit welcher Reichweite. Meta-API kostenlos, aber Antragsweg (ID-Verifikation) und Pflegeaufwand.
7. **K7 Field Intelligence.** Billig, aber abhängig von der Disziplin des Außendienstes; deshalb hinter den automatisierbaren Modulen.
8. **K16 Rohstoff-Risiko** als Facette am Rohstoff-Radar — sinnvoll, sobald K2 läuft (gleiche Feeds).

### (b) Hoher Mehrwert, aber lizenzpflichtige Daten

9. **K8 Marktanteile & Distribution (NielsenIQ RMS).** Fachlich das wertvollste Modul überhaupt — und das teuerste. **Zuerst fragen, ob Ölz diese Daten bereits bezieht** (in dieser Branche üblich); dann ist es Integration, nicht Einkauf.
10. **K10 Marktkontext (Euromonitor-Einzelreports).** Für ~1.100 EUR je Land und Jahr die einzige seriöse Marktgrößen-/Anteilsquelle mit Prognose — als jährliche „Marktkontext"-Seite je Land ein klarer Gewinn zu kleinem Preis.
11. **K9 Launch-Datenbank (Mintel/Innova).** Würde das Produkt-Radar auf ein anderes Niveau heben (vollständig, mit Verpackungsbildern), kostet aber Enterprise-Lizenz; die monatlichen Deep-Research-Läufe sind die 80-%-Lösung.
12. **K11 Käuferverhalten (Panel).** Sehr aussagekräftig, aber Abdeckung AT/CZ/SK/SI ungeklärt und Vertragsvolumen hoch.
13. **K12 Food-Trend-Foresight (TrendOne/FIBRES/WGSN).** Nur relevant, wenn foodRegio nicht freigibt; dann sind 5.900–6.900 EUR/Jahr die Alternative.

### (c) Nett, aber niedriger Mehrwert für Ölz

14. **K13 Social Listening.** Für Toastbrot in vier Ländern ist das Gesprächsvolumen klein und das Rauschen groß; die Anbieter kosten fünfstellig pro Jahr. Ich würde den Platzhalter **streichen** und durch K4 ersetzen.
15. **K14 Web-/Such-Benchmark.** Für 125 USD/Monat hübsche Zahlen, aber selten entscheidungsrelevant für einen Hersteller im stationären LEH.
16. **K15 Konzept-KI.** Spielerei, solange die Grundlagen (K1, K8) fehlen.

## 7. Was ich mit den bestehenden Modulen und Platzhaltern machen würde

| Platzhalter | Urteil | Begründung |
|---|---|---|
| **Retailer-Radar** | **bestätigen** → K1 | Datenweg belegt (3.7), höchster Nutzen. |
| **Management-Snapshot** | **bestätigen** → K6, aber als automatischer Digest | Redaktionelle Verdichtung von Hand skaliert nicht; der Auszug „neu seit letztem Lauf" plus KI-Sätze reicht. |
| **Packaging- & Claim-Radar** | **zusammenlegen** mit dem Produkt-Radar | Claims und Verpackung sind Attribute eines Impulses, kein eigener Beobachtungsgegenstand; als Facette/Filter dort. Ein eigenes Modul lohnt erst mit Mintel/Innova (K9). |
| **Länder- & CEE-Radar** | **streichen als Modul**, Land als Dimension überall | Kein Anbieter hat ein „Länder-Modul"; alle haben Land als Filter. Eine Länder-Seite, die die Signale aller Module je Land aggregiert, ist ein View, kein Modul. |
| **Social Listening** | **streichen**, ersetzen durch K4 Kampagnen-Radar | Lizenzkosten hoch, Signalvolumen für Backwaren gering; Werbebibliotheken liefern das Fakten-Äquivalent kostenlos. |

Bestehende Module: **Wettbewerbsradar** → K5 (Ereigniskatalog, Bilanzen, Ausschreibungen, Website-Änderungen). **Produkt-Radar** → Claims/Verpackung als Facette; später K9. **Rohstoff-Radar** → K16 (Risiko-Feeds). **Food Radar** → bleibt; K12 als Ausweichplan. **Ad-hoc Studien** → bleibt; K10-Reports gehören dorthin.

Neu, in dieser Reihenfolge: **K2 Rückruf & Regulatorik**, **K3 Marken & Patente**, **K4 Kampagnen** — und quer über alles: **K6 Digest** und **K7 Field Intelligence**.

## 8. Offene Fragen an den Kunden

1. Bezieht Ölz heute Handelspanel-/Scannerdaten (NielsenIQ, GfK/YouGov, Worldpanel)? Wenn ja: Lizenz für die Nutzung in der Plattform? — entscheidet K8/K11.
2. Welche Handelsketten sind Key Accounts (Priorität der Shops in K1)? Darf Metadine BILLA-Shop-Daten abrufen (AGB § 6), oder bleibt es bei marktguru.at?
3. Beliefert Ölz institutionelle Kunden (Ausschreibungen)? — entscheidet, ob TED in K5 gehört.
4. Budgetrahmen für Lizenzdaten pro Jahr (Euromonitor-Reports ~1.100 EUR/Land sind die untere Grenze).
5. Wer im Außendienst würde Field Intelligence liefern (K7)? Ohne benannte Personen entfällt es.
6. Stand der foodRegio-Freigabe — entscheidet über K12.

## 9. Quellenverzeichnis (Auswahl je Abschnitt; vollständige Listen in den vier Teilberichten)

- Generalisten: crayon.co/product/aggregate · crayon.co/product/crayon-ai · klue.com/compete-agent · kompyte.com/plans · contify.com/platform/ · alpha-sense.com/platform/ · similarweb.com/pricing/ · meltwater.com/en/products/real-time-alerting
- Social/Media: brandwatch.com/products/consumer-research/features/ · talkwalker.com/pricing · valonaintelligence.com/market-intelligence-software/competitor-analysis-tool · comintelli.com/platform-intelligence2day/ · feedly.com/market-intelligence/pricing · onclusive.com/products/social-listening/ · owler.com/checkout/owlerpro · global.craft.co/solution/supplier-risk-management/
- Food/FMCG-Daten: mintel.com/products/mintel-gnpd/ · innovamarketinsights.com/platform/databases/ · nielseniq.com/global/en/products/retail-measurement-services-rms/ · circana.com/solutions/unify-plus · worldpanelbynumerator.com/panels/purchase-panel · euromonitor.com/baked-goods-in-austria/report · tastewise.io/agentic-ai/new-product-launch-tracker · aipalette.com/platform/foresight-engine/ · trendtracker.ai/platform/features/trend-radar
- Foresight: itonics-innovation.com/pricing · trendone.com/en/platform · fibresonline.com/pricing · wgsn.com/en/products/food-drink · trendwatching.com · springwise.com · foodregio.de/de/trendradar
- Preis/Regal: xpln.com/solutions/benchmarker · prisync.com/pricing/ · wiser.com/products/market-intelligence/ · flywheeldigital.com/market-intelligence · traxretail.com/solutions/ · competera.ai/products/competitive-data · idealo.github.io/partner-web-service/docs/v2
- LEH-Shops/Aktionen: shop.billa.at/kategorie/brot-und-gebaeck-15537 · billa.at/agb · hofer.at/produkte · lidl.at/h/backwaren/h10096086 · penny.at/angebote · rohlik.cz/c300101000-pecivo · kosik.cz/c1026-pekarna-a-cukrarna · albert.cz/albert-online · potravinydomov.itesco.sk/groceries/sk-SK/shop/pecivo/all · mercatoronline.si/brskaj · marktguru.at/c/brot · kupi.cz/slevy/pecivo · kimbino.sk · ceneje.si
- Öffentliche Quellen: lebensmittelwarnung.de/___LMW-Redaktion/RSSNewsfeed/rssnewsfeed_node.html · ages.at/mensch/produktwarnungen-produktrueckrufe · potravinynapranyri.cz/Rss.aspx · svps.sk · gov.si/zbirke/nevarni-in-neskladni-izdelki/ · food.ec.europa.eu/food-safety/rasff_en · efsa.europa.eu/en/rss · dev.euipo.europa.eu · dpma.de/recherche/dpmaregister/index.html · developers.epo.org · ted.europa.eu/en/simap/developers-corner-for-reusers · portal.auszug.at/faq/gebuehren-firmenbuch · registeruz.sk/cruz-public/home/api · ajpes.si/jolp/ · northdata.com/_premium · developers.facebook.com/docs/graph-api/reference/ads_archive/ · support.google.com/adspolicy/answer/13733850 · developers.tiktok.com/products/commercial-content-api · changedetection.io · world.openfoodfacts.org/data

Die vier Teilberichte mit allen abgerufenen und allen nicht erreichbaren URLs liegen als Rohmaterial in `docs/marktrecherche-module-anhang.md`.

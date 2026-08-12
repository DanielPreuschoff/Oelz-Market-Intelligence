/**
 * Food Radar — Tafel „Future Food".
 *
 * ERZEUGT von scripts/baue-radardaten.mjs — nicht von Hand ändern.
 * Quelle: foodRegio Innovation / FIBRES, öffentliches Embed, gelesen 2026-08-10.
 * Texte maschinell ins Deutsche übersetzt (gpt-4o-mini).
 *
 * 34 Einträge · größter Radius im Original: 1.000
 */
import type { RadarTafel } from './types'

export const FUTURE_FOOD: RadarTafel = {
  "key": "future-food",
  "name": "Future Food",
  "achsenName": "Time to Impact",
  "ringe": [
    {
      "name": "Mainstream (heute)",
      "bis": 0.4
    },
    {
      "name": "Maturing (1–3 J.)",
      "bis": 0.6
    },
    {
      "name": "Growing (3–5 J.)",
      "bis": 0.8
    },
    {
      "name": "Emerging (5–10 J.)",
      "bis": 1
    }
  ],
  "sektoren": [
    "Digitalisation/AI",
    "Additive Manufacturing",
    "Alternative Proteins",
    "Personalisation",
    "Sustainability",
    "Regulatory Environment"
  ],
  "eintraege": [
    {
      "id": "989613",
      "titel": "3D-Druck von Milchprodukten",
      "beschreibung": "3D-Druck in der Milchindustrie ist ein aufkommender Trend, der sich auf die Herstellung von milchbasierten Produkten mit maßgeschneiderten Strukturen und Eigenschaften konzentriert. Forscher untersuchen den Einsatz von Milchprotein-Konzentrat, Molkenprotein-Isolaten und anderen Milchbestandteilen für den 3D-Druck, mit dem Ziel, innovative Lebensmittelprodukte zu entwickeln, die futuristisch, kreativ, gesund, effizient und nachhaltig sind. Anwendungen umfassen das Drucken von Milchproteingelen, auf Kasein basierenden Emulsionen und funktionalisierten Joghurts, die neue Möglichkeiten für personalisierte Ernährung und neuartige Lebensmitteltexturen bieten. Obwohl sich der 3D-Druck noch in der Forschungsphase befindet, birgt er das Potenzial, das Design und die Herstellung von Milchprodukten zu transformieren.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 130.77,
      "radius": 0.7139,
      "daten": "Aug 15th 2024  2 years ago",
      "titelOriginal": "Dairy 3D printing"
    },
    {
      "id": "874304",
      "titel": "Großangelegte 3D-gedruckte Lebensmittelproduktion",
      "beschreibung": "Untersuchung der Machbarkeit der großangelegten Lebensmittelproduktion mithilfe von 3D-Drucktechnologie, mit dem Ziel, die Massenproduktion und -verteilung von Lebensmitteln zu revolutionieren. Dieser Trend sieht eine effiziente und nachhaltige Lebensmittelproduktion vor, die Lebensmittelverschwendung und Transportkosten reduziert. Obwohl der aktuelle Reifegrad dieses Trends als niedrig eingeschätzt wird, treiben Fortschritte in der 3D-Drucktechnologie und die Möglichkeiten zur Skalierung den Fortschritt in diesem Bereich voran.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 143.16,
      "radius": 0.7856,
      "daten": "Oct 20th 2023  5 months ago",
      "titelOriginal": "Large-scale 3D printed food production"
    },
    {
      "id": "874284",
      "titel": "Insektenprotein für den menschlichen Verzehr",
      "beschreibung": "Untersuchung der Verwendung von Insekten als tragfähige Proteinquelle für menschliche Ernährung, unter Berücksichtigung ihres hohen Nährwerts, der geringen Umweltbelastung und des Potenzials zur Integration in Lebensmittelprodukte wie Proteinriegel und insektenbasierte Mehle. Angesichts des globalen Bevölkerungswachstums und der Ressourcenengpässe stellen konventionelle Proteinquellen Herausforderungen dar, während Insekten aufgrund ihres hohen Proteingehalts, der effizienten Futterverwertung und der minimalen Treibhausgasemissionen eine vielversprechende Lösung bieten. Während insektenbasierte Lebensmittel in bestimmten Kulturen eine Geschichte haben, entwickelt sich die allgemeine Akzeptanz noch, was zu einem Trendreifegrad führt, der als niedrig eingeschätzt wird.",
      "sektor": "Alternative Proteins",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 116.17,
      "radius": 0.761,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "Insect protein for human consumption"
    },
    {
      "id": "874303",
      "titel": "Personalisierte 3D-gedruckte Süßwaren",
      "beschreibung": "Die Herstellung von personalisierten und komplexen Süßwaren mit Hilfe von 3D-Drucktechnologie, die anpassbare Designs, Geschmäcker und Nährstoffgehalte in Süßigkeiten und Desserts ermöglicht. 3D-Lebensmitteldruck ermöglicht die präzise Ablagerung von Zutaten, um komplexe Strukturen und Muster zu bilden, was die künstlerische Präsentation und das Geschmackserlebnis von Süßwarenprodukten verbessert. Mit dem Fortschritt der Technologie und ihrer zunehmenden Zugänglichkeit hat dieser Trend ein Reifegradniveau erreicht, das als mittel eingestuft wird, und gewinnt an Popularität in gehobenen Süßwarengeschäften und Veranstaltungen.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 134.69,
      "radius": 0.8005,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "Customized 3D-printed confectionery"
    },
    {
      "id": "874282",
      "titel": "Pilzproteine als Fleischersatz",
      "beschreibung": "Die Nutzung von pilzbasierten Proteinen als Alternative zu traditionellen Fleischprodukten, die Erkundung von mykoproteinreichen Lebensmitteln wie \"Pilzburgern\" und \"Pilz-Jerky\" als nachhaltige und nahrhafte Fleischalternativen. Pilze, wie Mykoprotein, das aus Fusarium venenatum gewonnen wird, bieten eine wertvolle Proteinquelle mit potenziellen Anwendungen als Fleischersatz. Während Forscher und Lebensmittelunternehmen mit pilzbasierten Proteinprodukten experimentieren, befindet sich dieser Trend noch in einer frühen Entwicklungsphase, die als niedrig eingestuft wird.",
      "sektor": "Alternative Proteins",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 108.48,
      "radius": 0.7985,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "Fungal proteins as meat replacements"
    },
    {
      "id": "874302",
      "titel": "3D-Druck für personalisierte Ernährung",
      "beschreibung": "Anwendung des 3D-Drucks von Lebensmitteln zur Erstellung maßgeschneiderter Mahlzeiten, die auf individuelle Ernährungsbedürfnisse, Gesundheitsziele und diätetische Einschränkungen abgestimmt sind. Dieser Trend zielt darauf ab, maßgeschneiderte Ernährungslösungen anzubieten, die sicherstellen, dass Verbraucher genau portionierte und ausgewogene Mahlzeiten erhalten, die ihren einzigartigen Bedürfnissen entsprechen. Mit dem Fortschritt der Technologie und des Ernährungswissens entwickelt sich dieser Trend auf einem als mittel eingestuften Reifegrad.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 146.73,
      "radius": 0.7569,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "3D printing for personalized nutrition"
    },
    {
      "id": "874306",
      "titel": "KI-optimierte Pflanzenzüchtung",
      "beschreibung": "Einsatz von künstlicher Intelligenz und Machine Learning-Algorithmen zur Beschleunigung traditioneller Pflanzenzüchtungsprozesse, Verbesserung des Ertrags, der Krankheitsresistenz und des Nährstoffgehalts von Pflanzen. KI-basierte Pflanzenzüchtung ermöglicht eine präzisere und effizientere Auswahl wünschenswerter Eigenschaften, was zur globalen Ernährungssicherheit und Nachhaltigkeit beiträgt. Mit dem Fortschritt von Forschung und Implementierung reift dieser Trend auf einem als mittel eingestuften Reifegrad.",
      "sektor": "Digitalisation/AI",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 158.84,
      "radius": 0.6822,
      "daten": "Oct 20th 2023  5 months ago",
      "titelOriginal": "AI-optimized crop breeding"
    },
    {
      "id": "874259",
      "titel": "Vielfalt pflanzlicher Proteine",
      "beschreibung": "Die Vielfalt pflanzlicher Proteine umfasst die Erweiterung der Palette pflanzlicher Proteinquellen über traditionelle Optionen wie Soja und Weizen hinaus. Innovative Pflanzen wie Hülsenfrüchte, Quinoa, Algen und Pilze gewinnen als nahrhafte und umweltfreundliche Proteinalternativen an Bedeutung. Dieser Trend hat eine hohe Reife, da eine zunehmende Anzahl pflanzlicher Proteinprodukte auf dem Markt erhältlich ist, die der Nachfrage der Verbraucher nach nachhaltigen und vielfältigen Proteinoptionen gerecht werden.",
      "sektor": "Alternative Proteins",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 105.11,
      "radius": 0.7609,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "Plant-based protein diversity"
    },
    {
      "id": "874301",
      "titel": "3D-Druck von Lebensmitteln in gehobenen Restaurants",
      "beschreibung": "Integration von 3D-Drucktechnologie für Lebensmittel in gehobenen Restaurants und gastronomischen Erlebnissen, die den Gästen innovative und visuell ansprechende Gerichte mit präziser Zutatenplatzierung und komplexen Designs bieten. Während sich die kulinarischen Künste und die Technologie verbinden, übernehmen renommierte Köche und Restaurants den 3D-Druck von Lebensmitteln, um die Grenzen der kulinarischen Kreativität und Präsentation zu erweitern. Der Reifegrad des Trends wird derzeit als mittel eingeschätzt, wobei immer mehr Fine-Dining-Einrichtungen diesen innovativen Ansatz zur Lebensmittelzubereitung annehmen.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 122.63,
      "radius": 0.8068,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "3D food printing in high-end restaurants"
    },
    {
      "id": "874239",
      "titel": "KI-gestützte Pflanzenüberwachung",
      "beschreibung": "Die KI-gestützte Pflanzenüberwachung umfasst die Anwendung von künstlicher Intelligenz und Computer Vision-Technologien zur Überwachung und Analyse der Pflanzen Gesundheit in Echtzeit. Kameras und Sensoren, die an Drohnen oder bodengestützten Systemen montiert sind, erfassen detaillierte Bilder der Pflanzen, die dann von KI-Algorithmen verarbeitet werden, um frühe Anzeichen von Krankheiten, Nährstoffmängeln oder Schädlingsbefall zu erkennen. Die Erkenntnisse aus der KI-gestützten Pflanzenüberwachung ermöglichen gezielte Eingriffe, präzise Anwendung von Düngemitteln und Pestiziden sowie eine verbesserte Ressourcenverwaltung. Dieser Trend hat eine mittlere Reife, da er erhebliche Entwicklungen erfahren hat und in verschiedenen landwirtschaftlichen Kontexten getestet wird.",
      "sektor": "Digitalisation/AI",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 175.15,
      "radius": 0.78,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "AI-driven crop monitoring"
    },
    {
      "id": "1176259",
      "titel": "Zutaten für die Zukunft: Die Biotech-Revolution in die Lebensmittelbranche bringen",
      "beschreibung": "Neue biologische Technologien erobern verschiedene Branchen und eröffnen Möglichkeiten für Lebensmittel. Fermentation, eine Art der Bioprozessierung, ermöglicht es Lebensmittelproduzenten, Proteine und andere Zutaten mithilfe von Mikroben anstelle von Tieren herzustellen, wodurch der Flächenverbrauch und die Emissionen aus der Tierhaltung erheblich reduziert werden, während die Zuverlässigkeit und die Lebensmittelsicherheit erhöht werden.\n\nFermentierte neuartige Proteine könnten bis 2050 etwa 4 Prozent der gesamten Proteinproduktion ausmachen, was einem jährlichen Markt von 100 bis 150 Milliarden US-Dollar entspricht, wobei die Variabilität von Klimapolitiken und dem Tempo der technologischen Entwicklung abhängt. Fortschritte in der Fermentationstechnologie könnten auch anderen Branchen wie Chemie und Materialien zugutekommen.\n\nBevor neuartige Proteine durchstarten können, muss die Fermentationstechnologie skaliert werden. Die meisten Akteure im Bereich neuartiger Zutaten haben derzeit Produktionskosten, die um ein Vielfaches höher sind als die Kosten für die Produktion von traditionellen Proteinen, die typischerweise im Bereich von 2 bis 15 US-Dollar pro Kilogramm liegen. Um die Preisniveaus durch Skaleneffekte zu senken, zeigen unsere Prognosen, dass Akteure im Bereich fermentierter neuartiger Zutaten bis 2050 kumulativ mehr als 250 Milliarden US-Dollar investieren müssen, um die Kapazität zu erweitern.\n\nIn diesem Artikel untersuchen wir, wie die Lebensmittelindustrie den Übergang zu fermentationsbasierten Zutaten, insbesondere Proteinen, beschleunigen kann. Um dorthin zu gelangen, können etablierte Unternehmen, Start-ups und Investoren die Fermentationsproduktionsprozesse und die Bioreaktortechnologie verbessern, um die Kosten zu senken, neue Produkte zu entwickeln, die für Verbraucher ansprechend sind, und Partner zusammenzubringen, um die Branche zu skalieren.\n\n\nDas Potenzial für neuartige Zutaten\n\nDer potenzielle Markt für fermentierte Proteinprodukte wird bis 2050 auf 100 bis 150 Milliarden US-Dollar geschätzt. Die Proteinmarktsegmente umfassen Wiederkäuer (Rind, Lamm und Ziege), Geflügel (Huhn und Truthahn), Monogastrier (Schweine), Fisch, Milchprodukte und Eier. Der Verkauf von Mischprodukten, die irgendeine fermentierte oder kultivierte Zutat enthalten, wurde vollständig ihrer jeweiligen Biotech-Kategorie zugeordnet. Mit anderen Worten, der Verkauf eines Hybridprodukts, das sowohl pflanzliche als auch kultivierte Zutaten verwendet, wird für den Endproduktverkauf als „kultiviert“ betrachtet. Der bemerkenswerte Rückgang der Verkäufe pflanzenbasierter Produkte sollte daher als erheblich durch den Anstieg der Verkäufe von Mischprodukten bedingt angesehen werden. Diese Gelegenheit hat traditionelle Fermentationsakteure, Lebensmittelgiganten, Staatsfonds und andere dazu veranlasst, in den letzten fünf Jahren mehr als 4 Milliarden US-Dollar in Präzisions- und Biomassefermentation zu investieren.\n\nDas hohe Interesse an neuartigen Lebensmitteln ist auf ihre Fähigkeit zurückzuführen, die traditionelle Lebensmittelproduktion zu ergänzen. Der globale Markt für Proteine ist heute beträchtlich, mit etwa 3,0 Billionen US-Dollar, und wird bis 2050 voraussichtlich auf etwa 3,5 Billionen US-Dollar wachsen. Allerdings stellen steigende Futterpreise, Klimaschwankungen und Krankheiten eine Herausforderung für die Fähigkeit der Tierhaltung dar, die Ernährungsbedürfnisse der wachsenden globalen Bevölkerung zu unterstützen.\n\nNeuartige Zutaten, die durch Bioprozessierung hergestellt werden, sind eine Möglichkeit, diese Risiken zu mindern. Da die Fermentation in einer synthetischen Umgebung (Bioreaktoren) stattfindet, ist die Herstellung sowohl kontrolliert als auch modular, was die geografische Flexibilität erhöht und die Anfälligkeit für wetter-, lieferketten- und krankheitsbedingte Störungen in der traditionellen Lebensmittel- und Agrarwertschöpfungskette verringert. Darüber hinaus benötigt die Fermentation eine kleinere Landfläche als die traditionelle Landwirtschaft, was sie zu einer leistungsstarken Option für den Aufbau einer größeren Lebensmittelsicherheit macht.\n\n\nSkalierungsfaktoren für die Zukunft der Lebensmittel\n\nBevor die Industrie für neuartige Zutaten dazu beitragen kann, die Lebensmittelsysteme nachhaltiger und widerstandsfähiger zu gestalten, muss sie erheblich skaliert werden. Die bestehende Kapazität zur Unterstützung der Skalierung ist jedoch begrenzt, und Auftragsfertigungsorganisationen (CMOs) haben oft Margenerwartungen, die nicht mit den Standards der Lebensmittelindustrie übereinstimmen, was sie oft unviabel für Unternehmen macht, die nach mehr Kapazität suchen. Obwohl mehrere neue Kapazitätserweiterungen angekündigt wurden, sind andere aufgrund makroökonomischer Faktoren gescheitert.\n\nDer Aufbau weiterer Kapazitäten ist nicht die einzige Herausforderung. Die zugrunde liegende Technologie und die Prozesse müssen entwickelt und verbessert werden. Die Chancen und Risiken neuartiger Zutaten werden weiterhin untersucht, und sowohl etablierte Unternehmen als auch Start-ups und Investoren sind dabei, Investitionen zuzuweisen, neue Entwicklungen im Auge zu behalten und die Bedürfnisse der Kunden zu verstehen.\n\nUm die Zukunft dieser wachsenden Branche zu entmystifizieren, haben wir drei Bereiche identifiziert, die entscheidend für den Aufbau und die Skalierung eines neuen Lebensmittelsystems sind:\n\n\nProzessverbesserungen und neu gestaltete Bioreaktoren könnten die Erträge steigern, die Bioreaktorkosten senken und die Produktionskosten um etwa 50 Prozent reduzieren; neue Bioreaktortechnologien könnten auch die globalen Marktchancen für OEMs erweitern.\nVerbesserte Formulierungs- und Lebensmittelgestaltungsfähigkeiten könnten zu einer größeren Vielfalt hochwertiger Angebote führen, insbesondere wenn Unternehmen den Geschmack und die Textur der Produkte verbessern.\nNeue Geschäftsmodelle könnten der Branche helfen, Risiken zu mindern und mehr als 250 Milliarden US-Dollar für die erwartete Infrastruktur-Skalierung zu finanzieren.\n\n\nProduktionsverbesserungen könnten die Stückkosten um 50 Prozent senken\n\nDer wichtigste Faktor für den Start des Marktes für neuartige Lebensmittel wird die Senkung der Stückkosten neuartiger Zutaten sein. Durch die Implementierung technologischer Innovationen in der Bioprozessierung und den nachgelagerten Produktionsprozessen – unter Berücksichtigung der Gesamtkosten der verkauften Waren (COGS) – könnten Unternehmen für neuartige Zutaten jetzt mit Kostensenkungen von etwa 50 Prozent rechnen.\n\nDie meisten Einsparungen werden voraussichtlich aus den primären Treibern der COGS stammen, einschließlich Titer (dem Maß für die Konzentration des gewünschten Produkts in der Fermentationsbrühe), nachgelagerte Verarbeitung (Umwandlung der Fermentationsbrühe in ein stabiles Produkt) und Zykluszeit.\n\nEinige dieser Treiber haben sich im Laufe der Zeit stetig verbessert. Beispielsweise erzielen Inhaber von Kern-IP kontinuierliche Titerverbesserungen, und seit Jahrzehnten setzen chemische und pharmazeutische Unternehmen digitale Analytik und zunehmend KI ein, um die Herstellung zu optimieren.\n\nWas die Branche wirklich voranbringen könnte, sind grundlegende Prozessverbesserungen. Fundamentalere Änderungen in der Bioprozessierung könnten die aktive Zykluszeit und die Kapitaleffizienz erheblich steigern. Mehrere Start-ups untersuchen die Umstellung von Batch-Prozessen auf kontinuierliche Prozesse, während andere Unternehmen traditionelle aerobe Prozesse in anaerobe umwandeln.\n\nZusätzlich zu grundlegenden Verbesserungen in den Prozessen wird es entscheidend sein, die Bioreaktortechnologie aufzurüsten. Branchen wie Pharmazie und Chemie haben Fermenter entwickelt, die ihren Bedürfnissen entsprechen, aber Bioreaktoren wurden noch nicht neu gestaltet, um den Anforderungen der Lebensmittelindustrie gerecht zu werden. Neue Anlagen müssen entwickelt werden, die den lebensmittelgerechten Spezifikationen entsprechen und näher an den Margenerwartungen des Lebensmittelsektors liegen.\n\nUm dorthin zu gelangen, müssen Bioreaktoren und ihre umgebenden Komponenten von Grund auf in einer zweckmäßigen Weise neu gestaltet werden, aber globale OEMs haben diese Gelegenheit bisher nicht angegangen. In dieser Lücke haben einige Start-ups (darunter eine kleine Gruppe von anlagenfokussierten Start-ups wie Sterling Bio Machines und Ark Biotech) Bioreaktoren neu gestaltet und maßgeschneiderte Modelle aus der Notwendigkeit heraus gebaut. Darüber hinaus erkunden einige Unternehmen die Verwendung von modulareren Fermentationstanks, um die Investitionskosten erheblich zu senken und Lernkurven zu fördern.\n\n\nBessere Fähigkeiten in der Lebensmittelformulierung könnten bahnbrechende neue Produkte im etwa 3,5 Billionen US-Dollar schweren Proteinmarkt schaffen\n\nWenn fermentierte neuartige Lebensmittel beginnen, die Kostenkurve zu durchbrechen, werden Lebensmittel- und Getränkeunternehmen die Möglichkeit haben, neue Zutaten und Angebote für Verbraucher einzuführen. Während präzisionsfermentierte Zutaten genetisch identisch mit ihren tierischen Gegenstücken sind, bieten Biomasseproteine unbekannte und aufregende Möglichkeiten, da viele dieser Zutaten völlig neu für den menschlichen Verzehr sind. Neue Geschmäcker, Fleischalternativen und Getränke werden verfügbar sein, und ...",
      "sektor": "Alternative Proteins",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 97.86,
      "radius": 0.7538,
      "daten": "newspaper Mar 13th 2025  Apr 10th 2025  a year ago",
      "titelOriginal": "Ingredients for the future: Bringing the biotech revolution to food"
    },
    {
      "id": "1159084",
      "titel": "Forschung in Tschechien Hybrid-Fleisch aus dem 3D-Drucker",
      "beschreibung": "Massentierhaltung ist ein maßgeblicher Treiber der Klimakrise. Alternativen zur herkömmlichen Fleischproduktion müssen also her - der 3D-Drucker könnte Abhilfe verschaffen.\n\nLebensmittel aus dem Labor, Fleisch aus Ersatzprodukten, Steaks aus dem 3D-Drucker - das Essen der Zukunft ist ein großes Thema für die Forschung. Auch in Tschechien. Dort wird noch deutlich mehr Fleisch gegessen als in Deutschland, aber auch vegetarische Alternativen werden immer beliebter. Besonders, wenn sie gesünder, umweltfreundlicher und günstiger sind.\n\nGenau daran arbeiten Forscher in Prag und zwar ganz tschechisch-pragmatisch. Ihre Burger-Paste zum Selbstausdrucken enthält etwas Fleisch. Dadurch bietet sie bei Geschmack, Geruch und Textur deutlich mehr als die meisten Ersatzprodukte, finden die Wissenschaftler.\n\n\nEin Burger entsteht Tropfen für Tropfen\n\nStepan Janoud ist eigentlich Experte für das natürliche Konservieren von Fleisch. Doch seit einiger Zeit entwickelt der Forscher an der Prager Universität für Chemie und Technologie Lebensmittelmischungen für 3D-Drucker. In einen speziellen Aufsatz, den Spritzen-Extruder, füllt er eine braune Flüssigkeit. \"Das ist eine Paste aus Erbsenprotein, Öl und Leberpastete, unsere alternative Fleischmischung, die wir weiterentwickeln\", erklärt Janoud.\n\nDas Geräusch klingt eher nach einem alten Drucker als nach Küche. Aber nach ein paar Minuten zieht ein typischer Fleischgeruch durch das Labor und ein rundes Stück Fleisch für einen Burger entsteht Tropfen für Tropfen auf dem Untersatz. \"Wir waren mit unseren haltbaren Fleischpatronen zum Ausdrucken schon auf einigen Konferenzen\", erzählt Janoud. \"Das Interesse war groß, weil das Thema attraktiv ist.\"\n\n\n\n\nSuche nach dem heiligen Gral\n\nWeltweit wird viel an Fleischalternativen geforscht. Der Markt wächst schnell, selbst im Fleischland Tschechien. Hersteller versprechen günstigere, gesündere und umweltfreundlichere Lebensmittel. Die Entwicklung des perfekten Fleischersatzes gleicht der Suche nach dem heiligen Gral.\n\n\"Wir haben mit einem Unternehmen zusammengearbeitet, das Labor-Fleisch züchtet und es beraten\", merkt Janoud an. \"Wir haben auch damit experimentiert, ob man künstliches Fleisch ausdrucken kann und haben das mit natürlichem Hühnerfleisch kombiniert, um so bessere Fleischalternativen herzustellen.\"\n\n\nDie Textur ist das A und O\n\nBisher sind viele Produkte teuer und alles andere als gesund. Sie enthalten oft wenig Protein, dafür viele hochverarbeitete Zusätze. Die Prager Forscher rund um Professor Rudolf Sevcik nutzen daher nur natürliche Zutaten, und zwar nicht als Pulver, sondern als Paste aus Hülsenfrüchten, Getreide und etwas Fleisch.\n\n\"Ich bin schon älter, ich mag keine Revolutionen, aber ich denke, wir sollten uns daran gewöhnen, weniger Fleisch zu essen\" meint Sevcik. \"Einige Nährstoffe nehmen wir jedoch besser aus Fleisch auf. Und wir brauchen es auch, damit es gut schmeckt.\"\n\nDie Prager Universität entwickelt außerdem hybride Brotaufstriche für tschechische Unternehmen. Auf das Ausdrucken des Fleisches setzt sie wegen der Konsistenz. \"Wir sehen, dass der 3D-Druck den fleischlosen oder hybriden Alternativen das geben kann, was ihnen vor allem fehlt: nämlich die Textur. Die stört bisher, wenn man wirklich in etwas reinbeißen will, das an Fleisch erinnert.\"\n\n\nWird der Drucker zur Heimküche?\n\nDie Prager Forscher wollen ihre Technologie zum Selbstausdrucken so verbessern, dass nicht nur Unternehmen interessiert sind, sondern auch Verbraucherinnen und Verbraucher.\n\n\"Einige Männer, die sich zum Beispiel mit Modellbau beschäftigen, haben schon heute einen 3D-Drucker zu Hause\" sagt Sevcik. \"Irgendwann bringt die Frau ein Blech in die Werkstatt und unsere Füllung und sagt: Druck mir ein paar Hamburger aus für den Abend. Das ist meine Vision für die Zukunft.“",
      "sektor": "Additive Manufacturing",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 140.43,
      "radius": 0.8085,
      "daten": "newspaper Oct 10th 2024  Mar 6th 2025  a year ago"
    },
    {
      "id": "989618",
      "titel": "KI-gestützte Milchviehzucht",
      "beschreibung": "Künstliche Intelligenz (KI) wird zunehmend in der Milchindustrie eingesetzt, um die Gesundheit und das Wohlbefinden der Kühe zu verbessern, die Milchqualität zu optimieren und die Entscheidungsfindung zu unterstützen. KI analysiert Daten aus verschiedenen Quellen, um Aufgaben wie die Auswahl optimaler Behandlungen für Kühe, die Vorhersage der Verbrauchernachfrage und die Sicherstellung der Lebensmittelqualität zu rationalisieren. Zu den Anwendungen gehören die Nutzung von KI zur Nachfrageprognose, die Erkennung von Lebensmittelverfälschungen, die Verbesserung der Käsequalität durch Computer Vision und das Management von Hitzestress bei Kühen. KI hilft auch bei der Schätzung der Milchproduktion, der Methanemissionen und der Herdengröße durch fortschrittliche Bildgebungstechniken.",
      "sektor": "Digitalisation/AI",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 172.92,
      "radius": 0.7111,
      "daten": "Aug 15th 2024  a year ago",
      "titelOriginal": "AI Dairy Farming"
    },
    {
      "id": "187607",
      "titel": "KI-gestützte Kühlschränke, die Lebensmittel erkennen",
      "beschreibung": "Bereiten Sie sich auf einen Wettstreit der intelligenten Kühlschränke auf der CES 2020 vor, denn Samsung und LG werden in diesem Jahr Kühlschränke mit erweiterten KI-Funktionen vorstellen. Die neueste Ausgabe von Samsungs Family Hub Kühlschrank und LGs zweite Generation des InstaView ThinQ Kühlschranks verfügen beide über mit KI ausgestattete Kameras, die Lebensmittel identifizieren können. Die Idee ist, dass die Kameras den Inhalt scannen und den Nutzern mitteilen, welche Artikel ihnen fehlen, und sogar Essensvorschläge basierend auf den Zutaten machen, die sie noch haben.\n\nSamsungs Family Hub Smart Kühlschrank wurde erstmals auf der CES 2016 vorgestellt, und seitdem hat das Unternehmen aktualisierte Versionen mit Bixby-Unterstützung, SmartThings-Integration und AKG-Lautsprechern herausgebracht. Die neueste Ausgabe fügt Software-Updates hinzu, um die KI-Bilderkennung in den View Inside-Kameras zu ermöglichen.\n\nWelcher Kühlschrank wird am Ende übrig bleiben?\n\nFrüher ermöglichten die Kameras den Nutzern, von ihren Smartphones aus zu sehen, was sich in ihren Kühlschränken befindet, eine nützliche Funktion, wenn man gerade Lebensmittel einkauft und sich nicht erinnern kann, was man nachkaufen muss. Mit den KI-gestützten Updates wird der Family Hub angeblich diese Empfehlungen selbstständig abgeben und identifizieren, bei welchen Zutaten man im Mangel ist. Es bleibt jedoch abzuwarten, wie gut die Bilderkennung funktioniert – zum Beispiel, wie wird sie mit Zutaten umgehen, die in Tupperware aufbewahrt werden?\n\nDie Software-Updates beinhalten auch eine verbesserte Essensplanung mit Hilfe von Whisk, einem Food-Tech-Startup, das Samsung letztes Jahr übernommen hat. Whisk ermöglicht es den Nutzern, Mahlzeiten für bis zu eine Woche zu planen und dann intelligente Einkaufslisten zu erstellen, die Zutaten enthalten, die für mehrere Rezepte gelten.\n\nSchließlich kann der große integrierte Touchscreen, der als virtuelles schwarzes Brett genutzt werden kann, jetzt auch Videoclips unterstützen sowie Inhalte von Samsung-Fernsehern und -Handys spiegeln. Das bedeutet, dass Sie vertikale Videos wie IGTV auf Ihrem Samsung Kühlschrank ansehen können, wie es sich gehört.\n\nLG präsentiert zwei Modelle seiner InstaView Kühlschränke, die beide über ein 22-Zoll-Display verfügen, das transparent werden kann, damit die Nutzer sehen können, was sich im Inneren befindet, ohne die Tür zu öffnen und die kalte Luft entweichen zu lassen. Es gibt den KI-ausgestatteten InstaView ThinQ und den InstaView mit Craft Ice, der schicke, zwei Zoll große Kugeln aus Eis herstellt. Diese sollen langsamer schmelzen als normales Eis, falls das ein Problem für Sie darstellt. Der InstaView mit Craft Ice wurde letztes Jahr in den USA veröffentlicht, wird jetzt aber in weiteren Märkten erhältlich sein.\n\nEs gibt noch keine Preisinformationen, aber basierend auf den Preisen der vorherigen Kühlschrankmodelle von LG und Samsung können die Kunden mit Preisen zwischen 4.500 und 6.000 US-Dollar rechnen. Samsung sagt, dass die Updates für den Family Hub im Frühling verfügbar sein werden.\n\nIch bin der Idee eines großen, WLAN-verbundenen Touchscreens auf einem Kühlschrank nicht abgeneigt – tatsächlich scheint es eine wirklich nützliche Möglichkeit zu sein, Rezepte nachzuschlagen oder süße Fotos und Videos anzuzeigen. Ich bin skeptisch, wie gut die KI verschiedene Zutaten identifizieren wird und ob es wirklich besser ist, einen Computer zu nutzen, um zu sehen, welche Artikel man benötigt, als einfach selbst einen Blick hineinzuwerfen.",
      "sektor": "Digitalisation/AI",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 154.09,
      "radius": 0.6028,
      "daten": "newspaper Jan 2nd 2020  Jan 31st 2020  a year ago",
      "titelOriginal": "AI-powered fridges that recognize food"
    },
    {
      "id": "874317",
      "titel": "Nutrigenomik-basierte Sporternährung",
      "beschreibung": "Die Anwendung von Nutrigenomik zur Optimierung der sportlichen Leistung und Regeneration, indem Sporternährungspläne auf genetischen Faktoren basieren, die den Nährstoffstoffwechsel und das sportliche Potenzial beeinflussen. Nutrigenomik, das Studium der individuellen genetischen Variationen und deren Auswirkungen auf die Reaktionen auf Nährstoffe, birgt das Potenzial zur Verbesserung der sportlichen Leistung und zur Optimierung der Ernährung für Athleten. Durch die Analyse genetischer Marker, die mit der Nährstoffnutzung und dem sportlichen Potenzial in Verbindung stehen, können personalisierte Sporternährungspläne erstellt werden, die die einzigartigen Bedürfnisse der Athleten unterstützen. Während die Forschung in der Nutrigenomik voranschreitet und ihre Anwendungen in der Sporternährung zunehmen, gewinnt dieser Trend an Bedeutung, befindet sich jedoch noch in einem relativ frühen Reifegrad.",
      "sektor": "Personalisation",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 77.54,
      "radius": 0.7014,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "Nutrigenomics-based sports nutrition"
    },
    {
      "id": "187372",
      "titel": "Bohnen, Erbsen und andere Hülsenfrüchte",
      "beschreibung": "Es wird schon lange gesagt, dass Bohnen...magisch sind, sozusagen. Und da ist etwas Wahres dran: Bohnen sind reich an Protein, Ballaststoffen und wichtigen Mikronährstoffen, und es gibt Hinweise darauf, dass sie das Risiko für Herzkrankheiten und Krebs senken können - insbesondere wenn sie rotes Fleisch in der Ernährung ersetzen.\n\nBRAMi\n\nEs wird schon lange gesagt, dass Bohnen...magisch sind, sozusagen. Und da ist etwas Wahres dran: Bohnen sind reich an Protein, Ballaststoffen und wichtigen Mikronährstoffen, und es gibt Hinweise darauf, dass sie das Risiko für Herzkrankheiten und Krebs senken können - insbesondere wenn sie rotes Fleisch in der Ernährung ersetzen.\n\nAber in letzter Zeit scheinen Hülsenfrüchte die modische Zutat der Wahl für innovative Food-Startups zu sein. Weit davon entfernt, nur eine Beilage zu Reis oder eine Zutat für Chili zu sein, finden einige Köpfe in der Food-Tech-Welt kreative neue Wege, um Bohnen und andere Hülsenfrüchte in schmackhafte Lebensmittel zu verwandeln, die die Probleme von Nachhaltigkeit, Ernährung und modernen Gelüsten angehen.\n\n\"Jetzt ist eine extrem aufregende Zeit, um mit Hülsenfrüchten zu arbeiten,\" sagt Peter Carlson, Direktor bei Terra Ingredients. \"Terra hat ein rapides Wachstum bei unseren gerösteten Hülsenfrüchte-Produkten erlebt, da das Rösten das Geschmacksprofil dieser innovativen Produkte verbessert. Der Verbraucher muss nicht mehr auf Geschmack verzichten, um pflanzliche Proteine zu konsumieren. Wir sehen dies als den Beginn eines rasanten Nachfragewachstums für Hülsenfrüchte: Erstens verlangen gebildete Verbraucher nach nährstoffdichten Alternativen zu Reis-/Mais-/Weizenprodukten; zweitens sind Hülsenfrüchte entscheidend für die Fruchtfolgen in der regenerativen Landwirtschaft; und schließlich schaffen innovative Unternehmen wie JUST mit ihrem innovativen Ei-Ersatzprodukt Hülsenfrüchte-basierte Produkte, die fantastisch schmecken. Hülsenfrüchte sind wirklich ein Gewinn für die Gesundheit von Mensch und Umwelt.\"\n\nNehmen wir zum Beispiel Lupinibohnen. Die klobige, gelblich gefärbte Bohne wird seit Urzeiten als eingelegter Snack, ähnlich wie Oliven, im Mittelmeerraum (das Wort \"lupini\" ist ihr italienischer Name) und Teilen Lateinamerikas gegessen. Straßenverkäufer auf der ganzen Welt, in Ländern wie Ecuador und Ägypten, verkaufen sie als Snack für Menschen unterwegs. Aber aus irgendeinem Grund hat ihre Beliebtheit sie nicht in den amerikanischen Mainstream getragen - bis jetzt.\n\nDas in Brooklyn ansässige Unternehmen BRAMi ist eine Marke, die jetzt marinierte Lupinibohnen auf dem US-Markt verkauft, und sie vermarkten sie als \"frischere Alternative zu getrockneten Snacks.\" Ihr CEO und Gründer Aaron Gatti wuchs damit auf, Lupinibohnen zusammen mit seiner Großmutter als Kind in Italien zu essen, und beschloss, sie in die USA zu bringen. Und es gibt gute Gründe, sie zum nächsten gesundheitsbewussten Snack zu machen, ähnlich wie Nüsse und Samen - sie enthalten mehr Protein und Ballaststoffe pro Kalorie als sowohl Kichererbsen als auch Mandeln. Sie passen zu mehreren verschiedenen beliebten Ernährungsstilen, einschließlich Keto, Paleo und natürlich vegan. Sie sind in verschiedenen Geschmacksrichtungen erhältlich, von Meersalz und Essig bis Chili und Limette, sodass es eine Vielzahl von Geschmäckern für den schnell gelangweilten Esser gibt.\n\nAber einer der Hauptgründe, warum Sie die Lupinibohne bald häufiger sehen werden, ist, dass sie eine wirtschaftliche Kulturpflanze ist, insbesondere angesichts des klimabewussten Zustands der Landwirtschaft heute. Die Lupini ist eine Niedrigbewässerungspflanze, hat natürliche Eigenschaften zur Abwehr von Schädlingen und bereichert den Boden. Darüber hinaus ist sie extrem nährstoffreich, und aus diesem Grund schlagen einige Wissenschaftler vor, dass sie als wirtschaftlich und umweltfreundliche Alternative zu Soja fungieren könnte.\n\nLUPii\n\nWährend BRAMi also der derzeitige Champion der Lupini ist, erwarten Sie, dass bald mehr Marken auf den Hülsenfrüchte-Zug aufspringen. LUPii beispielsweise hat im vergangenen Jahr seine schmackhaften und nahrhaften Lupini \"Bites\" angedeutet, aber seit diesem Monat sind sie über ihre Website sowie in einer Reihe von Einzelhändlern in New York City erhältlich.\n\nAber Hülsenfrüchte sind, so könnte man argumentieren, schon seit einiger Zeit ein unterbewerteter Schwergewicht im Food-Tech. Die Milchalternativen-Marke Ripple verwendet ein Protein aus gelben Erbsen, und Sie haben vielleicht bereits ihre Milch, Joghurt und saure Sahne in Geschäften gesehen. Es mag scheinen, als hätten wir bereits genug Milchoptionen, aber bedenken Sie, dass fast alles ein Problem für jemanden darstellt. Soja und Nüsse sind häufige Allergene, und viele Menschen haben immer noch Schwierigkeiten, Milch aus ihrer Ernährung zu streichen, weil sie einfach den Geschmack bevorzugen. Ganz zu schweigen davon, dass einige nicht-milchigen Milchbasen, wie Mandeln, aufgrund ihres intensiven Bewässerungsbedarfs extrem umweltschädlich sein können.\n\nGelbe Erbsen sind eine Niedrigbewässerungspflanze, und Ripple rühmt sich, dass ihre Produkte auch nicht-GMO sind und gleichzeitig reich an Protein und anderen Nährstoffen.\n\nJulie Mann, Global Strategy and Innovation Senior Manager für pflanzliche Proteine bei Ingredion, teilt dieses Gefühl. \"Hülsenfrüchte, wie die mächtige gelbe Erbse, bringen eine Vielzahl von Vorteilen. Falls Sie sich fragen, fallen die immer schwer fassbaren und faszinierenden Bohnen in die Kategorie der Hülsenfrüchte, zumindest wenn sie getrocknet sind. Das ursprüngliche Erbe der Hülsenfrüchte liegt in ihrer Fähigkeit, getrocknet zu werden und einer Zivilisation über einen Zeitraum hinweg (d.h. durch die Wintermonate) zur Verfügung zu stehen. Hülsenfrüchte sind im Wesentlichen getrocknete Versionen von essbaren Samenpflanzen aus der Familie der Hülsenfrüchte. Sie sind ein Superfood, das unter anderem Erbsen, Linsen, Kichererbsen und Faba-Bohnen umfasst. Sie sind ein wesentlicher Bestandteil des Puzzles, um die Verbraucherwünsche zu erfüllen: neue und neuartige Produkte, Gesundheit und Wellness, achtsamer Konsum, planetarisches Wohl und angenehme Esserlebnisse. Die Lebensmittelwissenschaftler, die im Hintergrund arbeiten, haben den Geschmack verbessert und versuchen, die Funktionalität besser zu verstehen. Dies ist entscheidend für die endgültige Lebensmittelqualität. Zum Beispiel sind technische Begriffe wie Wasserbindung und Emulgierung die Voraussetzungen für die Bereitstellung aller sensorischen Eigenschaften, die die Qualitäten liefern, die Verbraucher lieben, wie Cremigkeit und guten Geschmack in großartigen Smoothies oder die Reduzierung der \"mehligen\" Qualität, die das Ergebnis von Proteinpulvern sein kann. Die gelbe Erbse holt zu ihren historischen Proteinwettbewerbern auf und ist kein Bestandteil mehr, der minderwertige Produkte erzeugt. Dies ist entscheidend, denn die Verbraucher möchten keinen Kompromiss eingehen zwischen: gut für Gesundheit und Nachhaltigkeit oder gutem Geschmack und Textur. Sie wollen beides von ihren Lebensmitteln und Getränken. Die Verbraucher möchten mit neuartigen Zutaten begeistert werden, die sie sich gut über ihre Entscheidungen fühlen lassen, während sie ihre Erfahrungen erweitern und vertiefen.\"\n\nAls zusätzlichen Bonus hat das aus gelben Erbsen extrahierte Protein einen neutralen Geschmack, was es zu einer guten Basis für alle Arten von Lebensmitteln und Getränken macht. Ripple-Milch funktioniert wunderbar in Espresso-Getränken und als Zutat in der veganen Küche.\n\nAncient Harvest\n\nEine weitere alte Hülsenfrucht, die in letzter Zeit unerwartet in Lebensmitteln auftaucht: Linsen finden ihren Weg in die Pasta. Unternehmen wie Ancient Harvest, Modern Table und Tolerant Organics stellen getrocknete Pasta-Nudeln aus verschiedenen Linsensorten her, die eine proteinreiche, glutenfreie Alternative zu herkömmlicher verarbeiteter Weizenpasta bieten. Selbst diejenigen, die Gluten ohne Probleme essen können, können zu schätzen wissen, dass Linsenpasta mehr Protein und Ballaststoffe enthält und den Blutzucker nicht so schnell ansteigen lässt wie herkömmliche Pasta, da sie langsamer verdaut wird. Und sie ist immer noch pflanzlich. Das Gleiche gilt für RightRice, eine neue gemüsebasierte Reismarke, die mit der Kraft nahrhafter Hülsenfrüchte, einschließlich Linsen, gefüllt ist.\n\nHier ist eine Hülsenfrucht, von der Sie vielleicht noch nicht gehört haben, die aber in einer zunehmenden Anzahl von Produkten auftaucht: der Baru-Samen (oder -nuss). Laut Organic Traditions, einem Unternehmen, das eine Vielzahl von veganen Produkten in seinem Online-Marktplatz und darüber hinaus verkauft, sind Baru-Samen \"eine nährstoffreiche Hülsenfrucht, die indigen im Cerrado, der tropischen Savanne Brasiliens, wächst. Wild geerntet und handverlesen, haben diese Samen mehr verdauliches Protein im Vergleich zu Mandeln und Walnüssen und sind eine Quelle für Ballaststoffe, Eisen und Vitamin E.\" Diese Samen sind 100 % erdnussfrei für diejenigen, die möglicherweise allergisch sind, und schmecken dennoch sehr ähnlich! Es ist wahr, dass Baru-Samen allein gegessen werden können, aber sie werden auch als Zutat in einer Vielzahl von Backwaren, Riegeln, Desserts und Getränken verwendet.\n\nFür diejenigen, die Erdnüsse bevorzugen, sind sie ebenfalls eine Hülsenfrucht und ein Grundnahrungsmittel in unzähligen veganen Produkten. Denken Sie an Justin's, gegründet von Justin Gold, der sich auf eine Mission begeben hat, neue Sorten von Nussbutter zu kreieren, die nicht nur das Protein liefern, sondern auch großartig schmecken. Von dunklen Schokoladen-Erdnussbutter-Tassen bis hin zu klassischer Erdnussbutter ist dieses Saatgut, das sich als Nuss tarnt, so verbreitet wie ein pflanzliches Grundnahrungsmittel. Aber auch sie taucht in neuartigen Formen auf. Better Body Foods verkauft beispielsweise eine Produktlinie namens PBFIT, die sie als \"Erdnussbutter ohne die Liebesgriffe\" beschreibt. Es handelt sich im Wesentlichen um ganze geröstete Erdnüsse, die zu einem Pulver gepresst werden, weshalb sie 87 % weniger Fett als traditionelle Erdnussbutter und etwa 1/3 der Kalorien haben. Alles, was übrig bleibt, ist Erdnusspulver. ONE Brands, das kürzlich eine Reihe von pflanzlichen Riegeln namens ONE PLANT auf den Markt gebracht hat, verfolgt einen ähnlichen Ansatz. Der Geschmack Schokolade-Erdnussbutter enthält Erdnusspulver und kommt mit 12 Gramm Protein und dem charakteristischen ONE Gramm Zucker der Marke.\n\nAlso gewöhnen Sie sich daran, Ihre Erbsen (und sie zu trinken) auf eine Vielzahl neuer Arten zu essen. Lupinibohnen, Erbsen, Linsen, Baru-Samen, Erdnüsse und andere Hülsenfrüchte bieten einige aufregende Antworten auf die Probleme der modernen Lebensmittelsysteme - auf eine Weise könnten sie tatsächlich magisch sein.",
      "sektor": "Alternative Proteins",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 100.74,
      "radius": 0.806,
      "daten": "Jan 31st 2020  2 years ago",
      "titelOriginal": "Beans, Peas & Other Legumes"
    },
    {
      "id": "874305",
      "titel": "Weltraum und Mars-Kolonisation",
      "beschreibung": "Erforschung von 3D-Druckanwendungen für die Lebensmittelproduktion im Weltraum und auf dem Mars, Untersuchung der Machbarkeit der Verwendung lokal beschaffter Zutaten und 3D-Lebensmitteldrucker zur Unterstützung zukünftiger Weltraummissionen. Mit der Vision von Langzeit-Weltraummissionen und der Kolonisierung anderer Planeten untersuchen Forscher das Potenzial des 3D-Lebensmitteldrucks, um nahrhafte und anpassbare Mahlzeiten für Astronauten und potenzielle Mars-Siedler bereitzustellen. Während erhebliche technologische und logistische Herausforderungen bestehen bleiben, zeigt dieser Trend vielversprechende Ansätze und wird derzeit auf einem Reifegrad bewertet, der als niedrig eingestuft wird.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 126.79,
      "radius": 1,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "Space and Mars colonisation"
    },
    {
      "id": "1159083",
      "titel": "Kommt Fleisch aus dem 3D-Drucker bald in den Handel?",
      "beschreibung": "Ersatzfleisch aus dem 3D-Drucker, ganz ohne Tierquälerei und Antibiotika: Forscher sind weitergekommen bei der Suche nach biotechnologischen Fleisch-Alternativen. Doch eignen sie sich zur Massenproduktion?\n\nFür viele ist es die Leibspeise schlechthin: das saftige Schweinesteak oder der knusprige Rinderbraten. Egal ob vom Grill, aus der Pfanne oder langsam im Ofen gegart, Fleisch kommt bei vielen Deutschen regelmäßig auf den Tisch. Zwar ist der Pro-Kopf-Konsum in den vergangenen Jahren etwas zurückgegangen; trotzdem isst jeder Deutsche im Durchschnitt nach Zahlen der Bundesanstalt für Landwirtschaft und Ernährung immer noch 51,5 Kilogramm Fleisch pro Jahr - ungefähr das Gewicht eines halben Mastschweins.\n\nNach Alternativen zum Fleisch wird schon lange gesucht, vor allem aus Gesundheits-, Umweltschutz-, oder Tierwohlgründen. Auch zehn Wissenschaftler der Hochschule Reutlingen forschen seit etwa fünf Jahren an Ersatzprodukten. Genauer gesagt, an Ersatzfleisch aus dem 3D-Drucker. Und haben damit Erfolg. Mit ihrer Forschung wollen sie künftig kultiviertes Fleisch herstellen, das so schmeckt und so aussieht wie richtiges Fleisch. \"Der biotechnologische Prozess soll antibiotikafrei und mit angepassten Nährmedien frei von tierischen Bestandteilen, kostengünstig und lebensmittelkonform sein,\" sagt Petra Kluger, die Leiterin des Projekts.\n\n\n\n\n\n    [02.05.2024\n\n\n\n\nJahresumsatz steigt Deutsche greifen öfter zu Fleischalternativen\n\n2023 wurden laut Statistischem Bundesamt 16,6 Prozent mehr Fleischersatzprodukte produziert als im Vorjahr. mehr](https://www.tagesschau.de/wirtschaft/verbraucher/fleischersatz-beliebter-100.html)\n\n\nKultiviertes Fett als \"Biotinte\" für den 3D-Drucker\n\nAm Anfang stehen Schlachtabfälle vom Schlachthof. Aus diesen konnten die Forscher mittels Zerkleinerns und eines enzymatischen Verdauungsprozesses sogenannte Vorläuferzellen extrahieren. Diese können vom Körper normalerweise zu allen möglichen Zellen weiterentwickelt werden, auch zu Fettzellen. Die Forscher an der Hochschule Reutlingen haben nun herausgefunden, wie sie außerhalb des Körpers das Wachstum von Fettzellen anregen können. Dafür haben sie die Vorläuferzellen in einem speziell entwickelten Nährmedium kultiviert und dadurch die Reifung zu Fettzellen erzeugt.\n\nIn einem nächsten Schritt konnten sie diese Fettzellen in einem speziellen Bioreaktor miteinander verklumpen lassen, zu sogenannten Sphäroiden. \"Das war neu. Und dass man solche Sphäroiden in eine essbare Biotinte mischt und diese dann verdrucken kann, das war auch neu,\" sagt Projektleiterin Kluger stolz. \"Verdrucken\" heißt, diese \"Biotinte\" wird anschließend in einem 3D-Drucker zum Endproduckt - dem künstlichen Stück Fleisch. Das Problem dabei: Für die Biotinte braucht man jede Menge Sphäroiden, und die Herstellung ist sehr kompliziert und aufwändig.\n\n\n\n\nFortschritt mit Hindernissen\n\nKluger weist auch auf weitere Hindernisse hin. Unter anderem seien da Widerstände in der Gesellschaft. Sie weiß, dass Biotechnologie den Menschen eher Angst macht und oft auf Ablehnung stößt. Die Reutlinger Professorin zieht deshalb einen Vergleich, der zeigen soll, wie harmlos die Herstellung von kultiviertem Fett in ihren Augen ist. \"Es ist ein biotechnologischer Prozess wie Bierbrauen. Jeder trinkt gern sein Bier, und das ist ja ein altbekannter biotechnologischer Prozess.\" Außerdem würden solche Nahrungsmittel vor der Markteinführung strengen offiziellen Tests und Auflagen unterzogen, so dass Kluger sich sicher ist: Die Sorgen vor ihrer Technologie sind unbegründet.\n\nBis wirklich Fleisch in großen Mengen hergestellt werden kann, wird es noch Jahre dauern, befürchtet Kluger. Der Prozess sei sehr zeit- und kostenaufwendig. Außerdem befinde man sich erst am Anfang und brauche noch mindestens drei bis fünf Jahre intensiver Forschung, um den Prozess auf ein massentaugliches Niveau hieven zu können. Aber jetzt habe man gezeigt, es geht, und darauf lasse sich aufbauen. \"Ich sage immer, die ersten Autos aus Holz am Anfang, die sind ja auch gefahren mit einer quietschenden Hupe. Und alle haben gesagt, so ein Quatsch, ich hab ja meine Pferdekutsche. Nach den ersten Autos sind ja erst mal ein paar Jahre vergangen, bis sie sich wirklich durchgesetzt haben. Und wir sind eben auch noch recht am Anfang.\"\n\n\n\n\nEine Forschung zwischen Kritik und Vorteilen\n\nAber das Ziel ist verlockend: Antibiotikafreies Fleisch könnte erzeugt werden, ohne Tiere quälen zu müssen. Gleichzeitig hat die Technologie das Potenzial, weniger schädlich für Natur und Klima zu sein. Wissenschaftlerin Kluger sieht in ihrer neuen Technologie vielfältige Möglichkeiten. Für sie ist es am Anfang auch nicht notwendig, ein Steak aus 100 Prozent kultivierten Fett- und Muskelzellen zu drucken. Ein Drittel würde ihr reichen, betont sie. Der Rest käme dann aus pflanzlichen Substanzen. \"Das gibt ja den landwirtschaftlichen Betrieben durchaus die Möglichkeit, zusätzlich auch in dieser Sparte tätig zu sein.\"\n\nEin Kritikpunkt bezieht sich bei der Kultivierung von Zellen auf das Nährmedium, mit dem die Sphäroiden gebildet werden. Dieses Medium besteht derzeit noch aus FCS, dem fötalen Kälberserum. Es wird aus dem Blut ungeborener Kälber gewonnen und steht vor allem aus ethischen Gründen in der Kritik. Jedoch enthält es zahlreiche Wachstumsfaktoren, Vitamine, Aminosäuren und andere Nährstoffe, die ideal für das Zellwachstum sind. Kluger und ihr Team haben zum Ziel, künftig mit alternativen Nährmedien die Fettzellen zu bilden. \"Wir machen seit Monaten Experimente, das wegzukriegen. Natürlich so, dass es für Lebensmittel passt, also mit für Lebensmittel zugelassenen Bestandteilen wie beispielsweise Algenextrakten. Aber das ist auch eine große Baustelle.\"",
      "sektor": "Additive Manufacturing",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 129.92,
      "radius": 0.7913,
      "daten": "newspaper Dec 1st 2024  Mar 6th 2025  a year ago"
    },
    {
      "id": "910679",
      "titel": "KI-gestützte Präzisionslandwirtschaft",
      "beschreibung": "„Wir betrachten nicht nur, was Landwirte in ihre Felder einsetzen, sondern helfen ihnen, informierte Entscheidungen zu treffen, basierend darauf, was sie erwarten können, daraus zu gewinnen“, sagt Dr. Itay Miyara, CEO von Grofit, der ein intelligentes datengestütztes Agrarsystem entwickelt.\n\nGrofit entwickelt Sensoren und Software für die Präzisionslandwirtschaft in Gewächshäusern. Die IoT-Plattform nutzt kleine, einfache, kostengünstige Sensorstationen zur Messung wichtiger Umwelt- und Pflanzenwachstumsparameter wie Lufttemperatur, Strahlung, relative Luftfeuchtigkeit, Bodenbewässerung, Düngung und mehr.\n\nWenige Berufe haben eine so lange Geschichte wie die Landwirtschaft. Seit etwa 12.000 Jahren engagieren sich Männer, Frauen und Kinder weltweit kontinuierlich in der Landwirtschaft, die Nahrung auf unsere Tische bringt – und die das enorme Wachstum der menschlichen Bevölkerung auf dem Globus untermauert hat. Während der meisten dieser Zeit haben Landwirte ihre Pflanzen mit denselben einfachen Werkzeugen, hauptsächlich der Hacke und dem Pflug, angebaut. Bis vor kurzem, als das Feld, bildlich gesprochen, begann, sich zu verändern.\n\n„Technologie beginnt, massiv in die Welt der Landwirtschaft einzudringen und tiefgreifende und weitreichende Veränderungen zu schaffen“, sagt Itay Miyara, CEO von Grofit, einem führenden Anbieter von präzisen Agrardienstleistungen. „Dieser Durchbruch erfolgt über Sensoren, IoT-Tools und Datensysteme, die alle darauf ausgelegt sind, die Entscheidungsfindung der Landwirte zu unterstützen. Wir steuern auf eine veränderte Realität zu, in der Landwirte von Daten geleitet werden.“\n\nGrofit arbeitet an der Schnittstelle von Landwirtschaft und Information und zielt darauf ab, Landwirten zu helfen, Technologie praktisch und nützlich zu nutzen. „Wir haben festgestellt, dass der Zugang zu Daten allein nicht ausreicht“, sagt Miyara. „Landwirte wollen wissen, wie sie bessere Pflanzen anbauen und wie sie ihr Land optimal nutzen können. Die Weltbevölkerung wächst, landwirtschaftliche Flächen sind relativ klein und es besteht akuter Bedarf, die Erträge überall zu maximieren. Dies ist die Herausforderung, der wir mit unserem Wissen und unserer Technologie begegnen.“\n\nGrofit entwickelt ein System namens Virtual Plant (Zemach Virtualy, auf Hebräisch), das eine digitale Darstellung der Pflanze in einem Feld erstellt, die mit der tatsächlichen Pflanze identisch ist. „Die virtuelle Pflanze ermöglicht es dem Landwirt, genau vorherzusagen, wie die echte Pflanze wachsen wird“, sagt Miyara. „So kombinieren sie ihre Erfahrung und agronomisches Wissen mit den Informationen, die unser System ihnen über die zukünftige Entwicklung jedes ihrer Felder gibt, und können ihre landwirtschaftlichen Entscheidungen entsprechend treffen.“\n\nDas Markenzeichen von Grofits Technologie ist ihre Einfachheit, sagt Avihay Hazan, Mitbegründer des Unternehmens und Chefagrarwissenschaftler. „Wir haben Hunderte von Feldern besucht und mit Hunderten von Landwirten gesprochen, die bereit waren, Technologie zur Verbesserung ihrer Entscheidungsfindung zu nutzen, aber alle behaupteten, dass bestehende Systeme zu kompliziert seien“, sagt er. „Das hat uns gelehrt, dass jede Technologie, die ein Landwirt im Feld einsetzt, um informierte Entscheidungen zu treffen, einfach und unkompliziert zu bedienen sein muss. Sobald Sie eine benutzerfreundliche Technologie haben, die genaue und leicht verständliche Informationen liefert, sind der Fantasie keine Grenzen gesetzt!“\n\nGrofit nutzt IoT, KI, Machine Learning und Datenverarbeitung, um Landwirten durch sein Ökosystem aus sechs Komponenten prädiktive Einblicke zu bieten. Die Grofit Capsule, eine dieser Komponenten, ist eine intelligente Feldüberwachungstechnologie in der Größe einer Coca-Cola-Dose, die in einer Minute installiert und eingeschaltet werden kann und Daten über Klima und Boden sammelt. Das Ökosystem umfasst auch das Agro Data System, das Agro Management System, die Grofit API und den kommenden Grofit Virtual Twin. Diese Komponenten arbeiten nahtlos zusammen, um Landwirten unvergleichliche Einblicke und Unterstützung für datengestützte Landwirtschaft zu bieten. Von dem Moment an, in dem das System installiert ist, tritt der Landwirt, so Miyara, vom Jahr 1980 ins Jahr 2023 ein. „Unsere Kapsel hebt die Landwirtschaft effektiv auf die nächste Stufe.“\n\nDas System lernt mit voller Kraft\n\nWährend es viele Versuche gegeben hat, Daten intelligent in der Landwirtschaft zu nutzen, sagt Grofits CTO und KI-Experte Amizorach Gross, ist Grofit der erste, der Fragen beantwortet, die für die tägliche Arbeit in der Landwirtschaft relevant sind.\n\n„Ich war schockiert über die begrenzte Menge an Daten, die in der Landwirtschaft aus den Feldern gesammelt werden“, sagt er. „Fast jede andere Branche hat seit Jahren die notwendigen Daten gesammelt, aber nicht in der Landwirtschaft.“ Er glaubt, dass der Grund dafür ist, dass wir uninteressante Fragen gestellt haben. Während Datensysteme existieren, um Landwirte bei der Bewässerung und Düngung zu unterstützen, beantworten diese Systeme nicht die wichtigste Frage für Landwirte, nämlich wie Veränderungen des Wasserstands die Erträge beeinflussen. Stattdessen haben Landwirte sich auf ihre eigene Erfahrung und traditionelle Werkzeuge verlassen, um solche Fragen zu beantworten. Infolgedessen hat niemand Daten genutzt, um ihre Entscheidungen zu informieren.\n\nHeute zeigt Grofits Machine Learning das Potenzial, genaue Antworten für jede Pflanze, jeden Strauch und jede Ernte zu liefern, indem es Gleichungen formuliert, die die tatsächliche Funktion der Pflanze analysieren. Laut Gross haben sie entdeckt, dass gängige Begriffe wie maximale Temperatur und hohe Luftfeuchtigkeit bedeutungslos sind, um den Ertrag des Landwirts vorherzusagen, da keiner dieser Faktoren für sich allein die Pflanze beeinflusst. Stattdessen ist es die Kombination von Faktoren, die einen neuen Sensor schafft, der einen spezifischen Einfluss auf die Pflanze hat. Um dies anzugehen, hat Grofit ein System entwickelt, das Informationen sammelt, ohne zu entscheiden, was wichtig ist oder nicht. Das System lernt schnell und zieht Schlussfolgerungen, wodurch neue Sensoren entstehen, die eine weitere Vorhersage des Wachstums und Ertrags der Pflanze ermöglichen.\n\nGrofits Ergebnisse sind beeindruckend, sagt er. „Sehr einfache Maßnahmen im Wachstumsprozess haben sich als signifikant herausgestellt. Weltböden beispielsweise werden in mehrere Typen klassifiziert – und wir haben einen Bodenstempel für die Wasseraufnahme produziert, der es ermöglicht, jeden einzelnen Boden zu kategorisieren, was es den Landwirten sehr einfach macht. Mit den Virtual Plant-Tools werden zukünftige Landwirte entscheiden können, ob sie beispielsweise eine etwas größere oder weniger süße Tomate möchten, und genau das bekommen.“\n\nGrofit, mit internationaler Präsenz, bedient einige der größten Agrarunternehmen weltweit, darunter Syngenta, Bayer und Hazera, unter vielen anderen. Die Technologie von Grofit wird auch von den meisten israelischen F&E-Regionalstationen übernommen, und das Unternehmen war an Pilotprojekten mit Genossenschaften wie UNICA in Spanien beteiligt. Cajamar Innova, eine EU-explorative Organisation, unterstützt die Aktivitäten des Unternehmens in Spanien, während die Israel Innovation Authority das F&E-Zentrum in Israel unterstützt. Dieser facettenreiche Ansatz ermöglicht es Grofit, Landwirten weltweit modernste Lösungen anzubieten, indem es KI, ML und Datenverarbeitung nutzt, um prädiktive Einblicke und Empfehlungen für das Ernte-Management bereitzustellen.\n\nLaut Miyara stellt die von Virtual Plant entwickelte Technologie nichts weniger als eine Revolution in der Landwirtschaft dar. Durch die Bereitstellung von Prognosen und Simulationen auf der Grundlage solider Daten können Landwirte informierte Entscheidungen treffen und ihre Ernten effektiver verwalten. Mit dieser Technologie können Landwirte das Verhalten ihrer Pflanzen voraussehen, entsprechend planen und die gewünschten Ergebnisse erzielen. „Dieser Wandel hin zu datengestützten Entscheidungen markiert einen signifikanten Bruch mit traditionellen landwirtschaftlichen Praktiken und ermöglicht einen klareren Blick in die Zukunft.“\n\nBesuchen Sie die Website >>\n\nPartner von Grofit",
      "sektor": "Digitalisation/AI",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 168.12,
      "radius": 0.8129,
      "daten": "newspaper Apr 19th 2023  Feb 23rd 2024  a year ago",
      "titelOriginal": "AI Precision Farming"
    },
    {
      "id": "149673",
      "titel": "Personalisierte Ernährung",
      "beschreibung": "Das israelische Weizmann-Institut für Wissenschaften hat ein Projekt zu Mikrobiomen von prädiabetischen Personen gestartet. Das Projekt trägt den Namen \"The Personalized Nutrition Project\" und die ersten Ergebnisse deuten vielversprechend darauf hin, dass eine personalisierte Ernährung basierend auf einem Algorithmus und Daten des Mikrobioms des Darms empfohlen werden kann.",
      "sektor": "Personalisation",
      "ebene": "signal",
      "groesse": "l",
      "winkel": 69.3,
      "radius": 0.6953,
      "daten": "Nov 27th 2019  5 months ago",
      "titelOriginal": "Personalised Nutrition"
    },
    {
      "id": "141749",
      "titel": "Laborgezüchtetes Fleisch & Insekten",
      "beschreibung": "Aufgrund der wachsenden Bevölkerung wird der Fleischkonsum in Zukunft weiterhin stetig zunehmen. Gleichzeitig werden Ressourcenschonung, Umweltverträglichkeit und die Vermeidung sozialer Ungerechtigkeiten beim Lebensmittelkauf für die Verbraucher immer wichtiger. Das Clean Meat könnte eine Alternative dazu werden: Fleisch, das künstlich im Labor produziert wird. Zahlreiche Wissenschaftler arbeiten bereits an der Herstellung von Fleisch, das im Reagenzglas aus Stammzellen von Rindern, Schweinen oder Hühnern gewonnen wird.\n\nDarüber hinaus werden Insekten als effiziente, nahrhafte und umweltfreundliche Proteinquelle als wichtige Zutat in der zukünftigen Ernährung diskutiert.",
      "sektor": "Alternative Proteins",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 94.66,
      "radius": 0.8104,
      "daten": "Aug 14th 2019  2 years ago",
      "titelOriginal": "Lab-grown Meat & Insects"
    },
    {
      "id": "910671",
      "titel": "Alternativen zu Protein sensationell machen",
      "beschreibung": "Lernen Sie Enzymofit kennen\n\nOhne die Notwendigkeit von Zusatzstoffen und aufwendiger Verarbeitung hilft Enzymofit Produzenten, den Hunger der Verbraucher nach umweltfreundlicheren, saubereren und qualitativ hochwertigen Alternativfleischprodukten zu stillen, indem es sensorische Eigenschaften liefert, die dem Original ähneln.\n\n\nVerwandeln Sie Lebensmittel von \"genießbar\" zu lecker\nund nachhaltig nahrhafter!\n\n\nWas tun wir?\n\nWir helfen pflanzenbasierten Produkten,\n\nTierprodukte besser nachzuahmen, indem wir maßgeschneiderte\nBiokatalysatorlösungen in die Produktion einführen.\n\n\nHerausforderungen bei idealen pflanzenbasierten Analogprodukten angehen\n\nEigene Biokatalysatorlösungen für:\n\nAlternative Proteine\n\nVerbesserte \"Fleischigkeit\", Struktur, Bindung, Verdickung und andere Eigenschaften in Fleisch-, Fisch- und Eiersubstituten\n\nTierähnliche Fette\n\nPflanzenbasierte Fette, die sich wie tierische Fette verhalten, mit überlegener Konsistenz, Heizverhalten und Schmelzeigenschaften\n\nKomplexe Zucker\n\nClean Label-Kohlenhydrate, Fasern, Gummis und andere biofunktionale Alternativzutaten mit Eigenschaften, die typischerweise tierischen Produkten eigen sind\n\n\nGründer und Führungsteam\n\n\nWir würden uns freuen, von Ihnen zu hören!\n\nHallo",
      "sektor": "Alternative Proteins",
      "ebene": "signal",
      "groesse": "s",
      "winkel": 98.83,
      "radius": 0.3341,
      "daten": "Feb 23rd 2024  2 years ago",
      "titelOriginal": "Making alt-protein sensational"
    },
    {
      "id": "874271",
      "titel": "3D-gedruckte vertikale Farmen",
      "beschreibung": "3D-gedruckte vertikale Farmen untersuchen die Integration von additiven Fertigungstechnologien in die Innenlandwirtschaft. Mit 3D-Druck können maßgeschneiderte Strukturen und Behälter geschaffen werden, die auf spezifische Räume und Wachstumsanforderungen abgestimmt sind. Die Fähigkeit, verschiedene landwirtschaftliche Komponenten und Strukturen im 3D-Druck herzustellen, könnte eine effizientere Ressourcennutzung ermöglichen und die lokale Lebensmittelproduktion fördern. Dieser Trend befindet sich jedoch noch in der frühen Phase, mit begrenzten praktischen Anwendungen und potenziellen Herausforderungen in Bezug auf Kosten und Skalierbarkeit.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 128.92,
      "radius": 0.9627,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "3D-printed vertical farms"
    },
    {
      "id": "141750",
      "titel": "Essen aus dem 3D-Drucker",
      "beschreibung": "Das heutige Fast Food wird in 20 Jahren durch den 3D-Drucker ersetzt. Beispielsweise ermöglicht das Startup-Unternehmen BeeHex bereits, Ihre Lieblingspizza mit einer App zu personalisieren. Ein Robo-Cook druckt schließlich die Pizza aus, die natürlich dem individuellen Ernährungsplan entspricht.",
      "sektor": "Additive Manufacturing",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 141.89,
      "radius": 0.7078,
      "daten": "Aug 14th 2019  5 months ago",
      "titelOriginal": "Food from 3D printer"
    },
    {
      "id": "874243",
      "titel": "KI-gestützte Farmmanagement-Systeme",
      "beschreibung": "KI-gestützte Farmmanagement-Systeme integrieren verschiedene Datenströme, wie Wettervorhersagen, Bodendaten, Überwachung der Pflanzen Gesundheit und Markttrends, um Landwirten personalisierte Einblicke und Empfehlungen zu bieten. Diese Systeme nutzen künstliche Intelligenz und Machine Learning, um große Datensätze zu analysieren und Landwirten zu helfen, Pflanzenwahl, Bewässerungspläne und Ressourcenzuteilung zu optimieren. Da datengestützte Entscheidungsfindung in der Landwirtschaft immer wichtiger wird, werden KI-gestützte Farmmanagement-Systeme zunehmend übernommen, was diesen Trend im Agrarsektor sehr ausgereift macht.",
      "sektor": "Digitalisation/AI",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 170.94,
      "radius": 0.5761,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "AI Farm Management Systems"
    },
    {
      "id": "989629",
      "titel": "KI-Veterinärtechnologie",
      "beschreibung": "Neben der frühen Identifizierung von Krankheiten überwacht die neue Technologie positive Verbesserungen im Verhalten von Kühen und schlägt Möglichkeiten vor, um das Komfortniveau zu erhöhen und Krankheiten zu mildern.\nKameras auf den Farmen erzeugen 24-Stunden-Einblicke und Analysen, die informiertere Entscheidungen im Management der Tiere ermöglichen.\nDer Einzelhändler hat in den letzten Jahren mehrere Millionen Pfund in seine Milchbauern investiert, einschließlich eines fortlaufenden jährlichen Investments von 6 Millionen Pfund in Löhne und Nachhaltigkeitsboni.*\n\nSainsbury’s ist der erste Einzelhändler der Welt, der in neue KI-Veterinärtechnologie investiert, die zur Messung und Verbesserung des positiven Tierschutzes auf Milchfarmen eingesetzt wird und die Herangehensweise an die Rinderpflege revolutionieren könnte.\n\nIn Partnerschaft mit Vet Vision AI, einem neuen Spin-off-Unternehmen der Universität Nottingham, testet Sainsbury’s eine neue Technologie, die entwickelt wurde, um zu erkennen, wann Kühe glücklich und gesund sind und warum. Die Kühe werden durch kostengünstige und tragbare Kameras überwacht, die von Tierärzten auf mehreren Farmen eingesetzt werden können.\n\nDie KI funktioniert, indem sie Verhaltensmuster erkennt, analysiert und Videomaterial in Echtzeit in präzise Daten umwandelt. Neben der Verhaltensüberwachung bietet die KI den Landwirten Vorschläge zur weiteren Verbesserung des Lebensstils der Tiere. Beispiele hierfür sind Verbesserungen der Unterbringung für mehr Komfort und Tierengagement sowie die Bereitstellung von Bereicherungen wie Kuhbürsten, ähnlich einem Rückenkratzer, um Stress zu reduzieren.\n\nDie Möglichkeit der 24-Stunden-Überwachung ermöglicht informiertere Entscheidungen, da Landwirte einzigartige Einblicke in das Wohlergehen der Kühe erhalten, die sie möglicherweise bei herkömmlichen Tierarztbesuchen nicht identifizieren können. Die kontinuierliche Analyse des Verhaltens ermöglicht auch einen „Test- und Lern“-Ansatz für die vorgeschlagenen Tierschutzmaßnahmen.\n\nDie Nutzung von KI auf Farmen ist ein wachsendes Gebiet, aber was diese Technologie auszeichnet, ist die Fähigkeit zu zeigen, wann eine Kuh gedeiht, anstatt nur Krankheiten und Beschwerden zu erkennen. Die ständige Überwachung kann auch Krankheiten frühzeitig identifizieren, wodurch Tierärzte später keine Behandlungen mehr durchführen müssen.\n\nÜber die Vorteile für das Tier hinaus fördert die Technologie einen Schritt in Richtung Effizienz in der Landwirtschaft, da eine gesunde Kuh eine produktivere Kuh bedeutet. Wenn die KI beispielsweise empfiehlt, den Komfort der Kühe durch erhöhte Liegezeiten zu verbessern, könnte dies zu einer besseren Bein-Gesundheit und mehr Milchproduktion bei der gleichen Menge Futter führen, da die Kuh stärker auf ihren Klauen ist.\n\nDerzeit wird die Technologie auf 30 Farmen der Dairy Development Group von Sainsbury’s eingesetzt, mit dem Ziel, sie im nächsten Jahr weiter auszurollen. Die SDDG wurde 2007 gegründet, um den Landwirten mehr Unterstützung zu bieten. Sie umfasst etwa 170 Farmen, die Sainsbury’s mit eigener Markenmilch beliefern.\n\nDr. Matt Turner, Tierarzt und Landwirtschaftsmanager bei Sainsbury’s, sagte: „In britische Landwirtschaft zu investieren und die Gesundheit und das Wohlbefinden der Tiere kontinuierlich zu verbessern, sind unsere wichtigsten Prioritäten, und diese innovative neue Technologie wird es uns ermöglichen, sowohl Landwirten als auch Tieren zu helfen.\n\n„Unsere Milchbauern, die die Technologie nutzen, sehen bereits echte Vorteile, und wir freuen uns darauf, sie bald auf unser größeres Netzwerk von Dairy Development Group-Farmen auszuweiten.“\n\nDr. Tom Angel, Tierarzt bei Synergy Farm Health, sagte: „Vet Vision AI hat es uns ermöglicht, positives Tierwohl auf Farmen zu identifizieren, wie z.B. erhöhte Liegezeiten und den Komfort der Kühe, sowie Managementfaktoren, die angegangen werden müssen, um diese Ergebnisse zu verbessern. Der Einsatz der Computer Vision-Technologie hat es dann ermöglicht, die Auswirkungen von Änderungen, die wir umgesetzt haben, objektiv zu bewerten und zu zeigen, wie die Tiere positiv auf die Umwelt- und Managementänderungen reagiert haben.“\n\nDr. James Breen, Professor für Rindergesundheit an der Universität Nottingham, sagte: „Ich habe begonnen, diese KI-Technologie bei Milchviehgesundheitskunden im Rahmen unserer routinemäßigen Überwachung von Gesundheit und Wohlbefinden zu verwenden. Die Fähigkeit des Systems, das natürliche Verhalten der Kühe zu beobachten, ohne die Tiere zu stören, und diese Beobachtungen in harte Ergebnisse umzuwandeln, ist von großem Wert bei der Planung von Interventionen zur Verbesserung der Fußgesundheit, der Euter-Gesundheit, der Fruchtbarkeitsleistung usw.“\n\nDave Bacon, Milchbauer auf Gleadthorpe Farm, sagte: „Ich weiß, dass glückliche, komfortable Kühe mehr Milch produzieren, aber das genaue Messen und Wissen, wie man den Komfort der Kühe verbessern kann, kann herausfordernd sein. Mit Vet Vision AI konnten wir messen, wie sich die Komfortniveaus verbesserten, nachdem wir unsere Unterbringung aufgerüstet und neue Kuhmatratzen eingelegt hatten. Zu wissen, dass meine Kühe dadurch komfortabler sind, gibt mir das Vertrauen, dass die Investition sich gelohnt hat.“\n\nDiese Initiative ist das neueste Beispiel dafür, wie Sainsbury’s britische Landwirte unterstützt. Für weitere Informationen besuchen Sie: https://www.about.sainsburys.co.uk/sustainability/better-for-the-planet/agriculture.\n\nEnde\n\nHinweise für Redakteure\n\n* Sainsbury’s investiert jährlich zusätzlich 6 Millionen Pfund in seine Milchbauern und fördert langfristige Unterstützung für die Branche | Sainsbury's (sainsburys.co.uk)",
      "sektor": "Digitalisation/AI",
      "ebene": "cluster",
      "groesse": "m",
      "winkel": 153.65,
      "radius": 0.7913,
      "daten": "newspaper Jul 1st 2024  Aug 15th 2024  2 years ago",
      "titelOriginal": "AI Veterinary Technology"
    },
    {
      "id": "141761",
      "titel": "Proteinquellen",
      "beschreibung": "Laut einer Studie in Deutschland stellen sich mehr als die Hälfte der Teilnehmer eine gesunde und ressourcensparende Mischernährung in der Zukunft vor. Im Hinblick auf Tiere und Natur werden Produkte aus In-vitro-Fleisch oder Proteinquellen wie Algen und Insekten zunehmend an Bedeutung gewinnen.\n\nIm Jahr 2010 stellte das Fraunhofer-Institut fest, dass der Fleischkonsum in der Wertschöpfungskette nicht effizient oder nachhaltig ist. Der hohe Fleischkonsum erfordert auch große Anbauflächen für Tierfutter und trägt zudem erheblich zu den Treibhausgasemissionen und dem enormen Wasserverbrauch durch Wiederkäuer bei. Die zukünftige Lebensmittelproduktion wird bessere, maßgeschneiderte Lösungen benötigen, die stärker in die Produktionsprozesse integriert sind.\n\nLaut der Studie \"Concept Kitchen 2025\" von IKEA ist es offensichtlich nicht nachhaltig, dass die gesamte Welt so viel rotes Fleisch isst, wie es die entwickelte Welt derzeit tut. Entwicklungen in der Lebensmittelverarbeitung und alternative Proteinquellen werden kostengünstige Fleischalternativen bieten. Die Herstellungsattraktivität wird der Schlüssel sein. Wie könnten wir Diäten gestalten, die nicht um Fleisch kreisen?\n\n+++ Schlüsselwörter (später zu löschen) +++\n\nProteinressourcen / Wasser / Klimawandel",
      "sektor": "Alternative Proteins",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 96.76,
      "radius": 0.4742,
      "daten": "Aug 15th 2019  2 months ago",
      "titelOriginal": "Protein Sources"
    },
    {
      "id": "989780",
      "titel": "Personalisierung von Produkten",
      "beschreibung": "Die Neuigkeit ist, dass TOP aus Wageningen in den Niederlanden eine neue Möglichkeit für unternehmerische Milchbauern eingeführt hat: die Pasteurisierung und Verpackung von Milch von einzelnen Kühen. Dies scheint ein weiteres Element zu sein, um ein Kundenerlebnis durch Personalisierung zu bieten. Ein Milchverbraucher könnte denken, dass eine bestimmte Kuh die schmackhafteste Milch liefert, und diese dann direkt bestellen.\n\nÄhnlich wie die Snickers-Riegel mit lustigen Worten darauf, bietet es dem Verbraucher die Möglichkeit, das Produkt zu kaufen, das am direktesten zu ihm spricht, während er gleichzeitig seine geliebten Leckereien genießt.\n\nEs gibt also die Möglichkeit, Kunden durch Neuheitswert zu gewinnen und sie dann durch Qualitätsprodukte zu halten. Auch Marmite hat diese Idee aufgegriffen, ebenso wie Coca-Cola. Tatsächlich hat die Personalisierung die Softdrink-Industrie erreicht, und Millennials kaufen Erlebnisse, die für sie von Bedeutung sind. Und was könnte mehr bedeuten, als Milch zu trinken, die an einem bestimmten Tag von einer einzelnen Kuh produziert wurde?\n\nIn einer Welt, in der es mehr anonyme Erfahrungen mit massenproduzierten Produkten gibt, ist der Trend der Verbraucher, eine personalisierte, maßgeschneiderte Erfahrung zu suchen, größer denn je. Milchverarbeiter, insbesondere solche mit kleineren geografischen Gebieten, können diese Erfahrungen bieten. Ich freue mich darauf, bald meine Milch von Elsie der Kuh zu trinken.\n\n\nVerwandte Inhalte",
      "sektor": "Personalisation",
      "ebene": "trend",
      "groesse": "s",
      "winkel": 67.69,
      "radius": 0.5991,
      "daten": "newspaper Jun 18th 2018  Aug 15th 2024  2 years ago",
      "titelOriginal": "Customization of products"
    },
    {
      "id": "989631",
      "titel": "Biologisch abbaubare Verpackungen",
      "beschreibung": "5. Biologisch abbaubare Milchflaschen\n\nEin österreichisches Unternehmen \"Naku - Made of Natural Plastic\" hat einen Bioplastikbehälter für Milchprodukte auf den Markt gebracht. Er besteht aus Milchsäure, die aus pflanzlichem Zucker und Stärke gewonnen wird. Die Verpackung ist frei von synthetischen Weichmachern, 20 Mal leichter als Glas und 10 Mal günstiger als Plastik. Sie ist vollständig biologisch abbaubar.\nBildnachweis: NaKu",
      "sektor": "Sustainability",
      "ebene": "trend",
      "groesse": "s",
      "winkel": 45.68,
      "radius": 0.3024,
      "daten": "newspaper Apr 3rd 2024  Aug 15th 2024  2 years ago",
      "titelOriginal": "Biodegradable packaging"
    },
    {
      "id": "874316",
      "titel": "Intelligente Verpackungen mit Lebensmittelsensoren",
      "beschreibung": "Die Integration von Sensoren und Indikatoren in Lebensmittelverpackungen zur Überwachung von Frische, Verderb und Sicherheit. Intelligente Verpackungstechnologien bieten Verbrauchern und Einzelhändlern Echtzeitinformationen zur Lebensmittelqualität, reduzieren Lebensmittelverschwendung und gewährleisten die Lebensmittelsicherheit. Mit dem Fortschritt der Sensortechnologien reift dieser Trend auf einem als mittel eingestuften Trendreifegrad.",
      "sektor": "Sustainability",
      "ebene": "signal",
      "groesse": "m",
      "winkel": 40.74,
      "radius": 0.5111,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "Smart packaging with food quality sensors"
    },
    {
      "id": "874287",
      "titel": "KI-gestützte Reduzierung von Lebensmittelverschwendung",
      "beschreibung": "Die Nutzung von künstlicher Intelligenz und Datenanalytik zur Optimierung von Lebensmittelversorgungsketten, Minimierung von Lebensmittelverschwendung und Verbesserung des Bestandsmanagements in der Lebensmittelindustrie. KI-gestützte Lösungen können die Nachfrage vorhersagen, Haltbarkeitsdaten verfolgen und die Verteilung optimieren, wodurch Lebensmittelverschwendung in verschiedenen Phasen der Lieferkette reduziert wird. Mit den fortschreitenden technologischen Entwicklungen reift dieser Trend auf einem als mittel eingestuften Reifegrad.\n\nDie Zukunft der Lebensmittel ist ein komplexes und kritisches Thema, das Herausforderungen wie Bevölkerungswachstum, Klimawandel und nicht nachhaltige Landwirtschaftspraktiken umfasst. Mögliche Szenarien beinhalten nachhaltige Landwirtschaft, alternative Proteinquellen und Fortschritte in der Biotechnologie. Dies wird Branchen wie Landwirtschaft, Fleisch- und Milchprodukte sowie Food-Tech beeinflussen. Einige sprechen sich gegen bestimmte Szenarien aus, aufgrund von Sicherheitsbedenken oder Widerstand gegen Veränderungen. Zusammenarbeit und Überlegungen sind notwendig für eine ausgewogene und resiliente Lebensmittelzukunft. (Zukunft der Lebensmittel)\n\nBlockchain-Technologie hat das Potenzial, die Lebensmittelversorgungskette zu transformieren und Lebensmittelverschwendung zu reduzieren, indem sie Transparenz, Effizienz und Verantwortlichkeit erhöht. Einige Anwendungen von Blockchain in diesem Kontext umfassen die Echtzeitverfolgung von Lebensmittelprodukten, Automatisierung von Bestellungen und Verträgen, Überwachung der Temperatur während des Transports, Erleichterung von Rückrufen, Verfolgung von Spenden und der Umverteilung von überschüssigen Lebensmitteln, Förderung eines verantwortungsvollen Konsums durch Verbraucherbewusstsein, Vorhersage von Nachfragemustern, Sicherstellung einer fairen Entlohnung für Landwirte und Messung des CO2-Fußabdrucks. Weitere Vorteile sind die Reduzierung finanzieller Verluste für Unternehmen und die Stärkung des Vertrauens zwischen Produzenten und Verbrauchern. (15 innovative Anwendungen von Blockchain zur Reduzierung von Lebensmittelverschwendung)",
      "sektor": "Digitalisation/AI",
      "ebene": "cluster",
      "groesse": "s",
      "winkel": 157.24,
      "radius": 0.527,
      "daten": "Oct 20th 2023  a year ago",
      "titelOriginal": "AI Food Waste Reduction"
    },
    {
      "id": "874318",
      "titel": "Auf den Mikrobiom des Darms ausgerichtete Lebensmittel",
      "beschreibung": "Die Schaffung von Lebensmitteln, die ein gesundes Mikrobiom des Darms fördern, basierend auf personalisierten Daten, und die probiotic-reiche sowie präbiotisch angereicherte Produkte anbieten, die auf die einzigartige Darmflora jedes Einzelnen abgestimmt sind. Neueste Forschungen über die Auswirkungen des Mikrobioms des Darms auf die menschliche Gesundheit haben die Entwicklung von auf das Mikrobiom des Darms ausgerichteten Lebensmitteln angestoßen. Diese Produkte sind darauf ausgelegt, nützliche Darmbakterien zu nähren und zu unterstützen, die Verdauung, die Immunfunktion und das allgemeine Wohlbefinden zu verbessern. Mit dem zunehmenden Verständnis der Verbindungen zwischen dem Mikrobiom und der Gesundheit sowie der Achse zwischen Darm und Gehirn gewinnt dieser Trend an Bedeutung und reift auf einem als mittel eingestuften Reifegrad.",
      "sektor": "Personalisation",
      "ebene": "trend",
      "groesse": "l",
      "winkel": 82.25,
      "radius": 0.7857,
      "daten": "Oct 20th 2023  5 months ago",
      "titelOriginal": "Gut microbiome-targeted foods"
    },
    {
      "id": "874320",
      "titel": "DNA-basierte Diäten und Ernährungspläne",
      "beschreibung": "Diäten und Ernährungspläne basierend auf den genetischen Profilen von Individuen anzupassen, indem genetische Tests und Analysen genutzt werden, um personalisierte Ernährungsempfehlungen für optimale Gesundheit und Wohlbefinden bereitzustellen. Fortschritte in der Genomik und Ernährungswissenschaft haben den Weg für personalisierte Ernährung geebnet, bei der genetische Daten verwendet werden, um diätetische Ratschläge, Nährstoffaufnahme und Lebensstilempfehlungen individuell anzupassen, um spezifische Gesundheitsziele und genetische Prädispositionen zu erfüllen. Da genetische Tests zugänglicher werden und das Interesse der Verbraucher wächst, haben DNA-basierte Diäten und Ernährungspläne ein Trendreifegrad erreicht, der im Bereich der personalisierten Ernährung als mittel eingestuft wird.",
      "sektor": "Personalisation",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 69.4,
      "radius": 0.7512,
      "daten": "Oct 20th 2023  2 years ago",
      "titelOriginal": "DNA-based diets and meal plans"
    },
    {
      "id": "908542",
      "titel": "3D-Druck von Lebensmitteln",
      "beschreibung": "3D-Druck von Lebensmitteln umfasst die Nutzung von 3D-Druckern, um essbare Produkte schichtweise zu erstellen, was die Produktion von komplexen und maßgeschneiderten Lebensmitteldesigns ermöglicht. Israelische Innovationen im 3D-Druck von Lebensmitteln revolutionieren die kulinarische Landschaft. Unternehmen wie Steakholder Foods führen neuartige Produkte wie pflanzenbasierte 3D-gedruckte Aale und Garnelen-Analoga ein, während Oshi durch 3D-Druck ganze vegane Lachsstücke entwickelt. SavorEat bietet anpassbare pflanzenbasierte Fleischalternativen an, und MeaTech 3D hat das größte im Labor gezüchtete Steak durch 3D-Druck geschaffen. Dieser Trend hat eine mittlere Reife, wenn man die Skalierbarkeit und die laufenden Fortschritte in der Technologie und Materialwissenschaft berücksichtigt.",
      "sektor": "Additive Manufacturing",
      "ebene": "trend",
      "groesse": "m",
      "winkel": 138.19,
      "radius": 0.8093,
      "daten": "Feb 20th 2024  5 months ago",
      "titelOriginal": "3D Printing of Food"
    }
  ]
}

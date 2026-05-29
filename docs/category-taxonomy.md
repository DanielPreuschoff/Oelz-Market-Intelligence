# Signal Category Taxonomy

> These categories are the fixed classification system for all signals in the platform.
> Do not create new categories without updating this file and the DB seed.
> Validated with client: [ ] pending first review session.

## Categories

| Key | Label | Description | Example |
|-----|-------|-------------|---------|
| `product_launch` | Product Launch | New product introduced to market — new SKU, line extension, seasonal | Competitor launches gluten-free croissant range |
| `packaging_change` | Packaging Change | Format change, material change, visual redesign, sustainability update | Competitor switches to 100% recycled film packaging |
| `distribution` | Distribution | New retail listing, new country entry, channel expansion, delist | Competitor enters Lidl Austria nationwide |
| `production_capacity` | Production & Capacity | New factory, line expansion, capacity investment, automation | Competitor opens 2nd production site in CZ |
| `m_and_a` | M&A / Investment | Acquisition, merger, JV, private equity entry, IPO, exit | Competitor acquired by European bakery group |
| `campaign` | Campaign & Brand | Major advertising campaign, brand relaunch, sponsorship, PR stunt | Competitor launches TV brand campaign in AT |
| `pricing` | Pricing | Visible price increase/decrease, promo, bundle, EDLP move | Competitor runs 3-for-2 promotion in major grocery chain |
| `hiring_signal` | Hiring Signal | Strategic hire visible on LinkedIn or press — new function or market signal | Competitor hires Head of Sustainability (signals ESG push) |
| `technology` | Technology | Digital investment, automation, AI, new system, patent | Competitor announces robotics line investment |
| `sustainability` | Sustainability | ESG claim, certification, carbon commitment, packaging pledge | Competitor achieves B Corp certification |
| `startup_signal` | Startup / New Entrant | New brand or business model entering the category | VC-backed frozen bakery startup launches DTC in AT |
| `regulatory` | Regulatory | New law, labeling requirement, certification standard, import rule | New EU front-of-pack nutrition label regulation |
| `partnership` | Partnership | Co-branding, licensing, retailer collaboration, trade deal | Competitor signs exclusive listing deal with Rewe |

## Notes for editors

- A signal should have exactly one primary category. If ambiguous, pick the most commercially significant angle.
- `m_and_a` takes precedence over `distribution` if the signal is about ownership change.
- `hiring_signal` is only worth capturing if the role signals a strategic direction (new country, new function, C-level).
- Market-level signals (no specific competitor) can use any category — just leave `competitor_id` null.

# Role Definitions & Signal Relevance

> Defines the internal Ölz roles that can log in and how they relate to signal categories.
> Role-based filtering in the UI is based on the `role_relevance` array on each Signal.

## Roles

### management
**Who:** C-level, board, senior management
**Cares about:** Strategic moves, M&A, market entries, major brand plays, anything with P&L impact
**Priority categories:** `m_and_a`, `production_capacity`, `distribution`, `startup_signal`, `regulatory`
**Signal bar:** High — only importance 2–3

### sales
**Who:** Key account managers, sales directors, commercial team
**Cares about:** Competitor listings, promotions, pricing, new distribution wins, retailer moves
**Priority categories:** `distribution`, `pricing`, `campaign`, `product_launch`
**Signal bar:** Medium — importance 1–3 if commercially relevant

### innovation
**Who:** R&D, product development, NPD team
**Cares about:** New products, new concepts, ingredient trends, startup disruption, technology
**Priority categories:** `product_launch`, `startup_signal`, `technology`, `sustainability`
**Signal bar:** Low — interested in weak signals too (importance 1+)

### marketing
**Who:** Brand managers, trade marketing, communications
**Cares about:** Campaigns, brand moves, packaging aesthetics, social signals, partnerships
**Priority categories:** `campaign`, `packaging_change`, `partnership`, `product_launch`
**Signal bar:** Medium — importance 1–3

### packaging
**Who:** Packaging development, quality, PE (Produktentwicklung)
**Cares about:** Material changes, sustainability certifications, format innovations, regulatory requirements
**Priority categories:** `packaging_change`, `sustainability`, `regulatory`, `technology`
**Signal bar:** Low — technical details matter

## Overlap and divergence

**High overlap:** management × sales on `distribution` and `m_and_a`
**High overlap:** innovation × marketing on `product_launch` and `packaging_change`
**Low overlap:** packaging is most distinct — mostly cares about things others skip

## How role relevance works in v1

- Each signal is manually tagged with an array of role keys: e.g. `["management", "sales"]`
- In the reader UI, users with a role set see signals tagged for their role highlighted or shown first
- No hard walls — all users can always see all published signals
- Role filter can be toggled on/off in the UI

## Hypothesis to validate:
- [ ] Are these the actual job titles / roles at Ölz or do they map differently?
- [ ] Is there a "procurement" or "supply chain" role we should add?
- [ ] Does management want a truly stripped-down view (top 5 signals only) or full access?

-- =============================================================
-- Seed Data — Countries, Competitors, Initial Setup
-- =============================================================

-- Countries
insert into countries (id, name, market_context, active) values
  ('AT', 'Austria', 'Home market for Ölz. Highly competitive bakery/convenience category. Key retailers: Rewe (Billa/Merkur), Spar, Hofer, Lidl, Penny.', true),
  ('CZ', 'Czech Republic', 'Key export market. Industrial bakery dominated by Penam and Delta Pekárny. Growing premium/health segment.', true),
  ('SK', 'Slovakia', 'Similar to CZ. Shares many competitors. Smaller volume but strategically linked to CZ coverage.', true),
  ('SI', 'Slovenia', 'Smaller market. Key local player: Gradski mlin. Growing premium and organic interest.', true)
on conflict (id) do nothing;

-- Competitors
insert into competitors (name, short_name, country_ids, categories, description, watch_priority, active) values
  (
    'Harry-Brot GmbH',
    'Harry-Brot',
    array['AT', 'DE'],
    array['bread', 'toast', 'rolls'],
    'Germany''s largest industrial bread brand with strong presence in Austrian retail. Dominant in toast and sandwich bread.',
    'high',
    true
  ),
  (
    'Lieken Urkorn',
    'Lieken',
    array['AT', 'DE'],
    array['bread', 'toast'],
    'Premium whole grain bread brand from Germany, present in Austrian health/organic retail segment.',
    'high',
    true
  ),
  (
    'Penam a.s.',
    'Penam',
    array['CZ', 'SK'],
    array['bread', 'toast', 'pastry', 'rolls'],
    'Largest industrial bakery group in Czech Republic and Slovakia. Covers mass-market bread and pastry.',
    'high',
    true
  ),
  (
    'Delta Pekárny a.s.',
    'Delta Pekárny',
    array['CZ'],
    array['bread', 'rolls', 'pastry'],
    'Major Czech industrial baker, strong in bread and rolls. Part of the Agrofert holding.',
    'high',
    true
  ),
  (
    'Gradski mlin d.d.',
    'Gradski mlin',
    array['SI'],
    array['bread', 'flour', 'pastry'],
    'Leading Slovenian baker and flour miller. Dominant in Slovenian bread category.',
    'medium',
    true
  ),
  (
    'Mestemacher GmbH',
    'Mestemacher',
    array['AT'],
    array['bread', 'health', 'whole grain'],
    'German premium whole grain brand with niche but growing presence in Austrian health food retail.',
    'medium',
    true
  ),
  (
    'Josef Manner & Comp. AG',
    'Manner',
    array['AT'],
    array['sweet bakery', 'wafers', 'confectionery'],
    'Iconic Austrian sweet bakery brand. Overlaps with Ölz in premium Austrian bakery positioning.',
    'medium',
    true
  ),
  (
    'Backaldrin International The Kornspitz Company GmbH',
    'Backaldrin',
    array['AT'],
    array['bakery ingredients', 'branded rolls'],
    'Austrian ingredient supplier and Kornspitz brand owner. Influences bakery trends as ingredient innovator.',
    'low',
    true
  )
on conflict do nothing;

-- Additional competitors (client-provided full list)
insert into competitors (name, short_name, country_ids, categories, description, watch_priority, active) values
  (
    'La Boulangère',
    'La Boulangère',
    array['AT'],
    array['bread', 'brioche', 'sweet bakery'],
    'French bakery brand known for brioches and specialty breads. Growing presence in Austrian retail.',
    'medium',
    true
  ),
  (
    'La Fournée Dorée',
    'La Fournée Dorée',
    array['AT'],
    array['bread', 'pastry', 'sweet bakery'],
    'French industrial bakery group. Present in Austrian market with specialty and premium bakery lines.',
    'medium',
    true
  ),
  (
    'St Michel',
    'St Michel',
    array['AT'],
    array['biscuits', 'sweet bakery'],
    'French biscuit and sweet bakery brand. Niche presence in Austrian specialty retail.',
    'low',
    true
  ),
  (
    'Dan Cake',
    'Dan Cake',
    array['AT', 'CZ', 'SK'],
    array['sweet bakery', 'cakes', 'pastry'],
    'Portuguese industrial sweet bakery group. Present across Austria, Czech Republic and Slovakia with packaged cakes and pastries.',
    'medium',
    true
  ),
  (
    'Kuchenmeister GmbH',
    'Kuchenmeister',
    array['AT'],
    array['cakes', 'sweet bakery', 'stollen'],
    'German premium cake and stollen producer. Strong seasonal presence in Austrian retail.',
    'medium',
    true
  ),
  (
    'Warburtons Ltd',
    'Warburtons',
    array[]::text[],
    array['bread', 'toast', 'wraps'],
    'UK''s largest bakery brand. Global monitor for innovation trends in packaged bread and convenience formats.',
    'low',
    true
  ),
  (
    'Hovis Ltd',
    'Hovis',
    array[]::text[],
    array['bread', 'toast', 'wholegrain'],
    'Major UK bread brand with long heritage. Global monitor for wholegrain and health-positioned bakery trends.',
    'low',
    true
  ),
  (
    'Associated British Foods plc',
    'ABF',
    array['AT'],
    array['bread', 'ingredients', 'food'],
    'British multinational food conglomerate owning Allied Bakeries and Ovaltine among others. Monitor for M&A and category moves.',
    'medium',
    true
  ),
  (
    'ARYZTA AG',
    'ARYZTA',
    array['AT', 'CZ', 'SK'],
    array['frozen bakery', 'foodservice', 'bread'],
    'Swiss-Irish food group and one of the largest frozen bakery suppliers globally. Strong in foodservice channel across Austria, CZ, SK.',
    'high',
    true
  ),
  (
    'Lantmännen Unibake',
    'Lantmännen',
    array['AT', 'CZ', 'SK', 'SI'],
    array['frozen bakery', 'bread', 'pastry', 'foodservice'],
    'Scandinavian agricultural and food cooperative. Major frozen bakery supplier across all four Ölz markets.',
    'high',
    true
  ),
  (
    'Vandemoortele NV',
    'Vandemoortele',
    array['AT', 'CZ', 'SK'],
    array['frozen bakery', 'pastry', 'margarines'],
    'Belgian food group. Major European frozen bakery and culinary fats player, present across Austria, Czech Republic and Slovakia.',
    'medium',
    true
  ),
  (
    'Spitz GmbH',
    'Spitz',
    array['AT'],
    array['bread', 'toast', 'sweet bakery'],
    'Austrian food company with broad retail presence. Competes with Ölz in bread, toast and convenience bakery in home market.',
    'medium',
    true
  ),
  (
    'Grupo Bimbo',
    'Bimbo',
    array['AT'],
    array['bread', 'toast', 'sweet bakery'],
    'World''s largest baking company. Present in Austrian market. Monitor for global strategy and potential portfolio expansion.',
    'medium',
    true
  ),
  (
    '7DAYS (Chipita)',
    '7DAYS',
    array['AT', 'CZ', 'SK'],
    array['croissants', 'sweet bakery', 'snacks'],
    'Greek snack and sweet bakery brand owned by Mondelēz. Market leader in packaged croissants across Austria, Czech Republic and Slovakia.',
    'high',
    true
  ),
  (
    'Barilla Group',
    'Barilla',
    array['AT'],
    array['pasta', 'bread', 'bakery snacks'],
    'Italian food group. Monitor for bakery and convenience snack moves in Austrian market.',
    'medium',
    true
  )
on conflict do nothing;

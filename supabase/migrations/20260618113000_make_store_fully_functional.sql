-- Contact messages table used by the Contact page.
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can create contact messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage contact messages" ON public.contact_messages;
CREATE POLICY "Admins can manage contact messages"
  ON public.contact_messages FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Make product and collection seed stable and safe to re-run.
INSERT INTO public.collections (name, slug, description, image)
VALUES
  ('Hair Oils', 'hair-oil', 'Nourish and strengthen your hair with our premium organic hair oils', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop'),
  ('Essential Oils', 'essential-oils', 'Pure, therapeutic-grade essential oils for aromatherapy and wellness', 'https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop'),
  ('Body Oils', 'body-oils', 'Luxurious body oils for deep hydration and silky smooth skin', 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop'),
  ('Bundles', 'bundles', 'Curated oil bundles at special prices for complete care', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  updated_at = now();

WITH collection_ids AS (
  SELECT slug, id FROM public.collections
), seeded_products AS (
  SELECT * FROM (VALUES
    ('Organic Miracle Hair Oil', 'organic-miracle-hair-oil', 'A powerful blend of over 15 natural oils and herbs designed to promote hair growth, reduce hair fall, and add incredible shine.', 2500.00, 3000.00, 'hair-oil', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop','https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop'], true, true, true, 4.8, 156, ARRAY['Promotes natural hair growth','Reduces hair fall significantly','Adds shine and softness','Prevents dandruff and scalp issues'], 'Coconut Oil, Argan Oil, Castor Oil, Bhringraj, Amla, Brahmi, Hibiscus', 'Apply generously to scalp and hair. Massage for 5-10 minutes. Leave for at least 2 hours or overnight for best results. Wash with mild shampoo.'),
    ('Pure Argan Oil', 'pure-argan-oil', '100% pure, cold-pressed Moroccan Argan Oil. Rich in vitamin E and fatty acids, perfect for hair, skin, and nails.', 3500.00, NULL, 'essential-oils', 'https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop'], true, false, false, 4.9, 89, ARRAY['Deeply moisturizes hair and skin','Reduces frizz and split ends','Anti-aging properties for skin','Strengthens brittle nails'], '100% Pure Argania Spinosa Kernel Oil', 'Apply a few drops to damp hair or clean skin. Can be used daily.'),
    ('Lavender Essential Oil', 'lavender-essential-oil', 'Premium therapeutic-grade lavender essential oil, steam-distilled from the finest French lavender flowers.', 1800.00, NULL, 'essential-oils', 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop'], true, false, false, 4.7, 67, ARRAY['Promotes relaxation and sleep','Soothes skin irritations','Natural stress relief','Pleasant, calming scent'], '100% Pure Lavandula Angustifolia Oil', 'Add a few drops to diffuser for aromatherapy. Dilute with carrier oil for topical use.'),
    ('Rosemary Hair Growth Oil', 'rosemary-hair-growth-oil', 'Specially formulated rosemary-infused oil designed to stimulate the scalp and support natural hair growth.', 2200.00, 2800.00, 'hair-oil', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop'], true, true, false, 4.6, 112, ARRAY['Stimulates hair follicles','Improves circulation to scalp','Prevents premature greying','Thickens hair naturally'], 'Rosemary Essential Oil, Jojoba Oil, Vitamin E, Peppermint Oil', 'Apply to scalp daily. Massage for 5 minutes. No need to rinse.'),
    ('Luxury Body Oil Blend', 'luxury-body-oil-blend', 'An indulgent blend of sweet almond, jojoba, and rose hip oils enriched with vitamin E.', 2800.00, NULL, 'body-oils', 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop'], true, false, false, 4.8, 78, ARRAY['Deep hydration for all skin types','Quick-absorbing formula','Improves skin elasticity','Subtle natural fragrance'], 'Sweet Almond Oil, Jojoba Oil, Rosehip Oil, Vitamin E, Rose Extract', 'Apply to damp skin after shower. Massage until absorbed.'),
    ('Complete Hair Care Bundle', 'complete-hair-care-bundle', 'Everything you need for perfect hair: Miracle Hair Oil, Rosemary Growth Oil, and a scalp massager.', 5500.00, 7000.00, 'bundles', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop'], true, true, true, 4.9, 45, ARRAY['Complete hair care solution','20% savings vs individual purchase','Free scalp massager included','Perfect gift option'], 'Miracle Hair Oil, Rosemary Growth Oil, Scalp Massager', 'Use the oils as directed and massage scalp regularly.'),
    ('Tea Tree Essential Oil', 'tea-tree-essential-oil', 'Pure Australian tea tree oil with natural antibacterial properties for skincare and scalp care.', 1500.00, NULL, 'essential-oils', 'https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1600857062241-98c0c7dbfa1f?w=800&auto=format&fit=crop'], true, false, false, 4.7, 93, ARRAY['Natural antibacterial properties','Clears acne and blemishes','Treats dandruff effectively','Versatile household uses'], '100% Pure Melaleuca Alternifolia Leaf Oil', 'Always dilute before topical use. Add to shampoo for scalp treatment.'),
    ('Coconut & Hibiscus Hair Oil', 'coconut-hibiscus-hair-oil', 'Traditional Ayurvedic formula combining pure coconut oil with hibiscus flower extract.', 1800.00, NULL, 'hair-oil', 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop'], true, false, false, 4.5, 61, ARRAY['Reduces breakage','Nourishes roots','Adds shine','Supports thick hair'], 'Coconut Oil, Hibiscus Extract, Amla Oil', 'Massage into scalp and hair. Leave for 1-2 hours before washing.')
  ) AS p(name, slug, description, price, compare_at_price, collection_slug, image, images, in_stock, featured, best_seller, rating, reviews_count, benefits, ingredients, how_to_use)
)
INSERT INTO public.products (
  name, slug, description, price, compare_at_price, collection_id, image, images,
  in_stock, featured, best_seller, rating, reviews_count, benefits, ingredients, how_to_use
)
SELECT
  p.name, p.slug, p.description, p.price, p.compare_at_price, c.id, p.image, p.images,
  p.in_stock, p.featured, p.best_seller, p.rating, p.reviews_count, p.benefits, p.ingredients, p.how_to_use
FROM seeded_products p
JOIN collection_ids c ON c.slug = p.collection_slug
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  collection_id = EXCLUDED.collection_id,
  image = EXCLUDED.image,
  images = EXCLUDED.images,
  in_stock = EXCLUDED.in_stock,
  featured = EXCLUDED.featured,
  best_seller = EXCLUDED.best_seller,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count,
  benefits = EXCLUDED.benefits,
  ingredients = EXCLUDED.ingredients,
  how_to_use = EXCLUDED.how_to_use,
  updated_at = now();

WITH product_ids AS (
  SELECT slug, id FROM public.products WHERE slug IN ('organic-miracle-hair-oil', 'rosemary-hair-growth-oil')
), variants AS (
  SELECT * FROM (VALUES
    ('organic-miracle-hair-oil', '100ml', 2500.00),
    ('organic-miracle-hair-oil', '200ml', 4500.00),
    ('rosemary-hair-growth-oil', '50ml', 2200.00),
    ('rosemary-hair-growth-oil', '100ml', 3800.00)
  ) AS v(product_slug, name, price)
)
INSERT INTO public.product_variants (product_id, name, price, in_stock)
SELECT p.id, v.name, v.price, true
FROM variants v
JOIN product_ids p ON p.slug = v.product_slug
WHERE NOT EXISTS (
  SELECT 1 FROM public.product_variants existing
  WHERE existing.product_id = p.id AND existing.name = v.name
);

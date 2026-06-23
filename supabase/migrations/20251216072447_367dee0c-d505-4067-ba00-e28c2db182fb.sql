-- Make order_number have a default value so it's optional during insert
ALTER TABLE public.orders ALTER COLUMN order_number SET DEFAULT '';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductVariant {
  id: string;
  product_id: string | null;
  size: string;
  price: number | string;
  created_at: string | null;
}

export interface Product {
  id: string;
  collection_id?: string | null;
  name: string;
  description: string | null;
  ingredients: string | null;
  key_benefits?: string | null | any;
  hair_type: string | null;
  how_to_use: string | null;
  created_at: string | null;
  updated_at: string | null;
  images?: string[] | null;

  // These are added only on frontend after mixing product_variants
  product_variants?: ProductVariant[];
  price?: number;
  in_stock?: boolean;
  rating?: number;
  reviews_count?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  created_at?: string | null;
}

const toNumber = (value?: number | string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getProductPrice = (variants: ProductVariant[]) => {
  if (!variants.length) return 0;

  const prices = variants
    .map((variant) => toNumber(variant.price))
    .filter((price) => price > 0);

  return prices.length ? Math.min(...prices) : 0;
};

const mapProductsWithVariants = (
  products: Omit<Product, "product_variants" | "price" | "in_stock" | "rating" | "reviews_count">[],
  variants: ProductVariant[]
): Product[] => {
  return products.map((product) => {
    const productVariants = variants.filter(
      (variant) => variant.product_id === product.id
    );

    const price = getProductPrice(productVariants);

    return {
      ...product,
      product_variants: productVariants,
      price,
      in_stock: productVariants.length > 0 && price > 0,
      rating: 0,
      reviews_count: 0,
    };
  });
};

const fetchProductsWithVariants = async (
  options?: {
    collectionId?: string;
    limit?: number;
    search?: string;
  }
) => {
  let productsQuery = supabase
    .from("products")
    .select(
      "id, collection_id, name, description, ingredients, key_benefits, hair_type, how_to_use, created_at, updated_at, images"
    )
    .order("created_at", { ascending: false });

  if (options?.collectionId) {
    productsQuery = productsQuery.eq("collection_id", options.collectionId);
  }

  if (options?.search?.trim()) {
    const query = options.search.trim();
    productsQuery = productsQuery.or(
      `name.ilike.%${query}%,description.ilike.%${query}%,ingredients.ilike.%${query}%,key_benefits.ilike.%${query}%,hair_type.ilike.%${query}%`
    );
  }

  if (options?.limit) {
    productsQuery = productsQuery.limit(options.limit);
  }

  const { data: products, error: productsError } = await productsQuery;

  if (productsError) throw productsError;

  const productRows =
    (products || []) as Omit<
      any,
      "product_variants" | "price" | "in_stock" | "rating" | "reviews_count"
    >[];

  if (!productRows.length) return [];

  const productIds = productRows.map((product) => product.id);

  const { data: variants, error: variantsError } = await supabase
    .from("product_variants")
    .select("id, product_id, size, price, created_at")
    .in("product_id", productIds)
    .order("created_at", { ascending: true });

  if (variantsError) throw variantsError;

  return mapProductsWithVariants(productRows, (variants || []) as any[]);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductsWithVariants(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data: product, error: productError } = await supabase
        .from("products")
        .select(
          "id, collection_id, name, description, ingredients, key_benefits, hair_type, how_to_use, created_at, updated_at, images"
        )
        .eq("id", id)
        .maybeSingle();

      if (productError) throw productError;
      if (!product) return null;

      const { data: variants, error: variantsError } = await supabase
        .from("product_variants")
        .select("id, product_id, size, price, created_at")
        .eq("product_id", product?.id )
        .order("created_at", { ascending: true });

      if (variantsError) throw variantsError;

      const mixed = mapProductsWithVariants(
        [
          product as Omit<
            any,
            "product_variants" | "price" | "in_stock" | "rating" | "reviews_count"
          >,
        ],
        (variants || []) as any[]
      );

      return mixed[0] || null;
    },
    enabled: !!id,
  });
};

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: ["product-variants", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_variants")
        .select("id, product_id, size, price, created_at")
        .eq("product_id", productId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return (data || []) as any[];
    },
    enabled: !!productId,
  });
};

export const useCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      return (data || []) as Collection[];
    },
  });
};

export const useCollection = (slug: string) => {
  return useQuery({
    queryKey: ["collection", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;

      return data as Collection | null;
    },
    enabled: !!slug,
  });
};

export const useCollectionProducts = (collectionId: string | undefined) => {
  return useQuery({
    queryKey: ["collection-products", collectionId],
    queryFn: () => fetchProductsWithVariants({ collectionId }),
    enabled: !!collectionId,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: () => fetchProductsWithVariants({ limit: 4 }),
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: () => fetchProductsWithVariants({ search: query }),
    enabled: query.trim().length > 0,
  });
};
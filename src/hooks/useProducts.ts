
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string | null;
  size: string;
  price: number | string;
  created_at: string | null;
  images: string[] | null;
}

export interface Product {
  id?: string | any | null;
  name: string;
  description: string | null;
  ingredients: string | null;
  key_benefits: string | null;
  hair_type: string | null;
  how_to_use: string | null;
  created_at: string | null;
  updated_at: string | null;
  images: string[] | null;
  product_variants?: ProductVariant[];
  price?: number;
  in_stock?: boolean;
  rating?: number;
  reviews_count?: number;
}

const toNumber = (
  value?: number | string | null
): number => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

const getProductPrice = (
  variants: ProductVariant[]
): number => {
  if (!variants.length) {
    return 0;
  }

  const prices = variants
    .map((variant) => toNumber(variant.price))
    .filter((price) => price > 0);

  return prices.length
    ? Math.min(...prices)
    : 0;
};

const calculateRating = (
  reviews: ProductReview[]
) => {
  if (!reviews.length) {
    return {
      rating: 0,
      reviews_count: 0,
    };
  }

  const totalRating = reviews.reduce(
    (sum, review) =>
      sum + toNumber(review.rating),
    0
  );

  return {
    rating: Number(
      (totalRating / reviews.length).toFixed(1)
    ),
    reviews_count: reviews.length,
  };
};

const mapProductsWithVariants = (
  products: Product[],
  variants: ProductVariant[],
  reviews: ProductReview[]
): Product[] => {
  return products.map((product) => {
    const productVariants = variants.filter(
      (variant) =>
        variant.product_id === product.id
    );

    const productReviews = reviews.filter(
      (review) =>
        review.product_id === product.id
    );

    const price =
      getProductPrice(productVariants);

    const {
      rating,
      reviews_count,
    } = calculateRating(productReviews);

    return {
      ...product,
      product_variants: productVariants,
      price,
      in_stock:
        productVariants.length > 0 &&
        price > 0,
      rating,
      reviews_count,
    };
  });
};

const fetchProductsWithVariants = async (
  options?: {
    limit?: number;
    search?: string;
  }
): Promise<Product[]> => {
  let productsQuery = supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      ingredients,
      key_benefits,
      hair_type,
      how_to_use,
      created_at,
      updated_at,
      images
    `)
    .order("created_at", {
      ascending: false,
    });

  if (options?.search?.trim()) {
    const query =
      options.search.trim();

    productsQuery = productsQuery.or(
      `name.ilike.%${query}%,description.ilike.%${query}%,ingredients.ilike.%${query}%,key_benefits.ilike.%${query}%,hair_type.ilike.%${query}%`
    );
  }

  if (options?.limit) {
    productsQuery =
      productsQuery.limit(options.limit);
  }

  const {
    data: products,
    error: productsError,
  } = await productsQuery;

  if (productsError) {
    throw productsError;
  }

  if (
    !products ||
    products.length === 0
  ) {
    return [];
  }

  const productIds =
    products.map(
      (product) => product.id
    );

  // Fetch variants and reviews together
  const [
    variantsResult,
    reviewsResult,
  ] = await Promise.all([
    supabase
      .from("product_variants")
      .select(`
        id,
        product_id,
        size,
        price,
        created_at,
        images
      `)
      .in(
        "product_id",
        productIds
      )
      .order("created_at", {
        ascending: true,
      }),

    supabase
      .from("product_reviews")
      .select(`
        id,
        product_id,
        user_id,
        rating,
        review,
        created_at,
        updated_at
      `)
      .in(
        "product_id",
        productIds
      ),
  ]);

  if (variantsResult.error) {
    throw variantsResult.error;
  }

  if (reviewsResult.error) {
    throw reviewsResult.error;
  }

  return mapProductsWithVariants(
    products as Product[],
    (variantsResult.data ||
      []) as ProductVariant[],
    (reviewsResult.data ||
      []) as ProductReview[]
  );
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () =>
      fetchProductsWithVariants(),
  });
};

export const useProduct = (
  id: string
) => {
  return useQuery<Product | null, Error>({
    queryKey: ["product", id],

    queryFn: async (): Promise<Product | null> => {
      const {
        data: product,
        error: productError,
      } = await supabase
        .from("products")
        .select(`
          id,
          name,
          description,
          ingredients,
          key_benefits,
          hair_type,
          how_to_use,
          created_at,
          updated_at,
          images
        `)
        .eq("id", id)
        .maybeSingle();

      if (productError) {
        throw productError;
      }

      if (!product) {
        return null;
      }

      // Fetch variants and reviews together
      const [
        variantsResult,
        reviewsResult,
      ] = await Promise.all([
        supabase
          .from("product_variants")
          .select(`
            id,
            product_id,
            size,
            price,
            created_at,
            images
          `)
          .eq(
            "product_id",
            product.id
          )
          .order("created_at", {
            ascending: true,
          }),

        supabase
          .from("product_reviews")
          .select(`
            id,
            product_id,
            user_id,
            rating,
            review,
            created_at,
            updated_at
          `)
          .eq(
            "product_id",
            product.id
          ),
      ]);

      if (variantsResult.error) {
        throw variantsResult.error;
      }

      if (reviewsResult.error) {
        throw reviewsResult.error;
      }

      const [mappedProduct] =
        mapProductsWithVariants(
          [product as Product],
          (variantsResult.data ||
            []) as ProductVariant[],
          (reviewsResult.data ||
            []) as ProductReview[]
        );

      return mappedProduct || null;
    },

    enabled: Boolean(id),
  });
};

export const useProductVariants = (
  productId: string
) => {
  return useQuery<ProductVariant[], Error>({
    queryKey: [
      "product-variants",
      productId,
    ],

    queryFn: async (): Promise<
      ProductVariant[]
    > => {
      const {
        data,
        error,
      } = await supabase
        .from("product_variants")
        .select(`
          id,
          product_id,
          size,
          price,
          created_at,
          images
        `)
        .eq(
          "product_id",
          productId
        )
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        throw error;
      }

      return (data ||
        []) as ProductVariant[];
    },

    enabled: Boolean(productId),
  });
};

export const useFeaturedProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: [
      "featured-products",
    ],

    queryFn: () =>
      fetchProductsWithVariants({
        limit: 4,
      }),
  });
};

export const useSearchProducts = (
  query: string
) => {
  return useQuery<Product[], Error>({
    queryKey: [
      "search-products",
      query,
    ],

    queryFn: () =>
      fetchProductsWithVariants({
        search: query,
      }),

    enabled:
      query.trim().length > 0,
  });
};

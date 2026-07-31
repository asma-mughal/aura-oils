import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string | null;
  full_name: string | null;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateReviewPayload {
  productId: string;
  fullName: string;
  rating: number;
  review?: string;
}

/**
 * Fetch product reviews.
 *
 * If productId is provided:
 * - Fetch reviews for that specific product.
 *
 * If productId is not provided:
 * - Fetch reviews from all products.
 */
export const useProductReviews = (
  productId?: string
) => {
  return useQuery<ProductReview[], Error>({
    queryKey: [
      "product-reviews",
      productId || "all",
    ],

    queryFn: async () => {
      let query = supabase
        .from("product_reviews")
        .select(`
          id,
          product_id,
          user_id,
          full_name,
          rating,
          review,
          created_at,
          updated_at
        `);

      // Only filter by product when productId exists
      if (productId) {
        query = query.eq(
          "product_id",
          productId
        );
      }

      const {
        data,
        error,
      } = await query.order(
        "created_at",
        {
          ascending: false,
        }
      );

      if (error) {
        throw error;
      }

      return (
        data || []
      ) as ProductReview[];
    },

    // Always enabled for:
    // - Specific product reviews
    // - All reviews
    enabled: true,
  });
};

/**
 * Create a product review.
 *
 * Works for:
 * - Authenticated users
 * - Guest users
 */
export const useCreateProductReview = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      fullName,
      rating,
      review,
    }: CreateReviewPayload) => {
      // Get currently authenticated user
      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();

      const {
        data,
        error,
      } = await supabase
        .from("product_reviews")
        .insert({
          product_id:
            productId,

          user_id:
            user?.id ?? null,

          full_name:
            fullName.trim(),

          rating,

          review:
            review?.trim() ||
            null,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as ProductReview;
    },

    onSuccess: (
      _data,
      variables
    ) => {
      // Refresh reviews for this product
      queryClient.invalidateQueries({
        queryKey: [
          "product-reviews",
          variables.productId,
        ],
      });

      // Refresh all reviews
      queryClient.invalidateQueries({
        queryKey: [
          "product-reviews",
          "all",
        ],
      });

      // Refresh product rating
      queryClient.invalidateQueries({
        queryKey: [
          "product",
          variables.productId,
        ],
      });

      // Refresh all products
      queryClient.invalidateQueries({
        queryKey: [
          "products",
        ],
      });

      // Refresh featured products
      queryClient.invalidateQueries({
        queryKey: [
          "featured-products",
        ],
      });

      // Refresh search results
      queryClient.invalidateQueries({
        queryKey: [
          "search-products",
        ],
      });
    },
  });
};
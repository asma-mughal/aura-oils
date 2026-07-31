
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  ShoppingBag,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";

import {
  useProduct,
  useProducts,
} from "@/hooks/useProducts";

import {
  useCreateProductReview,
  useProductReviews,
} from "@/hooks/useProductReview";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import { Skeleton } from "@/components/ui/skeleton";

const toNumber = (
  value?: number | string | null
) => {
  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
};

const formatPrice = (
  price?: number | string | null
) => {
  const amount = toNumber(price);

  return `Rs. ${amount.toLocaleString()}`;
};

const splitText = (
  value?: string | null
) => {
  if (!value) return [];

  return value
    .split(/\n|,|•/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const ProductDetail = () => {
  const { id } =
    useParams<{ id: string }>();

  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
  } = useProduct(id || "");

  const {
    data: allProducts,
  } = useProducts();

  const {
    user,
    profile,
  } = useAuth();

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
  } = useProductReviews(
    id || ""
  );

  const createReview =
    useCreateProductReview();

  const { addToCart } =
    useCart();

  const { toast } =
    useToast();

  const [
    selectedVariant,
    setSelectedVariant,
  ] = useState<
    string | undefined
  >();

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(0);

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    rating,
    setRating,
  ] = useState(0);

  const [
    reviewText,
    setReviewText,
  ] = useState("");

  /**
   * Automatically use logged-in user's
   * profile name.
   */
  useEffect(() => {
    if (
      user &&
      profile?.full_name
    ) {
      setFullName(
        profile.full_name
      );
    }
  }, [
    user,
    profile?.full_name,
  ]);

  const variants =
    product?.product_variants || [];

  /**
   * Select first variant
   */
  useEffect(() => {
    if (
      variants.length > 0 &&
      !selectedVariant
    ) {
      setSelectedVariant(
        variants[0].id
      );
    }
  }, [
    variants,
    selectedVariant,
  ]);

  /**
   * Scroll to top
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  /**
   * Product loading
   */
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <Skeleton className="aspect-square rounded-2xl" />

            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  /**
   * Product not found
   */
  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-serif text-2xl font-semibold">
            Product not found
          </h1>

          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>

          <Button
            variant="hero"
            className="mt-6"
            asChild
          >
            <Link to="/collections">
              Browse Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const currentVariant =
    variants.find(
      (variant) =>
        variant.id ===
        selectedVariant
    ) || variants[0];

  const currentPrice =
    toNumber(
      currentVariant?.price
    );

  const benefits =
    splitText(
      product.key_benefits
    );

  const ingredients =
    splitText(
      product.ingredients
    );

  const images =
    currentVariant?.images &&
    currentVariant.images.length > 0
      ? currentVariant.images
      : product.images &&
        product.images.length > 0
      ? product.images
      : ["/placeholder.svg"];

  const relatedProducts =
    allProducts
      ?.filter(
        (item) =>
          item.id !== product.id
      )
      .slice(0, 4) || [];

  /**
   * Add product to cart
   */
  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.id,

      description:
        product.description || "",

      shortDescription:
        product.description?.slice(
          0,
          100
        ) || "",

      price: currentPrice,

      compareAtPrice:
        undefined,

      images,

      category: "",

      tags: [],

      inStock: true,

      variants:
        variants.map(
          (variant) => ({
            id: variant.id,
            name: variant.size,
            price: toNumber(
              variant.price
            ),
          })
        ),

      benefits,
      ingredients,

      howToUse:
        product.how_to_use || "",

      rating:
        product.rating || 0,

      reviewCount:
        product.reviews_count || 0,
    };

    addToCart(
      cartProduct,
      quantity,
      currentVariant?.id
    );

    toast({
      title: "Added to cart",
      description:
        `${product.name} has been added to your cart.`,
    });
  };

  /**
   * Buy now
   */
  const handleBuyNow = () => {
    handleAddToCart();

    navigate("/checkout");
  };

  /**
   * Submit review
   */
  const handleSubmitReview = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast({
        title: "Name required",
        description:
          "Please enter your full name.",
        variant:
          "destructive",
      });

      return;
    }

    if (rating < 1) {
      toast({
        title: "Rating required",
        description:
          "Please select a rating from 1 to 5.",
        variant:
          "destructive",
      });

      return;
    }

    try {
      await createReview.mutateAsync({
        productId: product.id,

        fullName:
          fullName.trim(),

        rating,

        review:
          reviewText.trim(),
      });

      toast({
        title:
          "Review submitted",
        description:
          "Thank you for sharing your experience!",
      });

      setRating(0);
      setReviewText("");

      /**
       * Clear guest name.
       *
       * Keep authenticated user's name.
       */
      if (!user) {
        setFullName("");
      }
    } catch (error: any) {
      toast({
        title:
          "Failed to submit review",
        description:
          error?.message ||
          "Something went wrong. Please try again.",
        variant:
          "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">

        {/* Breadcrumbs */}

        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            to="/"
            className="hover:text-primary transition-colors"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to="/collections"
            className="hover:text-primary transition-colors"
          >
            Collections
          </Link>

          <span>/</span>

          <span className="text-foreground truncate">
            {product.name}
          </span>
        </nav>

        {/* Product */}

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Product Images */}

          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={
                  images[
                    selectedImage
                  ] ||
                  "/placeholder.svg"
                }
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map(
                  (
                    image,
                    index
                  ) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() =>
                        setSelectedImage(
                          index
                        )
                      }
                      className={`aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                        selectedImage ===
                        index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Product Information */}

          <div className="space-y-6">

            <div>
              <h1 className="font-serif text-3xl font-semibold md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber text-amber" />

                  <span className="font-medium">
                    {product.rating?.toFixed(
                      1
                    ) || "0.0"}
                  </span>

                  <span className="text-muted-foreground">
                    (
                    {product.reviews_count ||
                      0}{" "}
                    reviews)
                  </span>
                </div>

                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              </div>
            </div>

            <div>
              <span className="font-serif text-3xl font-semibold text-primary">
                {currentPrice
                  ? formatPrice(
                      currentPrice
                    )
                  : "Price not available"}
              </span>
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Variants */}

            {variants.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Size
                </label>

                <div className="flex flex-wrap gap-2">
                  {variants.map(
                    (variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() =>
                          setSelectedVariant(
                            variant.id
                          )
                        }
                        className={`rounded-full px-4 py-2 text-sm font-medium ${
                          selectedVariant ===
                          variant.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {
                          variant.size
                        }{" "}
                        -{" "}
                        {formatPrice(
                          variant.price
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Hair Type */}

            {product.hair_type && (
              <div>
                <h3 className="font-serif text-lg font-medium mb-2">
                  Hair Type
                </h3>

                <p className="text-muted-foreground">
                  {product.hair_type}
                </p>
              </div>
            )}

            {/* Quantity */}

            <div>
              <label className="text-sm font-medium mb-2 block">
                Quantity
              </label>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                  disabled={
                    quantity <= 1
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Cart Buttons */}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="hero"
                className="flex-1 gap-2"
                onClick={
                  handleAddToCart
                }
                disabled={
                  !currentPrice
                }
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                variant="elegant"
                className="flex-1"
                onClick={
                  handleBuyNow
                }
                disabled={
                  !currentPrice
                }
              >
                Buy Now
              </Button>
            </div>

            {/* Delivery */}

            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>
                  Free shipping on orders over Rs. 5,000
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>
                  Cash on Delivery available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}

        <div className="mt-12 md:mt-16">
          <div className="border-b">
            <div className="flex gap-8">
              <button className="border-b-2 border-primary pb-4 font-medium text-primary">
                Description
              </button>
            </div>
          </div>

          <div className="py-6 space-y-6">

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {benefits.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-medium mb-3">
                  Benefits
                </h3>

                <ul className="space-y-2">
                  {benefits.map(
                    (
                      benefit,
                      index
                    ) => (
                      <li
                        key={`${benefit}-${index}`}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {benefit}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {ingredients.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-medium mb-3">
                  Ingredients
                </h3>

                <p className="text-muted-foreground">
                  {ingredients.join(
                    ", "
                  )}
                </p>
              </div>
            )}

            {product.how_to_use && (
              <div>
                <h3 className="font-serif text-lg font-medium mb-3">
                  How to Use
                </h3>

                <p className="text-muted-foreground">
                  {product.how_to_use}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}

        <section className="mt-12 md:mt-16 border-t pt-10">

          <div className="grid gap-10 lg:grid-cols-3">

            {/* Review Summary */}

            <div>
              <h2 className="font-serif text-2xl font-semibold">
                Customer Reviews
              </h2>

              <div className="mt-6 flex items-center gap-4">
                <div className="text-4xl font-serif font-semibold">
                  {product.rating?.toFixed(
                    1
                  ) || "0.0"}
                </div>

                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <=
                            Math.round(
                              product.rating ||
                                0
                            )
                              ? "fill-amber text-amber"
                              : "text-muted-foreground"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on{" "}
                    {product.reviews_count ||
                      0}{" "}
                    reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Review Form */}

            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-card p-6">

                <h3 className="font-serif text-xl font-medium">
                  Write a Review
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  You don't need an account to leave a review.
                </p>

                <form
                  onSubmit={
                    handleSubmitReview
                  }
                  className="mt-6 space-y-5"
                >

                  {/* Full Name */}

                  <div className="space-y-2">
                    <Label htmlFor="review-name">
                      Your Name *
                    </Label>

                    <Input
                      id="review-name"
                      value={
                        fullName
                      }
                      onChange={(
                        e
                      ) =>
                        setFullName(
                          e.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      disabled={
                        Boolean(user)
                      }
                      required
                    />

                    {user && (
                      <p className="text-xs text-muted-foreground">
                        Your name is taken from your account profile.
                      </p>
                    )}
                  </div>

                  {/* Rating */}

                  <div className="space-y-2">
                    <Label>
                      Your Rating *
                    </Label>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setRating(
                                star
                              )
                            }
                            className="rounded-sm p-1 transition-transform hover:scale-110"
                            aria-label={`Rate ${star} out of 5`}
                          >
                            <Star
                              className={`h-7 w-7 ${
                                star <=
                                rating
                                  ? "fill-amber text-amber"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Review Text */}

                  <div className="space-y-2">
                    <Label htmlFor="review">
                      Your Review
                    </Label>

                    <textarea
                      id="review"
                      rows={5}
                      value={
                        reviewText
                      }
                      onChange={(
                        e
                      ) =>
                        setReviewText(
                          e.target.value
                        )
                      }
                      placeholder="Tell others about your experience with this product..."
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    disabled={
                      createReview.isPending
                    }
                  >
                    {createReview.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Existing Reviews */}

          <div className="mt-10">

            <h3 className="font-serif text-xl font-medium">
              What Customers Say
            </h3>

            {reviewsLoading ? (
              <div className="mt-6 space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed p-8 text-center">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {reviews.map(
                  (review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border bg-card p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">
                            {review.full_name ||
                              "Anonymous"}
                          </p>

                          <div className="mt-1 flex">
                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <=
                                    review.rating
                                      ? "fill-amber text-amber"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              )
                            )}
                          </div>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {new Date(
                            review.created_at
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      {review.review && (
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {review.review}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-semibold">
                You May Also Like
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(
                (relatedProduct) => (
                  <ProductCard
                    key={
                      relatedProduct.id
                    }
                    product={
                      relatedProduct
                    }
                  />
                )
              )}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;


import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Shield,
  Leaf,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";

import {
  useFeaturedProducts,
  useProducts,
} from "@/hooks/useProducts";


import heroImage from "@/assets/hero-oils.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductReviews } from "@/hooks/useProductReview";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description:
      "Pure, natural ingredients with no harmful chemicals",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description:
      "Get your order delivered safely across Pakistan within 3–7 business days.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description:
      "Every product is tested for purity and quality",
  },
];

const Index = () => {
  const {
    data: products,
    isLoading: productsLoading,
  } = useProducts();

  const {
    data: featuredProducts,
    isLoading: featuredProductsLoading,
  } = useFeaturedProducts();

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
  } = useProductReviews();

  return (
    <Layout>
      {/* Hero Section */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium organic oils"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="max-w-xl space-y-6 animate-fade-in">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              🌿 Organics By Shahida
            </span>

            <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Pure & Natural
              <br />

              <span className="text-primary">
                Oils for You
              </span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Discover our collection of pure, organic oils
              crafted to nourish your hair. Experience the
              power of nature.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <a href="#products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="border-y bg-muted/30">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-center md:text-left"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-medium">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="products" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">
                Our Products
              </h2>

              <p className="mt-2 text-muted-foreground">
                Explore our collection of pure and natural oils
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="aspect-[3/4] rounded-2xl"
                />
              ))
            ) : products && products.length ? (
              products
                .slice(0, 3)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">
                  No products available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bestsellers */}

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">
                Bestsellers
              </h2>

              <p className="mt-2 text-muted-foreground">
                Our most loved products
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProductsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="aspect-[3/4] rounded-2xl"
                />
              ))
            ) : featuredProducts?.length ? (
              featuredProducts
                .slice(0, 3)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">
                  No products available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Customer Reviews */}

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              What Our Customers Say
            </h2>

            <p className="mt-2 text-muted-foreground">
              Real reviews from our customers
            </p>
          </div>

          {reviewsLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border bg-card p-6"
                >
                  <Skeleton className="h-5 w-24" />

                  <Skeleton className="mt-5 h-20 w-full" />

                  <div className="mt-5 border-t pt-4">
                    <Skeleton className="h-5 w-32" />

                    <Skeleton className="mt-2 h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-card"
                >
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating
                            ? "fill-amber text-amber"
                            : "text-muted-foreground"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Review */}
                  {review.review ? (
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      "{review.review}"
                    </p>
                  ) : (
                    <p className="mt-4 italic text-muted-foreground">
                      Customer left a rating without a written review.
                    </p>
                  )}

                  {/* Customer - Always stays at bottom */}
                  <div className="mt-auto pt-6">
                    <div className="border-t pt-4">
                      <p className="font-medium">
                        {review.full_name || "Anonymous Customer"}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-PK",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-10 text-center">
              <Star className="mx-auto h-8 w-8 text-muted-foreground" />

              <h3 className="mt-4 font-medium">
                No customer reviews yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Be the first customer to share your experience.
              </p>

              <Button
                variant="outline"
                className="mt-5"
                asChild
              >
                <Link to="/products">
                  Explore Products
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}

      <section className="bg-primary py-16 md:py-24">
        <div className="container text-center">
          <h2 className="font-serif text-3xl font-semibold text-primary-foreground md:text-4xl">
            Ready to Transform Your Hair?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Discover the power of natural oils and start
            your journey to healthier, stronger, and
            shinier hair today.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8"
            asChild
          >
            <Link to="/products">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

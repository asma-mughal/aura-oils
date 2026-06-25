import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import CollectionCard from "@/components/products/CollectionCard";
import { useCollections, useFeaturedProducts } from "@/hooks/useProducts";
import heroImage from "@/assets/hero-oils.jpg";
import { Skeleton } from "@/components/ui/skeleton";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    rating: 5,
    text: "The Miracle Hair Oil has completely transformed my hair! After just 2 weeks, I noticed significantly less hair fall.",
    location: "Lahore",
  },
  {
    id: 2,
    name: "Fatima Khan",
    rating: 5,
    text: "I've tried many oils but nothing compares to PureOils. The quality is exceptional and results are visible.",
    location: "Karachi",
  },
  {
    id: 3,
    name: "Ayesha Malik",
    rating: 5,
    text: "Love the natural ingredients and the beautiful packaging. These oils have become a part of my daily routine.",
    location: "Islamabad",
  },
];

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Pure, natural ingredients with no harmful chemicals",
  },
  {
  icon: Truck,
  title: "Fast & Reliable Delivery",
  description: "Get your order delivered safely across Pakistan within 3–7 business days.",
},
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every product is tested for purity and quality",
  },
];

const Index = () => {
  const { data: collections, isLoading: collectionsLoading } = useCollections();
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts();

  return (
    <Layout>
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
              <span className="text-primary">Oils for You</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover our collection of pure, organic oils crafted to nourish
              your hair. Experience the power of nature.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <Link to="/collections">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              Shop by Collection
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore our curated collections of premium oils
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {collectionsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
              ))
            ) : (
              collections?.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))
            )}
          </div>
        </div>
      </section>

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
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/collections">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {productsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
              ))
            ) : (
              featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/collections">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-muted-foreground">
              Trusted by thousands of happy customers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-2xl border bg-card p-6 shadow-card"
              >
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber text-amber"
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 border-t pt-4">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container text-center">
          <h2 className="font-serif text-3xl font-semibold text-primary-foreground md:text-4xl">
            Ready to Transform Your Hair?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Join over 60,000 satisfied customers who have discovered the power
            of natural oils. Start your journey to healthier hair today.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="mt-8"
            asChild
          >
            <Link to="/collections">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

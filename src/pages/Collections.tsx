import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import CollectionCard from "@/components/products/CollectionCard";
import { useCollections } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Collections = () => {
  const { data: collections, isLoading } = useCollections();

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Collections</span>
          </nav>
          <h1 className="font-serif text-3xl font-semibold md:text-4xl lg:text-5xl">
            Our Collections
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Explore our carefully curated collections of premium organic oils,
            each designed to address your specific needs.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {isLoading ? (
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

      {/* Info Section */}
      <section className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              Why Choose Our Oils?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At PureOils, we believe in the power of nature. All our oils are
              sourced from the finest organic ingredients, cold-pressed to
              preserve their natural benefits, and crafted with love. Each
              product undergoes rigorous quality testing to ensure you receive
              nothing but the best.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Collections;

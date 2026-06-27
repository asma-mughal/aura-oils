import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import {
  useCollection,
  useCollectionProducts,
  useProducts,
} from "@/hooks/useProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating";

const getSearchableText = (value?: string | null) => {
  return value ? value.toLowerCase() : "";
};

const CollectionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim() || "";

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const { data: collection, isLoading: collectionLoading } = useCollection(
    slug || ""
  );

  const { data: collectionProducts, isLoading: productsLoading } =
    useCollectionProducts(collection?.id);

  const { data: allProducts, isLoading: allProductsLoading } = useProducts();

  const categoryProducts = collection ? collectionProducts : allProducts;

  const filteredProducts = useMemo(() => {
    if (!categoryProducts) return [];

    let result = [...categoryProducts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      result = result.filter((product) => {
        const searchable = [
          product.name,
          product.description,
          product.ingredients,
          product.key_benefits,
          product.hair_type,
          product.how_to_use,
        ]
          .map(getSearchableText)
          .join(" ");

        return searchable.includes(query);
      });
    }

    if (showOnlyInStock) {
      result = result.filter((product) => product.in_stock);
    }

    if (priceFilter.length > 0) {
      result = result.filter((product) => {
        const price = product.price || 0;

        if (priceFilter.includes("under-2000") && price > 0 && price < 2000) {
          return true;
        }

        if (
          priceFilter.includes("2000-3000") &&
          price >= 2000 &&
          price <= 3000
        ) {
          return true;
        }

        if (priceFilter.includes("over-3000") && price > 3000) {
          return true;
        }

        return false;
      });
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;

      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;

      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;

      case "newest":
        result.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

          return dateB - dateA;
        });
        break;

      default:
        break;
    }

    return result;
  }, [categoryProducts, sortBy, priceFilter, showOnlyInStock, searchQuery]);

  const togglePriceFilter = (value: string) => {
    setPriceFilter((prev) =>
      prev.includes(value)
        ? prev.filter((filter) => filter !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setPriceFilter([]);
    setShowOnlyInStock(false);
  };

  const hasActiveFilters = priceFilter.length > 0 || showOnlyInStock;

  const isLoading = collection
    ? collectionLoading || productsLoading
    : collectionLoading || allProductsLoading;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 font-medium text-sm uppercase tracking-wider">
          Availability
        </h4>

        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock"
            checked={showOnlyInStock}
            onCheckedChange={(checked) => setShowOnlyInStock(checked as boolean)}
          />

          <label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </label>
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-medium text-sm uppercase tracking-wider">
          Price
        </h4>

        <div className="space-y-2">
          {[
            { value: "under-2000", label: "Under Rs. 2,000" },
            { value: "2000-3000", label: "Rs. 2,000 - Rs. 3,000" },
            { value: "over-3000", label: "Over Rs. 3,000" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={option.value}
                checked={priceFilter.includes(option.value)}
                onCheckedChange={() => togglePriceFilter(option.value)}
              />

              <label htmlFor={option.value} className="text-sm cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}, []);
  return (
    <Layout>
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>

            <span>/</span>

            <Link
              to="/collections"
              className="hover:text-primary transition-colors"
            >
              Collections
            </Link>

            {collection && (
              <>
                <span>/</span>
                <span className="text-foreground">{collection.name}</span>
              </>
            )}
          </nav>

          <h1 className="font-serif text-3xl font-semibold md:text-4xl lg:text-5xl">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : collection?.name || "All Products"}
          </h1>

          {searchQuery && (
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Products matching your search from Supabase.
            </p>
          )}

          {!searchQuery && collection?.description && (
            <p className="mt-2 text-muted-foreground max-w-2xl">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h3 className="font-serif text-lg font-medium mb-6">
                  Filters
                </h3>

                <FilterContent />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden gap-2"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters

                        {hasActiveFilters && (
                          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {priceFilter.length + (showOnlyInStock ? 1 : 0)}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>

                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>

                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} products
                  </p>
                </div>

                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">
                    Active:
                  </span>

                  {showOnlyInStock && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-7 gap-1"
                      onClick={() => setShowOnlyInStock(false)}
                    >
                      In Stock <X className="h-3 w-3" />
                    </Button>
                  )}

                  {priceFilter.map((filter) => (
                    <Button
                      key={filter}
                      variant="secondary"
                      size="sm"
                      className="h-7 gap-1"
                      onClick={() => togglePriceFilter(filter)}
                    >
                      {filter
                        .replace("-", " - ")
                        .replace("under", "Under Rs.")
                        .replace("over", "Over Rs.")}
                      <X className="h-3 w-3" />
                    </Button>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-primary"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </div>
              )}

              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="aspect-[3/4] rounded-2xl" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No products found matching your filters.
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionDetail;
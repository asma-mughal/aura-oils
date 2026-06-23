import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const toNumber = (value?: number | string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatPrice = (price?: number | string | null) => {
  const amount = toNumber(price);
  return `Rs. ${amount.toLocaleString()}`;
};

const splitText = (value?: string | null) => {
  if (!value) return [];

  return value
    .split(/\n|,|•/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProduct(id || "");
  const { data: allProducts } = useProducts();

  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const variants = product?.product_variants || [];

  const images =
    product?.images && product.images.length > 0
      ? product.images
      : ["/placeholder.svg"];

  useEffect(() => {
    if (variants.length > 0 && !selectedVariant) {
      setSelectedVariant(variants[0].id);
    }
  }, [variants, selectedVariant]);

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

          <Button variant="hero" className="mt-6" asChild>
            <Link to="/collections">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const currentVariant =
    variants.find((variant) => variant.id === selectedVariant) || variants[0];

  const currentPrice = toNumber(currentVariant?.price);

  const benefits = splitText(product.key_benefits);
  const ingredients = splitText(product.ingredients);

  const relatedProducts =
    allProducts
      ?.filter(
        (item) =>
          item.collection_id === product.collection_id &&
          item.id !== product.id
      )
      .slice(0, 4) || [];

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.id,

      description: product.description || "",
      shortDescription: product.description?.slice(0, 100) || "",
      price: currentPrice,
      compareAtPrice: undefined,
      images,
      category: product.collection_id || "",
      tags: [],
      inStock: true,
      variants: variants.map((variant) => ({
        id: variant.id,
        name: variant.size,
        price: toNumber(variant.price),
      })),
      benefits,
      ingredients,
      howToUse: product.how_to_use || "",
      rating: 0,
      reviewCount: 0,
    };

    addToCart(cartProduct, quantity, currentVariant?.id);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };
  console.log(variants)
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
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

          <span>/</span>

          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-semibold md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber text-amber" />
                  <span className="font-medium">0</span>
                  <span className="text-muted-foreground">
                    (0 reviews)
                  </span>
                </div>

                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-primary">
                {currentPrice
                  ? formatPrice(currentPrice)
                  : "Price not available"}
              </span>
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {variants.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Size
                </label>

                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        selectedVariant === variant.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {variant.size} - {formatPrice(variant.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

            <div>
              <label className="text-sm font-medium mb-2 block">
                Quantity
              </label>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="hero"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!currentPrice}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                variant="elegant"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={!currentPrice}
              >
                Buy Now
              </Button>
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over Rs. 5,000</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Cash on Delivery available</span>
              </div>
            </div>
          </div>
        </div>

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
                  {benefits.map((benefit, index) => (
                    <li
                      key={`${benefit}-${index}`}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ingredients.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-medium mb-3">
                  Ingredients
                </h3>

                <p className="text-muted-foreground">
                  {ingredients.join(", ")}
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

    
      </div>
    </Layout>
  );
};

export default ProductDetail;
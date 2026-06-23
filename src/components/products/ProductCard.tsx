import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: {
    id?: string;
    name?: string;
    description?: string | null;
    price?: number;
    compare_at_price?: number | null;
    compareAtPrice?: number;
    image?: string | null;
    images?: string[] | null;
    in_stock?: boolean;
    inStock?: boolean;
    best_seller?: boolean;
    rating?: number | null;
    reviews_count?: number | null;
    reviewCount?: number;
    shortDescription?: string;
    benefits?: string[] | null;
    variants?: {
      id: string;
      name: string;
      price: number;
    }[];
    tags?: string[];
    category?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const images =
    product.images ||
    (product.image ? [product.image] : ["/placeholder.svg"]);

  const compareAtPrice =
    product.compare_at_price ?? product.compareAtPrice;

  const shortDescription =
    product.shortDescription ||
    product.description?.slice(0, 80) ||
    "";

  const rating = product.rating ?? 0;

  const reviewCount =
    product.reviews_count ?? product.reviewCount ?? 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const normalizedProduct: any = {
  ...product,
  slug: product.id,
  images,
  compareAtPrice,
  inStock: product.in_stock ?? product.inStock ?? true,
  shortDescription,
  rating,
  reviewCount,
  benefits: product.benefits ?? [],
  tags: product.tags ?? [],
};

    addToCart(
      normalizedProduct,
      1,
      normalizedProduct.variants?.[0]?.id
    );
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-foreground/80 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button
            variant="secondary"
            size="sm"
            className="w-full gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg font-medium leading-tight text-card-foreground line-clamp-1">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
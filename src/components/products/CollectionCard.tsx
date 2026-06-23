import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CollectionCardProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    productCount?: number;
  };
}

const CollectionCard = ({ collection }: CollectionCardProps) => {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
    >
      <img
        src={collection.image || "/placeholder.svg"}
        alt={collection.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-serif text-2xl font-medium text-background">
          {collection.name}
        </h3>
        {collection.description && (
          <p className="mt-1 text-sm text-background/80 line-clamp-2">
            {collection.description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Shop Collection <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;

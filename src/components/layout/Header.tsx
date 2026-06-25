import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useCollections, useSearchProducts } from "@/hooks/useProducts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount, setIsCartOpen } = useCart();
  const { data: collections = [] } = useCollections();
  const trimmedSearchQuery = searchQuery.trim();
  const { data: searchResults = [] } = useSearchProducts(trimmedSearchQuery);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const previewResults = useMemo(() => searchResults.slice(0, 5), [searchResults]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedSearchQuery) return;
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    navigate(`/collections?search=${encodeURIComponent(trimmedSearchQuery)}`);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p className="animate-fade-in">
          🌿 100% Natural & Organic Products • 🚚 Delivery in 3–7 Days • 💳 Secure Checkout
        </p>
      </div>

      <div className="container">
        <nav className="flex h-16 items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center gap-2 font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            <span className="text-primary">Organics</span> By Shahida
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Shop <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/collections" className="w-full">
                    All Collections
                  </Link>
                </DropdownMenuItem>
                {collections.map((collection) => (
                  <DropdownMenuItem key={collection.id} asChild>
                    <Link to={`/collections/${collection.slug}`} className="w-full">
                      {collection.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/account" onClick={closeMenus}>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </nav>

        {isSearchOpen && (
          <div className="border-t py-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for oils, essentials..."
                className="w-full rounded-full border bg-muted/50 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoFocus
              />
            </form>

            {trimmedSearchQuery && previewResults.length > 0 && (
              <div className="mt-3 rounded-xl border bg-card shadow-card overflow-hidden">
                {previewResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product?.id}`}
                    onClick={closeMenus}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <img
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Rs. {product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (!trimmedSearchQuery) return;
                    setIsSearchOpen(false);
                    navigate(`/collections?search=${encodeURIComponent(trimmedSearchQuery)}`);
                  }}
                  className="w-full border-t px-4 py-3 text-left text-sm font-medium text-primary hover:bg-muted"
                >
                  View all search results
                </button>
              </div>
            )}
          </div>
        )}

        {isMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-4 animate-fade-in">
            <Link to="/" className="block py-2 text-sm font-medium" onClick={closeMenus}>
              Home
            </Link>
            <Link to="/collections" className="block py-2 text-sm font-medium" onClick={closeMenus}>
              All Collections
            </Link>
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.slug}`}
                className="block py-2 pl-4 text-sm text-muted-foreground"
                onClick={closeMenus}
              >
                {collection.name}
              </Link>
            ))}
            <Link to="/about" className="block py-2 text-sm font-medium" onClick={closeMenus}>
              About
            </Link>
            <Link to="/contact" className="block py-2 text-sm font-medium" onClick={closeMenus}>
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

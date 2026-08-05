import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import {
  useProducts,
  useSearchProducts,
} from "@/hooks/useProducts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const {
    itemCount,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

  const {
    data: products = [],
    isLoading: productsLoading,
  } = useProducts();

  /* =====================================================
     SEARCH PRODUCTS
  ===================================================== */

  const trimmedSearchQuery =
    searchQuery.trim();

  const {
    data: searchResults = [],
  } = useSearchProducts(
    trimmedSearchQuery
  );

  /* =====================================================
     PREVIEW RESULTS
  ===================================================== */

  const previewResults = useMemo(
    () =>
      searchResults.slice(0, 5),
    [searchResults]
  );

  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  const isActive = (
    path: string
  ) => {
    return location.pathname === path;
  };

  /* =====================================================
     SEARCH SUBMIT
  ===================================================== */

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!trimmedSearchQuery) {
      return;
    }

    setIsSearchOpen(false);
    setIsMenuOpen(false);

    navigate(
      `/products?search=${encodeURIComponent(
        trimmedSearchQuery
      )}`
    );
  };

  /* =====================================================
     CLOSE MENUS
  ===================================================== */

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  /* =====================================================
     FORMAT PRICE
  ===================================================== */

  const formatPrice = (
    price?: number | string | null
  ) => {
    const numericPrice =
      Number(price);

    if (
      !Number.isFinite(
        numericPrice
      )
    ) {
      return "Price unavailable";
    }

    return `Rs. ${numericPrice.toLocaleString(
      "en-GB"
    )}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* =====================================================
          TOP ANNOUNCEMENT
      ===================================================== */}

      <div className="bg-primary py-2 text-center text-sm text-primary-foreground">
        <p className="animate-fade-in">
          🌿 100% Natural & Organic Products
          {" • "}
          🚚 Delivery in 3–7 Days
        </p>
      </div>

      <div className="container">
        <nav className="flex h-16 items-center justify-between">

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() =>
              setIsMenuOpen(
                !isMenuOpen
              )
            }
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center gap-2 font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            <span className="text-primary">
              Organics
            </span>{" "}
            By Shahida
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-8 lg:flex">

            {/* Home */}

            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Shop
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="center"
                className="w-64"
              >
                {/* All Products */}

                <DropdownMenuItem asChild>
                  <Link
                    to="/"
                    className="w-full font-medium"
                  >
                    All Products
                  </Link>
                </DropdownMenuItem>

                {/* Divider */}

                <div className="my-1 h-px bg-border" />

                {/* Products */}

                {productsLoading ? (
                  <DropdownMenuItem disabled>
                    Loading products...
                  </DropdownMenuItem>
                ) : products.length > 0 ? (
                  products
                    .slice(0, 6)
                    .map((product) => (
                      <DropdownMenuItem
                        key={product.id}
                        asChild
                      >
                        <Link
                          to={`/products/${product.id}`}
                          className="flex w-full items-center gap-3"
                        >
                          <img
                            src={
                              product
                                .images?.[0] ||
                              "/placeholder.svg"
                            }
                            alt={
                              product.name
                            }
                            className="h-9 w-9 rounded-md object-cover"
                          />

                          <span className="truncate">
                            {product.name}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))
                ) : (
                  <DropdownMenuItem disabled>
                    No products available
                  </DropdownMenuItem>
                )}

                {/* View All */}

                {products?.length > 6 && (
                  <>
                    <div className="my-1 h-px bg-border" />

                    <DropdownMenuItem
                      asChild
                    >
                      <Link
                        to="/products"
                        className="w-full font-medium text-primary"
                      >
                        View All Products
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About */}

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              About
            </Link>

            {/* Contact */}

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="flex items-center gap-2">

            {/* Search */}

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setIsSearchOpen(
                  !isSearchOpen
                )
              }
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Account */}

            <Link
              to="/account"
              onClick={closeMenus}
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() =>
                setIsCartOpen(true)
              }
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
          <div className="animate-fade-in border-t py-4">

            <form
              onSubmit={
                handleSearchSubmit
              }
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="search"
                placeholder="Search for oils, essentials..."
                className="w-full rounded-full border bg-muted/50 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                autoFocus
              />
            </form>

            {/* Search Preview */}

            {trimmedSearchQuery &&
              previewResults.length >
                0 && (
                <div className="mt-3 overflow-hidden rounded-xl border bg-card shadow-card">

                  {previewResults.map(
                    (product) => (
                      <Link
                        key={
                          product.id
                        }
                        to={`/products/${product.id}`}
                        onClick={
                          closeMenus
                        }
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                      >
                        {/* Product Image */}

                        <img
                          src={
                            product
                              .images?.[0] ||
                            "/placeholder.svg"
                          }
                          alt={
                            product.name
                          }
                          className="h-10 w-10 rounded-md object-cover"
                        />

                        {/* Product Details */}

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {
                              product.name
                            }
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {formatPrice(
                              product.price
                            )}
                          </p>
                        </div>
                      </Link>
                    )
                  )}

                  {/* View All Search Results */}

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        !trimmedSearchQuery
                      ) {
                        return;
                      }

                      setIsSearchOpen(
                        false
                      );

                      navigate(
                        `/products?search=${encodeURIComponent(
                          trimmedSearchQuery
                        )}`
                      );
                    }}
                    className="w-full border-t px-4 py-3 text-left text-sm font-medium text-primary hover:bg-muted"
                  >
                    View all search results
                  </button>
                </div>
              )}

            {/* No Search Results */}

            {trimmedSearchQuery &&
              previewResults.length ===
                0 && (
                <div className="mt-3 rounded-xl border bg-card p-4 text-center text-sm text-muted-foreground shadow-card">
                  No products found.
                </div>
              )}
          </div>
        )}

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {isMenuOpen && (
          <div className="animate-fade-in space-y-4 border-t py-4 lg:hidden">

            {/* Home */}

            <Link
              to="/"
              className="block py-2 text-sm font-medium"
              onClick={closeMenus}
            >
              Home
            </Link>

            {/* All Products */}

            <Link
              to="/"
              className="block py-2 text-sm font-medium"
              onClick={closeMenus}
            >
              All Products
            </Link>

            {/* Product List */}

            {products.length > 0 && (
              <div className="space-y-1 border-l pl-4">
                {products
                  .slice(0, 6)
                  .map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="flex items-center gap-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                      onClick={
                        closeMenus
                      }
                    >
                      <img
                        src={
                          product
                            .images?.[0] ||
                          "/placeholder.svg"
                        }
                        alt={
                          product.name
                        }
                        className="h-8 w-8 rounded-md object-cover"
                      />

                      <span>
                        {product.name}
                      </span>
                    </Link>
                  ))}
              </div>
            )}

            {/* About */}

            <Link
              to="/about"
              className="block py-2 text-sm font-medium"
              onClick={closeMenus}
            >
              About
            </Link>

            {/* Contact */}

            <Link
              to="/contact"
              className="block py-2 text-sm font-medium"
              onClick={closeMenus}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import { Link, useLocation } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const location = useLocation();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinkClick = () => {
    handleScrollTop();
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="font-serif text-2xl font-semibold"
            >
              <span className="text-primary">Organics</span> By Shahida
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium natural and organic products crafted with care. Nourishing
              your skin and wellness with nature’s finest ingredients.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/organics_by_s?igsh=MWp6ZXYzc2N5eXhnNw=="
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/collections" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-primary">
                Shop All
              </Link>
              <Link to="/about" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link to="/contact" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">
              Customer Service
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shipping" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-primary">
                Shipping Policy
              </Link>
              <Link to="/returns" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-primary">
                Returns & Refunds
              </Link>
              <Link to="/privacy" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Contact Us</h4>

            <div className="space-y-3">
              <a
                href="mailto:organicsbyshahida@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                organicsbyshahida@gmail.com
              </a>

              <a
                href="tel:+923094939574"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                +92 309 4939574
              </a>

              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                Multan, Pakistan, 66000
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Organics By Shahida. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
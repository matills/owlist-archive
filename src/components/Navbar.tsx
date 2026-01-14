import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";
import { useAuthStore } from "@/stores/authStore";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Características", href: "/#features" },
  { label: "Catálogo", href: "/explore" },
  { label: "Logros", href: "/#achievements" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { openModal } = useModalStore();
  const { user, logout } = useAuthStore();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Owlist Logo"
              className="w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-105"
            />
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              Owlist
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => 
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground font-medium hover:text-secondary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground font-medium hover:text-secondary transition-colors duration-200"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-secondary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => 
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-foreground font-medium hover:text-secondary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-foreground font-medium hover:text-secondary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
            <div className="pt-4 space-y-3 border-t border-foreground/10">
              {user ? (
                <Button variant="ghost" className="w-full" onClick={logout}>
                  Cerrar sesión
                </Button>
              ) : (
                <>
                  <Button
                    variant="teal-outline"
                    className="w-full"
                    onClick={() => {
                      openModal("login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="coral"
                    className="w-full"
                    onClick={() => {
                      openModal("signup");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

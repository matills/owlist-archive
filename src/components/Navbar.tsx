import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown, Plus, Zap, User, LogOut, Settings, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";
import { useAuthStore } from "@/stores/authStore";
import { LogModal } from "@/components/modals/LogModal";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "CONTENIDO", href: "/explore" },
  { label: "LISTAS", href: "/lists" },
  { label: "COMUNIDAD", href: "/community" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLogModalOpen, setIsLogModalOpen] = React.useState(false);
  const { openModal } = useModalStore();
  const { user, logout } = useAuthStore();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
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
            <div className="hidden md:flex items-center gap-6">
              {/* Auth-dependent left section */}
              {user && (
                <Zap size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              )}
              
              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground font-medium text-sm uppercase tracking-wide hover:text-secondary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Search Toggle / Input */}
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearchSubmit}
                    className="flex items-center"
                  >
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={18} />
                    </button>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar..."
                      className="w-full bg-card border border-input rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                  </motion.form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Search size={18} />
                  </button>
                )}
              </AnimatePresence>

              {/* Auth Section */}
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Log Button - Split: +LOG opens modal, dropdown arrow opens menu */}
                  <div className="flex items-center">
                    <Button
                      variant="coral"
                      size="sm"
                      className="gap-1 rounded-r-none pr-2"
                      onClick={() => setIsLogModalOpen(true)}
                    >
                      <Plus size={16} />
                      LOG
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="coral"
                          size="sm"
                          className="rounded-l-none pl-1 pr-2 border-l border-white/20"
                        >
                          <ChevronDown size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => setIsLogModalOpen(true)}>
                          <Plus size={16} className="mr-2" />
                          Registrar visualización
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <List size={16} className="mr-2" />
                          Añadir a lista...
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                          <User size={16} />
                        </div>
                        <span className="text-sm font-medium uppercase">{user.email?.split('@')[0]}</span>
                        <ChevronDown size={14} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <User size={16} className="mr-2" />
                        Mi Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings size={16} className="mr-2" />
                        Configuración
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-primary">
                        <LogOut size={16} className="mr-2" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openModal("login")}
                    className="text-foreground font-medium text-sm uppercase tracking-wide hover:text-secondary transition-colors"
                  >
                    INICIAR SESIÓN
                  </button>
                  <Button
                    variant="coral"
                    size="sm"
                    onClick={() => openModal("signup")}
                    className="uppercase"
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-foreground hover:text-secondary transition-colors"
              >
                <Search size={22} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:text-secondary transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleSearchSubmit}
                className="md:hidden overflow-hidden pb-3"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar contenido..."
                  className="w-full bg-card border border-input rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </motion.form>
            )}
          </AnimatePresence>

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-foreground font-medium hover:text-secondary transition-colors py-2 uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-foreground/10">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                        <User size={20} />
                      </div>
                      <span className="font-medium uppercase">{user.email?.split('@')[0]}</span>
                    </div>
                    <Button 
                      variant="coral" 
                      className="w-full gap-2"
                      onClick={() => {
                        setIsLogModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Plus size={18} />
                      LOG
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={logout}>
                      Cerrar sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="teal-outline"
                      className="w-full uppercase"
                      onClick={() => {
                        openModal("login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      INICIAR SESIÓN
                    </Button>
                    <Button
                      variant="coral"
                      className="w-full uppercase"
                      onClick={() => {
                        openModal("signup");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      REGISTRARSE
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Log Modal */}
      <LogModal open={isLogModalOpen} onOpenChange={setIsLogModalOpen} />
    </>
  );
};

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MediaCard } from "@/components/MediaCard";
import { SearchBar } from "@/components/explore/SearchBar";
import { FilterSidebar, Filters } from "@/components/explore/FilterSidebar";
import { MobileFilterDrawer } from "@/components/explore/MobileFilterDrawer";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/modals/LoginModal";
import { SignupModal } from "@/components/modals/SignupModal";
import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";
import { mockMedia, Media } from "@/data/mockMedia";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 12;

const defaultFilters: Filters = {
  type: 'all',
  genres: [],
  yearRange: [1990, new Date().getFullYear()],
  minRating: 0,
  language: 'all',
  sortBy: 'popularity',
};

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { toast } = useToast();

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (filters.type !== 'all') params.set('type', filters.type);
    if (filters.genres.length > 0) params.set('genres', filters.genres.join(','));
    if (filters.minRating > 0) params.set('rating', filters.minRating.toString());
    if (filters.language !== 'all') params.set('lang', filters.language);
    setSearchParams(params, { replace: true });
  }, [search, filters, setSearchParams]);

  // Filter and sort media
  const filteredMedia = useMemo(() => {
    let result = [...mockMedia];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(searchLower) ||
          m.genres.some((g) => g.toLowerCase().includes(searchLower))
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter((m) => m.type === filters.type);
    }

    // Genre filter
    if (filters.genres.length > 0) {
      result = result.filter((m) =>
        filters.genres.some((g) => m.genres.includes(g))
      );
    }

    // Year filter
    result = result.filter(
      (m) => m.year >= filters.yearRange[0] && m.year <= filters.yearRange[1]
    );

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((m) => m.rating >= filters.minRating * 2);
    }

    // Language filter
    if (filters.language !== 'all') {
      result = result.filter((m) => m.language === filters.language);
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order for popularity
        break;
    }

    return result;
  }, [search, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredMedia.length / ITEMS_PER_PAGE);
  const paginatedMedia = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMedia.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMedia, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters, search]);

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearch('');
  };

  const handleAddToList = (media: Media) => {
    toast({
      title: "¡Añadido a tu lista!",
      description: `${media.title} se agregó a tu watchlist.`,
    });
  };

  const handleMarkWatched = (media: Media) => {
    toast({
      title: "¡Marcado como visto!",
      description: `${media.title} se marcó como visto.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Explorar
            </h1>
            <p className="text-muted-foreground">
              Descubre películas, series y anime para tu watchlist
            </p>
          </div>

          {/* Search Bar - Sticky */}
          <div className="sticky top-20 z-20 bg-background py-4 -mx-4 px-4 md:-mx-8 md:px-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-card border-2 border-input rounded-lg text-foreground hover:border-secondary transition-colors"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-8 mt-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onClear={handleClearFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredMedia.length} resultado{filteredMedia.length !== 1 && 's'}
                </p>
              </div>

              {/* Media Grid */}
              <AnimatePresence mode="wait">
                {paginatedMedia.length > 0 ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                  >
                    {paginatedMedia.map((media, index) => (
                      <MediaCard
                        key={media.id}
                        media={media}
                        index={index}
                        onAddToList={() => handleAddToList(media)}
                        onMarkWatched={() => handleMarkWatched(media)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <EmptyState
                    actionLabel="Limpiar filtros"
                    onAction={handleClearFilters}
                  />
                )}
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={18} />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "coral" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        onClear={handleClearFilters}
        resultCount={filteredMedia.length}
      />

      <Footer />

      {/* Auth Modals */}
      <LoginModal />
      <SignupModal />
      <ForgotPasswordModal />
    </div>
  );
};

export default Explore;

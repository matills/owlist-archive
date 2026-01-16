import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/modals/LoginModal";
import { SignupModal } from "@/components/modals/SignupModal";
import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";
import { FiltersModal, FilterState } from "@/components/explore/FiltersModal";
import { mockMedia, Media } from "@/data/mockMedia";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 48;

const defaultFilters: FilterState = {
  type: "all",
  genres: [],
  decade: "all",
  sortBy: "popularity",
  minRating: 0,
  language: "all",
};

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<FilterState>(() => ({
    type: searchParams.get('type') || 'all',
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
    decade: searchParams.get('decade') || 'all',
    sortBy: searchParams.get('sort') || 'popularity',
    minRating: Number(searchParams.get('minRating')) || 0,
    language: searchParams.get('language') || 'all',
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const { toast } = useToast();

  const hasActiveFilters = 
    filters.type !== 'all' || 
    filters.genres.length > 0 || 
    filters.decade !== 'all' || 
    filters.minRating > 0 ||
    filters.language !== 'all' ||
    search;

  const activeFilterCount = [
    filters.type !== 'all',
    filters.genres.length > 0,
    filters.decade !== 'all',
    filters.minRating > 0,
    filters.language !== 'all',
  ].filter(Boolean).length;

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (filters.type !== 'all') params.set('type', filters.type);
    if (filters.genres.length > 0) params.set('genres', filters.genres.join(','));
    if (filters.decade !== 'all') params.set('decade', filters.decade);
    if (filters.sortBy !== 'popularity') params.set('sort', filters.sortBy);
    if (filters.minRating > 0) params.set('minRating', String(filters.minRating));
    if (filters.language !== 'all') params.set('language', filters.language);
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

    // Genre filter (OR logic - matches any selected genre)
    if (filters.genres.length > 0) {
      result = result.filter((m) =>
        filters.genres.some((g) => m.genres.includes(g))
      );
    }

    // Decade filter
    if (filters.decade !== 'all') {
      const decadeStart = parseInt(filters.decade);
      result = result.filter(
        (m) => m.year >= decadeStart && m.year < decadeStart + 10
      );
    }

    // Min rating filter
    if (filters.minRating > 0) {
      result = result.filter((m) => m.rating >= filters.minRating);
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
  }, [filters, search]);

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearch('');
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const removeFilter = (filterType: keyof FilterState, value?: string) => {
    setFilters((prev) => {
      if (filterType === 'genres' && value) {
        return { ...prev, genres: prev.genres.filter((g) => g !== value) };
      }
      return { ...prev, [filterType]: defaultFilters[filterType] };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header with Title, Search, and Filters Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Explorar Contenido
            </h1>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar título..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border-2 border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Filters Button */}
              <Button
                variant="outline"
                onClick={() => setIsFiltersModalOpen(true)}
                className={cn(
                  "gap-2 border-2",
                  activeFilterCount > 0 && "border-secondary text-secondary"
                )}
              >
                <Filter size={18} />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">
                {filteredMedia.length} resultado{filteredMedia.length !== 1 && 's'}
              </span>
              
              {/* Active filter pills */}
              {filters.type !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                  {filters.type === 'movie' ? 'Películas' : filters.type === 'series' ? 'Series' : 'Anime'}
                  <button onClick={() => removeFilter('type')} className="hover:text-primary">
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {filters.genres.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                >
                  {genre}
                  <button onClick={() => removeFilter('genres', genre)} className="hover:text-primary">
                    <X size={14} />
                  </button>
                </span>
              ))}
              
              {filters.decade !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                  {filters.decade}s
                  <button onClick={() => removeFilter('decade')} className="hover:text-primary">
                    <X size={14} />
                  </button>
                </span>
              )}

              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                  Rating ≥ {filters.minRating}
                  <button onClick={() => removeFilter('minRating')} className="hover:text-primary">
                    <X size={14} />
                  </button>
                </span>
              )}

              {search && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                  "{search}"
                  <button onClick={() => setSearch('')} className="hover:text-primary">
                    <X size={14} />
                  </button>
                </span>
              )}

              <button
                onClick={handleClearFilters}
                className="text-sm text-primary hover:underline ml-2"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Media Grid */}
          <AnimatePresence mode="wait">
            {paginatedMedia.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3"
              >
                {paginatedMedia.map((media, index) => (
                  <motion.div
                    key={media.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.01 }}
                  >
                    <Link to={`/media/${media.id}`} className="block group">
                      <div className="relative aspect-[2/3] rounded overflow-hidden">
                        <img
                          src={media.poster}
                          alt={media.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
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
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <LoginModal />
      <SignupModal />
      <ForgotPasswordModal />
      <FiltersModal
        open={isFiltersModalOpen}
        onOpenChange={setIsFiltersModalOpen}
        filters={filters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
};

export default Explore;

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, Eye, Users, Heart, X, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MediaCard } from "@/components/MediaCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/modals/LoginModal";
import { SignupModal } from "@/components/modals/SignupModal";
import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";
import { mockMedia, Media, genres } from "@/data/mockMedia";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 24;

const decades = [
  { label: "Todos", value: "all" },
  { label: "2020s", value: "2020" },
  { label: "2010s", value: "2010" },
  { label: "2000s", value: "2000" },
  { label: "1990s", value: "1990" },
  { label: "1980s", value: "1980" },
];

const sortOptions = [
  { label: "Popularidad", value: "popularity" },
  { label: "Rating más alto", value: "rating" },
  { label: "Más reciente", value: "year" },
  { label: "A-Z", value: "title" },
];

const typeOptions = [
  { label: "Todo", value: "all" },
  { label: "Películas", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Anime", value: "anime" },
];

interface Filters {
  type: string;
  genres: string[];
  decade: string;
  sortBy: string;
}

// Popular section card with stats
const PopularCard = ({ media, index }: { media: Media; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex-shrink-0 w-[200px] md:w-[240px]"
    >
      <Link to={`/media/${media.id}`} className="block group">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
          <img
            src={media.poster}
            alt={media.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye size={12} className="text-secondary" />
            {Math.floor(Math.random() * 500 + 100)}K
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-secondary" />
            {Math.floor(Math.random() * 100 + 20)}K
          </span>
          <span className="flex items-center gap-1">
            <Heart size={12} className="text-primary" />
            {Math.floor(Math.random() * 200 + 50)}K
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

// Filter Dropdown Component
const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  isActive,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  isActive?: boolean;
}) => {
  const selectedOption = options.find((o) => o.value === value);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            isActive
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {selectedOption?.label || label}
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              value === option.value && "bg-secondary/10 text-secondary"
            )}
          >
            {value === option.value && <span className="mr-2">✓</span>}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Genre Filter with toggle behavior
const GenreFilter = ({
  selectedGenres,
  onToggle,
}: {
  selectedGenres: string[];
  onToggle: (genre: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            selectedGenres.length > 0
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {selectedGenres.length > 0 ? `Género (${selectedGenres.length})` : "Género"}
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[180px] max-h-[300px] overflow-y-auto">
        <DropdownMenuItem onClick={() => onToggle("all")}>
          Cualquier género
        </DropdownMenuItem>
        {genres.map((genre) => (
          <DropdownMenuItem
            key={genre}
            onClick={() => onToggle(genre)}
            className={cn(
              selectedGenres.includes(genre) && "bg-secondary/10 text-secondary"
            )}
          >
            {selectedGenres.includes(genre) && <span className="mr-2">✓</span>}
            {genre}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<Filters>({
    type: searchParams.get('type') || 'all',
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
    decade: searchParams.get('decade') || 'all',
    sortBy: searchParams.get('sort') || 'popularity',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const hasActiveFilters = filters.type !== 'all' || filters.genres.length > 0 || filters.decade !== 'all' || search;

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (filters.type !== 'all') params.set('type', filters.type);
    if (filters.genres.length > 0) params.set('genres', filters.genres.join(','));
    if (filters.decade !== 'all') params.set('decade', filters.decade);
    if (filters.sortBy !== 'popularity') params.set('sort', filters.sortBy);
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

  // Popular media for carousel
  const popularMedia = useMemo(() => {
    return [...mockMedia].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, []);

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
    setFilters({
      type: 'all',
      genres: [],
      decade: 'all',
      sortBy: 'popularity',
    });
    setSearch('');
  };

  const handleGenreToggle = (genre: string) => {
    if (genre === "all") {
      setFilters((prev) => ({ ...prev, genres: [] }));
      return;
    }
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
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
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm font-medium text-foreground uppercase tracking-wide">
              Explorar
            </span>
            
            <FilterDropdown
              label="Tipo"
              value={filters.type}
              options={typeOptions}
              onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
              isActive={filters.type !== 'all'}
            />
            
            <FilterDropdown
              label="Década"
              value={filters.decade}
              options={decades}
              onChange={(value) => setFilters((prev) => ({ ...prev, decade: value }))}
              isActive={filters.decade !== 'all'}
            />
            
            <GenreFilter
              selectedGenres={filters.genres}
              onToggle={handleGenreToggle}
            />

            <FilterDropdown
              label="Ordenar"
              value={filters.sortBy}
              options={sortOptions}
              onChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
              isActive={filters.sortBy !== 'popularity'}
            />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar título..."
                className="pl-9 pr-4 py-1.5 bg-card border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 w-48"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">
                {filteredMedia.length} {filters.genres.length > 0 && (
                  <span className="text-secondary font-medium">
                    {filters.genres.join(', ').toLowerCase()}
                  </span>
                )} resultado{filteredMedia.length !== 1 && 's'}
              </span>
              
              {/* Active filter pills */}
              {filters.type !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full">
                  {typeOptions.find(o => o.value === filters.type)?.label}
                  <button onClick={() => setFilters(prev => ({ ...prev, type: 'all' }))}>
                    <X size={12} />
                  </button>
                </span>
              )}
              
              {filters.genres.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full"
                >
                  {genre}
                  <button onClick={() => handleGenreToggle(genre)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              
              {filters.decade !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full">
                  {decades.find(d => d.value === filters.decade)?.label}
                  <button onClick={() => setFilters(prev => ({ ...prev, decade: 'all' }))}>
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                onClick={handleClearFilters}
                className="text-xs text-primary hover:underline ml-2"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Popular Section - Only show when no filters */}
          {!hasActiveFilters && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Popular esta semana
                </h2>
                <Link to="/explore?sort=rating" className="text-xs text-secondary hover:underline">
                  Más
                </Link>
              </div>
              
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {popularMedia.map((media, index) => (
                    <PopularCard key={media.id} media={media} index={index} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Media Grid */}
          <section>
            {!hasActiveFilters && (
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Todos los títulos
              </h2>
            )}
            
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
                      transition={{ delay: index * 0.02 }}
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
                  size="icon"
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                </Button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "coral" : "outline"}
                      size="icon"
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Auth Modals */}
      <LoginModal />
      <SignupModal />
      <ForgotPasswordModal />
    </div>
  );
};

export default Explore;
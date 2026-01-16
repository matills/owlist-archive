import * as React from "react";
import { X, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { genres, languages } from "@/data/mockMedia";
import { cn } from "@/lib/utils";

const typeOptions = [
  { label: "Todo", value: "all" },
  { label: "Películas", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Anime", value: "anime" },
];

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

export interface FilterState {
  type: string;
  genres: string[];
  decade: string;
  sortBy: string;
  minRating: number;
  language: string;
}

interface FiltersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onClear: () => void;
}

export const FiltersModal: React.FC<FiltersModalProps> = ({
  open,
  onOpenChange,
  filters,
  onApply,
  onClear,
}) => {
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters, open]);

  const handleApply = () => {
    onApply(localFilters);
    onOpenChange(false);
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      type: "all",
      genres: [],
      decade: "all",
      sortBy: "popularity",
      minRating: 0,
      language: "all",
    };
    setLocalFilters(clearedFilters);
    onClear();
    onOpenChange(false);
  };

  const toggleGenre = (genre: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const hasActiveFilters =
    localFilters.type !== "all" ||
    localFilters.genres.length > 0 ||
    localFilters.decade !== "all" ||
    localFilters.minRating > 0 ||
    localFilters.language !== "all";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <Filter size={24} />
              Filtros
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Type Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Tipo
            </label>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setLocalFilters((prev) => ({ ...prev, type: option.value }))
                  }
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    localFilters.type === option.value
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Decade Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Década
            </label>
            <div className="flex flex-wrap gap-2">
              {decades.map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setLocalFilters((prev) => ({ ...prev, decade: option.value }))
                  }
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    localFilters.decade === option.value
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Géneros
            </label>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    localFilters.genres.includes(genre)
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Min Rating Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Rating mínimo: {localFilters.minRating > 0 ? localFilters.minRating : "Cualquiera"}
            </label>
            <Slider
              value={[localFilters.minRating]}
              onValueChange={([value]) =>
                setLocalFilters((prev) => ({ ...prev, minRating: value }))
              }
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Idioma
            </label>
            <select
              value={localFilters.language}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, language: e.target.value }))
              }
              className="w-full px-4 py-2 bg-background border-2 border-input rounded-lg text-foreground focus:outline-none focus:border-secondary"
            >
              <option value="all">Todos los idiomas</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Ordenar por
            </label>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setLocalFilters((prev) => ({ ...prev, sortBy: option.value }))
                  }
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    localFilters.sortBy === option.value
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 pt-0 flex items-center justify-between gap-4 border-t border-input mt-2 pt-4">
          <Button
            variant="ghost"
            onClick={handleClear}
            className={cn(
              "text-primary hover:text-primary",
              !hasActiveFilters && "opacity-50"
            )}
            disabled={!hasActiveFilters}
          >
            Limpiar filtros
          </Button>
          <Button variant="teal" onClick={handleApply} className="px-8">
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

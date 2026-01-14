import * as React from "react";
import { X, Filter } from "lucide-react";
import { TypeFilter } from "./TypeFilter";
import { GenreFilter } from "./GenreFilter";
import { YearRangeFilter } from "./YearRangeFilter";
import { RatingFilter } from "./RatingFilter";
import { LanguageFilter } from "./LanguageFilter";
import { SortFilter, SortOption } from "./SortFilter";

export interface Filters {
  type: 'all' | 'movie' | 'series' | 'anime';
  genres: string[];
  yearRange: [number, number];
  minRating: number;
  language: string;
  sortBy: SortOption;
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onClear,
}) => {
  const hasActiveFilters = 
    filters.type !== 'all' || 
    filters.genres.length > 0 || 
    filters.minRating > 0 ||
    filters.language !== 'all' ||
    filters.yearRange[0] !== 1990 ||
    filters.yearRange[1] !== new Date().getFullYear();

  return (
    <div className="bg-card rounded-lg p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Filter size={18} />
          Filtros
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <X size={14} />
            Limpiar
          </button>
        )}
      </div>

      <TypeFilter
        value={filters.type}
        onChange={(type) => onChange({ ...filters, type })}
      />

      <GenreFilter
        value={filters.genres}
        onChange={(genres) => onChange({ ...filters, genres })}
      />

      <YearRangeFilter
        value={filters.yearRange}
        onChange={(yearRange) => onChange({ ...filters, yearRange })}
      />

      <RatingFilter
        value={filters.minRating}
        onChange={(minRating) => onChange({ ...filters, minRating })}
      />

      <LanguageFilter
        value={filters.language}
        onChange={(language) => onChange({ ...filters, language })}
      />

      <SortFilter
        value={filters.sortBy}
        onChange={(sortBy) => onChange({ ...filters, sortBy })}
      />
    </div>
  );
};

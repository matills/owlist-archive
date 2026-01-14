import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = 'popularity' | 'rating' | 'year' | 'title';

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularidad' },
  { value: 'rating', label: 'Rating' },
  { value: 'year', label: 'Más reciente' },
  { value: 'title', label: 'Título A-Z' },
];

export const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <ArrowUpDown size={14} />
        Ordenar por
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-card border-input">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

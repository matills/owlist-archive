import * as React from "react";
import { X } from "lucide-react";
import { genres } from "@/data/mockMedia";

interface GenreFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ value, onChange }) => {
  const toggleGenre = (genre: string) => {
    if (value.includes(genre)) {
      onChange(value.filter((g) => g !== genre));
    } else {
      onChange([...value, genre]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Géneros</label>
      
      {/* Selected Tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((genre) => (
            <span
              key={genre}
              className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
            >
              {genre}
              <button
                onClick={() => toggleGenre(genre)}
                className="hover:text-primary transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Genre List */}
      <div className="flex flex-wrap gap-1">
        {genres.filter((g) => !value.includes(g)).map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className="px-2 py-1 text-xs rounded-full bg-card text-muted-foreground hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

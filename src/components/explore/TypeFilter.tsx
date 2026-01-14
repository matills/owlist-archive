import * as React from "react";
import { Film, Tv, Sparkles } from "lucide-react";

type MediaType = 'all' | 'movie' | 'series' | 'anime';

interface TypeFilterProps {
  value: MediaType;
  onChange: (value: MediaType) => void;
}

const types: { value: MediaType; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'Todos', icon: Sparkles },
  { value: 'movie', label: 'Películas', icon: Film },
  { value: 'series', label: 'Series', icon: Tv },
  { value: 'anime', label: 'Anime', icon: Sparkles },
];

export const TypeFilter: React.FC<TypeFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Tipo</label>
      <div className="grid grid-cols-2 gap-2">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => onChange(type.value)}
            className={`
              flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${value === type.value 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card text-muted-foreground hover:bg-primary/10'
              }
            `}
          >
            <type.icon size={16} />
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

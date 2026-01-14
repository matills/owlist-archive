import * as React from "react";
import { Star } from "lucide-react";

interface RatingFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Rating mínimo</label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star === value ? 0 : star)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              size={24}
              className={`transition-colors duration-200 ${
                star <= value 
                  ? 'fill-warning text-warning' 
                  : 'text-muted-foreground/30 hover:text-primary'
              }`}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-sm text-muted-foreground">
            {value * 2}+
          </span>
        )}
      </div>
    </div>
  );
};

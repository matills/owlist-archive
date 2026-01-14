import * as React from "react";
import { Slider } from "@/components/ui/slider";

interface YearRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const MIN_YEAR = 1990;
const MAX_YEAR = new Date().getFullYear();

export const YearRangeFilter: React.FC<YearRangeFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Año</label>
        <span className="text-xs text-muted-foreground">
          {value[0]} - {value[1]}
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={(v) => onChange(v as [number, number])}
        min={MIN_YEAR}
        max={MAX_YEAR}
        step={1}
        minStepsBetweenThumbs={1}
        className="w-full"
      />
    </div>
  );
};

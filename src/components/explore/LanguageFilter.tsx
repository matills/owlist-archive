import * as React from "react";
import { languages } from "@/data/mockMedia";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageFilter: React.FC<LanguageFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Idioma</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-card border-input">
          <SelectValue placeholder="Todos los idiomas" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="all">Todos los idiomas</SelectItem>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

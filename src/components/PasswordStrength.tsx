import * as React from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = (pwd: string): { level: number; label: string } => {
    if (!pwd) return { level: 0, label: "" };
    
    let score = 0;
    
    // Length
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    
    // Character variety
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    
    if (score <= 2) return { level: 1, label: "Débil" };
    if (score <= 4) return { level: 2, label: "Media" };
    return { level: 3, label: "Fuerte" };
  };
  
  const { level, label } = getStrength(password);
  
  if (!password) return null;
  
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              i <= level
                ? level === 1
                  ? "bg-destructive"
                  : level === 2
                  ? "bg-warning"
                  : "bg-success"
                : "bg-muted"
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-xs font-medium",
        level === 1 && "text-destructive",
        level === 2 && "text-warning",
        level === 3 && "text-success"
      )}>
        Contraseña: {label}
      </p>
    </div>
  );
};

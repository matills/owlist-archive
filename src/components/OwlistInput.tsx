import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, Eye, EyeOff } from "lucide-react";

interface OwlistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const OwlistInput = React.forwardRef<HTMLInputElement, OwlistInputProps>(
  ({ className, label, error, success, leftIcon, rightIcon, showPasswordToggle, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const inputType = showPasswordToggle 
      ? (showPassword ? "text" : "password")
      : type;
    
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            ref={ref}
            className={cn(
              "owlist-input",
              leftIcon && "pl-12",
              (rightIcon || showPasswordToggle || success !== undefined) && "pr-12",
              error && "border-destructive focus:border-destructive focus:ring-destructive/20",
              success && "border-success focus:border-success focus:ring-success/20",
              className
            )}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {!showPasswordToggle && success !== undefined && (
            <div className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2",
              success ? "text-success" : "text-destructive"
            )}>
              {success ? <Check size={20} /> : <X size={20} />}
            </div>
          )}
          {!showPasswordToggle && rightIcon && success === undefined && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

OwlistInput.displayName = "OwlistInput";

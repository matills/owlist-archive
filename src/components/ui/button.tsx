import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-dark active:scale-[0.98]",
        secondary:
          "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:
          "text-foreground hover:bg-secondary/10 hover:text-secondary",
        link:
          "text-secondary underline-offset-4 hover:underline",
        coral:
          "bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft hover:shadow-medium active:scale-[0.98]",
        teal:
          "bg-secondary text-secondary-foreground hover:bg-secondary-dark shadow-soft hover:shadow-medium active:scale-[0.98]",
        "coral-outline":
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",
        "teal-outline":
          "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground active:scale-[0.98]",
        oauth:
          "bg-white border-2 border-input text-foreground hover:border-secondary shadow-soft",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm rounded-md",
        sm: "h-9 px-4 text-xs rounded-md",
        lg: "h-12 px-8 text-base rounded-md",
        icon: "h-10 w-10 rounded-md",
        full: "h-12 w-full px-6 py-3 text-base rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

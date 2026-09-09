import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-fire-orange/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep active:not-disabled:scale-[0.96] transition-[scale,background-color,color,box-shadow,border-color,opacity] duration-150 ease-out",
  {
    variants: {
      variant: {
        default: "bg-fire-red text-text-light hover:bg-fire-orange glow-ember",
        gold: "bg-fire-gold text-bg-deep hover:bg-fire-gold/90 glow-gold",
        outline:
          "border border-fire-red/45 bg-transparent text-text-light hover:border-fire-orange hover:bg-fire-red/12",
        ghost: "bg-transparent text-text-light hover:bg-text-light/6",
      },
      size: {
        default: "h-11 rounded-md px-5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-7 text-base",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

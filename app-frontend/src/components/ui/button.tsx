import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer border-2",

  {
    variants: {
      variant: {
        primary: "bg-primary text-black border-white/30 hover:bg-primary/90",
        secondary: "bg-secondary text-white border-white/20 hover:bg-secondary/90",
        success: "bg-success text-white border-white/20 hover:bg-success/90",
        danger: "bg-danger text-white border-white/20 hover:bg-danger/90",
        background: "bg-background text-black border-white/30 hover:bg-background/90",
        red: "bg-red text-white border-white/20 hover:bg-red/90",
        purple: "bg-purple text-white border-white/20 hover:bg-purple/90",
        yellow: "bg-yellow text-black border-white/20 hover:bg-yellow/90",
        green: "bg-green text-white border-white/20 hover:bg-green/90",
        blue: "bg-blue text-white border-white/20 hover:bg-blue/90",
        pink: "bg-pink text-white border-white/20 hover:bg-pink/90",
        teal: "bg-teal text-white border-white/20 hover:bg-teal/90",
        black: "bg-black text-white border-white/20 hover:bg-black/90",

        "outline-primary": " text-black border-primary hover:bg-primary transition",
        "outline-secondary": " text-black border-secondary hover:bg-secondary hover:text-white transition",
        "outline-success": " text-black border-success hover:bg-success hover:text-white transition",
        "outline-danger": " text-black border-danger hover:bg-danger hover:text-white transition",
        "outline-background": " text-black bg-white/50 border-black/3 hover:bg-background transition",
        "outline-white": " text-black bg-white/50 border-black/3 hover:bg-white transition",
        "outline-red": " text-black border-red hover:bg-red transition",
        "outline-purple": " text-black border-purple hover:bg-purple transition",
        "outline-yellow": " text-black border-yellow hover:bg-yellow transition",
        "outline-green": " text-black border-green hover:bg-green transition",
        "outline-blue": " text-black border-blue hover:bg-blue transition",
        "outline-pink": " text-black border-pink hover:bg-pink transition",
        "outline-teal": " text-black border-teal hover:bg-teal transition",
        "outline-black": " text-black border-black hover:bg-black transition",
        ghost: "bg-transparent text-foreground hover:bg-white border-transparent",
        "ghost-background": "bg-transparent text-foreground hover:bg-background border-transparent",
        subtle: "bg-black/5 text-black hover:bg-black/10 border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-none bg-transparent border-2 w-auto",
      },

      size: {
        xs: "h-6 px-2 text-sm",
        sm: "h-8 px-3 text-md",
        default: "h-9 px-4 text-base",
        lg: "h-11 px-6 text-lg",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)
// 🧠 Typage plus souple : accepte tout élément HTML
type ButtonProps = {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof buttonVariants> &
  React.HTMLAttributes<HTMLElement>;

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

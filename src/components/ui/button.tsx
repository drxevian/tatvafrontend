import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-tatva-blue to-tatva-teal text-white hover:from-tatva-blue/90 hover:to-tatva-teal/90 shadow-md hover:shadow-lg",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground hover:from-destructive/90 hover:to-destructive/70",
        outline:
          "border border-input bg-gradient-to-br from-white via-white to-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md",
        secondary:
          "bg-gradient-to-r from-secondary/80 to-secondary text-secondary-foreground hover:from-secondary/70 hover:to-secondary/90",
        ghost: "hover:bg-gradient-to-br from-accent/50 to-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:text-tatva-blue transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

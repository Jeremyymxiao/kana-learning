import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        correct: [
          "bg-green-100",
          "border-2",
          "border-green-500",
          "text-green-700",
          "hover:bg-green-100",
          "disabled:opacity-100",
          "disabled:bg-green-100",
          "transition-colors",
          "dark:bg-green-900/30",
          "dark:border-green-500",
          "dark:text-green-300",
          "dark:hover:bg-green-900/30"
        ].join(" "),
        incorrect: [
          "bg-red-100",
          "border-2",
          "border-red-500",
          "text-red-700",
          "hover:bg-red-100",
          "disabled:opacity-100",
          "disabled:bg-red-100",
          "transition-colors",
          "dark:bg-red-900/30",
          "dark:border-red-500",
          "dark:text-red-300",
          "dark:hover:bg-red-900/30"
        ].join(" "),
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        quiz: "h-16 text-lg w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// ... 其他代码保持不变

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // 显式声明 variant 的类型
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "correct" | "incorrect";
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

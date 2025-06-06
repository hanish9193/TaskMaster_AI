import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Changed from rounded-lg to rounded-2xl
      "rounded-2xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// Updated CardTitle component name to match convention and remove potential div conflict
const CardTitle = React.forwardRef<
  HTMLParagraphElement, // Changed to p element for semantic correctness
  React.HTMLAttributes<HTMLHeadingElement> // Keep heading attributes for flexibility
>(({ className, ...props }, ref) => (
  <p // Changed from div to p
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props} // Props might include heading-related attributes
  />
))
CardTitle.displayName = "CardTitle"

// Updated CardDescription component name to match convention and remove potential div conflict
const CardDescription = React.forwardRef<
  HTMLParagraphElement, // Changed to p element for semantic correctness
  React.HTMLAttributes<HTMLParagraphElement> // Use paragraph attributes
>(({ className, ...props }, ref) => (
  <p // Changed from div to p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

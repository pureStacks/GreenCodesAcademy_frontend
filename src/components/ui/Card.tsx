import * as React from "react"
import { cn } from "@/src/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-gray-100 bg-white text-gray-950 shadow-sm transition-all duration-300",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }

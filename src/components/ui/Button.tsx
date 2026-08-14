import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-green-700 text-white hover:bg-green-800 shadow-md': variant === 'primary',
            'bg-yellow-400 text-green-900 hover:bg-yellow-500 shadow-md': variant === 'secondary',
            'border-2 border-green-700 text-green-700 hover:bg-green-50': variant === 'outline',
            'hover:bg-green-100 text-green-800': variant === 'ghost',
            'bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-md': variant === 'whatsapp',
            'h-9 px-4 py-2': size === 'sm',
            'h-12 px-6 py-3 text-base': size === 'md',
            'h-14 px-8 py-4 text-lg': size === 'lg',
            'h-12 w-12': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

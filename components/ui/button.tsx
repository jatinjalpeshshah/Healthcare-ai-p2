import * as React from "react";
import { cn } from "@/lib/utils/format";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-medium shadow-sm hover:shadow",
      outline: "border border-slate-700 hover:bg-slate-800 text-slate-200",
      ghost: "hover:bg-slate-800/60 text-slate-300 hover:text-white",
      secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100",
      destructive: "bg-rose-600 hover:bg-rose-700 text-white",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-11 px-6 text-base",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

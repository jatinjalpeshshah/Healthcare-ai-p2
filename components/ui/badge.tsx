import * as React from "react";
import { cn } from "@/lib/utils/format";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "cyan" | "muted";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    secondary: "bg-slate-800 text-slate-300 border-slate-700",
    outline: "text-slate-300 border-slate-700",
    cyan: "bg-cyan-950/80 text-cyan-300 border-cyan-800",
    muted: "bg-slate-800/40 text-slate-400 border-slate-800",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

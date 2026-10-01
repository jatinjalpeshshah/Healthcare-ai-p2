"use client";

import { cn } from "@/lib/utils/format";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-800/60",
        className
      )}
      style={style}
    />
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3", className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center space-x-4 py-3 px-4 border-b border-slate-800/60">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32 flex-1" />
      <Skeleton className="h-5 w-12 rounded-full" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

export function SkeletonSymptoms() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="h-7 rounded-lg" style={{ width: `${60 + Math.random() * 60}px` }} />
      ))}
    </div>
  );
}

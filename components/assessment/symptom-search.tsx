"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SymptomSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function SymptomSearch({
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: SymptomSearchProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          type="text"
          placeholder="Search symptoms (e.g. fever, cough, chest pain, fatigue)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500"
        />
      </div>
      <div className="flex justify-between items-center text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-200">{filteredCount}</strong> of{" "}
          <strong className="text-slate-200">{totalCount}</strong> supported symptoms
        </span>
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="text-cyan-400 hover:underline"
          >
            Clear search
          </button>
        )}
      </div>
    </div>
  );
}

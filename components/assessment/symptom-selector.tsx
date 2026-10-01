"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X, Plus, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface SymptomSelectorProps {
  supportedSymptoms: string[];
  selectedSymptoms: string[];
  isLoading: boolean;
  onAddSymptom: (symptom: string) => void;
  onRemoveSymptom: (symptom: string) => void;
  onClearAll: () => void;
}

function formatSymptomLabel(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SymptomSelector({
  supportedSymptoms,
  selectedSymptoms,
  isLoading,
  onAddSymptom,
  onRemoveSymptom,
  onClearAll,
}: SymptomSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSymptoms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return supportedSymptoms;
    return supportedSymptoms.filter((s) => s.toLowerCase().includes(q));
  }, [supportedSymptoms, searchQuery]);

  const handleToggle = useCallback(
    (symptom: string) => {
      if (selectedSymptoms.includes(symptom)) {
        onRemoveSymptom(symptom);
      } else {
        onAddSymptom(symptom);
      }
    },
    [selectedSymptoms, onAddSymptom, onRemoveSymptom]
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3 text-slate-400">
        <Loader2 className="h-7 w-7 animate-spin text-cyan-400" />
        <p className="text-sm">Loading symptom indicators from API...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Selected chips */}
      <AnimatePresence>
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-cyan-400">
                  Selected ({selectedSymptoms.length})
                </span>
                <button
                  onClick={onClearAll}
                  className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors"
                  aria-label="Clear all selected symptoms"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedSymptoms.map((symptom) => (
                    <motion.button
                      key={symptom}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => onRemoveSymptom(symptom)}
                      className="inline-flex items-center space-x-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-3 py-1.5 text-xs font-medium hover:bg-rose-500/20 hover:border-rose-400/40 hover:text-rose-300 transition-colors"
                      aria-label={`Remove ${formatSymptomLabel(symptom)}`}
                    >
                      <span>{formatSymptomLabel(symptom)}</span>
                      <X className="h-3 w-3 shrink-0" />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
        <Input
          type="search"
          placeholder={`Search ${supportedSymptoms.length} symptoms...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
          aria-label="Search symptoms"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-[11px] text-slate-500">
        {searchQuery
          ? `${filteredSymptoms.length} of ${supportedSymptoms.length} symptoms shown`
          : `${supportedSymptoms.length} symptoms available`}
      </p>

      {/* Symptom grid */}
      <div
        className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 max-h-80 overflow-y-auto"
        role="listbox"
        aria-label="Available symptoms"
        aria-multiselectable="true"
      >
        {filteredSymptoms.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            No symptoms match &quot;{searchQuery}&quot;.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filteredSymptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              return (
                <button
                  key={symptom}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleToggle(symptom)}
                  className={`inline-flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all duration-150 ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-300"
                      : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span>{formatSymptomLabel(symptom)}</span>
                  {isSelected ? (
                    <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  ) : (
                    <Plus className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

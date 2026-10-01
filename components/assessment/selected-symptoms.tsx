"use client";

import { X, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SelectedSymptomsProps {
  selectedSymptoms: string[];
  onRemoveSymptom: (symptom: string) => void;
  onClearAll: () => void;
}

export function SelectedSymptoms({
  selectedSymptoms,
  onRemoveSymptom,
  onClearAll,
}: SelectedSymptomsProps) {
  if (selectedSymptoms.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 p-6 text-center text-slate-500">
        <p className="text-sm">No symptoms selected yet.</p>
        <p className="text-xs text-slate-400 mt-1">
          Select or search symptoms from the list below to begin your evaluation.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Selected Symptoms ({selectedSymptoms.length})
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Reset Selection
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedSymptoms.map((symptom) => (
          <Badge
            key={symptom}
            variant="cyan"
            className="pl-3 pr-1.5 py-1 text-xs flex items-center space-x-1.5"
          >
            <span>{symptom}</span>
            <button
              onClick={() => onRemoveSymptom(symptom)}
              className="rounded-full p-0.5 hover:bg-cyan-900/60 transition-colors text-cyan-300"
              aria-label={`Remove ${symptom}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

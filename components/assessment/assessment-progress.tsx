"use client";

import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["Select Symptoms", "Review & Submit", "View Results"];

export function AssessmentProgress({ currentStep, totalSteps }: AssessmentProgressProps) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {stepLabels.slice(0, totalSteps).map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={label} className="flex items-center gap-2 min-w-0">
            <div className="flex items-center space-x-2 shrink-0">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isCompleted
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : isCurrent
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/50"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                }`}
                aria-label={`Step ${stepNum}: ${label}${isCompleted ? " (completed)" : isCurrent ? " (current)" : ""}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>
              <span
                className={`text-xs hidden sm:inline ${
                  isCurrent ? "text-white font-medium" : isCompleted ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>

            {i < totalSteps - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-slate-700 shrink-0 hidden sm:block" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}

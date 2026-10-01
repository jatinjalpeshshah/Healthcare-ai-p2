"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, ArrowRight, AlertCircle, Loader2, Brain } from "lucide-react";
import { useAssessment } from "@/hooks/use-assessment";
import { SymptomSelector } from "@/components/assessment/symptom-selector";
import { AssessmentProgress } from "@/components/assessment/assessment-progress";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AssessmentPage() {
  const router = useRouter();
  const [topK, setTopK] = useState(5);
  const [showAnalyzing, setShowAnalyzing] = useState(false);

  const {
    supportedSymptoms,
    selectedSymptoms,
    isLoadingSymptoms,
    isPredicting,
    error,
    addSymptom,
    removeSymptom,
    clearSymptoms,
    submitAssessment,
  } = useAssessment();

  const handleRunAssessment = async () => {
    setShowAnalyzing(true);
    const result = await submitAssessment(topK);
    if (result) {
      try {
        sessionStorage.setItem("current_prediction_result", JSON.stringify(result));
      } catch {
        // sessionStorage unavailable
      }
      router.push("/dashboard/results");
    } else {
      setShowAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Analyzing overlay */}
      <AnimatePresence>
        {showAnalyzing && isPredicting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
          >
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-900 p-8 text-center space-y-4 mx-4">
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 animate-pulse-glow">
                  <Brain className="h-7 w-7" />
                </div>
              </div>
              <div>
                <p className="font-display font-semibold text-white text-lg">Analyzing Your Symptoms</p>
                <p className="text-xs text-slate-400 mt-1">
                  Running ML inference across 99 conditions...
                </p>
              </div>
              <Loader2 className="h-5 w-5 animate-spin text-cyan-400 mx-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Badge variant="cyan" className="mb-2">Clinical Evaluation</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Symptom Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Select all currently presenting symptoms to generate an AI probabilistic assessment.
        </p>
      </div>

      <AssessmentProgress currentStep={1} totalSteps={3} />

      {error && (
        <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4 flex items-start space-x-3 text-xs text-rose-400" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Notice:</strong>
            {error}
          </div>
        </div>
      )}

      <Card className="border-slate-800 bg-slate-900/60">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base text-white">Symptom Inventory</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                {supportedSymptoms.length > 0
                  ? `${supportedSymptoms.length} clinical symptom indicators loaded from API`
                  : "Loading symptoms from API..."}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <label htmlFor="topk-select" className="text-slate-400 whitespace-nowrap">Top results:</label>
              <select
                id="topk-select"
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-slate-200 text-xs focus:ring-1 focus:ring-cyan-400 focus:outline-none"
              >
                <option value={3}>Top 3</option>
                <option value={5}>Top 5</option>
                <option value={10}>Top 10</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SymptomSelector
            supportedSymptoms={supportedSymptoms}
            selectedSymptoms={selectedSymptoms}
            isLoading={isLoadingSymptoms}
            onAddSymptom={addSymptom}
            onRemoveSymptom={removeSymptom}
            onClearAll={clearSymptoms}
          />

          <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Selected: <strong className="text-white">{selectedSymptoms.length}</strong> symptom
              {selectedSymptoms.length !== 1 ? "s" : ""}
            </div>

            <Button
              size="lg"
              disabled={selectedSymptoms.length === 0 || isPredicting}
              onClick={handleRunAssessment}
              className="w-full sm:w-auto font-semibold group"
              aria-label={`Analyze ${selectedSymptoms.length} selected symptoms`}
            >
              {isPredicting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-slate-950" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Analyze Symptoms
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

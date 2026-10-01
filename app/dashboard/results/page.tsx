"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Stethoscope, RefreshCw, AlertCircle } from "lucide-react";
import { PredictionResponse, ConditionPrediction } from "@/types/prediction";
import { PredictionCard } from "@/components/results/prediction-card";
import { TopPredictions } from "@/components/results/top-predictions";
import { DiseaseInformation } from "@/components/results/disease-information";
import { Precautions } from "@/components/results/precautions";
import { Medications } from "@/components/results/medications";
import { DietRecommendations } from "@/components/results/diet-recommendations";
import { WorkoutRecommendations } from "@/components/results/workout-recommendations";
import { AssessmentProgress } from "@/components/assessment/assessment-progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ResultsPage() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [selectedRank, setSelectedRank] = useState(1);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("current_prediction_result");
      if (stored) setResult(JSON.parse(stored) as PredictionResponse);
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="h-14 w-14 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <Stethoscope className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-display font-bold text-white">No Assessment Found</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Please run an assessment to generate predictions and care guidance.
        </p>
        <Link href="/dashboard/assessment">
          <Button className="mt-2">Go to Assessment</Button>
        </Link>
      </div>
    );
  }

  const topList = result.top_predictions ?? result.predictions ?? [];
  const activeCondition: ConditionPrediction =
    topList.find((p) => p.rank === selectedRank) ?? topList[0] ?? {
      rank: 1,
      disease: result.prediction,
      confidence: result.confidence,
      description: result.description,
      precautions: result.precautions,
      medications: result.medications,
      diet: result.diet,
      workout: result.workout,
    };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="cyan" className="mb-2">Assessment Results</Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Your Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            AI probabilistic evaluation across {result.recognized_symptom_count ?? result.recognized_symptoms?.length ?? 0} recognized symptoms.
          </p>
        </div>
        <Link href="/dashboard/assessment">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            New Assessment
          </Button>
        </Link>
      </div>

      <AssessmentProgress currentStep={3} totalSteps={3} />

      {/* Save Error Notice */}
      {result.save_error && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 flex items-start space-x-2 text-xs text-amber-300" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{result.save_error}</span>
        </div>
      )}

      {/* Primary Result */}
      <PredictionCard
        prediction={result.prediction}
        confidence={result.confidence}
        recognizedCount={result.recognized_symptom_count ?? result.recognized_symptoms?.length ?? 0}
        inputCount={result.input_symptom_count ?? (result.recognized_symptoms?.length ?? 0) + (result.unrecognized_symptoms?.length ?? 0)}
      />

      {/* Unrecognized symptoms notice */}
      {result.unrecognized_symptoms?.length > 0 && (
        <div className="rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-3 text-xs text-slate-400">
          <strong className="text-slate-300">{result.unrecognized_symptoms.length} symptom(s) not recognized</strong> by the model and were excluded from the analysis.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-4">
          <TopPredictions
            predictions={topList}
            selectedRank={selectedRank}
            onSelectRank={setSelectedRank}
          />

          {/* Recognized symptoms */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
            <h4 className="text-xs font-semibold text-slate-300 mb-3">Evaluated Symptoms</h4>
            <div className="flex flex-wrap gap-1.5">
              {result.recognized_symptoms?.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 px-2 py-0.5 text-[11px]"
                >
                  {s.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: detailed condition insights */}
        <motion.div
          key={selectedRank}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 space-y-4"
        >
          <DiseaseInformation
            disease={activeCondition.disease}
            description={activeCondition.description ?? ""}
          />
          <Precautions precautions={activeCondition.precautions ?? []} />
          <Medications medications={activeCondition.medications ?? []} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DietRecommendations diet={activeCondition.diet ?? []} />
            <WorkoutRecommendations workout={activeCondition.workout ?? []} />
          </div>
        </motion.div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-500 border-t border-slate-800">
        <Link
          href="/dashboard/assessment"
          className="text-cyan-400 hover:underline inline-flex items-center"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Adjust symptoms
        </Link>
        <span>Model accuracy 90.49% · Calibrated posterior probabilities</span>
      </div>
    </div>
  );
}

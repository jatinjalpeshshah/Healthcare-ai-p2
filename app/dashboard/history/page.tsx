"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, History, Loader2, RefreshCw, Stethoscope } from "lucide-react";
import { useHistory } from "@/hooks/use-history";
import { HistoryTable } from "@/components/history/history-table";
import { AssessmentRecord } from "@/types/assessment";
import { PredictionCard } from "@/components/results/prediction-card";
import { DiseaseInformation } from "@/components/results/disease-information";
import { Precautions } from "@/components/results/precautions";
import { Medications } from "@/components/results/medications";
import { DietRecommendations } from "@/components/results/diet-recommendations";
import { WorkoutRecommendations } from "@/components/results/workout-recommendations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion-div";

export default function HistoryPage() {
  const { history, loading, error, refresh } = useHistory();
  const [selectedRecord, setSelectedRecord] = useState<AssessmentRecord | null>(null);

  if (selectedRecord) {
    const pred = selectedRecord.prediction;
    return (
      <div className="space-y-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRecord(null)}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to History
            </Button>
            <span className="text-xs text-slate-500 bg-slate-800/60 px-2 py-1 rounded font-mono">
              Historical Snapshot
            </span>
          </div>
        </FadeIn>

        <PredictionCard
          prediction={pred.prediction}
          confidence={pred.confidence}
          recognizedCount={pred.recognized_symptom_count ?? pred.recognized_symptoms?.length ?? 0}
          inputCount={pred.input_symptom_count ?? selectedRecord.symptoms?.length ?? 0}
        />

        <div className="space-y-4">
          <DiseaseInformation disease={pred.prediction} description={pred.description ?? ""} />
          <Precautions precautions={pred.precautions ?? []} />
          <Medications medications={pred.medications ?? []} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DietRecommendations diet={pred.diet ?? []} />
            <WorkoutRecommendations workout={pred.workout ?? []} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="cyan" className="mb-2">Historical Records</Badge>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Past Assessments
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review previous symptom evaluations. Only your own records are shown.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refresh()}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh
          </Button>
        </div>
      </FadeIn>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 space-y-3 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
          <p className="text-sm">Loading your assessment history...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6 text-center space-y-2">
          <p className="text-sm text-rose-400">{error}</p>
          <p className="text-xs text-slate-500">
            Ensure your Supabase credentials are configured and the database migration has been applied.
          </p>
          <Button variant="outline" size="sm" onClick={() => refresh()} className="mt-2">
            Try again
          </Button>
        </div>
      ) : (
        <>
          <HistoryTable
            records={history}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
          />
          {history.length > 0 && (
            <div className="text-center">
              <Link href="/dashboard/assessment">
                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                  <Stethoscope className="h-4 w-4 mr-1.5" />
                  Start New Assessment
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

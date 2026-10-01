"use client";

import { useState, useEffect, useCallback } from "react";
import { getSymptoms, predictCondition } from "@/lib/api/prediction";
import { saveAssessment } from "@/lib/api/history";
import { PredictionResponse } from "@/types/prediction";

export function useAssessment() {
  const [supportedSymptoms, setSupportedSymptoms] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isLoadingSymptoms, setIsLoadingSymptoms] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSymptoms() {
      try {
        setIsLoadingSymptoms(true);
        const res = await getSymptoms();
        setSupportedSymptoms(res.symptoms);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load supported symptoms.");
      } finally {
        setIsLoadingSymptoms(false);
      }
    }

    loadSymptoms();
  }, []);

  const addSymptom = useCallback((symptom: string) => {
    const normalized = symptom.trim().toLowerCase();
    setSelectedSymptoms((prev) =>
      prev.includes(normalized) ? prev : [...prev, normalized]
    );
  }, []);

  const removeSymptom = useCallback((symptom: string) => {
    const normalized = symptom.trim().toLowerCase();
    setSelectedSymptoms((prev) => prev.filter((s) => s !== normalized));
  }, []);

  const clearSymptoms = useCallback(() => {
    setSelectedSymptoms([]);
    setError(null);
  }, []);

  const submitAssessment = useCallback(
    async (topK: number = 5): Promise<PredictionResponse | null> => {
      if (selectedSymptoms.length === 0) {
        setError("Please select at least one symptom.");
        return null;
      }

      try {
        setIsPredicting(true);
        setError(null);
        const result = await predictCondition({
          symptoms: selectedSymptoms,
          top_k: topK,
        });

        // Persist to Supabase assessments table
        try {
          const savedRecord = await saveAssessment(selectedSymptoms, result);
          if (!savedRecord) {
            result.save_error = "Prediction generated successfully, but saving to account history failed.";
          }
        } catch (saveErr) {
          result.save_error = "Prediction generated successfully, but saving to account history failed.";
        }

        setPredictionResult(result);
        return result;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Inference error occurred.";
        setError(msg);
        return null;
      } finally {
        setIsPredicting(false);
      }
    },
    [selectedSymptoms]
  );

  return {
    supportedSymptoms,
    selectedSymptoms,
    isLoadingSymptoms,
    isPredicting,
    predictionResult,
    error,
    addSymptom,
    removeSymptom,
    clearSymptoms,
    submitAssessment,
  };
}

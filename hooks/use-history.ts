"use client";

import { useState, useEffect, useCallback } from "react";
import { AssessmentRecord } from "@/types/assessment";
import { getAssessmentHistory } from "@/lib/api/history";

export function useHistory() {
  const [history, setHistory] = useState<AssessmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const records = await getAssessmentHistory();
      setHistory(records);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load assessment history.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    error,
    refresh: fetchHistory,
  };
}

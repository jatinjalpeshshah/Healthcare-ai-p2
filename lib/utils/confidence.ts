export function formatConfidencePercentage(confidence: number | undefined | null): string {
  if (confidence === undefined || confidence === null || isNaN(Number(confidence))) {
    return "0%";
  }
  const num = Number(confidence);
  const val = num > 1 ? num : num * 100;
  const pct = Math.min(Math.max(Math.round(val), 0), 100);
  return `${pct}%`;
}

export function getConfidenceDescription(confidence: number | undefined | null): {
  label: string;
  tone: "high" | "moderate" | "low";
  helperText: string;
} {
  if (confidence === undefined || confidence === null || isNaN(Number(confidence))) {
    return {
      label: "Low Differentiation Match",
      tone: "low",
      helperText: "Symptoms are non-specific or broadly shared across multiple conditions.",
    };
  }
  const num = Number(confidence);
  const pct = num > 1 ? num : num * 100;

  if (pct >= 60) {
    return {
      label: "Strong Pattern Match",
      tone: "high",
      helperText: "The reported symptom combination closely resembles patterns associated with this condition.",
    };
  } else if (pct >= 25) {
    return {
      label: "Moderate Pattern Match",
      tone: "moderate",
      helperText: "Several reported symptoms align with this condition, but other possibilities exist.",
    };
  } else {
    return {
      label: "Low Differentiation Match",
      tone: "low",
      helperText: "Symptoms are non-specific or broadly shared across multiple conditions.",
    };
  }
}

import { fetchApi } from "./client";
import { PredictionRequest, PredictionResponse } from "@/types/prediction";
import { SymptomsListResponse, HealthCheckResponse } from "@/types/api";
import { DiseaseDetail } from "@/types/disease";

export async function getHealth(): Promise<HealthCheckResponse> {
  return fetchApi<HealthCheckResponse>("/api/health");
}

export async function getSymptoms(): Promise<SymptomsListResponse> {
  const res = await fetchApi<string[] | SymptomsListResponse>("/api/symptoms");
  if (Array.isArray(res)) {
    return { symptoms: res, count: res.length };
  }
  return res;
}

export async function predictCondition(
  payload: PredictionRequest
): Promise<PredictionResponse> {
  return fetchApi<PredictionResponse>("/api/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getDiseaseDetails(disease: string): Promise<DiseaseDetail> {
  return fetchApi<DiseaseDetail>(`/api/disease/${encodeURIComponent(disease)}`);
}

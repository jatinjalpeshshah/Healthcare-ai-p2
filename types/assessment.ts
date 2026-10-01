import { PredictionResponse } from "./prediction";

export interface AssessmentRecord {
  id: string;
  user_id: string;
  symptoms: string[];
  prediction: PredictionResponse;
  created_at: string;
}

export interface AssessmentFormValues {
  symptoms: string[];
  top_k?: number;
}

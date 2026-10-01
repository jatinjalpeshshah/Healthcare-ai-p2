export interface ConditionPrediction {
  rank: number;
  disease: string;
  confidence: number;
  description: string | null;
  precautions: string[];
  medications: string[];
  diet: string[];
  workout: string[];
}

export interface PredictionRequest {
  symptoms: string[];
  top_k?: number;
}

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  recognized_symptoms: string[];
  unrecognized_symptoms: string[];
  input_symptom_count: number;
  recognized_symptom_count: number;
  unrecognized_symptom_count: number;
  top_predictions: ConditionPrediction[];
  predictions?: ConditionPrediction[];
  description: string | null;
  precautions: string[];
  medications: string[];
  diet: string[];
  workout: string[];
  disclaimer: string;
  save_error?: string;
}

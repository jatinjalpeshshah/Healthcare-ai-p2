export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
}

export interface HealthCheckResponse {
  status: string;
  model_loaded: boolean;
  features_count: number;
  classes_count: number;
  version: string;
}

export interface SymptomsListResponse {
  symptoms: string[];
  count: number;
}

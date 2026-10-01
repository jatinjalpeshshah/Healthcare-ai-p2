from typing import List, Optional
from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    symptoms: List[str] = Field(..., description="List of user selected symptoms")
    top_k: Optional[int] = Field(3, ge=1, le=10, description="Number of top predictions to return")

class ConditionPrediction(BaseModel):
    rank: int
    disease: str
    confidence: float
    probability: float
    confidence_tier: str
    description: Optional[str] = None
    precautions: List[str] = []
    medications: List[str] = []
    diet: List[str] = []
    workout: List[str] = []

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    recognized_symptoms: List[str]
    unrecognized_symptoms: List[str]
    input_symptom_count: int
    recognized_symptom_count: int
    unrecognized_symptom_count: int
    top_predictions: List[ConditionPrediction]
    predictions: List[ConditionPrediction]
    top_prediction: ConditionPrediction
    description: Optional[str] = None
    precautions: List[str] = []
    medications: List[str] = []
    diet: List[str] = []
    workout: List[str] = []
    disclaimer: str
    save_error: Optional[str] = None

class DiseaseInfoResponse(BaseModel):
    disease: str
    description: str
    precautions: List[str]
    medications: List[str]
    diet: List[str]
    workout: List[str]

class HealthResponse(BaseModel):
    status: str
    version: str
    num_features: int
    num_classes: int
    model_name: str

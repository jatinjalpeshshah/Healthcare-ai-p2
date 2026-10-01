from fastapi import APIRouter, HTTPException, Query
from typing import List
from api.models.schemas import PredictionRequest, PredictionResponse
from api.services.inference import engine

router = APIRouter(tags=["Prediction"])

@router.get("/symptoms", response_model=List[str])
def get_symptoms():
    return engine.get_symptoms()

@router.post("/predict", response_model=PredictionResponse)
def predict_disease(request: PredictionRequest):
    if not request.symptoms:
        raise HTTPException(status_code=400, detail="At least one symptom must be provided.")
    
    res = engine.predict(request.symptoms, top_k=request.top_k or 3)
    return res

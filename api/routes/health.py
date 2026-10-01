from fastapi import APIRouter
from api.models.schemas import HealthResponse
from api.services.inference import engine

router = APIRouter(tags=["Health"])

@router.get("/health", response_model=HealthResponse)
def health_check():
    return {
        "status": "ok",
        "version": "1.0.0",
        "num_features": len(engine.feature_names),
        "num_classes": len(engine.disease_classes),
        "model_name": engine.metadata.get("model_name", "Logistic Regression")
    }

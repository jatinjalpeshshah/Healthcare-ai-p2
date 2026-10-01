from fastapi import APIRouter, HTTPException
from api.models.schemas import DiseaseInfoResponse
from api.services.disease_info import disease_service

router = APIRouter(tags=["Disease"])

@router.get("/disease/{disease_name}", response_model=DiseaseInfoResponse)
def get_disease_info(disease_name: str):
    info = disease_service.get_info(disease_name)
    if not info:
        raise HTTPException(
            status_code=404, 
            detail=f"Information for disease '{disease_name}' was not found in database."
        )
    return info

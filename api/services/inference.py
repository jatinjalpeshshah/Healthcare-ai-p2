import json
import os
from pathlib import Path
import joblib
import pandas as pd
import numpy as np
from typing import List, Tuple, Dict, Any
from api.services.disease_info import disease_service

MODEL_DIR = Path(__file__).parent.parent.parent / "ml" / "final_model"

class InferenceEngine:
    def __init__(self):
        self.model_path = MODEL_DIR / "disease_model.joblib"
        self.features_path = MODEL_DIR / "feature_names.json"
        self.classes_path = MODEL_DIR / "disease_classes.json"
        self.metadata_path = MODEL_DIR / "model_metadata.json"

        self.model = None
        self.feature_names: List[str] = []
        self.disease_classes: List[str] = []
        self.feature_map: Dict[str, int] = {}
        self.metadata: Dict[str, Any] = {}

        self._load_artifacts()

    def _load_artifacts(self):
        if not self.model_path.exists():
            raise FileNotFoundError(f"Model file not found at {self.model_path}")
        
        self.model = joblib.load(self.model_path)

        with open(self.features_path, "r", encoding="utf-8") as f:
            self.feature_names = json.load(f)
            self.feature_map = {feat.lower().strip(): idx for idx, feat in enumerate(self.feature_names)}

        with open(self.classes_path, "r", encoding="utf-8") as f:
            self.disease_classes = json.load(f)

        if self.metadata_path.exists():
            with open(self.metadata_path, "r", encoding="utf-8") as f:
                self.metadata = json.load(f)

    def get_symptoms(self) -> List[str]:
        return self.feature_names

    def get_confidence_tier(self, prob: float) -> str:
        if prob >= 0.70:
            return "high"
        elif prob >= 0.40:
            return "medium"
        else:
            return "low"

    def predict(self, input_symptoms: List[str], top_k: int = 3) -> Dict[str, Any]:
        recognized = []
        unrecognized = []
        feature_vector = np.zeros(len(self.feature_names), dtype=int)

        for sym in input_symptoms:
            norm_sym = sym.lower().strip()
            if norm_sym in self.feature_map:
                idx = self.feature_map[norm_sym]
                feature_vector[idx] = 1
                recognized.append(self.feature_names[idx])
            else:
                unrecognized.append(sym)

        # Create DataFrame with exact feature names to match model fitting
        X_input = pd.DataFrame([feature_vector], columns=self.feature_names)
        
        # Predict probabilities
        probas = self.model.predict_proba(X_input)[0]
        
        # Sort indices by probability descending
        top_indices = np.argsort(probas)[::-1][:top_k]

        predictions = []
        for rank, idx in enumerate(top_indices, start=1):
            prob = float(probas[idx])
            disease = self.disease_classes[idx] if idx < len(self.disease_classes) else str(self.model.classes_[idx])
            
            # Lookup disease details
            info = disease_service.get_info(disease) or {}

            predictions.append({
                "rank": rank,
                "disease": disease,
                "confidence": round(prob, 4),
                "probability": round(prob, 4),
                "confidence_tier": self.get_confidence_tier(prob),
                "description": info.get("description", "No detailed description available for this condition."),
                "precautions": info.get("precautions", []),
                "medications": info.get("medications", []),
                "diet": info.get("diet", []),
                "workout": info.get("workout", [])
            })

        top_pred = predictions[0] if predictions else {
            "rank": 1,
            "disease": "Unknown",
            "confidence": 0.0,
            "probability": 0.0,
            "confidence_tier": "low",
            "description": "No detailed description available.",
            "precautions": [],
            "medications": [],
            "diet": [],
            "workout": []
        }

        return {
            "prediction": top_pred["disease"],
            "confidence": top_pred["confidence"],
            "recognized_symptoms": recognized,
            "unrecognized_symptoms": unrecognized,
            "input_symptom_count": len(input_symptoms),
            "recognized_symptom_count": len(recognized),
            "unrecognized_symptom_count": len(unrecognized),
            "top_predictions": predictions,
            "predictions": predictions,
            "top_prediction": top_pred,
            "description": top_pred["description"],
            "precautions": top_pred["precautions"],
            "medications": top_pred["medications"],
            "diet": top_pred["diet"],
            "workout": top_pred["workout"],
            "disclaimer": "This tool provides informational AI-generated predictions based on the symptoms entered. It is not a medical diagnosis and is not a substitute for professional medical advice."
        }

engine = InferenceEngine()

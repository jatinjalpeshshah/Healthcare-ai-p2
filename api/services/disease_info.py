import csv
import json
import ast
from pathlib import Path
from typing import Dict, Any, Optional

MODEL_DIR = Path(__file__).parent.parent.parent / "ml" / "final_model"
CSV_PATH = MODEL_DIR / "disease_information.csv"

class DiseaseInfoService:
    def __init__(self):
        self.disease_db: Dict[str, Dict[str, Any]] = {}
        self._load_csv()

    def _parse_list(self, val: str) -> list:
        if not val or val == "nan":
            return []
        val_str = str(val).strip()
        if val_str.startswith("[") and val_str.endswith("]"):
            try:
                return ast.literal_eval(val_str)
            except Exception:
                try:
                    return json.loads(val_str.replace("'", '"'))
                except Exception:
                    pass
        return [item.strip().strip("'\"") for item in val_str.split(",") if item.strip()]

    def _load_csv(self):
        if not CSV_PATH.exists():
            return
        
        with open(CSV_PATH, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                disease = row.get("Disease", "").strip()
                if not disease:
                    continue

                precautions = []
                for i in range(1, 5):
                    p_key = f"Precaution_{i}"
                    if p_key in row and row[p_key] and row[p_key].strip():
                        precautions.append(row[p_key].strip())

                medications = self._parse_list(row.get("Medication", ""))
                diet = self._parse_list(row.get("Diet", ""))
                workout = self._parse_list(row.get("Workout", ""))

                self.disease_db[disease.lower()] = {
                    "disease": disease,
                    "description": row.get("Description", "").strip(),
                    "precautions": precautions,
                    "medications": medications,
                    "diet": diet,
                    "workout": workout
                }

    def get_info(self, disease_name: str) -> Optional[Dict[str, Any]]:
        norm = disease_name.lower().strip()
        if norm in self.disease_db:
            return self.disease_db[norm]
        
        # Partial match fallback
        for k, v in self.disease_db.items():
            if norm in k or k in norm:
                return v
                
        return None

disease_service = DiseaseInfoService()

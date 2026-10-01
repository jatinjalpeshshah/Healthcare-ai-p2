import unittest
from fastapi.testclient import TestClient
from api.index import app

class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_health_endpoint(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "ok")
        self.assertEqual(data["num_features"], 230)
        self.assertEqual(data["num_classes"], 99)

    def test_symptoms_endpoint(self):
        response = self.client.get("/api/symptoms")
        self.assertEqual(response.status_code, 200)
        symptoms = response.json()
        self.assertIsInstance(symptoms, list)
        self.assertEqual(len(symptoms), 230)

    def test_predict_endpoint(self):
        payload = {
            "symptoms": ["itching", "skin rash"],
            "top_k": 3
        }
        response = self.client.post("/api/predict", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("predictions", data)
        self.assertEqual(len(data["predictions"]), 3)
        self.assertIn("top_prediction", data)
        self.assertIn("disclaimer", data)

    def test_disease_info_endpoint(self):
        response = self.client.get("/api/disease/fungal infection")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("disease", data)
        self.assertIn("description", data)
        self.assertIn("precautions", data)
        self.assertIn("medications", data)
        self.assertIn("diet", data)
        self.assertIn("workout", data)

if __name__ == "__main__":
    unittest.main()

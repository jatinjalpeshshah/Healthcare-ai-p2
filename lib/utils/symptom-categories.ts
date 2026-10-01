export const SYMPTOM_CATEGORIES = [
  "General & Mental Health",
  "Respiratory",
  "Cardiovascular",
  "Digestive",
  "Neurological",
  "ENT & Eye",
  "Skin & Musculoskeletal",
  "Urinary & Reproductive",
] as const;

export type SymptomCategory = (typeof SYMPTOM_CATEGORIES)[number];

const CATEGORY_KEYWORDS: Record<SymptomCategory, string[]> = {
  "Respiratory": [
    "breath", "cough", "throat", "nasal", "sneeze", "wheezing", "phlegm",
    "sputum", "chest tightness", "hoarse", "lung", "airway"
  ],
  "Cardiovascular": [
    "chest pain", "palpitations", "heart", "pulse", "circulation", "vein",
    "blood pressure", "fainting"
  ],
  "Digestive": [
    "stool", "vomiting", "nausea", "abdominal", "stomach", "diarrhea",
    "constipation", "appetite", "swallowing", "bowel", "gas", "acid",
    "jaundice", "liver", "anus", "rectal"
  ],
  "Neurological": [
    "dizziness", "headache", "movement", "numbness", "tingling", "seizure",
    "paralysis", "memory", "confusion", "tremor", "speech", "speaking", "balance"
  ],
  "ENT & Eye": [
    "eye", "vision", "hearing", "ear", "nose", "smell", "taste",
    "blindness", "eyelid", "lacrimation"
  ],
  "Skin & Musculoskeletal": [
    "skin", "pain", "joint", "muscle", "rash", "itching", "swelling",
    "cramp", "stiffness", "bone", "lesion", "ulcer", "blister", "spot",
    "leg", "arm", "back", "hip", "shoulder", "knee", "neck", "foot",
    "hand", "scab", "hair"
  ],
  "Urinary & Reproductive": [
    "urine", "urinary", "scrotum", "testes", "penis", "vaginal",
    "menstrual", "bleeding", "pelvic", "kidney", "bladder", "prostate", "suprapubic"
  ],
  "General & Mental Health": [
    "anxiety", "depression", "insomnia", "fever", "fatigue", "chills",
    "weight", "sweat", "malaise", "weakness", "growth", "mood", "stress"
  ],
};

export function getSymptomCategory(symptom: string): SymptomCategory {
  const norm = symptom.toLowerCase().trim();
  for (const cat of SYMPTOM_CATEGORIES) {
    if (cat === "General & Mental Health") continue;
    const keywords = CATEGORY_KEYWORDS[cat];
    if (keywords.some((k) => norm.includes(k))) {
      return cat;
    }
  }
  return "General & Mental Health";
}

export function groupSymptomsByCategory(
  symptoms: string[]
): Record<SymptomCategory, string[]> {
  const grouped: Record<SymptomCategory, string[]> = {
    "General & Mental Health": [],
    "Respiratory": [],
    "Cardiovascular": [],
    "Digestive": [],
    "Neurological": [],
    "ENT & Eye": [],
    "Skin & Musculoskeletal": [],
    "Urinary & Reproductive": [],
  };

  for (const s of symptoms) {
    const cat = getSymptomCategory(s);
    grouped[cat].push(s);
  }

  return grouped;
}

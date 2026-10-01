# Zidio AI Healthcare System

A production-ready full-stack AI healthcare information and symptom-assessment application integrating a pre-trained, calibrated Logistic Regression ML model (230 symptoms, 99 conditions, 90.49% test accuracy), Next.js App Router, FastAPI serverless engine, and Supabase Auth + PostgreSQL database.

## Architecture

```
User Browser
    │
    ▼
Next.js App Router (TypeScript + Tailwind CSS + Framer Motion)
    │  (Local dev proxy: /api/* -> 127.0.0.1:8000)
    │  (Vercel production: /api/* -> api/index.py)
    ▼
FastAPI Serverless Python Engine (Python 3.13)
    │
    ├── Singleton ModelLoader (ml/final_model/disease_model.joblib)
    ├── DiseaseInfoService (ml/final_model/disease_information.csv)
    └── InferenceService (Calibrated predict_proba, Top-K extraction)
    │
    ▼
Supabase Platform (Auth, RLS, profiles & assessments tables)
```

## Repository Structure

```
.
├── api/                   # FastAPI backend serverless application
│   ├── core/              # Config and singleton ModelLoader
│   ├── models/            # Strict Pydantic request/response schemas
│   ├── routes/            # /api/health, /api/symptoms, /api/predict, /api/disease/{disease}
│   ├── services/          # InferenceService and DiseaseInfoService
│   └── index.py           # FastAPI entrypoint and lifespan handler
├── app/                   # Next.js App Router
│   ├── (marketing)/       # Landing and about pages
│   ├── auth/              # Supabase Auth routes (login, signup, callback, forgot-password)
│   ├── dashboard/         # Authenticated clinical portal (overview, assessment, results, history, profile)
│   ├── layout.tsx         # Root layout with responsive dark navy/slate theme
│   ├── globals.css        # Tailwind CSS design system tokens
│   └── not-found.tsx      # Clinical 404 handler
├── components/            # Reusable React components
│   ├── ui/                # Button, card, badge, input
│   ├── layout/            # Navbar, sidebar, footer (with medical disclaimer)
│   ├── landing/           # Hero, features, how-it-works
│   ├── assessment/        # Symptom-selector, symptom-search, selected-symptoms, assessment-progress
│   ├── results/           # Prediction-card, confidence-indicator, top-predictions, disease-info, precautions, medications, diet, workout
│   ├── history/           # History-card, history-table
│   └── profile/           # Profile-form
├── hooks/                 # React hooks (use-auth, use-assessment, use-history)
├── lib/                   # Utility and client modules
│   ├── api/               # API clients for FastAPI and Supabase persistence
│   ├── supabase/          # SSR cookie-based clients (client.ts, server.ts, proxy.ts)
│   ├── utils/             # Formatting and neutral confidence calculations
│   └── validations/       # Zod schemas (assessment.ts, profile.ts)
├── ml/
│   └── final_model/       # Pre-trained ML artifacts (joblib, json feature definitions, csv)
├── public/                # Public static media assets
├── supabase/
│   └── migrations/        # PostgreSQL DDL migrations with RLS policies and triggers
├── requirements.txt       # Pinned Python dependencies (scikit-learn==1.6.1 for model compatibility)
├── vercel.json            # Vercel serverless function routing rules
└── next.config.ts         # Next.js configuration with development API rewrites
```

## ML Model Specifications

- **Model**: Logistic Regression (Calibrated Multinomial)
- **Features**: 230 standardized binary symptom indicators (0 = absent, 1 = present)
- **Target Classes**: 99 supported diseases
- **Verified Benchmark Accuracy**: 90.49% (Top-3: 98.70%, Top-5: 99.67%)
- **Serialization Version**: scikit-learn 1.6.1

## Prerequisites

- Node.js >= 18.x (tested on v22.20.0)
- Python >= 3.10 (tested on v3.13.2)
- npm >= 9.x

## Local Development Setup

### 1. Setup Python Virtual Environment & Backend

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI backend (port 8000)
uvicorn api.index:app --reload --port 8000
```

Verify backend:
- Health check: `http://127.0.0.1:8000/api/health`
- Symptoms list: `http://127.0.0.1:8000/api/symptoms`
- Interactive Swagger docs: `http://127.0.0.1:8000/api/docs`

### 2. Setup Frontend

```bash
# Copy environment variables
cp .env.example .env.local

# Install node dependencies
npm install

# Start Next.js development server
npm run dev
```

Open `http://localhost:3000` in your browser. Next.js automatically proxies requests from `/api/*` to `http://127.0.0.1:8000/api/*` in development.

## Verification & Testing

Run the automated backend test suite:
```bash
.venv\Scripts\python.exe scripts/test_api.py
```

Run TypeScript and Next.js build checks:
```bash
npx tsc --noEmit
npm run build
```

## Medical Disclaimer

This tool provides informational AI-generated predictions based on the symptoms entered. It is not a medical diagnosis and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition.

# Final Disease Prediction Model

## Project

Zidio Project 2

## Model

Logistic Regression

## Scope

99 supported diseases with 230 binary symptom features.

## Input

A feature vector containing the 230 symptom indicators.

Each feature must contain:

- 0 = symptom absent
- 1 = symptom present

## Output

The model supports:

- Top-1 disease prediction
- Probability estimates
- Top-K disease predictions

## Dataset

Training records: 80,746

Test records: 20,195

Classes: 99

Features: 230

The train/test split used a global pattern-aware grouping strategy to prevent identical symptom patterns from crossing the split boundary.

## Verified Test Performance

Accuracy: 90.49%

Balanced Accuracy: 90.70%

Macro F1: 90.54%

Weighted F1: 90.48%

Top-3: 98.70%

Top-5: 99.67%

Top-10: 99.96%

## Important

This model is intended for an informational healthcare application.

Its predictions should not be presented as a medical diagnosis or as a substitute for evaluation by a qualified healthcare professional.

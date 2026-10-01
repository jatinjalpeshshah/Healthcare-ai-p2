import { z } from "zod";

export const assessmentSchema = z.object({
  symptoms: z
    .array(z.string().min(1, "Symptom name cannot be empty"))
    .min(1, "Please select at least one symptom to proceed with the assessment"),
  top_k: z
    .number()
    .int()
    .min(1, "Minimum top_k is 1")
    .max(20, "Maximum top_k is 20")
    .default(5),
});

export type AssessmentFormSchema = z.infer<typeof assessmentSchema>;

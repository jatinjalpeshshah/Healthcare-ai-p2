import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters"),
  age: z
    .number()
    .min(0, "Age must be positive")
    .max(130, "Please enter a realistic age")
    .optional()
    .nullable(),
  height: z
    .number()
    .min(20, "Height in cm must be realistic")
    .max(300, "Height in cm must be realistic")
    .optional()
    .nullable(),
  weight: z
    .number()
    .min(1, "Weight in kg must be realistic")
    .max(500, "Weight in kg must be realistic")
    .optional()
    .nullable(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;

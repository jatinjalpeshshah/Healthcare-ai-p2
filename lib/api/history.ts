import { createClient } from "@/lib/supabase/client";
import { AssessmentRecord } from "@/types/assessment";
import { PredictionResponse } from "@/types/prediction";

export async function saveAssessment(
  symptoms: string[],
  prediction: PredictionResponse
): Promise<AssessmentRecord | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("assessments")
    .insert({
      user_id: user.id,
      symptoms,
      prediction,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to save assessment to Supabase:", error.message);
    return null;
  }

  return data as AssessmentRecord;
}

export async function getAssessmentHistory(): Promise<AssessmentRecord[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch assessment history:", error.message);
    return [];
  }

  return data as AssessmentRecord[];
}

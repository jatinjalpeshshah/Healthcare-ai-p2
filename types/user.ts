export interface UserProfile {
  id: string;
  full_name: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileFormValues {
  full_name: string;
  age?: number;
  height?: number;
  weight?: number;
}

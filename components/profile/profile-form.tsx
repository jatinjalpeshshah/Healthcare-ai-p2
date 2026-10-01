"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Save, CheckCircle2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ProfileFormValues } from "@/types/user";
import { useAuth } from "@/hooks/use-auth";

interface ProfileFormProps {
  initialValues?: Partial<ProfileFormValues>;
  onSave?: (values: ProfileFormValues) => Promise<void>;
}

export function ProfileForm({ initialValues, onSave }: ProfileFormProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState(initialValues?.full_name || "");
  const [age, setAge] = useState<string>(initialValues?.age ? String(initialValues.age) : "");
  const [height, setHeight] = useState<string>(initialValues?.height ? String(initialValues.height) : "");
  const [weight, setWeight] = useState<string>(initialValues?.weight ? String(initialValues.weight) : "");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setSaveError("Full name is required.");
      return;
    }
    setSaveError(null);
    try {
      setIsSaving(true);
      setSavedSuccess(false);
      if (onSave) {
        await onSave({
          full_name: fullName.trim(),
          age: age ? parseInt(age, 10) : undefined,
          height: height ? parseFloat(height) : undefined,
          weight: weight ? parseFloat(weight) : undefined,
        });
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/");
  };

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400 mb-1">
            <User className="h-5 w-5" />
            <CardTitle className="text-lg text-white font-display">Patient Profile</CardTitle>
          </div>
        </div>
        <CardDescription className="text-xs text-slate-400 leading-relaxed">
          Personal physiological context. Profile data is private to your account and does not modify ML prediction probabilities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="fullName" className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name <span className="text-slate-500">(required)</span>
            </label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              required
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="age" className="block text-xs font-medium text-slate-300 mb-1.5">
                Age (years)
              </label>
              <Input
                id="age"
                type="number"
                min="0"
                max="130"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 35"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-xs font-medium text-slate-300 mb-1.5">
                Height (cm)
              </label>
              <Input
                id="height"
                type="number"
                min="30"
                max="250"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-xs font-medium text-slate-300 mb-1.5">
                Weight (kg)
              </label>
              <Input
                id="weight"
                type="number"
                min="2"
                max="300"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
              />
            </div>
          </div>

          {saveError && (
            <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
              {saveError}
            </p>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Button type="submit" disabled={isSaving} className="font-semibold">
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Profile
                </span>
              )}
            </Button>

            {savedSuccess && (
              <span className="flex items-center text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Profile updated successfully
              </span>
            )}
          </div>
        </form>

        {/* Sign Out */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <Button
            variant="outline"
            className="text-rose-400 border-rose-500/30 hover:bg-rose-500/10 hover:border-rose-500/50"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {signingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

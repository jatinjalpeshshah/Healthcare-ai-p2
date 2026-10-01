"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfileFormValues } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion-div";
import { SkeletonCard } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<Partial<ProfileFormValues> | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;
    async function fetchProfile() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, age, height, weight")
        .eq("id", user!.id)
        .single();

      if (error && error.code !== "PGRST116") {
        setLoadError("Failed to load profile data.");
      } else {
        setProfileData(data ?? {});
      }
      setDataLoading(false);
    }
    fetchProfile();
  }, [user, authLoading]);

  const handleSave = async (values: ProfileFormValues) => {
    if (!user) return;
    const supabase = createClient();
    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        ...values,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) throw new Error(error.message);
    setProfileData(values);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <FadeIn>
        <Badge variant="cyan" className="mb-2">Account</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Your Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Profile information is private and securely stored with Supabase RLS.
        </p>
      </FadeIn>

      {/* Account email badge */}
      {user && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Account Email</p>
            <p className="text-sm text-slate-200 mt-0.5">{user.email}</p>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5 font-semibold">Verified</span>
        </div>
      )}

      {dataLoading ? (
        <SkeletonCard className="h-64" />
      ) : loadError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6 text-center text-sm text-rose-400">
          {loadError}
        </div>
      ) : (
        <ProfileForm
          initialValues={profileData ?? undefined}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Stethoscope, History, ArrowRight, Activity, ShieldCheck, Brain, Loader2, Clock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion-div";
import { SkeletonCard } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import { formatTitleCase, formatDate } from "@/lib/utils/format";
import { formatConfidencePercentage } from "@/lib/utils/confidence";
import { AssessmentRecord } from "@/types/assessment";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [recentAssessments, setRecentAssessments] = useState<AssessmentRecord[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [profileName, setProfileName] = useState<string>("");
  const [dataLoading, setDataLoading] = useState(true);

  const firstName = profileName
    ? profileName.split(" ")[0]
    : user?.email?.split("@")[0] ?? "there";

  useEffect(() => {
    if (authLoading || !user) return;

    async function loadDashboardData() {
      const supabase = createClient();
      try {
        // Load profile name
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user!.id)
          .single();
        if (profile?.full_name) setProfileName(profile.full_name);

        // Load recent 3 assessments
        const { data: assessments, count } = await supabase
          .from("assessments")
          .select("*", { count: "exact" })
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (assessments) setRecentAssessments(assessments as AssessmentRecord[]);
        if (count !== null) setTotalCount(count);
      } catch (err) {
        console.warn("Dashboard data load failed:", err);
      } finally {
        setDataLoading(false);
      }
    }

    loadDashboardData();
  }, [user, authLoading]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="cyan" className="mb-2">Clinical Dashboard</Badge>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back{firstName ? `, ${firstName}` : ""}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Your personal AI healthcare assessment workspace.
            </p>
          </div>
          <Link href="/dashboard/assessment">
            <Button className="font-semibold glow-cyan-sm">
              <Stethoscope className="mr-2 h-4 w-4" />
              New Assessment
            </Button>
          </Link>
        </div>
      </FadeIn>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Total Assessments</span>
                <History className="h-4 w-4 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white font-mono">
                {dataLoading ? <span className="text-slate-600">—</span> : (totalCount ?? 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-slate-500">
                {totalCount === 0 ? "No assessments yet" : "Stored in your private history"}
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Supported Symptoms</span>
                <Activity className="h-4 w-4 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white font-mono">230</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-slate-500">Binary clinical indicators</p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Model Accuracy</span>
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white font-mono">90.49%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-slate-500">Group-shuffle split validation</p>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Quick Actions */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StaggerItem>
          <Card className="border-slate-800 bg-slate-900/60 h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-3">
                <Stethoscope className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-white font-display">Start Symptom Assessment</CardTitle>
              <CardDescription className="text-xs text-slate-400 leading-relaxed">
                Select from 230 clinical symptoms and receive AI-powered probabilistic health insights across 99 conditions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/assessment">
                <Button variant="outline" className="w-full group">
                  Begin Assessment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="border-slate-800 bg-slate-900/60 h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-3">
                <Brain className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-white font-display">Assessment History</CardTitle>
              <CardDescription className="text-xs text-slate-400 leading-relaxed">
                Review all past assessments, symptom patterns, and condition probabilities stored securely in your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/history">
                <Button variant="outline" className="w-full group">
                  View History
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Recent Assessments */}
      <FadeIn delay={0.3}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Recent Assessments</h2>
            <Link href="/dashboard/history" className="text-xs text-cyan-400 hover:underline">
              View all
            </Link>
          </div>

          {dataLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} className="h-16" />)}
            </div>
          ) : recentAssessments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center">
              <Clock className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No assessments yet.</p>
              <p className="text-xs text-slate-500 mt-1">
                Complete your first symptom evaluation to see results here.
              </p>
              <Link href="/dashboard/assessment" className="mt-4 inline-block">
                <Button size="sm" className="mt-3">Start First Assessment</Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800/60">
              {recentAssessments.map((rec) => (
                <Link key={rec.id} href="/dashboard/history" className="block hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {formatTitleCase(rec.prediction.prediction)}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {formatDate(rec.created_at)} · {rec.symptoms.length} symptoms
                      </p>
                    </div>
                    <Badge variant="cyan" className="font-mono text-[11px] shrink-0 ml-3">
                      {formatConfidencePercentage(rec.prediction.confidence)}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

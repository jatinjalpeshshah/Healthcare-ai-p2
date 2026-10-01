"use client";

import { Search, Stethoscope, BarChart3, BookOpen, ShieldCheck, Utensils, Activity } from "lucide-react";
import { InView, StaggerContainer, StaggerItem } from "@/components/ui/motion-div";

const features = [
  {
    icon: Search,
    title: "Symptom Selection",
    description:
      "Choose from 230 standardized clinical symptom indicators using our fast, searchable interface. No medical jargon — just clear, searchable terms.",
  },
  {
    icon: BarChart3,
    title: "AI Probabilistic Assessment",
    description:
      "Our Logistic Regression model, validated at 90.49% accuracy, evaluates your symptom pattern against 99 conditions and returns ranked probability estimates.",
  },
  {
    icon: BookOpen,
    title: "Disease Information",
    description:
      "Each possible condition comes with a structured description, helping you understand what the condition involves and why it matched your symptoms.",
  },
  {
    icon: ShieldCheck,
    title: "Precautions & Guidance",
    description:
      "Evidence-based precautions are surfaced for each assessed condition so you know what steps are generally recommended.",
  },
  {
    icon: Utensils,
    title: "Diet Recommendations",
    description:
      "Condition-appropriate dietary guidance is presented as reference information to support general wellness conversations with your doctor.",
  },
  {
    icon: Activity,
    title: "Workout & Lifestyle",
    description:
      "Physical activity recommendations tailored to each assessed condition — from gentle movement to activity restrictions.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-slate-900/30 border-y border-slate-800/60">
      <div className="container mx-auto px-4 sm:px-8">
        <InView className="text-center mb-14">
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            Core Capabilities
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Everything You Need to Understand Your Health
          </h2>
          <p className="mt-4 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            From symptom selection to structured medical information — all in one informational tool.
          </p>
        </InView>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 group-hover:bg-cyan-500/15 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

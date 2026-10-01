"use client";

import { UserPlus, Stethoscope, Brain, FileText } from "lucide-react";
import { InView } from "@/components/ui/motion-div";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up with your email. Your data is private, encrypted, and protected by Supabase Row-Level Security — only you can see your assessments.",
  },
  {
    step: "02",
    icon: Stethoscope,
    title: "Select Your Symptoms",
    description:
      "Search and select from 230 standardized clinical symptom indicators. Use the search bar to quickly find relevant symptoms.",
  },
  {
    step: "03",
    icon: Brain,
    title: "AI Analysis",
    description:
      "Your symptom profile is sent to our FastAPI ML inference engine. The Logistic Regression model evaluates your pattern against all 99 conditions and returns a ranked probability list.",
  },
  {
    step: "04",
    icon: FileText,
    title: "Review Your Results",
    description:
      "See the top possible conditions with confidence percentages, plus detailed information: description, precautions, medication information, diet, and workout recommendations.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-8">
        <InView className="text-center mb-14">
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            How It Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Four Steps to Your Assessment
          </h2>
          <p className="mt-4 text-slate-400 text-sm max-w-xl mx-auto">
            From account creation to comprehensive health information in minutes.
          </p>
        </InView>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute left-[27px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-slate-700/50 to-transparent hidden sm:block"
          />

          <div className="space-y-10">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isRight = i % 2 === 1;
              return (
                <InView key={s.step} delay={i * 0.1}>
                  <div className={`flex gap-6 sm:gap-8 items-start ${isRight ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
                    {/* Step number */}
                    <div className="relative flex-shrink-0 flex flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 border-2 border-cyan-500/40 text-cyan-400 z-10">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5 ${isRight ? "sm:text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 rounded px-2 py-0.5">
                          {s.step}
                        </span>
                        <h3 className="font-display font-semibold text-white">{s.title}</h3>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                </InView>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

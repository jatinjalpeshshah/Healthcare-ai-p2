"use client";

import { ShieldAlert } from "lucide-react";
import { InView } from "@/components/ui/motion-div";

export function SafetyDisclaimer() {
  return (
    <InView>
      <section className="py-14 bg-slate-900/40 border-y border-amber-500/15">
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
          </div>
          <h2 className="font-display text-xl font-bold text-white mb-3">
            Important Medical Disclaimer
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            <strong className="text-slate-300">This tool provides informational AI-generated predictions based on the symptoms entered.</strong>{" "}
            It is not a medical diagnosis and is not a substitute for professional medical advice, diagnosis, or treatment.
            Always consult a qualified healthcare provider regarding any medical condition or before making any health-related decisions.
          </p>
        </div>
      </section>
    </InView>
  );
}

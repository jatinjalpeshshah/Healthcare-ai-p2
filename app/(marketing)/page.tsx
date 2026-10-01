import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SafetyDisclaimer } from "@/components/landing/safety-disclaimer";
import { CtaSection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Zidio AI Healthcare System — AI-Powered Symptom Assessment",
  description:
    "Select symptoms, get AI-powered informational assessments across 99 conditions. Disease info, precautions, diet, and workout recommendations. Not a medical diagnosis.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <SafetyDisclaimer />
      <CtaSection />
    </div>
  );
}

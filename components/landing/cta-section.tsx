"use client";

import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/motion-div";

export function CtaSection() {
  return (
    <InView>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 p-10 sm:p-14 text-center overflow-hidden">
            {/* Glow */}
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-cyan-500/10 blur-[80px] pointer-events-none"
            />
            <div className="relative z-10">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">
                Ready to get started?
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Start Your Free Assessment Today
              </h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                No payment required. Create a free account, select your symptoms, and receive a comprehensive
                AI-powered informational assessment in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto font-semibold glow-cyan-sm group">
                    <Stethoscope className="mr-2 h-5 w-5" />
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </InView>
  );
}

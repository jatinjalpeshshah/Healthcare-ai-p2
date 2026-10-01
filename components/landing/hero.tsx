"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, ArrowRight, ShieldCheck, Sparkles, Activity, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Symptom Features", value: "230", icon: Activity },
  { label: "Detectable Conditions", value: "99", icon: Brain },
  { label: "Model Accuracy", value: "90.49%", icon: ShieldCheck },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/8 blur-[130px] pointer-events-none rounded-full"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-teal-500/6 blur-[100px] pointer-events-none rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-8 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex justify-center mb-6"
        >
          <Badge variant="cyan" className="px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            AI-Powered Symptom Assessment Platform
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]"
        >
          Understand Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
            Symptoms
          </span>{" "}
          with AI
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Select your symptoms and receive AI-powered informational assessments across 99 possible
          conditions — complete with disease information, precautions, medications, diet, and workout guidance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth/signup">
            <Button size="lg" className="w-full sm:w-auto font-semibold glow-cyan-sm group">
              <Stethoscope className="mr-2 h-5 w-5" />
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              How It Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-xl text-white leading-none">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

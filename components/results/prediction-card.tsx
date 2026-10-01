"use client";

import { motion } from "framer-motion";
import { Activity, AlertCircle } from "lucide-react";
import { formatTitleCase } from "@/lib/utils/format";
import { ConfidenceIndicator } from "./confidence-indicator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PredictionCardProps {
  prediction: string;
  confidence: number;
  recognizedCount: number;
  inputCount: number;
}

export function PredictionCard({
  prediction,
  confidence,
  recognizedCount,
  inputCount,
}: PredictionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="border-cyan-500/30 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500" />

        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                Primary Assessment
              </span>
              <CardTitle className="font-display text-2xl font-bold text-white leading-tight">
                Possible Condition:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                  {formatTitleCase(prediction)}
                </span>
              </CardTitle>
            </div>
            <Badge variant="cyan" className="px-2.5 py-1 text-xs shrink-0 self-start">
              <Activity className="h-3.5 w-3.5 mr-1" />
              AI-generated
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Based on {recognizedCount} of {inputCount} recognized symptoms provided.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <ConfidenceIndicator confidence={confidence} />

          {/* Disclaimer */}
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 flex items-start space-x-2.5">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Medical Disclaimer: </strong>
              This tool provides informational AI-generated predictions based on the symptoms entered. It is not a medical diagnosis and is not a substitute for professional medical advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

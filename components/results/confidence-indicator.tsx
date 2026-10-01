"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { formatConfidencePercentage, getConfidenceDescription } from "@/lib/utils/confidence";

interface ConfidenceIndicatorProps {
  confidence: number;
}

function AnimatedNumber({ target }: { target: number }) {
  const safeTarget = isNaN(target) ? 0 : target;
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 90, damping: 20 });
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    count.set(safeTarget);
  }, [safeTarget, count]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (spanRef.current) {
        const val = isNaN(v) ? 0 : Math.round(v);
        spanRef.current.textContent = `${val}%`;
      }
    });
  }, [spring]);

  return <span ref={spanRef}>{Math.round(safeTarget)}%</span>;
}

export function ConfidenceIndicator({ confidence }: ConfidenceIndicatorProps) {
  const safeConfidence = confidence === undefined || confidence === null || isNaN(Number(confidence)) ? 0 : Number(confidence);
  const val = safeConfidence > 1 ? safeConfidence : safeConfidence * 100;
  const pct = Math.min(Math.max(Math.round(val), 0), 100);

  const { label, tone, helperText } = getConfidenceDescription(safeConfidence);

  const barColor =
    tone === "high"
      ? "from-teal-500 to-cyan-400"
      : tone === "moderate"
      ? "from-amber-500 to-yellow-400"
      : "from-slate-600 to-slate-500";

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400 font-medium">Model Confidence</span>
        <span className={`font-bold font-mono text-lg ${tone === "high" ? "text-cyan-400" : tone === "moderate" ? "text-amber-400" : "text-slate-400"}`}>
          <AnimatedNumber target={pct} />
        </span>
      </div>

      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>

      <div className="flex justify-between items-start text-[11px]">
        <span className={`font-medium ${tone === "high" ? "text-cyan-400" : tone === "moderate" ? "text-amber-400" : "text-slate-500"}`}>
          {label}
        </span>
        <span className="text-slate-500 text-right max-w-[55%]">{helperText}</span>
      </div>
    </div>
  );
}

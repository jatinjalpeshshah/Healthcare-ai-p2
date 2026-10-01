"use client";

import { motion } from "framer-motion";
import { ConditionPrediction } from "@/types/prediction";
import { formatTitleCase, cn } from "@/lib/utils/format";
import { formatConfidencePercentage } from "@/lib/utils/confidence";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TopPredictionsProps {
  predictions: ConditionPrediction[];
  selectedRank?: number;
  onSelectRank?: (rank: number) => void;
}

export function TopPredictions({
  predictions,
  selectedRank = 1,
  onSelectRank,
}: TopPredictionsProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-white font-display">
          Top Possible Conditions
        </CardTitle>
        <p className="text-xs text-slate-400">
          Ranked by model probability estimate. Click to view details.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {predictions.map((p, i) => {
            const isSelected = p.rank === selectedRank;
            const confValue = p.confidence ?? p.probability ?? 0;
            return (
              <motion.div
                key={p.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => onSelectRank && onSelectRank(p.rank)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-150 text-left",
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-500/30 text-white"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                  )}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono font-bold shrink-0",
                        p.rank === 1
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                          : "bg-slate-800 text-slate-400"
                      )}
                    >
                      {p.rank}
                    </span>
                    <span className="text-sm font-medium truncate">
                      {formatTitleCase(p.disease)}
                    </span>
                  </div>
                  <span className={cn("font-mono text-xs shrink-0 ml-2", isSelected ? "text-cyan-400" : "text-slate-500")}>
                    {formatConfidencePercentage(confValue)}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

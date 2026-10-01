"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { AssessmentRecord } from "@/types/assessment";
import { formatTitleCase, formatDate } from "@/lib/utils/format";
import { formatConfidencePercentage } from "@/lib/utils/confidence";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HistoryTableProps {
  records: AssessmentRecord[];
  onSelectRecord: (record: AssessmentRecord) => void;
}

export function HistoryTable({ records, onSelectRecord }: HistoryTableProps) {
  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 p-10 text-center">
        <Clock className="h-8 w-8 text-slate-600 mx-auto mb-3" />
        <p className="text-sm text-slate-400">No assessment history yet.</p>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Complete a symptom evaluation to preserve records in your private history.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" role="table">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800 text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Possible Condition</th>
                <th className="px-4 py-3 font-semibold">Confidence</th>
                <th className="px-4 py-3 font-semibold">Symptoms</th>
                <th className="px-4 py-3 text-right font-semibold">Details</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {records.map((record, i) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    onClick={() => onSelectRecord(record)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                    role="row"
                  >
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {formatDate(record.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                      {formatTitleCase(record.prediction.prediction)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="cyan" className="font-mono text-[11px]">
                        {formatConfidencePercentage(record.prediction.confidence)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {record.symptoms.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400"
                          >
                            {s.replace(/_/g, " ")}
                          </span>
                        ))}
                        {record.symptoms.length > 3 && (
                          <span className="text-[10px] text-slate-500">+{record.symptoms.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <span className="inline-flex items-center text-cyan-400 font-medium text-xs">
                        View <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden space-y-3">
        {records.map((record, i) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              type="button"
              onClick={() => onSelectRecord(record)}
              className="w-full text-left rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 hover:bg-slate-900/80 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-white">
                  {formatTitleCase(record.prediction.prediction)}
                </p>
                <Badge variant="cyan" className="font-mono text-[11px] shrink-0">
                  {formatConfidencePercentage(record.prediction.confidence)}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">{formatDate(record.created_at)}</p>
              <div className="flex flex-wrap gap-1">
                {record.symptoms.slice(0, 4).map((s) => (
                  <span key={s} className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400">
                    {s.replace(/_/g, " ")}
                  </span>
                ))}
                {record.symptoms.length > 4 && (
                  <span className="text-[10px] text-slate-500">+{record.symptoms.length - 4}</span>
                )}
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
}

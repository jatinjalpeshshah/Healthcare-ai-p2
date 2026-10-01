import { Pill } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MedicationsProps {
  medications: string[];
}

export function Medications({ medications }: MedicationsProps) {
  if (!medications?.length) return null;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2 text-violet-400">
          <Pill className="h-4 w-4 shrink-0" />
          <CardTitle className="text-sm font-semibold text-white">Medication Information</CardTitle>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          General reference information. Not a personal prescription or medical advice.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2" role="list">
          {medications.map((m, i) => (
            <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" aria-hidden />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

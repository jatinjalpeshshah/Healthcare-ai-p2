import { ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PrecautionsProps {
  precautions: string[];
}

export function Precautions({ precautions }: PrecautionsProps) {
  if (!precautions?.length) return null;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2 text-emerald-400">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <CardTitle className="text-sm font-semibold text-white">Precautions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2" role="list">
          {precautions.map((p, i) => (
            <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

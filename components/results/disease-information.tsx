import { Info } from "lucide-react";
import { formatTitleCase } from "@/lib/utils/format";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DiseaseInformationProps {
  disease: string;
  description: string | null;
}

export function DiseaseInformation({ disease, description }: DiseaseInformationProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2 text-cyan-400 mb-1">
          <Info className="h-4 w-4 shrink-0" />
          <CardTitle className="text-sm font-semibold text-white">
            About: {formatTitleCase(disease)}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {description ? (
          <p className="text-xs text-slate-300 leading-relaxed">{description}</p>
        ) : (
          <p className="text-xs text-slate-500 italic">No description available for this condition.</p>
        )}
      </CardContent>
    </Card>
  );
}

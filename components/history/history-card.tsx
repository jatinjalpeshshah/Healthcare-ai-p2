import { AssessmentRecord } from "@/types/assessment";
import { formatTitleCase, formatDate } from "@/lib/utils/format";
import { formatConfidencePercentage } from "@/lib/utils/confidence";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HistoryCardProps {
  record: AssessmentRecord;
  onSelect?: (record: AssessmentRecord) => void;
}

export function HistoryCard({ record, onSelect }: HistoryCardProps) {
  return (
    <Card
      onClick={() => onSelect && onSelect(record)}
      className="border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors cursor-pointer"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold text-white">
            {formatTitleCase(record.prediction.prediction)}
          </CardTitle>
          <Badge variant="cyan" className="font-mono text-xs">
            {formatConfidencePercentage(record.prediction.confidence)}
          </Badge>
        </div>
        <span className="text-[11px] text-slate-500">{formatDate(record.created_at)}</span>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {record.symptoms.slice(0, 5).map((symptom) => (
            <Badge key={symptom} variant="muted" className="text-[10px] py-0">
              {symptom}
            </Badge>
          ))}
          {record.symptoms.length > 5 && (
            <span className="text-[10px] text-slate-500 self-center">
              +{record.symptoms.length - 5} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

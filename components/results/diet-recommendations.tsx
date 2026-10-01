import { Utensils } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DietRecommendationsProps {
  diet: string[];
}

export function DietRecommendations({ diet }: DietRecommendationsProps) {
  if (!diet?.length) return null;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2 text-orange-400">
          <Utensils className="h-4 w-4 shrink-0" />
          <CardTitle className="text-sm font-semibold text-white">Diet Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2" role="list">
          {diet.map((d, i) => (
            <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" aria-hidden />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

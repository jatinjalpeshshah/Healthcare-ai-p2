import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface WorkoutRecommendationsProps {
  workout: string[];
}

export function WorkoutRecommendations({ workout }: WorkoutRecommendationsProps) {
  if (!workout?.length) return null;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2 text-sky-400">
          <Activity className="h-4 w-4 shrink-0" />
          <CardTitle className="text-sm font-semibold text-white">Workout & Lifestyle</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2" role="list">
          {workout.map((w, i) => (
            <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" aria-hidden />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

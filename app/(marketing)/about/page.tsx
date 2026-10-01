import { ShieldCheck, Cpu, Database, Server, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-4xl space-y-8">
      <div>
        <Badge variant="cyan" className="mb-2">
          Architecture & Verification
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About Zidio AI Healthcare System
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          A full-stack, machine learning powered healthcare information platform engineered for high-precision
          symptom assessment, probability calibration, and structured clinical guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Cpu className="h-5 w-5" />
              <CardTitle className="text-base text-white">Machine Learning Core</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-300">
            <p><strong>Architecture:</strong> Calibrated Multinomial Logistic Regression</p>
            <p><strong>Symptom Features:</strong> 230 standardized binary indicators</p>
            <p><strong>Supported Diseases:</strong> 99 clinical conditions</p>
            <p><strong>Test Accuracy:</strong> 90.49% verified across 20,195 test records</p>
            <p><strong>Top-5 Accuracy:</strong> 99.67% condition coverage</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Server className="h-5 w-5" />
              <CardTitle className="text-base text-white">Full-Stack Architecture</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-300">
            <p><strong>Frontend:</strong> Next.js App Router (TypeScript + Tailwind CSS)</p>
            <p><strong>Backend:</strong> FastAPI serverless execution in Python 3.13</p>
            <p><strong>Database & Auth:</strong> Supabase Auth & PostgreSQL</p>
            <p><strong>Deployment:</strong> Single-repository Vercel Serverless Function model</p>
            <p><strong>Security:</strong> Server-side model isolation, Row-Level Security (RLS)</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-cyan-500/20 bg-cyan-950/10">
        <CardHeader>
          <div className="flex items-center space-x-2 text-cyan-400">
            <ShieldCheck className="h-5 w-5" />
            <CardTitle className="text-base text-white">Clinical Scope & Disclaimer</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            This application is designed specifically for informational and educational symptom assessment.
            In accordance with medical software best practices, predictions are reported as probabilities and
            differential possibilities rather than definitive diagnoses.
          </p>
          <p>
            Medications, diets, and exercise plans provided by the system are general evidence-based references
            and should always be reviewed with licensed healthcare practitioners before making clinical decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import Link from "next/link";
import { Activity, ShieldAlert } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/60 bg-slate-950/80 py-10 mt-auto">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-display font-semibold text-white">
                Zidio <span className="text-cyan-400 font-normal">AI Health</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              AI-powered symptom assessment and healthcare information platform. For informational purposes only.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform</p>
            <nav className="flex flex-col space-y-1.5" aria-label="Footer navigation">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors w-fit">Home</Link>
              <Link href="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors w-fit">About</Link>
              <Link href="/auth/signup" className="text-xs text-slate-500 hover:text-slate-300 transition-colors w-fit">Get Started</Link>
              <Link href="/auth/login" className="text-xs text-slate-500 hover:text-slate-300 transition-colors w-fit">Sign In</Link>
            </nav>
          </div>

          {/* Disclaimer */}
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-amber-400">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-wider">Medical Disclaimer</p>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              This tool provides AI-generated informational predictions only. It is not a medical diagnosis and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <span>© {currentYear} Zidio AI Healthcare System. Informational use only.</span>
          <span>Built with Next.js · FastAPI · Supabase · scikit-learn</span>
        </div>
      </div>
    </footer>
  );
}

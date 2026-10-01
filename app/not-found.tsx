import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-6">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The requested medical assessment resource or page could not be located.
      </p>
      <Link href="/">
        <Button variant="secondary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Home
        </Button>
      </Link>
    </div>
  );
}

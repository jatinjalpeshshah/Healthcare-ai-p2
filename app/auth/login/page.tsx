"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, AlertCircle, Eye, EyeOff, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(authError.message);
      } else {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-900/80">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
          <Activity className="h-6 w-6" />
        </div>
        <CardTitle className="font-display text-2xl text-white">Welcome Back</CardTitle>
        <CardDescription className="text-sm text-slate-400">
          Sign in to access your symptom assessments and health history.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {(error || urlError) && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 mb-5 flex items-start space-x-2 text-xs text-rose-400" role="alert">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error ?? urlError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="text-xs font-medium text-slate-300">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-cyan-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full mt-1" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </span>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-cyan-400 hover:underline font-medium">
            Create a free account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Suspense fallback={
          <div className="p-8 border border-slate-800 rounded-xl bg-slate-900/80 text-center text-slate-400">
            Loading...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </motion.div>
    </div>
  );
}

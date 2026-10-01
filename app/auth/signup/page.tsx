"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, AlertCircle, Eye, EyeOff, CheckCircle2, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="border-slate-800 bg-slate-900/80 text-center">
            <CardContent className="pt-10 pb-8 space-y-4">
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
              </div>
              <h2 className="font-display text-2xl font-bold text-white">Check Your Email</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                We sent a confirmation link to <strong className="text-slate-300">{email}</strong>.
                Click the link to activate your account.
              </p>
              <Link href="/auth/login">
                <Button variant="outline" className="mt-2">Back to Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-800 bg-slate-900/80">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Activity className="h-6 w-6" />
            </div>
            <CardTitle className="font-display text-2xl text-white">Create Your Account</CardTitle>
            <CardDescription className="text-sm text-slate-400">
              Free access to AI-powered symptom assessments and health history.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 mb-5 flex items-start space-x-2 text-xs text-rose-400" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4" noValidate>
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

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
                <label htmlFor="password" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password <span className="text-slate-500">(min. 6 characters)</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" className="w-full mt-1" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-cyan-400 hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

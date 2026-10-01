"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });
      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

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
              <KeyRound className="h-6 w-6" />
            </div>
            <CardTitle className="font-display text-2xl text-white">Reset Password</CardTitle>
            <CardDescription className="text-sm text-slate-400">
              Enter your email and we&apos;ll send you a password reset link.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-sm text-slate-300">
                  Reset link sent to <strong>{email}</strong>. Check your inbox.
                </p>
                <Link href="/auth/login">
                  <Button variant="outline" className="mt-1">
                    <ArrowLeft className="h-4 w-4 mr-1.5" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 mb-5 flex items-start space-x-2 text-xs text-rose-400" role="alert">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleReset} className="space-y-4" noValidate>
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
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>

                <div className="mt-5 text-center">
                  <Link href="/auth/login" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center">
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

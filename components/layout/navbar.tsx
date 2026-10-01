"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Menu, X, LogOut, User, LayoutDashboard, Stethoscope, History } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
  ];

  const dashLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/assessment", label: "Assessment", icon: Stethoscope },
    { href: "/dashboard/history", label: "History", icon: History },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group" aria-label="Zidio AI Health Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-white">
              Zidio <span className="text-cyan-400 font-normal">AI Health</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm">
                    <LayoutDashboard className="h-4 w-4 mr-1.5" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { signOut(); }}
                  className="text-slate-400 hover:text-rose-400"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="glow-cyan-sm">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-30 bg-slate-950/80 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-slate-950 border-l border-slate-800 p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-semibold text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
                {user
                  ? dashLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            pathname === link.href
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                              : "text-slate-300 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })
                  : navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm text-slate-300 hover:text-white px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
              </nav>

              <div className="mt-auto space-y-2">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
                    onClick={() => { signOut(); setMobileOpen(false); }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

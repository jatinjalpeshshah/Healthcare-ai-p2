"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Stethoscope,
  History,
  UserCheck,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils/format";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/assessment", label: "Symptom Assessment", icon: Stethoscope, exact: false },
  { href: "/dashboard/history", label: "Past Assessments", icon: History, exact: false },
  { href: "/dashboard/profile", label: "My Profile", icon: UserCheck, exact: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/");
  };

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      className="w-64 border-r border-slate-800/80 bg-slate-950/60 flex flex-col min-h-[calc(100vh-4rem)] hidden md:flex"
      aria-label="Dashboard navigation"
    >
      <div className="flex-1 p-4 space-y-1">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 mt-1">
          Clinical Portal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 glow-cyan-sm"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent"
              )}
              aria-current={active ? "page" : undefined}
            >
              <div className="flex items-center space-x-3">
                <Icon className={cn("h-4 w-4 shrink-0", active ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-400")} />
                <span>{item.label}</span>
              </div>
              {active && <ChevronRight className="h-3.5 w-3.5 text-cyan-500/60" />}
            </Link>
          );
        })}
      </div>

      {/* Footer section */}
      <div className="p-4 space-y-3 border-t border-slate-800/60">
        {/* Model info */}
        <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3.5">
          <div className="flex items-center space-x-2 text-cyan-400 mb-1.5">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="text-xs font-semibold">90.49% Validated</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-500">
            Logistic Regression across 230 symptoms and 99 conditions.
          </p>
        </div>

        {/* User info + logout */}
        {user && (
          <div className="space-y-2">
            <div className="px-1 text-[11px] text-slate-500 truncate" title={user.email ?? ""}>
              {user.email}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              <LogOut className="h-3.5 w-3.5 mr-2" />
              {signingOut ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}

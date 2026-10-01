"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Stethoscope, History, UserCheck } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils/format";

const mobileNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/assessment", label: "Assess", icon: Stethoscope, exact: false },
  { href: "/dashboard/history", label: "History", icon: History, exact: false },
  { href: "/dashboard/profile", label: "Profile", icon: UserCheck, exact: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          {children}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-md flex items-center justify-around md:hidden"
        aria-label="Mobile navigation"
      >
        {mobileNav.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2.5 px-4 text-[10px] font-medium transition-colors min-w-0",
                active ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("h-5 w-5 mb-0.5", active && "text-cyan-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

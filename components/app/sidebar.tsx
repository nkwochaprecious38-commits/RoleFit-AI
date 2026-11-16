"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  BarChart3,
  TrendingUp,
  Kanban,
  FileText,
  MessageSquare,
  Users,
  Briefcase,
  UserPlus,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { type: "divider", label: "PLATFORM" },
  { href: "/match", label: "RoleFit Match", icon: Brain },
  { href: "/intelligence", label: "Intelligence", icon: BarChart3 },
  { href: "/growth", label: "Growth", icon: TrendingUp },
  { href: "/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/job-studio", label: "Job Studio", icon: FileText },
  { href: "/interview", label: "Interview", icon: MessageSquare },
  { type: "divider", label: "MANAGEMENT" },
  { href: "/candidates", label: "Candidates", icon: Users },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/team", label: "Team", icon: UserPlus },
  { type: "divider", label: "ACCOUNT" },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-navy text-white flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 border-b border-white/10", collapsed ? "justify-center" : "gap-3")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-magenta flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-heading font-bold text-lg">
            RoleFit <span className="text-mint">AI</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((item, i) => {
          if (item.type === "divider") {
            return (
              <div key={i} className={cn("mt-4 mb-2", collapsed ? "px-1" : "px-3")}>
                {!collapsed && (
                  <span className="text-[10px] font-semibold tracking-widest text-white/30 uppercase">
                    {item.label}
                  </span>
                )}
                {collapsed && <div className="h-px bg-white/10 my-2" />}
              </div>
            );
          }

          if (!item.href || !item.icon) return null;
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mb-0.5",
                isActive
                  ? "bg-gradient-to-r from-purple to-magenta text-white shadow-sm"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-white/10">
        <button
          onClick={handleSignOut}
          title={collapsed ? "Sign out" : undefined}
          className={cn(
            "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors mt-1",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

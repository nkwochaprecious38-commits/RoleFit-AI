"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/app/sidebar";
import { TopNav } from "@/components/app/top-nav";
import { cn } from "@/lib/utils";
import { useAppUser } from "@/lib/hooks/use-app-user";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAppUser();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "lg:pl-16" : "lg:pl-64"
      )}>
        <TopNav user={user} />
        <main className="p-4 sm:p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}

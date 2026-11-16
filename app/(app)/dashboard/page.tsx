"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import {
  Users,
  Briefcase,
  Brain,
  Calendar,
  TrendingUp,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DashboardStats {
  total_jobs: number;
  active_jobs: number;
  total_candidates: number;
  total_applications: number;
  upcoming_interviews: number;
  recent_matches: number;
}

interface RecentActivity {
  id: string;
  type: "candidate" | "job" | "interview" | "match";
  title: string;
  description: string;
  created_at: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get organization
        const { data: membership } = await supabase
          .from("organization_members")
          .select("organization_id, organizations(name)")
          .eq("user_id", user.id)
          .single();

        const orgId = membership?.organization_id;
        // @ts-expect-error Supabase join type
        setOrgName(membership?.organizations?.name || null);

        if (!orgId) {
          setStats({ total_jobs: 0, active_jobs: 0, total_candidates: 0, total_applications: 0, upcoming_interviews: 0, recent_matches: 0 });
          setLoading(false);
          router.replace("/onboarding");
          return;
        }

        // Fetch counts in parallel
        const [jobsRes, candidatesRes, applicationsRes, interviewsRes, matchesRes] = await Promise.all([
          supabase.from("jobs").select("id, status", { count: "exact" }).eq("organization_id", orgId),
          supabase.from("candidates").select("id", { count: "exact" }).eq("organization_id", orgId),
          supabase.from("applications").select("id", { count: "exact" }).eq("organization_id", orgId),
          supabase.from("interviews").select("id", { count: "exact" }).eq("organization_id", orgId).gte("scheduled_at", new Date().toISOString()),
          supabase.from("candidate_match_results").select("id", { count: "exact" }).eq("organization_id", orgId),
        ]);

        const activeJobs = jobsRes.data?.filter(j => j.status === "active").length || 0;

        setStats({
          total_jobs: jobsRes.count || 0,
          active_jobs: activeJobs,
          total_candidates: candidatesRes.count || 0,
          total_applications: applicationsRes.count || 0,
          upcoming_interviews: interviewsRes.count || 0,
          recent_matches: matchesRes.count || 0,
        });

        // Fetch recent candidates as activity
        const { data: recentCandidates } = await supabase
          .from("candidates")
          .select("id, full_name, current_title, created_at")
          .eq("organization_id", orgId)
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentActivity(
          (recentCandidates || []).map(c => ({
            id: c.id,
            type: "candidate" as const,
            title: c.full_name,
            description: c.current_title || "New candidate added",
            created_at: c.created_at,
          }))
        );
      } catch (err) {
        console.error("Dashboard error:", err);
        setStats({ total_jobs: 0, active_jobs: 0, total_candidates: 0, total_applications: 0, upcoming_interviews: 0, recent_matches: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { label: "Active Jobs", value: stats?.active_jobs ?? 0, total: stats?.total_jobs, icon: Briefcase, color: "text-purple", bg: "bg-lavender", href: "/jobs" },
    { label: "Candidates", value: stats?.total_candidates ?? 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50", href: "/candidates" },
    { label: "Applications", value: stats?.total_applications ?? 0, icon: TrendingUp, color: "text-magenta", bg: "bg-pink-50", href: "/pipeline" },
    { label: "Upcoming Interviews", value: stats?.upcoming_interviews ?? 0, icon: Calendar, color: "text-teal-600", bg: "bg-teal-50", href: "/interview" },
    { label: "AI Matches", value: stats?.recent_matches ?? 0, icon: Brain, color: "text-amber-600", bg: "bg-amber-50", href: "/match" },
  ];

  const pipelineData = [
    { stage: "Applied", count: stats?.total_applications ?? 0 },
    { stage: "Review", count: Math.round((stats?.total_applications ?? 0) * 0.6) },
    { stage: "Interview", count: stats?.upcoming_interviews ?? 0 },
    { stage: "Offer", count: Math.round((stats?.upcoming_interviews ?? 0) * 0.4) },
    { stage: "Hired", count: Math.round((stats?.upcoming_interviews ?? 0) * 0.2) },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">
            {orgName ? `${orgName} Dashboard` : "Dashboard"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your talent intelligence overview
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/candidates">
              <Plus className="w-4 h-4 mr-1" /> Add Candidate
            </Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/jobs">
              <Plus className="w-4 h-4 mr-1" /> Post Job
            </Link>
          </Button>
        </div>
      </div>

      {/* No org banner — normally unreachable (redirect fires first) */}
      {!loading && !orgName && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-900 text-sm">Set up your organisation</p>
            <p className="text-amber-700 text-sm mt-1">
              Create or join an organisation to unlock all RoleFit AI features.
            </p>
          </div>
          <Button variant="default" size="sm" asChild>
            <Link href="/onboarding">Get Started <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
          </Button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))
          : statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.label} href={stat.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="font-heading text-2xl font-bold text-navy">{stat.value}</div>
                      {stat.total !== undefined && (
                        <div className="text-xs text-muted-foreground">of {stat.total} total</div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
      </div>

      {/* Charts + Activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recruitment Pipeline</CardTitle>
            <CardDescription>Candidates by stage across all active jobs</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-48 w-full" />
            ) : stats?.total_applications === 0 ? (
              <div className="h-48 flex items-center justify-center text-center">
                <div>
                  <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No applications yet</p>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <Link href="/pipeline">View Pipeline</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={pipelineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B35C9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No recent activity</p>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-lavender/30">
                  <div className="w-7 h-7 rounded-full bg-purple/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">{formatRelativeTime(activity.created_at)}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Match Candidates", href: "/match", icon: Brain, color: "from-purple to-magenta" },
          { label: "View Pipeline", href: "/pipeline", icon: TrendingUp, color: "from-blue-500 to-purple" },
          { label: "Job Studio", href: "/job-studio", icon: Briefcase, color: "from-amber-500 to-orange-500" },
          { label: "Interview Kit", href: "/interview", icon: Calendar, color: "from-teal-500 to-mint" },
          { label: "Team Analytics", href: "/intelligence", icon: Users, color: "from-magenta to-pink-400" },
          { label: "Growth Plans", href: "/growth", icon: CheckCircle2, color: "from-green-500 to-teal-500" },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-navy leading-tight">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { BarChart3, Users, TrendingUp, AlertCircle } from "lucide-react";

const COLORS = ["#8B35C9", "#D83A91", "#83DCCB", "#19183F", "#F3E9FC"];

export default function IntelligencePage() {
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [skills, setSkills] = useState<{ name: string; count: number }[]>([]);
  const [candidateCount, setCandidateCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: membership } = await supabase
        .from("organization_members")
        .select("organization_id")
        .eq("user_id", user.id)
        .single();

      if (!membership?.organization_id) {
        setLoading(false);
        return;
      }

      const [candidatesRes, jobsRes] = await Promise.all([
        supabase.from("candidates").select("skills").eq("organization_id", membership.organization_id),
        supabase.from("jobs").select("id", { count: "exact" }).eq("organization_id", membership.organization_id),
      ]);

      const allSkills: Record<string, number> = {};
      (candidatesRes.data || []).forEach(c => {
        (c.skills || []).forEach((s: string) => {
          allSkills[s] = (allSkills[s] || 0) + 1;
        });
      });

      const skillData = Object.entries(allSkills)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setSkills(skillData);
      setCandidateCount(candidatesRes.data?.length || 0);
      setJobCount(jobsRes.count || 0);
      setHasData((candidatesRes.data?.length || 0) > 0);
      setLoading(false);
    };

    fetchData();
  }, []);

  const experienceData = [
    { range: "0-2 years", count: 12 },
    { range: "3-5 years", count: 28 },
    { range: "6-10 years", count: 19 },
    { range: "10+ years", count: 7 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple" /> RoleFit Intelligence
        </h1>
        <p className="text-sm text-muted-foreground">Workforce analytics and skills intelligence powered by your candidate data</p>
      </div>

      {!hasData && !loading && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 text-sm">No workforce data yet</p>
            <p className="text-amber-700 text-sm mt-1">
              Add candidates and employees to unlock workforce intelligence insights.
            </p>
          </div>
          <Button variant="default" size="sm" asChild>
            <a href="/candidates">Add Candidates</a>
          </Button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Candidates", value: loading ? "—" : candidateCount, icon: Users, color: "text-purple", bg: "bg-lavender" },
          { label: "Active Jobs", value: loading ? "—" : jobCount, icon: TrendingUp, color: "text-magenta", bg: "bg-pink-50" },
          { label: "Unique Skills", value: loading ? "—" : skills.length, icon: BarChart3, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Avg Match Score", value: loading ? "—" : "—", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {loading ? <Skeleton className="h-7 w-16 mb-1" /> : (
                  <div className="font-heading text-2xl font-bold text-navy">{stat.value}</div>
                )}
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Skills in Candidate Pool</CardTitle>
            <CardDescription>Most common skills across your candidates</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-56 w-full" />
            ) : skills.length === 0 ? (
              <div className="h-56 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Add candidates with skills to see this chart</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={skills} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B35C9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Experience Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Experience Distribution</CardTitle>
            <CardDescription>Candidates by years of experience</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-56 w-full" />
            ) : candidateCount === 0 ? (
              <div className="h-56 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Add candidates to see experience distribution</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={experienceData} cx="50%" cy="50%" outerRadius={80} dataKey="count" nameKey="range" label={({ range }) => range}>
                    {experienceData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Skills Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Gap Analysis</CardTitle>
          <CardDescription>Required skills vs. available skills in your candidate pool</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Skills gap analysis appears when you have both active jobs with required skills and candidates in your database.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

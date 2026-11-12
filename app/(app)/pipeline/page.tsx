"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/lib/hooks/use-toast";
import { getInitials } from "@/lib/utils";
import { Kanban, ChevronRight } from "lucide-react";

type Stage = {
  id: string;
  label: string;
  color: string;
};

const STAGES: Stage[] = [
  { id: "new_application", label: "New Application", color: "bg-gray-100 border-gray-300" },
  { id: "resume_review", label: "Resume Review", color: "bg-blue-50 border-blue-300" },
  { id: "shortlisted", label: "Shortlisted", color: "bg-purple/10 border-purple/30" },
  { id: "interview_scheduled", label: "Interview Scheduled", color: "bg-amber-50 border-amber-300" },
  { id: "interviewing", label: "Interviewing", color: "bg-orange-50 border-orange-300" },
  { id: "offer", label: "Offer", color: "bg-green-50 border-green-300" },
  { id: "hired", label: "Hired", color: "bg-teal-50 border-teal-300" },
  { id: "rejected", label: "Rejected", color: "bg-red-50 border-red-300" },
];

interface Application {
  id: string;
  stage: string;
  candidate_id: string;
  job_id: string;
  match_score: number | null;
  candidates: { first_name: string; last_name: string; current_title: string | null } | null;
  jobs: { title: string } | null;
}

export default function PipelinePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [jobs, setJobs] = useState<{ id: string; title: string }[]>([]);
  const [orgId, setOrgId] = useState<string | null>(null);
  const { toast } = useToast();
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

      setOrgId(membership.organization_id);

      const [appsRes, jobsRes] = await Promise.all([
        supabase.from("applications")
          .select("*, candidates(first_name, last_name, current_title), jobs(title)")
          .eq("organization_id", membership.organization_id)
          .order("created_at", { ascending: false }),
        supabase.from("jobs")
          .select("id, title")
          .eq("organization_id", membership.organization_id)
          .eq("status", "active"),
      ]);

      setApplications(appsRes.data || []);
      setJobs(jobsRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredApps = selectedJob === "all"
    ? applications
    : applications.filter(a => a.job_id === selectedJob);

  const getStageApps = (stageId: string) =>
    filteredApps.filter(a => a.stage === stageId);

  const moveToStage = async (appId: string, newStage: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ stage: newStage })
      .eq("id", appId);

    if (error) {
      toast({ title: "Error", description: "Failed to update stage", variant: "destructive" });
      return;
    }

    setApplications(prev => prev.map(a => a.id === appId ? { ...a, stage: newStage } : a));
    toast({ title: "Stage updated", description: `Candidate moved to ${STAGES.find(s => s.id === newStage)?.label}` });
  };

  const displayedStages = STAGES.filter(s => !["rejected", "hired"].includes(s.id));

  return (
    <div className="max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
            <Kanban className="w-6 h-6 text-purple" /> RoleFit Pipeline
          </h1>
          <p className="text-sm text-muted-foreground">Track candidates through your recruitment pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {jobs.map(j => <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="w-64 h-96 shrink-0 rounded-xl" />)}
        </div>
      ) : filteredApps.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Kanban className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-navy mb-2">No applications yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add candidates to jobs to start tracking your recruitment pipeline.
            </p>
            <Button variant="primary" asChild>
              <a href="/app/candidates">Add Candidates</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {displayedStages.map(stage => {
              const stageApps = getStageApps(stage.id);
              return (
                <div key={stage.id} className={`w-72 rounded-xl border-2 ${stage.color} bg-white/50`}>
                  <div className="p-3 border-b border-current/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-navy">{stage.label}</span>
                      <Badge variant="secondary" className="text-xs">{stageApps.length}</Badge>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 min-h-32">
                    {stageApps.map(app => (
                      <div key={app.id} className="bg-white rounded-lg p-3 shadow-sm border border-border hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-2 mb-2">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="text-xs">
                              {app.candidates ? getInitials(`${app.candidates.first_name} ${app.candidates.last_name}`) : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-navy truncate">
                              {app.candidates ? `${app.candidates.first_name} ${app.candidates.last_name}` : "Unknown"}
                            </p>
                            {app.candidates?.current_title && (
                              <p className="text-xs text-muted-foreground truncate">{app.candidates.current_title}</p>
                            )}
                          </div>
                          {app.match_score && (
                            <span className="text-xs font-bold text-purple shrink-0">{app.match_score}%</span>
                          )}
                        </div>
                        {app.jobs && (
                          <p className="text-xs text-muted-foreground mb-2 truncate">{app.jobs.title}</p>
                        )}
                        <div className="flex gap-1 flex-wrap">
                          {STAGES.filter(s => s.id !== stage.id && !["rejected", "hired"].includes(s.id)).slice(0, 2).map(nextStage => (
                            <button
                              key={nextStage.id}
                              onClick={() => moveToStage(app.id, nextStage.id)}
                              className="text-xs text-purple hover:underline flex items-center gap-0.5"
                            >
                              → {nextStage.label.split(" ")[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Hired + Rejected columns */}
            {["hired", "rejected"].map(stageId => {
              const stage = STAGES.find(s => s.id === stageId)!;
              const stageApps = getStageApps(stageId);
              return (
                <div key={stageId} className={`w-72 rounded-xl border-2 ${stage.color} bg-white/50`}>
                  <div className="p-3 border-b border-current/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-navy">{stage.label}</span>
                      <Badge variant="secondary" className="text-xs">{stageApps.length}</Badge>
                    </div>
                  </div>
                  <div className="p-2 min-h-32 text-center pt-8">
                    {stageApps.length === 0 ? (
                      <p className="text-xs text-muted-foreground">Empty</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">{stageApps.length} candidates</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/lib/hooks/use-toast";
import { getInitials } from "@/lib/utils";
import { Brain, Upload, Zap, CheckCircle2, AlertCircle, ChevronRight, Sparkles } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string | null;
  required_skills: string[];
}

interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  current_title: string | null;
  skills: string[];
  years_experience: number | null;
}

interface MatchResult {
  candidate_id: string;
  candidate: Candidate;
  overall_score: number;
  skills_match: { matched: string[]; missing: string[] };
  strengths: string[];
  gaps: string[];
  ai_explanation: string;
}

export default function MatchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
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

      const [jobsRes, candidatesRes] = await Promise.all([
        supabase.from("jobs").select("id, title, department, required_skills").eq("organization_id", membership.organization_id).eq("status", "active"),
        supabase.from("candidates").select("id, first_name, last_name, current_title, skills, years_experience").eq("organization_id", membership.organization_id),
      ]);

      setJobs(jobsRes.data || []);
      setCandidates(candidatesRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const runMatch = async () => {
    if (!selectedJob) {
      toast({ title: "Select a job", description: "Choose a job to match candidates against.", variant: "destructive" });
      return;
    }

    const job = jobs.find(j => j.id === selectedJob);
    if (!job) return;

    const targetCandidates = selectedCandidates.length > 0
      ? candidates.filter(c => selectedCandidates.includes(c.id))
      : candidates;

    if (targetCandidates.length === 0) {
      toast({ title: "No candidates", description: "Add candidates to match against this job.", variant: "destructive" });
      return;
    }

    setMatching(true);

    try {
      const response = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job,
          candidates: targetCandidates,
          organization_id: orgId,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Match failed");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err: unknown) {
      toast({
        title: "Matching failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setMatching(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return "from-green-500 to-teal-500";
    if (score >= 50) return "from-amber-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple" /> RoleFit Match
        </h1>
        <p className="text-sm text-muted-foreground">AI-powered candidate matching. Every recommendation comes with an explanation.</p>
      </div>

      {/* Setup Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Configure Match</CardTitle>
            <CardDescription>Select a job and optionally specific candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Job vacancy *</label>
                  {jobs.length === 0 ? (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
                      No active jobs. Create a job first.
                    </div>
                  ) : (
                    <Select onValueChange={setSelectedJob} value={selectedJob}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job..." />
                      </SelectTrigger>
                      <SelectContent>
                        {jobs.map(j => (
                          <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {selectedJob && (
                  <div className="rounded-lg bg-lavender p-3">
                    <p className="text-xs font-medium text-navy mb-1">Required skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {(jobs.find(j => j.id === selectedJob)?.required_skills || []).map(s => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                      {(jobs.find(j => j.id === selectedJob)?.required_skills || []).length === 0 && (
                        <span className="text-xs text-muted-foreground">No skills specified</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Candidates</label>
                  <p className="text-xs text-muted-foreground">
                    {selectedCandidates.length === 0
                      ? `All ${candidates.length} candidates will be matched`
                      : `${selectedCandidates.length} selected`}
                  </p>
                  {candidates.length === 0 && (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
                      No candidates in your database yet.
                    </div>
                  )}
                </div>

                <div className="bg-lavender/50 rounded-lg p-3 text-xs text-muted-foreground">
                  <p className="font-medium text-navy mb-1">About AI Matching</p>
                  <p>AI surfaces insights to inform your decisions. Every recommendation includes an explanation. Your team makes all final hiring decisions.</p>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={runMatch}
                  loading={matching}
                  disabled={!selectedJob || candidates.length === 0}
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  {matching ? "Analysing..." : "Run AI Match"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          {results.length === 0 && !matching ? (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple/10 to-magenta/10 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-purple" />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">Ready to match</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Select a job vacancy and run the AI match to see candidate compatibility insights with explainable recommendations.
                </p>
              </CardContent>
            </Card>
          ) : matching ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="w-16 h-16 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-navy">{results.length} matches found</h2>
                <Badge variant="secondary">{jobs.find(j => j.id === selectedJob)?.title}</Badge>
              </div>
              {results
                .sort((a, b) => b.overall_score - a.overall_score)
                .map(result => (
                  <Card key={result.candidate_id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 shrink-0">
                          <AvatarFallback>{getInitials(`${result.candidate.first_name} ${result.candidate.last_name}`)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-navy">
                                {result.candidate.first_name} {result.candidate.last_name}
                              </h3>
                              {result.candidate.current_title && (
                                <p className="text-sm text-muted-foreground">{result.candidate.current_title}</p>
                              )}
                            </div>
                            <div className="text-center shrink-0">
                              <div className={`text-2xl font-bold font-heading ${getScoreColor(result.overall_score)}`}>
                                {result.overall_score}%
                              </div>
                              <div className="text-xs text-muted-foreground">match</div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">Skills match</span>
                              <span className="text-xs text-muted-foreground">
                                {result.skills_match.matched.length}/{result.skills_match.matched.length + result.skills_match.missing.length}
                              </span>
                            </div>
                            <Progress
                              value={result.skills_match.matched.length /
                                Math.max(result.skills_match.matched.length + result.skills_match.missing.length, 1) * 100}
                              className="h-1.5"
                            />
                          </div>

                          <Tabs defaultValue="overview" className="mt-4">
                            <TabsList className="h-8">
                              <TabsTrigger value="overview" className="text-xs h-7">Overview</TabsTrigger>
                              <TabsTrigger value="skills" className="text-xs h-7">Skills</TabsTrigger>
                              <TabsTrigger value="ai" className="text-xs h-7">AI Insight</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="mt-3 space-y-2">
                              {result.strengths.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-green-700 mb-1">Strengths</p>
                                  {result.strengths.map(s => (
                                    <div key={s} className="flex items-start gap-1.5 text-xs text-charcoal">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                      {s}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {result.gaps.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-amber-700 mb-1">Areas for assessment</p>
                                  {result.gaps.map(g => (
                                    <div key={g} className="flex items-start gap-1.5 text-xs text-charcoal">
                                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                      {g}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </TabsContent>
                            <TabsContent value="skills" className="mt-3">
                              <div className="space-y-2">
                                <div>
                                  <p className="text-xs font-medium text-green-700 mb-1">Matched skills</p>
                                  <div className="flex flex-wrap gap-1">
                                    {result.skills_match.matched.map(s => (
                                      <Badge key={s} variant="success" className="text-xs">{s}</Badge>
                                    ))}
                                    {result.skills_match.matched.length === 0 && <span className="text-xs text-muted-foreground">None matched</span>}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-amber-700 mb-1">Missing skills</p>
                                  <div className="flex flex-wrap gap-1">
                                    {result.skills_match.missing.map(s => (
                                      <Badge key={s} variant="warning" className="text-xs">{s}</Badge>
                                    ))}
                                    {result.skills_match.missing.length === 0 && <span className="text-xs text-green-600">All skills covered!</span>}
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="ai" className="mt-3">
                              <div className="bg-lavender/50 rounded-lg p-3 text-xs text-charcoal leading-relaxed">
                                <div className="flex items-start gap-2">
                                  <Zap className="w-3.5 h-3.5 text-purple shrink-0 mt-0.5" />
                                  <p>{result.ai_explanation}</p>
                                </div>
                                <p className="mt-2 text-muted-foreground italic">
                                  This is an AI-generated insight to inform your decision — not an automatic hiring recommendation.
                                </p>
                              </div>
                            </TabsContent>
                          </Tabs>

                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="outline">View Profile</Button>
                            <Button size="sm" variant="primary">
                              Shortlist <ChevronRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

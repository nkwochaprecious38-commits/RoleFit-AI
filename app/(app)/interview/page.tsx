"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/lib/hooks/use-toast";
import { MessageSquare, Sparkles, Copy, ChevronRight } from "lucide-react";

interface Question {
  category: string;
  question: string;
  rationale: string;
}

export default function InterviewPage() {
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState("mid");
  const { toast } = useToast();

  const generateQuestions = async () => {
    if (!jobTitle.trim()) {
      toast({ title: "Job title required", variant: "destructive" });
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, skills, level }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err: unknown) {
      toast({ title: "Failed to generate", description: "Please try again.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const categoryColors: Record<string, string> = {
    "Technical": "default",
    "Behavioural": "secondary",
    "Situational": "mint",
    "Experience": "navy",
    "Culture": "outline",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-purple" /> RoleFit Interview
        </h1>
        <p className="text-sm text-muted-foreground">AI-generated interview questions and structured evaluation tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Generate Questions</CardTitle>
            <CardDescription>Create role-specific interview questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Job title *</Label>
              <Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Product Manager" />
            </div>
            <div className="space-y-1.5">
              <Label>Key skills/competencies</Label>
              <Input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Leadership, Analytics, SQL" />
            </div>
            <div className="space-y-1.5">
              <Label>Seniority level</Label>
              <div className="flex gap-2">
                {["junior", "mid", "senior", "lead"].map(l => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      level === l
                        ? "bg-purple text-white border-purple"
                        : "bg-white text-charcoal border-border hover:border-purple"
                    }`}
                  >
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-lavender/50 rounded-lg p-3 text-xs text-muted-foreground">
              <p className="font-medium text-navy mb-1">About these questions</p>
              <p>AI-generated questions should be reviewed and adapted by interviewers. Ensure consistency in evaluation across all candidates.</p>
            </div>

            <Button variant="primary" className="w-full" onClick={generateQuestions} loading={generating}>
              <Sparkles className="w-4 h-4 mr-1.5" />
              {generating ? "Generating..." : "Generate Questions"}
            </Button>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="lg:col-span-2 space-y-4">
          {questions.length === 0 && !generating ? (
            <Card>
              <CardContent className="py-16 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-navy mb-2">No questions yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Configure the role details and generate AI-powered interview questions tailored to the specific position.
                </p>
              </CardContent>
            </Card>
          ) : generating ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-5 space-y-2">
                    <div className="h-4 bg-lavender animate-pulse rounded w-24" />
                    <div className="h-5 bg-lavender animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-lavender animate-pulse rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-navy">{questions.length} questions for {jobTitle}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = questions.map((q, i) => `${i + 1}. [${q.category}] ${q.question}\nRationale: ${q.rationale}`).join("\n\n");
                    navigator.clipboard.writeText(text);
                    toast({ title: "Copied to clipboard" });
                  }}
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy All
                </Button>
              </div>
              {questions.map((q, i) => (
                <Card key={i} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="font-heading text-lg font-bold text-muted-foreground/40 leading-none mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={categoryColors[q.category] as "default" | "secondary" | "mint" | "navy" | "outline"} className="text-xs">
                            {q.category}
                          </Badge>
                        </div>
                        <p className="font-medium text-navy mb-2">{q.question}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">What to look for: </span>{q.rationale}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-lavender/30 border-lavender">
                <CardContent className="p-5 text-sm text-muted-foreground">
                  <p className="font-medium text-navy mb-1">Using these questions responsibly</p>
                  <p>These questions are starting points. Adapt them to your specific context, ask all candidates the same core questions for fairness, and use a structured scorecard to record evidence-based evaluations.</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

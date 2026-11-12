"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/lib/hooks/use-toast";
import { TrendingUp, Sparkles, User, Target, BookOpen, ChevronRight, Plus, Star } from "lucide-react";

interface CareerPath {
  currentRole: string;
  targetRole: string;
  timeline: string;
  steps: { title: string; description: string; skills: string[]; duration: string }[];
  skillGaps: string[];
  strengths: string[];
}

const mockPath: CareerPath = {
  currentRole: "Software Engineer",
  targetRole: "Engineering Manager",
  timeline: "18-24 months",
  steps: [
    { title: "Lead a project", description: "Take ownership of a cross-functional project end to end", skills: ["Project Management", "Stakeholder Communication"], duration: "3-6 months" },
    { title: "Mentor junior engineers", description: "Formally mentor 1-2 junior engineers, track progress", skills: ["Coaching", "Technical Leadership"], duration: "6 months" },
    { title: "Drive team initiatives", description: "Propose and lead team-wide process improvements", skills: ["Change Management", "Facilitation"], duration: "3-6 months" },
    { title: "Build hiring skills", description: "Participate in interviews, review resumes, understand hiring criteria", skills: ["Recruiting", "Assessment"], duration: "Ongoing" },
  ],
  skillGaps: ["Budget Management", "Performance Reviews", "Strategic Planning"],
  strengths: ["Technical depth", "Team collaboration", "Problem solving"],
};

export default function GrowthPage() {
  const [generating, setGenerating] = useState(false);
  const [path, setPath] = useState<CareerPath | null>(null);
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");
  const { toast } = useToast();

  const generate = async () => {
    if (!currentRole.trim() || !targetRole.trim()) {
      toast({ title: "Current and target roles required", variant: "destructive" });
      return;
    }
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    setPath({ ...mockPath, currentRole, targetRole });
    setGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple" /> RoleFit Growth
        </h1>
        <p className="text-sm text-muted-foreground">AI-powered career development and succession planning</p>
      </div>

      <Tabs defaultValue="career-paths">
        <TabsList>
          <TabsTrigger value="career-paths">Career Paths</TabsTrigger>
          <TabsTrigger value="succession">Succession Planning</TabsTrigger>
          <TabsTrigger value="skills-matrix">Skills Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="career-paths" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generate Career Path</CardTitle>
                <CardDescription>Map a growth journey from current role to aspiration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Current role *</Label>
                  <Input value={currentRole} onChange={e => setCurrentRole(e.target.value)} placeholder="e.g. Software Engineer" />
                </div>
                <div className="space-y-1.5">
                  <Label>Target role *</Label>
                  <Input value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="e.g. Engineering Manager" />
                </div>
                <div className="space-y-1.5">
                  <Label>Years of experience</Label>
                  <Input value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g. 5 years" />
                </div>
                <Button variant="primary" className="w-full" onClick={generate} loading={generating}>
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  {generating ? "Generating..." : "Generate Path"}
                </Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              {!path ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-navy mb-2">No career path generated</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Enter a current and target role to generate a personalized growth roadmap with actionable steps.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-lavender rounded-lg p-2.5">
                          <User className="w-5 h-5 text-purple" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-navy">{path.currentRole}</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold text-purple">{path.targetRole}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Estimated timeline: {path.timeline}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs font-medium text-navy mb-2 flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-500" /> Current Strengths</p>
                          <div className="flex flex-wrap gap-1.5">
                            {path.strengths.map(s => <Badge key={s} variant="success" className="text-xs">{s}</Badge>)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-navy mb-2 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-magenta" /> Skills to Develop</p>
                          <div className="flex flex-wrap gap-1.5">
                            {path.skillGaps.map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {path.steps.map((step, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center text-sm font-bold shrink-0">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="font-medium text-navy">{step.title}</h4>
                                <Badge variant="secondary" className="text-xs ml-2 shrink-0">{step.duration}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {step.skills.map(s => <Badge key={s} variant="mint" className="text-xs">{s}</Badge>)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="succession" className="mt-6">
          <Card>
            <CardContent className="py-16 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-navy mb-2">Succession Planning</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                Identify high-potential employees and map them to future leadership positions across your organization.
              </p>
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1.5" /> Add Succession Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills-matrix" className="mt-6">
          <Card>
            <CardContent className="py-16 text-center">
              <Target className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-navy mb-2">Skills Matrix</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                Visualize team skills coverage and identify capability gaps across roles and departments.
              </p>
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1.5" /> Build Skills Matrix
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

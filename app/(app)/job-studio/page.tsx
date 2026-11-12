"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/lib/hooks/use-toast";
import { Sparkles, FileText, Copy, Download, Lightbulb } from "lucide-react";

export default function JobStudioPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("full_time");
  const [skills, setSkills] = useState("");
  const [requirements, setRequirements] = useState("");
  const [existingJD, setExistingJD] = useState("");
  const [mode, setMode] = useState<"generate" | "improve">("generate");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (mode === "generate" && !title.trim()) {
      toast({ title: "Job title required", variant: "destructive" });
      return;
    }
    if (mode === "improve" && !existingJD.trim()) {
      toast({ title: "Paste an existing job description", variant: "destructive" });
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/ai/job-studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, title, department, location, type, skills, requirements, existingJD }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await response.json();
      setGenerated(data.content);
    } catch (err: unknown) {
      toast({ title: "Generation failed", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
          <FileText className="w-6 h-6 text-purple" /> RoleFit Job Studio
        </h1>
        <p className="text-sm text-muted-foreground">AI-powered job description creation and optimization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Configure</CardTitle>
            <CardDescription>Describe what you&apos;re looking for and AI will craft or improve your job description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={mode} onValueChange={v => setMode(v as "generate" | "improve")}>
              <TabsList>
                <TabsTrigger value="generate">Generate New</TabsTrigger>
                <TabsTrigger value="improve">Improve Existing</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <Label>Job title *</Label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Product Manager" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Department</Label>
                    <Input value={department} onChange={e => setDepartment(e.target.value)} placeholder="e.g. Product" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location</Label>
                    <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Remote" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Employment type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full-time</SelectItem>
                      <SelectItem value="part_time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Key skills and technologies</Label>
                  <Input value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, TypeScript, Agile, B2B SaaS" />
                </div>
                <div className="space-y-1.5">
                  <Label>Key requirements / context</Label>
                  <Textarea value={requirements} onChange={e => setRequirements(e.target.value)} rows={3} placeholder="5+ years product experience, B2B SaaS background preferred..." />
                </div>
              </TabsContent>

              <TabsContent value="improve" className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <Label>Paste your existing job description</Label>
                  <Textarea value={existingJD} onChange={e => setExistingJD(e.target.value)} rows={10} placeholder="Paste the job description you want to improve..." />
                </div>
                <div className="bg-lavender/50 rounded-lg p-3 text-xs">
                  <p className="font-medium text-navy mb-1 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" /> What AI will do</p>
                  <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
                    <li>Improve clarity and structure</li>
                    <li>Identify potentially exclusionary language</li>
                    <li>Enhance skill and requirement coverage</li>
                    <li>Optimize for candidate attraction</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <Button variant="primary" className="w-full" onClick={handleGenerate} loading={generating}>
              <Sparkles className="w-4 h-4 mr-1.5" />
              {generating ? "Generating..." : mode === "generate" ? "Generate Job Description" : "Improve Job Description"}
            </Button>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Generated Description</CardTitle>
                <CardDescription>Review and edit before saving or posting</CardDescription>
              </div>
              {generated && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generating ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 bg-lavender animate-pulse rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                ))}
              </div>
            ) : generated ? (
              <Textarea
                value={generated}
                onChange={e => setGenerated(e.target.value)}
                rows={20}
                className="text-sm font-mono resize-none"
              />
            ) : (
              <div className="py-16 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Configure your job details and click Generate to create an AI-optimized job description.
                </p>
              </div>
            )}

            {generated && (
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">Save as Draft</Button>
                <Button variant="primary" className="flex-1">Post Job</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

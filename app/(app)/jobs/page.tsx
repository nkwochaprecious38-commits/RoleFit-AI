"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/lib/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { Plus, Search, Briefcase, MapPin, Clock, Users, X } from "lucide-react";

const jobSchema = z.object({
  title: z.string().min(2, "Job title required"),
  department: z.string().optional(),
  location: z.string().optional(),
  employment_type: z.enum(["full_time", "part_time", "contract", "freelance", "internship"]),
  description: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  required_skills: z.string().optional(),
  salary_min: z.coerce.number().optional(),
  salary_max: z.coerce.number().optional(),
  status: z.enum(["draft", "active", "paused", "closed"]),
});

type JobForm = z.infer<typeof jobSchema>;

interface Job {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string;
  status: string;
  required_skills: string[];
  created_at: string;
  _count?: { applications: number };
}

const statusColors: Record<string, string> = {
  active: "success",
  draft: "secondary",
  paused: "warning",
  closed: "outline",
};

const employmentLabels: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);
  const { toast } = useToast();
  const supabase = createClient();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: { status: "active", employment_type: "full_time" },
  });

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

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("organization_id", membership.organization_id)
        .order("created_at", { ascending: false });

      if (!error) setJobs(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filtered = jobs.filter(j =>
    `${j.title} ${j.department || ""} ${j.location || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  const onSubmit = async (data: JobForm) => {
    if (!orgId) return;
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: newJob, error } = await supabase
      .from("jobs")
      .insert({
        organization_id: orgId,
        title: data.title,
        department: data.department || null,
        location: data.location || null,
        employment_type: data.employment_type,
        description: data.description || null,
        responsibilities: data.responsibilities || null,
        requirements: data.requirements || null,
        required_skills: data.required_skills ? data.required_skills.split(",").map(s => s.trim()).filter(Boolean) : [],
        salary_min: data.salary_min || null,
        salary_max: data.salary_max || null,
        status: data.status,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setJobs(prev => [newJob, ...prev]);
      setShowAddDialog(false);
      reset();
      toast({ title: "Job posted", description: `"${data.title}" has been created.` });
    }
    setSaving(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Jobs</h1>
          <p className="text-sm text-muted-foreground">Manage job vacancies and descriptions</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-1" /> Post Job
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="flex gap-3 text-sm text-muted-foreground">
        <span>{filtered.length} jobs</span>
        {search && <button onClick={() => setSearch("")} className="flex items-center gap-1 text-purple hover:underline"><X className="w-3.5 h-3.5" /> Clear</button>}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-navy mb-2">No jobs yet</h3>
            <p className="text-sm text-muted-foreground mb-6">Create your first job vacancy to start matching candidates.</p>
            <Button variant="primary" onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-1" /> Post First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(job => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-navy">{job.title}</h3>
                      <Badge variant={statusColors[job.status] as "success" | "secondary" | "warning" | "outline"} className="shrink-0">
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {job.department && <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>}
                      {job.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>}
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{employmentLabels[job.employment_type] || job.employment_type}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />0 applicants</span>
                    </div>
                    {job.required_skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {job.required_skills.slice(0, 5).map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                        {job.required_skills.length > 5 && <Badge variant="outline" className="text-xs">+{job.required_skills.length - 5}</Badge>}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">{formatDate(job.created_at)}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="primary">View</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Job Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Job title *</Label>
              <Input {...register("title")} error={errors.title?.message} placeholder="e.g. Senior Software Engineer" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Department</Label>
                <Input {...register("department")} placeholder="e.g. Engineering" />
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input {...register("location")} placeholder="e.g. London, Remote" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Employment type</Label>
                <Controller
                  name="employment_type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time">Full-time</SelectItem>
                        <SelectItem value="part_time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Required skills (comma-separated)</Label>
              <Input {...register("required_skills")} placeholder="React, TypeScript, AWS" />
            </div>
            <div className="space-y-1.5">
              <Label>Job description</Label>
              <Textarea {...register("description")} rows={3} placeholder="Overview of the role..." />
            </div>
            <div className="space-y-1.5">
              <Label>Responsibilities</Label>
              <Textarea {...register("responsibilities")} rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Requirements</Label>
              <Textarea {...register("requirements")} rows={3} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setShowAddDialog(false); reset(); }}>Cancel</Button>
              <Button type="submit" variant="primary" loading={saving}>Post Job</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

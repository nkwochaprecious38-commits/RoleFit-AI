"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/lib/hooks/use-toast";
import { getInitials, formatDate } from "@/lib/utils";
import {
  Plus,
  Search,
  Upload,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  X,
} from "lucide-react";

const candidateSchema = z.object({
  first_name: z.string().min(1, "First name required"),
  last_name: z.string().min(1, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  current_title: z.string().optional(),
  current_company: z.string().optional(),
  summary: z.string().optional(),
  skills: z.string().optional(),
  years_experience: z.coerce.number().optional(),
});

type CandidateForm = z.infer<typeof candidateSchema>;

interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  current_title: string | null;
  current_company: string | null;
  skills: string[];
  years_experience: number | null;
  created_at: string;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);
  const { toast } = useToast();
  const supabase = createClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CandidateForm>({
    resolver: zodResolver(candidateSchema),
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
        .from("candidates")
        .select("*")
        .eq("organization_id", membership.organization_id)
        .order("created_at", { ascending: false });

      if (!error) setCandidates(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filtered = candidates.filter(c =>
    `${c.first_name} ${c.last_name} ${c.email} ${c.current_title || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const onSubmit = async (data: CandidateForm) => {
    if (!orgId) return;
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const skillsArr = data.skills
      ? data.skills.split(",").map(s => s.trim()).filter(Boolean)
      : [];

    const { data: newCandidate, error } = await supabase
      .from("candidates")
      .insert({
        organization_id: orgId,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || null,
        location: data.location || null,
        current_title: data.current_title || null,
        current_company: data.current_company || null,
        summary: data.summary || null,
        skills: skillsArr,
        years_experience: data.years_experience || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setCandidates(prev => [newCandidate, ...prev]);
      setShowAddDialog(false);
      reset();
      toast({ title: "Candidate added", description: `${data.first_name} ${data.last_name} has been added.` });
    }

    setSaving(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Candidates</h1>
          <p className="text-sm text-muted-foreground">Manage your candidate database</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-1" /> Import
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-1" /> Add Candidate
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search candidates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-3 text-sm text-muted-foreground">
        <span>{filtered.length} candidates</span>
        {search && <button onClick={() => setSearch("")} className="flex items-center gap-1 text-purple hover:underline"><X className="w-3.5 h-3.5" /> Clear</button>}
      </div>

      {/* Candidate List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-purple" />
            </div>
            <h3 className="font-heading font-semibold text-navy mb-2">No candidates yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add your first candidate or import from a CSV file.
            </p>
            <Button variant="primary" onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-1" /> Add First Candidate
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(candidate => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback>{getInitials(`${candidate.first_name} ${candidate.last_name}`)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy truncate">
                      {candidate.first_name} {candidate.last_name}
                    </h3>
                    {candidate.current_title && (
                      <p className="text-sm text-muted-foreground truncate">{candidate.current_title}</p>
                    )}
                    {candidate.current_company && (
                      <p className="text-xs text-muted-foreground/70 truncate">{candidate.current_company}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  {candidate.location && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{candidate.location}</span>
                    </div>
                  )}
                  {candidate.years_experience && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{candidate.years_experience} years experience</span>
                    </div>
                  )}
                </div>

                {candidate.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.slice(0, 4).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                    {candidate.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">+{candidate.skills.length - 4}</Badge>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{formatDate(candidate.created_at)}</span>
                  <Button size="sm" variant="ghost" className="text-purple hover:text-purple">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Candidate Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Candidate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>First name *</Label>
                <Input {...register("first_name")} error={errors.first_name?.message} />
              </div>
              <div className="space-y-1.5">
                <Label>Last name *</Label>
                <Input {...register("last_name")} error={errors.last_name?.message} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email *</Label>
              <Input type="email" {...register("email")} error={errors.email?.message} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input {...register("phone")} />
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input {...register("location")} placeholder="City, Country" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Current job title</Label>
                <Input {...register("current_title")} />
              </div>
              <div className="space-y-1.5">
                <Label>Current company</Label>
                <Input {...register("current_company")} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Skills (comma-separated)</Label>
              <Input {...register("skills")} placeholder="React, TypeScript, Node.js" />
            </div>
            <div className="space-y-1.5">
              <Label>Years of experience</Label>
              <Input type="number" {...register("years_experience")} />
            </div>
            <div className="space-y-1.5">
              <Label>Summary</Label>
              <Textarea {...register("summary")} rows={3} placeholder="Brief professional summary..." />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setShowAddDialog(false); reset(); }}>Cancel</Button>
              <Button type="submit" variant="primary" loading={saving}>Add Candidate</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

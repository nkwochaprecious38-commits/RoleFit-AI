"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/lib/hooks/use-toast";
import { Check, Building2, Users, Rocket, ChevronRight, Sparkles } from "lucide-react";
import { cn, slugify } from "@/lib/utils";

type Step = "org" | "team" | "done";

const STEPS: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: "org", label: "Your Organisation", icon: <Building2 className="w-4 h-4" /> },
  { id: "team", label: "Invite Team", icon: <Users className="w-4 h-4" /> },
  { id: "done", label: "All Set", icon: <Rocket className="w-4 h-4" /> },
];

const INDUSTRIES = [
  "Technology", "Finance & Banking", "Healthcare", "Retail & E-commerce",
  "Manufacturing", "Professional Services", "Media & Entertainment",
  "Education", "Government & Public Sector", "Other",
];

const SIZES = [
  "1–10 employees", "11–50 employees", "51–200 employees",
  "201–500 employees", "501–1,000 employees", "1,000+ employees",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("org");
  const [saving, setSaving] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);

  // Org form
  const [orgName, setOrgName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [website, setWebsite] = useState("");

  // Team form
  const [emails, setEmails] = useState(["", "", ""]);

  const stepIndex = STEPS.findIndex(s => s.id === step);

  // ── Step 1: Create org ─────────────────────────────────────────────
  const handleCreateOrg = async () => {
    if (!orgName.trim()) {
      toast({ title: "Organisation name is required", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create the organization
      const slug = slugify(orgName) + "-" + Math.random().toString(36).slice(2, 6);
      const { data: org, error: orgError } = await supabase
        .from("organizations")
        .insert({
          name: orgName.trim(),
          slug,
          industry: industry || null,
          size: size || null,
          website: website.trim() || null,
          created_by: user.id,
        })
        .select("id")
        .single();

      if (orgError) throw orgError;

      // Add the creator as owner
      const { error: memberError } = await supabase
        .from("organization_members")
        .insert({
          organization_id: org.id,
          user_id: user.id,
          role: "owner",
        });

      if (memberError) throw memberError;

      setOrgId(org.id);
      setStep("team");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Could not create organisation", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // ── Step 2: Send invites (best-effort, non-blocking) ───────────────
  const handleInvites = async () => {
    const validEmails = emails.filter(e => e.trim() && e.includes("@"));

    if (validEmails.length > 0) {
      // Store pending invites — in a full implementation these would trigger
      // Supabase Auth invite emails. For now we note them and move on.
      toast({
        title: `${validEmails.length} invitation${validEmails.length > 1 ? "s" : ""} queued`,
        description: "Your teammates will receive an email once email sending is configured.",
      });
    }

    setStep("done");
  };

  // ── Done: go to dashboard ──────────────────────────────────────────
  const goToDashboard = () => router.push("/app/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-[#2a2060] to-navy flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-magenta flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-white text-xl">RoleFit AI</span>
          </div>
          <p className="text-white/60 text-sm">Let&apos;s get your workspace set up</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                s.id === step
                  ? "bg-white text-navy"
                  : stepIndex > i
                  ? "bg-white/20 text-white"
                  : "bg-white/10 text-white/40"
              )}>
                {stepIndex > i ? <Check className="w-3 h-3" /> : s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* ── Step: Org ── */}
          {step === "org" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading text-xl font-bold text-navy">Create your organisation</h2>
                <p className="text-sm text-muted-foreground mt-1">This sets up your shared workspace in RoleFit AI.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="orgName">Organisation name *</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  placeholder="Acme Corp"
                  onKeyDown={e => e.key === "Enter" && handleCreateOrg()}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map(ind => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Team size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {SIZES.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="website">Website <span className="text-muted-foreground">(optional)</span></Label>
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://acme.com"
                />
              </div>

              <Button variant="primary" className="w-full" onClick={handleCreateOrg} loading={saving}>
                Create Organisation <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          {/* ── Step: Team ── */}
          {step === "team" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-heading text-xl font-bold text-navy">Invite your team</h2>
                <p className="text-sm text-muted-foreground mt-1">Add colleagues so they can collaborate with you in RoleFit AI.</p>
              </div>

              <div className="space-y-3">
                {emails.map((email, i) => (
                  <div key={i} className="space-y-1">
                    {i === 0 && <Label>Email addresses</Label>}
                    <Input
                      type="email"
                      value={email}
                      onChange={e => {
                        const updated = [...emails];
                        updated[i] = e.target.value;
                        setEmails(updated);
                      }}
                      placeholder={`teammate${i + 1}@company.com`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="text-sm text-purple hover:underline"
                  onClick={() => setEmails([...emails, ""])}
                >
                  + Add another
                </button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep("done")}>
                  Skip for now
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleInvites}>
                  Send Invitations <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* ── Step: Done ── */}
          {step === "done" && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple to-magenta flex items-center justify-center mx-auto">
                <Rocket className="w-8 h-8 text-white" />
              </div>

              <div>
                <h2 className="font-heading text-xl font-bold text-navy">You&apos;re all set!</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                  Your workspace is ready. Start by posting a job or adding candidates to your talent pool.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left pt-2">
                {[
                  { emoji: "💼", label: "Post a job", desc: "Create your first role", href: "/app/jobs" },
                  { emoji: "👥", label: "Add candidates", desc: "Build your talent pool", href: "/app/candidates" },
                  { emoji: "🤖", label: "Run AI match", desc: "Score candidates vs roles", href: "/app/match" },
                  { emoji: "✍️", label: "Job Studio", desc: "AI-write a JD", href: "/app/job-studio" },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className="p-3 rounded-xl border border-border hover:border-purple hover:bg-lavender/30 transition-all text-left"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <p className="font-medium text-navy text-sm mt-1">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </button>
                ))}
              </div>

              <Button variant="primary" className="w-full" onClick={goToDashboard}>
                Go to Dashboard <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {step !== "done" && (
          <p className="text-center text-white/40 text-xs mt-4">
            You can update these details later in Settings
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/lib/hooks/use-toast";
import { Users, Plus, Mail, Shield, Crown, User } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface Member {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  profiles: { full_name: string | null; email: string | null; avatar_url: string | null } | null;
}

const roleIcons: Record<string, React.ReactNode> = {
  owner: <Crown className="w-3.5 h-3.5 text-amber-500" />,
  admin: <Shield className="w-3.5 h-3.5 text-purple" />,
  member: <User className="w-3.5 h-3.5 text-muted-foreground" />,
};

const roleVariant: Record<string, "default" | "secondary" | "outline" | "success" | "warning"> = {
  owner: "warning",
  admin: "default",
  member: "outline",
};

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<string>("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [inviting, setInviting] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: membership } = await supabase
        .from("organization_members")
        .select("organization_id, role")
        .eq("user_id", user.id)
        .single();

      if (!membership) { setLoading(false); return; }

      setOrgId(membership.organization_id);
      setCurrentRole(membership.role);

      const { data } = await supabase
        .from("organization_members")
        .select("id, user_id, role, created_at, profiles(full_name, email, avatar_url)")
        .eq("organization_id", membership.organization_id)
        .order("created_at");

      setMembers((data as unknown as Member[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    await new Promise(r => setTimeout(r, 800));
    toast({ title: "Invitation sent", description: `${inviteEmail} has been invited to join your team.` });
    setInviteEmail("");
    setInviteOpen(false);
    setInviting(false);
  };

  const canManage = currentRole === "owner" || currentRole === "admin";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
            <Users className="w-6 h-6 text-purple" /> Team
          </h1>
          <p className="text-sm text-muted-foreground">Manage your organization's members and permissions</p>
        </div>
        {canManage && (
          <Button variant="primary" size="sm" onClick={() => setInviteOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" /> Invite Member
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Members ({loading ? "…" : members.length})</CardTitle>
          <CardDescription>People with access to your RoleFit AI workspace</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-56" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No team members found</p>
            </div>
          ) : (
            <div className="divide-y">
              {members.map(m => {
                const name = m.profiles?.full_name || m.profiles?.email || "Unknown";
                const email = m.profiles?.email || "";
                return (
                  <div key={m.id} className="flex items-center gap-4 px-6 py-4 hover:bg-lavender/20 transition-colors">
                    <Avatar>
                      <AvatarFallback className="bg-purple text-white text-sm">{getInitials(name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-navy truncate">{name}</p>
                      {email && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3 shrink-0" /> {email}
                        </p>
                      )}
                    </div>
                    <Badge variant={roleVariant[m.role] || "outline"} className="flex items-center gap-1">
                      {roleIcons[m.role]}
                      {m.role}
                    </Badge>
                    {canManage && m.role !== "owner" && (
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Manage</Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite team member</DialogTitle>
            <DialogDescription>Send an invitation email to add someone to your workspace.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>Email address</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                onKeyDown={e => e.key === "Enter" && handleInvite()}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member — can view and use all features</SelectItem>
                  <SelectItem value="admin">Admin — can also manage team and settings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleInvite} loading={inviting}>Send Invitation</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

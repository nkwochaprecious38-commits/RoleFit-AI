"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/lib/hooks/use-toast";
import { Settings, Building2, User, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ full_name: "", email: "" });
  const [org, setOrg] = useState({ name: "", website: "", industry: "" });
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, memberRes] = await Promise.all([
        supabase.from("profiles").select("full_name, email").eq("id", user.id).single(),
        supabase.from("organization_members").select("organization_id").eq("user_id", user.id).single(),
      ]);

      if (profileRes.data) {
        setProfile({ full_name: profileRes.data.full_name || "", email: profileRes.data.email || user.email || "" });
      }

      if (memberRes.data?.organization_id) {
        const { data: orgData } = await supabase
          .from("organizations")
          .select("name, website, industry")
          .eq("id", memberRes.data.organization_id)
          .single();
        if (orgData) {
          setOrg({ name: orgData.name || "", website: orgData.website || "", industry: orgData.industry || "" });
        }
      }

      setLoading(false);
    };
    load();
  }, []);

  const saveProfile = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from("profiles").update({ full_name: profile.full_name }).eq("id", user.id);
      if (error) {
        toast({ title: "Save failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Profile saved" });
      }
    }
    setSaving(false);
  };

  const saveOrg = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: membership } = await supabase.from("organization_members").select("organization_id").eq("user_id", user.id).single();
      if (membership?.organization_id) {
        const { error } = await supabase
          .from("organizations")
          .update({ name: org.name, website: org.website, industry: org.industry })
          .eq("id", membership.organization_id);
        if (error) {
          toast({ title: "Save failed", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Organization settings saved" });
        }
      }
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground">Manage your profile and organization preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile"><User className="w-3.5 h-3.5 mr-1.5" /> Profile</TabsTrigger>
          <TabsTrigger value="organization"><Building2 className="w-3.5 h-3.5 mr-1.5" /> Organization</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-3.5 h-3.5 mr-1.5" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Lock className="w-3.5 h-3.5 mr-1.5" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your name and personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label>Full name</Label>
                    <Input value={profile.full_name} onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))} placeholder="Your full name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email address</Label>
                    <Input value={profile.email} disabled className="bg-muted/50 cursor-not-allowed" />
                    <p className="text-xs text-muted-foreground">Email cannot be changed here. Contact support if needed.</p>
                  </div>
                  <Separator />
                  <Button variant="primary" onClick={saveProfile} loading={saving}>Save Profile</Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Manage your organization's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label>Organization name</Label>
                    <Input value={org.name} onChange={e => setOrg(o => ({ ...o, name: e.target.value }))} placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Website</Label>
                    <Input value={org.website} onChange={e => setOrg(o => ({ ...o, website: e.target.value }))} placeholder="https://acme.com" type="url" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Industry</Label>
                    <Input value={org.industry} onChange={e => setOrg(o => ({ ...o, industry: e.target.value }))} placeholder="Technology, Finance, Healthcare..." />
                  </div>
                  <Separator />
                  <Button variant="primary" onClick={saveOrg} loading={saving}>Save Organization</Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-navy mb-2">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">Notification settings coming soon. You&apos;ll be able to control email and in-app alerts for pipeline changes, matches, and team activity.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h4 className="font-medium text-navy mb-1 text-sm">Change Password</h4>
                <p className="text-sm text-muted-foreground mb-3">We&apos;ll send a password reset link to your email address.</p>
                <Button
                  variant="outline"
                  onClick={async () => {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user?.email) {
                      await supabase.auth.resetPasswordForEmail(user.email, { redirectTo: `${window.location.origin}/reset-password` });
                      toast({ title: "Password reset email sent", description: "Check your inbox." });
                    }
                  }}
                >
                  Send Reset Link
                </Button>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-navy mb-1 text-sm">Active Sessions</h4>
                <p className="text-sm text-muted-foreground mb-3">Sign out of all other sessions and devices.</p>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={async () => {
                    await supabase.auth.signOut({ scope: "others" });
                    toast({ title: "Signed out of other sessions" });
                  }}
                >
                  Sign Out Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

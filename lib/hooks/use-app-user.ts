"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface AppUser {
  id: string;
  email?: string;
  full_name?: string;
}

export function useAppUser() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", authUser.id)
          .single();

        setUser({
          id: authUser.id,
          email: authUser.email,
          full_name: profile?.full_name || authUser.user_metadata?.full_name,
        });
      }
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/public";
import AdminShell from "./AdminShell";

/**
 * Client-side gate for the admin panel. The site is statically exported, so the
 * session check happens in the browser. Data writes are protected by Supabase
 * row-level security, not by this page.
 */
export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      router.replace("/Components_Login");
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/Components_Login");
      } else {
        setEmail(data.user.email ?? "");
      }
    });
  }, [router]);

  if (email === null) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-24 text-sm text-slate-500">
        Checking session…
      </main>
    );
  }

  return <AdminShell email={email} />;
}

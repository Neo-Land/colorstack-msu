"use server";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function signIn(_prevState: { error: string } | null, formData: FormData)
{
  if (!isSupabaseConfigured()) {
    return {
      error:
        "The admin panel is not configured yet. Add Supabase credentials to .env.local (see README).",
    };
  }

  // Get email and password
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Server-side allowlist check, only the one permitted email can proceed
  if (email !== process.env.ALLOWED_EMAIL) {
    return { error: "Unauthorized: this email is not permitted to sign in." };
  }

  // Create a Supabase client that can read and write cookies
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Return a generic message
    return { error: "Invalid credentials. Please try again." };
  }
  // Session cookie is now set send the user to the protected admin area
  redirect("/components_Admin");
}

import { createClient } from "@supabase/supabase-js";

/**
 * True when Supabase credentials are present. The public site renders fully
 * from built-in fallback content when they are missing, so a fresh clone works
 * with zero configuration. The admin panel requires them.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Anonymous, cookie-free client for reading public content at build time.
 * Safe for static export: it never touches request headers, so pages stay static.
 * Returns null when Supabase is not configured.
 */
export function createPublicClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

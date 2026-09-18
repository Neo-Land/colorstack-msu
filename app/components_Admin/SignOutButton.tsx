"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// Small Client Component just for the sign-out action.
// Kept separate so the parent AdminPage can stay a Server Component.
export default function SignOutButton() {
  const router = useRouter();
  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Send the user back to login after signing out
    router.push("/Components_Login");
  }
  return (
    <button
      onClick={handleSignOut}
      className="bg-white/10 border border-white/15 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/20 transition-colors"
    >
      Sign Out
    </button>
  );
}

"use server";

import { createClient } from "@/lib/supabase/server";

export async function insertHeroPhoto(img_path: string, sort_order: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("hero_photos").insert({
    img_path,
    sort_order,
    height: 320,
    url: "https://www.colorstack.org/",
  });
  if (error) return { error: error.message };
  return { error: null };
}

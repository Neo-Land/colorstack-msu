import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import OpportunityTabs, { type OpportunityCard } from "./OpportunityTabs";
import { fallbackOpportunities } from "./fallbackOpportunities";
import { siteConfig } from "../seo";

export const metadata: Metadata = {
  title: "Hackathons, Programs, Fellowships, and Internships",
  description:
    "Hackathons near Montclair, fellowships, internships, and early-career programs curated for Black and Latinx computing students at Montclair State University.",
  alternates: {
    canonical: "/Components_Fellowships",
  },
  openGraph: {
    title: `Hackathons and Career Opportunities | ${siteConfig.name}`,
    description:
      "Curated hackathons, internships, and fellowships for Montclair State computing students.",
    url: "/Components_Fellowships",
    images: [
      {
        url: "/tiles/community.svg",
        width: 1400,
        height: 900,
        alt: "ColorStack at Montclair State",
      },
    ],
  },
};

export default async function OpportunitiesPage() {
  const supabase = createPublicClient();
  let cards: OpportunityCard[] = fallbackOpportunities;

  if (supabase) {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to load opportunities:", error.message);
    }
    if (data && data.length > 0) cards = data as OpportunityCard[];
  }

  return (
    <main className="min-h-screen w-full bg-[#f7f8fb] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Opportunities
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600">
            Hackathons within driving distance of Montclair, national programs built for Black and
            Latinx technologists, and research happening inside the MSU School of Computing.
          </p>
        </div>

        <OpportunityTabs opportunities={cards} />
      </div>
    </main>
  );
}

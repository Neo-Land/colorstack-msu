import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { externalLinks, siteConfig } from "../seo";

export const metadata: Metadata = {
  title: "Events and Resources",
  description:
    "Starter resources for ColorStack at Montclair State: the national membership application, the chapter proposal, the draft constitution, and MSU registration links.",
  alternates: {
    canonical: "/Components_Resources",
  },
  openGraph: {
    title: `Events and Resources | ${siteConfig.name}`,
    description:
      "Membership application, proposal, draft constitution, and MSU registration links for the proposed ColorStack chapter.",
    url: "/Components_Resources",
    images: [
      {
        url: "/tiles/resource-apply.svg",
        width: 1200,
        height: 630,
        alt: "ColorStack at Montclair State resources",
      },
    ],
  },
};

interface ResourceCard {
  id: string;
  sort_order: number;
  title: string;
  event: string;
  description: string;
  date: string;
  image: string;
  slides_url: string;
  is_active: boolean;
}

const fallbackResourceCards: ResourceCard[] = [
  {
    id: "national-membership",
    sort_order: 1,
    title: "Apply for ColorStack National Membership",
    event: "For students",
    description:
      "Membership is free and does not require a campus chapter. It unlocks the national Slack, career fairs, the resume book, mock interviews, and scholarships.",
    date: "Rolling",
    image: "/tiles/resource-apply.svg",
    slides_url: externalLinks.colorstackApply,
    is_active: true,
  },
  {
    id: "chapter-proposal",
    sort_order: 2,
    title: "Chapter Proposal for MSU Administrators",
    event: "For administrators",
    description:
      "Why Montclair State needs a ColorStack chapter, what ColorStack provides, what we are asking of the University, and a semester-by-semester roadmap.",
    date: "Updated Sept 2026",
    image: "/tiles/resource-proposal.svg",
    slides_url: `${siteConfig.url}/proposal`,
    is_active: true,
  },
  {
    id: "draft-constitution",
    sort_order: 3,
    title: "Draft Chapter Constitution",
    event: "For SGA review",
    description:
      "A complete draft constitution ready for the Engage registration form, covering purpose, membership, officers, elections, finances, and amendments.",
    date: "Draft v1",
    image: "/tiles/resource-constitution.svg",
    slides_url: `${siteConfig.url}/constitution`,
    is_active: true,
  },
  {
    id: "engage-register",
    sort_order: 4,
    title: "Register the Organization on Engage",
    event: "MSU SGA",
    description:
      "New Registered Student Organizations apply through Engage, then SGA and the Office of Student Engagement review the submission.",
    date: "Any semester",
    image: "/tiles/resource-engage.svg",
    slides_url: externalLinks.msuEngageRegister,
    is_active: true,
  },
  {
    id: "colorstack-wiki",
    sort_order: 5,
    title: "ColorStack Family Wiki",
    event: "Chapter playbook",
    description:
      "The official ColorStack knowledge base, including how chapters work and the interest form to start one.",
    date: "colorstack.org",
    image: "/tiles/resource-wiki.svg",
    slides_url: externalLinks.colorstackChapters,
    is_active: true,
  },
];

function safeHref(url: string) {
  return /^(https?:\/\/|\/)/.test(url) ? url : "#";
}

export default async function ResourcesPage() {
  const supabase = createPublicClient();
  let resourceCards: ResourceCard[] = fallbackResourceCards;

  if (supabase) {
    const { data: cards, error } = await supabase
      .from("resources")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (!error && cards && cards.length > 0) resourceCards = cards;
  }

  return (
    <main className="min-h-screen w-full bg-[#f7f8fb] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Events &amp; Resources
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600">
            Everything you need to join ColorStack today and help charter the Montclair State
            chapter. Workshop slides and event recaps will land here once the chapter is running.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceCards.map((card) => (
            <a
              key={card.id}
              href={safeHref(card.slides_url)}
              target={card.slides_url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative isolate flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_22px_55px_-40px_rgba(15,23,42,0.45)] ring-1 ring-slate-100 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-slate-200 before:to-transparent hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_28px_70px_-44px_rgba(15,23,42,0.5)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <Image
                  src={card.image}
                  alt={`${card.title} resource`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/62 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-md border border-white/20 bg-[#111827]/85 px-3 py-1 text-xs font-semibold text-slate-100 shadow-lg shadow-black/25 backdrop-blur-md">
                  Resource
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D1190D]">
                  {card.event}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug text-slate-950">
                  {card.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                  <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-500">
                    <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{card.date}</span>
                  </div>
                  <div className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors duration-200 group-hover:border-[#D1190D]/40 group-hover:text-[#D1190D]">
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpenText, CalendarDays, FlaskConical, GraduationCap, History, MapPin } from "lucide-react";
import { useState } from "react";
import { externalLinks } from "../seo";

export interface OpportunityCard {
  id: string;
  image: string;
  college_image: string | null;
  host_name: string | null;
  location: string | null;
  title: string;
  description: string;
  deadline: string;
  tag: string;
  eligibility: string;
  link: string;
  timeline_status: "Open now" | "Opens soon" | "Expected" | "Watch";
  timeline: string;
  previous_timeline: string | null;
  sort_order: number;
  opportunity_type: "program" | "hackathon";
  proximity_rank: number;
  source_checked_on: string;
}

type OpportunityType = "hackathons" | "programs" | "research" | "learning";

type ResearchCard = {
  name: string;
  title: string;
  school: string;
  research: string;
  topics: string[];
  link: string;
  image: string | null;
  accent: string;
};

type LearningResource = {
  title: string;
  creator: string;
  format: "Build guide" | "Video course";
  description: string;
  topics: string[];
  link: string;
  image: string;
};

const learningResources: LearningResource[] = [
  {
    title: "Build Your Own X",
    creator: "codecrafters-io",
    format: "Build guide",
    description: "A curated collection of step-by-step guides for recreating technologies from scratch, from databases and browsers to AI models and operating systems.",
    topics: ["Systems", "AI", "Open Source"],
    link: "https://github.com/codecrafters-io/build-your-own-x",
    image: "https://opengraph.githubassets.com/1/codecrafters-io/build-your-own-x",
  },
  {
    title: "Build & Deploy a Patient Management System",
    creator: "Chris Blakely · YouTube",
    format: "Video course",
    description: "Build a production-ready patient management system with Java, Spring Boot, microservices, and AWS.",
    topics: ["Java", "Spring Boot", "AWS"],
    link: "https://www.youtube.com/watch?v=tseqdcFfTUY",
    image: "https://i.ytimg.com/vi/tseqdcFfTUY/hqdefault.jpg",
  },
  {
    title: "Spring Boot, React.js & AWS S3",
    creator: "Amigoscode · YouTube",
    format: "Video course",
    description: "Build a full-stack application with Spring Boot, React.js, and AWS S3 storage, with the linked video starting at the selected lesson.",
    topics: ["React", "Spring Boot", "AWS S3"],
    link: "https://www.youtube.com/watch?v=9i1gQ7w2V24&t=2068s",
    image: "https://i.ytimg.com/vi/9i1gQ7w2V24/hqdefault.jpg",
  },
];

/**
 * Research clusters and leadership listed on the MSU School of Computing site.
 * Individual faculty research interests are not published on the directory
 * page, so cards link to the School rather than describing people.
 */
const researchCards: ResearchCard[] = [
  {
    name: "Xiaojun Qi",
    title: "Director, School of Computing",
    school: "College of Science and Mathematics",
    research: "Leads the School of Computing. A natural first conversation for a prospective faculty advisor or for space in the Center for Computing and Information Science.",
    topics: ["Leadership", "Advisor outreach"],
    link: "https://inside.montclair.edu/directory/xiaojun-qi",
    image: null,
    accent: "from-[#D1190D] via-[#8f1109] to-[#1a1a1a]",
  },
  {
    name: "Anna Feldman",
    title: "Chairperson, School of Computing",
    school: "College of Science and Mathematics",
    research: "Chairs the School of Computing. Research within the School includes a Natural Language Processing cluster.",
    topics: ["Leadership", "NLP"],
    link: "https://inside.montclair.edu/directory/anna-feldman",
    image: null,
    accent: "from-slate-800 via-slate-700 to-[#D1190D]",
  },
  {
    name: "Vaibhav Anu",
    title: "Associate Director, School of Computing",
    school: "College of Science and Mathematics",
    research: "Associate Professor and Associate Director of the School of Computing.",
    topics: ["Leadership", "Software Engineering"],
    link: "https://inside.montclair.edu/directory/vaibhav-anu",
    image: null,
    accent: "from-[#1a1a1a] via-[#3a3a3a] to-[#D1190D]",
  },
  {
    name: "AI Engineered Systems",
    title: "Research cluster (AIES)",
    school: "MSU School of Computing",
    research: "One of the School of Computing research clusters. Ask cluster faculty about undergraduate research assistant openings.",
    topics: ["AI", "Systems"],
    link: externalLinks.msuSchoolOfComputing,
    image: null,
    accent: "from-violet-800 via-indigo-700 to-sky-500",
  },
  {
    name: "Algorithms, Networks, and Complex Systems",
    title: "Research cluster (ANCS)",
    school: "MSU School of Computing",
    research: "Algorithms, networking, and complex-systems research inside the School of Computing.",
    topics: ["Algorithms", "Networks"],
    link: externalLinks.msuSchoolOfComputing,
    image: null,
    accent: "from-cyan-800 via-teal-700 to-emerald-400",
  },
  {
    name: "Cyber-physical Resilient Systems",
    title: "Research cluster (CPRS)",
    school: "MSU School of Computing",
    research: "Resilience and security of cyber-physical systems.",
    topics: ["Cybersecurity", "CPS"],
    link: externalLinks.msuSchoolOfComputing,
    image: null,
    accent: "from-blue-900 via-blue-700 to-cyan-400",
  },
  {
    name: "Interdisciplinary Data Engineering and Science",
    title: "Research cluster (IDES)",
    school: "MSU School of Computing",
    research: "Data engineering and data science across disciplines.",
    topics: ["Data Science", "Data Engineering"],
    link: externalLinks.msuSchoolOfComputing,
    image: null,
    accent: "from-amber-800 via-orange-700 to-yellow-400",
  },
  {
    name: "Natural Language Processing",
    title: "Research cluster (NLP)",
    school: "MSU School of Computing",
    research: "Language technologies and computational linguistics.",
    topics: ["NLP", "AI"],
    link: externalLinks.msuSchoolOfComputing,
    image: null,
    accent: "from-fuchsia-800 via-purple-700 to-violet-400",
  },
  {
    name: "Neuro-physiological Computational Learning",
    title: "Research cluster (NPCL)",
    school: "MSU School of Computing",
    research: "Computational learning informed by neuroscience and physiology.",
    topics: ["Machine Learning", "Neuroscience"],
    link: externalLinks.msuSchoolOfComputing,
    image: null,
    accent: "from-emerald-900 via-green-700 to-lime-400",
  },
  {
    name: "Software Engineering Reliability and Privacy",
    title: "Research cluster (SWRP)",
    school: "MSU School of Computing",
    research: "Reliable, private, and maintainable software systems.",
    topics: ["Software Engineering", "Privacy"],
    link: externalLinks.msuSchoolOfComputing,
    image: null,
    accent: "from-sky-900 via-blue-700 to-indigo-400",
  },
];

const statusStyles: Record<OpportunityCard["timeline_status"], string> = {
  "Open now": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Opens soon": "border-amber-200 bg-amber-50 text-amber-800",
  Expected: "border-blue-200 bg-blue-50 text-blue-700",
  Watch: "border-slate-200 bg-slate-100 text-slate-600",
};

function formatCheckedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function safeHref(url: string) {
  return /^https?:\/\//.test(url) ? url : "#";
}

function isHackathon(card: OpportunityCard) {
  return card.opportunity_type === "hackathon";
}

const cardShell =
  "group relative isolate flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_22px_55px_-40px_rgba(15,23,42,0.45)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_28px_70px_-44px_rgba(15,23,42,0.5)]";

const linkButton =
  "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:border-[#D1190D]/40 hover:text-[#D1190D]";

function OpportunityCardComponent({ card }: { card: OpportunityCard }) {
  return (
    <article className={`${cardShell} before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-slate-200 before:to-transparent`}>
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <Image
          src={card.college_image || card.image}
          alt={card.host_name ? `${card.host_name} campus` : card.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/62 via-black/10 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-md border border-white/20 bg-[#111827]/85 px-3 py-1 text-xs font-semibold text-slate-100 shadow-lg shadow-black/25 backdrop-blur-md">
          {card.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D1190D]">
            {card.timeline_status === "Watch" ? "Cycle closed" : "Application status"}
          </p>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyles[card.timeline_status]}`}>
            {card.timeline_status}
          </span>
        </div>

        <h2 className="mt-3 text-xl font-semibold leading-snug text-slate-950">
          {card.title}
        </h2>
        {(card.host_name || card.location) && (
          <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-slate-500">
            <MapPin className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{[card.host_name, card.location].filter(Boolean).join(" · ")}</span>
          </p>
        )}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
          {card.description}
        </p>

        <div className="mt-6 space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-start gap-2.5 text-sm font-medium leading-snug text-slate-700">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <span>{card.timeline || card.deadline}</span>
          </div>
          {card.previous_timeline && (
            <div className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-500">
              <History className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{card.previous_timeline}</span>
            </div>
          )}
          <div className="flex items-start gap-2.5 text-xs text-slate-500">
            <GraduationCap className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{card.eligibility}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <span className="text-[11px] font-medium text-slate-400">
            Checked {formatCheckedDate(card.source_checked_on)}
          </span>
          <a href={safeHref(card.link)} rel="noopener noreferrer" target="_blank" className={linkButton}>
            Learn more
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ResearchCardComponent({ item }: { item: ResearchCard }) {
  return (
    <article className={cardShell}>
      <div className={`relative flex h-44 items-end overflow-hidden bg-linear-to-br ${item.accent} p-6`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={`Portrait of ${item.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-6xl font-semibold tracking-tight text-white/80">
            {item.name.split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 3).map((w) => w[0]).join("")}
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
            MSU research
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D1190D]">School of Computing</p>
        <h2 className="mt-3 text-xl font-semibold leading-snug text-slate-950">{item.name}</h2>
        <p className="mt-1 text-sm font-medium text-slate-600">{item.title}</p>
        <p className="mt-1 text-xs text-slate-500">{item.school}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{item.research}</p>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600">
            <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <div className="flex flex-wrap gap-1.5">
              {item.topics.map((topic) => (
                <span key={topic} className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">{topic}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end border-t border-slate-200 pt-4">
          <a href={item.link} rel="noopener noreferrer" target="_blank" className={linkButton}>
            View on montclair.edu
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function LearningResourceCard({ resource }: { resource: LearningResource }) {
  return (
    <article className={cardShell}>
      <div className="relative h-44 overflow-hidden bg-slate-950">
        <Image
          src={resource.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-md border border-white/25 bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          {resource.format}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D1190D]">Learning by building</p>
        <h2 className="mt-3 text-xl font-semibold leading-snug text-slate-950">{resource.title}</h2>
        <p className="mt-1 text-sm font-medium text-slate-600">{resource.creator}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{resource.description}</p>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600">
            <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <div className="flex flex-wrap gap-1.5">
              {resource.topics.map((topic) => (
                <span key={topic} className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">{topic}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end border-t border-slate-200 pt-4">
          <a href={resource.link} rel="noopener noreferrer" target="_blank" className={linkButton}>
            Start building
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

const tabCopy: Record<OpportunityType, { heading: string; blurb: string }> = {
  hackathons: {
    heading: "Hackathons Near Montclair",
    blurb: "Open events appear first, ordered by driving distance from campus. Dates change yearly, so each card links to the official site.",
  },
  programs: {
    heading: "Fellowships, Internships & Programs",
    blurb: "National programs built for Black, Latinx, and first-generation technologists. Current openings appear first.",
  },
  research: {
    heading: "Research at the MSU School of Computing",
    blurb: "School leadership and the research clusters listed on montclair.edu. Use these as starting points for undergraduate research and advisor conversations.",
  },
  learning: {
    heading: "Learning by Building",
    blurb: "Learn through hands-on projects that take you from a blank editor to a working system.",
  },
};

export default function OpportunityTabs({
  opportunities,
}: {
  opportunities: OpportunityCard[];
}) {
  const [activeTab, setActiveTab] = useState<OpportunityType>("hackathons");
  const statusPriority: Record<OpportunityCard["timeline_status"], number> = {
    "Open now": 0,
    "Opens soon": 1,
    Expected: 2,
    Watch: 3,
  };
  const hackathons = opportunities.filter(isHackathon).sort((a, b) =>
    statusPriority[a.timeline_status] - statusPriority[b.timeline_status] ||
    a.proximity_rank - b.proximity_rank ||
    a.sort_order - b.sort_order
  );
  const programs = opportunities.filter((card) => !isHackathon(card));
  const visibleCards = activeTab === "hackathons" ? hackathons : programs;

  const tabs: Array<{ id: OpportunityType; label: string; count: number }> = [
    { id: "hackathons", label: "Hackathons", count: hackathons.length },
    { id: "programs", label: "Programs", count: programs.length },
    { id: "research", label: "MSU Research", count: researchCards.length },
    { id: "learning", label: "Learning by Building", count: learningResources.length },
  ];

  return (
    <div className="mt-14">
      <div
        role="tablist"
        aria-label="Filter opportunities"
        className="mx-auto grid w-full max-w-4xl grid-cols-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm sm:grid-cols-4"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${tab.id}-tab`}
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.label}
              <span className={`ml-2 text-xs ${isActive ? "text-white/60" : "text-slate-400"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${activeTab}-panel`}
        aria-labelledby={`${activeTab}-tab`}
        className="mt-12"
      >
        <div className="mb-8 border-b border-slate-200 pb-6">
          <h2 className="text-2xl font-bold text-slate-950">{tabCopy[activeTab].heading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{tabCopy[activeTab].blurb}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeTab === "research" ? (
            researchCards.map((item) => <ResearchCardComponent key={item.name} item={item} />)
          ) : activeTab === "learning" ? (
            learningResources.map((resource) => <LearningResourceCard key={resource.link} resource={resource} />)
          ) : (
            visibleCards.map((card) => <OpportunityCardComponent key={card.id} card={card} />)
          )}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CircleDashed,
  CircleDot,
  CheckCircle2,
  Mail,
  Megaphone,
  UserPlus,
} from "lucide-react";
import Footer from "../components_main/Footer";
import { externalLinks, siteConfig } from "../seo";

export const metadata: Metadata = {
  title: "Join the Founding Team",
  description:
    "ColorStack at Montclair State is still being founded. See where the chapter stands, what we need, and how MSU students can get involved right now.",
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: `Join the Founding Team | ${siteConfig.name}`,
    description: "The chapter is being founded. Here is how to help.",
    url: "/join",
    images: [
      {
        url: "/photos/mission-hall.jpg",
        width: 1400,
        height: 700,
        alt: "ColorStack at Montclair State founding team",
      },
    ],
  },
};

type Status = "done" | "active" | "todo";

const milestones: { title: string; detail: string; status: Status }[] = [
  {
    title: "Draft the proposal and constitution",
    detail: "Both are published on this site and ready for SGA review.",
    status: "done",
  },
  {
    title: "Recruit seven undergraduate founding members",
    detail: "MSU requires at least seven undergraduates on the founding roster. This is where you come in.",
    status: "active",
  },
  {
    title: "Secure a full-time faculty or staff advisor",
    detail: "We are reaching out to the School of Computing and the Office for Hispanic Initiatives.",
    status: "active",
  },
  {
    title: "Elect an interim President and Treasurer",
    detail: "Happens at the first founding-member meeting, once the roster is in place.",
    status: "todo",
  },
  {
    title: "Register on Engage",
    detail: "Submitted for review by SGA and the Office of Student Engagement.",
    status: "todo",
  },
  {
    title: "Apply to ColorStack for official chapter status",
    detail: "Interest form plus info session, planned for Spring 2027 after a semester of programming.",
    status: "todo",
  },
];

const statusMeta: Record<Status, { label: string; icon: typeof CheckCircle2; className: string }> = {
  done: { label: "Done", icon: CheckCircle2, className: "text-emerald-600" },
  active: { label: "In progress", icon: CircleDot, className: "text-[#D1190D]" },
  todo: { label: "Not started", icon: CircleDashed, className: "text-slate-400" },
};

const emailBody = encodeURIComponent(
  [
    "Hi ColorStack at Montclair State team,",
    "",
    "I want to help found the chapter.",
    "",
    "Name:",
    "Major and year:",
    "MSU email:",
    "Interested in an executive board role? (which one, or no):",
    "Anything else:",
  ].join("\n")
);

const emailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "ColorStack at Montclair State - I want to help found the chapter"
)}&body=${emailBody}`;

const ways = [
  {
    icon: Mail,
    title: "Add your name to the founding roster",
    body: "Send us a quick email with your name, major, and year. That is all it takes to count toward the seven founding members. No commitment beyond showing up to the first meeting.",
    cta: "Email the founding team",
    href: emailHref,
    external: false,
  },
  {
    icon: UserPlus,
    title: "Apply for ColorStack national membership today",
    body: "You do not need to wait for the chapter. National membership is free and gives you the Slack community, career fairs, mock interviews, and scholarships right now.",
    cta: "Apply on colorstack.org",
    href: externalLinks.colorstackApply,
    external: true,
  },
  {
    icon: Megaphone,
    title: "Tell a professor or a friend",
    body: "We need a full-time faculty or staff advisor. If you know a professor in the School of Computing who cares about this, send them the proposal.",
    cta: "Read the proposal",
    href: "/proposal",
    external: false,
  },
];

export default function JoinPage() {
  return (
    <main className="min-h-screen w-full bg-[#f7f8fb]">
      <section className="px-5 pt-16 pb-10 sm:px-6 md:pt-24 md:pb-14">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D1190D]/30 bg-[#D1190D]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#D1190D]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#D1190D]" />
            Founding in progress
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            The chapter is still being built.{" "}
            <span className="text-[#D1190D]">Help us build it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            ColorStack at Montclair State is not yet a registered student organization or an
            official ColorStack chapter. A small group of students is assembling the founding team
            now. There is no sign-up form yet, on purpose: at this stage we want to talk to every
            person who is interested.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={emailHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D1190D] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-colors hover:bg-[#A8140A]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              I want to help found the chapter
            </a>
            <Link
              href="/officers"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D1190D] px-7 py-3 text-sm font-semibold text-[#D1190D] transition-colors hover:bg-[#D1190D] hover:text-white"
            >
              See the open roles
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="px-5 pb-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.5)] md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">Where we are</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Road to a registered chapter</h2>
          <ol className="mt-6 divide-y divide-slate-100">
            {milestones.map((m) => {
              const meta = statusMeta[m.status];
              return (
                <li key={m.title} className="flex gap-4 py-4">
                  <meta.icon className={`mt-0.5 h-5 w-5 shrink-0 ${meta.className}`} aria-hidden="true" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-slate-950">{m.title}</p>
                      <span className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] ${meta.className}`}>
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{m.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Ways to help */}
      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">Right now</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">Three ways to help this week</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ways.map((w) => (
              <div key={w.title} className="flex flex-col rounded-xl border border-slate-200 bg-[#f7f8fb] p-6">
                <w.icon className="h-6 w-6 text-[#D1190D]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold text-slate-950">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{w.body}</p>
                {w.external ? (
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D1190D] underline-offset-4 hover:underline"
                  >
                    {w.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : w.href.startsWith("mailto:") ? (
                  <a
                    href={w.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D1190D] underline-offset-4 hover:underline"
                  >
                    {w.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={w.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D1190D] underline-offset-4 hover:underline"
                  >
                    {w.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are looking for */}
      <section className="px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">Who we are looking for</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950">Any MSU student who wants this to exist</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              ColorStack serves Black and Latinx students in computing, and the chapter is open to
              every Montclair State student who supports that mission. Founding members are usually
              in computer science, information technology, data science, cybersecurity, or a related
              major, but you do not need to be an upperclassman or have any leadership experience.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              If you would rather not hold a role, that is fine. Seven names on a roster is what
              unlocks registration. Roles can be filled later.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">What we will ask you for</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {[
                "Your name, major, and expected graduation year",
                "Your MSU email so we can add you to the Engage roster",
                "One founding meeting (about an hour) to ratify the constitution and elect interim officers",
                "Optional: a role you would like to take on",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D1190D]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={emailHref}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#D1190D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#A8140A]"
            >
              Count me in
            </a>
            <p className="mt-3 text-center text-xs text-slate-400">
              Opens your email app addressed to {siteConfig.email}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

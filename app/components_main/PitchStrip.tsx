import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { externalLinks } from "../seo";

/**
 * Headline facts that make the case for a chapter at MSU.
 * Sources are listed in full on the /proposal page.
 */
const facts = [
  {
    value: "39%",
    label: "of MSU students identify as Hispanic or Latino",
    note: "Fall 2023",
    href: externalLinks.msuWikipedia,
  },
  {
    value: "13%",
    label: "of MSU students identify as Black",
    note: "Fall 2023",
    href: externalLinks.msuWikipedia,
  },
  {
    value: "2016",
    label: "MSU designated a Hispanic-Serving Institution",
    note: "Office for Hispanic Initiatives",
    href: externalLinks.msuHispanicInitiatives,
  },
  {
    value: "95",
    label: "ColorStack chapters across 27 states, and none yet at MSU",
    note: "February 2026",
    href: externalLinks.colorstackWikipedia,
  },
];

export default function PitchStrip() {
  return (
    <section
      id="why"
      aria-label="Why Montclair State needs a ColorStack chapter"
      className="w-full px-5 pb-6 sm:px-6 lg:px-8 lg:pb-10"
    >
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.5)] md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">
              Why here, why now
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 md:text-3xl">
              A Hispanic-Serving Institution with no ColorStack chapter. Yet.
            </h2>
          </div>
          <Link
            href="/proposal"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#D1190D] hover:underline underline-offset-4"
          >
            Full proposal for MSU administrators
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <a
              key={f.label}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-l-2 border-slate-200 pl-4 transition-colors hover:border-[#D1190D]"
            >
              <dt className="text-3xl font-extrabold tracking-tight text-slate-950 group-hover:text-[#D1190D] md:text-4xl">
                {f.value}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-slate-600">{f.label}</dd>
              <dd className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {f.note}
              </dd>
            </a>
          ))}
        </dl>
      </div>
    </section>
  );
}

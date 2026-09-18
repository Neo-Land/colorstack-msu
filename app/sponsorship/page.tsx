import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { absoluteUrl, siteConfig } from "../seo";
import { campusPhotos } from "../campusPhotos";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Partner with ColorStack at Montclair State to support Black and Latinx computing students through technical workshops, career programming, and community events at a Hispanic-Serving Institution.",
  alternates: {
    canonical: "/sponsorship",
  },
  openGraph: {
    title: `Sponsorship | ${siteConfig.name}`,
    description:
      "Support the founding ColorStack chapter at Montclair State University and connect with emerging technical talent.",
    url: "/sponsorship",
    images: [
      {
        url: "/photos/campus-quad.jpg",
        width: 1400,
        height: 900,
        alt: "ColorStack at Montclair State",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sponsorship | ${siteConfig.name}`,
    description:
      "Support the founding ColorStack chapter at Montclair State University.",
    images: ["/photos/campus-quad.jpg"],
  },
};

const contactHref = `mailto:${siteConfig.email}?subject=ColorStack%20at%20Montclair%20State%20Sponsorship`;

/* Campus-level facts, since the chapter has no members yet. Sources on /proposal. */
const impactStats = [
  { value: "39%", label: "Hispanic or Latino students" },
  { value: "13%", label: "Black students" },
  { value: "HSI", label: "Hispanic-Serving Institution since 2016" },
];

const sponsorBenefits = [
  "Logo on website and socials",
  "Host an info session or career talk",
  "Resume review or mock interview event access",
  "Featured partner spotlight at a chapter meeting",
];

const sponsorshipTiers = [
  {
    name: "Community",
    price: "$100",
    description: "Start the relationship and stay connected with the founding chapter.",
    included: [0],
  },
  {
    name: "Bronze",
    price: "$500",
    description: "A simple way to support programming and student visibility.",
    included: [0, 1],
  },
  {
    name: "Silver",
    price: "$1,500",
    description: "A stronger recruiting presence with direct member engagement.",
    included: [0, 1, 2],
  },
  {
    name: "Gold",
    price: "$2,500",
    description: "Our highest-impact package for year-round partner visibility.",
    included: [0, 1, 2, 3],
    featured: true,
  },
];

export default function SponsorshipPage() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#f7f8fb]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sponsorship",
            url: absoluteUrl("/sponsorship"),
            description: metadata.description,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: absoluteUrl("/"),
            },
            about: {
              "@type": "Organization",
              name: siteConfig.name,
              email: siteConfig.email,
            },
          }),
        }}
      />
      <section className="relative px-5 pt-14 pb-12 sm:px-6 md:pt-24 md:pb-20">
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">
              Sponsorship
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[0.98] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
              Partner with{" "}
              <span className="text-[#D1190D]">ColorStack at Montclair State.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-slate-700 sm:text-lg md:text-xl md:leading-8">
              Be a founding partner of the first ColorStack chapter at one of the largest
              Hispanic-Serving Institutions in New Jersey. Your support funds workshops, interview
              prep, and community events for Black and Latinx computing students at MSU.
            </p>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-0 sm:gap-4 md:mt-10">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l border-slate-200 px-3 first:border-l-0 first:pl-0 sm:pl-4 sm:pr-0"
                >
                  <p className="text-3xl font-extrabold tracking-tight text-[#D1190D] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_28px_80px_-48px_rgba(15,23,42,0.45)]">
            <div className="absolute left-0 top-0 z-10 h-0.5 w-0 bg-[#D1190D] transition-all duration-500 group-hover:w-full" />
            <Image
              src={campusPhotos.redBuilding.src}
              alt={campusPhotos.redBuilding.alt}
              width={1400}
              height={900}
              priority
              className="aspect-[1.1/1] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] sm:aspect-[1.45/1]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#07111e]/78 via-transparent to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-7">
              <div className="min-w-0">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/80 sm:text-sm sm:tracking-[0.22em]">
                  {siteConfig.university}
                </p>
                <p className="mt-1 text-base font-bold leading-tight text-white sm:mt-2 sm:text-xl">
                  Students building the future of tech
                </p>
              </div>
              <a
                href={contactHref}
                className="hidden shrink-0 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/16 md:inline-flex"
              >
                Contact us
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f8fb] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">
              Partnership Packages
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              Support the work. Meet the talent.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
              Sponsorship helps fund technical workshops, interview preparation, community events,
              and travel to ColorStack and NSBE/SHPE events. Tiers are proposed and will be finalized
              with our faculty advisor and the SGA treasurer once the chapter is registered.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {sponsorshipTiers.map((tier) => (
              <article
                key={tier.name}
                className={[
                  "relative flex min-h-full flex-col overflow-hidden rounded-xl border p-6 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-1",
                  tier.featured
                    ? "border-[#D1190D]/70 bg-[#B0150B] text-white"
                    : "border-slate-200 bg-white text-slate-950 hover:border-slate-300",
                ].join(" ")}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />

                <p
                  className={[
                    "text-xs font-extrabold uppercase tracking-[0.32em]",
                    tier.featured ? "text-white" : "text-[#D1190D]",
                  ].join(" ")}
                >
                  {tier.name}
                </p>
                <div className="mt-6 flex items-end gap-1">
                  <span className={["text-sm font-bold", tier.featured ? "text-white/70" : "text-slate-500"].join(" ")}>$</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    {tier.price.replace("$", "")}
                  </span>
                  <span className={["pb-2 text-sm font-semibold", tier.featured ? "text-white/70" : "text-slate-500"].join(" ")}>/yr</span>
                </div>
                <p className={["mt-4 min-h-12 text-sm leading-6", tier.featured ? "text-white/65" : "text-slate-600"].join(" ")}>
                  {tier.description}
                </p>

                <div className={["my-6 h-px", tier.featured ? "bg-white/12" : "bg-slate-200"].join(" ")} />

                <p className={["text-[0.68rem] font-extrabold uppercase tracking-[0.24em]", tier.featured ? "text-white/70" : "text-slate-500"].join(" ")}>
                  What&apos;s included
                </p>
                <ul className="mt-5 flex flex-1 flex-col gap-4">
                  {tier.included.map((benefitIndex) => (
                    <li
                      key={sponsorBenefits[benefitIndex]}
                      className={["flex items-start gap-3 text-sm font-semibold leading-6", tier.featured ? "text-white" : "text-slate-700"].join(" ")}
                    >
                      <Check className={["mt-1 h-4 w-4 shrink-0", tier.featured ? "text-white" : "text-[#D1190D]"].join(" ")} aria-hidden="true" />
                      <span>{sponsorBenefits[benefitIndex]}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={contactHref}
                  className={[
                    "mt-8 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition-colors",
                    tier.featured
                      ? "bg-white text-[#B0150B] hover:bg-white/90"
                      : "border border-[#D1190D]/70 text-[#D1190D] hover:bg-[#D1190D] hover:text-white",
                  ].join(" ")}
                >
                  Contact Us
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

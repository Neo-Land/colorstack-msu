import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  HandCoins,
  Handshake,
  Landmark,
  Mail,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import Footer from "../components_main/Footer";
import { absoluteUrl, externalLinks, siteConfig } from "../seo";

export const metadata: Metadata = {
  title: "Chapter Proposal",
  description:
    "The case for a ColorStack chapter at Montclair State University: why MSU, what ColorStack provides, what the chapter is asking of the University, and a semester-by-semester roadmap to official affiliation.",
  alternates: {
    canonical: "/proposal",
  },
  openGraph: {
    title: `Chapter Proposal | ${siteConfig.name}`,
    description:
      "Why Montclair State needs a ColorStack chapter and how we get there.",
    url: "/proposal",
    images: [
      {
        url: "/tiles/resource-proposal.svg",
        width: 1200,
        height: 630,
        alt: "ColorStack at Montclair State chapter proposal",
      },
    ],
  },
};

const sources = [
  { id: 1, label: "ColorStack, 2025 Impact Report", href: externalLinks.colorstackImpactReport },
  { id: 2, label: "Wikipedia, ColorStack (chapter and state counts, February 2026)", href: externalLinks.colorstackWikipedia },
  { id: 3, label: "ColorStack Family Wiki, Chapters of ColorStack", href: externalLinks.colorstackChapters },
  { id: 4, label: "ColorStack, Member Application Requirements", href: externalLinks.colorstackMemberRequirements },
  { id: 5, label: "Wikipedia, Montclair State University (enrollment and Fall 2023 demographics)", href: externalLinks.msuWikipedia },
  { id: 6, label: "MSU Office for Hispanic Initiatives", href: externalLinks.msuHispanicInitiatives },
  { id: 7, label: "MSU School of Computing", href: externalLinks.msuSchoolOfComputing },
  { id: 8, label: "MSU Registered Student Organizations (SGA and Office of Student Engagement)", href: externalLinks.msuRsoInfo },
];

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 text-[0.65em] font-bold text-[#D1190D]">
      <a href="#sources" aria-label={`Source ${n}`}>[{n}]</a>
    </sup>
  );
}

function SectionHeading({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">{title}</h2>
      {blurb && <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{blurb}</p>}
    </div>
  );
}

const msuFacts = [
  { value: "22,570", label: "total students", note: "June 2024", cite: 5 },
  { value: "39%", label: "Hispanic or Latino", note: "Fall 2023", cite: 5 },
  { value: "13%", label: "Black", note: "Fall 2023", cite: 5 },
  { value: "2016", label: "HSI designation", note: "Office for Hispanic Initiatives", cite: 6 },
];

const colorstackFacts = [
  { value: "16,000+", label: "members across 1,606 schools", cite: 1 },
  { value: "95", label: "campus chapters in 27 states", cite: 2 },
  { value: "72%", label: "of Class of 2026 members had internships", cite: 1 },
  { value: "$439K", label: "distributed through the Family Fund", cite: 1 },
];

const chapterBenefits = [
  {
    icon: Handshake,
    title: "Employer access",
    body: "Chapter members enter the national resume book and two annual career fairs that drew 2,932 combined attendees last year.",
    cite: 1,
  },
  {
    icon: GraduationCap,
    title: "Career prep at no cost",
    body: "AlgoExpert licenses, mock interviews through interviewing.io, career coaching hours, and an AI resume review tool.",
    cite: 1,
  },
  {
    icon: HandCoins,
    title: "Scholarships and travel",
    body: "The Family Fund covers conference travel (AfroTech, SHPE, NSBE) and tuition or housing emergencies.",
    cite: 1,
  },
  {
    icon: Users,
    title: "Community every week",
    body: "A national Slack with roughly 38,000 messages a month, monthly Fam Fridays, and a volunteer professional mentor program.",
    cite: 1,
  },
  {
    icon: Rocket,
    title: "Leadership development",
    body: "Chapter co-presidents attend the annual ColorStack leadership conference and receive leadership training.",
    cite: 3,
  },
  {
    icon: ShieldCheck,
    title: "Retention signal for MSU",
    body: "80% of members report confidence they will graduate with a full-time tech offer, and 65% of alumni have secured full-time roles.",
    cite: 1,
  },
];

const asks = [
  {
    icon: Users,
    title: "A full-time faculty or staff advisor",
    body: "Required for RSO registration. We are seeking someone from the School of Computing or the Office for Hispanic Initiatives who can meet with the executive board once a month.",
  },
  {
    icon: Building2,
    title: "Meeting space in the Center for Computing and Information Science",
    body: "A recurring room reservation in Mallory Hall for biweekly general meetings and study jams.",
  },
  {
    icon: Landmark,
    title: "A listing and a letter",
    body: "A link on the School of Computing student resources page, and a brief letter of support we can include with the ColorStack chapter interest form.",
  },
  {
    icon: HandCoins,
    title: "Access to standard SGA funding",
    body: "Nothing beyond what every RSO receives. Registered organizations can request supplemental programming funds of up to $7,000 per semester through SGA.",
    cite: 8,
  },
];

const requirements = [
  "At least seven undergraduate founding members",
  "A full-time University advisor",
  "An executive board including a President and a Treasurer",
  "A written constitution and a member roster",
  "Registration submitted through Engage for SGA and Office of Student Engagement review",
  "Financial training for the President and Treasurer before accessing funds",
];

const roadmap = [
  {
    phase: "Fall 2026",
    title: "Form the founding team",
    items: [
      "Recruit 7+ undergraduate founding members from CS, IT, data science, and related majors",
      "Secure a full-time faculty or staff advisor",
      "Adopt the draft constitution and elect an interim President and Treasurer",
      "Submit the RSO registration on Engage",
      "Every founding member applies for free ColorStack national membership",
    ],
  },
  {
    phase: "Spring 2027",
    title: "Run programming as a registered RSO",
    items: [
      "Biweekly general meetings plus a study jam before finals",
      "One resume workshop and one mock-interview night with a corporate partner",
      "Publish an MSU-specific hackathon and internship calendar (already live on this site)",
      "Submit the ColorStack chapter interest form and attend the info session",
    ],
  },
  {
    phase: "Fall 2027",
    title: "Become an official ColorStack chapter",
    items: [
      "Complete the ColorStack chapter onboarding",
      "Send co-presidents to the ColorStack leadership conference",
      "Re-register on Engage by the third week of the semester",
      "Elect the first full executive board and set a two-year sponsorship plan",
    ],
  },
];

const faqs = [
  {
    q: "Is the chapter only for Black and Latinx students?",
    a: "No. Like every ColorStack chapter, meetings and events are open to all MSU students. ColorStack national membership is for undergraduates who identify as Black, Latinx, Native American, or a demonstrated ally and who study computer science or a closely related major.",
    cite: 4,
  },
  {
    q: "Does it cost students anything?",
    a: "No. ColorStack national membership is free, and the chapter will not charge dues.",
  },
  {
    q: "How is this different from the existing Computing Club?",
    a: "The Computing Club is a general-interest technical club. ColorStack focuses on the retention and hiring gap for Black and Latinx students specifically, and it brings a national employer network that no campus-only club can replicate. We expect to co-host events.",
  },
  {
    q: "Does MSU have to do anything with ColorStack national?",
    a: "No formal agreement is required from the University. A chapter is a student-led RSO that uses the ColorStack name and follows its national guidelines. The University relationship is the standard RSO relationship through SGA and the Office of Student Engagement.",
    cite: 3,
  },
  {
    q: "What happens if the chapter application to ColorStack is not accepted right away?",
    a: "The RSO continues to operate under MSU recognition, and students keep their individual national memberships. We reapply the following cycle with a semester of programming on record.",
  },
];

const contacts = [
  { label: "Chapter founding team", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "ColorStack national", value: externalLinks.colorstackEmail, href: `mailto:${externalLinks.colorstackEmail}` },
  { label: "SGA Vice President", value: "vicepresident@sgamsu.org", href: "mailto:vicepresident@sgamsu.org" },
  { label: "SGA Organizational Liaison", value: "organizationalliaison@sgamsu.org", href: "mailto:organizationalliaison@sgamsu.org" },
  { label: "Office of Student Engagement", value: "973-655-7818", href: "tel:+19736557818" },
  { label: "Office for Hispanic Initiatives", value: "hispanicsatmsu@montclair.edu", href: "mailto:hispanicsatmsu@montclair.edu" },
];

export default function ProposalPage() {
  return (
    <main className="min-h-screen w-full bg-[#f7f8fb]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Chapter Proposal",
            url: absoluteUrl("/proposal"),
            description: metadata.description,
            isPartOf: { "@type": "WebSite", name: siteConfig.name, url: absoluteUrl("/") },
          }),
        }}
      />

      {/* Hero */}
      <section className="px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">
            Proposal for Montclair State University administrators
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Bring <span className="text-[#D1190D]">ColorStack</span> to Montclair State.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
            Montclair State is a Hispanic-Serving Institution where more than half of students
            identify as Hispanic, Latino, or Black.<Cite n={5} />{" "}
            ColorStack is a national community of more than 16,000 Black and Latinx computing
            students<Cite n={1} /> with 95 campus chapters.<Cite n={2} />{" "}
            None of them is at MSU. We are a group of students asking for the University&apos;s
            support to change that.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${siteConfig.email}?subject=ColorStack%20at%20Montclair%20State%20proposal`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D1190D] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-colors hover:bg-[#A8140A]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Talk to the founding team
            </a>
            <Link
              href="/constitution"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D1190D] px-7 py-3 text-sm font-semibold text-[#D1190D] transition-colors hover:bg-[#D1190D] hover:text-white"
            >
              Read the draft constitution
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* The one-paragraph ask */}
      <section className="px-5 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#D1190D]/25 bg-white p-6 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.5)] md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">The ask in one paragraph</p>
          <p className="mt-3 text-base leading-7 text-slate-800 md:text-lg">
            We are asking the University to recognize ColorStack at Montclair State as a Registered
            Student Organization, to help us identify a full-time advisor in the School of Computing
            or the Office for Hispanic Initiatives, and to give us a recurring meeting room in the
            Center for Computing and Information Science. In return, MSU gains a student-run pipeline
            into a national network of employers, scholarships, and mentors that is purpose-built for
            the students MSU already serves.
          </p>
        </div>
      </section>

      {/* Why MSU */}
      <section className="px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Why Montclair State"
            title="The students are already here."
            blurb="MSU was designated a Hispanic-Serving Institution in 2016 and enrolls one of the most diverse student bodies in New Jersey. The School of Computing sits inside the College of Science and Mathematics and runs seven research clusters out of the Center for Computing and Information Science."
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {msuFacts.map((f) => (
              <div key={f.label} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="text-3xl font-extrabold tracking-tight text-[#D1190D]">
                  {f.value}<Cite n={f.cite} />
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{f.label}</dd>
                <dd className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{f.note}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-6 text-slate-500">
            The School of Computing lists AI Engineered Systems, Algorithms and Networks,
            Cyber-physical Resilient Systems, Data Engineering and Science, Natural Language
            Processing, Neuro-physiological Computational Learning, and Software Engineering
            Reliability and Privacy as its research clusters.<Cite n={7} /> Each one is a place
            our members can find undergraduate research.
          </p>
        </div>
      </section>

      {/* What ColorStack is */}
      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="What ColorStack is"
            title="A national nonprofit with a track record."
            blurb="ColorStack is a 501(c)(3) founded in May 2020 by Cornell alumnus Jehron Petty. Its mission is to increase the number of Black and Latinx computer science graduates who go on to launch rewarding technical careers. A chapter is an on-campus, student-led club that carries the ColorStack name and serves the Black and Latinx computing community at its school."
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {colorstackFacts.map((f) => (
              <div key={f.label} className="border-l-2 border-[#D1190D] pl-4">
                <dt className="text-3xl font-extrabold tracking-tight text-slate-950">
                  {f.value}<Cite n={f.cite} />
                </dt>
                <dd className="mt-1 text-sm leading-6 text-slate-600">{f.label}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-14 text-2xl font-bold text-slate-950">What a chapter brings to MSU students</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {chapterBenefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-slate-200 bg-[#f7f8fb] p-5">
                <b.icon className="h-6 w-6 text-[#D1190D]" aria-hidden="true" />
                <p className="mt-3 text-base font-bold text-slate-950">{b.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {b.body}<Cite n={b.cite} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The asks */}
      <section className="px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="What we are asking of MSU"
            title="Four things, none of them unusual."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {asks.map((a) => (
              <div key={a.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6">
                <a.icon className="mt-0.5 h-6 w-6 shrink-0 text-[#D1190D]" aria-hidden="true" />
                <div>
                  <p className="text-base font-bold text-slate-950">{a.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {a.body}{a.cite ? <Cite n={a.cite} /> : null}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-950">MSU registration checklist</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Requirements for a new Registered Student Organization, per the SGA and the Office of
              Student Engagement.<Cite n={8} />
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D1190D]" aria-hidden="true" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <a
              href={externalLinks.msuEngageRegister}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D1190D] underline-offset-4 hover:underline"
            >
              Engage registration form
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Roadmap"
            title="From founding team to official chapter in three semesters."
            blurb="ColorStack asks prospective chapters to submit an interest form and attend an info session. MSU recognition comes first so the chapter has a roster, an advisor, and a semester of programming to show."
          />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {roadmap.map((step, i) => (
              <li key={step.phase} className="relative rounded-xl border border-slate-200 bg-[#f7f8fb] p-6">
                <span className="absolute -top-3 left-6 rounded-full bg-[#D1190D] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
                  Phase {i + 1}
                </span>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{step.phase}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-950">{step.title}</h3>
                <ul className="mt-4 space-y-2">
                  {step.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D1190D]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Questions we expect" title="FAQ for administrators" />
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="cursor-pointer list-none text-base font-bold text-slate-950 marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {f.a}{f.cite ? <Cite n={f.cite} /> : null}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts + sources */}
      <section className="border-t border-slate-200 bg-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Contacts" title="Who to talk to" />
            <ul className="mt-8 space-y-4">
              {contacts.map((c) => (
                <li key={c.label}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{c.label}</p>
                  <a href={c.href} className="text-base font-semibold text-slate-950 hover:text-[#D1190D]">
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div id="sources">
            <SectionHeading eyebrow="Sources" title="Where the numbers come from" />
            <ol className="mt-8 space-y-3">
              {sources.map((s) => (
                <li key={s.id} className="flex gap-3 text-sm leading-6 text-slate-600">
                  <span className="font-bold text-[#D1190D]">[{s.id}]</span>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#D1190D] hover:underline underline-offset-4">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs leading-5 text-slate-400">
              Figures were checked in September 2026. Enrollment and demographic numbers change each
              year; please confirm current figures with MSU Institutional Research before quoting
              them in University materials.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

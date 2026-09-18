import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "../components_main/Footer";
import { externalLinks, siteConfig } from "../seo";

export const metadata: Metadata = {
  title: "Draft Constitution",
  description:
    "Draft constitution for ColorStack at Montclair State University, prepared for Registered Student Organization review by the SGA and the Office of Student Engagement.",
  alternates: {
    canonical: "/constitution",
  },
};

type Article = {
  title: string;
  sections: { heading: string; text: string | string[] }[];
};

const articles: Article[] = [
  {
    title: "Article I. Name",
    sections: [
      {
        heading: "Section 1. Official name",
        text: "The name of this organization shall be ColorStack at Montclair State University, referred to in this document as the Chapter or ColorStack MSU.",
      },
      {
        heading: "Section 2. Affiliation",
        text: "The Chapter seeks recognition as an official campus chapter of ColorStack, a 501(c)(3) nonprofit organization. Until that recognition is granted, the Chapter operates as an independent Registered Student Organization of Montclair State University that follows ColorStack national guidelines wherever they apply.",
      },
    ],
  },
  {
    title: "Article II. Purpose",
    sections: [
      {
        heading: "Section 1. Mission",
        text: "The mission of the Chapter is to increase the number of Black and Latinx computing students at Montclair State University who complete their degrees and go on to launch rewarding technical careers.",
      },
      {
        heading: "Section 2. Objectives",
        text: [
          "Build an on-campus community for Black and Latinx students in computer science, information technology, data science, and closely related majors.",
          "Provide academic support including study groups, peer tutoring, and course planning help.",
          "Deliver career programming including resume workshops, mock interviews, hackathon participation, and connections to employers through the ColorStack national network.",
          "Encourage every eligible member to apply for ColorStack national membership.",
          "Collaborate with the School of Computing, the Office for Hispanic Initiatives, and other Registered Student Organizations on shared goals.",
        ],
      },
    ],
  },
  {
    title: "Article III. Membership",
    sections: [
      {
        heading: "Section 1. Eligibility",
        text: "Membership is open to all currently enrolled Montclair State University students regardless of race, color, religion, sex, gender identity or expression, sexual orientation, national origin, disability, age, or veteran status, in accordance with University policy. The Chapter serves the Black and Latinx computing community; students of every background who support that mission are welcome.",
      },
      {
        heading: "Section 2. Active membership",
        text: "An active member is a student who has joined the Chapter roster on Engage and has attended at least two Chapter meetings or events in the current semester. Only active members may vote or hold office.",
      },
      {
        heading: "Section 3. Dues",
        text: "The Chapter shall not charge membership dues.",
      },
      {
        heading: "Section 4. National membership",
        text: "ColorStack national membership is separate from Chapter membership and is governed by ColorStack national eligibility requirements. The Chapter encourages but does not require national membership.",
      },
    ],
  },
  {
    title: "Article IV. Executive Board",
    sections: [
      {
        heading: "Section 1. Officers",
        text: "The Executive Board shall consist of a President, a Vice President, a Treasurer, and a Secretary. The Board may create additional positions, such as Head of Technology, Marketing and Public Relations Chair, and External Relations Chair, by majority vote of active members.",
      },
      {
        heading: "Section 2. Duties",
        text: [
          "President: sets Chapter direction, presides over meetings, serves as the primary contact for the Student Government Association, the Office of Student Engagement, the advisor, and ColorStack national, and completes required SGA trainings.",
          "Vice President: coordinates programming and committees, and assumes the duties of the President in their absence.",
          "Treasurer: prepares the budget, manages all Chapter funds in accordance with SGA financial policies, completes required financial training, and reports finances at each general meeting.",
          "Secretary: maintains the roster, records meeting minutes, handles Engage re-registration each semester, and manages Chapter communications.",
        ],
      },
      {
        heading: "Section 3. Qualifications",
        text: "Officers must be active members in good academic standing as defined by the University and must be enrolled undergraduate students for the duration of their term.",
      },
      {
        heading: "Section 4. Term",
        text: "Officers serve a one-year term beginning at the end of the spring semester. Officers may be re-elected.",
      },
    ],
  },
  {
    title: "Article V. Elections",
    sections: [
      {
        heading: "Section 1. Timing",
        text: "Elections are held each April at a general meeting announced at least two weeks in advance.",
      },
      {
        heading: "Section 2. Procedure",
        text: "Any active member may nominate themselves or another active member. Voting is by secret ballot. A candidate must receive a majority of votes cast. If no candidate receives a majority, a runoff is held between the two candidates with the most votes.",
      },
      {
        heading: "Section 3. Vacancies",
        text: "If an office becomes vacant, the Executive Board appoints an interim officer until a special election is held within four weeks.",
      },
      {
        heading: "Section 4. Removal",
        text: "An officer may be removed for failure to perform their duties by a two-thirds vote of active members at a meeting where the officer has been given the opportunity to respond.",
      },
    ],
  },
  {
    title: "Article VI. Advisor",
    sections: [
      {
        heading: "Section 1. Requirement",
        text: "The Chapter shall have at least one advisor who is a full-time faculty or staff member of Montclair State University, as required for Registered Student Organizations.",
      },
      {
        heading: "Section 2. Role",
        text: "The advisor provides guidance to the Executive Board, meets with the Board at least once per month, and is informed of all Chapter events and financial activity. The advisor does not vote.",
      },
    ],
  },
  {
    title: "Article VII. Meetings",
    sections: [
      {
        heading: "Section 1. General meetings",
        text: "General meetings are held at least twice per month during the fall and spring semesters.",
      },
      {
        heading: "Section 2. Executive Board meetings",
        text: "The Executive Board meets at least once between general meetings.",
      },
      {
        heading: "Section 3. Quorum",
        text: "A quorum for voting consists of a majority of active members. Decisions are made by simple majority unless this constitution specifies otherwise.",
      },
    ],
  },
  {
    title: "Article VIII. Finances",
    sections: [
      {
        heading: "Section 1. Funding",
        text: "The Chapter may receive funding from the Student Government Association, sponsorships, donations, and fundraising. All funds are handled according to SGA and University financial policies.",
      },
      {
        heading: "Section 2. Expenditures",
        text: "Expenditures require approval of the Treasurer and the President. Expenditures over $250 require a majority vote of the Executive Board.",
      },
      {
        heading: "Section 3. Sponsorships",
        text: "Corporate sponsorships are reviewed by the Executive Board and the advisor to confirm they align with the Chapter mission and with ColorStack national partnership guidelines.",
      },
    ],
  },
  {
    title: "Article IX. Committees",
    sections: [
      {
        heading: "Section 1. Standing committees",
        text: "The Executive Board may establish standing or ad hoc committees, such as Programming, Outreach, and Technology, each chaired by an active member appointed by the President.",
      },
    ],
  },
  {
    title: "Article X. Amendments",
    sections: [
      {
        heading: "Section 1. Proposal",
        text: "Any active member may propose an amendment in writing to the Executive Board. Proposed amendments are distributed to all active members at least one week before a vote.",
      },
      {
        heading: "Section 2. Ratification",
        text: "Amendments are ratified by a two-thirds vote of active members present at a general meeting with quorum, and take effect once approved by the Student Government Association where required.",
      },
    ],
  },
  {
    title: "Article XI. Compliance",
    sections: [
      {
        heading: "Section 1. University policy",
        text: "The Chapter shall comply with all Montclair State University policies, the SGA constitution and statutes, and the policies of the Office of Student Engagement, including semester re-registration on Engage.",
      },
      {
        heading: "Section 2. Anti-hazing and non-discrimination",
        text: "The Chapter prohibits hazing in any form and does not discriminate in membership or programming.",
      },
    ],
  },
];

export default function ConstitutionPage() {
  return (
    <main className="min-h-screen w-full bg-[#f7f8fb]">
      <section className="px-5 pt-16 pb-10 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">
            Draft v1 · For SGA review
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Constitution of ColorStack at Montclair State University
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            This draft follows the structure used by existing ColorStack chapter constitutions and
            the requirements for Registered Student Organizations at Montclair State. The founding
            members will ratify a final version before submitting it on Engage.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/proposal" className="inline-flex items-center gap-1.5 text-[#D1190D] underline-offset-4 hover:underline">
              Read the proposal <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={externalLinks.msuRsoInfo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-600 underline-offset-4 hover:text-[#D1190D] hover:underline">
              MSU RSO requirements <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6">
        <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.5)] md:p-10">
          {articles.map((a) => (
            <section key={a.title} className="mb-10 last:mb-0">
              <h2 className="text-xl font-extrabold text-slate-950 md:text-2xl">{a.title}</h2>
              <div className="mt-4 space-y-5">
                {a.sections.map((s) => (
                  <div key={s.heading}>
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#D1190D]">{s.heading}</h3>
                    {Array.isArray(s.text) ? (
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-[0.95rem] leading-7 text-slate-700">
                        {s.text.map((t) => <li key={t}>{t}</li>)}
                      </ul>
                    ) : (
                      <p className="mt-2 text-[0.95rem] leading-7 text-slate-700">{s.text}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
          <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
            <p>Ratified on ______________ by the founding members of {siteConfig.name}.</p>
            <p className="mt-2">President: ______________ &nbsp;&nbsp; Treasurer: ______________ &nbsp;&nbsp; Advisor: ______________</p>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}

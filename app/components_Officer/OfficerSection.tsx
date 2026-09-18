import { createPublicClient } from "@/lib/supabase/public";
import EBoardCard from "./EBoardCard";
import { siteConfig } from "../seo";

interface Officer {
  id?: string;
  sort_order?: number;
  name: string;
  role: string;
  img?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  email?: string | null;
}

const recruitEmail = `${siteConfig.email}?subject=ColorStack%20at%20Montclair%20State%20-%20Founding%20team`;

/**
 * Founding-team roster. Every seat is open until the chapter is chartered.
 * Replace entries here or manage them from the admin panel once Supabase is connected.
 */
const fallbackOfficers: Officer[] = [
  {
    name: "Open seat",
    role: "Founding President",
    bio: "Leads the chapter vision, is the primary contact for SGA, the Office of Student Engagement, and ColorStack national, and attends the ColorStack leadership conference.",
    email: recruitEmail,
  },
  {
    name: "Open seat",
    role: "Vice President",
    bio: "Runs day-to-day operations, coordinates the executive board, and steps in for the President when needed.",
    email: recruitEmail,
  },
  {
    name: "Open seat",
    role: "Treasurer",
    bio: "Manages the SGA budget, completes required financial training, and tracks sponsorship funds. Required for MSU registration.",
    email: recruitEmail,
  },
  {
    name: "Open seat",
    role: "Secretary",
    bio: "Keeps the roster, meeting minutes, and Engage re-registration on schedule every semester.",
    email: recruitEmail,
  },
  {
    name: "Open seat",
    role: "Head of Tech",
    bio: "Owns this website, the chapter Discord, and technical workshops such as study jams and project nights.",
    email: recruitEmail,
  },
  {
    name: "Open seat",
    role: "Marketing & PR Chair",
    bio: "Runs Instagram, flyers, and campus outreach so every eligible student knows the chapter exists.",
    email: recruitEmail,
  },
  {
    name: "Open seat",
    role: "External Relations",
    bio: "Builds relationships with sponsors, the School of Computing, other RSOs, and ColorStack chapters across New Jersey.",
    email: recruitEmail,
  },
  {
    name: "Advisor wanted",
    role: "Faculty / Staff Advisor",
    bio: "A full-time MSU faculty or staff member is required for registration. We are seeking an advisor from the School of Computing or the Office for Hispanic Initiatives.",
    email: recruitEmail,
  },
];

export default async function OfficerSection() {
  const supabase = createPublicClient();
  let officers: Officer[] = fallbackOfficers;

  if (supabase) {
    const { data, error } = await supabase
      .from("eboard_members")
      .select("id, sort_order, name, role, img, bio, linkedin, email")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load officers:", error.message);
    }
    if (data && data.length > 0) officers = data;
  }

  return (
    <section
      id="officers"
      aria-label="ColorStack at Montclair State founding team"
      className="w-full bg-[#f7f8fb] px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1190D]">
            Founding Team
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Help build
            <span className="text-[#D1190D]"> ColorStack at Montclair State.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            MSU requires seven undergraduate founding members, an executive board with a president
            and treasurer, and a full-time University advisor before a new organization can register.
            Every seat below is open. Tap a card to see what the role involves, then email us.
          </p>
          <a
            href={`mailto:${recruitEmail}`}
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#D1190D] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition-colors hover:bg-[#A8140A]"
          >
            I want to help start the chapter
          </a>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
          {officers.map((o) => (
            <EBoardCard
              key={o.id ?? `${o.role}-${o.name}`}
              name={o.name}
              role={o.role}
              img={o.img ?? undefined}
              bio={o.bio ?? undefined}
              linkedin={o.linkedin ?? undefined}
              email={o.email ?? undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

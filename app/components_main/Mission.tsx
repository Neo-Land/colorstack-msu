"use client";

import Image from "next/image";

interface MissionPhotos {
  eboard?: string;
  mission?: string;
  strategy?: string;
  vision?: string;
}

const cardDefs = [
  {
    slot: "mission" as keyof MissionPhotos,
    title: "Mission",
    description:
      "Increase the number of Black and Latinx computing graduates at Montclair State who go on to launch rewarding technical careers.",
    fallback: "/tiles/mission.svg",
  },
  {
    slot: "strategy" as keyof MissionPhotos,
    title: "Strategy",
    description:
      "Pair on-campus community and programming with ColorStack's national resources so every member is equipped to finish their degree and land a technical job.",
    fallback: "/tiles/strategy.svg",
  },
  {
    slot: "vision" as keyof MissionPhotos,
    title: "Vision",
    description:
      "Red Hawks at the forefront of innovation, and a future where Black and Latinx technologists lead the field.",
    fallback: "/tiles/vision.svg",
  },
];

const bulletPoints = [
  {
    title: "Community on campus",
    description: "Study groups, peer mentorship, and a home base for computing students who share your background",
  },
  {
    title: "National network",
    description: "Career fairs, a national resume book, scholarships, and industry mentors through ColorStack",
  },
  {
    title: "Every skill level",
    description: "A place to grow whether you are in your first CS class or prepping for a full-time offer",
  },
];

export default function Mission({ missionPhotos = {} }: { missionPhotos?: MissionPhotos }) {
  const eboardSrc = missionPhotos.eboard ?? "/tiles/founding-team.svg";
  const cards = cardDefs.map((c) => ({ ...c, img: missionPhotos[c.slot] ?? c.fallback }));

  return (
    <section
      id="mission"
      aria-label="ColorStack at Montclair State mission, strategy, and vision"
      className="relative w-full overflow-hidden bg-[#f7f8fb] px-6 py-14 md:py-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[#D1190D]">
              What We Do
            </p>

            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl lg:text-6xl">
              ColorStack <span className="text-[#D1190D]">Montclair State</span>
            </h2>

            <p className="mt-5 max-w-[42rem] text-base font-medium leading-7 text-slate-700 md:text-lg">
              A student-led chapter dedicated to helping Black and Latinx computing students at
              MSU build community, graduate strong, and launch rewarding technical careers.{" "}
              <span className="font-semibold text-slate-950">Everyone is invited.</span>
            </p>
          </div>

          <div className="group relative w-full overflow-hidden rounded-xl shadow-[0_24px_70px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
            <Image
              src={eboardSrc}
              alt="ColorStack at Montclair State founding team"
              width={1400}
              height={700}
              className="block aspect-[1.86/1] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-7 py-5">
              <p className="text-[0.98rem] font-bold text-white/95">
                Founding team
              </p>
              <span className="text-sm font-semibold text-white/45">
                2026-2027
              </span>
            </div>
          </div>
        </div>

        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {bulletPoints.map((bp) => (
            <li key={bp.title} className="py-1.5 pr-5">
              <p className="text-[0.9rem] font-semibold leading-6 text-slate-950">{bp.title}</p>
              <p className="mt-0.5 text-sm leading-6 text-slate-600">{bp.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative min-h-64 overflow-hidden rounded-xl bg-[#111827] ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-[#D1190D]/45"
            >
              <div className="absolute inset-0">
                <Image
                  src={card.img}
                  alt=""
                  fill
                  className="object-cover opacity-55 saturate-[1.15] transition-all duration-300 group-hover:scale-[1.025] group-hover:opacity-70"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-br from-[#D1190D]/55 via-[#111827]/50 to-[#020617]/80" />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-black/20" />

              <div className="relative z-10 p-7">
                <h3 className="text-[1.45rem] font-bold leading-8 text-white">{card.title}</h3>
                <p className="mt-3 max-w-[21rem] text-[0.95rem] leading-6 text-white/65">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

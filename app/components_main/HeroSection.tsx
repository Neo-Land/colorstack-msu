"use client"
import Link from "next/link";
import Masonry from "../reactBitsComponents/Masonry";
import { MapPin } from "lucide-react";
import { externalLinks, siteConfig } from "../seo";

interface HeroPhoto {
  id: string;
  img_path: string;
  url: string;
  height: number;
  sort_order: number;
}

export default function HeroSection({ items }: { items: HeroPhoto[] }) {
  const masonryItems = items.map((p) => ({
    id: p.id,
    img: p.img_path,
    url: p.url,
    height: p.height,
  }));

  return (
    <section
      id="hero"
      aria-label="Introduction to ColorStack at Montclair State University"
      className="flex-1 min-h-[calc(100vh-3.5rem)] flex flex-col md:min-h-screen md:flex-row items-center max-w-7xl mx-auto w-full md:gap-10 xl:gap-26 px-5 sm:px-6 md:px-8 xl:px-0 overflow-x-clip"
    >
      {/* Left: Masonry (desktop only) */}
      <div className="hidden md:flex flex-[1.5] items-center justify-center -mt-120 xl:mr-30">
        <Masonry
          items={masonryItems}
          ease="power2.out"
          duration={0.3}
          stagger={0.17}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
          referenceWidth={400}
        />
      </div>

      {/* Right: About text */}
      <div className="flex-1 flex flex-col items-center gap-5 min-w-0 md:items-start xl:-translate-x-20 md:mb-15 w-full px-0 pt-14 pb-6 text-center md:px-0 md:py-0 md:text-left">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <p className="text-[#D1190D] font-semibold text-xs tracking-[0.2em] uppercase">
            Proposed chapter · {siteConfig.university}
          </p>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h1 className="text-slate-950 font-extrabold text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight">
            ColorStack <span className="text-[#D1190D]">Montclair State</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="max-w-[18rem] text-base font-medium leading-snug text-slate-700 sm:max-w-md sm:text-xl md:text-2xl">
          Helping Black and Latinx computing students at MSU get{" "}
          <span className="text-[#D1190D] font-bold italic">degreed</span> and{" "}
          <span className="text-[#D1190D] font-bold italic">hired</span>.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 mt-3">
          <Link
            href="/proposal"
            className="bg-[#D1190D] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#A8140A] active:scale-95 transition-all duration-200 shadow-lg shadow-red-900/40 sm:px-8"
          >
            Read the proposal
          </Link>
          <Link
            href="/join"
            className="border-2 border-[#D1190D] text-[#D1190D] font-semibold px-7 py-3 rounded-full hover:bg-[#D1190D] hover:text-white active:scale-95 transition-all duration-200 sm:px-8"
          >
            Join the founding team
          </Link>
        </div>

        <a
          href={externalLinks.colorstackMemberRequirements}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-500 underline-offset-4 hover:text-[#D1190D] hover:underline"
        >
          Already an MSU student? Apply for free ColorStack national membership
        </a>

        {/* Location */}
        <div className="flex max-w-[18rem] items-center justify-center gap-2 text-slate-500 text-sm mt-1 md:justify-start">
          <MapPin size={14} className="text-[#D1190D] shrink-0" />
          <span>
            {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality},{" "}
            {siteConfig.address.addressRegion}
          </span>
        </div>
      </div>

      {/* Mobile version for Masonry */}
      <div className="md:hidden w-full pb-10">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 sm:-mx-6 sm:px-6">
          {items.slice(0, 8).map((item) => (
            <a
              key={item.id}
              href={item.url}
              aria-label="ColorStack at Montclair State highlight"
              className="flex-none snap-center"
            >
              <img
                src={item.img_path}
                alt=""
                className="h-52 w-auto max-w-[70vw] rounded-2xl object-contain"
                draggable={false}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

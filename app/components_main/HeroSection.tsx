import Link from "next/link";
import { MapPin } from "lucide-react";
import HeroMosaic, { type HeroPhoto } from "./HeroMosaic";
import { externalLinks, siteConfig } from "../seo";

export default function HeroSection({ photos }: { photos: HeroPhoto[] }) {
  return (
    <section
      id="hero"
      aria-label="Introduction to ColorStack at Montclair State University"
      className="w-full overflow-x-clip px-5 pt-12 pb-10 sm:px-6 md:pt-16 lg:px-8 lg:pt-20 lg:pb-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        {/* Text */}
        <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <p className="text-[#D1190D] font-semibold text-xs tracking-[0.2em] uppercase">
            Proposed chapter · {siteConfig.university}
          </p>

          <h1 className="text-slate-950 font-extrabold leading-[0.98] tracking-tight text-[clamp(2.5rem,9vw,4rem)] lg:text-[clamp(3rem,4.6vw,4.75rem)]">
            ColorStack <span className="text-[#D1190D]">Montclair State</span>
          </h1>

          <p className="max-w-md text-base font-medium leading-snug text-slate-700 sm:text-xl lg:max-w-lg lg:text-2xl">
            Helping Black and Latinx computing students at MSU get{" "}
            <span className="text-[#D1190D] font-bold italic">degreed</span> and{" "}
            <span className="text-[#D1190D] font-bold italic">hired</span>.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/proposal"
              className="whitespace-nowrap bg-[#D1190D] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#A8140A] active:scale-95 transition-all duration-200 shadow-lg shadow-red-900/40 sm:px-8"
            >
              Read the proposal
            </Link>
            <Link
              href="/join"
              className="whitespace-nowrap border-2 border-[#D1190D] text-[#D1190D] font-semibold px-7 py-3 rounded-full hover:bg-[#D1190D] hover:text-white active:scale-95 transition-all duration-200 sm:px-8"
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

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={14} className="text-[#D1190D] shrink-0" />
            <span>
              {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality},{" "}
              {siteConfig.address.addressRegion}
            </span>
          </div>
        </div>

        {/* Mosaic */}
        <HeroMosaic photos={photos} />
      </div>
    </section>
  );
}

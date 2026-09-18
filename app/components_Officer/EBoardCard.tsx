"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { useState } from "react";

interface EBoardCardProps {
  name: string;
  role: string;
  img?: string | null;
  bio?: string;
  linkedin?: string;
  email?: string;
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-8.34 14.5v-6h-2v6zM9.67 8.73a1.17 1.17 0 1 0 0-2.34 1.17 1.17 0 0 0 0 2.34m8.83 8.77v-3.28c0-1.76-.38-3.11-2.44-3.11a2.14 2.14 0 0 0-1.93 1.06H14.1v-1.82h-1.92v7.15h2v-3.54c0-.93.18-1.83 1.33-1.83s1.16 1.08 1.16 1.89v3.48z" />
    </svg>
  );
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function EBoardCard({ name, role, img, bio, linkedin, email }: EBoardCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasPhoto = Boolean(img && img.trim());
  // Unfilled seats get a "+" instead of initials.
  const isOpenSeat = /\b(open|wanted|vacant|tbd)\b/i.test(name);

  const actionBaseClass =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.85rem] bg-slate-100 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition duration-200 hover:bg-[#D1190D] hover:text-white";

  return (
    <article className="relative aspect-[5/7] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_65px_rgba(15,23,42,0.18)]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-pressed={isOpen}
        aria-label={isOpen ? `Hide details for ${name}` : `Show details for ${name}`}
        className={`absolute inset-0 w-full text-left transition-opacity duration-300 ${isOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <div className="relative h-full w-full overflow-hidden">
          {hasPhoto ? (
            <Image
              src={img as string}
              alt={`${name}, ${role}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-[#D1190D] via-[#8f1109] to-[#1a1a1a]">
              <div className="absolute inset-0 grid place-items-center">
                <span className={`font-extrabold tracking-tight text-white/80 ${isOpenSeat ? "text-8xl font-light" : "text-6xl"}`}>
                  {isOpenSeat ? "+" : initialsOf(name) || "?"}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/22 to-transparent opacity-95" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-white drop-shadow-sm">
              {name}
            </h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
              {role}
            </p>
          </div>
        </div>
      </button>

      <div
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
        className={`absolute inset-0 bg-white px-7 text-left text-slate-950 transition-all duration-300 sm:px-8 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex h-full flex-col justify-center">
          <div className="mb-5 h-[3px] w-10 rounded-full bg-[#D1190D]" />
          <h3 className="text-[1.22rem] font-bold leading-tight text-slate-950 sm:text-[1.28rem]">
            {name}
          </h3>
          <p className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#D1190D]">
            {role}
          </p>
          <p className="mt-5 max-w-[30ch] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.92rem]">
            {bio ?? "Leadership profile coming soon."}
          </p>
          <div className="mt-7 flex items-center gap-3">
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className={actionBaseClass}
                onClick={(event) => event.stopPropagation()}
              >
                <LinkedInIcon />
              </a>
            ) : (
              <span aria-hidden="true" className={actionBaseClass}>
                <LinkedInIcon />
              </span>
            )}

            {email ? (
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${name}`}
                className={actionBaseClass}
                onClick={(event) => event.stopPropagation()}
              >
                <Mail size={20} />
              </a>
            ) : (
              <span aria-hidden="true" className={actionBaseClass}>
                <Mail size={20} />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

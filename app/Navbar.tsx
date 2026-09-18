"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "./seo";

/* Navbar links. The first three render left of the logo, the rest render right of it. */
const NavbarLinkNames = [
  { label: "Proposal", href: "/proposal" },
  { label: "Opportunities", href: "/Components_Fellowships" },
  { label: "Resources", href: "/Components_Resources" },
  { label: "Team", href: "/officers" },
  { label: "Join", href: "/join" },
  { label: "Sponsorship", href: "/sponsorship" },
];

const linkClass =
  "text-slate-900 text-[15px] font-semibold tracking-wide hover:text-[#D1190D] transition-colors whitespace-nowrap";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#f7f8fb]/95 shadow-[0_10px_35px_-28px_rgba(15,23,42,0.9)] backdrop-blur">
      {/* Desktop */}
      <div className="hidden lg:flex max-w-6xl mx-auto items-center justify-between py-4 px-6 xl:px-8">
        {/* Left links */}
        <div className="flex flex-1 items-center gap-5 xl:gap-7">
          {NavbarLinkNames.slice(0, 3).map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center logo + wordmark */}
        <Link href="/" className="mx-5 flex shrink-0 items-center gap-2 xl:mx-8">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <span className="text-slate-950 font-bold tracking-tight whitespace-nowrap text-[20px]">
            ColorStack{" "}
            <span className="text-[#D1190D]">
              <span className="xl:hidden">MSU</span>
              <span className="hidden xl:inline">Montclair State</span>
            </span>
          </span>
        </Link>

        {/* Right links + login pill */}
        <div className="flex flex-1 items-center justify-end gap-5 xl:gap-7">
          {NavbarLinkNames.slice(3).map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/Components_Login"
            className="border-2 border-[#D1190D] text-[#D1190D] text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-[#D1190D] hover:text-white transition-colors whitespace-nowrap"
          >
            Log In
          </Link>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={28}
            height={28}
            className="object-contain"
            priority
          />
          <span className="text-slate-950 font-bold text-sm tracking-tight">
            MSU <span className="text-[#D1190D]">ColorStack</span>
          </span>
        </Link>

        {/* Burger button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-950 p-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden flex flex-col gap-4 border-t border-slate-200 bg-[#f7f8fb] px-5 pb-4 pt-4 shadow-sm">
          {NavbarLinkNames.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-slate-900 text-sm font-medium tracking-wide hover:text-[#D1190D] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/Components_Login"
            onClick={() => setOpen(false)}
            className="self-start border-2 border-[#D1190D] text-[#D1190D] text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-[#D1190D] hover:text-white transition-colors"
          >
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
}

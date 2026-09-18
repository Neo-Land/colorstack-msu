"use client";

import Link from "next/link";
import { externalLinks, siteConfig } from "../seo";

const MailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const DiscordIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const InstagramIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedInIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-8.34 14.5v-6h-2v6zM9.67 8.73a1.17 1.17 0 1 0 0-2.34 1.17 1.17 0 0 0 0 2.34m8.83 8.77v-3.28c0-1.76-.38-3.11-2.44-3.11a2.14 2.14 0 0 0-1.93 1.06H14.1v-1.82h-1.92v7.15h2v-3.54c0-.93.18-1.83 1.33-1.83s1.16 1.08 1.16 1.89v3.48z" />
  </svg>
);

/* Only links with a value render, so unused socials can stay blank in seo.ts. */
const socials = [
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: MailIcon },
  { label: "Instagram", href: siteConfig.instagram, icon: InstagramIcon },
  { label: "Discord", href: siteConfig.discord, icon: DiscordIcon },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedInIcon },
].filter((s) => Boolean(s.href));

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-200 bg-[#f7f8fb]">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-10 pb-6 sm:px-8 sm:pt-12 sm:pb-8">
        {/* Top section - 4 columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1.05fr_0.75fr] lg:gap-x-14 lg:justify-items-stretch">
          {/* Col 1 - Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#D1190D]">
              {siteConfig.name}
            </p>
            <h2 className="text-3xl font-extrabold text-slate-950 leading-tight sm:text-4xl">
              Connect<br />
              <span className="text-[#D1190D]">with us.</span>
            </h2>
            <p className="max-w-sm text-sm leading-7 text-slate-600">
              A proposed student chapter dedicated to increasing the number of Black and Latinx
              computing graduates at Montclair State who go on to launch rewarding technical careers.
            </p>
          </div>

          {/* Col 2 - Quick links */}
          <div className="flex flex-col gap-3 lg:pt-1">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Quick Links</p>
            {[
              { label: "Home", href: "/" },
              { label: "Proposal", href: "/proposal" },
              { label: "Draft constitution", href: "/constitution" },
              { label: "Founding team", href: "/officers" },
              { label: "Join us", href: "/join" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="w-fit text-sm font-medium text-slate-600 transition-colors hover:text-[#D1190D]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3 - Contact */}
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-600 lg:pt-1">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Contact</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-fit text-slate-950 transition-colors hover:text-[#D1190D]"
            >
              {siteConfig.email}
            </a>
            <p>{siteConfig.name}</p>
            <p>{siteConfig.university}</p>
            <p>{siteConfig.address.streetAddress}</p>
            <p>
              {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion}{" "}
              {siteConfig.address.postalCode}
            </p>
          </div>

          {/* Col 4 - Follow Us */}
          <div className="flex flex-col gap-3 lg:pt-1">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Follow Us</p>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 rounded-xl pr-3 text-slate-600 transition-colors hover:text-[#D1190D]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 shadow-sm transition-all group-hover:border-[#D1190D]/45 group-hover:bg-[#D1190D]/10 group-hover:text-[#D1190D]">
                    {s.icon}
                  </span>
                  <span className="text-sm font-medium">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs font-medium text-slate-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. A student-led initiative; not yet an
            officially registered MSU organization or ColorStack chapter.
          </p>
          <p className="text-xs font-medium text-slate-500">
            Campus photos by Shane Fleming, Daniel Case, and Adam Moss via{" "}
            <a
              href="https://commons.wikimedia.org/wiki/Category:Montclair_State_University"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 transition-colors hover:text-[#D1190D]"
            >
              Wikimedia Commons
            </a>{" "}
            (CC BY-SA). Seeking affiliation with the{" "}
            <a
              href={externalLinks.colorstack}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 transition-colors hover:text-[#D1190D]"
            >
              ColorStack National Network
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

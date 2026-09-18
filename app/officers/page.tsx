import type { Metadata } from "next";
import OfficerSection from "../components_Officer/OfficerSection";
import { siteConfig } from "../seo";

export const metadata: Metadata = {
  title: "Founding Team",
  description:
    "Meet the founding team of ColorStack at Montclair State and see which executive board seats are open for Black and Latinx computing students at MSU.",
  alternates: {
    canonical: "/officers",
  },
  openGraph: {
    title: `Founding Team | ${siteConfig.name}`,
    description:
      "Open executive board seats for the proposed ColorStack chapter at Montclair State University.",
    url: "/officers",
    images: [
      {
        url: "/photos/mission-hall.jpg",
        width: 1400,
        height: 700,
        alt: "ColorStack at Montclair State founding team",
      },
    ],
  },
};

export default function OfficersPage() {
  return (
    <main className="min-h-screen w-full bg-[#f7f8fb]">
      <OfficerSection />
    </main>
  );
}

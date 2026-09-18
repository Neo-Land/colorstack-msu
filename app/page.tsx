import { createOptionalClient } from "@/lib/supabase/server";
import HeroSection from "./components_main/HeroSection";
import WhereWeveLanded from "./components_main/WhereWeveLanded";
import Mission from "./components_main/Mission";
import PitchStrip from "./components_main/PitchStrip";
import Footer from "./components_main/Footer";
import { absoluteUrl, externalLinks, siteConfig } from "./seo";

/** Built-in hero tiles used until real chapter photos are uploaded via the admin panel. */
const fallbackHeroPhotos = [
  { id: "t1", img_path: "/tiles/hero-1.svg", url: "/proposal", height: 520, sort_order: 1 },
  { id: "t2", img_path: "/tiles/hero-2.svg", url: externalLinks.colorstack, height: 300, sort_order: 2 },
  { id: "t3", img_path: "/tiles/hero-3.svg", url: externalLinks.msuHispanicInitiatives, height: 380, sort_order: 3 },
  { id: "t4", img_path: "/tiles/hero-4.svg", url: externalLinks.colorstackWikipedia, height: 460, sort_order: 4 },
  { id: "t5", img_path: "/tiles/hero-5.svg", url: "/proposal", height: 320, sort_order: 5 },
  { id: "t6", img_path: "/tiles/hero-6.svg", url: externalLinks.colorstackImpactReport, height: 420, sort_order: 6 },
  { id: "t7", img_path: "/tiles/hero-7.svg", url: externalLinks.msuSchoolOfComputing, height: 360, sort_order: 7 },
  { id: "t8", img_path: "/tiles/hero-8.svg", url: "/officers", height: 300, sort_order: 8 },
];

export default async function Home() {
  const supabase = await createOptionalClient();

  const [heroRows, landingLogos, missionRows] = supabase
    ? await Promise.all([
        supabase.from("hero_photos").select("*").order("sort_order").then((r) => r.data),
        supabase.from("landing_logos").select("*").order("sort_order").then((r) => r.data),
        supabase.from("mission_photos").select("slot, img_path").then((r) => r.data),
      ])
    : [null, null, null];

  const heroPhotos =
    heroRows && heroRows.length > 0
      ? heroRows.map((p) => ({
          id: p.id as string,
          img_path: p.img_path as string,
          url: p.url as string,
          height: p.height as number,
          sort_order: p.sort_order as number,
        }))
      : fallbackHeroPhotos;

  const missionPhotos = Object.fromEntries(
    (missionRows ?? []).map((r) => [r.slot, r.img_path])
  );

  return (
    <main className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: absoluteUrl(siteConfig.logo),
            image: absoluteUrl(siteConfig.ogImage),
            email: siteConfig.email,
            sameAs: [siteConfig.instagram, externalLinks.colorstack].filter(Boolean),
            address: {
              "@type": "PostalAddress",
              ...siteConfig.address,
            },
            parentOrganization: {
              "@type": "Organization",
              name: "ColorStack",
              url: externalLinks.colorstack,
            },
          }),
        }}
      />
      <div className="md:-translate-y-7 xl:ml-35">
        <HeroSection items={heroPhotos} />
      </div>
      <PitchStrip />
      <WhereWeveLanded logos={landingLogos && landingLogos.length > 0 ? landingLogos : undefined} />
      <Mission missionPhotos={missionPhotos} />
      <Footer />
    </main>
  );
}

import { createPublicClient } from "@/lib/supabase/public";
import HeroSection from "./components_main/HeroSection";
import WhereWeveLanded from "./components_main/WhereWeveLanded";
import Mission from "./components_main/Mission";
import PitchStrip from "./components_main/PitchStrip";
import Footer from "./components_main/Footer";
import { absoluteUrl, externalLinks, siteConfig } from "./seo";
import { heroPhotos as defaultHeroPhotos } from "./campusPhotos";
import type { HeroPhoto } from "./components_main/HeroMosaic";

export default async function Home() {
  const supabase = createPublicClient();

  const [heroRows, landingLogos, missionRows] = supabase
    ? await Promise.all([
        supabase.from("hero_photos").select("*").order("sort_order").then((r) => r.data),
        supabase.from("landing_logos").select("*").order("sort_order").then((r) => r.data),
        supabase.from("mission_photos").select("slot, img_path").then((r) => r.data),
      ])
    : [null, null, null];

  // Photos uploaded through the admin panel replace the built-in campus photos.
  const heroPhotos: HeroPhoto[] =
    heroRows && heroRows.length > 0
      ? heroRows.map((p) => ({
          src: p.img_path as string,
          alt: "ColorStack at Montclair State community photo",
          href: (p.url as string) || undefined,
        }))
      : defaultHeroPhotos;

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
      <HeroSection photos={heroPhotos} />
      <PitchStrip />
      <WhereWeveLanded logos={landingLogos && landingLogos.length > 0 ? landingLogos : undefined} />
      <Mission missionPhotos={missionPhotos} />
      <Footer />
    </main>
  );
}

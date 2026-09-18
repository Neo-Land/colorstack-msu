/**
 * Single source of truth for chapter branding, links, and contact details.
 * Update the placeholders below once the chapter has its own accounts.
 */
export const siteConfig = {
  name: "ColorStack at Montclair State",
  shortName: "MSU ColorStack",
  university: "Montclair State University",
  universityShort: "Montclair State",
  title: "ColorStack at Montclair State - Black and Latinx Computing Community at MSU",
  // Public URL of the deployed site (GitHub Pages). Change when a custom domain is set up.
  url: "https://neo-land.github.io/colorstack-msu",
  description:
    "A proposed ColorStack chapter at Montclair State University supporting Black and Latinx computing students with community, mentorship, career resources, and a direct line to ColorStack's national network.",
  // Placeholder inbox. Replace with the chapter's real email.
  email: "colorstackmsu@gmail.com",
  // Social links. Leave a value empty ("") to hide it from the footer.
  instagram: "https://www.instagram.com/colorstackmsu/",
  discord: "",
  linkedin: "",
  // Student interest form. Swap for a Google Form / Engage link when ready.
  interestForm:
    "mailto:colorstackmsu@gmail.com?subject=ColorStack%20at%20Montclair%20State%20-%20I%27m%20interested",
  founded: "Proposed Fall 2026",
  address: {
    streetAddress: "1 Normal Avenue",
    addressLocality: "Montclair",
    addressRegion: "NJ",
    postalCode: "07043",
    addressCountry: "US",
  },
  logo: "/mainPhotos/colorstack-msu-logo.svg",
  ogImage: "/tiles/community.svg",
};

/** External links referenced across the site. */
export const externalLinks = {
  colorstack: "https://www.colorstack.org",
  colorstackApply: "https://app.colorstack.io/apply",
  colorstackMemberRequirements: "https://www.colorstack.org/member-application-requirements",
  colorstackChapters: "https://wiki.colorstack.org/the-colorstack-family/community/chapters-of-colorstack",
  colorstackChapterInterestForm: "https://share.hsforms.com/1mmjTavymRsiLAdCX-90JkAck32i",
  colorstackImpactReport: "https://www.colorstack.org/impact-report",
  colorstackWiki: "https://wiki.colorstack.org",
  colorstackEmail: "hello@colorstack.org",
  msuEngageRegister: "https://montclair.campuslabs.com/engage/register",
  msuEngageOrgs: "https://montclair.campuslabs.com/engage/organizations",
  msuRsoInfo:
    "https://inside.montclair.edu/campus-life-and-recreation/student-governments/registered-student-organizations",
  msuSchoolOfComputing:
    "https://inside.montclair.edu/colleges-schools-research/math-science/school-computing",
  msuSchoolOfComputingFaculty:
    "https://inside.montclair.edu/colleges-schools-research/math-science/school-computing/faculty-and-staff",
  msuHispanicInitiatives:
    "https://inside.montclair.edu/departments/office-hispanic-initiatives-oficina-de-iniciativas-hispanas",
  msuWikipedia: "https://en.wikipedia.org/wiki/Montclair_State_University",
  colorstackWikipedia: "https://en.wikipedia.org/wiki/ColorStack",
};

// Trailing slash so Next's metadata resolution keeps the sub-path (e.g. /colorstack-msu/).
export const siteUrl = new URL(`${siteConfig.url.replace(/\/$/, "")}/`);

/** Joins a site-relative path onto the public URL, preserving any sub-path. */
export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

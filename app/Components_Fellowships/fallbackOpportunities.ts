import type { OpportunityCard } from "./OpportunityTabs";

/**
 * Built-in opportunity cards shown when Supabase is not connected or the
 * `programs` table is empty. Dates change every year, so each card points at
 * the official site instead of hard-coding a deadline. Update `CHECKED_ON`
 * whenever you re-verify the links.
 */
const CHECKED_ON = "2026-09-17";

const hackathon = (
  id: string,
  title: string,
  host: string,
  location: string,
  description: string,
  link: string,
  image: string,
  proximity: number,
  season: string
): OpportunityCard => ({
  id,
  image,
  college_image: null,
  host_name: host,
  location,
  title,
  description,
  deadline: season,
  tag: "Hackathon",
  eligibility: "Undergraduates; check the site for team size and school restrictions",
  link,
  timeline_status: "Expected",
  timeline: season,
  previous_timeline: null,
  sort_order: proximity,
  opportunity_type: "hackathon",
  proximity_rank: proximity,
  source_checked_on: CHECKED_ON,
});

const program = (
  id: string,
  title: string,
  host: string,
  description: string,
  link: string,
  image: string,
  eligibility: string,
  season: string,
  sort: number
): OpportunityCard => ({
  id,
  image,
  college_image: null,
  host_name: host,
  location: null,
  title,
  description,
  deadline: season,
  tag: "Program",
  eligibility,
  link,
  timeline_status: "Expected",
  timeline: season,
  previous_timeline: null,
  sort_order: sort,
  opportunity_type: "program",
  proximity_rank: sort,
  source_checked_on: CHECKED_ON,
});

export const fallbackOpportunities: OpportunityCard[] = [
  // Hackathons, ordered by distance from Montclair, NJ
  hackathon(
    "hacknjit",
    "HackNJIT",
    "New Jersey Institute of Technology",
    "Newark, NJ · ~15 min",
    "NJIT's flagship 24-hour hackathon, one of the closest large hackathons to campus.",
    "https://hacknjit.org",
    "/resources/campuses/njit.jpg",
    1,
    "Recurring annually; check the site for the next date"
  ),
  hackathon(
    "girlhacks",
    "GirlHacks",
    "New Jersey Institute of Technology",
    "Newark, NJ · ~15 min",
    "A beginner-friendly hackathon at NJIT centered on women and gender-minority technologists. Allies welcome.",
    "https://girlhacks.tech",
    "/resources/hackathons/girlhacks.png",
    2,
    "Recurring annually; check the site for the next date"
  ),
  hackathon(
    "hackru",
    "HackRU",
    "Rutgers University",
    "New Brunswick, NJ · ~45 min",
    "Rutgers' student-run hackathon, held each semester and open to students from any school.",
    "https://hackru.org",
    "/resources/campuses/rutgers.jpg",
    3,
    "Recurring each semester; check the site for the next date"
  ),
  hackathon(
    "hackhers",
    "HackHers",
    "Rutgers University",
    "New Brunswick, NJ · ~45 min",
    "A hackathon focused on women and non-binary students at Rutgers with workshops for first-timers.",
    "https://hackhers.rutgers.edu",
    "/resources/hackathons/hackhers.png",
    4,
    "Recurring annually; check the site for the next date"
  ),
  hackathon(
    "divhacks",
    "DivHacks",
    "Columbia University",
    "New York, NY · ~40 min",
    "Columbia's diversity-focused hackathon built for underrepresented students in tech.",
    "https://www.divhacks.com",
    "/resources/campuses/columbia.jpg",
    5,
    "Recurring annually; check the site for the next date"
  ),
  hackathon(
    "hackknight",
    "Hack Knight",
    "Queens College, CUNY",
    "Queens, NY · ~1 hr",
    "A CUNY hackathon that welcomes students from across the New York metro area.",
    "https://hackknight.io",
    "/resources/campuses/queens-college.jpg",
    6,
    "Recurring annually; check the site for the next date"
  ),
  hackathon(
    "hackprinceton",
    "HackPrinceton",
    "Princeton University",
    "Princeton, NJ · ~1 hr",
    "Princeton's semesterly hackathon with hardware and software tracks.",
    "https://hackprinceton.com",
    "/resources/campuses/princeton.jpg",
    7,
    "Recurring each semester; check the site for the next date"
  ),
  hackathon(
    "sbuhacks",
    "SBUHacks",
    "Stony Brook University",
    "Stony Brook, NY · ~2 hr",
    "Stony Brook's annual hackathon, home to one of the newest ColorStack chapters.",
    "https://sbuhacks.org",
    "/resources/campuses/stony-brook.jpg",
    8,
    "Recurring annually; check the site for the next date"
  ),
  hackathon(
    "hackmit",
    "HackMIT",
    "Massachusetts Institute of Technology",
    "Cambridge, MA · ~4 hr",
    "One of the largest collegiate hackathons in the country. Travel funding is sometimes available.",
    "https://hackmit.org",
    "/resources/campuses/mit.jpg",
    9,
    "Recurring annually in the fall; check the site for the next date"
  ),

  // Programs and fellowships
  program(
    "colorstack-membership",
    "ColorStack National Membership",
    "ColorStack",
    "Free membership unlocks the national Slack community, career fairs, the resume book, Fam Fridays, mock interviews, AlgoExpert access, and the Family Fund.",
    "https://app.colorstack.io/apply",
    "/resources/programs/colorstack-family.svg",
    "Undergraduates in CS or a closely related major who identify as Black, Latinx, Native American, or a demonstrated ally",
    "Rolling applications",
    1
  ),
  program(
    "codepath",
    "CodePath Courses",
    "CodePath",
    "Free, credit-optional courses in technical interview prep, web, iOS, Android, and cybersecurity, with a strong track record placing underrepresented students in internships.",
    "https://www.codepath.org",
    "/resources/programs/codepath.svg",
    "Undergraduates; many courses target first- and second-year students",
    "Cohorts open each fall and spring",
    2
  ),
  program(
    "google-step",
    "Google STEP Internship",
    "Google",
    "A 12-week developmental internship for first- and second-year undergraduates from historically underrepresented groups in tech.",
    "https://buildyourfuture.withgoogle.com/programs/step",
    "/resources/programs/google-step.svg",
    "First- and second-year undergraduates",
    "Applications typically open in the fall",
    3
  ),
  program(
    "microsoft-explore",
    "Microsoft Explore Internship",
    "Microsoft",
    "A rotational internship for first- and second-year students to explore software engineering and program management.",
    "https://careers.microsoft.com/students",
    "/resources/programs/microsoft-explore.svg",
    "First- and second-year undergraduates",
    "Applications typically open in the fall",
    4
  ),
  program(
    "meta-university",
    "Meta University",
    "Meta",
    "A paid 10-week training and internship program for underrepresented students early in their college careers.",
    "https://www.metacareers.com/careerprograms/pathways/metauniversity",
    "/resources/programs/meta-university.svg",
    "First- and second-year undergraduates",
    "Applications typically open in the fall",
    5
  ),
  program(
    "code2040",
    "Code2040 Fellows Program",
    "Code2040",
    "A summer fellowship pairing Black and Latinx computing students with paid internships at partner companies plus a racial-equity leadership curriculum.",
    "https://www.code2040.org",
    "/resources/programs/code2040.svg",
    "Black and Latinx undergraduate and graduate students",
    "Applications typically open in the fall",
    6
  ),
  program(
    "mlt-career-prep",
    "MLT Career Prep",
    "Management Leadership for Tomorrow",
    "An 18-month career-readiness program with one-on-one coaching for Black, Latinx, and Native American undergraduates.",
    "https://mlt.org/career-prep",
    "/resources/programs/mlt.svg",
    "Sophomores at four-year institutions",
    "Applications typically open in the spring",
    7
  ),
  program(
    "nsbe-shpe",
    "NSBE and SHPE National Conventions",
    "NSBE / SHPE",
    "Two of the largest career fairs for Black and Hispanic engineers and technologists. ColorStack's Family Fund has helped members cover travel.",
    "https://www.nsbe.org",
    "/resources/programs/nsbe-shpe.svg",
    "Student members; conventions run each fall (SHPE) and spring (NSBE)",
    "Recurring annually",
    8
  ),
];

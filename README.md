# ColorStack at Montclair State

Website for the proposed ColorStack chapter at Montclair State University. It does two jobs:

1. **Pitch site for MSU administrators.** `/proposal` makes the case for the chapter with sourced facts about MSU, ColorStack, the registration requirements, and a three-semester roadmap. `/constitution` is a complete draft constitution ready for the Engage registration form.
2. **Chapter site once the club exists.** Home, Opportunities (hackathons near Montclair, national programs, MSU research), Resources, Founding Team, Sponsorship, and a password-protected admin panel for updating content without touching code.

Built on the open-source [ColorStack Stevens Chapter](https://github.com/MatiasPF1/Colorstack-Stevens-Chapter) site (Next.js 16, React 19, Tailwind 4, Supabase), rebranded for Montclair State and extended with the proposal, constitution, and built-in fallback content so it runs with zero configuration.

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are needed for the public pages.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, why-MSU facts, national partner logos, mission |
| `/proposal` | The pitch for administrators, with a sources list |
| `/constitution` | Draft constitution for SGA review |
| `/Components_Fellowships` | Hackathons ordered by distance from campus, programs, MSU research clusters, learning resources |
| `/Components_Resources` | Membership application, proposal, constitution, Engage registration, ColorStack wiki |
| `/officers` | Founding team with every seat marked open |
| `/sponsorship` | Proposed sponsorship tiers |
| `/Components_Login` and `/components_Admin` | Admin panel (requires Supabase) |

## Things to update before you share the site

All branding and contact details live in one file: [`app/seo.ts`](app/seo.ts).

- `email` is a placeholder (`colorstackmsu@gmail.com`). Create the inbox or change it.
- `url` is a placeholder domain. Change it when you register one; it drives canonical URLs, the sitemap, and Open Graph tags.
- `instagram` points at a handle that may not exist yet. Set `discord` and `linkedin` when you have them. Empty strings hide the link.
- `interestForm` is a `mailto:` link. Swap in a Google Form or Engage link when you have one.

Other places with content you will want to personalize:

- `app/components_Officer/OfficerSection.tsx`: the founding-team roster (or manage it from the admin panel).
- `app/Components_Fellowships/fallbackOpportunities.ts`: hackathon and program cards. Update `CHECKED_ON` when you re-verify links.
- `app/proposal/page.tsx`: the roadmap dates assume a Fall 2026 start. The facts and sources are current as of September 2026; confirm enrollment numbers with MSU Institutional Research before quoting them in University materials.
- `public/tiles/*.svg`: generated placeholder artwork. Replace hero tiles with real photos through the admin panel once the chapter has them. To change the placeholder text, edit and run `node scripts/generate-tiles.mjs`.

## Brand

- Primary red `#D1190D` (Montclair State red, Pantone 200 C). Hover `#A8140A`, deep `#B0150B`.
- Neutral text uses Tailwind slate. Background `#f7f8fb`.
- Logo: `public/mainPhotos/colorstack-msu-logo.svg` (a simple stack mark; ColorStack national may provide official chapter marks once affiliated).

## Admin panel and Supabase (optional)

The admin panel lets officers upload hero photos, edit the officer roster, and manage resource and opportunity cards. To enable it:

1. Create a Supabase project and copy `.env.example` to `.env.local` with your URL and anon key.
2. Create a user in Supabase Auth and set `ALLOWED_EMAIL` to that address.
3. Create these public Storage buckets: `hero-photos`, `landing-logos`, `mission-photos`, `officer-images`, `program-images`, `resource-images`.
4. Create these tables (all with `id uuid primary key default gen_random_uuid()` and `created_at timestamptz default now()`):

| Table | Columns |
| --- | --- |
| `hero_photos` | `img_path text`, `url text`, `height int`, `sort_order int` |
| `landing_logos` | `name text`, `alt text`, `src text`, `sort_order int` |
| `mission_photos` | `slot text unique` (`eboard`, `mission`, `strategy`, `vision`), `img_path text` |
| `eboard_members` | `name text`, `role text`, `img text`, `bio text`, `linkedin text`, `email text`, `sort_order int`, `is_active bool default true` |
| `resources` | `title text`, `event text`, `description text`, `date text`, `image text`, `slides_url text`, `sort_order int`, `is_active bool default true` |
| `programs` | `title text`, `description text`, `image text`, `college_image text`, `host_name text`, `location text`, `deadline text`, `tag text`, `eligibility text`, `link text`, `timeline_status text`, `timeline text`, `previous_timeline text`, `sort_order int`, `opportunity_type text`, `proximity_rank int`, `source_checked_on date` |

5. Add row-level-security policies that allow anonymous `select` on every table and allow `insert`/`update`/`delete` only for authenticated users. `supabase/resources_setup.sql` is a worked example for the `resources` table, including its bucket and policies.
6. If your Supabase hostname is not `*.supabase.co`, add it to `images.remotePatterns` in `next.config.ts`.

When any table is empty, the site falls back to the built-in content, so you can enable Supabase gradually.

## Deploy

The easiest path is [Vercel](https://vercel.com/new): import the repo, add the three environment variables if you are using Supabase, and deploy. The site is fully static-friendly without Supabase.

## Scripts

```bash
npm run dev     # local development
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Credits

Original site architecture and components by the ColorStack Stevens chapter team. ColorStack is a registered trademark of ColorStack, Inc.; this site is a student-led initiative seeking chapter affiliation and is not yet an official chapter.

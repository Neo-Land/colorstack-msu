<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project notes
- This is the ColorStack at Montclair State site. Branding, contact details, and external links live in `app/seo.ts`; import from there instead of hard-coding.
- Primary brand color is `#D1190D` (Montclair State red). Hover `#A8140A`, deep `#B0150B`.
- The site is a static export deployed to GitHub Pages. Do not add server actions, middleware/proxy, route handlers, or `cookies()`/`headers()` calls; they break `output: "export"`. Auth and data writes for the admin panel run in the browser against Supabase.
- Supabase is optional. Every public page must keep working when `NEXT_PUBLIC_SUPABASE_URL` is unset: use `createPublicClient()` from `lib/supabase/public.ts` and fall back to built-in content.
- Raw `<img src>` or CSS `url()` references to files in `public/` must go through `assetPath()` from `lib/assetPath.ts` so they work under the GitHub Pages sub-path. `next/link` and `next/image` handle it automatically.
- Facts on `/proposal` carry numbered citations that map to the `sources` array on that page. If you change a number, update or add its source.

## Visual QA
After any UI or styling change, run the dev server, open the affected page in the browser, and check layout, spacing, and responsiveness. Fix issues before finishing.

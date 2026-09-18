/**
 * Prefixes a site-relative path (e.g. "/photos/college-hall.jpg") with the deploy base path.
 * Needed only for raw <img src> and CSS background URLs; next/link and next/image
 * add the base path on their own. Absolute URLs are returned unchanged.
 */
export function assetPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${base}${path}`;
}

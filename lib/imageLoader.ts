import type { ImageLoaderProps } from "next/image";

/**
 * Image loader for static export. There is no optimizer on a static host, so
 * images are served as-is; this only prefixes site-relative paths with the
 * deploy base path (e.g. /colorstack-msu on GitHub Pages). Remote URLs pass through.
 */
export default function imageLoader({ src }: ImageLoaderProps) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  return `${base}${src}`;
}

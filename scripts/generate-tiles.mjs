// Regenerates the placeholder SVG artwork in public/tiles and public/resources/programs.
// Run from the project root: node scripts/generate-tiles.mjs
import { writeFileSync, mkdirSync } from "node:fs";
const RED = "#D1190D", DARK = "#B0150B", INK = "#1a1a1a";
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
mkdirSync("public/tiles", { recursive: true });
mkdirSync("public/mainPhotos", { recursive: true });
mkdirSync("public/resources/programs", { recursive: true });

// Rough glyph width for Inter/Arial bold, used to auto-fit long lines.
const CHAR_W = 0.58;

function tile({ file, w, h, lines, sub, variant }) {
  const bg = variant === "dark"
    ? `<rect width="${w}" height="${h}" fill="${INK}"/><circle cx="${w * 0.85}" cy="${h * 0.15}" r="${Math.max(w, h) * 0.45}" fill="${RED}" opacity="0.35"/>`
    : variant === "light"
      ? `<rect width="${w}" height="${h}" fill="#ffffff"/><rect x="0" y="0" width="${w}" height="10" fill="${RED}"/>`
      : `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${RED}"/><stop offset="1" stop-color="${DARK}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><circle cx="${w * 0.1}" cy="${h * 0.9}" r="${Math.max(w, h) * 0.4}" fill="#ffffff" opacity="0.08"/>`;
  const fg = variant === "light" ? INK : "#ffffff";
  const accent = variant === "light" ? RED : "rgba(255,255,255,0.75)";

  // Text is centered and auto-fitted so every line stays inside a safe zone of the
  // tile width. Tiles are rendered at their native aspect ratio, so nothing is cropped.
  const safeW = w * 0.8;
  const longest = Math.max(1, ...lines.map(l => l.length));
  let fs = Math.round(Math.min(w, h) * 0.095);
  fs = Math.min(fs, Math.floor(safeW / (longest * CHAR_W)));
  const subFs = Math.round(fs * 0.45);
  const subFit = sub ? Math.floor(safeW / (sub.length * 0.62)) : subFs;
  const subSize = Math.min(subFs, subFit);

  const cx = w / 2;
  const block = lines.length * fs * 1.15 + (sub ? subSize * 2 : 0);
  const startY = h / 2 - block / 2 + fs;
  const glyphY = startY - fs - 52;
  const stack = `<g transform="translate(${cx - 17},${glyphY})" fill="${fg}"><rect x="0" y="0" width="34" height="8" rx="4"/><rect x="6" y="14" width="28" height="8" rx="4"/><rect x="12" y="28" width="22" height="8" rx="4"/></g>`;
  const text = lines.map((l, i) => `<text x="${cx}" y="${startY + i * fs * 1.15}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="${fs}" fill="${fg}">${esc(l)}</text>`).join("");
  const subT = sub ? `<text x="${cx}" y="${startY + (lines.length - 1) * fs * 1.15 + subSize * 2}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="${subSize}" letter-spacing="1.5" fill="${accent}">${esc(sub.toUpperCase())}</text>` : "";
  writeFileSync(file, `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${bg}${lines.length ? stack : ""}${text}${subT}</svg>`);
}

// Logo: red rounded square with a white "stack" mark
writeFileSync("public/mainPhotos/colorstack-msu-logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="${RED}"/><g fill="#ffffff"><rect x="24" y="34" width="80" height="16" rx="8"/><rect x="34" y="56" width="60" height="16" rx="8"/><rect x="44" y="78" width="40" height="16" rx="8"/></g></svg>`);

// Resource tiles
tile({ file: "public/tiles/resource-apply.svg", w: 1200, h: 630, lines: ["Become a", "national member"], sub: "colorstack.org" });
tile({ file: "public/tiles/resource-wiki.svg", w: 1200, h: 630, lines: ["ColorStack", "Family Wiki"], sub: "wiki.colorstack.org", variant: "dark" });
tile({ file: "public/tiles/resource-engage.svg", w: 1200, h: 630, lines: ["Register", "on Engage"], sub: "Montclair State SGA", variant: "light" });
tile({ file: "public/tiles/resource-constitution.svg", w: 1200, h: 630, lines: ["Draft", "constitution"], sub: "For SGA review" });
tile({ file: "public/tiles/resource-proposal.svg", w: 1200, h: 630, lines: ["Chapter", "proposal"], sub: "For MSU administrators", variant: "dark" });
// Program tiles
const programs = [["codepath", "CodePath"], ["google-step", "Google STEP"], ["microsoft-explore", "Microsoft Explore"], ["meta-university", "Meta University"], ["code2040", "Code2040"], ["mlt", "MLT Career Prep"], ["colorstack-family", "ColorStack programs"], ["nsbe-shpe", "NSBE & SHPE"]];
programs.forEach(([id, name], i) => tile({ file: `public/resources/programs/${id}.svg`, w: 900, h: 500, lines: [name], sub: "Program", variant: ["red", "dark", "light"][i % 3] }));
console.log("generated");

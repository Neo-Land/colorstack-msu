"use client";

import Image from "next/image";
import Link from "next/link";

export interface HeroPhoto {
  src: string;
  alt: string;
  caption?: string;
  href?: string;
}

interface StatTile {
  kind: "stat";
  value: string;
  label: string;
  note?: string;
  href: string;
  variant: "red" | "dark" | "light";
}

interface PhotoTile {
  kind: "photo";
  photo: HeroPhoto;
  span: string;
}

type Tile = StatTile | PhotoTile;

const stats: StatTile[] = [
  { kind: "stat", value: "39%", label: "of MSU students are Hispanic or Latino", note: "Fall 2023", href: "/proposal", variant: "red" },
  { kind: "stat", value: "HSI", label: "Hispanic-Serving Institution since 2016", href: "/proposal", variant: "light" },
  { kind: "stat", value: "95", label: "ColorStack chapters. None at MSU yet.", note: "Feb 2026", href: "/proposal", variant: "dark" },
  { kind: "stat", value: "16k+", label: "ColorStack members nationwide. Membership is free.", note: "FY2025", href: "/join", variant: "red" },
];

const variantClass: Record<StatTile["variant"], string> = {
  red: "bg-linear-to-br from-[#D1190D] to-[#B0150B] text-white",
  dark: "bg-[#1a1a1a] text-white",
  light: "bg-white text-slate-950 border border-slate-200",
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function StatTileView({ tile }: { tile: StatTile }) {
  const inner = (
    <>
      <span className="absolute left-4 top-4 flex flex-col gap-[3px] opacity-80" aria-hidden="true">
        <span className="h-[3px] w-5 rounded-full bg-current" />
        <span className="ml-1 h-[3px] w-4 rounded-full bg-current" />
        <span className="ml-2 h-[3px] w-3 rounded-full bg-current" />
      </span>
      <span className="text-[clamp(1.6rem,4.2vw,2.4rem)] font-extrabold leading-none tracking-tight sm:text-[clamp(1.5rem,2.4vw,2.4rem)]">
        {tile.value}
      </span>
      <span className="mt-2 text-[clamp(0.72rem,1.7vw,0.9rem)] font-semibold leading-snug sm:text-[clamp(0.72rem,1vw,0.9rem)]">
        {tile.label}
      </span>
      {tile.note && (
        <span className={`mt-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] ${tile.variant === "light" ? "text-[#D1190D]" : "text-white/70"}`}>
          {tile.note}
        </span>
      )}
    </>
  );
  const className = `group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.6)] transition-transform duration-300 hover:-translate-y-0.5 ${variantClass[tile.variant]}`;
  return isExternal(tile.href) ? (
    <a href={tile.href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
  ) : (
    <Link href={tile.href} className={className}>{inner}</Link>
  );
}

function PhotoTileView({ tile }: { tile: PhotoTile }) {
  const { photo } = tile;
  const body = (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        priority={tile.span.includes("col-span-2")}
      />
      {photo.caption && (
        <>
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" aria-hidden="true" />
          <span className="absolute bottom-3 left-4 right-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/90">
            {photo.caption}
          </span>
        </>
      )}
    </>
  );
  const className = `group relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.6)] ${tile.span}`;
  if (!photo.href) return <div className={className}>{body}</div>;
  return isExternal(photo.href) ? (
    <a href={photo.href} target="_blank" rel="noopener noreferrer" className={className}>{body}</a>
  ) : (
    <Link href={photo.href} className={className}>{body}</Link>
  );
}

/**
 * Responsive hero mosaic: campus photos plus stat tiles in a CSS grid.
 * Two columns on phones, three from 640px up. Tiles never drop below ~150px,
 * and the whole mosaic is capped so it does not swallow large screens.
 */
export default function HeroMosaic({ photos }: { photos: HeroPhoto[] }) {
  // Photo slots, in order: big feature, then three singles.
  const spans = [
    "col-span-2 row-span-2 aspect-square", // feature (2x2)
    "aspect-square",
    "aspect-square",
    "col-span-2 aspect-[2/1]",
  ];
  const photoTiles: PhotoTile[] = photos.slice(0, 4).map((photo, i) => ({
    kind: "photo",
    photo,
    span: spans[i],
  }));

  // Interleaved so the grid fills exactly: 4 rows of 3 on desktop, 5 rows of 2 on phones.
  const order: Tile[] = [
    photoTiles[0],
    stats[0],
    stats[1],
    photoTiles[1],
    stats[2],
    photoTiles[2],
    stats[3],
    photoTiles[3],
  ].filter(Boolean) as Tile[];

  return (
    <div className="mx-auto grid w-full max-w-[600px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {order.map((tile, i) =>
        tile.kind === "photo" ? (
          <PhotoTileView key={`p-${i}`} tile={tile} />
        ) : (
          <StatTileView key={`s-${i}`} tile={tile} />
        )
      )}
    </div>
  );
}

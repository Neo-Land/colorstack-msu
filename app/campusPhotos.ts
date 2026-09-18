import type { HeroPhoto } from "./components_main/HeroMosaic";

/**
 * Campus photography. All files are Creative Commons BY-SA from Wikimedia Commons
 * and were resized for the web; attribution lives in the footer and in
 * public/photos/CREDITS.md. Swap in official MSU or chapter photos any time by
 * replacing the files in public/photos and updating the captions here.
 */
export const campusPhotos = {
  collegeHall: {
    src: "/photos/college-hall.jpg",
    alt: "College Hall at Montclair State University with red azaleas in bloom",
    caption: "College Hall",
    credit: "Shane Fleming, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:College_Hall_at_Montclair_State.jpg",
  },
  cupola: {
    src: "/photos/cupola.jpg",
    alt: "The red cupola and bell tower on College Hall against a blue sky",
    caption: "College Hall cupola",
    credit: "Daniel Case, CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Cupola_and_bell_tower,_College_Hall,_Montclair_State_University.jpg",
  },
  sign: {
    src: "/photos/campus-sign.jpg",
    alt: "Montclair State University wayfinding sign pointing to the Library and College Hall",
    caption: "1 Normal Avenue",
    credit: "Adam Moss, CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Montclair_State_University_(11257790925).jpg",
  },
  green: {
    src: "/photos/campus-green.jpg",
    alt: "A tree-lined walkway on the Montclair State campus in summer",
    caption: "Campus in summer",
    credit: "Adam Moss, CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Montclair_State_University_(14846095881).jpg",
  },
  redBuilding: {
    src: "/photos/red-building.jpg",
    alt: "A modern Montclair State academic building with red window panels",
    caption: "Montclair State University",
    credit: "Adam Moss, CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Montclair_State_University_(14849156335).jpg",
  },
  missionHall: {
    src: "/photos/mission-hall.jpg",
    alt: "A Spanish Mission-style academic building with a red tile roof on the Montclair State campus",
    caption: "Spanish Mission architecture",
    credit: "Adam Moss, CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Montclair_State_University_(14846716434).jpg",
  },
  quad: {
    src: "/photos/campus-quad.jpg",
    alt: "A sunlit walkway between trees and lawns on the Montclair State campus",
    caption: "Campus quad",
    credit: "Adam Moss, CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Montclair_State_University_(14662489960).jpg",
  },
  skyline: {
    src: "/photos/campus-skyline.jpg",
    alt: "Montclair State University campus buildings seen from a hilltop at dusk",
    caption: "Campus from the hilltop",
    credit: "Adam Moss, CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Montclair_State_University_(13023183544).jpg",
  },
} as const;

/** Default hero mosaic photos, in slot order: feature, single, single, wide. */
export const heroPhotos: HeroPhoto[] = [
  { ...campusPhotos.collegeHall, href: "/proposal" },
  { ...campusPhotos.cupola },
  { ...campusPhotos.sign },
  { ...campusPhotos.missionHall, href: "/join" },
];

export const photoCredits = Object.values(campusPhotos).map((p) => ({
  caption: p.caption,
  credit: p.credit,
  source: p.source,
}));

/**
 * Photo data: file paths, pixel sizes and captions.
 * Keys are the photo numbers used in `data-i` attributes in index.html.
 */

export const PHOTOS = {
  1: {
    src: "/images/photos/01-sneaker-wall-under-our-original-guarantee.webp",
    width: 1800,
    height: 1295,
    caption: "Sneaker wall under our Original Guarantee sign",
  },
  2: {
    src: "/images/photos/02-sports-shoes-with-the-1-year-warranty-sign.webp",
    width: 900,
    height: 1200,
    caption: "Sports shoes, with the 1-Year Warranty sign above",
  },
  3: {
    src: "/images/photos/03-sliders-and-flip-flops-in-every-colour.webp",
    width: 791,
    height: 1054,
    caption: "Sliders and flip-flops in every colour",
  },
  4: {
    src: "/images/photos/04-sneaker-wall-at-urbane-kausar-baugh.webp",
    width: 920,
    height: 690,
    caption: "Sneaker wall at urbané, Kausar Baugh",
  },
  5: {
    src: "/images/photos/05-sneakers-from-genuine-brands-ready-to-try.webp",
    width: 720,
    height: 960,
    caption: "Sneakers from genuine brands, ready to try on",
  },
  6: {
    src: "/images/photos/06-shirts-tees-and-trousers-on-the-rails.webp",
    width: 1400,
    height: 1051,
    caption: "Shirts, tees and trousers on the rails",
  },
  7: {
    src: "/images/photos/07-the-clothing-wall-under-the-brand-signs.webp",
    width: 1400,
    height: 1050,
    caption: "The clothing wall under the brand signs",
  },
  8: {
    src: "/images/photos/08-more-sneakers-on-the-wall.webp",
    width: 800,
    height: 1066,
    caption: "More sneakers on the wall",
  },
  9: {
    src: "/images/photos/09-sweaters-tees-and-joggers.webp",
    width: 791,
    height: 1054,
    caption: "Sweaters, tees and joggers",
  },
  10: {
    src: "/images/photos/10-puffer-jackets-and-polos.webp",
    width: 727,
    height: 969,
    caption: "Puffer jackets and polos",
  },
  11: {
    src: "/images/photos/11-casual-and-formal-shoes.webp",
    width: 614,
    height: 818,
    caption: "Casual and formal shoes",
  },
  12: {
    src: "/images/photos/12-jackets-ready-to-try.webp",
    width: 860,
    height: 1146,
    caption: "Jackets, ready to try",
  },
  13: {
    src: "/images/photos/13-polos-tees-and-jackets.webp",
    width: 791,
    height: 1054,
    caption: "Polos, tees and jackets",
  },
  14: {
    src: "/images/photos/14-polos-and-trousers.webp",
    width: 860,
    height: 1146,
    caption: "Polos and trousers",
  },
  15: {
    src: "/images/photos/15-storefront-hero.webp",
    width: 1657,
    height: 1326,
    caption: "The urbané storefront, Kausar Baugh",
  },
  16: {
    src: "/images/photos/16-inside-urbane-shoes-and-clothing.webp",
    width: 1632,
    height: 1088,
    caption: "Inside urbané, shoes on one side and clothing on the other",
  },
  17: {
    src: "/images/photos/17-sneaker-wall-under-the-urbane-sign.webp",
    width: 1739,
    height: 1106,
    caption: "Sneaker wall under the urbané sign",
  },
};

/** Photo order for the two lightbox sets (and the scrolling reels). */
export const SETS = {
  foot: [17, 8, 5, 3, 4, 11, 2, 1],
  cloth: [10, 14, 12, 13, 9, 6, 7, 16],
};

/** Photo order for the "Inside the store" reels. */
export const REEL_ORDER = {
  foot: [17, 5, 3, 4, 11, 2, 8, 1],
  cloth: [14, 12, 13, 9, 6, 7, 16, 10],
};

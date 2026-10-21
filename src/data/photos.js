/** Photos by number: file, pixel size, caption. Files live in public/images/photos/ (thumbs/ has smaller copies for iOS reels). */
const P = (file, width, height, caption) => ({ src: `/images/photos/${file}.webp`, width, height, caption });

export const PHOTOS = {
  1: P("01-sneaker-wall-under-our-original-guarantee", 1800, 1295, "Sneaker wall under our Original Guarantee sign"),
  2: P("02-sports-shoes-with-the-1-year-warranty-sign", 900, 1200, "Sports shoes, with the 1-Year Warranty sign above"),
  3: P("03-sliders-and-flip-flops-in-every-colour", 791, 1054, "Sliders and flip-flops in every colour"),
  4: P("04-sneaker-wall-at-urbane-kausar-baugh", 920, 690, "Sneaker wall at urbané, Kausar Baugh"),
  5: P("05-sneakers-from-genuine-brands-ready-to-try", 720, 960, "Sneakers from genuine brands, ready to try on"),
  6: P("06-shirts-tees-and-trousers-on-the-rails", 1400, 1051, "Shirts, tees and trousers on the rails"),
  7: P("07-the-clothing-wall-under-the-brand-signs", 1400, 1050, "The clothing wall under the brand signs"),
  8: P("08-more-sneakers-on-the-wall", 800, 1066, "More sneakers on the wall"),
  9: P("09-sweaters-tees-and-joggers", 791, 1054, "Sweaters, tees and joggers"),
  10: P("10-puffer-jackets-and-polos", 727, 969, "Puffer jackets and polos"),
  11: P("11-casual-and-formal-shoes", 614, 818, "Casual and formal shoes"),
  12: P("12-jackets-ready-to-try", 860, 1146, "Jackets, ready to try"),
  13: P("13-polos-tees-and-jackets", 791, 1054, "Polos, tees and jackets"),
  14: P("14-polos-and-trousers", 860, 1146, "Polos and trousers"),
  16: P("16-inside-urbane-shoes-and-clothing", 1632, 1088, "Inside urbané, shoes on one side and clothing on the other"),
  17: P("17-sneaker-wall-under-the-urbane-sign", 1739, 1106, "Sneaker wall under the urbané sign"),
};

/** Photo order inside the photo viewer. */
export const SETS = {
  foot: [17, 8, 5, 3, 4, 11, 2, 1],
  cloth: [10, 14, 12, 13, 9, 6, 7, 16],
};

/** Photo order in the "Inside urbané" reels. */
export const REEL_ORDER = {
  foot: [17, 5, 3, 4, 11, 2, 8, 1],
  cloth: [14, 12, 13, 9, 6, 7, 16, 10],
};

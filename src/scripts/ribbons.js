/** Crossing ribbons under the brand strip and the moving brand logo strip. */

import { BRANDS } from "../data/brands.js";
import { $ } from "./utils.js";

const MARK_DARK =
  '<img src="/logo.webp" alt="" width="512" height="512" aria-hidden="true" decoding="async">';
const MARK_YELLOW =
  '<img src="/logo.webp" alt="" width="512" height="512" aria-hidden="true" decoding="async">';

const RIBBON_1 = ["100% Genuine", "Flat 50% Off", "1 Year Footwear Warranty", "Footwear", "Clothing", "GST Billed", "Walk in, try on"];
const RIBBON_2 = ["Genuine products", "Footwear", "Sale on top brands", "Clothing", "1 Year Footwear Warranty", "Flat 50% Off", "Visit the store"];

/** Repeats the content four times so the CSS marquee never shows a gap. */
function fillRibbon(el, words, mark) {
  const one = words.map((text) => `<span>${text}${mark}</span>`).join("");
  el.innerHTML = one + one + one + one;
}

function fillBrandStrip(el) {
  const logos =
    BRANDS.map(
      (b) =>
        `<span class="lg"><img src="${b.src}" width="${b.width}" height="${b.height}" alt="${b.name}" decoding="async"></span>`,
    ).join("") + '<span class="lg more">and more</span>';
  el.innerHTML = logos + logos + logos + logos;
}

export function initRibbons() {
  fillRibbon($("#rb1"), RIBBON_1, MARK_DARK);
  fillRibbon($("#rb2"), RIBBON_2, MARK_YELLOW);
  fillBrandStrip($("#bm"));
}

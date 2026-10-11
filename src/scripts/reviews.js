/** Two scrolling rows of Google reviews. */

import { REVIEWS } from "../data/reviews.js";
import { $ } from "./utils.js";

/** Duplicates the cards so the CSS marquee loops without a gap. */
function fillRow(el, items) {
  const html = items.map((r) => `<div class="rq"><q>${r.text}</q><small>${r.author}, Google review</small></div>`).join("");
  el.innerHTML = html + html;
}

export function initReviews() {
  fillRow($("#r1"), REVIEWS);
  // Second row starts halfway through the list so the two rows never line up.
  fillRow($("#r2"), REVIEWS.slice(5).concat(REVIEWS.slice(0, 5)));
}

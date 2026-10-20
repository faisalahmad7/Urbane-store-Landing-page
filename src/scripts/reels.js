/** "Inside the store" photo reels and image loading for every <img data-i="N">. */

import { PHOTOS, REEL_ORDER } from "../data/photos.js";
import { $, $$, isIOS } from "./utils.js";

// iOS Safari loads lazy images inside the moving strips too late, so photos pop in or vanish
// near the edges. Load them straight away on iOS; other browsers keep lazy loading.
const IMG_LOADING = isIOS ? "eager" : "lazy";

const ZOOM_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>';

/** Builds one reel's tiles as an HTML string. Hidden tiles are the looping copies. */
function tilesHtml(ids, setName, hidden) {
  return ids
    .map((id) => {
      const { width, height, caption } = PHOTOS[id];
      const a11y = hidden ? ' tabindex="-1" aria-hidden="true"' : "";
      return (
        `<button class="tile" type="button" data-lb="${id}" data-set="${setName}" ` +
        `style="aspect-ratio:${width}/${height}"${a11y} aria-label="Open photo: ${caption}">` +
        `<img data-i="${id}" alt="${hidden ? "" : caption}" loading="${IMG_LOADING}">` +
        `<span class="zi">${ZOOM_ICON}</span></button>`
      );
    })
    .join("");
}

/** Fills a reel with the real tiles plus three hidden copies so the scroll loops seamlessly. */
function buildReel(el, ids, setName) {
  const copies = tilesHtml(ids, setName, true);
  el.innerHTML = tilesHtml(ids, setName, false) + copies + copies + copies;
}

/** Points every <img data-i="N"> at its photo file. */
function attachImages() {
  $$("[data-i]").forEach((img) => {
    img.src = PHOTOS[img.getAttribute("data-i")].src;
    img.decoding = "async";
  });
}

export function initReels() {
  buildReel($("#strip1"), REEL_ORDER.foot, "foot");
  buildReel($("#strip2"), REEL_ORDER.cloth, "cloth");
  // Runs after the reels are built so their images are included.
  attachImages();
}

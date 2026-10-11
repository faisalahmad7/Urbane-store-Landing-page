/**
 * urbané landing page: entry point.
 * Each module below owns one feature; they run in this order.
 */

import { initCursor } from "./scripts/cursor.js";
import { closeLightbox, initLightbox, isLightboxOpen } from "./scripts/lightbox.js";
import { closeMenu, initNav, isMenuOpen } from "./scripts/nav.js";
import { initHeroParallax, initScrollParallax } from "./scripts/parallax.js";
import { initReels } from "./scripts/reels.js";
import { initReveal } from "./scripts/reveal.js";
import { initReviews } from "./scripts/reviews.js";
import { initRibbons } from "./scripts/ribbons.js";
import { initShoeCare } from "./scripts/shoe-care.js";
import { initWhatsApp } from "./scripts/whatsapp.js";

/** Escape closes the photo viewer first, then the side menu. */
function initEscapeKey() {
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (isLightboxOpen()) closeLightbox();
    else if (isMenuOpen()) closeMenu();
  });
}

initReels();
initRibbons();
initNav();
initWhatsApp();
initReveal();
initHeroParallax();
initScrollParallax();
initLightbox();
initEscapeKey();
initShoeCare();
initReviews();
initCursor();

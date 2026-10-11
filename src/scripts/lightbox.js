/** Full-screen photo viewer: arrows, keyboard, swipe and focus handling. */

import { PHOTOS, SETS } from "../data/photos.js";
import { $, lockScroll, unlockScroll } from "./utils.js";

const box = $("#lb");
const image = $("#lbImg");
const caption = $("#lbCap");
const counter = $("#lbCount");
const closeBtn = $("#lbX");

let current = SETS.foot; // photo ids in the open set
let index = 0;
let lastFocus = null;

export const isLightboxOpen = () => box.classList.contains("on");

function show(i) {
  index = (i + current.length) % current.length;
  const photo = PHOTOS[current[index]];
  image.classList.remove("in");
  image.src = photo.src;
  image.alt = photo.caption;
  caption.textContent = photo.caption;
  counter.textContent = index + 1 + " / " + current.length;
  void image.offsetWidth; // restart the fade-in animation
  image.classList.add("in");
}

function open(setName, id) {
  current = SETS[setName] || SETS.foot;
  const start = current.indexOf(+id);
  lastFocus = document.activeElement;
  show(start < 0 ? 0 : start);
  box.classList.add("on");
  box.setAttribute("aria-hidden", "false");
  lockScroll("lightbox");
  closeBtn.focus();
}

export function closeLightbox() {
  box.classList.remove("on");
  box.setAttribute("aria-hidden", "true");
  unlockScroll("lightbox");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/** Swipe left/right on touch screens. */
function initSwipe() {
  let startX = 0;
  let startY = 0;
  let down = false;

  box.addEventListener("pointerdown", (e) => {
    down = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  box.addEventListener("pointerup", (e) => {
    if (!down) return;
    down = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) show(index + (dx < 0 ? 1 : -1));
  });
  box.addEventListener("pointercancel", () => {
    down = false;
  });
}

export function initLightbox() {
  // Any [data-lb] tile opens its photo; any [data-lbset] button opens the first photo of a set.
  document.addEventListener("click", (e) => {
    const tile = e.target.closest("[data-lb]");
    if (tile) {
      open(tile.dataset.set, tile.dataset.lb);
      return;
    }
    const setBtn = e.target.closest("[data-lbset]");
    if (setBtn) open(setBtn.dataset.lbset, SETS[setBtn.dataset.lbset][0]);
  });

  closeBtn.addEventListener("click", closeLightbox);
  $("#lbP").addEventListener("click", () => show(index - 1));
  $("#lbN").addEventListener("click", () => show(index + 1));
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target.tagName === "FIGURE") closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!isLightboxOpen()) return;
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  initSwipe();
}

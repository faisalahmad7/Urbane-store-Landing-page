/** Pointer parallax on the hero (only if it has a collage), and gentle scroll parallax on `[data-px]` photos. */

import { $, $$, hasMouse, reduceMotion } from "./utils.js";

/** Hero video: with reduced motion it stays on a still frame. Collage parallax is optional. */
export function initHeroParallax() {
  const video = $("#heroVideo");
  if (video && reduceMotion) {
    video.removeAttribute("autoplay");
    video.pause();
  }

  const hero = $("#hero");
  const collage = $("#collage");
  if (!hero || !collage || reduceMotion || !hasMouse()) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let visible = true;

  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
    targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });
  hero.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }).observe(hero);
  }

  (function loop() {
    if (visible) {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      collage.style.setProperty("--mx", currentX.toFixed(3));
      collage.style.setProperty("--my", currentY.toFixed(3));
    }
    requestAnimationFrame(loop);
  })();
}

/** Slow vertical drift for any image marked `data-px`. */
export function initScrollParallax() {
  if (reduceMotion) return;
  const images = $$("[data-px]");
  if (!images.length) return;

  let queued = false;

  function update() {
    queued = false;
    images.forEach((img) => {
      const r = img.parentNode.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.transform = "scale(1.12) translate3d(0," + (p * -26).toFixed(1) + "px,0)";
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

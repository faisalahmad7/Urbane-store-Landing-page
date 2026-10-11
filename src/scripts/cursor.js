/** Soft cursor ring that follows the mouse (desktop only). */

import { $, hasMouse, reduceMotion } from "./utils.js";

export function initCursor() {
  if (reduceMotion || !hasMouse()) return;

  const ring = $("#ring");
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener("pointermove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    ring.classList.add("show");
  });

  // Grow the ring over anything clickable.
  document.addEventListener("pointerover", (e) => {
    ring.classList.toggle("big", !!e.target.closest("a,button,.tile,.ba,summary"));
  });

  (function loop() {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    ring.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    requestAnimationFrame(loop);
  })();
}

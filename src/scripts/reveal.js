/** Scroll-reveal for `.rv` elements, plus the animated number counters. */

import { $$, reduceMotion } from "./utils.js";

const COUNT_DURATION = 1500;

function countUp(el) {
  if (el.__done) return;
  el.__done = true;
  const to = parseFloat(el.dataset.count);
  const decimals = +el.dataset.dec || 0;
  if (reduceMotion) {
    el.textContent = to.toFixed(decimals);
    return;
  }
  let start = null;
  // Starting from performance.now() keeps the first frame at 0.
  (function step(t) {
    if (!start) start = t;
    const progress = Math.min(1, (t - start) / COUNT_DURATION);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (to * eased).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  })(performance.now());
}

function reveal(el) {
  el.classList.add("in");
  $$("[data-count]", el).forEach(countUp);
}

export function initReveal() {
  const counters = $$("[data-count]");
  if (!reduceMotion) {
    counters.forEach((c) => {
      c.textContent = (0).toFixed(+c.dataset.dec || 0);
    });
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    $$(".rv").forEach((el) => io.observe(el));
  } else {
    $$(".rv").forEach(reveal);
  }

  // Safety net: if the observer never fired, show whatever is on screen.
  setTimeout(() => {
    $$(".rv:not(.in)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
    });
    counters.forEach(countUp);
  }, 6000);
}

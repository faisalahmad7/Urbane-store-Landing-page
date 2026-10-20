
import { $, $$, hasMouse, reduceMotion } from "./utils.js";


function initHeroVideo() {
  const video = $("#heroVideo");
  if (!video) return;

  const saveData =
    navigator.connection && navigator.connection.saveData;

  if (reduceMotion || saveData) return;

  const phone = window.matchMedia("(max-width: 640px)").matches;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  video.src = phone ? video.dataset.srcM : video.dataset.srcD;
  video.load();

  video.addEventListener(
    "playing",
    () => video.classList.add("on"),
    { once: true }
  );

  const attemptPlayback = () => {
    if (document.hidden || !video.paused) return;

    video.play().catch((error) => {
      console.warn("Hero video playback delayed:", error.name);
    });
  };

  video.addEventListener("loadeddata", attemptPlayback);
  video.addEventListener("canplay", attemptPlayback);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) attemptPlayback();
  });

  attemptPlayback();
}


export function initHeroParallax() {
  initHeroVideo();

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

      img.style.transform =
        "scale(1.12) translate3d(0," +
        (p * -26).toFixed(1) +
        "px,0)";
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
    { passive: true }
  );

  update();
}

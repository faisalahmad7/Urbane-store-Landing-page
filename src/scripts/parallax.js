/** Pointer parallax on the hero (only if it has a collage), and gentle scroll parallax on `[data-px]` photos. */

import { $, $$, hasMouse, isIOS, reduceMotion } from "./utils.js";

/** Try to play now; if blocked, retry on canplay, when the tab is visible, and on the first tap/click. */
function startPlayback(video) {
  const attempt = () => {
    if (!video.paused) return;
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };
  attempt();
  video.addEventListener("loadeddata", attempt);
  video.addEventListener("canplay", attempt);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) attempt();
  });
  ["touchend", "click"].forEach((ev) => window.addEventListener(ev, attempt, { once: true, passive: true }));
}

/**
 * Hero video: a small portrait file on phones, a larger one elsewhere. Skipped for reduced motion or data saver.
 * On iOS the whole MP4 is downloaded first and played from memory (blob URL), because iOS refuses to
 * stream a video from a server that doesn't answer partial (Range) requests properly.
 * If that download fails, it falls back to the normal URL. Other devices are unchanged.
 */
function initHeroVideo() {
  const video = $("#heroVideo");
  if (!video) return;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion || saveData) return;

  const phone = window.matchMedia("(max-width: 640px)").matches;
  if (isIOS) {
    const url = phone ? "/videos/hero-m.mp4" : "/videos/hero.mp4";
    // iOS only autoplays if these are set before the video source is loaded.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.removeAttribute("controls");
    video.poster = phone ? "/videos/hero-m-poster.jpg" : "/videos/hero-poster.jpg";
    video.classList.add("on");

    const useSrc = (src) => {
      video.src = src;
      video.load();
      startPlayback(video);
    };

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("video " + res.status);
        return res.blob();
      })
      .then((blob) => useSrc(URL.createObjectURL(blob)))
      .catch(() => useSrc(url));
    return;
  }

  video.src = phone ? video.dataset.srcM : video.dataset.srcD;
  video.addEventListener("playing", () => video.classList.add("on"), { once: true });
  const p = video.play();
  if (p && p.catch) p.catch(() => {});
}

/** Pointer parallax on the hero collage (only if it exists). */
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
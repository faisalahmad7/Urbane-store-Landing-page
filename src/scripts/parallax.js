
import { $, $$, hasMouse, reduceMotion } from "./utils.js";

function initHeroVideo() {
  const video = $("#heroVideo");
  if (!video) return;

  // Respect accessibility preferences.
  if (reduceMotion) return;

  const connection = navigator.connection;
  const saveData = connection && connection.saveData;

  // Skip the decorative video for data-saving users.
  if (saveData) return;

  const phone = window.matchMedia("(max-width: 640px)").matches;
  const source = phone ? video.dataset.srcM : video.dataset.srcD;

  if (!source) {
    console.error("Hero video source is missing.");
    return;
  }

  // Configure playback before loading the video.
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.loop = true;

  video.setAttribute("muted", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  let playPending = false;
  let retryTimer = null;
  let hasStarted = false;

  function clearRetry() {
    if (retryTimer !== null) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
  }

  function attemptPlayback(reason = "automatic") {
    if (
      document.hidden ||
      !video.isConnected ||
      !video.paused ||
      playPending ||
      hasStarted
    ) {
      return;
    }

    if (video.error) {
      console.error("Hero video media error:", {
        code: video.error.code,
        message: video.error.message,
        source: video.currentSrc
      });
      return;
    }

    playPending = true;

    try {
      const result = video.play();

      if (result && typeof result.then === "function") {
        result
          .then(() => {
            playPending = false;
            clearRetry();
          })
          .catch((error) => {
            playPending = false;

            console.warn("Hero video playback failed:", {
              reason,
              errorName: error.name,
              errorMessage: error.message,
              readyState: video.readyState,
              networkState: video.networkState,
              source: video.currentSrc
            });

            // Autoplay restrictions require a user gesture.
            if (error.name === "NotAllowedError") return;

            // Retry transient failures without looping endlessly.
            if (!document.hidden && !video.error && retryTimer === null) {
              retryTimer = setTimeout(() => {
                retryTimer = null;

                if (!document.hidden && video.paused && !video.error) {
                  attemptPlayback("delayed-retry");
                }
              }, 1200);
            }
          });
      } else {
        playPending = false;
      }
    } catch (error) {
      playPending = false;
      console.warn("Hero video play() error:", error);
    }
  }

  function onUserGesture() {
    attemptPlayback("user-gesture");
  }

  function onPlaying() {
    hasStarted = true;
    playPending = false;
    clearRetry();
    video.classList.add("on");

    document.removeEventListener("pointerdown", onUserGesture);
    document.removeEventListener("touchstart", onUserGesture);
    document.removeEventListener("keydown", onUserGesture);
  }

  video.addEventListener("playing", onPlaying);

  video.addEventListener("loadeddata", () => {
    attemptPlayback("loadeddata");
  });

  video.addEventListener("canplay", () => {
    attemptPlayback("canplay");
  });

  video.addEventListener("error", () => {
    const error = video.error;

    console.error("Hero video failed to load:", {
      code: error?.code,
      message: error?.message,
      source: video.currentSrc
    });
  });

  video.addEventListener("stalled", () => {
    console.warn("Hero video download stalled.");
  });

  video.addEventListener("waiting", () => {
    console.info("Hero video is waiting for data.");
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !hasStarted) {
      attemptPlayback("visibilitychange");
    }
  });

  window.addEventListener("pageshow", () => {
    if (!hasStarted) {
      attemptPlayback("pageshow");
    }
  });

  // Fallback when the browser blocks automatic playback.
  document.addEventListener("pointerdown", onUserGesture);
  document.addEventListener("touchstart", onUserGesture, {
    passive: true
  });
  document.addEventListener("keydown", onUserGesture);

  // Attach listeners before starting media loading.
  if (video.getAttribute("src") !== source) {
    video.src = source;
  }

  video.load();
  attemptPlayback("initial");
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

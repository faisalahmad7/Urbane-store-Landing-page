import { useEffect } from "react";

export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const hasMouse = matchMedia("(hover:hover) and (pointer:fine)").matches;

/** iPhone / iPad / iPod, including iPadOS in desktop mode. Used for iOS-only workarounds. */
export const isIOS =
  /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

if (isIOS) document.documentElement.classList.add("ios");

/** onClick for in-page "#section" links. CSS scroll-behavior handles smooth vs reduced motion. */
export function go(e, delay = 0) {
  const hash = e.currentTarget.getAttribute("href");
  if (hash?.[0] !== "#") return;
  e.preventDefault();
  setTimeout(() => document.querySelector(hash)?.scrollIntoView(), delay);
}

const locks = new Set();

/** Locks page scroll while `on` is true; scrolling returns once every lock is released. */
export function useScrollLock(name, on) {
  useEffect(() => {
    if (!on) return;
    locks.add(name);
    document.documentElement.classList.add("noscroll");
    return () => {
      locks.delete(name);
      if (!locks.size) document.documentElement.classList.remove("noscroll");
    };
  }, [name, on]);
}

/** Adds class "in" to every .rv element once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    const t = setTimeout(() => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
      });
    }, 6000);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
}

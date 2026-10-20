/** Small DOM helpers shared by every script module. */

export const $ = (selector, root = document) => root.querySelector(selector);

export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/** True when the visitor has asked their device for less motion. */
export const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True on iPhone / iPad / iPod (including iPadOS in desktop mode). Used for iOS-only workarounds. */
export const isIOS =
  /iP(hone|ad|od)/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// Lets CSS target iOS only (see store-reels.css).
if (isIOS) document.documentElement.classList.add("ios");

/** True on devices with a mouse (hover + fine pointer). */
export const hasMouse = () => window.matchMedia("(hover:hover) and (pointer:fine)").matches;

/**
 * Page scroll lock shared by the side menu and the photo viewer.
 * Scrolling is only re-enabled once every lock has been released.
 */
const locks = new Set();

export function lockScroll(name) {
  locks.add(name);
  document.documentElement.classList.add("noscroll");
}

export function unlockScroll(name) {
  locks.delete(name);
  if (locks.size === 0) document.documentElement.classList.remove("noscroll");
}

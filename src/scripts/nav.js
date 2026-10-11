/** Header background, side menu and smooth in-page anchor links. */

import { $, lockScroll, reduceMotion, unlockScroll } from "./utils.js";

const header = $("#hd");
const menu = $("#menu");
const scrim = $("#scrim");
const menuBtn = $("#menuBtn");

export const isMenuOpen = () => menu.classList.contains("on");

export function openMenu() {
  menu.classList.add("on");
  menu.setAttribute("aria-hidden", "false");
  scrim.classList.add("on");
  lockScroll("menu");
  menuBtn.setAttribute("aria-expanded", "true");
  const closeBtn = $("[data-close]", menu);
  if (closeBtn) closeBtn.focus();
}

export function closeMenu() {
  menu.classList.remove("on");
  menu.setAttribute("aria-hidden", "true");
  scrim.classList.remove("on");
  unlockScroll("menu");
  menuBtn.setAttribute("aria-expanded", "false");
}

function updateHeader() {
  header.classList.toggle("solid", window.scrollY > 40);
}

function scrollToTarget(hash) {
  const behavior = reduceMotion ? "auto" : "smooth";
  if (hash === "#top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const target = $(hash);
  if (target) target.scrollIntoView({ behavior, block: "start" });
}

export function initNav() {
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  menuBtn.addEventListener("click", openMenu);
  scrim.addEventListener("click", closeMenu);
  $("[data-close]", menu).addEventListener("click", closeMenu);

  // Any <a data-go href="#section"> scrolls smoothly (and closes the menu first).
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-go]");
    if (!link) return;
    const hash = link.getAttribute("href");
    if (!hash || hash.charAt(0) !== "#") return;
    e.preventDefault();
    const wasOpen = isMenuOpen();
    closeMenu();
    setTimeout(() => scrollToTarget(hash), wasOpen ? 80 : 0);
  });
}

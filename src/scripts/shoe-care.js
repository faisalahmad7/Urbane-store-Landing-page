/** Shoe-care before/after slider. */

import { renderSneaker } from "./sneaker.js";
import { $ } from "./utils.js";

export function initShoeCare() {
  const clean = { style: "low", upper: "#F7F7F5", accent: "#151515", sole: "#fff", toe: "#F7F7F5", lace: "#151515" };
  const dirty = { ...clean, dirt: true, sole: "#e4d9b4", upper: "#e8e2d0" };

  $("#baClean").innerHTML = renderSneaker(clean);
  $("#baDirty").innerHTML = renderSneaker(dirty);

  const range = $("#baRange");
  const slider = $("#ba");
  const update = () => slider.style.setProperty("--p", range.value + "%");
  range.addEventListener("input", update);
  update();
}

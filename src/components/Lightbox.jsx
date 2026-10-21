import { useEffect, useRef } from "react";
import { PHOTOS, SETS } from "../data/photos";
import { Ic } from "../ui";
import { useScrollLock } from "../utils";

/** Full-screen photo viewer: arrows, keyboard, swipe, focus return and scroll lock. */
export default function Lightbox({ view, setView }) {
  const { set, i, on } = view;
  const ids = SETS[set];
  const photo = PHOTOS[ids[i]];
  const closeRef = useRef();
  const swipe = useRef(null);
  const shown = useRef(false); // keep the last photo mounted while the viewer fades out
  if (on) shown.current = true;

  const close = () => setView((v) => ({ ...v, on: false }));
  const go = (d) => setView((v) => ({ ...v, i: (v.i + d + SETS[v.set].length) % SETS[v.set].length }));
  useScrollLock("lightbox", on);

  useEffect(() => {
    if (!on) return;
    const prev = document.activeElement;
    closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [on]);

  const onUp = (e) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className={"lb" + (on ? " on" : "")}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      aria-hidden={!on}
      onClick={(e) => (e.target === e.currentTarget || e.target.tagName === "FIGURE") && close()}
      onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
      onPointerUp={onUp}
      onPointerCancel={() => (swipe.current = null)}
    >
      <button className="x" ref={closeRef} aria-label="Close photo" onClick={close}>
        <Ic d="M6 6l12 12M18 6L6 18" w={2.4} />
      </button>
      <button className="pv" aria-label="Previous photo" onClick={() => go(-1)}>
        <Ic d="M15 5l-7 7 7 7" w={2.4} />
      </button>
      <button className="nx" aria-label="Next photo" onClick={() => go(1)}>
        <Ic d="M9 5l7 7-7 7" w={2.4} />
      </button>
      <figure>
        {shown.current && <img key={photo.src} className="in" src={photo.src} alt={photo.caption} />}
        <figcaption>{photo.caption}</figcaption>
      </figure>
      <div className="cnt2">{i + 1} / {ids.length}</div>
    </div>
  );
}

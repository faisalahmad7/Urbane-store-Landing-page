import { useEffect, useRef } from "react";
import { hasMouse, reduceMotion } from "../utils";

/** Soft ring that follows the mouse (desktop only, off with reduced motion). */
export default function Cursor() {
  const ring = useRef();
  useEffect(() => {
    if (reduceMotion || !hasMouse) return;
    const el = ring.current;
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add("show");
    };
    const over = (e) => el.classList.toggle("big", !!e.target.closest("a,button,.tile,.ba,summary"));
    (function loop() {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(loop);
    })();
    addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, []);
  return <div className="ring" ref={ring} aria-hidden="true"></div>;
}

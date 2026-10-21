import { useEffect, useRef, useState } from "react";
import { go, useScrollLock } from "../utils";
import { TEL, INSTAGRAM } from "../data/site";

const LINKS = [
  ["why", "Why urbané"],
  ["footwear", "Footwear"],
  ["clothing", "Clothing"],
  ["store", "Inside the store"],
  ["care", "Shoe care"],
  ["reviews", "Reviews"],
  ["visit", "Visit"],
];

const Logo = ({ onClick }) => (
  <a className="logo" href="#top" onClick={onClick} aria-label="urbané home">
    <img src="/logo.webp" alt="" width="512" height="512" aria-hidden="true" decoding="async" />
    <span>urbané</span>
  </a>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const closeRef = useRef();
  useScrollLock("menu", open);

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const nav = (e) => {
    go(e, open ? 80 : 0);
    setOpen(false);
  };

  return (
    <>
      <header className={"hd" + (solid ? " solid" : "")}>
        <Logo onClick={go} />
        <a className="pill y" href="#visit" onClick={go}>Visit us</a>
        <button className="burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <i></i>
          <i></i>
        </button>
      </header>
      <div className={"scrim" + (open ? " on" : "")} onClick={() => setOpen(false)}></div>
      <aside className={"menu" + (open ? " on" : "")} aria-label="Menu" aria-hidden={!open}>
        <div className="mh">
          <Logo onClick={nav} />
          <button className="xbtn" ref={closeRef} onClick={() => setOpen(false)}>Close</button>
        </div>
        <p className="mtag">Footwear | Clothing | Apparel</p>
        <nav>
          {LINKS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={nav}>
              <span style={{ "--i": i }}>{label}</span>
            </a>
          ))}
        </nav>
        <div className="ct">
          <span>Kausar Baugh, Pune 411048</span>
          <a href={TEL}>090966 64198</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener">@urbanespot on Instagram</a>
        </div>
      </aside>
    </>
  );
}

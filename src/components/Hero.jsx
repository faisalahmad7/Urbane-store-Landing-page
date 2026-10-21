import { useEffect, useRef } from "react";
import { go, isIOS, reduceMotion } from "../utils";

const phone = matchMedia("(max-width: 640px)").matches;
const base = phone ? "/videos/hero-m" : "/videos/hero";
const still = reduceMotion || navigator.connection?.saveData;
const tapToPlay = isIOS; // iPhone/iPad: show the poster, start the video on first touch

/** MP4 for every device. The poster is always set, so a blocked or skipped video still shows a picture. */
function HeroVideo() {
  const ref = useRef();

  useEffect(() => {
    const v = ref.current;
    if (still) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const play = () => v.paused && v.play()?.catch(() => {});
    const onVisible = () => !document.hidden && (!tapToPlay || v.currentTime > 0) && play();
    // Plain streaming first. Only if iOS reports an error, download the file and play it from memory.
    const onError = () => {
      if (!isIOS || v.dataset.blob) return;
      v.dataset.blob = "1";
      fetch(`${base}.mp4`)
        .then((r) => (r.ok ? r.blob() : Promise.reject()))
        .then((b) => {
          v.src = URL.createObjectURL(b);
          v.load();
          if (!tapToPlay) play();
        })
        .catch(() => {});
    };
    if (!tapToPlay) {
      play();
      ["loadeddata", "canplay"].forEach((e) => v.addEventListener(e, play));
    }
    v.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onVisible);

    // Start on the first touch, even the start of a scroll, without waiting for the finger to lift.
    const wake = ["touchstart", "touchmove", "pointerdown", "scroll", "touchend", "click"];
    const off = () => wake.forEach((e) => removeEventListener(e, kick));
    const kick = () => {
      if (!v.paused) return off();
      v.play()?.then(off).catch(() => {});
    };
    wake.forEach((e) => addEventListener(e, kick, { passive: true }));

    return () => {
      ["loadeddata", "canplay"].forEach((e) => v.removeEventListener(e, play));
      v.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVisible);
      off();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={`${base}.mp4`}
      poster={`${base}-poster.jpg`}
      muted
      loop
      playsInline
      autoPlay={!still && !tapToPlay}
      preload={still ? "none" : "auto"}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hbg">
        <HeroVideo />
      </div>
      <div className="hcopy">
        <p className="eyebrow"><i></i>Walk-in store, Kausar Baugh</p>
        <h1 aria-label="Genuine brands. Real savings.">
          <span className="ln"><span style={{ "--i": 0 }}>Genuine brands.</span></span>
          <span className="ln y"><span style={{ "--i": 1 }}>Real savings.</span></span>
        </h1>
        <div className="cta">
          <a className="btn y" href="#visit" onClick={go}>Visit the store</a>
          <ul className="deals">
            <li className="off"><b>Flat 50% off</b><small></small></li>
            <li><b>1-year warranty</b><small>on footwear</small></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
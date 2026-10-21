import { useState } from "react";
import { SETS } from "./data/photos";
import { useReveal } from "./utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Brands, Ribbons, Why, Range, Reels, Reviews, Faq, Visit } from "./components/Sections";
import ShoeCare from "./components/ShoeCare";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";
import Cursor from "./components/Cursor";
import { whatsappLink, WHATSAPP_MESSAGES } from "./data/site";
import { Wa } from "./ui";

export default function App() {
  const [view, setView] = useState({ set: "foot", i: 0, on: false });
  const open = (set, id) => setView({ set, i: Math.max(0, SETS[set].indexOf(id)), on: true });
  useReveal();

  return (
    <>
      <div className="loader" aria-hidden="true">
        <img src="/logo.webp" alt="" width="512" height="512" />
      </div>
      <Header />
      <main id="top">
        <Hero />
        <Brands />
        <Ribbons />
        <Why />
        <Range open={open} />
        <Reels open={open} />
        <ShoeCare />
        <Reviews />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <a className="fab" href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <Wa />
      </a>
      <Lightbox view={view} setView={setView} />
      <Cursor />
    </>
  );
}

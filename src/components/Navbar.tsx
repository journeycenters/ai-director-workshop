"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "glass border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-3 group">
          <video
            src="/logo-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-8 h-8 rounded-md object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase text-fg/50 transition-colors duration-300 group-hover:text-gold/70">
            AI Director Workshop
          </span>
        </a>
        <a
          href="#pricing"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/20 px-5 py-2.5 text-sm font-semibold text-gold tracking-wide cursor-pointer transition-all duration-300 hover:bg-gold hover:text-deep hover:shadow-lg hover:shadow-gold/20"
        >
          Reserve Your Seat
        </a>
      </div>
    </nav>
  );
}

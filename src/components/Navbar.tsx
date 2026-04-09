"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AI Director Workshop"
            width={36}
            height={36}
            className="opacity-90"
          />
          <span className="font-display text-sm font-bold tracking-[0.2em] uppercase text-foreground/80">
            AI Director Workshop
          </span>
        </a>
        <a
          href="#pricing"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
        >
          Reserve Your Seat
        </a>
      </div>
    </nav>
  );
}

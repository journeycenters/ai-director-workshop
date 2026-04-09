"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
      })
        .from(
          ".hero-line",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-sub",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-note",
          {
            y: 10,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".hero-gold-line",
          {
            scaleX: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=1"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,67,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_120%,rgba(212,168,67,0.04),transparent)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <p className="hero-eyebrow mb-8 font-display text-sm font-medium tracking-[0.3em] uppercase text-gold">
          April 11, 2026 — Live Intensive
        </p>

        {/* Gold line */}
        <div className="hero-gold-line mx-auto mb-12 h-px w-24 origin-left bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Main heading */}
        <h1 className="font-display font-bold tracking-tight leading-[0.95]">
          <span className="hero-line block text-[clamp(2.5rem,7vw,6rem)] text-foreground">
            STOP PROMPTING.
          </span>
          <span className="hero-line block text-[clamp(2.5rem,7vw,6rem)] text-gold gold-glow-text">
            START DIRECTING.
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero-sub mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          A 4-hour workshop where you&apos;ll build a real AI system that runs
          your business — not just answers your questions.
        </p>

        {/* CTA */}
        <div className="hero-cta mt-10">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-bold text-background tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/20 hover:scale-105"
          >
            RESERVE YOUR SEAT
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* Note */}
        <p className="hero-note mt-6 text-sm text-muted/60 tracking-wide">
          Limited to 25 seats &middot; Hands-on, not lecture
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-[0.2em] uppercase text-muted">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}

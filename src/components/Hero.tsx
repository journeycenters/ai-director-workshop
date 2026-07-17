"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DigitalWaveCanvas from "./DigitalWaveCanvas";

function CharReveal({
  text,
  charClass,
}: {
  text: string;
  charClass: string;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className={`${charClass} inline-block`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function MagneticButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 2,
      });

      tl.to(".hero-char-1", {
        y: 0,
        opacity: 1,
        stagger: 0.025,
        duration: 0.8,
      })
        .to(
          ".hero-char-2",
          {
            y: 0,
            opacity: 1,
            stagger: 0.025,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-eyebrow",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.6"
        )
        .from(
          ".hero-divider",
          { scaleX: 0, duration: 1, ease: "power2.inOut" },
          "-=0.5"
        )
        .from(
          ".hero-sub",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.3"
        )
        .from(
          ".hero-note",
          { y: 10, opacity: 0, duration: 0.4 },
          "-=0.2"
        )
        .from(
          ".hero-scroll",
          { opacity: 0, duration: 0.5 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive digital wave field */}
      <DigitalWaveCanvas />

      {/* Radial gradient overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,67,0.04),transparent)] z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(2,2,3,0.4),transparent)] z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_50%_120%,rgba(212,168,67,0.03),transparent)] z-[1]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow label */}
        <p className="hero-eyebrow mb-6 font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-gold/70">
          April 11, 2026: Live Intensive
        </p>

        {/* Gold divider */}
        <div className="hero-divider mx-auto mb-10 h-px w-20 origin-center bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Main heading with character reveal */}
        <h1 className="font-display font-bold tracking-tight leading-[0.9]">
          <span className="block text-[clamp(2.8rem,8vw,7rem)] text-fg overflow-hidden">
            <CharReveal text="STOP PROMPTING." charClass="hero-char-1 opacity-0 translate-y-full" />
          </span>
          <span className="block text-[clamp(2.8rem,8vw,7rem)] text-gradient-gold gold-glow-text overflow-hidden mt-2">
            <CharReveal text="START DIRECTING." charClass="hero-char-2 opacity-0 translate-y-full" />
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero-sub mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          A 4-hour workshop where you&apos;ll build a real AI system that runs
          your business, not just answers your questions.
        </p>

        {/* CTA */}
        <div className="hero-cta mt-10 inline-block">
          <MagneticButton
            href="#pricing"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-lg font-bold text-deep tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/25"
          >
            RESERVE YOUR SEAT
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
          </MagneticButton>
        </div>

        {/* Note */}
        <p className="hero-note mt-6 font-mono text-[11px] text-dim tracking-[0.15em] uppercase">
          Limited to 25 seats &middot; Hands-on, not lecture
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-dim">
          Scroll
        </span>
        <div className="relative h-8 w-[1px]">
          <div className="absolute inset-0 bg-gradient-to-b from-dim/50 to-transparent" />
          <div
            className="absolute top-0 left-0 w-full h-3 bg-gold/60"
            style={{
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
        <style jsx>{`
          @keyframes scrollPulse {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(20px); opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}

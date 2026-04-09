"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-surface overflow-hidden"
    >
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,rgba(212,168,67,0.06),transparent)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="cta-content">
          {/* Gold divider */}
          <div className="mx-auto mb-12 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight leading-tight text-balance">
            The gap between people who{" "}
            <span className="text-gold">direct</span>
            <br />
            and people who wait to be directed
            <br />
            is getting wider, faster.
          </h2>

          <p className="mt-8 mx-auto max-w-xl text-lg text-muted leading-relaxed">
            This isn&apos;t about AI taking jobs. It&apos;s about the difference
            between people who build systems and people who follow instructions.
            Which side do you want to be on?
          </p>

          <div className="mt-10">
            <a
              href="#pricing"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-lg font-bold text-background tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/20 hover:scale-105"
            >
              TAKE THE DIRECTOR&apos;S CHAIR
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

          <p className="mt-8 text-sm text-muted/50">
            April 11, 2026 &middot; 25 seats &middot; Laptop + Claude required
          </p>
        </div>
      </div>
    </section>
  );
}

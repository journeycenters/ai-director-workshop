"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    label: "01",
    title: "Small Business Owners",
    description:
      "Drowning in operational tasks. You sense AI can help but don't know where to start, or you've tried and it felt like a novelty.",
  },
  {
    label: "02",
    title: "Therapists & Practitioners",
    description:
      "Want to reclaim clinical hours from admin burden: notes, scheduling, intake, content. Your expertise is too valuable for paperwork.",
  },
  {
    label: "03",
    title: "Revenue Seekers",
    description:
      "Looking for new revenue streams: side hustles, consulting pivots, productized services. The person who can direct AI across 5 domains beats the expert in 1.",
  },
  {
    label: "04",
    title: "The AI-Curious",
    description:
      'You\'ve tried ChatGPT a few times, thought "that\'s cool," and then went back to doing everything manually. This changes that.',
  },
];

export default function Audience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".aud-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".aud-heading > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".aud-card", {
        scrollTrigger: { trigger: ".aud-grid", start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".aud-not", {
        scrollTrigger: { trigger: ".aud-not", start: "top 90%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-44 bg-base">
      {/* Subtle section gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(212,168,67,0.03),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="aud-label font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-gold/70 mb-6">
            Who This Is For
          </p>
          <div className="aud-heading">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight leading-[1.1]">
              <span className="block">Built for people who</span>
              <span className="block text-gradient-gold">
                direct businesses,
              </span>
              <span className="block">not build software.</span>
            </h2>
          </div>
        </div>

        <div className="aud-grid mt-16 grid gap-5 sm:grid-cols-2">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="aud-card group rounded-2xl glass p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-gold/10"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold/40">
                {item.label}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-fg">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="aud-not mt-12 mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full glass px-6 py-3">
            <div className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
            <span className="text-sm text-muted">
              <strong className="text-fg">NOT</strong> for developers.
              This is for people who want to{" "}
              <strong className="text-gold">direct</strong> intelligence, not
              build it.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    title: "Small Business Owners",
    description:
      "Drowning in operational tasks. You sense AI can help but don't know where to start — or you've tried and it felt like a novelty.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Therapists & Practitioners",
    description:
      "Want to reclaim clinical hours from admin burden — notes, scheduling, intake, content. Your expertise is too valuable for paperwork.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    title: "Revenue Seekers",
    description:
      "Looking for new revenue streams — side hustles, consulting pivots, productized services. The person who can direct AI across 5 domains beats the expert in 1.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "The AI-Curious",
    description:
      'You\'ve tried ChatGPT a few times, thought "that\'s cool," and then went back to doing everything manually. This changes that.',
  },
];

export default function Audience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".audience-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".audience-card", {
        scrollTrigger: {
          trigger: ".audience-grid",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".audience-not", {
        scrollTrigger: {
          trigger: ".audience-not",
          start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="audience-heading font-display text-sm font-medium tracking-[0.3em] uppercase text-gold mb-6">
            Who This Is For
          </p>
          <h2 className="audience-heading font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight text-balance">
            Built for people who{" "}
            <span className="text-gold">direct businesses</span>, not build
            software.
          </h2>
        </div>

        <div className="audience-grid mt-16 grid gap-6 sm:grid-cols-2">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="audience-card group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:bg-card-hover hover:border-border-gold/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl bg-gold-dim p-3 text-gold">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="audience-not mt-12 mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3">
            <svg
              className="w-5 h-5 text-red-400/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <span className="text-sm text-muted">
              <strong className="text-foreground">NOT</strong> for developers.
              Not for people who want to learn to code. This is for people who
              want to <strong className="text-gold">direct</strong> intelligence,
              not build it.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

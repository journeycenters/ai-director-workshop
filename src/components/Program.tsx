"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const parts = [
  {
    number: "01",
    title: "THE MINDSET SHIFT",
    duration: "60–75 min",
    subtitle: "You're Not Learning a Tool. You're Learning to Direct.",
    points: [
      "The three roles people play with AI — and why only one compounds",
      "The Briefing Test: discover why your AI results suck (it's not the AI)",
      "Real economics of directing vs. doing — the math, not the hype",
    ],
  },
  {
    number: "02",
    title: "THE DIRECTOR'S TOOLKIT",
    duration: "30–40 min",
    subtitle: "Seeing Your Business Through a Director's Eyes",
    points: [
      "Audit your week — find the 40-60% that AI could handle today",
      "Think in systems, not tasks: the difference between a moment and a rhythm",
      "Choose your first system to build in Part 3",
    ],
  },
  {
    number: "03",
    title: "THE BUILD",
    duration: "75–90 min",
    subtitle: "You're Leaving With Something That Works",
    points: [
      "Build your Soul Document — the briefing your AI Chief of Staff reads on day one",
      "Construct a real, scheduled workflow from scratch",
      "Test it, refine it, walk out with something functional",
    ],
    highlighted: true,
  },
  {
    number: "04",
    title: "THE PLAYBOOK",
    duration: "15–20 min",
    subtitle: "What Happens After Today",
    points: [
      "30-day refinement path: from one system to an interconnected network",
      "The revenue conversation — turn this skill into income",
      "Community access and ongoing support",
    ],
  },
];

export default function Program() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".program-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".program-part", {
        scrollTrigger: {
          trigger: ".program-timeline",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".program-line", {
        scrollTrigger: {
          trigger: ".program-timeline",
          start: "top 80%",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="program-heading font-display text-sm font-medium tracking-[0.3em] uppercase text-gold mb-6">
            The Program
          </p>
          <h2 className="program-heading font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight text-balance">
            4 hours. 4 parts.
            <br />
            <span className="text-gold">One working system.</span>
          </h2>
          <p className="program-heading mt-6 text-lg text-muted leading-relaxed">
            You&apos;re not watching a presentation — you&apos;re building. Come
            ready to roll up your sleeves.
          </p>
        </div>

        <div className="program-timeline relative mt-20 mx-auto max-w-3xl">
          {/* Vertical timeline line */}
          <div className="program-line absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {parts.map((part) => (
              <div
                key={part.number}
                className={`program-part relative flex gap-8 ${
                  part.highlighted ? "" : ""
                }`}
              >
                {/* Number dot */}
                <div className="hidden md:flex flex-shrink-0 items-start">
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      part.highlighted
                        ? "border-gold bg-gold-dim"
                        : "border-border bg-background"
                    }`}
                  >
                    <span
                      className={`font-display text-sm font-bold ${
                        part.highlighted ? "text-gold" : "text-muted"
                      }`}
                    >
                      {part.number}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 rounded-2xl border p-8 transition-all duration-500 ${
                    part.highlighted
                      ? "border-border-gold bg-card gold-glow"
                      : "border-border bg-card hover:bg-card-hover"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="md:hidden font-display text-xs font-bold text-gold tracking-wider">
                      PART {part.number}
                    </span>
                    <h3
                      className={`font-display text-xl font-bold tracking-wide ${
                        part.highlighted ? "text-gold" : "text-foreground"
                      }`}
                    >
                      {part.title}
                    </h3>
                    <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-muted">
                      {part.duration}
                    </span>
                  </div>

                  <p className="text-base italic text-muted/70 mb-4">
                    &ldquo;{part.subtitle}&rdquo;
                  </p>

                  <ul className="space-y-2">
                    {part.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-base">
                        <svg
                          className={`w-4 h-4 mt-1 flex-shrink-0 ${
                            part.highlighted ? "text-gold" : "text-muted/40"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span className="text-muted leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {part.highlighted && (
                    <div className="mt-6 rounded-xl bg-gold-dim/50 border border-gold/10 px-4 py-3">
                      <p className="text-sm text-gold/90">
                        <strong>This is the heart of the program.</strong> You
                        build a real, functional scheduled workflow that you will
                        use starting tomorrow.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

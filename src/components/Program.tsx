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
      "Audit your week — find the 40–60% that AI could handle today",
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
      gsap.from(".prog-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".prog-heading > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".prog-sub", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".prog-card", {
        scrollTrigger: { trigger: ".prog-timeline", start: "top 82%" },
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".prog-line-inner", {
        scrollTrigger: { trigger: ".prog-timeline", start: "top 82%" },
        scaleY: 0,
        transformOrigin: "top",
        duration: 2,
        ease: "power2.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="prog-label font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-gold/70 mb-6">
            The Program
          </p>
          <div className="prog-heading">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight leading-[1.1]">
              <span className="block">4 hours. 4 parts.</span>
              <span className="block text-gradient-gold">
                One working system.
              </span>
            </h2>
          </div>
          <p className="prog-sub mt-6 text-lg text-muted leading-relaxed">
            You&apos;re not watching a presentation — you&apos;re building.
            Come ready to roll up your sleeves.
          </p>
        </div>

        <div className="prog-timeline relative mt-20 mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-white/[0.04] hidden md:block">
            <div className="prog-line-inner absolute inset-0 bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />
          </div>

          <div className="space-y-6">
            {parts.map((part) => (
              <div key={part.number} className="prog-card relative flex gap-8">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 items-start">
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border ${
                      part.highlighted
                        ? "border-gold/40 bg-gold/10"
                        : "border-white/[0.08] bg-deep"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        part.highlighted ? "text-gold" : "text-dim"
                      }`}
                    >
                      {part.number}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`flex-1 rounded-2xl p-8 transition-all duration-500 ${
                    part.highlighted
                      ? "glass-gold gold-glow"
                      : "glass hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="md:hidden font-mono text-[10px] font-bold text-gold/60 tracking-[0.15em]">
                      PART {part.number}
                    </span>
                    <h3
                      className={`font-display text-xl font-bold tracking-wide ${
                        part.highlighted ? "text-gold" : "text-fg"
                      }`}
                    >
                      {part.title}
                    </h3>
                    <span className="rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-medium text-dim tracking-[0.1em]">
                      {part.duration}
                    </span>
                  </div>

                  <p className="text-sm italic text-dim mb-4">
                    &ldquo;{part.subtitle}&rdquo;
                  </p>

                  <ul className="space-y-2.5">
                    {part.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-base">
                        <div
                          className={`mt-2 h-1 w-1 rounded-full flex-shrink-0 ${
                            part.highlighted ? "bg-gold/60" : "bg-dim/40"
                          }`}
                        />
                        <span className="text-muted leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {part.highlighted && (
                    <div className="mt-6 rounded-xl bg-gold/[0.06] border border-gold/10 px-5 py-4">
                      <p className="text-sm text-gold/80 leading-relaxed">
                        <strong className="text-gold">
                          This is the heart of the program.
                        </strong>{" "}
                        You build a real, functional scheduled workflow that you
                        will use starting tomorrow.
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

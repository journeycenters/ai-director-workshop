"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    title: "The Technician",
    question: '"How do I make AI do X?"',
    description:
      "Learns prompts. Memorizes features. Follows tutorials. The prompts change, the features update, the tutorials expire. Always chasing.",
    problem: "Commoditized on arrival",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.42 15.17l-5.71-3.12a.27.27 0 010-.46l5.71-3.12a.27.27 0 01.42.23v6.24a.27.27 0 01-.42.23zM15 12l5.71-3.12a.27.27 0 00.42-.23V2.41a.27.27 0 00-.42-.23L15 5.3"
        />
      </svg>
    ),
    accent: "text-muted",
    border: "border-border",
    bg: "bg-card",
  },
  {
    title: "The Manager",
    question: '"Did AI do X correctly?"',
    description:
      "Delegates tasks one at a time. Checks output. Edits it. Sends another task. They've replaced one form of manual labor with another. Babysitting, not leveraging.",
    problem: "Marginal improvement",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    accent: "text-muted",
    border: "border-border",
    bg: "bg-card",
  },
  {
    title: "The Director",
    question:
      '"What should be happening in my business right now that isn\'t?"',
    description:
      "Designs systems. Defines outcomes. Sets up workflows that run without them. They don't ask AI to write an email — they build a system where the right email gets written, reviewed, and sent on triggers they defined once.",
    problem: "Compounds forever",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    accent: "text-gold",
    border: "border-border-gold",
    bg: "bg-card",
    highlighted: true,
  },
];

export default function Roles() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".roles-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".roles-sub", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".role-card", {
        scrollTrigger: {
          trigger: ".role-cards",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="roles-heading font-display text-sm font-medium tracking-[0.3em] uppercase text-gold mb-6">
            The Core Problem
          </p>
          <h2 className="roles-heading font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight text-balance">
            Most AI training teaches
            <br />
            <span className="text-muted">the wrong thing.</span>
          </h2>
          <p className="roles-sub mt-6 text-lg text-muted leading-relaxed">
            People learn to be technicians or managers. Both are already
            commoditized. By the time you learn a specific tool, the tool has
            changed. This workshop teaches the skill that compounds.
          </p>
        </div>

        {/* Three role cards */}
        <div className="role-cards mt-20 grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.title}
              className={`role-card group relative rounded-2xl border ${role.border} ${role.bg} p-8 transition-all duration-500 hover:bg-card-hover ${
                role.highlighted
                  ? "gold-glow ring-1 ring-gold/20"
                  : ""
              }`}
            >
              {role.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block rounded-full bg-gold px-4 py-1 text-xs font-bold text-background tracking-wider uppercase">
                    This is what we teach
                  </span>
                </div>
              )}

              <div className={`${role.accent} mb-6`}>{role.icon}</div>

              <h3
                className={`font-display text-2xl font-bold mb-2 ${
                  role.highlighted ? "text-gold" : "text-foreground"
                }`}
              >
                {role.title}
              </h3>

              <p className="text-sm font-medium text-muted/60 italic mb-4">
                {role.question}
              </p>

              <p className="text-base leading-relaxed text-muted mb-6">
                {role.description}
              </p>

              <div
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                  role.highlighted
                    ? "bg-gold-dim text-gold"
                    : "bg-foreground/5 text-muted"
                }`}
              >
                {role.problem}
              </div>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="mt-16 mx-auto max-w-2xl text-center">
          <blockquote className="roles-sub text-lg italic text-muted leading-relaxed">
            &ldquo;The director doesn&apos;t need to know how the camera works.
            They need to know what the scene should{" "}
            <span className="text-gold font-medium not-italic">feel</span>{" "}
            like.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

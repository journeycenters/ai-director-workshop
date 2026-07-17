"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    title: "The Technician",
    question: "How do I make AI do X?",
    description:
      "Learns prompts. Memorizes features. Follows tutorials. The prompts change, the features update, the tutorials expire. Always chasing.",
    verdict: "Commoditized on arrival",
    highlighted: false,
  },
  {
    title: "The Manager",
    question: "Did AI do X correctly?",
    description:
      "Delegates tasks one at a time. Checks output. Edits it. Sends another. They've replaced one form of manual labor with another: babysitting, not leveraging.",
    verdict: "Marginal improvement",
    highlighted: false,
  },
  {
    title: "The Director",
    question: "What should be happening in my business right now that isn't?",
    description:
      "Designs systems. Defines outcomes. Sets up workflows that run without them. They don't ask AI to write an email. They build a system where the right email gets written, reviewed, and sent on triggers they defined once.",
    verdict: "Compounds forever",
    highlighted: true,
  },
];

export default function Roles() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".roles-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".roles-heading > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".roles-sub", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".role-card", {
        scrollTrigger: { trigger: ".role-cards", start: "top 82%" },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".roles-quote", {
        scrollTrigger: { trigger: ".roles-quote", start: "top 88%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="roles-label font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-gold/70 mb-6">
            The Core Problem
          </p>
          <div className="roles-heading">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight leading-[1.1]">
              <span className="block">Most AI training teaches</span>
              <span className="block text-gradient-gold">the wrong thing.</span>
            </h2>
          </div>
          <p className="roles-sub mt-6 text-lg text-muted leading-relaxed max-w-xl mx-auto">
            People learn to be technicians or managers. Both are already
            commoditized. This workshop teaches the skill that compounds.
          </p>
        </div>

        {/* Three role cards */}
        <div className="role-cards mt-20 grid gap-6 lg:grid-cols-3">
          {roles.map((role, i) => (
            <div
              key={role.title}
              className={`role-card group relative rounded-2xl p-8 lg:p-10 transition-all duration-500 cursor-default ${
                role.highlighted
                  ? "glass-gold gold-glow glow-border glow-border-intense"
                  : "glass hover:bg-white/[0.04]"
              }`}
            >
              {role.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block rounded-full bg-gold px-4 py-1 font-mono text-[10px] font-bold text-deep tracking-[0.15em] uppercase">
                    This is what we teach
                  </span>
                </div>
              )}

              {/* Number */}
              <span
                className={`font-mono text-[11px] tracking-[0.2em] ${
                  role.highlighted ? "text-gold/60" : "text-dim"
                }`}
              >
                0{i + 1}
              </span>

              <h3
                className={`mt-4 font-display text-2xl font-bold ${
                  role.highlighted ? "text-gold" : "text-fg"
                }`}
              >
                {role.title}
              </h3>

              <p
                className={`mt-2 text-sm italic leading-relaxed ${
                  role.highlighted ? "text-gold/50" : "text-dim"
                }`}
              >
                &ldquo;{role.question}&rdquo;
              </p>

              <p className="mt-4 text-base leading-relaxed text-muted">
                {role.description}
              </p>

              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <span
                  className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] font-medium tracking-[0.1em] uppercase ${
                    role.highlighted
                      ? "bg-gold/10 text-gold"
                      : "bg-white/[0.04] text-dim"
                  }`}
                >
                  {role.verdict}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="roles-quote mt-20 mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <blockquote className="font-display text-xl italic text-muted leading-relaxed">
            &ldquo;The director doesn&apos;t need to know how the camera works.
            They need to know what the scene should{" "}
            <span className="text-gold not-italic font-semibold">feel</span>{" "}
            like.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

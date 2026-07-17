"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import OrganicWaves from "@/components/welcome/OrganicWaves";
import MistField from "@/components/welcome/MistField";
import FloatingOrb from "@/components/welcome/FloatingOrb";
import "./welcome.css";

gsap.registerPlugin(ScrollTrigger);

const journey = [
  {
    time: "00:00",
    title: "Arrival & Mindset",
    subtitle: "What you'll unlearn before we begin.",
  },
  {
    time: "00:45",
    title: "The Director's Frame",
    subtitle: "Why most people use AI wrong, and how to fix it in one shift.",
  },
  {
    time: "01:30",
    title: "The Build",
    subtitle: "You'll leave with a real, working system you'll use tomorrow.",
  },
  {
    time: "03:00",
    title: "The Path Forward",
    subtitle: "Your 30-day playbook and what compounds from here.",
  },
];

const principles = [
  {
    n: "I",
    title: "Direction over operation",
    body: "You will not learn buttons. You will learn to hold a vision and orchestrate intelligence toward it.",
  },
  {
    n: "II",
    title: "Systems over tasks",
    body: "We are not automating one email. We are designing rhythms that run your business while you sleep.",
  },
  {
    n: "III",
    title: "Clarity over cleverness",
    body: "The skill is not prompting. The skill is thinking precisely enough that something else can act on it.",
  },
];

export default function Welcome() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Cinematic letter-by-letter hero reveal — wrapped per word so lines never break mid-word
      const splitChars = (selector: string) => {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => {
          const text = el.textContent || "";
          const words = text.split(" ");
          el.innerHTML = words
            .map((word) => {
              const chars = word
                .split("")
                .map(
                  (c) =>
                    `<span class="char-wrap"><span class="char">${c}</span></span>`
                )
                .join("");
              return `<span class="word-wrap">${chars}</span>`;
            })
            .join(" ");
        });
      };

      splitChars(".reveal-chars");

      gsap.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-line-1 .char", {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.025,
        delay: 0.4,
        ease: "power4.out",
      });

      gsap.from(".hero-line-2 .char", {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.025,
        delay: 0.7,
        ease: "power4.out",
      });

      gsap.from(".hero-line-3 .char", {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.018,
        delay: 1.0,
        ease: "power4.out",
      });

      gsap.from(".hero-rule", {
        scaleX: 0,
        duration: 1.6,
        delay: 1.4,
        ease: "power2.inOut",
        transformOrigin: "left center",
      });

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 1.6,
        ease: "power3.out",
      });

      gsap.from(".hero-meta", {
        opacity: 0,
        duration: 1,
        delay: 1.9,
        ease: "power3.out",
      });

      gsap.from(".hero-orb", {
        opacity: 0,
        scale: 0.85,
        duration: 2,
        delay: 0.6,
        ease: "power3.out",
      });

      // Welcome section
      gsap.from(".welcome-quote .char", {
        scrollTrigger: { trigger: ".welcome-quote", start: "top 75%" },
        yPercent: 110,
        duration: 1.2,
        stagger: 0.012,
        ease: "power4.out",
      });

      gsap.from(".welcome-attribution", {
        scrollTrigger: { trigger: ".welcome-quote", start: "top 70%" },
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      // Principles
      gsap.from(".principle", {
        scrollTrigger: { trigger: ".principles", start: "top 75%" },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".principle-rule", {
        scrollTrigger: { trigger: ".principles", start: "top 75%" },
        scaleX: 0,
        stagger: 0.2,
        duration: 1.4,
        delay: 0.3,
        ease: "power2.inOut",
        transformOrigin: "left center",
      });

      // Journey timeline
      gsap.from(".j-row", {
        scrollTrigger: { trigger: ".journey", start: "top 75%" },
        opacity: 0,
        x: -40,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".j-line-fill", {
        scrollTrigger: { trigger: ".journey", start: "top 70%" },
        scaleY: 0,
        duration: 2,
        ease: "power2.inOut",
        transformOrigin: "top center",
      });

      // Final section
      gsap.from(".final-text", {
        scrollTrigger: { trigger: ".final-section", start: "top 70%" },
        opacity: 0,
        y: 40,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.from(".final-rule", {
        scrollTrigger: { trigger: ".final-section", start: "top 65%" },
        scaleX: 0,
        duration: 1.6,
        delay: 0.4,
        ease: "power2.inOut",
        transformOrigin: "center",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="welcome-page relative min-h-screen overflow-x-hidden">
      <MistField count={70} />

      {/* HERO */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OrganicWaves />
          {/* Vignette layers for cinematic depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,transparent,rgba(8,12,9,0.6))] z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]" />
        </div>

        {/* Floating orb — top right */}
        <div className="hero-orb absolute top-[8%] right-[8%] z-[2] hidden lg:block opacity-90">
          <FloatingOrb size={340} />
        </div>

        {/* Floating orb — mobile (centered, smaller) */}
        <div className="hero-orb absolute top-[6%] left-1/2 -translate-x-1/2 z-[2] lg:hidden opacity-80">
          <FloatingOrb size={180} />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12">
          <p className="hero-eyebrow font-mono text-[11px] font-medium tracking-[0.4em] uppercase text-amber-200/70 mb-12">
            April 11, 2026 · The AI Director Intensive
          </p>

          <h1 className="font-display font-medium tracking-tight leading-[0.92]">
            <span className="hero-line-1 reveal-chars block text-[clamp(2.8rem,7vw,6.5rem)] text-cream/95 overflow-hidden">
              You are not here
            </span>
            <span className="hero-line-2 reveal-chars block text-[clamp(2.8rem,7vw,6.5rem)] text-cream/95 overflow-hidden italic">
              to learn a tool.
            </span>
            <span className="hero-line-3 reveal-chars block text-[clamp(2.8rem,7vw,6.5rem)] mt-3 overflow-hidden">
              <span className="text-gradient-warm">You are here to direct.</span>
            </span>
          </h1>

          <div className="hero-rule mt-12 h-px w-32 bg-gradient-to-r from-amber-300/80 to-transparent" />

          <p className="hero-sub mt-8 max-w-xl text-lg lg:text-xl leading-relaxed text-cream/70 font-light">
            The next three hours will not look like training. They will look like
            a conversation, a quiet build, and a small moment when something
            clicks. Welcome.
          </p>

          <div className="hero-meta mt-16 flex items-center gap-6 font-mono text-[10px] tracking-[0.25em] uppercase text-cream/40">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1 w-1 rounded-full bg-amber-300/80 animate-pulse" />
              Live now
            </span>
            <span>·</span>
            <span>25 directors</span>
            <span>·</span>
            <span>1 room</span>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/40">
            Begin
          </span>
          <div className="relative h-12 w-px bg-cream/15 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-amber-300/80 to-transparent scroll-cue-line" />
          </div>
        </div>
      </section>

      {/* WELCOME / OPENING WORD */}
      <section className="relative py-44 lg:py-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c09] via-[#0c1410] to-[#080c09]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,150,47,0.06),transparent)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <p className="font-mono text-[10px] font-medium tracking-[0.4em] uppercase text-amber-300/60 mb-12">
            Opening Word
          </p>

          <blockquote className="welcome-quote reveal-chars font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-medium leading-[1.3] text-cream/90 italic overflow-hidden">
            The director does not need to know how the camera works. They need
            to know what the scene should feel like.
          </blockquote>

          <p className="welcome-attribution mt-12 font-mono text-[11px] tracking-[0.25em] uppercase text-cream/40">
            Today's only premise
          </p>
        </div>
      </section>

      {/* THREE PRINCIPLES */}
      <section className="principles relative py-44 lg:py-56 overflow-hidden">
        <div className="absolute inset-0 bg-[#080c09]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center mb-24">
            <p className="font-mono text-[10px] font-medium tracking-[0.4em] uppercase text-amber-300/60 mb-6">
              Three Principles
            </p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-cream/95">
              The whole workshop, in three sentences.
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-16 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.n} className="principle relative">
                <span className="font-display text-6xl font-light text-amber-300/30 italic">
                  {p.n}
                </span>
                <div className="principle-rule mt-4 mb-6 h-px w-12 bg-amber-300/40 origin-left" />
                <h3 className="font-display text-2xl lg:text-3xl font-medium text-cream/95 leading-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed text-cream/55 font-light">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY / TIMELINE */}
      <section className="journey relative py-44 lg:py-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c09] via-[#0a100c] to-[#080c09]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(201,150,47,0.05),transparent)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12">
          <div className="text-center mb-24">
            <p className="font-mono text-[10px] font-medium tracking-[0.4em] uppercase text-amber-300/60 mb-6">
              Today's Journey
            </p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-cream/95">
              Three hours. <span className="italic text-gradient-warm">One arrival.</span>
            </h2>
          </div>

          <div className="relative mx-auto max-w-2xl">
            {/* Timeline rail */}
            <div className="absolute left-[58px] top-2 bottom-2 w-px bg-cream/8">
              <div className="j-line-fill absolute inset-0 bg-gradient-to-b from-amber-300/60 via-amber-300/20 to-transparent" />
            </div>

            <div className="space-y-16">
              {journey.map((j) => (
                <div key={j.time} className="j-row relative flex gap-10 items-start">
                  <span className="font-mono text-xs text-amber-300/70 tracking-[0.15em] mt-2 w-12 flex-shrink-0">
                    {j.time}
                  </span>
                  <div className="relative z-10 flex-shrink-0 mt-2">
                    <div className="h-3 w-3 rounded-full bg-amber-300/90 ring-4 ring-[#0a100c]" />
                  </div>
                  <div className="flex-1 -mt-1">
                    <h3 className="font-display text-2xl lg:text-3xl font-medium text-cream/95 leading-tight">
                      {j.title}
                    </h3>
                    <p className="mt-3 text-base lg:text-lg text-cream/55 font-light leading-relaxed">
                      {j.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="final-section relative py-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c09] to-[#040706]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(201,150,47,0.08),transparent)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <div className="final-rule mx-auto mb-16 h-px w-32 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

          <p className="final-text font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.15] text-cream/95">
            Set down what you walked in with.
            <br />
            <span className="italic text-gradient-warm">
              The room is yours now.
            </span>
          </p>

          <p className="final-text mt-16 font-mono text-[11px] tracking-[0.3em] uppercase text-cream/40">
            We begin shortly
          </p>
        </div>
      </section>
    </div>
  );
}

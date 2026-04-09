"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const included = [
  "4-hour live intensive (in-person or hybrid)",
  "Your personal Soul Document — built in-session",
  "A working AI workflow you'll use starting tomorrow",
  "The Director's Briefing Framework (one-pager)",
  "30-day refinement playbook",
  "Community access for ongoing support",
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pricing-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: ".pricing-cards",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="pricing-heading font-display text-sm font-medium tracking-[0.3em] uppercase text-gold mb-6">
            Investment
          </p>
          <h2 className="pricing-heading font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight text-balance">
            One session.{" "}
            <span className="text-gold">Permanent skill.</span>
          </h2>
        </div>

        <div className="pricing-cards mt-16 mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
          {/* Early Bird */}
          <div className="pricing-card rounded-2xl border border-border bg-card p-10 transition-all duration-500 hover:bg-card-hover">
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">
              Early Bird
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-foreground">
                $147
              </span>
              <span className="text-muted">/person</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              Limited availability — locks in before April 8
            </p>

            <div className="mt-8 h-px bg-border" />

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-base text-muted">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-10 block w-full rounded-full border border-border py-4 text-center font-semibold text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Get Early Bird Pricing
            </a>
          </div>

          {/* Standard / Featured */}
          <div className="pricing-card relative rounded-2xl border border-border-gold bg-card p-10 gold-glow transition-all duration-500 hover:bg-card-hover">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-block rounded-full bg-gold px-4 py-1 text-xs font-bold text-background tracking-wider uppercase">
                Most Popular
              </span>
            </div>

            <p className="text-sm font-semibold text-gold uppercase tracking-wider">
              Standard
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-gold">
                $297
              </span>
              <span className="text-muted">/person</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              Full price — still a fraction of the revenue you&apos;ll recover
            </p>

            <div className="mt-8 h-px bg-border-gold/30" />

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-base text-muted">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-base text-gold font-medium">
                  Priority seating + recording access
                </span>
              </li>
            </ul>

            <a
              href="#"
              className="mt-10 block w-full rounded-full bg-gold py-4 text-center font-bold text-background tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
            >
              Reserve Your Seat
            </a>
          </div>
        </div>

        {/* Social proof / urgency */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">
            Cohort limited to <strong className="text-foreground">25 people</strong> for hands-on support
            &middot; Next session:{" "}
            <strong className="text-gold">April 11, 2026</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function TiltCard({
  children,
  className,
  goldGlow = false,
}: {
  children: React.ReactNode;
  className?: string;
  goldGlow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(ref.current, {
      rotateX: (y - 0.5) * -8,
      rotateY: (x - 0.5) * 8,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div
      ref={ref}
      className={`tilt-card relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className={`absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] pointer-events-none opacity-0 ${
          goldGlow ? "bg-gold/15" : "bg-white/5"
        }`}
      />
      <div className="relative z-10">{children}</div>
    </div>
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
      x: x * 0.25,
      y: y * 0.25,
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
      className={`magnetic-btn inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

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
      gsap.from(".price-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".price-heading > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".price-card", {
        scrollTrigger: { trigger: ".price-cards", start: "top 85%" },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".price-note", {
        scrollTrigger: { trigger: ".price-note", start: "top 92%" },
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-32 lg:py-44"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="price-label font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-gold/70 mb-6">
            Investment
          </p>
          <div className="price-heading">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight leading-[1.1]">
              <span className="block">One session.</span>
              <span className="block text-gradient-gold">Permanent skill.</span>
            </h2>
          </div>
        </div>

        <div className="price-cards mt-16 mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
          {/* Early Bird */}
          <TiltCard className="price-card rounded-2xl glass p-10 overflow-hidden">
            <p className="font-mono text-[10px] font-semibold text-dim uppercase tracking-[0.2em]">
              Early Bird
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-fg">
                $147
              </span>
              <span className="text-dim">/person</span>
            </div>
            <p className="mt-3 text-sm text-dim">
              Limited availability — locks in before April 8
            </p>

            <div className="mt-8 h-px bg-white/[0.06]" />

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-2 h-1 w-1 rounded-full bg-dim/50 flex-shrink-0" />
                  <span className="text-base text-muted">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-10 block w-full rounded-full border border-white/[0.08] py-4 text-center font-semibold text-fg cursor-pointer transition-all duration-300 hover:border-gold/30 hover:text-gold hover:bg-gold/[0.04]"
            >
              Get Early Bird Pricing
            </a>
          </TiltCard>

          {/* Standard / Featured */}
          <TiltCard
            className="price-card rounded-2xl glass-gold gold-glow-strong p-10 overflow-hidden"
            goldGlow
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <span className="inline-block rounded-full bg-gold px-4 py-1 font-mono text-[10px] font-bold text-deep tracking-[0.15em] uppercase">
                Most Popular
              </span>
            </div>

            <p className="font-mono text-[10px] font-semibold text-gold/70 uppercase tracking-[0.2em]">
              Standard
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-gradient-gold">
                $297
              </span>
              <span className="text-dim">/person</span>
            </div>
            <p className="mt-3 text-sm text-dim">
              Full price — still a fraction of the revenue you&apos;ll recover
            </p>

            <div className="mt-8 h-px bg-gold/10" />

            <ul className="mt-8 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-2 h-1 w-1 rounded-full bg-gold/50 flex-shrink-0" />
                  <span className="text-base text-muted">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <div className="mt-2 h-1 w-1 rounded-full bg-gold flex-shrink-0" />
                <span className="text-base text-gold font-medium">
                  Priority seating + recording access
                </span>
              </li>
            </ul>

            <MagneticButton
              href="#"
              className="mt-10 block w-full rounded-full bg-gold py-4 text-center font-bold text-deep tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Reserve Your Seat
            </MagneticButton>
          </TiltCard>
        </div>

        <div className="price-note mt-12 text-center">
          <p className="font-mono text-[11px] text-dim tracking-[0.1em]">
            Cohort limited to{" "}
            <span className="text-fg">25 people</span> for hands-on support
            &middot; Next session:{" "}
            <span className="text-gold">April 11, 2026</span>
          </p>
        </div>
      </div>
    </section>
  );
}

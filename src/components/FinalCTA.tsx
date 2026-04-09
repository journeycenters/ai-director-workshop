"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-divider", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        scaleX: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.from(".cta-heading > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".cta-sub", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".cta-btn", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".cta-note", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-base overflow-hidden"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,rgba(212,168,67,0.05),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(212,168,67,0.02),transparent)]" />

      {/* Animated blobs */}
      <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[120px] animate-blob animation-delay-2" />
      <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-purple-500/[0.03] blur-[100px] animate-blob-reverse" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        {/* Gold divider */}
        <div className="cta-divider mx-auto mb-12 h-px w-20 origin-center bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="cta-heading">
          <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold tracking-tight leading-[1.1]">
            <span className="block">The gap between people who</span>
            <span className="block text-gradient-gold">direct</span>
            <span className="block">and people who wait to be directed</span>
            <span className="block text-muted">is getting wider, faster.</span>
          </h2>
        </div>

        <p className="cta-sub mt-8 mx-auto max-w-xl text-lg text-muted leading-relaxed">
          This isn&apos;t about AI taking jobs. It&apos;s about the difference
          between people who build systems and people who follow instructions.
        </p>

        <div className="cta-btn mt-10 inline-block">
          <a
            ref={btnRef}
            href="#pricing"
            className="magnetic-btn inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-lg font-bold text-deep tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/25 hover:scale-[1.02]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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

        <p className="cta-note mt-8 font-mono text-[11px] text-dim tracking-[0.15em]">
          April 11, 2026 &middot; 25 seats &middot; Laptop + Claude required
        </p>
      </div>
    </section>
  );
}

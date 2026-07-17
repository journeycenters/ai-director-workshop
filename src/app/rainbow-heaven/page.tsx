"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HolographicBg from "@/components/rainbow/HolographicBg";
import RainbowParticles from "@/components/rainbow/RainbowParticles";
import SparkleCursor from "@/components/rainbow/SparkleCursor";
import "./rainbow.css";

gsap.registerPlugin(ScrollTrigger);

function TiltCard({
  children,
  className = "",
  rotateBase = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotateBase?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ref.current, {
      rotateX: y * -15,
      rotateY: x * 15,
      rotate: rotateBase,
      scale: 1.05,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      rotate: rotateBase,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ transform: `rotate(${rotateBase}deg)` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

const features = [
  {
    title: "VIBES",
    emoji: "✨",
    desc: "Pure unfiltered serotonin in pixel form. We're talking maximum dopamine delivery.",
    color: "from-pink-500 via-fuchsia-500 to-purple-500",
    rotate: -2,
  },
  {
    title: "JOY",
    emoji: "💖",
    desc: "Every click should feel like discovering a glitter pen at age 8.",
    color: "from-cyan-400 via-pink-400 to-yellow-400",
    rotate: 1.5,
  },
  {
    title: "MAGIC",
    emoji: "🦄",
    desc: "Rainbow physics. Holographic feels. Iridescent everything.",
    color: "from-yellow-400 via-orange-400 to-pink-500",
    rotate: -1,
  },
  {
    title: "CHAOS",
    emoji: "🌈",
    desc: "Maximum maximalism. Subtlety left the building. We are LOUD now.",
    color: "from-purple-500 via-cyan-400 to-lime-400",
    rotate: 2,
  },
  {
    title: "LOVE",
    emoji: "💅",
    desc: "Built with hyper-feminine queer celebratory energy. Period.",
    color: "from-fuchsia-500 via-pink-500 to-rose-400",
    rotate: -1.5,
  },
  {
    title: "SPARKLE",
    emoji: "⭐",
    desc: "Every pixel earned its place by being absolutely fabulous.",
    color: "from-cyan-400 via-purple-500 to-pink-500",
    rotate: 1,
  },
];

export default function RainbowHeaven() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero animation
      gsap.from(".hero-title-1", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.from(".hero-title-2", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: "back.out(2)",
      });

      // Bento card reveals
      gsap.from(".bento-card", {
        scrollTrigger: { trigger: ".bento-grid", start: "top 80%" },
        y: 100,
        opacity: 0,
        scale: 0.5,
        rotate: 0,
        stagger: 0.15,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
      });

      // Section heading
      gsap.from(".sect-heading", {
        scrollTrigger: { trigger: ".sect-heading", start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      // Manifesto
      gsap.from(".manifesto-text", {
        scrollTrigger: { trigger: ".manifesto-text", start: "top 80%" },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // CTA section
      gsap.from(".final-cta", {
        scrollTrigger: { trigger: ".final-cta", start: "top 75%" },
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="rainbow-page relative min-h-screen overflow-x-hidden">
      <HolographicBg />
      <RainbowParticles />
      <SparkleCursor />

      {/* NAV */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:p-8">
        <div className="rainbow-text-static text-2xl font-black tracking-tight">
          ✦ HEAVEN.EXE ✦
        </div>
        <a
          href="#join"
          className="rainbow-btn-sm group relative overflow-hidden rounded-full px-6 py-3 font-bold text-white"
        >
          <span className="relative z-10">ENTER →</span>
        </a>
      </nav>

      {/* HERO */}
      <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-black tracking-tighter leading-[0.85]">
          <span className="hero-title-1 block text-[clamp(3.5rem,12vw,11rem)] rainbow-text-animated">
            BARBIE ATE
          </span>
          <span className="hero-title-2 block text-[clamp(3.5rem,12vw,11rem)] rainbow-text-animated [animation-delay:1s]">
            A RAINBOW
          </span>
        </h1>

        <p className="hero-sub mt-10 max-w-2xl text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_20px_rgba(255,0,255,0.8)]">
          And then she went to lesbian heaven and built a website
          about it. Welcome to <span className="text-yellow-300">maximum vibes</span>.
        </p>

        <div className="hero-cta mt-12 flex flex-wrap items-center justify-center gap-6">
          <a
            href="#vibes"
            className="rainbow-btn-lg group relative overflow-hidden rounded-full px-12 py-6 text-xl font-black text-white"
          >
            <span className="relative z-10 tracking-wider">FEEL THE VIBES ✨</span>
          </a>
          <a
            href="#manifesto"
            className="glass-btn rounded-full border-2 border-white/40 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:rotate-2 hover:border-white/80 hover:bg-white/20"
          >
            READ THE GOSPEL
          </a>
        </div>

        <div className="mt-16 flex items-center gap-3 text-sm font-bold tracking-[0.3em] text-white/80">
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-pink-400" />
          NOW SERVING JOY 24/7
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-cyan-400" />
        </div>
      </section>

      {/* BENTO GRID */}
      <section id="vibes" className="relative z-10 px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="sect-heading mb-20 text-center font-black tracking-tighter">
            <span className="block text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] rainbow-text-static">
              SIX FLAVORS
            </span>
            <span className="block text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] text-white drop-shadow-[0_4px_20px_rgba(255,0,255,0.6)]">
              OF EUPHORIA
            </span>
          </h2>

          <div className="bento-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <TiltCard
                key={f.title}
                rotateBase={f.rotate}
                className={`bento-card relative cursor-pointer ${
                  i === 0 ? "lg:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative h-full overflow-hidden rounded-3xl bg-gradient-to-br ${f.color} p-8 shadow-[0_20px_80px_-20px_rgba(255,0,255,0.5)]`}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                  {/* Sparkle decoration */}
                  <div className="absolute right-4 top-4 text-4xl opacity-50">
                    ✦
                  </div>
                  <div className="relative">
                    <div className="text-6xl mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                      {f.emoji}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-base md:text-lg font-semibold text-white/95 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="sect-heading mb-16 text-[clamp(2.5rem,7vw,6rem)] font-black tracking-tighter leading-[0.9]">
            <span className="block rainbow-text-animated">THE GOSPEL</span>
          </h2>

          <div className="space-y-8">
            {[
              "We believe joy is a finite resource that you should hoard like a dragon.",
              "We believe pink is a gender-neutral color and rainbows are a structural element.",
              "We believe maximum sparkle is the only acceptable amount of sparkle.",
              "We believe your website should look like it's having an actual party without you.",
            ].map((line, i) => (
              <p
                key={i}
                className="manifesto-text text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_15px_rgba(255,0,255,0.5)] hover:scale-105 hover:text-yellow-300 transition-all duration-500 cursor-default"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="join" className="relative z-10 px-6 py-32">
        <div className="final-cta mx-auto max-w-5xl">
          <div className="rainbow-border relative overflow-hidden rounded-[3rem] p-16 md:p-24 text-center">
            <div className="relative z-10">
              <p className="mb-6 text-sm font-black tracking-[0.4em] text-white/80">
                ✦ ✦ ✦  THE INVITATION  ✦ ✦ ✦
              </p>
              <h2 className="text-[clamp(3rem,9vw,8rem)] font-black tracking-tighter leading-[0.85] text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.6)]">
                COME GET
                <br />
                <span className="rainbow-text-animated">DELIRIOUS</span>
              </h2>
              <p className="mx-auto mt-10 max-w-xl text-lg md:text-xl font-bold text-white/95">
                There is no product. There is no service. There is only the vibe.
                And the vibe is <span className="text-yellow-200">immaculate</span>.
              </p>
              <button className="mt-12 group relative inline-flex items-center gap-3 rounded-full bg-white px-12 py-6 text-xl font-black text-pink-600 transition-all duration-300 hover:scale-110 hover:rotate-2 hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.8)]">
                <span>YES PLEASE</span>
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/20 px-6 py-12 text-center">
        <p className="text-sm font-bold tracking-widest text-white/70">
          made with ❤️ and an unhealthy amount of pink &middot;{" "}
          <a href="/" className="hover:text-pink-300 underline">
            back to reality
          </a>
        </p>
      </footer>
    </div>
  );
}

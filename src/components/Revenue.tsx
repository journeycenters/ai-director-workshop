"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function CountUp({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const start = useCallback(() => {
    if (triggered) return;
    setTriggered(true);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => setValue(Math.round(obj.val)),
    });
  }, [triggered, target]);

  useEffect(() => {
    if (!ref.current) return;
    const t = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: start,
    });
    return () => t.kill();
  }, [start]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 60,
    suffix: "%",
    label: "of your week",
    description: "is being eaten by work AI could handle today",
  },
  {
    value: 60,
    prefix: "$",
    suffix: "K",
    label: "per year",
    description: "in revenue hiding inside admin tasks",
  },
  {
    value: 6,
    suffix: "+",
    label: "hours reclaimed",
    description: "every week when you direct instead of do",
  },
];

export default function Revenue() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".rev-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".rev-heading > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".rev-stat", {
        scrollTrigger: { trigger: ".rev-stats", start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".rev-example", {
        scrollTrigger: { trigger: ".rev-example", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-44 bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(212,168,67,0.03),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="rev-label font-mono text-[11px] font-medium tracking-[0.3em] uppercase text-gold/70 mb-6">
            The Economics
          </p>
          <div className="rev-heading">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-tight leading-[1.1]">
              <span className="block">Real math.</span>
              <span className="block text-gradient-gold">Not hype.</span>
            </h2>
          </div>
        </div>

        {/* Stats grid */}
        <div className="rev-stats mt-20 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rev-stat text-center rounded-2xl glass p-10"
            >
              <div className="font-display text-[clamp(3rem,5vw,4.5rem)] font-bold text-gradient-gold gold-glow-text leading-none">
                <CountUp
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-3 font-display text-lg font-semibold text-fg">
                {stat.label}
              </p>
              <p className="mt-2 text-base text-muted">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="rev-example mt-16 mx-auto max-w-3xl rounded-2xl glass-gold p-10">
          <h3 className="font-display text-xl font-bold text-gold mb-8">
            The Therapist Example
          </h3>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] font-semibold text-dim uppercase tracking-[0.2em] mb-3">
                Before
              </p>
              <p className="text-base leading-relaxed text-muted">
                8 hours/week on notes, scheduling, intake follow-ups, and
                content creation.{" "}
                <span className="text-red-400/70 font-medium">
                  $0 revenue on those hours.
                </span>
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-semibold text-gold/70 uppercase tracking-[0.2em] mb-3">
                After Directing
              </p>
              <p className="text-base leading-relaxed text-muted">
                AI handles 80%. 6+ hours reclaimed. 3–4 additional client
                sessions/week.{" "}
                <span className="text-gold font-semibold">
                  $30,000–$60,000/year in recovered revenue.
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gold/10">
            <p className="text-base text-muted leading-relaxed">
              <strong className="text-fg">For revenue seekers:</strong> Skills
              that used to require hiring — copywriting, social media, client
              onboarding — can now be directed by one person. The pitch
              isn&apos;t &ldquo;I know AI.&rdquo; The pitch is{" "}
              <span className="text-gold font-semibold">
                &ldquo;I can make your business run smarter by next
                week.&rdquo;
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

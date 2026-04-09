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
  duration = 2,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const startCounting = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      onUpdate: () => setValue(Math.round(obj.val)),
    });
  }, [hasTriggered, target, duration]);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: startCounting,
    });

    return () => trigger.kill();
  }, [startCounting]);

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
    description: "in revenue hiding inside admin tasks for a therapist",
  },
  {
    value: 6,
    suffix: "+",
    label: "hours per week",
    description: "reclaimed when you direct instead of do",
  },
];

export default function Revenue() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".revenue-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".revenue-stat", {
        scrollTrigger: {
          trigger: ".revenue-stats",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".revenue-example", {
        scrollTrigger: {
          trigger: ".revenue-example",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="revenue-heading font-display text-sm font-medium tracking-[0.3em] uppercase text-gold mb-6">
            The Economics
          </p>
          <h2 className="revenue-heading font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight text-balance">
            Real math.{" "}
            <span className="text-gold">Not hype.</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="revenue-stats mt-20 grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="revenue-stat text-center rounded-2xl border border-border bg-card p-10"
            >
              <div className="font-display text-[clamp(3rem,5vw,4.5rem)] font-bold text-gold gold-glow-text leading-none">
                <CountUp
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 font-display text-lg font-semibold text-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-base text-muted">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed example */}
        <div className="revenue-example mt-16 mx-auto max-w-3xl rounded-2xl border border-border-gold bg-card p-10">
          <h3 className="font-display text-xl font-bold text-gold mb-6">
            The Therapist Example
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                Before
              </p>
              <p className="text-base leading-relaxed text-muted">
                8 hours/week on notes, scheduling admin, intake follow-ups, and
                content creation.{" "}
                <span className="text-red-400/80 font-medium">
                  $0 revenue on those hours.
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
                After Directing
              </p>
              <p className="text-base leading-relaxed text-muted">
                AI handles 80%. 6+ hours reclaimed. 3–4 additional client
                sessions/week.{" "}
                <span className="text-gold font-medium">
                  $30,000–$60,000/year in recovered revenue.
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-base text-muted leading-relaxed">
              <strong className="text-foreground">
                For revenue seekers:
              </strong>{" "}
              Skills that used to require hiring — copywriting, social media,
              client onboarding — can now be directed by one person. New business
              models that weren&apos;t viable solo are now viable. The pitch
              isn&apos;t &ldquo;I know AI.&rdquo; The pitch is{" "}
              <span className="text-gold font-medium">
                &ldquo;I can make your business run smarter by next week.&rdquo;
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

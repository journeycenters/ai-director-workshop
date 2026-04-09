"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.documentElement.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
        },
      });

      tl.from(".pl-logo", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          ".pl-line",
          { scaleX: 0, duration: 0.8, ease: "power2.inOut" },
          "-=0.2"
        )
        .from(
          ".pl-text",
          { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        )
        .to({}, { duration: 0.4 })
        .to(ref.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .set(ref.current, { display: "none" });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] bg-deep flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/logo.png"
          alt=""
          width={48}
          height={48}
          className="pl-logo opacity-80"
        />
        <div className="pl-line h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center" />
        <p className="pl-text font-mono text-[11px] tracking-[0.3em] uppercase text-gold/50">
          AI Director Workshop
        </p>
      </div>
    </div>
  );
}

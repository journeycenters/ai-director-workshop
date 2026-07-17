"use client";

import { useEffect, useRef } from "react";

export default function HolographicBg() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const curRef = useRef({ x: 0, y: 0, tgX: 0, tgY: 0 });

  useEffect(() => {
    let raf: number;

    const move = () => {
      const c = curRef.current;
      c.x += (c.tgX - c.x) / 12;
      c.y += (c.tgY - c.y) / 12;
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${c.x}px, ${c.y}px)`;
      }
      raf = requestAnimationFrame(move);
    };

    const handleMouseMove = (e: MouseEvent) => {
      curRef.current.tgX = e.clientX - window.innerWidth / 2;
      curRef.current.tgY = e.clientY - window.innerHeight / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    raf = requestAnimationFrame(move);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[linear-gradient(135deg,#1a0033,#33004d,#000033)]">
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0 w-full h-full"
        style={{ filter: "url(#goo) blur(30px)" }}
      >
        {/* Hot pink blob */}
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#ff1493,transparent_60%)] mix-blend-screen animate-blob-1" />
        {/* Magenta blob */}
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#ff00ff,transparent_60%)] mix-blend-screen animate-blob-2" />
        {/* Cyan blob */}
        <div className="absolute bottom-[20%] left-[30%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,#00ffff,transparent_60%)] mix-blend-screen animate-blob-3" />
        {/* Purple blob */}
        <div className="absolute top-[50%] left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,#9d00ff,transparent_60%)] mix-blend-screen animate-blob-4" />
        {/* Yellow blob */}
        <div className="absolute bottom-[5%] right-[20%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,#ffff00,transparent_60%)] mix-blend-screen animate-blob-5" />
        {/* Lime blob */}
        <div className="absolute top-[70%] left-[60%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,#00ff88,transparent_60%)] mix-blend-screen animate-blob-1" />

        {/* Mouse-follow blob */}
        <div
          ref={interactiveRef}
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -ml-[400px] -mt-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5),transparent_50%)] mix-blend-screen pointer-events-none"
        />
      </div>
    </div>
  );
}

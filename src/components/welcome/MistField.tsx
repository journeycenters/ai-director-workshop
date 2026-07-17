"use client";

import { useEffect, useRef } from "react";

interface Mote {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  phase: number;
  driftAmp: number;
}

export default function MistField({ count = 80 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let motes: Mote[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = document.documentElement.scrollHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      motes = [];
      for (let i = 0; i < count; i++) {
        motes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.1,
          vy: -Math.random() * 0.15 - 0.05,
          opacity: Math.random() * 0.35 + 0.05,
          phase: Math.random() * Math.PI * 2,
          driftAmp: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      for (const m of motes) {
        m.y += m.vy;
        m.x += m.vx + Math.sin(t * 0.3 + m.phase) * m.driftAmp * 0.3;

        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        const breathe = 0.7 + 0.3 * Math.sin(t * 0.5 + m.phase);
        const alpha = m.opacity * breathe;

        // Warm cream-amber dust
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 200, 150, ${alpha})`;
        ctx.fill();

        // Soft halo on larger motes
        if (m.size > 1.2) {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 200, 150, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[5] pointer-events-none"
    />
  );
}

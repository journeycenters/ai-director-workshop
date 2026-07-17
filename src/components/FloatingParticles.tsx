"use client";

import { useRef, useEffect } from "react";

interface Mote {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  phase: number;
}

export default function FloatingParticles({ count = 60 }: { count?: number }) {
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
      h = document.documentElement.scrollHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initMotes = () => {
      motes = [];
      for (let i = 0; i < count; i++) {
        motes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.4 + 0.1,
          drift: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      for (const m of motes) {
        m.y -= m.speed;
        m.x += Math.sin(t * 0.5 + m.phase) * m.drift;

        // Wrap around
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        // Twinkle
        const twinkle = 0.5 + 0.5 * Math.sin(t * 2 + m.phase);
        const alpha = m.opacity * (0.4 + 0.6 * twinkle);

        // Gold particle
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${alpha})`;
        ctx.fill();

        // Soft glow on larger particles
        if (m.size > 1.5) {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 168, 67, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initMotes();
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      initMotes();
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
      style={{ opacity: 0.7 }}
    />
  );
}

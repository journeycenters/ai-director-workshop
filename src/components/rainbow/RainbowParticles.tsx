"use client";

import { useEffect, useRef } from "react";

interface Pixel {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
}

const RAINBOW = [
  "#ff1493", // hot pink
  "#ff00ff", // magenta
  "#9d00ff", // purple
  "#00ffff", // cyan
  "#00ff88", // mint
  "#ffff00", // yellow
  "#ff8800", // orange
  "#ff0066", // rose
];

export default function RainbowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let pixels: Pixel[] = [];
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

    const spawn = (count: number) => {
      for (let i = 0; i < count; i++) {
        pixels.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 6 + 2,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -Math.random() * 0.8 - 0.2,
          color: RAINBOW[Math.floor(Math.random() * RAINBOW.length)],
          life: 0,
          maxLife: Math.random() * 400 + 200,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const init = () => {
      pixels = [];
      spawn(150);
    };

    const drawSparkle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      // Star/sparkle shape
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 3;

      // Diamond/4-point star
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.3, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.3, 0);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(0, size * 0.3);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, -size * 0.3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      // Spawn new pixels occasionally
      if (Math.random() < 0.4) spawn(2);

      pixels = pixels.filter((p) => {
        p.life++;
        p.x += p.vx + Math.sin(t + p.life * 0.02) * 0.3;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vy -= 0.005; // float up

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1
          ? lifeRatio * 10
          : lifeRatio > 0.8
          ? (1 - lifeRatio) * 5
          : 1;

        const twinkle = 0.7 + Math.sin(t * 4 + p.life * 0.1) * 0.3;

        drawSparkle(ctx, p.x, p.y, p.size, p.color, alpha * twinkle, p.rotation);

        return p.life < p.maxLife && p.y > -50;
      });

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[6] pointer-events-none"
    />
  );
}

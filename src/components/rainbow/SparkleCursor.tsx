"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
  vx: number;
  vy: number;
  rotation: number;
}

const COLORS = [
  "#ff1493",
  "#ff00ff",
  "#9d00ff",
  "#00ffff",
  "#ffff00",
  "#ff8800",
  "#00ff88",
];

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Spawn sparkles based on movement
      const moved = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);
      if (moved > 3 && time - lastSpawnRef.current > 16) {
        const count = Math.min(Math.floor(moved / 8), 4);
        for (let i = 0; i < count; i++) {
          sparklesRef.current.push({
            x: mouseX + (Math.random() - 0.5) * 20,
            y: mouseY + (Math.random() - 0.5) * 20,
            size: Math.random() * 8 + 3,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            life: 0,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 0.5,
            rotation: Math.random() * Math.PI * 2,
          });
        }
        lastSpawnRef.current = time;
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05;
        s.rotation += 0.1;

        const alpha = Math.max(0, 1 - s.life / 40);
        const size = s.size * (1 - s.life / 60);

        if (alpha <= 0 || size <= 0) return false;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = size * 2;

        // 4-point star sparkle
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.35, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.35, 0);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(0, size * 0.35);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, -size * 0.35);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        return s.life < 60;
      });

      // Draw glow at cursor
      if (mouseX > -500) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 60);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        grad.addColorStop(0.3, "rgba(255, 100, 255, 0.2)");
        grad.addColorStop(1, "rgba(255, 0, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 60, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    resize();
    animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

"use client";

import { useRef, useEffect, useCallback } from "react";

interface Point {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  wave: number;
}

export default function DigitalWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const pointsRef = useRef<Point[]>([]);
  const dimsRef = useRef({ w: 0, h: 0 });
  const frameRef = useRef(0);

  const COLS = 50;
  const ROWS = 28;
  const MOUSE_RADIUS = 180;
  const CONNECTION_DIST = 80;

  const initPoints = useCallback(() => {
    const { w, h } = dimsRef.current;
    const pts: Point[] = [];
    const spacingX = (w + 60) / (COLS - 1);
    const spacingY = (h + 60) / (ROWS - 1);

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        pts.push({
          baseX: col * spacingX - 30,
          baseY: row * spacingY - 30,
          x: col * spacingX - 30,
          y: row * spacingY - 30,
          wave: 0,
        });
      }
    }
    pointsRef.current = pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h };
      initPoints();
    };

    const animate = (time: number) => {
      const { w, h } = dimsRef.current;
      const points = pointsRef.current;
      const mouse = mouseRef.current;
      const t = time * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Update point positions with wave motion
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const col = i % COLS;
        const row = Math.floor(i / COLS);

        // Layered sine waves for organic flow
        const wave1 = Math.sin(t * 0.4 + col * 0.15 + row * 0.08) * 14;
        const wave2 = Math.cos(t * 0.25 + row * 0.2 + col * 0.05) * 10;
        const wave3 = Math.sin(t * 0.6 + (col + row) * 0.1) * 6;
        const wave4 = Math.cos(t * 0.15 + col * 0.08) * 8;

        p.wave = wave1 + wave2 + wave3;

        let targetX = p.baseX + wave3 * 0.5;
        let targetY = p.baseY + wave1 + wave2 + wave4;

        // Mouse repulsion
        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const eased = force * force * force; // cubic easing for smooth falloff
          targetX += (dx / dist) * eased * 80;
          targetY += (dy / dist) * eased * 80;
        }

        // Smooth interpolation
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;
      }

      // Draw connection lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const col = i % COLS;
        const row = Math.floor(i / COLS);

        // Right neighbor
        if (col < COLS - 1) {
          const n = points[i + 1];
          const d = Math.hypot(p.x - n.x, p.y - n.y);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.12;
            // Brighter near mouse
            const midX = (p.x + n.x) / 2;
            const midY = (p.y + n.y) / 2;
            const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            const mouseBoost = mouseDist < MOUSE_RADIUS ? (1 - mouseDist / MOUSE_RADIUS) * 0.2 : 0;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(212, 168, 67, ${alpha + mouseBoost})`;
            ctx.stroke();
          }
        }

        // Bottom neighbor
        if (row < ROWS - 1) {
          const n = points[i + COLS];
          const d = Math.hypot(p.x - n.x, p.y - n.y);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.1;
            const midX = (p.x + n.x) / 2;
            const midY = (p.y + n.y) / 2;
            const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            const mouseBoost = mouseDist < MOUSE_RADIUS ? (1 - mouseDist / MOUSE_RADIUS) * 0.18 : 0;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(212, 168, 67, ${alpha + mouseBoost})`;
            ctx.stroke();
          }
        }

        // Diagonal (bottom-right) for denser mesh
        if (col < COLS - 1 && row < ROWS - 1) {
          const n = points[i + COLS + 1];
          const d = Math.hypot(p.x - n.x, p.y - n.y);
          if (d < CONNECTION_DIST * 0.8) {
            const alpha = (1 - d / (CONNECTION_DIST * 0.8)) * 0.04;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(212, 168, 67, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const mouseProximity =
          mouseDist < MOUSE_RADIUS ? 1 - mouseDist / MOUSE_RADIUS : 0;

        // Wave-based brightness
        const waveBrightness = (p.wave + 30) / 60; // normalize to 0-1 range

        const baseAlpha = 0.15 + waveBrightness * 0.2;
        const alpha = Math.min(baseAlpha + mouseProximity * 0.65, 1);
        const radius = 1.2 + waveBrightness * 0.8 + mouseProximity * 2.5;

        // Main dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${alpha})`;
        ctx.fill();

        // Glow for mouse-proximate and wave-peak dots
        if (mouseProximity > 0.2 || waveBrightness > 0.7) {
          const glowAlpha = Math.max(mouseProximity * 0.2, waveBrightness * 0.06);
          const glowRadius = radius + 6 + mouseProximity * 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 168, 67, ${glowAlpha})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    animationId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initPoints]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

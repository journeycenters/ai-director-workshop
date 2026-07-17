"use client";

import { useRef, useEffect } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let smoothX = -1000;
    let smoothY = -1000;
    let visible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smooth interpolation for buttery cursor tracking
      smoothX += (mouseX - smoothX) * 0.12;
      smoothY += (mouseY - smoothY) * 0.12;

      if (visible && mouseX > -500) {
        // Large ambient glow
        const gradient = ctx.createRadialGradient(
          smoothX,
          smoothY,
          0,
          smoothX,
          smoothY,
          320
        );
        gradient.addColorStop(0, "rgba(212, 168, 67, 0.07)");
        gradient.addColorStop(0.4, "rgba(212, 168, 67, 0.03)");
        gradient.addColorStop(1, "rgba(212, 168, 67, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Tighter bright core
        const core = ctx.createRadialGradient(
          smoothX,
          smoothY,
          0,
          smoothX,
          smoothY,
          80
        );
        core.addColorStop(0, "rgba(240, 215, 140, 0.06)");
        core.addColorStop(1, "rgba(212, 168, 67, 0)");
        ctx.fillStyle = core;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      visible = true;
    };

    const handleMouseLeave = () => {
      visible = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    resize();
    animationId = requestAnimationFrame(draw);

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
      className="fixed inset-0 z-[60] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

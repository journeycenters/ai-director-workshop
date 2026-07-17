"use client";

import { useRef, useEffect } from "react";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uGlow;

vec3 palette(float t) {
    vec3 deepGold = vec3(0.12, 0.07, 0.01);
    vec3 brightGold = vec3(0.92, 0.72, 0.28);
    vec3 warmWhite = vec3(1.0, 0.92, 0.7);
    float s = 0.5 + 0.5 * sin(t);
    vec3 base = mix(deepGold, brightGold, s);
    // Hot white core on peaks
    return mix(base, warmWhite, smoothstep(0.85, 1.0, s));
}

float wave(vec2 uv, float freq, float phase) {
    return 0.4 * sin(uv.x * freq + uTime * uSpeed + phase);
}

float glowFn(float d, float strength) {
    return exp(-d * d * strength);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float y = uv.y;

    // Multiple wave layers for richness
    float w1 = wave(uv, 2.5, 0.0);
    float w2 = wave(uv, 4.5, 1.2);
    float w3 = wave(uv, 6.5, 2.8);
    float w4 = wave(uv, 8.0, 4.2);

    float waveLine = w1 + w2 * 0.6 + w3 * 0.35 + w4 * 0.2;
    float dist = abs(y - waveLine);

    // Primary glow
    float g = glowFn(dist, uGlow);

    // Secondary wider glow for atmosphere
    float g2 = glowFn(dist, uGlow * 0.15);

    vec3 col = palette(waveLine + y + uTime * 0.06);
    vec3 bg = vec3(0.01, 0.01, 0.015);

    // Layer the glows
    col = mix(bg, col * 0.4, g2 * 0.6);
    col = mix(col, palette(waveLine + y), g * 1.5);

    // Add subtle second wave set (offset vertically)
    float y2 = uv.y + 0.4;
    float w2a = wave(uv, 3.0, 0.8);
    float w2b = wave(uv, 5.5, 2.0);
    float waveLine2 = w2a + w2b * 0.5;
    float dist2 = abs(y2 - waveLine2);
    float g3 = glowFn(dist2, uGlow * 0.8);
    vec3 col2 = palette(waveLine2 + y2 + uTime * 0.08 + 2.0);
    col = mix(col, col2 * 0.6, g3 * 0.8);

    // Third wave layer
    float y3 = uv.y - 0.3;
    float w3a = wave(uv, 3.5, 1.5);
    float w3b = wave(uv, 7.0, 3.5);
    float waveLine3 = w3a + w3b * 0.4;
    float dist3 = abs(y3 - waveLine3);
    float g4 = glowFn(dist3, uGlow * 0.6);
    vec3 col3 = palette(waveLine3 + y3 + uTime * 0.04 + 4.0);
    col = mix(col, col3 * 0.35, g4 * 0.7);

    gl_FragColor = vec4(col, 1.0);
}
`;

export default function AuroraWaves({
  speed = 0.7,
  glow = 14.0,
}: {
  speed?: number;
  glow?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { Renderer, Program, Mesh, Triangle, Vec2 } = await import("ogl");

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        canvas,
      });

      const gl = renderer.gl;
      gl.clearColor(0.01, 0.01, 0.015, 1);
      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vec2() },
          uSpeed: { value: speed },
          uGlow: { value: glow },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value.set(w, h);
      };

      window.addEventListener("resize", resize);
      resize();

      const start = performance.now();

      const loop = () => {
        program.uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render({ scene: mesh });
        frameRef.current = requestAnimationFrame(loop);
      };

      loop();

      cleanup = () => {
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener("resize", resize);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    })();

    return () => {
      cancelAnimationFrame(frameRef.current);
      cleanup?.();
    };
  }, [speed, glow]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block z-0"
    />
  );
}

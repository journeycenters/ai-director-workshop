"use client";

import { useRef, useEffect } from "react";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Slow, atmospheric waves — sage, amber, cream
const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;

vec3 palette(float t) {
    vec3 deep = vec3(0.04, 0.06, 0.05);     // forest deep
    vec3 sage = vec3(0.35, 0.45, 0.32);     // moss
    vec3 amber = vec3(0.78, 0.58, 0.18);    // warm gold
    vec3 cream = vec3(0.96, 0.92, 0.82);    // ivory

    float s = 0.5 + 0.5 * sin(t);
    vec3 base = mix(deep, sage, smoothstep(0.0, 0.5, s));
    base = mix(base, amber, smoothstep(0.5, 0.85, s));
    base = mix(base, cream, smoothstep(0.85, 1.0, s));
    return base;
}

float wave(vec2 uv, float freq, float phase, float speed) {
    return 0.35 * sin(uv.x * freq + uTime * speed + phase);
}

float glow(float d, float strength) {
    return exp(-d * d * strength);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    // Multiple slow wave layers
    vec3 col = vec3(0.025, 0.035, 0.028);

    // Layer 1 - slow primary wave
    {
      float w = wave(uv, 1.8, 0.0, 0.25) + wave(uv, 3.2, 1.5, 0.18) * 0.5;
      float d = abs(uv.y - w);
      float g = glow(d, 8.0);
      vec3 c = palette(uv.y + uTime * 0.04);
      col = mix(col, c, g * 0.9);
    }

    // Layer 2 - mid wave, offset
    {
      float w = wave(uv + vec2(0.5, 0.0), 2.5, 1.0, 0.15) + wave(uv, 4.5, 2.5, 0.12) * 0.4;
      float d = abs(uv.y + 0.4 - w);
      float g = glow(d, 12.0);
      vec3 c = palette(uv.y + 1.5 + uTime * 0.05);
      col = mix(col, c * 0.75, g * 0.7);
    }

    // Layer 3 - deeper, slower
    {
      float w = wave(uv, 1.2, 3.5, 0.1) + wave(uv, 2.8, 0.5, 0.08) * 0.6;
      float d = abs(uv.y - 0.5 - w);
      float g = glow(d, 6.0);
      vec3 c = palette(uv.y + 3.0 + uTime * 0.03);
      col = mix(col, c * 0.5, g * 0.5);
    }

    // Atmospheric vignette (darker corners)
    float vignette = 1.0 - length(uv * 0.5) * 0.4;
    col *= vignette;

    // Subtle warmth
    col = mix(col, col * vec3(1.05, 1.0, 0.92), 0.3);

    gl_FragColor = vec4(col, 1.0);
}
`;

export default function OrganicWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

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
      gl.clearColor(0.025, 0.035, 0.028, 1);
      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vec2() },
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block z-0"
    />
  );
}

"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const orbVertex = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;

// Simple 3D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vNormal = normalize(normalMatrix * normal);

  // Layered noise displacement for organic flowing surface
  float n1 = snoise(position * 1.5 + vec3(uTime * 0.15));
  float n2 = snoise(position * 3.0 + vec3(uTime * 0.1));
  float displacement = n1 * 0.18 + n2 * 0.06;

  vec3 newPos = position + normal * displacement;
  vPosition = newPos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

const orbFragment = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;

void main() {
  // Sage to amber gradient based on Y position
  vec3 sage = vec3(0.32, 0.45, 0.35);
  vec3 amber = vec3(0.78, 0.55, 0.18);
  vec3 cream = vec3(0.94, 0.88, 0.72);

  float t = (vPosition.y + 1.0) / 2.0;
  vec3 base = mix(sage, amber, smoothstep(0.0, 0.6, t));
  base = mix(base, cream, smoothstep(0.7, 1.0, t));

  // Lighting
  vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
  float diff = max(dot(vNormal, lightDir), 0.0);
  vec3 ambient = base * 0.3;
  vec3 diffuse = base * diff * 0.7;

  // Rim light
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
  rim = pow(rim, 2.0);
  vec3 rimLight = vec3(0.95, 0.82, 0.5) * rim * 0.6;

  // Specular highlight
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
  vec3 specular = vec3(1.0, 0.95, 0.8) * spec * 0.4;

  vec3 final = ambient + diffuse + rimLight + specular;
  gl_FragColor = vec4(final, 1.0);
}
`;

export default function FloatingOrb({ size = 400 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(size, size);
    container.appendChild(renderer.domElement);

    // Glowing orb sphere with shader
    const geometry = new THREE.IcosahedronGeometry(1.2, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader: orbVertex,
      fragmentShader: orbFragment,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Atmospheric glow halo (a slightly larger sphere with backface fragment)
    const haloGeo = new THREE.IcosahedronGeometry(1.45, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc9962f,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // Mouse-driven slow rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / window.innerWidth;
      mouseY = (e.clientY - cy) / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMove);

    const start = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - start) / 1000;
      material.uniforms.uTime.value = elapsed;

      // Smooth mouse-following rotation
      targetRotY += (mouseX * 0.4 - targetRotY) * 0.05;
      targetRotX += (mouseY * 0.3 - targetRotX) * 0.05;

      orb.rotation.y = elapsed * 0.15 + targetRotY;
      orb.rotation.x = targetRotX;
      halo.rotation.y = -elapsed * 0.08;

      // Subtle floating bob
      orb.position.y = Math.sin(elapsed * 0.5) * 0.08;
      halo.position.y = orb.position.y;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size, display: "inline-flex" }}
    />
  );
}

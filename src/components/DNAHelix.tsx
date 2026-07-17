"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

class HelixCurve extends THREE.Curve<THREE.Vector3> {
  constructor(
    public helixRadius: number,
    public helixHeight: number,
    public turns: number,
    public phaseOffset: number
  ) {
    super();
  }

  getPoint(t: number): THREE.Vector3 {
    const angle = t * Math.PI * 2 * this.turns + this.phaseOffset;
    return new THREE.Vector3(
      Math.cos(angle) * this.helixRadius,
      (t - 0.5) * this.helixHeight,
      Math.sin(angle) * this.helixRadius
    );
  }
}

export default function DNAHelix({ size = 32 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    const pxSize = size * Math.min(window.devicePixelRatio || 1, 2);
    renderer.setSize(pxSize, pxSize);
    renderer.domElement.style.width = `${size}px`;
    renderer.domElement.style.height = `${size}px`;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x6699ff, 0.35);
    fill.position.set(-3, -1, -3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.25);
    rim.position.set(0, -3, 2);
    scene.add(rim);

    // --- Helix parameters ---
    const RADIUS = 0.55;
    const HEIGHT = 2.8;
    const TURNS = 2;
    const TUBE_R = 0.075;
    const RUNG_COUNT = 10;

    const helix = new THREE.Group();

    // Apply green-to-blue vertex colors based on Y position
    const applyGradientColors = (geo: THREE.BufferGeometry) => {
      const pos = geo.attributes.position;
      const colors = new Float32Array(pos.count * 3);

      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const t = Math.max(0, Math.min(1, (y + HEIGHT / 2) / HEIGHT));

        // Bottom = blue, top = green (matching logo)
        colors[i * 3] = 0.18 + t * 0.25;
        colors[i * 3 + 1] = 0.5 + t * 0.38;
        colors[i * 3 + 2] = 0.92 - t * 0.52;
      }

      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    };

    const strandMat = new THREE.MeshPhongMaterial({
      vertexColors: true,
      shininess: 90,
      specular: new THREE.Color(0x444444),
    });

    // --- Strand 1 ---
    const curve1 = new HelixCurve(RADIUS, HEIGHT, TURNS, 0);
    const tube1 = new THREE.TubeGeometry(curve1, 100, TUBE_R, 8, false);
    applyGradientColors(tube1);
    helix.add(new THREE.Mesh(tube1, strandMat));

    // --- Strand 2 ---
    const curve2 = new HelixCurve(RADIUS, HEIGHT, TURNS, Math.PI);
    const tube2 = new THREE.TubeGeometry(curve2, 100, TUBE_R, 8, false);
    applyGradientColors(tube2);
    helix.add(new THREE.Mesh(tube2, strandMat));

    // --- End caps ---
    const capGeo = new THREE.SphereGeometry(TUBE_R, 8, 8);
    for (const curve of [curve1, curve2]) {
      for (const t of [0, 1]) {
        const p = curve.getPoint(t);
        const ct = Math.max(0, Math.min(1, (p.y + HEIGHT / 2) / HEIGHT));
        const capMat = new THREE.MeshPhongMaterial({
          color: new THREE.Color(0.18 + ct * 0.25, 0.5 + ct * 0.38, 0.92 - ct * 0.52),
          shininess: 90,
        });
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.copy(p);
        helix.add(cap);
      }
    }

    // --- Rungs (base pairs) ---
    const rungGeo = new THREE.CylinderGeometry(0.028, 0.028, 1, 6);
    const rungMat = new THREE.MeshPhongMaterial({
      color: 0x88ccdd,
      transparent: true,
      opacity: 0.6,
      shininess: 40,
    });

    for (let i = 0; i < RUNG_COUNT; i++) {
      const t = (i + 0.5) / RUNG_COUNT;
      const p1 = curve1.getPoint(t);
      const p2 = curve2.getPoint(t);

      const rungLen = p1.distanceTo(p2);
      const rung = new THREE.Mesh(rungGeo, rungMat);

      rung.position.lerpVectors(p1, p2, 0.5);
      rung.scale.y = rungLen;

      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir
      );
      rung.setRotationFromQuaternion(quat);

      helix.add(rung);
    }

    scene.add(helix);

    // --- Animate ---
    const animate = () => {
      helix.rotation.y += 0.012;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      tube1.dispose();
      tube2.dispose();
      capGeo.dispose();
      rungGeo.dispose();
      strandMat.dispose();
      rungMat.dispose();
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

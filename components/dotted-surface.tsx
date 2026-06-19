"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

/**
 * Animated dotted wave surface (WebGL via three.js).
 * Source: 21st.dev DottedSurface, adapted to fill its parent container
 * (not the whole viewport), with two-tone brand dots (blue + orange),
 * theme awareness, container-based resize, and a strict-mode-safe loop.
 */
export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = resolvedTheme !== "light";

    // Brand colors (logo blue + orange), normalized 0..1 for vertex colors.
    const BLUE: [number, number, number] = [0x3b / 255, 0x82 / 255, 0xf6 / 255];
    const ORANGE: [number, number, number] = [0xf9 / 255, 0x73 / 255, 0x16 / 255];

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const getSize = () => ({
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    });

    const { width, height } = getSize();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const positions: number[] = [];
    const colors: number[] = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0; // animated
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, y, z);

        // Alternate dot color in a diagonal pattern for a blended blue/orange field.
        const c = (ix + iy) % 3 === 0 ? ORANGE : BLUE;
        // Dim slightly in light mode so dots stay visible on a light bg.
        const tint = isDark ? 1 : 0.85;
        colors.push(c[0] * tint, c[1] * tint, c[2] * tint);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationId = 0;
    let isActive = true;
    let count = 0;

    const positionAttribute = geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;

    const stepWave = () => {
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          posArray[index + 1] =
            Math.sin((ix + count) * 0.3) * 120 +
            Math.sin((iy + count) * 0.5) * 120;
          i++;
        }
      }
      positionAttribute.needsUpdate = true;
    };

    const animate = () => {
      if (!isActive) return;
      stepWave();
      renderer.render(scene, camera);
      count += 0.1;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      const { width: w, height: h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export default DottedSurface;

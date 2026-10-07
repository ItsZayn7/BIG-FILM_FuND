"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { useTheme } from "../theme-provider";

interface PulseMarker {
  id: string;
  location: [number, number];
  delay: number;
}

interface GlobePulseProps {
  markers?: PulseMarker[];
  className?: string;
  speed?: number;
}

const defaultMarkers: PulseMarker[] = [
  { id: "pulse-1", location: [51.51, -0.13], delay: 0 },
  { id: "pulse-2", location: [40.71, -74.01], delay: 0.5 },
  { id: "pulse-3", location: [35.68, 139.65], delay: 1 },
  { id: "pulse-4", location: [-33.87, 151.21], delay: 1.5 },
];

// Faint static red network points scattered across the map
const networkPoints: [number, number][] = [
  [48.86, 2.35],
  [52.52, 13.4],
  [41.9, 12.5],
  [40.42, -3.7],
  [55.75, 37.62],
  [59.33, 18.06],
  [50.08, 14.44],
  [37.98, 23.73],
  [30.04, 31.24],
  [-1.29, 36.82],
  [-26.2, 28.04],
  [6.52, 3.38],
  [33.57, -7.59],
  [25.2, 55.27],
  [24.71, 46.68],
  [19.08, 72.88],
  [28.61, 77.21],
  [13.08, 80.27],
  [1.35, 103.82],
  [13.76, 100.5],
  [-6.2, 106.85],
  [22.32, 114.17],
  [31.23, 121.47],
  [39.9, 116.4],
  [37.57, 126.98],
  [34.05, -118.24],
  [41.88, -87.63],
  [43.65, -79.38],
  [19.43, -99.13],
  [-23.55, -46.63],
  [-34.6, -58.38],
  [-12.05, -77.04],
  [4.71, -74.07],
  [-33.92, 18.42],
  [64.14, -21.94],
  [60.17, 24.94],
  [45.46, 9.19],
  [53.35, -6.26],
  [38.72, -9.14],
  [35.69, 51.39],
];

export function GlobePulse({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiRef = useRef(0);
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const inViewportRef = useRef(true);
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      io = new IntersectionObserver(([entry]) => {
        inViewportRef.current = entry?.isIntersecting ?? true;
      }, { threshold: 0.05 });
      io.observe(canvas);

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.25),
        width,
        height: width,
        phi: phiRef.current,
        theta: 0.2,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 1.2 : 0.6,
        mapSamples: 12000,
        mapBrightness: isDark ? 6 : 11,
        baseColor: isDark ? [1, 1, 1] : [0.98, 0.98, 0.99],
        markerColor: [0.9, 0.18, 0.2],
        glowColor: isDark ? [0, 0, 0] : [1, 1, 1],
        markerElevation: 0,
        markers: [
          ...markers.map((m) => ({
            location: m.location,
            size: 0.03,
            id: m.id,
          })),
          ...networkPoints.map((location) => ({ location, size: 0.014 })),
        ],
        arcs: networkPoints
          .filter((_, i) => i % 2 === 0)
          .map((location) => ({ from: [51.51, -0.13] as [number, number], to: location })),
        arcColor: [0.9, 0.25, 0.25],
        arcWidth: 0.35,
        arcHeight: 0.3,
        opacity: 0.9,
      });

      canvas.style.opacity = "1";

      function animate() {
        if (inViewportRef.current && globe) {
          if (!isPausedRef.current) {
            phiRef.current += speed;
          }
          globe.update({
            phi: phiRef.current + phiOffsetRef.current + dragOffset.current.phi,
            theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
          });
        }
        animationId = requestAnimationFrame(animate);
      }
      animationId = requestAnimationFrame(animate);
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      ro = new ResizeObserver((entries) => {
        if ((entries[0]?.contentRect.width ?? 0) > 0) {
          ro?.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      if (globe) {
        globe.destroy();
        globe = null;
      }
    };
  }, [markers, speed, isDark]);

  return (
    <div
      className={`relative aspect-square w-full select-none ${className}`}
      style={{ touchAction: "none" }}
    >
      <style>{`
        @keyframes pulse-expand {
          0% { transform: scaleX(0.3) scaleY(0.3); opacity: 0.8; }
          100% { transform: scaleX(1.5) scaleY(1.5); opacity: 0; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="h-full w-full opacity-100 transition-opacity duration-500"
        style={{
          cursor: "grab",
          contain: "layout paint size",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          style={
            {
              position: "absolute",
              // CSS Anchor Positioning — cobe exposes anchors named --cobe-<id>
              ["positionAnchor" as never]: `--cobe-${m.id}`,
              bottom: "anchor(center)",
              left: "anchor(center)",
              translate: "-50% 50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition: "opacity 0.4s, filter 0.4s",
            } as React.CSSProperties
          }
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: "2px solid #e63946",
              borderRadius: "50%",
              opacity: 0,
              animation: `pulse-expand 2s ease-out infinite ${m.delay}s`,
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: "2px solid #e63946",
              borderRadius: "50%",
              opacity: 0,
              animation: `pulse-expand 2s ease-out infinite ${m.delay + 0.5}s`,
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              background: "#e63946",
              borderRadius: "50%",
              boxShadow: "0 0 0 3px #fff, 0 0 0 5px #e63946",
            }}
          />
        </div>
      ))}
    </div>
  );
}

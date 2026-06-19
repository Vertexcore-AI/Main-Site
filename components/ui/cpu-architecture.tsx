import { cn } from "@/lib/utils";
import React from "react";

export interface CpuArchitectureSvgProps {
  className?: string;
  width?: string;
  height?: string;
  text?: string;
  showCpuConnections?: boolean;
  lineMarkerSize?: number;
  animateText?: boolean;
  animateLines?: boolean;
  animateMarkers?: boolean;
  /** Render the teal PCB-island outline, mounting pads, and neon pulse dashes. */
  showPcbEnvironment?: boolean;
}

const CpuArchitecture = ({
  className,
  width = "100%",
  height = "100%",
  text = "CPU",
  showCpuConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
  showPcbEnvironment = false,
}: CpuArchitectureSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
    >
      {/* Paths */}
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="1"
        strokeDasharray="100 100"
        pathLength="100"
        markerStart="url(#cpu-circle-marker)"
      >
        {/* 1st — top edge, extended down to y33 */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 10 20 h 75.5 q 5 0 5 5 v 20"
        />
        {/* 2nd — top edge, extended down to y33 */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 180 10 h -65.7 q -5 0 -5 5 v 15"
        />
        {/* 3rd — right edge, extended to x125.5 */}
        <path d="M 135 20 v 20 q 0 6 -5 5 h 3.5" />
        {/* 4th — right edge, extended to x125.5 */}
        <path d="M 170 82 v -21.8 q 0 -5 -5 -5 h -35.5" />
        {/* 5th — bottom edge, extended to y67 */}
        <path
          strokeDasharray="100 100"
          pathLength="100"
          d="M 139 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -28"
        />
        {/* 6th — bottom edge, extended to y67 */}
        <path d="M 90.8 95 v -28" />
        {/* 7th — left edge, extended to x74.5 */}
        <path d="M 58 91 v -15 q 0 -5 -5 -5 h -20 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 52.5" />
        {/* 8th — left edge, extended to x74.5 */}
        <path d="M 30 28 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 9.5" />
        {/* Animation For Path Starting */}
        {animateLines && (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        )}
      </g>

      {/* Light traces — each circle travels its mask path via SMIL animateMotion.
          (More reliable than CSS offset-path on SVG circles across browsers.) */}
      {/* 1. Blue Light */}
      <g mask="url(#cpu-mask-1)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-blue-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="0s" rotate="auto">
            <mpath href="#cpu-path-1" />
          </animateMotion>
        </circle>
      </g>
      {/* 2. Yellow Light */}
      <g mask="url(#cpu-mask-2)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-yellow-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="0.6s" rotate="auto">
            <mpath href="#cpu-path-2" />
          </animateMotion>
        </circle>
      </g>
      {/* 3. Pinkish Light */}
      <g mask="url(#cpu-mask-3)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-pinkish-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="1.2s" rotate="auto">
            <mpath href="#cpu-path-3" />
          </animateMotion>
        </circle>
      </g>
      {/* 4. White Light */}
      <g mask="url(#cpu-mask-4)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-white-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="1.8s" rotate="auto">
            <mpath href="#cpu-path-4" />
          </animateMotion>
        </circle>
      </g>
      {/* 5. Green Light */}
      <g mask="url(#cpu-mask-5)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-green-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="2.4s" rotate="auto">
            <mpath href="#cpu-path-5" />
          </animateMotion>
        </circle>
      </g>
      {/* 6. Orange Light */}
      <g mask="url(#cpu-mask-6)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-orange-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="3s" rotate="auto">
            <mpath href="#cpu-path-6" />
          </animateMotion>
        </circle>
      </g>
      {/* 7. Cyan Light */}
      <g mask="url(#cpu-mask-7)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-cyan-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="3.6s" rotate="auto">
            <mpath href="#cpu-path-7" />
          </animateMotion>
        </circle>
      </g>
      {/* 8. Rose Light */}
      <g mask="url(#cpu-mask-8)">
        <circle cx="0" cy="0" r="8" fill="url(#cpu-rose-grad)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="4.2s" rotate="auto">
            <mpath href="#cpu-path-8" />
          </animateMotion>
        </circle>
      </g>

      {/* ── NEON PULSE DASHES — short bright segments racing each trace ── */}
      {showPcbEnvironment && (
        <g fill="none" strokeLinecap="round" filter="url(#pcb-glow)">
          {[
            { p: 1, c: "#22d3ee", d: "4.2s", b: "0.3s" },
            { p: 2, c: "#fde047", d: "3.8s", b: "1.1s" },
            { p: 3, c: "#f472b6", d: "4.6s", b: "0.7s" },
            { p: 4, c: "#a78bfa", d: "4.0s", b: "1.8s" },
            { p: 5, c: "#34d399", d: "5.2s", b: "0.5s" },
            { p: 6, c: "#fb923c", d: "3.6s", b: "2.2s" },
            { p: 7, c: "#38bdf8", d: "4.8s", b: "1.4s" },
            { p: 8, c: "#fb7185", d: "4.4s", b: "0.9s" },
          ].map(({ p, c, d, b }) => (
            <g key={p} mask={`url(#cpu-mask-${p})`}>
              <circle r="2.4" fill={c}>
                <animateMotion dur={d} repeatCount="indefinite" begin={b} rotate="auto">
                  <mpath href={`#cpu-path-${p}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </g>
      )}

      {/* CPU Box — scaled up as one unit (box + pins + logo) around center (100,50)
          so the pins stay glued to the box edges. Traces are extended to meet it. */}
      <g transform="translate(-70 -35) scale(1.7)">
        {/* Cpu connections */}
        {showCpuConnections && (
          <g fill="url(#cpu-connection-gradient)">
            <rect x="93" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="104" y="37" width="2.5" height="5" rx="0.7" />
            <rect
              x="116.3"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="122.8"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="104"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="114.5"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="80"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
            <rect
              x="87"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
          </g>
        )}
        {/* Main CPU Rectangle (original 30×20; the parent <g> scales it up). */}
        <rect
          x="85"
          y="40"
          width="30"
          height="20"
          rx="2"
          fill="#181818"
          filter="url(#cpu-light-shadow)"
        />
        {/* CPU Logo — Capture.svg centered, native aspect preserved (no stretch). */}
        <image
          href="/images/Capture.svg"
          x="89.7"
          y="41.5"
          width="20.6"
          height="17"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
      {/* Masks */}
      <defs>
        {/* Neon glow — the ONLY glowing element; applied to the pulse dashes. */}
        <filter id="pcb-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Reusable motion paths for the light traces (referenced by <mpath>).
            Must match the visible trace <path> d-values exactly. */}
        <path id="cpu-path-1" d="M 10 20 h 75.5 q 5 0 5 5 v 20" />
        <path id="cpu-path-2" d="M 180 10 h -65.7 q -5 0 -5 5 v 15" />
        <path id="cpu-path-3" d="M 135 20 v 20 q 0 6 -5 5 h 3.5" />
        <path id="cpu-path-4" d="M 170 82 v -21.8 q 0 -5 -5 -5 h -35.5" />
        <path
          id="cpu-path-5"
          d="M 139 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -28"
        />
        <path id="cpu-path-6" d="M 90.8 95 v -28" />
        <path
          id="cpu-path-7"
          d="M 58 91 v -15 q 0 -5 -5 -5 h -20 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 52.5"
        />
        <path id="cpu-path-8" d="M 30 28 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 9.5" />
        <mask id="cpu-mask-1">
          <path
            d="M 10 20 h 75.5 q 5 0 5 5 v 20"
            strokeWidth="1.2"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-2">
          <path
            d="M 180 10 h -65.7 q -5 0 -5 5 v 15"
            strokeWidth="1.2"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-3">
          <path
            d="M 135 20 v 20 q 0 6 -5 5 h 3.5"
            strokeWidth="1.2"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-4">
          <path
            d="M 170 82 v -21.8 q 0 -5 -5 -5 h -35.5"
            strokeWidth="1.2"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-5">
          <path
            d="M 139 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -28"
            strokeWidth="1.2"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-6">
          <path d="M 90.8 95 v -28" strokeWidth="1.2" stroke="white" />
        </mask>
        <mask id="cpu-mask-7">
          <path
            d="M 58 91 v -15 q 0 -5 -5 -5 h -20 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 52.5"
            strokeWidth="1.2"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-8">
          <path
            d="M 30 28 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 9.5"
            strokeWidth="1.2"
            stroke="white"
          />
        </mask>
        {/* Gradients */}
        <radialGradient id="cpu-blue-grad" fx="1">
          <stop offset="0%" stopColor="#00E8ED" />
          <stop offset="50%" stopColor="#08F" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-yellow-grad" fx="1">
          <stop offset="0%" stopColor="#FFD800" />
          <stop offset="50%" stopColor="#FFD800" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-pinkish-grad" fx="1">
          <stop offset="0%" stopColor="#830CD1" />
          <stop offset="50%" stopColor="#FF008B" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-white-grad" fx="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-green-grad" fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-orange-grad" fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-cyan-grad" fx="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-rose-grad" fx="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter
          id="cpu-light-shadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feDropShadow
            dx="1.5"
            dy="1.5"
            stdDeviation="1"
            floodColor="black"
            floodOpacity="0.1"
          />
        </filter>
        <marker
          id="cpu-circle-marker"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle
            id="innerMarkerCircle"
            cx="5"
            cy="5"
            r="2"
            fill="black"
            stroke="#232323"
            strokeWidth="0.5"
          >
            {animateMarkers && (
              <animate attributeName="r" values="0; 3; 2" dur="0.5s" />
            )}
          </circle>
        </marker>
        {/* Cpu connection gradient */}
        <linearGradient
          id="cpu-connection-gradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#4F4F4F" />
          <stop offset="60%" stopColor="#121214" />
        </linearGradient>
        {/* Add CPU Text Gradient */}
        <linearGradient id="cpu-text-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="-2; -1; 0"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="25%" stopColor="white">
            <animate
              attributeName="offset"
              values="-1; 0; 1"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="50%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="0; 1; 2;"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export { CpuArchitecture };

import type { CSSProperties } from "react";
import { brands } from "@/content/brands";
import { hero } from "@/content/site";

/*
 * Signature element: a miniature n8n-style canvas. Nodes carry real tool marks,
 * edges draw themselves, then a lead packet travels the whole path and lights
 * each node as it passes (5s loop, driven by CSS custom property --t per node).
 * Coordinates are inside the canvas group, which sits below the window chrome.
 */

const EDGES = [
  { d: "M220 68 C290 68 340 74 340 130", delay: "1s" },
  { d: "M240 164 C160 164 120 174 120 240", delay: "1.6s" },
  { d: "M220 274 C290 274 340 280 340 340", delay: "2.2s" },
];

// Packet route: edges joined by short runs that pass behind the opaque nodes
const PACKET_PATH =
  "M220 68 C290 68 340 74 340 130 L340 164 L240 164 C160 164 120 174 120 240 L120 274 L220 274 C290 274 340 280 340 340";

const NODES = [
  { title: "New lead", sub: "Apollo · acme.co", x: 20, y: 34, brand: "apollo", appear: "0.8s", t: "0s" },
  { title: "AI research", sub: "Company brief", x: 240, y: 130, brand: "openai", appear: "1.4s", t: "1.35s" },
  { title: "Outreach", sub: "Custom draft", x: 20, y: 240, brand: "gmail", appear: "2s", t: "2.75s" },
  { title: "Call booked", sub: "Thu 10:00 booked", x: 240, y: 340, brand: "calendar", appear: "2.6s", t: "4.2s", live: true },
];

const W = 200;
const H = 68;

/** Tool mark nested as its own <svg> so it scales to the icon tile. */
function NodeIcon({ brand, x, y, size }: { brand: string; x: number; y: number; size: number }) {
  if (brand === "calendar") {
    return (
      <g transform={`translate(${x} ${y}) scale(${size / 24})`} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4M9 15.5l2 2 4-4" />
      </g>
    );
  }
  const b = brands[brand];
  const common = { x, y, width: size, height: size, viewBox: b.viewBox };
  return b.svg ? (
    <svg {...common} dangerouslySetInnerHTML={{ __html: b.svg }} />
  ) : (
    <svg {...common}>
      <path d={b.path} fill={b.color === "currentColor" ? "var(--text)" : b.color} />
    </svg>
  );
}

export function HeroDiagram() {
  return (
    <div className="float">
      <svg className="flow" viewBox="0 0 460 480" role="img" aria-label={hero.diagramLabel}>
        <defs>
          <linearGradient id="flow-gradient" x1="0" x2="1">
            <stop offset="0" style={{ stopColor: "var(--accent)" }} />
            <stop offset="1" style={{ stopColor: "var(--accent2)" }} />
          </linearGradient>
        </defs>

        {/* Window chrome */}
        <g className="chrome">
          <circle cx="22" cy="19" r="4" />
          <circle cx="36" cy="19" r="4" />
          <circle cx="50" cy="19" r="4" />
          <text x="70" y="23">lead-to-call.workflow</text>
          <circle className="live-dot" cx="398" cy="19" r="3.5" />
          <text x="408" y="23">live</text>
          <path d="M0 37H460" />
        </g>

        <path className="grid-lines" d="M0 135H460M0 235H460M0 335H460M0 435H460M115 37V480M230 37V480M345 37V480" />

        {/* Ambient constellation: faint satellites that twinkle */}
        {[
          [430, 80, "0s"],
          [440, 300, "1.2s"],
          [60, 440, "2.1s"],
          [210, 455, "0.6s"],
        ].map(([cx, cy, d]) => (
          <circle key={`${cx}-${cy}`} className="star" cx={cx} cy={cy} r="3" style={{ animationDelay: d as string }} />
        ))}

        <g transform="translate(0 36)">
          {EDGES.map((e) => (
            <path key={e.d} className="edge" d={e.d} pathLength={420} style={{ "--delay": e.delay } as CSSProperties} />
          ))}

          {/* Packet sits under the nodes, so it appears to pass through each one */}
          <circle className="dot" r="5" opacity="0">
            <set attributeName="opacity" to="1" begin="3s" />
            <animateMotion begin="3s" dur="5s" repeatCount="indefinite" path={PACKET_PATH} />
          </circle>

          {NODES.map((n) => (
            <g
              key={n.title}
              className={`node ${n.live ? "node-live" : ""}`}
              style={{ "--delay": n.appear, "--t": n.t } as CSSProperties}
            >
              <rect className="node-box" x={n.x} y={n.y} width={W} height={H} rx="16" />
              <rect className="icon-bg" x={n.x + 14} y={n.y + 14} width="40" height="40" rx="11" />
              <NodeIcon brand={n.brand} x={n.x + 23} y={n.y + 23} size={22} />
              <text className="node-title" x={n.x + 66} y={n.y + 31}>{n.title}</text>
              <text className="node-sub" x={n.x + 66} y={n.y + 49}>{n.sub}</text>
              <circle className="led" cx={n.x + W - 16} cy={n.y + 16} r="3.5" />
              {/* Input and output ports, like workflow-builder nodes */}
              <circle className="port" cx={n.x} cy={n.y + H / 2} r="3.5" />
              <circle className="port" cx={n.x + W} cy={n.y + H / 2} r="3.5" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

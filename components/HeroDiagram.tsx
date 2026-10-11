import type { CSSProperties } from "react";
import { brands } from "@/content/brands";
import { hero } from "@/content/site";

/*
 * Signature element: a miniature n8n-style canvas. Nodes carry real tool marks,
 * edges draw themselves, then a lead packet travels the whole path and lights
 * each node as it passes (5s loop, driven by --t per node).
 * Two layouts share the same copy: "wide" for desktop, "tall" for phones.
 */

interface NodeSpec {
  title: string;
  sub: string;
  brand: string;
  live?: boolean;
}

const NODES: NodeSpec[] = [
  { title: "New lead", sub: "Apollo · acme.co", brand: "apollo" },
  { title: "AI research", sub: "Company brief", brand: "openai" },
  { title: "Outreach", sub: "Custom draft", brand: "gmail" },
  { title: "Call booked", sub: "Thu 10:00 booked", brand: "calendar", live: true },
];

// Per-node timing: fade-in delay, and when the packet lights it within the 5s loop
const APPEAR = ["0.8s", "1.4s", "2s", "2.6s"];
const EDGE_DELAY = ["1s", "1.6s", "2.2s"];

interface Layout {
  viewBox: string;
  W: number;
  H: number;
  pos: [number, number][];
  edges: string[];
  packet: string;
  lit: string[];
  grid: string;
  chromeLive: number;
  stars: [number, number, string][];
}

// Wide: nodes step across in a gentle zig-zag; edges leave a right port and enter the next left port
const WIDE_POS: [number, number][] = [[24, 48], [280, 104], [536, 48], [792, 104]];
const WIDE_W = 190;
const WIDE_H = 68;
const wideEdges = WIDE_POS.slice(0, 3).map(([x, y], i) => {
  const [nx, ny] = WIDE_POS[i + 1];
  const x1 = x + WIDE_W;
  const y1 = y + WIDE_H / 2;
  const y2 = ny + WIDE_H / 2;
  return `M${x1} ${y1} C${x1 + 40} ${y1} ${nx - 40} ${y2} ${nx} ${y2}`;
});
// Packet route: the edges joined by runs that pass behind the opaque nodes
const widePacket = WIDE_POS.slice(0, 3)
  .map(([x, y], i) => {
    const [nx, ny] = WIDE_POS[i + 1];
    const x1 = x + WIDE_W;
    const y1 = y + WIDE_H / 2;
    const y2 = ny + WIDE_H / 2;
    const edge = `${i === 0 ? "M" : "L"}${x1} ${y1} C${x1 + 40} ${y1} ${nx - 40} ${y2} ${nx} ${y2}`;
    return i < 2 ? `${edge} L${nx + WIDE_W} ${y2}` : edge;
  })
  .join(" ");

const LAYOUTS: Record<"wide" | "tall", Layout> = {
  wide: {
    viewBox: "0 0 1000 250",
    W: WIDE_W,
    H: WIDE_H,
    pos: WIDE_POS,
    edges: wideEdges,
    packet: widePacket,
    lit: ["0s", "0.6s", "2.8s", "4.6s"],
    grid: "M0 100H1000M0 170H1000M125 37V250M250 37V250M375 37V250M500 37V250M625 37V250M750 37V250M875 37V250",
    chromeLive: 958,
    stars: [[500, 215, "0s"], [120, 205, "1.2s"], [880, 70, "2.1s"], [640, 205, "0.6s"]],
  },
  tall: {
    viewBox: "0 0 460 480",
    W: 200,
    H: 68,
    pos: [[20, 34], [240, 130], [20, 240], [240, 340]],
    edges: [
      "M220 68 C290 68 340 74 340 130",
      "M240 164 C160 164 120 174 120 240",
      "M220 274 C290 274 340 280 340 340",
    ],
    packet:
      "M220 68 C290 68 340 74 340 130 L340 164 L240 164 C160 164 120 174 120 240 L120 274 L220 274 C290 274 340 280 340 340",
    lit: ["0s", "1.35s", "2.75s", "4.2s"],
    grid: "M0 135H460M0 235H460M0 335H460M0 435H460M115 37V480M230 37V480M345 37V480",
    chromeLive: 398,
    stars: [[430, 80, "0s"], [440, 300, "1.2s"], [60, 440, "2.1s"], [210, 455, "0.6s"]],
  },
};

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

function DiagramSvg({ layout, className }: { layout: "wide" | "tall"; className: string }) {
  const L = LAYOUTS[layout];
  const gradient = `flow-gradient-${layout}`;
  const width = Number(L.viewBox.split(" ")[2]);

  return (
    <svg className={`flow ${className}`} viewBox={L.viewBox} role="img" aria-label={hero.diagramLabel}>
      <defs>
        <linearGradient id={gradient} x1="0" x2="1">
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
        <circle className="live-dot" cx={L.chromeLive} cy="19" r="3.5" />
        <text x={L.chromeLive + 10} y="23">live</text>
        <path d={`M0 37H${width}`} />
      </g>

      <path className="grid-lines" d={L.grid} />

      {/* Ambient constellation: faint satellites that twinkle */}
      {L.stars.map(([cx, cy, d]) => (
        <circle key={`${cx}-${cy}`} className="star" cx={cx} cy={cy} r="3" style={{ animationDelay: d }} />
      ))}

      <g transform="translate(0 36)">
        {L.edges.map((d, i) => (
          <path
            key={d}
            className="edge"
            d={d}
            pathLength={420}
            stroke={`url(#${gradient})`}
            style={{ "--delay": EDGE_DELAY[i] } as CSSProperties}
          />
        ))}

        {/* Packet sits under the nodes, so it appears to pass through each one */}
        <circle className="dot" r="5" opacity="0">
          <set attributeName="opacity" to="1" begin="3s" />
          <animateMotion begin="3s" dur="5s" repeatCount="indefinite" path={L.packet} />
        </circle>

        {NODES.map((n, i) => {
          const [x, y] = L.pos[i];
          return (
            <g
              key={n.title}
              className={`node ${n.live ? "node-live" : ""}`}
              style={{ "--delay": APPEAR[i], "--t": L.lit[i] } as CSSProperties}
            >
              <rect className="node-box" x={x} y={y} width={L.W} height={L.H} rx="16" />
              <rect className="icon-bg" x={x + 14} y={y + 14} width="40" height="40" rx="11" />
              <NodeIcon brand={n.brand} x={x + 23} y={y + 23} size={22} />
              <text className="node-title" x={x + 66} y={y + 31}>{n.title}</text>
              <text className="node-sub" x={x + 66} y={y + 49}>{n.sub}</text>
              <circle className="led" cx={x + L.W - 16} cy={y + 16} r="3.5" />
              {/* Input and output ports, like workflow-builder nodes */}
              <circle className="port" cx={x} cy={y + L.H / 2} r="3.5" />
              <circle className="port" cx={x + L.W} cy={y + L.H / 2} r="3.5" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function HeroDiagram() {
  return (
    <div className="float">
      <DiagramSvg layout="wide" className="hidden min-[861px]:block" />
      <DiagramSvg layout="tall" className="min-[861px]:hidden" />
    </div>
  );
}

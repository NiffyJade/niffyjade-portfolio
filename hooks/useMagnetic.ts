"use client";

import { useRef } from "react";

/**
 * Magnetic button: nudges toward the cursor (about 20% horizontally, 30% vertically)
 * and resets on leave. Spread the returned handlers onto the element.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  // Checked at event time so it follows live setting changes
  const enabled = () =>
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return {
    ref,
    onPointerMove: (e: React.PointerEvent<T>) => {
      const el = ref.current;
      if (!el || !enabled()) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.2;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    onPointerLeave: () => {
      if (ref.current) ref.current.style.transform = "";
    },
  };
}

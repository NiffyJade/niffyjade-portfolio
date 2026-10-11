"use client";

import { useEffect, useRef, useState } from "react";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts from 0 to `target` once the returned ref scrolls into view.
 * Server render and reduced-motion users get the final number straight away.
 */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1600) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setValue(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(Math.round(target * easeOutQuart(p)));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}

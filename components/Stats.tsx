"use client";

import { stats, type Stat } from "@/content/site";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "./Reveal";

function Counter({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(stat.value);
  return (
    <div>
      <strong className="stat-num">
        <span ref={ref}>{value}</span>
        {stat.suffix}
      </strong>
      <span className="block text-[.88rem] leading-snug text-muted min-[600px]:text-base">{stat.label}</span>
    </div>
  );
}

/** Three counters; each counts up when the strip enters view. */
export function Stats() {
  return (
    <Reveal className="grid grid-cols-3 gap-4 border-y border-line py-7 min-[861px]:py-9">
      {stats.map((s) => (
        <Counter key={s.label} stat={s} />
      ))}
    </Reveal>
  );
}

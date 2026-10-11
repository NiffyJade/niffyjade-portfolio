"use client";

import { stats, type Stat } from "@/content/site";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "./Reveal";

function Counter({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(stat.value);
  return (
    <div className="px-2 text-center">
      <strong className="stat-num">
        <span ref={ref}>{value}</span>
        {stat.suffix}
      </strong>
      <span className="mx-auto block max-w-[16ch] text-[.88rem] leading-snug text-muted min-[600px]:text-base">
        {stat.label}
      </span>
    </div>
  );
}

/** Light proof card: three counters that count up when the card enters view. */
export function Stats() {
  return (
    <Reveal className="proof-card tone-alt grid grid-cols-3 divide-x divide-line">
      {stats.map((s) => (
        <Counter key={s.label} stat={s} />
      ))}
    </Reveal>
  );
}

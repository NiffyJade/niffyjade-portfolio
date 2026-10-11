"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  as?: ElementType;
  /** Stagger in seconds, e.g. 0.1 steps for cards in the same row */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Fades and rises its children into view once, when 15% visible. */
export function Reveal({ as: Tag = "div", delay = 0, className, children }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

"use client";

import { useRef } from "react";
import { processSteps } from "@/content/site";
import { useReveal } from "@/hooks/useReveal";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Reveal } from "../Reveal";

/** A step lights up when it reaches the lower-middle of the viewport. */
function StepItem({ title, body }: { title: string; body: string }) {
  const ref = useReveal<HTMLLIElement>({ threshold: 0, rootMargin: "0px 0px -40% 0px" });
  return (
    <li ref={ref} className="step">
      <h3>{title}</h3>
      <p className="text-muted">{body}</p>
    </li>
  );
}

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  useScrollProgress(listRef, "element"); // fills the vertical line as you scroll

  return (
    <section id="process" className="section">
      <div className="wrap">
        <Reveal as="h2">How we work together</Reveal>
        <ol ref={listRef} className="steps m-0 list-none">
          {processSteps.map((s) => (
            <StepItem key={s.title} title={s.title} body={s.body} />
          ))}
        </ol>
      </div>
    </section>
  );
}

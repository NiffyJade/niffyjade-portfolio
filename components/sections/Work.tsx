"use client";

import { useState } from "react";
import { work } from "@/content/site";
import { Reveal } from "../Reveal";

const FIELDS = [
  ["Context", "context"],
  ["Problem", "problem"],
  ["What I built", "built"],
  ["Tools", "tools"],
  ["Result", "result"],
] as const;

/** Accordion: one case open at a time, first open by default. */
export function Work() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal as="h2">{work.heading}</Reveal>
        <Reveal as="p" className="text-muted">
          {work.intro}
        </Reveal>
        {work.cases.map((c, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={c.title}>
              <div className="case" data-open={isOpen}>
                <button
                  type="button"
                  className="case-trigger"
                  id={`case-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`case-pane-${i}`}
                  // Clicking the open case closes it; clicking another switches
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <h3>{c.title}</h3>
                  <span className="plus" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M8 2v12M2 8h12" />
                    </svg>
                  </span>
                </button>
                {/* inert keeps collapsed content out of the tab order and screen readers */}
                <div
                  className="pane"
                  id={`case-pane-${i}`}
                  role="region"
                  aria-labelledby={`case-btn-${i}`}
                  inert={!isOpen}
                >
                  <div>
                    <div className="case-body">
                      {FIELDS.map(([label, key]) => (
                        <div key={key}>
                          <h4>{label}</h4>
                          <p>{c[key]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

import { Fragment } from "react";
import { sections, work } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { Reveal } from "../Reveal";

/** Wraps figures (placeholders like [X], or real numbers once filled in) so they can be highlighted. */
function Metrics({ text }: { text: string }) {
  // The capture group keeps the matches, which land on odd indexes
  return text.split(/(\[X\]%?|\d[\d.,]*[%+x]?)/g).map((part, i) =>
    i % 2 ? (
      <span key={i} className="metric">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Light panel of case-study rows: story on one side, a dark pipeline panel with the result on the other. */
export function Work() {
  return (
    <section id="work" className="panel tone-alt">
      <div className="wrap">
        <Reveal className="grid items-end gap-4 min-[861px]:grid-cols-[1fr_auto] min-[861px]:gap-12">
          <div>
            <span className="pill">{sections.work.pill}</span>
            <h2 className="mb-0">{work.heading}</h2>
          </div>
          <p className="mb-1 text-muted">{work.intro}</p>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {work.cases.map((c) => (
            // Rows alternate which side the pipeline panel sits on (see .case-row:nth-child(even))
            <Reveal key={c.title} className="card case-row">
                <div className="case-copy">
                  <span className="pill self-start" style={{ marginBottom: 0 }}>
                    {c.context}
                  </span>
                  <h3>{c.title}</h3>
                  <div>
                    <h4>The problem</h4>
                    <p>{c.problem}</p>
                  </div>
                  <div>
                    <h4>What I built</h4>
                    <p>{c.built}</p>
                  </div>
                  <p className="text-[.9rem] text-muted">Built with {c.tools}</p>
                </div>

                <div className="case-visual tone-flip">
                  <span className="pill self-start" style={{ marginBottom: 0 }}>
                    Automation pipeline
                  </span>
                  <div className="pipeline" role="group" aria-label={`Tools: ${c.tools}`}>
                    {c.brands.map((b, n) => (
                      <Fragment key={b}>
                        {n > 0 && <span className="pipe-link" aria-hidden="true" />}
                        <span className="pipe-node">
                          <BrandIcon name={b} size={26} />
                        </span>
                      </Fragment>
                    ))}
                  </div>
                  <div className="case-result">
                    <small>Result</small>
                    <strong>
                      <Metrics text={c.result} />
                    </strong>
                  </div>
                </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

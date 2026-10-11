import { sections, work } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { Reveal } from "../Reveal";

/** Light panel of case-study cards: context, problem, build, tool logos, and a result tile. */
export function Work() {
  return (
    <section id="work" className="panel tone-alt">
      <div className="wrap">
        <Reveal>
          <span className="pill">{sections.work.pill}</span>
          <h2>{work.heading}</h2>
          <p className="text-muted">{work.intro}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 min-[861px]:grid-cols-2">
          {work.cases.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.1} className="card flex flex-col gap-4">
              <span className="pill mb-0! self-start">{c.context}</span>
              <h3 className="mb-0! text-[1.3rem]">{c.title}</h3>
              <div className="flex flex-wrap gap-2" aria-label={`Tools: ${c.tools}`} role="group">
                {c.brands.map((b) => (
                  <span key={b} className="brand-chip">
                    <BrandIcon name={b} size={20} />
                  </span>
                ))}
              </div>
              <p>
                <b>Problem:</b> {c.problem}
              </p>
              <p>
                <b>What I built:</b> {c.built}
              </p>
              <p className="text-muted">
                <b>Tools:</b> {c.tools}
              </p>
              <div className="result-tile inverse">
                <small>Result</small>
                <strong>{c.result}</strong>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

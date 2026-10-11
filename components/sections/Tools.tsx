import { sections, tools } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { Reveal } from "../Reveal";

/**
 * Light panel showing the tools as a layered stack: interface at the top,
 * with the automation layer at the base wiring every layer together.
 */
export function Tools() {
  return (
    <section id="stack" className="panel tone-alt">
      <div className="wrap grid items-start gap-12 min-[861px]:grid-cols-[.8fr_1.2fr] min-[861px]:gap-16">
        <div className="min-[861px]:sticky min-[861px]:top-28">
          <Reveal>
            <span className="pill">{sections.tools.pill}</span>
            <h2>Tools I work in</h2>
            <p className="text-muted">{sections.tools.intro}</p>
          </Reveal>
        </div>

        <div className="stack">
          {tools.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08} className={`layer ${t.hub ? "layer-hub tone-flip" : ""}`}>
              <div>
                <h3>{t.title}</h3>
                <p className="text-muted">{t.items}</p>
              </div>
              <div className="chips">
                {t.chips.map((c) => (
                  <span key={c.brand} className="tool-chip">
                    <BrandIcon name={c.brand} size={20} />
                    {c.label}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

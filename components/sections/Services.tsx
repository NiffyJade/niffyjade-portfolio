import { services } from "@/content/site";
import { Reveal } from "../Reveal";
import { ServiceIcon } from "../ServiceIcon";

export function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <Reveal as="h2">
          What I build <span className="grad">for you</span>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          {services.map((s, i) => (
            <Reveal as="article" key={s.title} delay={(i % 3) * 0.1} className="card">
              <ServiceIcon name={s.icon} />
              <h3>{s.title}</h3>
              <p>
                <b>Problem:</b> {s.problem}
              </p>
              <p>
                <b>I build:</b> {s.build}
              </p>
              <p>
                <b>Outcome:</b> {s.outcome}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

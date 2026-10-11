import { sections, testimonials } from "@/content/site";
import { Reveal } from "../Reveal";

const QuoteMark = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="currentColor" aria-hidden="true" className="text-accent-text opacity-80">
    <path d="M0 22V13.2C0 5.6 4.2 1.2 11 0l1 2.6C8.4 3.6 6.6 5.8 6.4 9H11v13H0zm16 0V13.2C16 5.6 20.2 1.2 27 0l1 2.6c-3.6 1-5.4 3.2-5.6 6.4H27v13H16z" />
  </svg>
);

export function Testimonials() {
  return (
    <section id="proof" className="panel tone-alt">
      <div className="wrap">
        <Reveal>
          <span className="pill">{sections.testimonials.pill}</span>
          <h2>What clients say</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={t.quote} delay={i * 0.1} className="card m-0 flex flex-col gap-5">
              <QuoteMark />
              <blockquote className="m-0 flex-1">
                <p className="mb-0! text-[1.05rem]!">{t.quote}</p>
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-line pt-4 text-[.92rem] text-muted">
                <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-bg2 font-display text-[.8rem] font-bold text-accent-text">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
                  </svg>
                </span>
                {t.author}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

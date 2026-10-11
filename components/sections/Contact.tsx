import { contact, sections, socials } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { ContactForm } from "../ContactForm";
import { Reveal } from "../Reveal";

/** Decorative corner motif: a few nodes joined by lines, echoing the hero workflow. */
const BandArt = () => (
  <svg className="band-art" viewBox="0 0 520 360" fill="none" stroke="var(--on-accent)" strokeWidth="2" aria-hidden="true">
    <path d="M40 80C120 80 140 200 220 200S320 60 400 60 480 160 500 160" />
    <path d="M220 200C250 280 330 300 400 260" />
    <g fill="var(--on-accent)" stroke="none">
      <circle cx="40" cy="80" r="9" />
      <circle cx="220" cy="200" r="12" />
      <circle cx="400" cy="60" r="9" />
      <circle cx="400" cy="260" r="9" />
      <circle cx="500" cy="160" r="7" />
    </g>
  </svg>
);

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal className="contact-band">
          <BandArt />
          <div className="grid items-start gap-12 min-[861px]:grid-cols-[.95fr_1.05fr] min-[861px]:gap-14">
            <div>
              <span className="pill">{sections.contact.pill}</span>
              <h2>
                {contact.headline} <span className="mark-ink">{contact.gradientWord}</span>
              </h2>
              <p>{contact.body}</p>

              <h3 className="mt-9 mb-3">{contact.nextHeading}</h3>
              <ol className="mini-steps">
                {contact.nextSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>

              <p className="mb-3 text-[.92rem]">{contact.reachHeading}</p>
              <ul className="m-0 flex list-none gap-3 p-0">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="btn icon-btn"
                    >
                      <BrandIcon name={s.brand} size={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Light card on the accent band (palette flips with the page theme) */}
            <div className="form-card tone-alt">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

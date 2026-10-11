import { contact, sections, socials } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { ContactForm } from "../ContactForm";
import { Reveal } from "../Reveal";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap grid items-start gap-12 min-[861px]:grid-cols-[.95fr_1.05fr] min-[861px]:gap-16">
        <Reveal>
          <span className="pill">{sections.contact.pill}</span>
          <h2>
            {contact.headline} <span className="mark">{contact.gradientWord}</span>
          </h2>
          <p className="text-muted">{contact.body}</p>

          <h3 className="mt-9 mb-3">{contact.nextHeading}</h3>
          <ol className="mini-steps">
            {contact.nextSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>

          <p className="mb-3 text-[.92rem] text-muted">{contact.reachHeading}</p>
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
        </Reveal>

        {/* Light card on the dark section (palette flips with the page theme) */}
        <Reveal delay={0.15} className="form-card tone-alt">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

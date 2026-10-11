import { contact } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { ContactForm } from "../ContactForm";
import { Reveal } from "../Reveal";

// Logo-only links; the aria-label names each one for screen readers
const socials = [
  { label: "WhatsApp", brand: "whatsapp", href: contact.whatsapp.href },
  ...contact.links,
];

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal className="contact-panel grid gap-12 min-[861px]:grid-cols-[1fr_1.05fr] min-[861px]:gap-16">
          <div>
            <h2>
              {contact.headline} <span className="grad">{contact.gradientWord}</span>
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
                    className="btn grid size-12 place-items-center !p-0"
                  >
                    <BrandIcon name={s.brand} size={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

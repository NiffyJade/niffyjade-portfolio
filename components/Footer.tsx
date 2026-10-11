import { hero, nav, site, socials } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { BrandIcon } from "./BrandIcon";
import { ButtonLink } from "./ButtonLink";
import { LocalTime } from "./LocalTime";
import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#top" className="brand mb-3" aria-label={`${site.alias}, back to top`}>
              <Mark id="footer-mark" size={34} />
              {site.alias}
            </a>
            <p className="max-w-[34ch] text-muted">
              Automation systems that run the busywork so people can focus on the work only they can do.
            </p>
          </div>

          {/* Page links */}
          <nav aria-label="Footer">
            <p className="footer-label">Navigate</p>
            <ul className="footer-nav m-0 grid list-none p-0">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <p className="footer-label">Connect</p>
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
                    <BrandIcon name={s.brand} size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability and the one primary action */}
          <div className="grid content-start justify-items-start gap-4 min-[861px]:justify-items-end">
            <span className="status">
              <span className="status-dot" aria-hidden="true" />
              {hero.badge}
            </span>
            <LocalTime />
            <ButtonLink href={bookingUrl} variant="primary" arrow>
              {hero.primaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[.9rem] text-muted">
          <p className="m-0">
            © {site.year} {site.name} ({site.alias}). Built in Ile-Ife, Nigeria.
          </p>
          <a href="#top" className="btn icon-btn" aria-label="Back to top" title="Back to top">
            ↑
          </a>
        </div>

        <div className="footer-word pb-[env(safe-area-inset-bottom)]" aria-hidden="true">
          {site.alias}
        </div>
      </div>
    </footer>
  );
}

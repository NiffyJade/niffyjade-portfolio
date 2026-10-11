import { marquee } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { Reveal } from "../Reveal";
import { Stats } from "../Stats";

export function Proof() {
  return (
    <div className="wrap">
      <Stats />
      <Reveal className="marquee mt-[30px]">
        {/* Two identical groups: the track slides exactly one group, then loops */}
        <div className="marquee-track">
          {[false, true].map((hidden) => (
            <div key={String(hidden)} className="marquee-group" aria-hidden={hidden || undefined}>
              {marquee.map((t) => (
                <span key={t.name} className="inline-flex items-center gap-2.5">
                  <BrandIcon name={t.brand} size={22} />
                  {t.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

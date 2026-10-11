import type { ServiceIcon as IconName } from "@/content/site";

const PATHS: Record<IconName, string> = {
  search: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM16 16l5 5",
  funnel: "M3 5h18l-7 8v6l-4-2v-4z",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  wave: "M4 12h0M8 8v8M12 4v16M16 8v8M20 12h0",
  bars: "M5 20V10M12 20V4M19 20v-7",
  code: "M9 7l-5 5 5 5M15 7l5 5-5 5",
};

export function ServiceIcon({ name }: { name: IconName }) {
  return (
    <div className="icon-tile">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={PATHS[name]} />
      </svg>
    </div>
  );
}

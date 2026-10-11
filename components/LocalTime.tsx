"use client";

import { useEffect, useState } from "react";

/** Live local time for Ile-Ife (WAT, no daylight saving). Renders empty until mounted to avoid a hydration mismatch. */
export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-[.9rem] text-muted" suppressHydrationWarning>
      Ile-Ife{time && ` · ${time} WAT`}
    </span>
  );
}

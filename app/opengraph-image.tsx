import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.alias} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated 1200x630 share card in the site's ink + gold palette. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(900px 500px at 80% 0%, #2a2210, #070a12 70%)",
          color: "#eef1f8",
        }}
      >
        <div style={{ fontSize: 34, color: "#9aa5bf", marginBottom: 24 }}>{site.alias}</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3, display: "flex", flexWrap: "wrap" }}>
          <span>Automation that&nbsp;</span>
          <span style={{ color: "#f2c26b" }}>runs your business</span>
        </div>
        <div style={{ fontSize: 32, color: "#9aa5bf", marginTop: 36 }}>{site.role}</div>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 10, background: "linear-gradient(90deg, #f2c26b, #ff8a5c)" }} />
      </div>
    ),
    size,
  );
}

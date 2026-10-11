import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.alias} | ${site.role}`,
    short_name: site.alias,
    start_url: "/",
    display: "standalone",
    background_color: "#070a12",
    theme_color: "#070a12",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

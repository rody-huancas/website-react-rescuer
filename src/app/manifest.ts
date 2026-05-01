import type { MetadataRoute } from "next";
import { SEO_SITE } from "@/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name            : SEO_SITE.name,
    short_name      : "Rescuer",
    description     : SEO_SITE.description,
    start_url       : "/",
    scope           : "/",
    display         : "standalone",
    background_color: "#0d0d0d",
    theme_color     : "#0d0d0d",
    lang            : SEO_SITE.defaultLocale,
    icons           : [
      {
        src    : "/logo-react-rescuer.webp",
        sizes  : "any",
        type   : "image/webp",
        purpose: "any",
      },
    ],
  };
}

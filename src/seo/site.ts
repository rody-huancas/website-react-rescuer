import { URLS } from "@/constants/urls";
import { DEFAULT_KEYWORDS } from "@/seo/keywords";

export const SEO_SITE = {
  name           : "React Rescuer",
  description    : "Una herramienta moderna para Error Boundaries: rescata caidas, conserva contexto y entrega UIs mas serenas.",
  defaultLocale  : "es",
  supportedLocales: ["es", "en", "pt"],
  locale         : "es_ES",
  twitterHandle  : "@reactrescuer",
  defaultKeywords: DEFAULT_KEYWORDS,
  ogImagePath    : "/landing-hero.png",
  urls           : URLS,
} as const;

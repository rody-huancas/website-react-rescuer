import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/urls";
import { docsSections } from "@/lib/docs/content";

const sitemap = (): MetadataRoute.Sitemap => {
  const base = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;
  const now  = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url            : base,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 1,
    },
    {
      url            : `${base}docs/`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.8,
    },
  ];

  const docsRoutes: MetadataRoute.Sitemap = docsSections.map((s) => ({
    url            : `${base}docs/${s.slug}/`,
    lastModified   : now,
    changeFrequency: "monthly",
    priority       : 0.7,
  }));

  return [...staticRoutes, ...docsRoutes];
}

export default sitemap;

import type { Metadata } from "next";
import { SITE_URL } from "@/constants/urls";
import { SEO_SITE } from "@/seo/site";

type SeoInput = {
  title       : string;
  description?: string;
  path       ?: string;
  keywords   ?: readonly string[];
  ogImagePath?: string;
};

const normalizePath = (path: string) => {
  if (!path) return "/";
  if (!path.startsWith("/")) return `/${path}`;
  return path;
};

const absoluteUrl = (path: string) => {
  const base = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;
  const p    = normalizePath(path);

  return new URL(p.slice(1), base).toString();
};

export const createMetadata = (props: SeoInput): Metadata => {
  const { title, description = SEO_SITE.description, path = "/", keywords = SEO_SITE.defaultKeywords, ogImagePath = SEO_SITE.ogImagePath } = props;

  const canonical = absoluteUrl(path);

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SEO_SITE.name,
    manifest: "/manifest.webmanifest",
    title,
    description,
    keywords  : [...keywords],
    alternates: { canonical },
    openGraph : {
      type    : "website",
      url     : canonical,
      siteName: SEO_SITE.name,
      title,
      description,
      locale: SEO_SITE.locale,
      images: [{ url: ogImagePath }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath],
    },
    robots: {
      index    : true,
      follow   : true,
      googleBot: {
        index              : true,
        follow             : true,
        "max-image-preview": "large",
        "max-snippet"      : -1,
        "max-video-preview": -1,
      },
    },
  };
};

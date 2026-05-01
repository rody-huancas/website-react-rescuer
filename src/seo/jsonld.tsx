import { SEO_SITE } from "@/seo/site";
import { SITE_URL, URLS } from "@/constants/urls";

type JsonLdValue = Record<string, unknown>;

export const JsonLd = ({ data }: { data: JsonLdValue | JsonLdValue[] }) => {
  const json = JSON.stringify(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type"   : "WebSite",
  name      : SEO_SITE.name,
  url       : SITE_URL,
});

export const softwareSourceCodeJsonLd = () => ({
  "@context"         : "https://schema.org",
  "@type"            : "SoftwareSourceCode",
  name               : "react-rescuer",
  description        : SEO_SITE.description,
  codeRepository     : URLS.repo,
  programmingLanguage: "TypeScript",
  runtimePlatform    : "React",
  url                : SITE_URL,
});

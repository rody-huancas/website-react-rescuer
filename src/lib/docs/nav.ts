import { docsGroups, docsSections } from "@/lib/docs/content";

export type DocsNavGroup = {
  title: string;
  items: Array<{ title: string; href: string; slug: string }>;
};

const docsNav: DocsNavGroup[] = docsGroups.map((g) => {
  return {
    title: g.title,
    items: docsSections.filter((s) => s.group === g.id).map((s) => ({ title: s.title, href: `/docs/${s.slug}`, slug: s.slug })),
  };
});

export default docsNav;

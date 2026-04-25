import docsNav from "@/lib/docs/nav";

export type DocsNav = typeof docsNav;

export const getActiveSlug = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "docs") return "";
  return parts[1] ?? "";
};

export const filterNav = (nav: DocsNav, query: string) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return nav;

  return nav
    .map((g) => {
      const items = g.items.filter((i) => i.title.toLowerCase().includes(normalized));
      return { ...g, items };
    })
    .filter((g) => g.items.length > 0);
};

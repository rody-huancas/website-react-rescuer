export type DocsNavGroup = {
  title: string;
  items: Array<{ title: string; href: string }>;
};

const docsNav: DocsNavGroup[] = [
  {
    title: "Empezar",
    items: [
      { title: "Introducción", href: "/docs#intro" },
      { title: "Instalación", href: "/docs#installation" },
      { title: "Conceptos clave", href: "/docs#key-concepts" },
      { title: "Guía rápida", href: "/docs#quick-start" },
    ],
  },
  {
    title: "API",
    items: [
      { title: "ErrorBoundary", href: "/docs#error-boundary" },
      { title: "Resets", href: "/docs#resets" },
      { title: "Recovery / reintentos", href: "/docs#recovery" },
      { title: "Observabilidad", href: "/docs#observability" },
      { title: "Hooks", href: "/docs#hooks" },
      { title: "HOC", href: "/docs#hoc" },
      { title: "RetryManager", href: "/docs#retry-manager" },
      { title: "Testing", href: "/docs#testing" },
      { title: "Dev overlay", href: "/docs#dev-overlay" },
      { title: "Import paths", href: "/docs#imports" },
      { title: "Notas y limitaciones", href: "/docs#limitations" },
    ],
  },
  {
    title: "Extras",
    items: [
      { title: "Ejemplos", href: "/docs#examples" },
      { title: "Cambios", href: "/docs#changelog" },
    ],
  },
];

export default docsNav;

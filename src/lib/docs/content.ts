export type DocsGroupId = "empezar" | "api" | "extras";

export type DocsSection = {
  slug       : string;
  title      : string;
  description: string;
  group      : DocsGroupId;
};

export const docsSections: DocsSection[] = [
  {
    slug       : "introduction",
    title      : "Introduccion",
    description: "Qué es react-rescuer y para que sirve.",
    group      : "empezar",
  },
  {
    slug       : "installation",
    title      : "Instalacion",
    description: "Instala el paquete con tu gestor preferido.",
    group      : "empezar",
  },
  {
    slug       : "key-concepts",
    title      : "Conceptos clave",
    description: "Que atrapan los boundaries y como elevar errores async.",
    group      : "empezar",
  },
  {
    slug       : "quick-start",
    title      : "Guia rapida",
    description: "30-60 segundos para envolver, fallback y reporting.",
    group      : "empezar",
  },

  {
    slug       : "error-boundary",
    title      : "ErrorBoundary",
    description: "API y modos de fallback.",
    group      : "api",
  },
  {
    slug       : "resets",
    title      : "Resets",
    description: "resetError, resetKeys y evento de reset.",
    group      : "api",
  },
  {
    slug       : "recovery",
    title      : "Recovery / reintentos",
    description: "Politica de reintentos con delay/backoff.",
    group      : "api",
  },
  {
    slug       : "observability",
    title      : "Observabilidad",
    description: "buildErrorContext, breadcrumbs y fingerprint.",
    group      : "api",
  },
  {
    slug       : "hooks",
    title      : "Hooks",
    description: "useErrorBoundary y useErrorContext.",
    group      : "api",
  },
  {
    slug       : "hoc",
    title      : "HOC",
    description: "withErrorBoundary(Component, options).",
    group      : "api",
  },
  {
    slug       : "retry-manager",
    title      : "RetryManager",
    description: "Recovery standalone con RetryManager.",
    group      : "api",
  },
  {
    slug       : "testing",
    title      : "Testing",
    description: "createTestBoundary e installMatchers.",
    group      : "api",
  },
  {
    slug       : "dev-overlay",
    title      : "Dev overlay",
    description: "Overlay integrado en development.",
    group      : "api",
  },
  {
    slug       : "imports",
    title      : "Import paths",
    description: "Rutas de import oficiales (exports).",
    group      : "api",
  },
  {
    slug       : "limitations",
    title      : "Notas y limitaciones",
    description: "Comportamientos y limites importantes.",
    group      : "api",
  },

  {
    slug       : "live-examples",
    title      : "Ejemplos en tiempo real",
    description: "Sandbox inline para simular errores y resets.",
    group      : "extras",
  },
];

export const docsSectionBySlug: Record<string, DocsSection> = Object.fromEntries(
  docsSections.map((s) => [s.slug, s]),
);

export const getPrevNext = (slug: string) => {
  const idx  = docsSections.findIndex((s) => s.slug === slug);
  const prev = idx >  0 ?  docsSections[idx - 1] : null;
  const next = idx >= 0 && idx < docsSections.length - 1 ? docsSections[idx + 1] : null;

  return { prev, next };
};

export const docsGroups: Array<{ id: DocsGroupId; title: string }> = [
  { id: "empezar", title: "EMPEZAR" },
  { id: "api"    , title: "API"     },
  { id: "extras" , title: "EXTRAS"  },
];

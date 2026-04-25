export type HeaderNavItem = {
  label    : string;
  href     : string;
  external?: boolean;
};

export const HEADER_NAV: HeaderNavItem[] = [
  {
    label: "Documentacion",
    href : "/docs/introduction"
  },
  {
    label: "Ejemplos",
    href : "/docs/live-examples"
  },
  {
    label   : "GitHub",
    href    : "https://github.com/rody-huancas/react-rescuer",
    external: true,
  },
];

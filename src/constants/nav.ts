export type HeaderNavItem = {
  href     : string;
  external?: boolean;
};

export const HEADER_NAV: HeaderNavItem[] = [
  {
    href : "/docs/introduction"
  },
  {
    href : "/docs/live-examples"
  },
  {
    href    : "https://github.com/rody-huancas/react-rescuer",
    external: true,
  },
];

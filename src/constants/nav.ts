export type HeaderNavItem = {
  href     : string;
  external?: boolean;
};

const envConfig = {
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/rody-huancas/react-rescuer",
};

export const HEADER_NAV: HeaderNavItem[] = [
  {
    href : "/docs/introduction"
  },
  {
    href : "/docs/live-examples"
  },
  {
    href    : envConfig.githubUrl,
    external: true,
  },
];

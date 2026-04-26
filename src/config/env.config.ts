export const config = {
  appUrl      : process.env.NEXT_PUBLIC_APP_URL       || "http://localhost:3000",
  npmUrl      : process.env.NEXT_PUBLIC_NPM_URL       || "https://www.npmjs.com/package/react-rescuer",
  githubUrl   : process.env.NEXT_PUBLIC_GITHUB_URL    || "https://github.com/rody-huancas/react-rescuer",
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://rody-huancas.vercel.app",
  pokeapiUrl  : process.env.NEXT_PUBLIC_POKEAPI_URL   || "https://pokeapi.co",
} as const;

export type Config = typeof config;

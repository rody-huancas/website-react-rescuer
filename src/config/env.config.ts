const envConfig = {
  appUrl       : process.env.NEXT_PUBLIC_APP_URL          || "",
  npmUrl       : process.env.NEXT_PUBLIC_NPM_URL          || "",
  githubUrl    : process.env.NEXT_PUBLIC_GITHUB_URL       || "",
  pokemonApiUrl: process.env.NEXT_PUBLIC_POKEMON_API_URL  || "",
  portfolioUrl : process.env.NEXT_PUBLIC_PORTFOLIO_URL    || "",
};

export default envConfig;

export const PACKAGE_INSTALL_TEMPLATES = [
  { key: "pnpm", template: "pnpm add {pkg}" },
  { key: "npm" , template: "npm i {pkg}"    },
  { key: "yarn", template: "yarn add {pkg}" },
  { key: "bun" , template: "bun add {pkg}"  },
] as const;

export const REACT_RESCUER_PACKAGE_NAME = "react-rescuer" as const;

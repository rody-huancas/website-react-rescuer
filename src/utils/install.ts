import { PACKAGE_INSTALL_TEMPLATES } from "@/constants/install";

export const buildInstallCommands = (pkg: string) => {
  return PACKAGE_INSTALL_TEMPLATES.map((t) => ({
    key: t.key,
    cmd: t.template.replace("{pkg}", pkg),
  }));
};

export const buildInstallTabs = (pkg: string) => {
  return PACKAGE_INSTALL_TEMPLATES.map((t) => ({
    label   : t.key,
    language: "bash",
    code    : t.template.replace("{pkg}", pkg),
  }));
};

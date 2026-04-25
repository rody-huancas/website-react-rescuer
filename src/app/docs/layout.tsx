import type { Metadata } from "next";
import DocsFrame from "@/components/docs/DocsFrame";

export const metadata: Metadata = {
  title: "Documentación — react-rescuer",
};

const DocsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <DocsFrame>
    {children}
  </DocsFrame>
);

export default DocsLayout;

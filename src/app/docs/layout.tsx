import type { Metadata } from "next";
import DocsFrame from "@/components/docs/DocsFrame";
import { createMetadata } from "@/seo";

export const metadata: Metadata = createMetadata({
  title      : "Documentacion — react-rescuer",
  description: "Documentacion oficial de react-rescuer: ErrorBoundary, recovery, observabilidad, hooks y mas.",
  path       : "/docs/",
  keywords   : [
    "react-rescuer docs",
    "react error boundary docs",
    "error boundaries react",
    "react error recovery",
    "react observability",
    "useErrorBoundary",
  ],
});

const DocsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <DocsFrame>
    {children}
  </DocsFrame>
);

export default DocsLayout;

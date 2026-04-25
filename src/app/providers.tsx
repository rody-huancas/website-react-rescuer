"use client";

import type { ReactNode } from "react";
import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider
      height="3px"
      color="var(--rr-accent)"
      options={{ showSpinner: false }}
    >
      {children}
    </ProgressProvider>
  );
};

export default Providers;
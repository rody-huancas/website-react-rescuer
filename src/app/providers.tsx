"use client";

import type { ReactNode } from "react";
import { ProgressProvider } from "@bprogress/next/app";
import CustomCursorLayer from "@/components/ui/CustomCursorLayer";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider
      height="3px"
      color="var(--rr-accent)"
      options={{ showSpinner: false }}
    >
      <CustomCursorLayer />
      <ServiceWorkerRegister />
      
      {children}
    </ProgressProvider>
  );
};

export default Providers;

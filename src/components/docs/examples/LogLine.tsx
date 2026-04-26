"use client";

import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type    : "info" | "error" | "ok" | "warn";
}

const LogLine = ({ children, type }: Props) => {
  const styles = {
    info : "text-gray-400",
    error: "text-red-400",
    ok   : "text-green-400",
    warn : "text-yellow-400",
  };

  const icons = { info: "→", error: "✕", ok: "✓", warn: "⚠" };

  return (
    <div className={cn("flex gap-2 text-xs font-mono", styles[type])}>
      <span className="shrink-0">{icons[type]}</span>
      <span>{children}</span>
    </div>
  );
};

export default LogLine;

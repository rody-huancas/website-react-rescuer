import type { ReactNode } from "react";
import { FiAlertTriangle, FiInfo, FiZap, FiXOctagon } from "react-icons/fi";

export type CalloutKind = "tip" | "info" | "warning" | "danger";

export const CALLOUT_STYLES: Record<CalloutKind, { icon: ReactNode; border: string; bg: string; title: string }> = {
  tip: {
    icon  : <FiZap size={16} />,
    border: "border-(--rr-accent)/35",
    bg    : "bg-(--rr-accent)/10",
    title : "Tip",
  },
  info: {
    icon  : <FiInfo size={16} />,
    border: "border-white/10",
    bg    : "bg-white/4",
    title : "Info",
  },
  warning: {
    icon  : <FiAlertTriangle size={16} />,
    border: "border-yellow-500/25",
    bg    : "bg-yellow-500/8",
    title : "Warning",
  },
  danger: {
    icon  : <FiXOctagon size={16} />,
    border: "border-red-500/25",
    bg    : "bg-red-500/8",
    title : "Danger",
  },
};

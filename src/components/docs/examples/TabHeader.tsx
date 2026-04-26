"use client";

import { cn } from "@/utils/cn";

interface Props {
  label      : string;
  activeTab  : boolean;
  onTabChange: (tab: boolean) => void;
}

const TabHeader = ({ label, activeTab, onTabChange }: Props) => (
  <button
    onClick={() => onTabChange(!activeTab)}
    className={cn("px-3 py-1 text-xs rounded transition-colors", {
      "bg-white/10 text-white": !activeTab,
      "text-gray-500 hover:text-gray-300": activeTab,
    })}
  >
    {label}
  </button>
);

export default TabHeader;

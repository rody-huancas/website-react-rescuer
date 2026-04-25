import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { CALLOUT_STYLES, type CalloutKind } from "@/constants/callouts";

interface Props {
  kind    ?: CalloutKind;
  title   ?: string;
  children : ReactNode;
}

const CalloutBox = ({ kind = "info", title, children }: Props) => {
  const s = CALLOUT_STYLES[kind];

  return (
    <div className={cn("mt-6 mb-5 rounded-2xl border p-5", s.border, s.bg)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-white/70">{s.icon}</div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">
            {title ?? s.title}
          </div>
          <div className="mt-2 text-sm leading-relaxed text-white/65">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalloutBox;

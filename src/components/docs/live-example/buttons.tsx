import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const PrimaryButton = ({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className="rounded-full bg-(--rr-accent) px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-black transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0"
  >
    {children}
  </button>
);

export const GhostButton = ({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 transition-colors hover:bg-white/6 hover:text-white disabled:opacity-50"
  >
    {children}
  </button>
);

export const FooterButton = ({ children, onClick, icon, pressed }: { children: ReactNode; onClick: () => void; icon: ReactNode; pressed?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={pressed}
    className={cn("inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-all",
      pressed ? "border-(--rr-accent)/55 bg-(--rr-accent)/12 text-(--rr-accent)" : "border-white/10 bg-white/3 text-white/75 hover:bg-white/5 hover:text-white"
    )}
  >
    {icon}
    {children}
  </button>
);

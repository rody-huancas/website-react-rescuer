import type { ReactNode } from "react";

interface Props {
  title      : string;
  description: string;
  children   : ReactNode;
}

const PreviewShell = ({ title, description, children }: Props) => {
  return (
    <div className="rounded-3xl border border-white/6 bg-black/25 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="font-(family-name:--font-geist-mono) text-[11px] tracking-[0.22em] text-white/55">LIVE</div>
          <div className="mt-1 text-lg font-bold tracking-[-0.02em]">{title}</div>
          <div className="mt-2 text-sm leading-relaxed text-white/60">{description}</div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/6 bg-[#111111] p-4">
        {children}
      </div>
    </div>
  );
};

export default PreviewShell;

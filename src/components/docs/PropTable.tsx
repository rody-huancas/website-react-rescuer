import type { ReactNode } from "react";
import { typeColor } from "@/utils/propTable";

export type PropRow = {
  name         : string;
  type         : string;
  required    ?: boolean;
  description  : ReactNode;
  defaultValue?: string;
};

interface Props {
  title?: string;
  rows  : PropRow[];
}

const PropTable = ({ title, rows }: Props) => {
  return (
    <div className="mt-7">
      {title ? (
        <div className="mb-3 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.22em] text-white/55">
          {title.toUpperCase()}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/8">
        <div className="hidden grid-cols-[1.1fr_1.1fr_0.6fr_1.2fr] gap-0 bg-[#111111] text-[12px] font-semibold text-white/65 sm:grid">
          <div className="px-4 py-3">Nombre</div>
          <div className="px-4 py-3">Tipo</div>
          <div className="px-4 py-3">Req.</div>
          <div className="px-4 py-3">Descripcion</div>
        </div>

        <div className="divide-y divide-white/8 bg-black/25">
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-[1.1fr_1.1fr_0.6fr_1.2fr] sm:gap-0">
              <div className="py-3 px-0 sm:px-4 font-(family-name:--font-geist-mono) text-[13px] text-white/90">
                {r.name}
              </div>
              <div className="py-3 px-0 sm:px-4">
                <span className={`inline-flex items-center font-mono text-xs px-2 py-1 rounded-md whitespace-pre-wrap break-all max-w-45 ${typeColor(r.type)}`}>
                  {r.type}
                </span>
                {r.defaultValue ? (
                  <div className="mt-2 text-[12px] text-white/45">
                    default: <span className="font-(family-name:--font-geist-mono)">{r.defaultValue}</span>
                  </div>
                ) : null}
              </div>
              <div className="py-3 px-0 sm:px-4">
                {r.required ? (
                  <span className="inline-flex rounded bg-red-950 text-red-400 text-xs px-2 py-0.5">
                    si
                  </span>
                ) : (
                  <span className="text-zinc-600 text-xs">no</span>
                )}
              </div>
              <div className="text-zinc-300 text-sm leading-relaxed py-3 px-0 sm:px-4">
                {r.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropTable;

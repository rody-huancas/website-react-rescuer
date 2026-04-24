"use client";

import { useMemo, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const InstallCommands = () => {
  const options = useMemo(
    () => [
      { key: "pnpm", cmd: "pnpm add react-rescuer" },
      { key: "npm", cmd: "npm i react-rescuer" },
      { key: "yarn", cmd: "yarn add react-rescuer" },
      { key: "bun", cmd: "bun add react-rescuer" },
    ],
    [],
  );

  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const cmd = options[active].cmd;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch {}
  };

  return (
    <div data-rr-install-card className="flex justify-center py-8 w-full">
      <div className="w-full max-w-[500px]">
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          data-rr-install-shell
          style={{
            background: "#0D0D0D",
            border: "1px solid #1A1A1A",
          }}
        >
          <div className="flex items-center justify-between px-5 pt-3 bg-[#111111] border-b border-[#1A1A1A]">
            <div className="flex items-center gap-6">
              {options.map((o, idx) => (
                <button
                  key={o.key}
                  onClick={() => setActive(idx)}
                  className={`relative pb-3 text-[12px] font-semibold transition-colors cursor-pointer outline-none ${
                    idx === active ? "text-[#00F2FE]" : "text-white/80 hover:text-white"
                  }`}
                  data-rr-install-tab
                >
                  {o.key}

                  {idx === active && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00F2FE]"
                      style={{ boxShadow: "0 0 8px rgba(0, 242, 254, 0.4)" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 pb-3" data-rr-install-dots>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>

          <div className="relative flex items-center p-5 bg-[#0D0D0D]">
            <code className="flex-1 font-mono text-[14px] text-white/90 truncate pr-10" data-rr-install-cmd>
              <span className="text-[#00F2FE] mr-3 select-none">$</span>
              {cmd}
            </code>

            <button
              onClick={onCopy}
              data-rr-install-copy
              className={`
                absolute right-5 p-2 rounded-md transition-all duration-200 cursor-pointer
                ${ copied ? "text-[#00F2FE]" : "text-white/20 hover:text-white/80" }
              `}
            >
              {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallCommands;

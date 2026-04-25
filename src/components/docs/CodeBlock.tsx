"use client";

import { useMemo, useState } from "react";
import { Highlight, themes, type RenderProps, type Token } from "prism-react-renderer";
import { FiCopy, FiCheck } from "react-icons/fi";
import { normalizeCode, normalizeLang } from "@/utils/code";
import useClipboardCopy from "@/hooks/useClipboardCopy";

export type CodeTab = {
  label    : string;
  language : string;
  code     : string;
  filename?: string;
};

interface Props {
  code           ?: string;
  language       ?: string;
  filename       ?: string;
  title          ?: string;
  tabs           ?: CodeTab[];
  wrap           ?: boolean;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ code, language, filename, title, tabs, wrap = false, showLineNumbers = true }: Props) => {
  const [active, setActive] = useState<number>(0);
  const { copied, copy } = useClipboardCopy({ timeoutMs: 2000 });

  const tab = tabs?.[active];

  const resolvedCode = useMemo(() => {
    const raw = tab?.code ?? code ?? "";
    return normalizeCode(raw);
  }, [tab?.code, code]);

  const resolvedLanguage = normalizeLang(tab?.language ?? language);
  const resolvedFilename = tab?.filename ?? filename;

  const onCopy = () => copy(resolvedCode);

  return (
    <div className="mt-6 mb-5 overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d0d] shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 bg-[#111111] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="rounded-full border border-white/10 bg-white/4 px-3 py-1 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.16em] text-white/60">
            {resolvedLanguage.toUpperCase()}
          </div>
          {resolvedFilename ? (
            <div className="hidden rounded-full border border-white/10 bg-white/4 px-3 py-1 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.14em] text-white/60 sm:block">
              {resolvedFilename}
            </div>
          ) : null}
          {title ? (
            <div className="hidden rounded-full border border-white/10 bg-white/4 px-3 py-1 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.18em] text-white/55 sm:block">
              {title}
            </div>
          ) : null}
        </div>
      </div>

      {tabs && tabs.length > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-3">
          <div className="flex items-center gap-1 rounded-full bg-white/3 p-1">
            {tabs.map((t, idx) => (
              <button
                key={`${t.label}-${idx}`}
                type="button"
                onClick={() => setActive(idx)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  idx === active
                    ? "bg-white/8 text-white"
                    : "text-white/55 hover:text-white/85"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div />
        </div>
      ) : null}

      <div className="p-4 pt-3 sm:p-6 sm:pt-5">
        <Highlight
          code={resolvedCode}
          language={resolvedLanguage as any}
          theme={themes.nightOwl}
        >
          {(renderProps: RenderProps) => {
            const { className, style, tokens, getLineProps, getTokenProps } = renderProps;

            return (
              <pre
                className={`${className} rounded-xl p-4 text-[13.5px] leading-relaxed ${
                  wrap ? "overflow-x-hidden whitespace-pre-wrap wrap-break-word" : "overflow-x-auto whitespace-pre"
                }`}
                style={{
                  ...style,
                  margin: 0,
                  padding: "1.25rem",
                  borderRadius: "0.75rem",
                  overflowX: "auto",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  background: "transparent",
                }}
              >
                <code className="font-(family-name:--font-geist-mono)">
                  {tokens.map((line: Token[], i: number) => (
                    <div key={i} {...getLineProps({ line })}>
                      {showLineNumbers ? (
                        <span className="select-none opacity-30 mr-4 text-xs">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      ) : null}
                      {line.map((token: Token, key: number) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            );
          }}
        </Highlight>
      </div>

      <div className="flex items-center border-t border-white/8 bg-[#111111] px-4 py-3">
        <div className="font-(family-name:--font-geist-mono) text-[11px] tracking-[0.18em] text-white/55">
          {copied ? "COPIADO ✓" : "COPIAR"}
        </div>

        <button
          type="button"
          onClick={onCopy}
          className={`ml-auto rounded-md p-2 transition-colors ${
            copied ? "text-(--rr-accent)" : "text-white/30 hover:text-white/80"
          }`}
          aria-label="Copiar codigo"
        >
          {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;

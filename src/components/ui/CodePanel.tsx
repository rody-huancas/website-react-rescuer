"use client";

import { useMemo, useState } from "react";
import { Highlight, themes, type Language, type RenderProps, type Token } from "prism-react-renderer";

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1100);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[12px] font-semibold text-white/85 transition-colors hover:bg-white/7"
    >
      {copied ? "Copiado" : "Copiar"}
      <span className="text-white/35">⌘C</span>
    </button>
  );
};

export type CodePanelTab = {
  label   : string;
  language: Language;
  code    : string;
};

interface Props {
  tabs            : CodePanelTab[];
  title          ?: string;
  filename       ?: string;
  showLineNumbers?: boolean;
  wrap           ?: boolean;
}

const CodePanel = ({ tabs, title, filename, showLineNumbers = true, wrap = false }: Props) => {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  const code = useMemo(() => {
    return tab.code.replace(/\s+$/, "");
  }, [tab.code]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/45 shadow-[0_18px_70px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between border-b border-white/8 bg-black/35 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 animate-pulse" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
        </div>

        <div className="flex items-center gap-2">
          {filename ? (
            <div className="hidden rounded-full border border-white/10 bg-white/4 px-3 py-1 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.12em] text-white/65 sm:block">
              {filename}
            </div>
          ) : null}
          {title ? (
            <div className="hidden rounded-full border border-white/10 bg-white/4 px-3 py-1 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.18em] text-white/60 sm:block">
              {title}
            </div>
          ) : null}
          
          <CopyButton value={code} />
        </div>
      </div>

      {tabs.length > 1 ? (
        <div className="flex items-center justify-between gap-3 px-4 pt-3">
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

          <div className="rounded-full border border-white/10 bg-white/3 px-3 py-1 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.16em] text-white/60">
            {tab.language.toUpperCase()}
          </div>
        </div>
      ) : null}

      <div className="p-4 pt-3 sm:p-6 sm:pt-5">
        <Highlight
          code={code}
          language={tab.language}
          theme={{
            ...themes.nightOwl,
            plain: {
              ...themes.nightOwl.plain,
              backgroundColor: "transparent",
              color: "color-mix(in oklab, var(--rr-fg), transparent 6%)",
            },
          }}
        >
          {(renderProps: RenderProps) => {
            const { className, style, tokens, getLineProps, getTokenProps } = renderProps;

            return (
              <pre
                className={`${className} rounded-xl bg-black/55 p-4 text-[13.5px] leading-relaxed ${
                  wrap ? "overflow-x-hidden whitespace-pre-wrap wrap-break-word" : "rr-scrollbar-none overflow-x-auto whitespace-pre"
                }`}
                style={{ ...style, background: "transparent", margin: 0 }}
              >
                <code className="font-(family-name:--font-geist-mono)">
                  {showLineNumbers
                    ? tokens.map((line: Token[], i: number) => (
                        <div
                          key={i}
                          {...getLineProps({ line })}
                          className="grid grid-cols-[28px_1fr] items-start gap-4"
                        >
                          <span className="select-none text-right text-white/35">
                            {i + 1}
                          </span>

                          <span className="min-w-0 whitespace-pre">
                            {line.map((token: Token, key: number) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </span>
                        </div>
                      ))
                    : tokens.map((line: Token[], i: number) => (
                        <div key={i} {...getLineProps({ line })}>
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
    </div>
  );
};

export default CodePanel;

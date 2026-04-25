"use client";

import type * as React from "react";
import type { Language } from "prism-react-renderer";
import CodePanel from "@/components/ui/CodePanel";
import { dedent } from "@/utils/text";
import { normalizeLang } from "@/utils/code";

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  children?: unknown;
};

const MdxCodeBlock = (props: PreProps) => {
  const child = props.children;

  if (!child) return null;

  if (
    typeof child === "object" &&
    child !== null &&
    // MDX gives <pre><code /></pre>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (child as any).type === "code"
  ) {
    const codeEl   = child as React.ReactElement<{ className?: string; children?: unknown } & Record<string, unknown>>;
    const rawLang  = String(codeEl.props.className ?? "");
    const language = normalizeLang(rawLang);

    const raw     = codeEl.props.children;
    const rawCode = typeof raw === "string" ? raw : String(raw ?? "");
    const code    = dedent(rawCode);

    const filename =
      (codeEl.props["data-filename"] as string | undefined) ??
      (props["data-filename" as keyof PreProps] as string | undefined);

    return (
      <div className="my-8">
        <CodePanel
          tabs={[
            {
              label: language.toUpperCase(),
              language: language as Language,
              code,
            },
          ]}
          title={language.toUpperCase()}
          filename={filename}
          showLineNumbers
          wrap={false}
        />
      </div>
    );
  }

  return (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/35 p-5 text-[13px] leading-relaxed"
    />
  );
};

export default MdxCodeBlock;

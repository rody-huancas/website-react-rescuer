import type * as React from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href = "", className: classNameProp, ...rest } = props;
  const isExternal = /^https?:\/\//.test(href);
  const className  = "underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-(--rr-accent)";
  const merged     = `${className} ${classNameProp ?? ""}`;

  if (isExternal) {
    return (
      <a
        href={href}
        {...rest}
        target={(rest as { target?: string }).target ?? "_blank"}
        rel={(rest as { rel?: string }).rel ?? "noreferrer"}
        className={merged}
      />
    );
  }

  return (
    <Link
      href={href}
      className={merged}
      {...(rest as unknown as Omit<React.ComponentProps<typeof Link>, "href">)}
    />
  );
};

const components = {
  a: Anchor,
  h1: (props) => (
    <h1
      {...props}
      className="text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mt-12 scroll-mt-28 text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-10 scroll-mt-28 text-xl font-semibold leading-snug"
    />
  ),
  p: (props) => (
    <p {...props} className="mt-4 text-[15px] leading-relaxed text-(--rr-muted) sm:text-base" />
  ),
  ul: (props) => (
    <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-(--rr-muted)" />
  ),
  ol: (props) => (
    <ol {...props} className="mt-4 list-decimal space-y-2 pl-6 text-(--rr-muted)" />
  ),
  li: (props) => <li {...props} className="leading-relaxed" />,
  hr: (props) => <hr {...props} className="my-12 border-white/5" />,
  pre: (props) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/35 p-5 text-[13px] leading-relaxed"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded-md bg-white/5 px-1.5 py-0.5 font-(family-name:--font-geist-mono) text-[0.95em] text-(--rr-fg)"
    />
  ),
} satisfies MDXComponents;

export const useMDXComponents = (): MDXComponents => components;

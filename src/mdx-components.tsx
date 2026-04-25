import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import MdxCodeBlock from "@/components/docs/MdxCodeBlock";

const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href = "", className: classNameProp, ...rest } = props;

  const isExternal = /^https?:\/\//.test(href);
  const className  = "text-(--rr-accent) underline underline-offset-2 hover:opacity-80 transition-opacity";
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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: Anchor,
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-black tracking-tight text-white mb-4 mt-2" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-2xl font-bold text-white mb-4 mt-10 pb-2 border-b border-white/8 scroll-mt-28"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-lg font-semibold text-white/90 mb-4 mt-12 scroll-mt-28" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-white/60 text-[15px] leading-7 mb-4 max-w-[72ch]" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="text-white/60 text-[15px] leading-7 mb-4 ml-4 space-y-1.5 list-disc list-outside"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="text-white/60 text-[15px] leading-7 mb-4 ml-4 space-y-1.5 list-decimal list-outside"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="pl-1" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="text-white font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    pre: (props) => <MdxCodeBlock {...(props as any)} />,
    code: ({ children, className, ...props }) => {
      if (!className) {
        return (
          <code
            className="font-mono text-sm bg-white/8 text-(--rr-accent) px-1.5 py-0.5 rounded-md"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
}

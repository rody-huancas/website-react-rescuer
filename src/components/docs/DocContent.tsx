import Link from "next/link";
import { useMemo } from "react";
import { docsGroups } from "@/lib/docs/content";
import DocEnter from "@/components/docs/DocEnter";
import type { DocsSection } from "@/lib/docs/content";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface Props {
  section : DocsSection;
  prev    : DocsSection | null;
  next    : DocsSection | null;
  children: React.ReactNode;
}

const DocContent = ({ section, prev, next, children }: Props) => {
  const groupTitle = useMemo(() => {
    return docsGroups.find((g) => g.id === section.group)?.title ?? "DOCS";
  }, [section.group]);

  return (
    <DocEnter key={section.slug}>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-white/45">
          <Link href="/docs/introduction" className="hover:text-white/70">
            Documentacion
          </Link>
          <span className="text-white/25">/</span>
          <span className="text-white/55">{groupTitle}</span>
          <span className="text-white/25">/</span>
          <span className="text-white/70">{section.title}</span>
        </div>

        <h1 className="mt-3 text-[clamp(2rem,3.2vw,2.75rem)] font-black leading-[1.06] tracking-[-0.04em]">
          {section.title}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/60 sm:text-base">
          {section.description}
        </p>
      </div>

        <div
          id="rr-doc-content"
          className="rounded-3xl border border-white/6 bg-[#111111]/20 p-6 backdrop-blur-sm sm:p-10"
        >
          {children}

          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/docs/${prev.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/75 transition-colors hover:bg-white/4"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "radial-gradient(700px 180px at 20% 0%, color-mix(in oklab, var(--rr-cyan), transparent 86%), transparent 55%)" }} />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-white/70">
                    <FiArrowLeft />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.18em] text-white/40">ANTERIOR</div>
                    <div className="mt-1 font-semibold text-white/90">{prev.title}</div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {next ? (
              <Link
                href={`/docs/${next.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/75 transition-colors hover:bg-white/4"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "radial-gradient(700px 180px at 80% 0%, color-mix(in oklab, var(--rr-accent), transparent 86%), transparent 55%)" }} />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] tracking-[0.18em] text-white/40">SIGUIENTE</div>
                    <div className="mt-1 font-semibold text-white/90">{next.title}</div>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-white/70">
                    <FiArrowRight />
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
    </DocEnter>
  );
};

export default DocContent;

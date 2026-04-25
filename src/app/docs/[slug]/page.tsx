import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import HocDoc from "@/app/docs/(content)/hoc.mdx";
import HooksDoc from "@/app/docs/(content)/hooks.mdx";
import ResetsDoc from "@/app/docs/(content)/resets.mdx";
import TestingDoc from "@/app/docs/(content)/testing.mdx";
import ImportsDoc from "@/app/docs/(content)/imports.mdx";
import QuickStart from "@/app/docs/(content)/quick-start.mdx";
import DocContent from "@/components/docs/DocContent";
import RecoveryDoc from "@/app/docs/(content)/recovery.mdx";
import KeyConcepts from "@/app/docs/(content)/key-concepts.mdx";
import Introduction from "@/app/docs/(content)/introduction.mdx";
import Installation from "@/app/docs/(content)/installation.mdx";
import DevOverlayDoc from "@/app/docs/(content)/dev-overlay.mdx";
import LimitationsDoc from "@/app/docs/(content)/limitations.mdx";
import RetryManagerDoc from "@/app/docs/(content)/retry-manager.mdx";
import LiveExamplesDoc from "@/app/docs/(content)/live-examples.mdx";
import ObservabilityDoc from "@/app/docs/(content)/observability.mdx";
import ErrorBoundaryDoc from "@/app/docs/(content)/error-boundary.mdx";
import { docsSectionBySlug, docsSections, getPrevNext } from "@/lib/docs/content";

const contentBySlug: Record<string, ComponentType> = {
  introduction    : Introduction,
  installation    : Installation,
  "key-concepts"  : KeyConcepts,
  "quick-start"   : QuickStart,
  "error-boundary": ErrorBoundaryDoc,
  resets          : ResetsDoc,
  recovery        : RecoveryDoc,
  observability   : ObservabilityDoc,
  hooks           : HooksDoc,
  hoc             : HocDoc,
  "retry-manager" : RetryManagerDoc,
  testing         : TestingDoc,
  "dev-overlay"   : DevOverlayDoc,
  imports         : ImportsDoc,
  limitations     : LimitationsDoc,
  "live-examples" : LiveExamplesDoc,
};

export const generateStaticParams = async () => {
  return docsSections.map((s) => ({ slug: s.slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const section = docsSectionBySlug[slug];

  if (!section) return { title: "Docs" };

  return {
    title: `${section.title} — Documentacion — react-rescuer`,
    description: section.description,
  };
};

const DocsSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const section = docsSectionBySlug[slug];

  if (!section) notFound();

  const Page = contentBySlug[slug];
  
  if (!Page) notFound();

  const { prev, next } = getPrevNext(slug);

  return (
    <DocContent section={section} prev={prev} next={next}>
      <Page />
    </DocContent>
  );
};

export default DocsSlugPage;

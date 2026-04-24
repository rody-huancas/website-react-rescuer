import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import DocsSidebar from "@/components/docs/DocsSidebar";

export const metadata: Metadata = {
  title: "Documentación — react-rescuer",
};

const DocsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <div className="relative">
    <Container className="grid gap-10 py-10 lg:grid-cols-[280px_1fr]">
      <DocsSidebar />
      
      <article className="min-w-0">
        <div className="max-w-3xl">
          <div className="rounded-3xl border border-white/5 bg-black/15 p-6 backdrop-blur-sm sm:p-10">
            {children}
          </div>
        </div>
      </article>
    </Container>
  </div>
);

export default DocsLayout;

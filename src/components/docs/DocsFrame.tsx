import Sidebar from "@/components/docs/Sidebar";
import Container from "@/components/ui/Container";

const DocsFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="pt-36">
        <Container className="relative">
          <Sidebar />

          <div className="min-w-0 pr-1 lg:pl-76">
            {children}
            <div className="h-16" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DocsFrame;

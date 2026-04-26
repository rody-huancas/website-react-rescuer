import Sidebar from "@/components/docs/Sidebar";
import Container from "@/components/ui/Container";

const DocsFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="pt-36">
        <Container className="relative">
          <div className="flex w-full min-w-0 flex-col lg:flex-row lg:items-start">
            <Sidebar />

            <div className="min-w-0 w-full pr-1 lg:pl-8">
              {children}
              <div className="h-16" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DocsFrame;

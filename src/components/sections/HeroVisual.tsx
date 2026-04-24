import CodePanel from "@/components/ui/CodePanel";

const HeroVisual = () => {
  return (
    <div
      data-rr-visual
      className="relative mx-auto w-full lg:max-w-[760px] xl:w-[480px]"
    >
      <div className="pointer-events-none absolute -inset-10 rounded-[44px] opacity-55 blur-2xl">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(800px 540px at 30% 20%, color-mix(in oklab, var(--rr-accent), transparent 78%), transparent 58%), radial-gradient(800px 540px at 75% 35%, color-mix(in oklab, var(--rr-cyan), transparent 82%), transparent 60%)",
          }}
        />
      </div>

      <div className="relative">
        <div
          data-rr-grid
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.12]"
          style={{
            backgroundImage: "linear-gradient(to right, color-mix(in oklab, white, transparent 96%) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, white, transparent 96%) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
          }}
        />

        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(900px_560px_at_20%_0%,color-mix(in_oklab,var(--rr-accent),transparent_92%),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(900px_560px_at_80%_20%,color-mix(in_oklab,var(--rr-cyan),transparent_92%),transparent_62%)]" />

        <div className="relative">
          <CodePanel
            tabs={[
              {
                label: "App.tsx",
                language: "tsx",
                code: `import { ErrorBoundary } from "react-rescuer";

export const App = () => (
  <ErrorBoundary fallback={<Fallback />}>
    <Page />
  </ErrorBoundary>
);`,
              },
            ]}
            showLineNumbers={false}
            wrap
          />
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;

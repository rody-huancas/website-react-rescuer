"use client";

import { useMemo, useState } from "react";
import { ErrorBoundary } from "react-rescuer";
import { addBreadcrumb, buildErrorContext } from "react-rescuer/observability";
import CodePanel from "@/components/ui/CodePanel";
import PreviewShell from "@/components/docs/live-example/PreviewShell";
import FallbackCard from "@/components/docs/live-example/FallbackCard";
import PokemonSearch from "@/components/docs/live-example/PokemonSearch";
import { FooterButton, GhostButton, PrimaryButton } from "@/components/docs/live-example/buttons";
import { dedent } from "@/utils/text";
import { liveExampleHelperText } from "@/utils/liveExample";
import type { LiveExampleProps } from "@/types/liveExample";
import { FiCode, FiRefreshCcw } from "react-icons/fi";

const LiveExample = ({ mode, title, description, code }: LiveExampleProps) => {
  const [armed   , setArmed   ] = useState<boolean>(false);
  const [stable  , setStable  ] = useState<boolean>(true);
  const [note    , setNote    ] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const [demoKey , setDemoKey ] = useState<number>(0);
  const [inError , setInError ] = useState<boolean>(false);

  const resetKeys     = useMemo(() => [demoKey, armed, stable], [demoKey, armed, stable]);
  const formattedCode = useMemo(() => dedent(code), [code]);
  const helper        = useMemo(() => liveExampleHelperText(mode), [mode]);

  const Bomb = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) throw new Error("boom");
    return (
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 text-sm text-white/70">
        Todo bien. Usa los botones para simular un error.
      </div>
    );
  };

  const recovery =
    mode === "recovery"
      ? {
          maxRetries: 2,
          retryDelay: (attempt: number) => Math.min(900, 250 * 2 ** (attempt - 1)),
        }
      : undefined;

  return (
    <div className="mt-6">
      <PreviewShell title={title} description={description}>
        <div className="mb-4 rounded-2xl border border-white/6 bg-black/20 px-4 py-3 text-sm text-white/60">
          {helper}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {mode === "async" ? null : (
            <PrimaryButton onClick={() => setArmed(true)} disabled={inError}>
              {inError ? "Error activo" : "Simular error"}
            </PrimaryButton>
          )}

          {mode === "async" ? null : (
            <GhostButton onClick={() => setArmed(false)} disabled={!armed && !inError}>
              Reset
            </GhostButton>
          )}

          {mode === "recovery" ? (
            <>
              <GhostButton onClick={() => setStable(false)} disabled={inError}>Volver inestable</GhostButton>
              <GhostButton onClick={() => setStable(true)} disabled={inError}>Dejar estable</GhostButton>
            </>
          ) : null}

          {mode === "observability" ? (
            <GhostButton
              onClick={() => {
                addBreadcrumb({ type: "custom", message: "pokemon search" });
              }}
              disabled={inError}
            >
              Agregar breadcrumb
            </GhostButton>
          ) : null}
        </div>

        <div className="mt-4">
          <ErrorBoundary
            resetKeys={resetKeys}
            recovery={recovery}
            contextBuilder={mode === "observability" ? buildErrorContext : undefined}
            onError={(_e, _i, ctx) => {
              setInError(true);
              if (mode === "observability") {
                setNote(JSON.stringify({ fingerprint: ctx.fingerprint, breadcrumbs: ctx.breadcrumbs.length }, null, 2));
              }
            }}
            onReset={() => {
              setInError(false);
            }}
            fallbackRender={(props) => (
              <div>
                <FallbackCard {...props} />
                {mode === "observability" && note ? (
                  <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/8 bg-black/35 p-4 text-[12px] leading-relaxed text-white/70">
                    {note}
                  </pre>
                ) : null}
              </div>
            )}
          >
            {mode === "async" ? (
              <PokemonSearch />
            ) : (
              <div>
                {mode === "recovery" ? <Bomb shouldThrow={!stable} /> : <Bomb shouldThrow={armed} />}
              </div>
            )}
          </ErrorBoundary>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <FooterButton
            icon={<FiRefreshCcw size={16} />}
            onClick={() => {
              setArmed(false);
              setStable(true);
              setNote("");
              setInError(false);
              setDemoKey((k) => k + 1);
            }}
          >
            Reiniciar
          </FooterButton>

          <FooterButton
            icon={<FiCode size={16} />}
            pressed={showCode}
            onClick={() => setShowCode((v) => !v)}
          >
            {showCode ? "Ocultar codigo" : "Mostrar codigo"}
          </FooterButton>
        </div>

        {showCode ? (
          <div className="mt-6">
            <CodePanel
              tabs={[{ label: "TSX", language: "tsx" as any, code: formattedCode }]}
              filename="App.tsx"
              showLineNumbers
              wrap={false}
            />
          </div>
        ) : null}
      </PreviewShell>
    </div>
  );
};

export default LiveExample;

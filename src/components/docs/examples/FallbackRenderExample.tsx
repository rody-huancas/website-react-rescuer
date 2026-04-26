"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";
import TabHeader from "./TabHeader";
import CodePanel from "@/components/ui/CodePanel";
import { Bomb } from "./Bomb";
import { GhostButton, PrimaryButton } from "@/components/docs/live-example/buttons";
import { FALLBACK_RENDER_CODE } from "@/constants/examples";

const FallbackRenderExample = () => {
  const [explode , setExplode ] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/2">
        <span className="text-sm font-semibold text-white">Ejemplo 2 · fallbackRender</span>

        <div className="flex gap-1">
          <TabHeader label="Preview" activeTab={!showCode} onTabChange={setShowCode} />
          <TabHeader label="Codigo" activeTab={showCode} onTabChange={setShowCode} />
        </div>
      </div>

      {!showCode ? (
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-400 leading-relaxed">
            `fallbackRender` recibe `error`, `errorContext`, `resetError` y `retryCount`.
          </p>
          
          <div className="flex gap-2">
            <PrimaryButton onClick={() => setExplode(true)}>Lanzar error</PrimaryButton>
            <GhostButton onClick={() => setExplode(false)}>Limpiar causa</GhostButton>
          </div>

          <ErrorBoundary
            resetKeys={[explode]}
            fallbackRender={({ error, errorContext, resetError, retryCount }) => (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg space-y-3">
                <div className="grid gap-1.5">
                  <div className="text-xs text-red-300">error.message: {error.message}</div>
                  <div className="text-xs text-yellow-400">retryCount: {retryCount}</div>
                  <div className="text-xs text-blue-300 break-all">
                    fingerprint: {errorContext.fingerprint}
                  </div>
                </div>

                <button
                  onClick={() => { setExplode(false); resetError(); }}
                  className="px-3 py-1.5 text-xs bg-white/10 rounded hover:bg-white/20 transition-colors"
                >
                  Reintentar (resetError)
                </button>
              </div>
            )}
          >
            <Bomb explode={explode} />
          </ErrorBoundary>
        </div>
      ) : (
        <div className="p-4">
          <CodePanel
            tabs={[{ label: "TSX", language: "tsx" as any, code: FALLBACK_RENDER_CODE }]}
            filename="FallbackRenderExample.tsx"
          />
        </div>
      )}
    </div>
  );
};

export default FallbackRenderExample;
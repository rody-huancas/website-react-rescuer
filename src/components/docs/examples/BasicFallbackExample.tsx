"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";
import TabHeader from "./TabHeader";
import CodePanel from "@/components/ui/CodePanel";
import { Bomb } from "./Bomb";
import { GhostButton, PrimaryButton } from "@/components/docs/live-example/buttons";
import { BASIC_FALLBACK_CODE } from "@/constants/examples";

const BasicFallbackExample = () => {
  const [explode  , setExplode  ] = useState<boolean>(false);
  const [resetSeed, setResetSeed] = useState<number>(0);
  const [showCode , setShowCode ] = useState<boolean>(false);

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/2">
        <span className="text-sm font-semibold text-white">Ejemplo 1 · fallback + resetKeys</span>

        <div className="flex gap-1">
          <TabHeader label="Preview" activeTab={!showCode} onTabChange={setShowCode} />
          <TabHeader label="Codigo" activeTab={showCode} onTabChange={setShowCode} />
        </div>
      </div>

      {!showCode ? (
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-400">
            fallback es un nodo fijo. No recibe error ni funciones; para recuperar, cambia resetKeys.
          </p>

          <div className="flex gap-2">
            <PrimaryButton onClick={() => setExplode(true)}>Lanzar error</PrimaryButton>

            <GhostButton onClick={() => { setExplode(false); setResetSeed((v) => v + 1); }}>
              Resetear
            </GhostButton>
          </div>

          <ErrorBoundary
            resetKeys={[resetSeed]}
            fallback={
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                Fallback estatico activo.
              </div>
            }
          >
            <Bomb explode={explode} />
          </ErrorBoundary>
        </div>
      ) : (
        <div className="p-4">
          <CodePanel
            tabs={[{ label: "TSX", language: "tsx" as any, code: BASIC_FALLBACK_CODE }]}
            filename="BasicFallbackExample.tsx"
          />
        </div>
      )}
    </div>
  );
};

export default BasicFallbackExample;
"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";
import LogLine from "./LogLine";
import TabHeader from "./TabHeader";
import CodePanel from "@/components/ui/CodePanel";
import { GhostButton } from "@/components/docs/live-example/buttons";
import AsyncPokemonSearch, { type IPokemonResult } from "./AsyncPokemonSearch";
import { ASYNC_HANDLER_CODE } from "@/constants/examples";


const AsyncHandlerExample = () => {
  const [key     , setKey     ] = useState<number>(0);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [pokemon , setPokemon ] = useState<IPokemonResult | null>(null);
  const [logs    , setLogs    ] = useState<{ msg: string; type: "info" | "error" | "ok" | "warn" }[]>([
    { msg: "Listo: busca pokemon o activa modo fail", type: "info" },
  ]);

  const addLog = (msg: string, type: "info" | "error" | "ok" | "warn") => setLogs((p) => [...p.slice(-5), { msg, type }]);

  const handleReset = () => {
    addLog("boundary reseteado manualmente", "warn");
    setPokemon(null);
    setKey((k) => k + 1);
  };

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Ejemplo 3
          </span>
          
          <span className="text-sm font-semibold text-white">
            useErrorBoundary · async handlers
          </span>
        </div>

        <div className="flex gap-1">
          <TabHeader label="Preview" activeTab={!showCode} onTabChange={setShowCode} />
          <TabHeader label="Codigo" activeTab={showCode} onTabChange={setShowCode} />
        </div>
      </div>

      {!showCode ? (
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg space-y-1">
              <p className="text-red-400 font-semibold mb-1">Sin showBoundary()</p>

              <p className="text-gray-500">
                Los errores de handlers async no los captura el ErrorBoundary.
              </p>
            </div>

            <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg space-y-1">
              <p className="text-green-400 font-semibold mb-1">Con useErrorBoundary()</p>
              <p className="text-gray-500">
                showBoundary(error) eleva el error al boundary mas cercano.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GhostButton onClick={handleReset}>Reiniciar boundary</GhostButton>
          </div>

          <ErrorBoundary
            key={key}
            onError={(error) => addLog(`showBoundary -> ${error.message}`, "error")}
            fallbackRender={({ error, resetError, retryCount }) => (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg space-y-3">
                <p className="text-red-400 font-semibold text-sm">
                  Error elevado por showBoundary()
                </p>

                <div className="grid gap-1.5 text-xs">
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-24 shrink-0">error.message</span>
                    <span className="text-red-300 font-mono">{error.message}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-gray-500 w-24 shrink-0">retryCount</span>
                    <span className="text-yellow-400 font-mono">{retryCount}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-gray-500 w-24 shrink-0">origen</span>
                    <span className="text-purple-400 font-mono">onClick async + fetch</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    resetError();
                    handleReset();
                  }}
                  className="px-3 py-1.5 text-xs bg-white/10 rounded hover:bg-white/20 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            )}
          >
            <div className="space-y-4">
              <AsyncPokemonSearch
                onAttempt={(target) => addLog(`fetch /pokemon/${target}`, "info")}
                onSuccess={(nextPokemon) => {
                  setPokemon(nextPokemon);
                  addLog(`OK: ${nextPokemon.name} (#${nextPokemon.id})`, "ok");
                }}
              />
              {pokemon ? (
                <div className="rounded-lg border border-white/10 bg-black/35 p-4">
                  <div className="flex items-center gap-3">
                    {pokemon.sprites?.front_default ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="h-14 w-14"
                      />
                    ) : null}
                    <div>
                      <p className="text-white font-semibold capitalize">{pokemon.name}</p>
                      <p className="text-xs text-white/60">#{pokemon.id}</p>

                      <div className="mt-1 flex gap-1">
                        {(pokemon.types ?? []).map((item) => (
                          <span
                            key={item.type?.name}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70 capitalize"
                          >
                            {item.type?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </ErrorBoundary>

          <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-1">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">Log</p>

            {logs.map((l, i) => (
              <LogLine key={i} type={l.type}>
                {l.msg}
              </LogLine>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <CodePanel
            tabs={[{ label: "TSX", language: "tsx" as any, code: ASYNC_HANDLER_CODE }]}
            filename="AsyncHandlerExample.tsx"
          />
        </div>
      )}
    </div>
  );
};

export default AsyncHandlerExample;
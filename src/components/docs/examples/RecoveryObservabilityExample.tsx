"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";
import { addBreadcrumb, buildErrorContext } from "react-rescuer/observability";
import LogLine from "./LogLine";
import TabHeader from "./TabHeader";
import CodePanel from "@/components/ui/CodePanel";
import ContextPanel from "./ContextPanel";
import { BombWithMessage } from "./BombWithMessage";
import { GhostButton, PrimaryButton } from "@/components/docs/live-example/buttons";
import { RECOVERY_OBSERVABILITY_CODE } from "@/constants/examples";

const RecoveryObservabilityExample = () => {
  const [fail    , setFail    ] = useState<boolean>(false);
  const [ctx     , setCtx     ] = useState<unknown>(null);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [logs    , setLogs    ] = useState<{ msg: string; type: "info" | "error" | "ok" | "warn" }[]>([
    { msg: "Listo", type: "ok" },
  ]);

  const addLog = (msg: string, type: "info" | "error" | "ok" | "warn") => setLogs((p) => [...p.slice(-5), { msg, type }]);

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0d0d0d]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Ejemplo 4
          </span>

          <span className="text-sm font-semibold text-white">
            recovery + observability
          </span>
        </div>

        <div className="flex gap-1">
          <TabHeader label="Preview" activeTab={!showCode} onTabChange={setShowCode} />
          <TabHeader label="Codigo" activeTab={showCode} onTabChange={setShowCode} />
        </div>
      </div>

      {!showCode ? (
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-400 leading-relaxed">
            <code className="text-yellow-400 text-xs bg-yellow-400/10 px-1 rounded">
              recovery
            </code>{" "}
            reintenta automáticamente con backoff exponencial.{" "}
            <code className="text-purple-400 text-xs bg-purple-400/10 px-1 rounded">
              contextBuilder
            </code>{" "}
            +{" "}
            <code className="text-blue-400 text-xs bg-blue-400/10 px-1 rounded">
              onError
            </code>{" "}
            dan acceso al contexto completo: fingerprint, breadcrumbs, sessionId.
          </p>

          <div className="p-3 bg-white/2 border border-white/5 rounded-lg text-xs font-mono text-gray-500 space-y-1">
            <p className="text-gray-400 font-semibold mb-1">recovery config</p>
            <p>
              <span className="text-yellow-400">maxRetries</span>: 3
            </p>
            <p>
              <span className="text-yellow-400">retryDelay</span>: (n) =&gt; Math.min(1000, 200 * 2 ** (n - 1))
            </p>
            <p className="text-gray-600 mt-1">→ intentos: 200ms · 400ms · 800ms</p>
          </div>

          <div className="flex gap-2">
            <PrimaryButton
              onClick={() => {
                addBreadcrumb({ type: "click", message: "Usuario activo fallo" });
                addBreadcrumb({ type: "custom", message: "Prepara un fallo de render" });
                setFail(true);
                addLog("Fallo activado", "warn");
              }}
            >
              Simular fallo
            </PrimaryButton>

            <GhostButton
              onClick={() => {
                setFail(false);
                setCtx(null);
                addLog("Estado limpio", "ok");
              }}
            >
              Limpiar causa
            </GhostButton>
          </div>

          <ErrorBoundary
            resetKeys={[fail]}
            recovery={{
              maxRetries: 3,
              retryDelay: (n) => Math.min(1000, 200 * 2 ** (n - 1)),
              onMaxRetriesReached: () => { addLog("Max retries alcanzado (3/3)", "error") },
            }}
            contextBuilder={buildErrorContext}
            onError={(_err, _info, context) => {
              addLog(`onError() disparado · retryCount podría seguir subiendo`, "warn");
              setCtx({
                fingerprint: context.fingerprint,
                sessionId  : context.sessionId,
                errorCount : context.errorCount,
                timestamp  : context.timestamp,
                breadcrumbs: context.breadcrumbs,
              });
            }}
            fallbackRender={({ error, errorContext, resetError, retryCount }) => (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg space-y-3">
                <p className="text-red-400 font-semibold text-sm">
                  Error capturado ({retryCount}/3)
                </p>

                <div className="grid gap-1.5 text-xs">
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-32 shrink-0">error.message</span>
                    <span className="text-red-300 font-mono">{error.message}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-gray-500 w-32 shrink-0">retryCount</span>
                    <span className="text-yellow-400 font-mono">{retryCount}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-gray-500 w-32 shrink-0">breadcrumbs</span>
                    <span className="text-purple-400 font-mono">
                      {errorContext.breadcrumbs.length} capturados
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-gray-500 w-32 shrink-0">fingerprint</span>
                    <span className="text-blue-400 font-mono text-[10px] break-all">
                      {errorContext.fingerprint}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addLog(`retry manual solicitado (${retryCount + 1}/3)`, "warn");
                    resetError();
                  }}
                  disabled={retryCount >= 3}
                  className="px-3 py-1.5 text-xs bg-white/10 rounded hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Reintentar sin arreglar ({retryCount}/3)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFail(false);
                    resetError();
                    addLog("Error corregido + reset", "ok");
                  }}
                  className="px-3 py-1.5 text-xs bg-white/10 rounded hover:bg-white/20 transition-colors ml-3"
                >
                  Arreglar y resetear
                </button>
              </div>
            )}
          >
            <BombWithMessage fail={fail} message="Fallo para probar recovery" />
          </ErrorBoundary>

          <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-1">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">
              Log
            </p>

            {logs.map((l, i) => (
              <LogLine key={i} type={l.type}>
                {l.msg}
              </LogLine>
            ))}
          </div>

          <ContextPanel ctx={ctx} />
        </div>
      ) : (
        <div className="p-4">
          <CodePanel
            tabs={[
              {
                label   : "TSX",
                language: "tsx" as any,
                code    : RECOVERY_OBSERVABILITY_CODE,
              },
            ]}
            filename="RecoveryObservabilityExample.tsx"
          />
        </div>
      )}
    </div>
  );
};

export default RecoveryObservabilityExample;

"use client";

const ContextPanel = ({ ctx }: { ctx: unknown }) => {
  if (!ctx) return null;

  const context = ctx as {
    fingerprint: string;
    sessionId  : string;
    errorCount : number;
    timestamp  : number;
    breadcrumbs: Array<{ type: string; message: string }>;
  };

  return (
    <div className="p-4 bg-white/3 border border-white/10 rounded-lg space-y-3">
      <p className="text-xs text-gray-500 uppercase tracking-widest">
        errorContext capturado por onError()
      </p>
      
      <div className="grid gap-2 text-xs font-mono">
        <div className="flex gap-2">
          <span className="text-gray-500 w-28 shrink-0">fingerprint</span>
          <span className="text-purple-400 break-all">{context.fingerprint}</span>
        </div>

        <div className="flex gap-2">
          <span className="text-gray-500 w-28 shrink-0">sessionId</span>
          <span className="text-blue-400">{String(context.sessionId).slice(0, 20)}…</span>
        </div>

        <div className="flex gap-2">
          <span className="text-gray-500 w-28 shrink-0">errorCount</span>
          <span className="text-yellow-400">{context.errorCount}</span>
        </div>

        <div className="flex gap-2">
          <span className="text-gray-500 w-28 shrink-0">timestamp</span>
          <span className="text-gray-400">
            {new Date(context.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {context.breadcrumbs?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">
            breadcrumbs ({context.breadcrumbs.length})
          </p>

          <div className="space-y-1">
            {context.breadcrumbs.map((b, i) => (
              <div key={i} className="flex gap-2 text-xs">
                <span className="shrink-0 text-blue-400">[{b.type}]</span>
                <span className="text-gray-400">{b.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextPanel;

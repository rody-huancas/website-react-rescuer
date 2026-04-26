export const BASIC_FALLBACK_CODE = `import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";

function Bomb({ explode }: { explode: boolean }) {
  if (explode) throw new Error("Exploto durante render");
  return <div>Render correcto</div>;
}

export default function Demo() {
  const [explode, setExplode] = useState(false);
  const [resetSeed, setResetSeed] = useState(0);

  return (
    <ErrorBoundary
      resetKeys={[resetSeed]}
      fallback={<div>Fallback estatico: algo salio mal.</div>}
    >
      <Bomb explode={explode} />
      <button onClick={() => setExplode(true)}>Lanzar error</button>
      <button onClick={() => { setExplode(false); setResetSeed((v) => v + 1); }}>
        Reset
      </button>
    </ErrorBoundary>
  );
}`;

export const FALLBACK_RENDER_CODE = `"use client";
import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";

function Bomb({ explode }: { explode: boolean }) {
  if (explode) throw new Error("Fallo de render para fallbackRender");
  return <div>Render correcto</div>;
}

export default function App() {
  const [explode, setExplode] = useState(false);

  return (
    <ErrorBoundary
      resetKeys={[explode]}
      fallbackRender={({ error, resetError, retryCount }) => (
        <div>
          <p>{error.message}</p>
          <p>retryCount: {retryCount}</p>
          <button onClick={() => { setExplode(false); resetError(); }}>Reintentar</button>
        </div>
      )}
    >
      <Bomb explode={explode} />
      <button onClick={() => setExplode(true)}>Lanzar error</button>
    </ErrorBoundary>
  );
}`;

export const ASYNC_HANDLER_CODE = `"use client";
import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";
import { useErrorBoundary } from "react-rescuer/hooks";

function AsyncPokemonSearch() {
  const { showBoundary } = useErrorBoundary();
  const [name, setName] = useState("pikachu");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null);
  const [failMode, setFailMode] = useState(false);

  const handleSearch = async () => {
    const target = failMode ? "fakemon-999" : name.trim().toLowerCase();
    if (!target) return;
    try {
      setLoading(true);
      setPokemon(null);
      const res = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${encodeURIComponent(target)}\`);
      if (!res.ok) throw new Error(\`Pokemon "\${target}" no existe (HTTP \${res.status})\`);
      const data = await res.json();
      setPokemon(data);
    } catch (e) {
      showBoundary(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setFailMode((v) => !v)}>
        {failMode ? "Modo fail" : "Modo normal"}
      </button>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {pokemon ? <div>{pokemon.name}</div> : null}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary
      onError={(error) => console.error("Boundary caught:", error.message)}
      fallbackRender={({ error, resetError, retryCount }) => (
        <div>
          <p>Error capturado via showBoundary</p>
          <p>{error.message}</p>
          <p>retryCount: {retryCount}</p>
          <button onClick={resetError}>
            Reintentar
          </button>
        </div>
      )}
    >
      <AsyncPokemonSearch />
    </ErrorBoundary>
  );
}`;

export const RECOVERY_OBSERVABILITY_CODE = `"use client";
import { useState } from "react";
import { ErrorBoundary } from "react-rescuer";
import { addBreadcrumb, buildErrorContext } from "react-rescuer/observability";

function Bomb({ fail }: { fail: boolean }) {
  if (fail) throw new Error("Fallo para probar recovery");
  return <div>Render correcto</div>;
}

export default function App() {
  const [fail, setFail] = useState(false);

  return (
    <ErrorBoundary
      recovery={{
        maxRetries: 3,
        retryDelay: (attempt) => Math.min(1000, 200 * 2 ** (attempt - 1)),
      }}
      contextBuilder={buildErrorContext}
      fallbackRender={({ error, errorContext, resetError, retryCount }) => (
        <div>
          <p>Error: {error.message}</p>
          <p>retryCount: {retryCount}/3</p>
          <p>Breadcrumbs: {errorContext.breadcrumbs.length}</p>
          <button
            onClick={resetError}
            disabled={retryCount >= 3}
          >
            Reintentar sin arreglar ({retryCount}/3)
          </button>
          <button onClick={() => { setFail(false); resetError(); }}>
            Arreglar y resetear
          </button>
        </div>
      )}
    >
      <Bomb fail={fail} />
      <button onClick={() => { addBreadcrumb({ type: "click", message: "Usuario activo fallo" }); setFail(true); }}>
        Simular fallo
      </button>
    </ErrorBoundary>
  );
}`;
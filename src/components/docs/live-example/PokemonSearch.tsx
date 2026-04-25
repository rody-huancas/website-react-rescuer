"use client";

import { useState } from "react";
import { useErrorBoundary } from "react-rescuer/hooks";
import { GhostButton, PrimaryButton } from "@/components/docs/live-example/buttons";

type Pokemon = { name: string; sprite?: string; types: string[] };

const PokemonSearch = () => {
  const { showBoundary } = useErrorBoundary();

  const [name   , setName   ] = useState<string>("pikachu");
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[min(260px,100%)] rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/85 outline-none placeholder:text-white/30 focus:border-(--rr-accent)/60"
          placeholder="pikachu"
          aria-label="Nombre de pokemon"
        />

        <PrimaryButton
          onClick={async () => {
            setLoading(true);
            setPokemon(null);

            try {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.trim().toLowerCase())}`);
              if (!res.ok) throw new Error("Pokemon no encontrado");
              const data = (await res.json()) as any;

              setPokemon({
                name: data.name,
                sprite: data?.sprites?.front_default ?? undefined,
                types: Array.isArray(data?.types) ? data.types.map((t: any) => t?.type?.name).filter(Boolean) : [],
              });
            } catch (e) {
              showBoundary(e as Error);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Cargando..." : "Buscar"}
        </PrimaryButton>

        <GhostButton
          onClick={() => {
            setName("pikachu");
            setPokemon(null);
          }}
        >
          Reiniciar
        </GhostButton>
      </div>

      {pokemon ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/8 bg-black/25">
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
              {pokemon.sprite ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pokemon.sprite} alt={pokemon.name} className="h-14 w-14 pixelated" />
              ) : (
                <div className="text-white/40 text-xs">no image</div>
              )}
            </div>

            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{pokemon.name}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {pokemon.types.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[12px] text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PokemonSearch;

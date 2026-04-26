"use client";

import { useState } from "react";
import { useErrorBoundary } from "react-rescuer/hooks";
import { cn } from "@/utils/cn";
import { PrimaryButton } from "@/components/docs/live-example/buttons";
import { IoCheckmark } from "react-icons/io5";

export type IPokemonResult = {
  id      : number;
  name    : string;
  sprites?: { front_default?: string | null };
  types  ?: Array<{ type?: { name?: string } }>;
};

interface Props {
  onAttempt: (target: string) => void;
  onSuccess: (pokemon: IPokemonResult) => void;
}

const AsyncPokemonSearch = ({ onAttempt, onSuccess }: Props) => {
  const { showBoundary } = useErrorBoundary();

  const [name    , setName    ] = useState<string>("pikachu");
  const [loading , setLoading ] = useState<boolean>(false);
  const [failMode, setFailMode] = useState<boolean>(true);

  const handleSearch = async () => {
    const target = failMode ? "fakemon-999" : name.trim().toLowerCase();
    if (!target) return;

    setLoading(true);
    onAttempt(target);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(target)}`);

      if (!res.ok) {
        throw new Error(`Pokemon "${target}" no existe (HTTP ${res.status})`);
      }

      const data = (await res.json()) as IPokemonResult;
      onSuccess(data);
    } catch (e) {
      showBoundary(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400">
        <IoCheckmark />
        <span>Los errores async se elevan con `showBoundary(error)`.</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[min(260px,100%)] rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/85 outline-none placeholder:text-white/30"
          placeholder="pikachu"
          aria-label="Nombre del pokemon"
        />

        <button
          type="button"
          onClick={() => setFailMode((v) => !v)}
          className={cn("px-3 py-1 text-xs rounded border transition-colors",
          failMode ? "border-red-500/50 bg-red-500/10 text-red-400" : "border-green-500/50 bg-green-500/10 text-green-400")}
        >
          {failMode ? "modo fail" : "modo normal"}
        </button>

        <PrimaryButton onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar en PokeAPI"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AsyncPokemonSearch;

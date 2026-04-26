"use client";

export const Bomb = ({ explode }: { explode: boolean }) => {
  if (explode) throw new Error("Exploto durante render");
  
  return (
    <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
      Render correcto.
    </div>
  );
};

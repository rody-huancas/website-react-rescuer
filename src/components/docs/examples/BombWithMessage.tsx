"use client";

interface Props {
  fail    : boolean;
  message?: string;
}

export const BombWithMessage = ({ fail, message }: Props) => {
  if (fail) throw new Error(message || "Fallo para probar recovery");

  return (
    <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
      Render correcto.
    </div>
  );
};

export const typeColor = (t: string) => {
  const s = t.toLowerCase();

  if (s.includes("string"))  return "bg-blue-950 text-blue-300 border border-blue-800";
  if (s.includes("boolean")) return "bg-green-950 text-green-300 border border-green-800";
  if (s.includes("number"))  return "bg-purple-950 text-purple-300 border border-purple-800";
  if (s.includes("reactnode") || s.includes("jsx") || s.includes("react.")) return "bg-pink-950 text-pink-300 border border-pink-800";
  if (s.includes("=>") || s.includes("callback") || s.includes("function")) return "bg-orange-950 text-orange-300 border border-orange-800";

  return "bg-zinc-800 text-zinc-300 border border-zinc-700";
};

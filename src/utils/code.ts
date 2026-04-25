import { dedent, trimEmptyEdges } from "@/utils/text";

export const normalizeCode = (raw: string) => {
  let next = raw ?? "";

  if (!next.includes("\n") && next.includes("\\n")) next = next.replace(/\\n/g, "\n");
  if (next.includes("\\t")) next = next.replace(/\\t/g, "\t");

  next = trimEmptyEdges(next);
  return dedent(next);
};

export const normalizeLang = (input?: string) => {
  const raw = (input ?? "").replace(/^language-/, "").trim().toLowerCase();

  if (!raw) return "tsx";
  if (raw === "sh")    return "bash";
  if (raw === "shell") return "bash";
  if (raw === "md")    return "markdown";

  return raw;
};

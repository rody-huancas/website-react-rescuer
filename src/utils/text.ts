export const trimEmptyEdges = (input: string) => {
  const lines = (input ?? "").replace(/\r\n/g, "\n").split("\n");
  
  while (lines.length && lines[0]?.trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1]?.trim() === "") lines.pop();

  return lines.join("\n");
};

export const dedent = (input: string): string => {

  const normalized = (input ?? "").replace(/\r\n/g, "\n").replace(/\n$/, "");
  const lines      = normalized.split("\n");
  const nonEmpty   = lines.filter((l) => l.trim().length > 0);

  if (!nonEmpty.length) return normalized.trim();

  const minIndent = Math.min(...nonEmpty.map((l) => l.match(/^(\s*)/)?.[1].length ?? 0));

  return lines.map((l) => l.slice(minIndent)).join("\n").trimEnd();
};

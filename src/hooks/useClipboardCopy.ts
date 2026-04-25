"use client";

import { useCallback, useState } from "react";

type Options = {
  timeoutMs?: number;
};

const useClipboardCopy = (options: Options = {}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const timeoutMs = options.timeoutMs ?? 2000;

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), timeoutMs);
      } catch {
        setCopied(false);
      }
    },
    [timeoutMs],
  );

  return { copied, copy };
};

export default useClipboardCopy;

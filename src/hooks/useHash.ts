"use client";

import { useEffect, useState } from "react";

const useHash = () => {
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const read = () => setHash(window.location.hash || "");
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return hash;
};

export default useHash;

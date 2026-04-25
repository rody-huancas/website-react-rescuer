"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import getGsap from "@/lib/gsap/client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type Options = {
  y       ?: number;
  duration?: number;
  ease    ?: string;
};

const useGsapEnter = (options: Options = {}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const el = ref.current;
      if (!el) return;

      const { gsap } = getGsap();
      gsap.fromTo(
        el,
        { opacity: 0, y: options.y ?? 10 },
        {
          opacity   : 1,
          y         : 0,
          duration  : options.duration ?? 0.5,
          ease      : options.ease ?? "power2.out",
          clearProps: "transform",
        },
      );
    },
    { dependencies: [prefersReducedMotion] },
  );

  return ref;
};

export default useGsapEnter;

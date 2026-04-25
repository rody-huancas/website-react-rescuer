"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import getGsap from "@/lib/gsap/client";

interface Props {
  rootRef             : RefObject<HTMLElement | null>;
  prefersReducedMotion: boolean;
}

const useHeaderAnimations = ({ rootRef, prefersReducedMotion }: Props) => {
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const root = rootRef.current;
      if (!root) return;

      const { gsap } = getGsap();

      const logo     = root.querySelector<HTMLElement>("[data-rr-logo]");
      const navItems = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-rr-nav-item]"));
      const badge    = root.querySelector<HTMLElement>("[data-rr-badge]");

      document.documentElement.classList.remove("rr-preload");

      gsap.set(root, { autoAlpha: 0, y: -28 });
      gsap.set([logo, ...navItems, badge].filter(Boolean), {
        autoAlpha: 0,
        y        : -8,
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(root, { autoAlpha: 1, y: 8, duration: 0.85, ease: "power2.out" })
        .to(root, {
          y         : 0,
          duration  : 0.6,
          ease      : "back.out(1.35)",
          clearProps: "transform,opacity,visibility",
        })
        .to(
          logo,
          {
            autoAlpha : 1,
            y         : 0,
            duration  : 0.6,
            clearProps: "transform,opacity,visibility",
          },
          "<+0.02",
        )
        .to(
          navItems,
          {
            autoAlpha : 1,
            y         : 0,
            duration  : 0.6,
            stagger   : 0.035,
            clearProps: "transform,opacity,visibility",
          },
          "<+0.05",
        )
        .to(
          badge,
          {
            autoAlpha : 1,
            y         : 0,
            duration  : 0.6,
            clearProps: "transform,opacity,visibility",
          },
          "<+0.05",
        );
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );
};

export default useHeaderAnimations;

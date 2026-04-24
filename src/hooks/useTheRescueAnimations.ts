"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import getGsap from "@/lib/gsap/client";

interface Props {
  sectionRef          : RefObject<HTMLElement | null>;
  prefersReducedMotion: boolean;
}

const useTheRescueAnimations = ({ sectionRef, prefersReducedMotion }: Props) => {
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const section = sectionRef.current;
      if (!section) return;

      const { gsap } = getGsap();

      const fixed = section.querySelector<HTMLElement>("[data-rr-fixed]");
      const crack = section.querySelector<HTMLElement>("[data-rr-crack]");
      const sweep = section.querySelector<HTMLElement>("[data-rr-sweep]");

      if (!fixed || !crack || !sweep) return;

      gsap.set(fixed, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start  : "top 70%",
          once   : true,
        },
      });

      tl.to(crack, { opacity: 0, duration: 0.25, ease: "power1.out" })
        .to(
          fixed,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.05,
            ease    : "power2.inOut",
          },
          "<",
        )
        .fromTo(
          sweep,
          { xPercent: -130, opacity: 0 },
          { xPercent: 130, opacity: 1, duration: 0.85, ease: "power2.out" },
          "<+0.05",
        )
        .from(
          section.querySelectorAll("[data-rr-fade]"),
          {
            y       : 14,
            opacity : 0,
            duration: 0.6,
            ease    : "power2.out",
            stagger : 0.08,
          },
          "<+0.15",
        );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );
};

export default useTheRescueAnimations;

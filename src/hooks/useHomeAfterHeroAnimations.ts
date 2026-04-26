"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import getGsap from "@/lib/gsap/client";

interface Props {
  rootRef: RefObject<HTMLElement | null>;
  prefersReducedMotion: boolean;
}

const useHomeAfterHeroAnimations = ({ rootRef, prefersReducedMotion }: Props) => {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const { gsap } = getGsap();

      const lettersA = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-letter-a]"));
      const lettersB = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-letter-b]"));
      const dash     = root.querySelector<HTMLElement>("[data-dash]");
      const below    = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]"));
      const blobs    = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-blob]"));
      const feats    = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-feat]"));

      gsap.set(root, { visibility: "visible" });

      if (prefersReducedMotion) {
        gsap.set([...lettersA, ...lettersB, dash, ...below, ...feats, ...blobs], { clearProps: "all" });
        return;
      }

      gsap.set(lettersA, { y: -90, opacity: 0, rotateX: -60, filter: "blur(6px)", transformOrigin: "50% 0%"   });
      gsap.set(lettersB, { y: 90 , opacity: 0, rotateX: 60 , filter: "blur(6px)", transformOrigin: "50% 100%" });
      gsap.set(dash    , { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(below   , { y: 28, opacity: 0 });
      gsap.set(feats   , { y: 32, opacity: 0 });
      gsap.set(blobs   , { scale: 0.6, opacity: 0 });

      const tl = gsap.timeline({
        defaults     : { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start  : "top 78%",
          once   : true,
        },
      });

      tl.to(blobs, { scale: 1, opacity: 1, duration: 1.6, ease: "sine.out", stagger: 0.15 }, 0)
        .to(
          lettersA,
          {
            y       : 0,
            opacity : 1,
            rotateX : 0,
            filter  : "blur(0px)",
            duration: 0.72,
            stagger : { each: 0.055 },
          },
          0.1,
        )
        .to(
          lettersB,
          {
            y       : 0,
            opacity : 1,
            rotateX : 0,
            filter  : "blur(0px)",
            duration: 0.72,
            stagger : { each: 0.055 },
          },
          0.18,
        )
        .to(dash , { scaleX: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" }, 0.55)
        .to(below, { y: 0, opacity: 1, duration: 0.6 , stagger: 0.1  }, 0.68)
        .to(feats, { y: 0, opacity: 1, duration: 0.52, stagger: 0.12 }, 0.9 );

      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          opacity : i === 0 ? 0.2: 0.12,
          duration: 2.5 + i * 0.4,
          ease    : "sine.inOut",
          repeat  : -1,
          yoyo    : true,
          delay   : 1.8 + i * 0.3,
        });
      });
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );
};

export default useHomeAfterHeroAnimations;

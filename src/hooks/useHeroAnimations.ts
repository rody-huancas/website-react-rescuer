"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import getGsap from "@/lib/gsap/client";

interface Props {
  rootRef             : RefObject<HTMLElement | null>;
  prefersReducedMotion: boolean;
}

const useHeroAnimations = ({ rootRef, prefersReducedMotion }: Props) => {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const { gsap } = getGsap();

      const words       = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-rr-stagger-word]"));
      const fades       = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-rr-fade]"));
      const codeCard    = root.querySelector<HTMLElement>("[data-rr-code-card]");
      const installCard = root.querySelector<HTMLElement>("[data-rr-install-card]");

      if (!prefersReducedMotion) {
        document.documentElement.classList.remove("rr-preload");

        gsap.set([...words, ...fades], { opacity: 0 });
        gsap.set(words, { y: 30 });
        gsap.set(fades, { y: 14 });

        if (codeCard) {
          gsap.set(codeCard, { autoAlpha: 0, x: 150 });
        }

        if (installCard) {
          gsap.set(installCard, { autoAlpha: 0, y: 95 });
        }

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(words, {
          y         : 0,
          opacity   : 1,
          duration  : 0.75,
          stagger   : 0.1,
          delay     : 0.06,
          clearProps: "transform",
        }).to(
          fades,
          {
            y         : 0,
            opacity   : 1,
            duration  : 0.6,
            stagger   : 0.08,
            clearProps: "transform",
          },
          "<+0.15",
        );

        if (codeCard) {
          tl.to(
            codeCard,
            {
              autoAlpha : 1,
              x         : 0,
              duration  : 1.25,
              ease      : "power3.out",
              clearProps: "transform,opacity,visibility",
            },
            "<+0.05",
          );
        }

        if (installCard) {
          tl.to(
            installCard,
            {
              autoAlpha : 1,
              y         : 0,
              duration  : 1.2,
              ease      : "power3.out",
              clearProps: "transform,opacity,visibility",
            },
            "<+0.12",
          );
        }
      }

      const rig       = root.querySelector<HTMLElement>("[data-rr-rig]");
      const visual    = root.querySelector<HTMLElement>("[data-rr-visual]");
      const halo      = root.querySelector<HTMLElement>("[data-rr-halo]");
      const cta       = root.querySelector<HTMLElement>("[data-rr-cta]");
      const btns      = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-rr-btn]"));
      const spotlight = root.querySelector<HTMLElement>("[data-rr-spotlight]");

      if (!rig) return;

      if (!prefersReducedMotion && visual) {
        gsap.to(visual, {
          y       : "+=15",
          duration: 3.2,
          repeat  : -1,
          yoyo    : true,
          ease    : "sine.inOut",
        });
      }

      if (!prefersReducedMotion && cta) {
        gsap.to(cta, {
          boxShadow: "0 0 0 1px color-mix(in oklab, var(--rr-accent), transparent 65%), 0 16px 60px color-mix(in oklab, var(--rr-accent), transparent 82%)",
          duration : 2.6,
          repeat   : -1,
          yoyo     : true,
          ease     : "sine.inOut",
        });
      }

      let cleanupBtns: null | (() => void) = null;
      if (!prefersReducedMotion && btns.length) {
        const cleanups: Array<() => void> = [];

        for (const b of btns) {
          const s = gsap.quickTo(b, "scale", { duration: 0.22, ease: "power2.out" });
          const y = gsap.quickTo(b, "y", { duration: 0.22, ease: "power2.out" });

          const sheen   = b.querySelector<HTMLElement>("[data-rr-sheen]");
          const content = b.querySelector<HTMLElement>("[data-rr-btn-content]");

          if (sheen) {
            gsap.set(sheen, { opacity: 0, xPercent: -140 });
          }

          const xC = content ? gsap.quickTo(content, "x", { duration: 0.25, ease: "power2.out" }) : null;
          const yC = content ? gsap.quickTo(content, "y", { duration: 0.25, ease: "power2.out" }) : null;

          const onEnter = () => {
            s(1.02);
            y(-1);

            if (sheen) {
              gsap.fromTo(
                sheen,
                { opacity: 0, xPercent: -140 },
                {
                  opacity : 1,
                  xPercent: 140,
                  duration: 0.55,
                  ease    : "power2.out",
                },
              );
            }
          };
          const onLeave = () => {
            s(1);
            y(0);

            xC?.(0);
            yC?.(0);
          };

          const onMove = (e: MouseEvent) => {
            if (!content) return;

            const r     = b.getBoundingClientRect();
            const nx    = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const ny    = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            const clamp = gsap.utils.clamp(-1, 1);

            xC?.(clamp(nx) * 3);
            yC?.(clamp(ny) * 2);
          };

          b.addEventListener("mouseenter", onEnter);
          b.addEventListener("mouseleave", onLeave);
          b.addEventListener("mousemove", onMove);
          cleanups.push(() => {
            b.removeEventListener("mouseenter", onEnter);
            b.removeEventListener("mouseleave", onLeave);
            b.removeEventListener("mousemove", onMove);
          });
        }

        cleanupBtns = () => {
          for (const c of cleanups) c();
        };
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          finePointer: "(pointer: fine)",
          wide: "(min-width: 900px)",
        },
        () => {
          if (prefersReducedMotion) return;

          const xHalo = halo ? gsap.quickTo(halo, "x", { duration: 1.25, ease: "power3.out" }) : null;
          const yHalo = halo ? gsap.quickTo(halo, "y", { duration: 1.25, ease: "power3.out" }) : null;

          const xSpot = spotlight ? gsap.quickTo(spotlight, "x", { duration: 1.25, ease: "power3.out" }) : null;
          const ySpot = spotlight ? gsap.quickTo(spotlight, "y", { duration: 1.25, ease: "power3.out" }) : null;

          const onMove = (e: PointerEvent) => {
            const r     = rig.getBoundingClientRect();
            const nx    = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const ny    = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            const clamp = gsap.utils.clamp(-1, 1);
            const cx    = clamp(nx);
            const cy    = clamp(ny);

            xHalo?.(cx * 10);
            yHalo?.(cy * 8);
            xSpot?.(cx * 18);
            ySpot?.(cy * 14);
          };

          window.addEventListener("pointermove", onMove, { passive: true });

          if (halo) {
            gsap.to(halo, {
              y            : "+=46",
              ease         : "none",
              scrollTrigger: {
                trigger: root,
                start  : "top top",
                end    : "bottom top",
                scrub  : 0.8,
              },
            });
          }

          return () => window.removeEventListener("pointermove", onMove);
        },
      );

      return () => {
        cleanupBtns?.();
        mm.revert();
      };
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );
};

export default useHeroAnimations;

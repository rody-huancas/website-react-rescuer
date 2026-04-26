"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import HeroVisual from "@/components/sections/HeroVisual";
import StaggerWords from "@/components/ui/StaggerWords";
import InstallCommands from "@/components/sections/InstallCommands";
import useHeroAnimations from "@/hooks/useHeroAnimations";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { FiArrowRight, FiBookOpen, FiGithub } from "react-icons/fi";
import Link from "next/link";

const Hero = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useHeroAnimations({ rootRef, prefersReducedMotion });

  return (
    <section ref={rootRef} data-rr-hero className="relative lg:h-dvh overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div
          data-rr-spotlight
          className="absolute left-1/2 top-[40%] h-225 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-3xl"
          style={{
            background: "radial-gradient(circle at 30% 35%, color-mix(in oklab, var(--rr-accent), transparent 88%), transparent 60%)",
          }}
        />
        <div
          className="absolute left-[18%] top-[65%] h-190 w-190 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle at 55% 45%, color-mix(in oklab, var(--rr-cyan), transparent 90%), transparent 62%)",
          }}
        />
      </div>

      <Container className="relative h-full pt-24 pb-6">
        <div className="grid h-full min-h-0 grid-rows-[1fr_auto] gap-6">
          <div className="flex min-h-0 items-center">
            <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col">
                <div
                  data-rr-fade
                  className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-(--rr-muted)"
                >
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-(--rr-accent) rr-dot" />
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-(--rr-accent) opacity-20 blur" />
                  </span>
                  Error Boundaries, sin drama.
                </div>

                <h1 className="mt-6 font-(family-name:--font-poppins) text-[clamp(2.4rem,4vw,5rem)] font-black leading-[0.97] tracking-[-0.04em]">
                  <span className="block whitespace-nowrap">
                    <StaggerWords
                      text="El error ocurre."
                      wordClassName="bg-clip-text text-transparent"
                      wordStyle={{ backgroundImage: "linear-gradient(160deg, #ffffff 0%, rgb(244, 242, 238) 100%)" }}
                    />
                  </span>
                   <span
                     className="block whitespace-nowrap mt-1"
                     style={{ WebkitTextStroke: "1.5px rgb(244, 238, 238)", color: "transparent" }}
                   >
                     <StaggerWords
                       text="Tu UI sobrevive."
                       wordStyle={{ WebkitTextStroke: "1.5px rgb(244, 238, 238)", color: "transparent" }}
                     />
                   </span>

                  <span className="block whitespace-nowrap mt-1 text-(--rr-accent)">
                    <StaggerWords text="Tú lo controlas." />
                  </span>
                </h1>

                <p
                  data-rr-fade
                  className="mt-5 max-w-sm text-pretty text-[15px] leading-relaxed text-white/55"
                >
                  Atrapa errores de render, muestra un fallback limpio y
                  recupera el contexto — sin que tu app se apague por completo.
                </p>

                <div
                  data-rr-fade
                  className="mt-7 flex flex-wrap items-center gap-4"
                >
                  <a
                    data-rr-cta
                    data-rr-btn
                    href="/docs"
                    className="group relative isolate inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(180deg, color-mix(in oklab, var(--rr-accent), white 16%), var(--rr-accent))",
                      boxShadow: "0 0 0 1px color-mix(in oklab, var(--rr-accent), transparent 35%), 0 18px 70px color-mix(in oklab, var(--rr-accent), transparent 78%), 0 1px 0 rgba(255,255,255,0.28) inset",
                    }}
                  >
                    <span
                      data-rr-sheen
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-0"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.34), transparent)",
                        transform: "translateX(-140%) skewX(-18deg)",
                      }}
                    />

                    <span className="relative inline-flex items-center gap-2.5" data-rr-btn-content>
                      Documentación
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 transition-transform group-hover:translate-x-0.5">
                        <FiArrowRight size={12} />
                      </span>
                    </span>
                  </a>

                  <a
                    data-rr-btn
                    href="https://github.com/rody-huancas/react-rescuer"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative isolate inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-white/3 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-white/70 shadow-[0_14px_55px_rgba(0,0,0,0.26)] backdrop-blur-md transition-transform hover:-translate-y-0.5 hover:text-white active:scale-[0.98]"
                  >
                    <span
                      data-rr-sheen
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-0"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(52,214,255,0.20), transparent)",
                        transform: "translateX(-140%) skewX(-18deg)",
                      }}
                    />
                    <span className="relative inline-flex items-center gap-2.5" data-rr-btn-content>
                      <FiGithub
                        size={14}
                        className="text-white/55 transition-colors group-hover:text-white/80"
                      />
                      GitHub
                    </span>
                  </a>
                </div>
              </div>

              <div data-rr-rig className="relative min-w-0">
                <div
                  data-rr-halo
                  className="pointer-events-none absolute left-1/2 top-1/2 h-h-155 w-h-155 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--rr-accent), transparent 55%), transparent 66%)"
                  }}
                />
                <div className="lg:ml-auto">
                  <HeroVisual />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-1">
            <InstallCommands />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

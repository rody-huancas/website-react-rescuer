"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import getGsap from "@/lib/gsap/client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { SiNpm } from "react-icons/si";

const nav = [
  { label: "Documentación", href: "/docs#intro" },
  { label: "Ejemplos", href: "/docs#examples" },
  {
    label: "GitHub",
    href: "https://github.com/rody-huancas/react-rescuer",
    external: true,
  },
  { label: "Cambios", href: "/docs#changelog" },
];

const Header = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const root = rootRef.current;
      if (!root) return;

      const { gsap } = getGsap();

      const logo = root.querySelector<HTMLElement>("[data-rr-logo]");
      const navItems = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-rr-nav-item]"));
      const badge = root.querySelector<HTMLElement>("[data-rr-badge]");

      document.documentElement.classList.remove("rr-preload");

      gsap.set(root, { autoAlpha: 0, y: -28 });
      gsap.set([logo, ...navItems, badge].filter(Boolean), { autoAlpha: 0, y: -8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(root, { autoAlpha: 1, y: 8, duration: 0.85, ease: "power2.out" })
        .to(root, { y: 0, duration: 0.6, ease: "back.out(1.35)", clearProps: "transform,opacity,visibility" })
        .to(logo, { autoAlpha: 1, y: 0, duration: 0.6, clearProps: "transform,opacity,visibility" }, "<+0.02")
        .to(
          navItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.035,
            clearProps: "transform,opacity,visibility",
          },
          "<+0.05",
        )
        .to(badge, { autoAlpha: 1, y: 0, duration: 0.6, clearProps: "transform,opacity,visibility" }, "<+0.05");
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <header
      ref={rootRef}
      data-rr-header
      className="fixed left-1/2 top-5 z-50 w-[min(92vw,800px)] -translate-x-1/2"
    >
      <div
        className="relative rounded-full backdrop-blur-md p-1.5"
        style={{
          background: "rgba(10,9,8,0.7)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent 5%, color-mix(in oklab, var(--rr-accent), transparent 60%) 35%, rgba(255,255,255,0.08) 65%, transparent 95%)",
          }}
        />

        <div className="flex h-16 items-center justify-between px-3">
          <Link
            href="/"
            className="group inline-flex items-center rounded-full py-2 transition-colors"
            aria-label="react-rescuer home"
            data-rr-logo
          >
            <Image
              src="/logo-react-rescuer.webp"
              alt="react-rescuer"
              width={300}
              height={80}
              priority
              quality={100}
              sizes="300px"
              style={{ height: 60, width: "auto" }}
              className="select-none rounded-full object-contain"
            />
          </Link>

          <nav className="hidden items-center md:flex">
            {nav.map((item) => {
              const cls =
                "rounded-full px-4 py-2 text-[13px] font-medium text-white/55 transition-colors hover:text-white";

              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cls}
                    data-rr-nav-item
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <a key={item.label} href={item.href} className={cls} data-rr-nav-item>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <a
            href="https://www.npmjs.com/package/react-rescuer"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-(--rr-accent)/40 px-5 py-2 text-[12px] font-bold tracking-tight transition-all duration-300 hover:border-(--rr-accent)/80 hover:text-(--rr-accent)"
            data-rr-badge
          >
            <SiNpm size={20} className="transition-colors text-(--rr-accent)/80 group-hover:text-(--rr-accent)" />
            <span className="text-(--rr-accent)/80 group-hover:text-(--rr-accent)">v0.1.1</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

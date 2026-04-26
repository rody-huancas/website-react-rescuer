"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import SidebarContent from "@/components/docs/sidebar/SidebarContent";
import { getActiveSlug } from "@/utils/docsSidebar";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const pathname   = usePathname();
  const activeSlug = useMemo(() => getActiveSlug(pathname), [pathname]);

  const [open, setOpen] = useState<boolean>(false);
  const [q   , setQ   ] = useState<string>("");

  const onNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="fixed bottom-6 right-6 z-70 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-105 active:scale-95 lg:hidden"
      >
        <span
          className="transition-all duration-300"
          style={{
            opacity  : open ? 0                         : 1,
            transform: open ? "rotate(90deg) scale(0.5)": "rotate(0deg) scale(1)",
            position : "absolute",
          }}
        >
          <FiMenu size={18} />
        </span>

        <span
          className="transition-all duration-300"
          style={{
            opacity  : open ? 1                      : 0,
            transform: open ? "rotate(0deg) scale(1)": "rotate(-90deg) scale(0.5)",
            position : "absolute",
          }}
        >
          <FiX size={18} />
        </span>
      </button>

      <aside className="hidden overflow-hidden rounded-2xl border border-white/6 bg-[#111111] lg:block lg:sticky lg:top-36 h-dvh lg:h-[calc(100dvh-180px)] lg:w-70 lg:shrink-0">
        <SidebarContent
          activeSlug={activeSlug}
          query={q}
          setQuery={setQ}
          onNavigate={onNavigate}
          onCloseMobile={() => setOpen(false)}
        />
      </aside>

      <div
        className="fixed inset-0 z-60 lg:hidden"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div
          className="absolute inset-0 bg-black/70 transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <div
          className="absolute left-4 top-8 lg:top-24 h-[calc(100dvh-4rem)] w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-all duration-300"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0)" : "translateX(-24px)",
          }}
        >
          <SidebarContent
            activeSlug={activeSlug}
            query={q}
            setQuery={setQ}
            onNavigate={onNavigate}
            onCloseMobile={() => setOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;

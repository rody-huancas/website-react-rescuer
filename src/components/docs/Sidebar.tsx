"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FiMenu } from "react-icons/fi";
import SidebarContent from "@/components/docs/sidebar/SidebarContent";
import { getActiveSlug } from "@/utils/docsSidebar";

const Sidebar = () => {
  const pathname   = usePathname();
  const activeSlug = useMemo(() => getActiveSlug(pathname), [pathname]);

  const [open, setOpen] = useState<boolean>(false);
  const [q, setQ] = useState<string>("");

  const onNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 hover:bg-white/6"
        >
          <FiMenu size={14} />
          Menu
        </button>
      </div>

      <aside
  className="hidden overflow-hidden rounded-2xl border border-white/6 bg-[#111111]  lg:block lg:sticky lg:top-36 lg:h-[calc(100dvh-180px)] lg:w-70 lg:shrink-0"
        
      >
        <SidebarContent
          activeSlug={activeSlug}
          query={q}
          setQuery={setQ}
          onNavigate={onNavigate}
          onCloseMobile={() => setOpen(false)}
        />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-60 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-label="Cerrar overlay"
          />
          <div className="absolute left-4 top-24 h-[calc(100dvh-120px)] w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <SidebarContent
              activeSlug={activeSlug}
              query={q}
              setQuery={setQ}
              onNavigate={onNavigate}
              onCloseMobile={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;

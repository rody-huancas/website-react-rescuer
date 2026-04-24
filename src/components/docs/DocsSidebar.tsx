"use client";

import Link from "next/link";
import docsNav from "@/lib/docs/nav";
import useHash from "@/hooks/useHash";

const DocsSidebar = () => {
  const hash = useHash();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[104px]">
        <div className="rounded-2xl border border-white/5 bg-black/25 p-4 backdrop-blur">
          {docsNav.map((group) => (
            <div key={group.title} className="mb-5 last:mb-0">
              <div className="px-2 pb-2 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.22em] text-(--rr-muted)">
                {group.title.toUpperCase()}
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const itemHash = item.href.split("#")[1] ? `#${item.href.split("#")[1]}` : "";
                  const active   = itemHash !== "" && itemHash === hash;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                        active ? "bg-white/5 text-(--rr-fg)" : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default DocsSidebar;

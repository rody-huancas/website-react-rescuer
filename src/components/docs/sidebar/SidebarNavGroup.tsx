import Link from "next/link";

type Item = {
  title: string;
  href : string;
  slug : string;
};

interface Props {
  title     : string;
  items     : Item[];
  activeSlug: string;
  onNavigate: () => void;
}

const SidebarNavGroup = ({ title, items, activeSlug, onNavigate }: Props) => {
  return (
    <div className="mb-5 last:mb-0">
      <div className="px-3 pb-2 font-(family-name:--font-geist-mono) text-[11px] tracking-[0.22em] text-white/45">
        {title}
      </div>

      <div className="space-y-1">
        {items.map((item) => {
          const isActive = item.slug === activeSlug;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                isActive ? "bg-white/6 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 h-6 w-0.75 -translate-y-1/2 rounded-r-full transition-all ${
                  isActive ? "bg-(--rr-cyan)" : "bg-transparent group-hover:bg-(--rr-cyan)/40"
                }`}
              />
              <span className="pl-2">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarNavGroup;

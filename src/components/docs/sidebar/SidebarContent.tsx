import docsNav from "@/lib/docs/nav";
import SidebarSearch from "@/components/docs/sidebar/SidebarSearch";
import SidebarNavGroup from "@/components/docs/sidebar/SidebarNavGroup";
import { filterNav } from "@/utils/docsSidebar";
import { FiX } from "react-icons/fi";

interface Props {
  activeSlug   : string;
  query        : string;
  setQuery     : (next: string) => void;
  onNavigate   : () => void;
  onCloseMobile: () => void;
}

const SidebarContent = ({ activeSlug, query, setQuery, onNavigate, onCloseMobile }: Props) => {
  const groups = filterNav(docsNav, query);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="font-(family-name:--font-geist-mono) text-[11px] tracking-[0.22em] text-white/55">
          DOCUMENTACION
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden rounded-md p-2 text-white/60 hover:bg-white/5 hover:text-white"
          aria-label="Cerrar menu"
        >
          <FiX size={18} />
        </button>
      </div>

      <SidebarSearch value={query} onChange={setQuery} />

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-2 pb-4">
        {groups.map((group) => (
          <SidebarNavGroup
            key={group.title}
            title={group.title}
            items={group.items}
            activeSlug={activeSlug}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarContent;

import { FiSearch } from "react-icons/fi";

interface Props {
  value   : string;
  onChange: (next: string) => void;
}

const SidebarSearch = ({ value, onChange }: Props) => {
  return (
    <div className="px-4">
      <div className="relative">
        <FiSearch
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar..."
          className="w-full rounded-xl border border-white/10 bg-[#111111] px-10 py-2.5 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-(--rr-accent)/60"
        />
      </div>
    </div>
  );
};

export default SidebarSearch;

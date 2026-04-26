import Link from "next/link";
import { cn } from "@/utils/cn";
import { FiArrowUpRight } from "react-icons/fi";

interface Props {
  num       : number;
  label     : string;
  href     ?: string;
  className?: string;
}

const HomeAfterHeroStepCard = ({ num, label, href, className = "" }: Props) => {
  return (
    <Link
      href={href ?? "/"}
      className={cn("group relative overflow-hidden rounded-4xl border border-white/5 bg-white/2 p-10 transition-all duration-500 hover:bg-white/4", className)}
    >
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-(--rr-accent)/5 blur-[100px] transition-opacity opacity-0 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <span className="text-7xl font-black italic tracking-tighter leading-none text-white/3 transition-all duration-700 group-hover:text-(--rr-accent)/10 group-hover:scale-110 group-hover:-rotate-3">
              {String(num).padStart(2, "0")}
            </span>

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-(--rr-accent)/40 group-hover:bg-(--rr-accent)/10">
              <FiArrowUpRight
                className="text-white/20 transition-all duration-500 group-hover:text-(--rr-accent)"
                size={28}
              />
            </div>
          </div>

          <h4 className="mt-10 text-3xl font-black leading-[1.1] tracking-tight text-white/90 transition-colors group-hover:text-white md:text-4xl">
            {label}
          </h4>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-(--rr-accent) shadow-[0_0_15px_var(--rr-accent)]" />

          <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/30">
            Step {num} • Protocol
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HomeAfterHeroStepCard;

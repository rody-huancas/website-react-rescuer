import { FEATURE_ITEMS } from "@/constants/homeAfterHero";

const HomeAfterHeroFeatures = () => (
  <div className="mx-auto mt-24 grid max-w-4xl gap-px bg-white/6 md:grid-cols-3" style={{ borderRadius: "16px", overflow: "hidden" }}>
    {FEATURE_ITEMS.map(({ title, text, icon: Icon, color, bg }) => (
      <div
        key={title}
        data-feat
        className="flex flex-col gap-3 bg-[#0c0c0f] p-7 transition-colors hover:bg-white/3"
      >
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`}>
          <Icon size={18} />
        </div>
        <p className="text-[14px] font-bold leading-snug text-white">{title}</p>
        <p className="text-[13px] leading-relaxed text-white/45">{text}</p>
      </div>
    ))}
  </div>
);

export default HomeAfterHeroFeatures;
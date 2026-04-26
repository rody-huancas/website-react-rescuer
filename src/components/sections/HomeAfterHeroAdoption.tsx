import { FiZap } from "react-icons/fi";
import { ADOPTION_STEPS } from "@/constants/homeAfterHero";

const HomeAfterHeroAdoption = () => (
  <div className="mx-auto mt-16 max-w-4xl">
    <div data-reveal className="mb-6 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-(--rr-accent)">Build fast</p>
        <h3 className="mt-1.5 text-2xl font-black tracking-tight text-white md:text-[26px]">
          Patrones reales, no solo snippets
        </h3>
      </div>
    </div>

    <div data-reveal className="rounded-2xl border border-white/7 bg-white/2 p-5">
      <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold text-white/60">
        <FiZap className="text-(--rr-accent)" size={13} />
        Flujo recomendado de adopción
      </div>
      <div className="flex flex-wrap items-center gap-y-2">
        {ADOPTION_STEPS.map((step, i) => (
          <div key={step} className="inline-flex items-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12px] text-white/65 transition-colors hover:border-(--rr-accent)/40 hover:text-(--rr-accent)">
              <span className="mr-1.5 text-(--rr-accent) opacity-70">{i + 1}.</span>
              {step}
            </span>
            {i < ADOPTION_STEPS.length - 1 && (
              <span className="mx-2 text-[11px] text-white/20">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomeAfterHeroAdoption;
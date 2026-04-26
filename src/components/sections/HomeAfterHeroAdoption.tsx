import HomeAfterHeroStepCard from "./HomeAfterHeroStepCard";
import { ADOPTION_STEPS } from "@/constants/homeAfterHero";
import { FiZap } from "react-icons/fi";


const HomeAfterHeroAdoption = () => (
  <div className="mx-auto mt-40 max-w-7xl px-6">
    <div className="mb-24 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-(--rr-accent)/20 bg-(--rr-accent)/5 px-6 py-2">
          <FiZap className="text-(--rr-accent) animate-pulse" size={18} />
          
          <span className="text-[12px] font-black uppercase tracking-[0.4em] text-(--rr-accent)">
            Adoption Roadmap
          </span>
        </div>

        <h3 className="text-6xl font-black tracking-tighter text-white md:text-8xl leading-[0.9] flex gap-5">
          Patrones{" "}
          <span className="text-white/40 italic">reales.</span>
        </h3>
      </div>

      <p className="max-w-100 text-lg font-medium leading-relaxed text-white/40 border-l border-white/10 pl-8">
        La guía definitiva para construir aplicaciones resilientes, escalables y listas para producción.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <HomeAfterHeroStepCard 
        num={1}
        href="/docs/installation"
        label={ADOPTION_STEPS[0]} 
        className="md:col-span-8 bg-linear-to-br from-white/5 to-transparent min-h-75" 
      />
      
      <HomeAfterHeroStepCard 
        num={2}
        href="/docs/error-boundary"
        label={ADOPTION_STEPS[1]}
        className="md:col-span-4" 
      />

      <HomeAfterHeroStepCard 
        num={3}
        href="/docs/hooks"
        label={ADOPTION_STEPS[2]}
        className="md:col-span-4"
      />

      <HomeAfterHeroStepCard 
        num={4}
        href="/docs/recovery"
        label={ADOPTION_STEPS[3]}
        className="md:col-span-4"
      />
      
      <HomeAfterHeroStepCard 
        num={5}
        href="/docs/observability"
        label={ADOPTION_STEPS[4]}
        className="md:col-span-4 border-(--rr-accent)/20 bg-(--rr-accent)/5"
      />
    </div>
  </div>
);

export default HomeAfterHeroAdoption;

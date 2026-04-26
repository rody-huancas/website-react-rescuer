import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { TITLE_WORD_A, TITLE_WORD_B } from "@/constants/homeAfterHero";

const HomeAfterHeroTitle = () => (
  <div className="relative text-center">
    <p data-reveal className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white/40">
      Interacción inmediata
    </p>

    <h2
      className="flex flex-wrap items-baseline justify-center gap-x-4 text-[clamp(64px,12vw,150px)] font-black leading-[0.88] tracking-[-0.045em]"
      style={{ perspective: "1000px" }}
    >
      <span className="inline-flex" style={{ perspective: "1000px" }}>
        {TITLE_WORD_A.map((char, i) => (
          <span key={i} data-letter-a className="inline-block text-white" style={{ display: "inline-block" }}>
            {char}
          </span>
        ))}
      </span>

      <span
        data-dash
        className="inline-block h-[0.12em] w-[0.55em] self-center rounded-sm bg-(--rr-accent)"
        style={{ display: "inline-block" }}
      />

      <span className="inline-flex" style={{ perspective: "1000px" }}>
        {TITLE_WORD_B.map((char, i) => (
          <span key={i} data-letter-b className="inline-block text-(--rr-accent)" style={{ display: "inline-block" }}>
            {char}
          </span>
        ))}
      </span>
    </h2>

    <p data-reveal className="mx-auto mt-6 max-w-135 text-[15px] leading-[1.7] text-white/50">
      Manejo de errores en React con fallbacks granulares, reintentos inteligentes con backoff
      y contexto de observabilidad listo para producción.
    </p>

    <div data-reveal className="mt-8 flex items-center justify-center gap-3">
      <Link
        href="/docs/installation"
        className="rounded-full bg-(--rr-accent) px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition-opacity hover:opacity-80"
      >
        Instalar ahora
      </Link>
      <Link
        href="/docs/live-examples"
        className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-white/50 transition-all hover:border-white/25 hover:text-white/75"
      >
        Ver ejemplos en vivo <FiArrowRight size={12} />
      </Link>
    </div>
  </div>
);

export default HomeAfterHeroTitle;
import { FiActivity, FiRefreshCcw, FiShield } from "react-icons/fi";
import type { IconType } from "react-icons";

export interface FeatureItem {
  title: string;
  text : string;
  icon : IconType;
  color: string;
  bg   : string;
}

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    title: "Captura errores de render",
    text : "Mantiene la UI viva con fallbacks claros para cada sección crítica.",
    icon : FiShield,
    color: "text-blue-400",
    bg   : "bg-blue-400/10",
  },
  {
    title: "Recuperación con reintentos",
    text : "Controla retryCount, backoff y límite máximo con la estrategia recovery.",
    icon : FiRefreshCcw,
    color: "text-violet-400",
    bg   : "bg-violet-400/10",
  },
  {
    title: "Contexto para observabilidad",
    text : "Envía fingerprint, breadcrumbs y sessionId a tus pipelines de error.",
    icon : FiActivity,
    color: "text-cyan-400",
    bg   : "bg-cyan-400/10",
  },
];

export const ADOPTION_STEPS = [
  "Instala",
  "Prueba fallback",
  "Eleva errores async",
  "Activa recovery",
  "Conecta observabilidad",
] as const;

export const TITLE_WORD_A = "React".split("");
export const TITLE_WORD_B = "Rescuer".split("");

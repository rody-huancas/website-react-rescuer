export const liveExampleHelperText = (mode: string) => {
  return mode === "render"
    ? "Paso 1: pulsa 'Simular error'. Paso 2: usa 'Reintentar' en el fallback o 'Reiniciar' para volver al estado inicial."
    : mode === "async"
      ? "Busca un Pokemon por nombre. Si no existe, el error se eleva al boundary con useErrorBoundary()."
      : mode === "recovery"
        ? "Marca el componente como inestable y usa 'Reintentar' para aplicar recovery (retryCount aumenta)."
        : "Agrega breadcrumbs antes de disparar el error para ver el contexto (fingerprint + breadcrumbs).";
};

# React Rescuer Website

<p align="center">
  <img src="/logo-react-rescuer.webp" alt="React Rescuer" width="120" />
</p>

<p align="center">
  <strong>Manejo de errores en React con fallbacks granulares, reintentos inteligentes con backoff y contexto de observabilidad listo para producción.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-rescuer">
    <img src="https://img.shields.io/npm/v/react-rescuer?style=flat&color=ED1C40" alt="npm version" />
  </a>
  <a href="https://github.com/rody-huancas/react-rescuer/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-rescuer?style=flat" alt="license" />
  </a>
  <a href="https://github.com/rody-huancas/react-rescuer">
    <img src="https://img.shields.io/github/stars/rody-huancas/react-rescuer?style=flat" alt="stars" />
  </a>
</p>

---

## Descripción

**React Rescuer** es una librería moderna para el manejo de Error Boundaries en React. Mantiene tu UI viva con fallbacks claros, reintentos inteligentes con backoff exponencial y contexto de observabilidad listo para producción.

### Características

- **Fallbacks granulares** — captura errores a nivel de componente, no de toda la app
- **Recovery automático** — reintenta con estrategias configurables de backoff
- **Observabilidad** — fingerprint, breadcrumbs y sessionId para tus pipelines de errores
- **API simple** — drop-in con tu código existente

---

## Instalación

```bash
npm install react-rescuer
# o
pnpm add react-rescuer
# o
yarn add react-rescuer
```

---

## Uso rápido

```tsx
import { ErrorBoundary } from "react-rescuer";

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Algo salió mal.</div>}
    >
      <Page />
    </ErrorBoundary>
  );
}
```

---

## Documentación

Consulta la documentación completa en [https://react-rescuer.vercel.app/docs](https://react-rescuer.vercel.app/docs)

---

## Ejemplos en vivo

Visita los ejemplos interactivos en [https://react-rescuer.vercel.app/docs/live-examples](https://react-rescuer.vercel.app/docs/live-examples):

- **Fallback básico** — error de render capturado
- **fallbackRender** — accede a error, retryCount, resetError
- **useErrorBoundary** — eleva errores async
- **Recovery + Observabilidad** — reintentos automáticos con contexto

---

## Recursos

- [npm](https://www.npmjs.com/package/react-rescuer)
- [GitHub](https://github.com/rody-huancas/react-rescuer)
- [Discord](https://discord.gg/react-rescuer)

---

## License

MIT © [Rody Huancas](https://rody-huancas.vercel.app)

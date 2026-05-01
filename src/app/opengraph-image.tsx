import { ImageResponse } from "next/og";

export const alt = "React Rescuer - Smart React error boundaries";

export const size = {
  width : 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          backgroundColor: "#0d0d0d",
          backgroundImage: "radial-gradient(900px 600px at 18% -10%, rgba(79, 172, 254, 0.22), transparent 55%), radial-gradient(900px 600px at 88% 10%, rgba(255,255,255,0.06), transparent 55%)",
          color: "#f4f2ee",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>
          React Rescuer
        </div>
        <div style={{ marginTop: 18, fontSize: 32, opacity: 0.86 }}>
          Error boundaries con recuperacion, observabilidad y buena DX
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 22,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(244,242,238,0.14)",
              background: "rgba(244,242,238,0.06)",
            }}
          >
            ErrorBoundary
          </div>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(79,172,254,0.35)",
              background: "rgba(79,172,254,0.10)",
              color: "#9ed6ff",
            }}
          >
            reset / recovery
          </div>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(52,214,255,0.35)",
              background: "rgba(52,214,255,0.08)",
              color: "#a8ecff",
            }}
          >
            breadcrumbs + fingerprint
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const alt = "Documentacion - react-rescuer";

export const size = {
  width : 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 64,
        backgroundColor: "#0d0d0d",
        backgroundImage: "radial-gradient(900px 600px at 18% -10%, rgba(79, 172, 254, 0.18), transparent 55%), radial-gradient(900px 600px at 88% 10%, rgba(255,255,255,0.05), transparent 55%)",
        color: "#f4f2ee",
      }}
    >
      <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: -0.8 }}>
        Documentacion
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        react-rescuer
      </div>
      <div style={{ marginTop: 18, fontSize: 28, opacity: 0.84 }}>
        ErrorBoundary, recovery, observabilidad, hooks
      </div>
    </div>,
    { ...size },
  );
}

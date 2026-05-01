import { ImageResponse } from "next/og";

export const alt = "React Rescuer - Smart React error boundaries";

export const size = {
  width : 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TwitterImage() {
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
        style={{ marginTop: 44, fontSize: 22, color: "rgba(255,255,255,0.72)" }}
      >
        react-rescuer.vercel.app
      </div>
    </div>,
    { ...size },
  );
}

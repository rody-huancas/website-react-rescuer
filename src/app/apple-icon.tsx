import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        background: "#0d0d0d",
        boxShadow: "inset 0 0 0 2px rgba(244,242,238,0.14)",
      }}
    >
      <div
        style={{
          width: 128,
          height: 128,
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(86px 64px at 30% 25%, rgba(79, 172, 254, 0.75), rgba(79, 172, 254, 0.06)), #0d0d0d",
          boxShadow:
            "0 0 0 2px rgba(79, 172, 254, 0.32), 0 24px 50px rgba(0,0,0,0.45)",
          color: "#f4f2ee",
          fontSize: 60,
          fontWeight: 900,
          letterSpacing: -2,
        }}
      >
        RR
      </div>
    </div>,
    { ...size },
  );
}

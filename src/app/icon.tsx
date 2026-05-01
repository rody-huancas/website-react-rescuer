import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        background: "#0d0d0d",
        boxShadow: "inset 0 0 0 1px rgba(244,242,238,0.14)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(26px 18px at 30% 25%, rgba(79, 172, 254, 0.75), rgba(79, 172, 254, 0.06)), #0d0d0d",
          boxShadow:
            "0 0 0 1px rgba(79, 172, 254, 0.35), 0 14px 28px rgba(0,0,0,0.45)",
          color: "#f4f2ee",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: -0.6,
        }}
      >
        RR
      </div>
    </div>,
    { ...size },
  );
}

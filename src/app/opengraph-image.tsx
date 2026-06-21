import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          color: "#F4EBD0",
          background:
            "radial-gradient(circle at 70% 20%, rgba(217,180,95,0.42), transparent 28%), radial-gradient(circle at 28% 70%, rgba(109,77,255,0.55), transparent 32%), linear-gradient(135deg, #080814 0%, #1A102E 58%, #10223F 100%)",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#D9B45F" }}>
          GODRIGHT COLLAPSE
        </div>
        <div style={{ marginTop: 32, maxWidth: 960, fontSize: 76, fontWeight: 800, lineHeight: 1.12 }}>
          GODRIGHT COLLAPSE
        </div>
        <div style={{ marginTop: 18, maxWidth: 960, fontSize: 38, lineHeight: 1.35 }}>
          Who is the final child of mandate?
        </div>
        <div style={{ marginTop: 42, fontSize: 26, color: "#A8D8FF" }}>
          Seven realms novel IP official site
        </div>
      </div>
    ),
    size,
  );
}

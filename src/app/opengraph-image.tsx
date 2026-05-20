import { ImageResponse } from "next/og";

export const alt = "PowerSmart — Cheapest electricity hours in Norway";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#093c5d",
          color: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              background: "#5df8d8",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 24 24" fill="#093c5d" width={40} height={40}>
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
            </svg>
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
            PowerSmart
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              color: "#5df8d8",
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 500,
            }}
          >
            Norway · NO1–NO5
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Find the cheapest electricity hours.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

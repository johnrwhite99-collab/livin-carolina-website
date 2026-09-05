import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.teamName} — ${siteConfig.primaryArea} Real Estate`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#c5a95e", textTransform: "uppercase" }}>
          {siteConfig.primaryArea}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, maxWidth: 900 }}>
          {siteConfig.teamName}
        </div>
        <div style={{ fontSize: 32, marginTop: 24, maxWidth: 900, color: "rgba(255,255,255,0.8)" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}

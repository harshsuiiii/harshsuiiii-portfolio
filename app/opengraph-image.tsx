import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
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
          justifyContent: "space-between",
          padding: 72,
          background: "#090B10",
          color: "#E9EEF5",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9AA7B8" }}>
          <span>{siteConfig.name}</span>
          <span>{siteConfig.roles.join(" / ")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -4, textTransform: "uppercase" }}>
          <span>I build digital</span>
          <span>experiences &amp;</span>
          <div style={{ display: "flex", marginTop: 6 }}>
            <span style={{ background: "#A3E635", color: "#0B0F14", padding: "0 14px" }}>intelligent</span>
            <span style={{ marginLeft: 24 }}>systems.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Claude Code Marketplaces";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FDFDF7",
          padding: "80px",
        }}
      >
        {/* Main Title */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 400,
            letterSpacing: "0.05em",
            color: "#ee7e60",
            marginBottom: "40px",
            textAlign: "center",
            fontFamily: "var(--font-bbh-sans)",
          }}
        >
          CLAUDE CODE MARKETPLACES
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#666666",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Discover and share Claude Code marketplaces
        </div>

        {/* Decorative Element */}
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            fontSize: 24,
            color: "#ee7e60",
          }}
        >
          claudemarketplaces.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

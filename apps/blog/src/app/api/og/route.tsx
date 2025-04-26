import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Function to safely load fonts with fallback during build
const safelyLoadFonts = async () => {
  try {
    // Check if we're in build mode and return empty fonts if so
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PHASE === "phase-production-build"
    ) {
      return [new Uint8Array(0), new Uint8Array(0)]; // Empty font data for build time
    }

    // Otherwise load fonts normally
    const fontRegularPromise = fetch(
      new URL(
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/fonts/InstrumentSerif-Regular.ttf`,
      ),
    ).then((res) => res.arrayBuffer());

    const fontItalicPromise = fetch(
      new URL(
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/fonts/InstrumentSerif-Italic.ttf`,
      ),
    ).then((res) => res.arrayBuffer());

    return await Promise.all([fontRegularPromise, fontItalicPromise]);
  } catch (error) {
    console.error("Error loading fonts:", error);
    return [new Uint8Array(0), new Uint8Array(0)]; // Return empty fonts on error
  }
};

// Define the theme colors based on the website's dark aesthetic
const theme = {
  // Dark theme colors inspired by the screenshot
  background: "#1a1a1a", // Dark background
  foreground: "#e6e6e6", // Light text
  muted: "#333333", // Slightly lighter background for cards
  mutedForeground: "#a0a0a0", // Subdued text color
  accent: "#6b8b58", // Forest green accent (from the provided theme)
  border: "#2c2c2c", // Subtle border color
  date: "#888888", // Date text color
};

export const GET = async (req: NextRequest) => {
  // Load fonts safely (with fallback for build time)
  const [fontRegularData, fontItalicData] = await safelyLoadFonts();

  // If we're building, return a simple placeholder image
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#1a1a1a",
            padding: "60px",
            color: "#e6e6e6",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "64px" }}>OG Image Placeholder</h1>
          <p style={{ fontSize: "24px" }}>This image is generated at runtime</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }

  // Normal runtime processing
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get("title") || "Yan's Digital Glade";
  const description =
    searchParams.get("description") ||
    "A collection of thoughts, notes, and articles";
  const date =
    searchParams.get("date") ||
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  // Create a fonts array only if we have valid data
  const fonts = [];
  if (fontRegularData.byteLength > 0) {
    // Only add fonts if we have valid data
    fonts.push(
      {
        name: "Instrument Serif",
        data: fontRegularData as ArrayBuffer, // Cast to ArrayBuffer
        style: "normal",
        weight: "400", // Use string literal for weight
      },
      {
        name: "Instrument Serif",
        data: fontItalicData as ArrayBuffer, // Cast to ArrayBuffer
        style: "italic",
        weight: "400", // Use string literal for weight
      },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: theme.background,
          padding: "60px",
          color: theme.foreground,
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "500",
              color: theme.foreground,
            }}
          >
            Yan's Digital Glade
          </div>
          <div
            style={{
              fontSize: "18px",
              color: theme.date,
            }}
          >
            {date}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontFamily: "Instrument Serif, serif",
              fontWeight: "700",
              margin: "0 0 24px 0",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "28px",
              margin: 0,
              color: theme.mutedForeground,
              lineHeight: 1.5,
              maxWidth: "800px",
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            borderTop: `1px solid ${theme.border}`,
            paddingTop: "24px",
          }}
        >
          {/* Optional: Add a logo or icon here */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: theme.accent,
              marginRight: "12px",
            }}
          />
          <div
            style={{
              fontSize: "18px",
              color: theme.mutedForeground,
            }}
          >
            digitalglade.yan.run
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Pass fonts only if we have valid data
      fonts: fonts.length > 0 ? (fonts as any) : undefined,
    },
  );
};

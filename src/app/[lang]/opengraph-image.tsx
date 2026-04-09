import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Te Blanko - Burger & Fast Food";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Background gradient circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(245, 166, 35, 0.08)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(232, 135, 30, 0.06)",
            filter: "blur(80px)",
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          width={200}
          height={200}
          style={{ borderRadius: "50%", marginBottom: "30px" }}
        />

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              color: "rgba(245, 166, 35, 0.6)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Burger & Fast Food
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.3)",
              marginTop: "12px",
            }}
          >
            043 700 217
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, #f5a623, #e8871e, #f5a623, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

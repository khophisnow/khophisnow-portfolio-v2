import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#030605,#07100d 48%,#111827)", color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, color: "#57f29a" }}>
        <span>khophisnow</span><span>secure systems cockpit</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 82, fontWeight: 900, lineHeight: 1.02, maxWidth: 980 }}>I build systems like a developer and inspect them like an attacker.</div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#a7f3d0" }}>Backend APIs • Ethical hacking • Secure systems</div>
      </div>
      <div style={{ display: "flex", gap: 18, fontSize: 24, color: "#53d8fb" }}><span>EduManage</span><span>WhatsUpUCC</span><span>CTF Labs</span></div>
    </div>,
    size,
  );
}

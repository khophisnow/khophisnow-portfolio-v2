import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#030605", color: "white", display: "flex", padding: 58, fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#03110d 0%,#07100d 42%,#111827 100%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(52,245,166,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(52,245,166,.13) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
      <div style={{ position: "absolute", right: -120, top: -80, width: 440, height: 440, border: "2px solid rgba(57,215,255,.35)", borderRadius: 440 }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", border: "2px solid rgba(255,255,255,.12)", padding: 44, background: "rgba(3,6,5,.55)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 58, height: 58, border: "2px solid #34f5a6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#34f5a6" }}>KS</div>
            <div style={{ display: "flex", flexDirection: "column" }}><span style={{ color: "#34f5a6", fontSize: 27, fontWeight: 800 }}>khophisnow</span><span style={{ color: "rgba(255,255,255,.55)", fontSize: 18 }}>secure systems cockpit</span></div>
          </div>
          <div style={{ color: "#39d7ff", fontSize: 22 }}>Backend APIs / Ethical Hacking</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 960, fontSize: 76, fontWeight: 900, lineHeight: 1.03 }}>Secure backend systems with an attacker-aware mindset.</div>
          <div style={{ marginTop: 24, display: "flex", gap: 14, fontSize: 23, color: "#a7f3d0" }}><span>EduManage</span><span>WhatsUpUCC</span><span>CTF Labs</span><span>API Evidence</span></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.62)", fontSize: 21 }}><span>NestJS / Express / PostgreSQL / Prisma</span><span>Cape Coast, Ghana</span></div>
      </div>
    </div>,
    size,
  );
}

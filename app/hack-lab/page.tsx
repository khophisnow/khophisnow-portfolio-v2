import { SourceBackLink } from "@/components/SourceBackLink";
import { HackChallenge } from "@/components/InteractiveCockpit";
export const metadata = { title: "Hack Lab | KhophiSnow" };
export default function HackLabPage() { return <main className="scanline min-h-screen bg-ink text-white"><section className="mx-auto max-w-4xl px-5 py-16"><SourceBackLink fallback={{ href: "/", label: "Back home" }} sources={{ certificates: { href: "/#certificates", label: "Back to public activity" } }} /><h1 className="mt-12 text-4xl font-black md:text-5xl">Hack Lab</h1><p className="mt-5 max-w-2xl text-white/65">A harmless security puzzle space for portfolio visitors. No real exploitation, just learning signals.</p><div className="mt-10"><HackChallenge /></div></section></main>; }

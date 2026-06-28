import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HackChallenge } from "@/components/InteractiveCockpit";
export const metadata = { title: "Hack Lab | KhophiSnow" };
export default function HackLabPage() { return <main className="scanline min-h-screen bg-ink text-white"><section className="mx-auto max-w-4xl px-5 py-16"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white"><ArrowLeft size={16} />Back home</Link><h1 className="mt-12 text-5xl font-black">Hack Lab</h1><p className="mt-5 max-w-2xl text-white/65">A harmless security puzzle space for portfolio visitors. No real exploitation, just learning signals.</p><div className="mt-10"><HackChallenge /></div></section></main>; }

import { TruthOrDareApp } from "@/components/truth-or-dare/TruthOrDareApp";

export const metadata = {
  title: "DareDeck | KhophiSnow Portfolio Project",
  description: "An offline-first customizable Truth and Dare platform with local rooms, Supabase online rooms, custom question imports, scoring, synced dare timers, and session persistence.",
  alternates: { canonical: "/truth-or-dare" },
  openGraph: {
    title: "DareDeck | Portfolio Game Project",
    description: "Custom packs, local persistence, scoring, game modes, synced dare timers, and Supabase online room links.",
    url: "/truth-or-dare",
  },
};

export default async function TruthOrDarePage({ searchParams }: { searchParams: Promise<{ stage?: string }> }) {
  const { stage } = await searchParams;
  return <TruthOrDareApp initialStage={stage === "setup" ? "setup" : undefined} />;
}

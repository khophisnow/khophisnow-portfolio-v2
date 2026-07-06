import { SourceBackLink } from "@/components/SourceBackLink";

export function SmartBackLink({ fallback = "/#certificates", label = "Back" }: { fallback?: string; label?: string }) {
  return <SourceBackLink fallback={{ href: fallback, label }} sources={{}} />;
}

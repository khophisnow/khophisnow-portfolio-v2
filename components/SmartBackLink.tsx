import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SmartBackLink({ fallback = "/#certificates" }: { fallback?: string }) {
  return <Link href={fallback} className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white"><ArrowLeft size={16} />Back home</Link>;
}

"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function WriteupBackLink() {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const referrer = document.referrer ? new URL(document.referrer) : null;
      if (referrer && referrer.origin === window.location.origin && referrer.pathname === "/writeups") {
        event.preventDefault();
        router.push("/writeups");
      }
    } catch {
      // Keep the default home-section link.
    }
  };

  return (
    <Link href="/#writeups" onClick={handleClick} className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">
      <ArrowLeft size={16} />
      Back to writeups
    </Link>
  );
}

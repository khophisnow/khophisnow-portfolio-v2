"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function WriteupBackLink() {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const source = new URL(window.location.href).searchParams.get("from");
    event.preventDefault();
    router.push(source === "library" ? "/writeups" : "/#writeups");
  };

  return (
    <Link href="/#writeups" onClick={handleClick} className="inline-flex items-center gap-2 text-sm font-bold text-mint hover:text-white">
      <ArrowLeft size={16} />
      Back to writeups
    </Link>
  );
}

"use client";

import { SourceBackLink } from "@/components/SourceBackLink";

export function WriteupBackLink() {
  return <SourceBackLink fallback={{ href: "/writeups", label: "Back to writeups" }} sources={{ home: { href: "/#writeups", label: "Back to homepage writeups" }, library: { href: "/writeups", label: "Back to writeup library" } }} />;
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const file = await readFile(join(process.cwd(), "public", "github-feed.json"), "utf8");
    return new NextResponse(file, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ updatedAt: null, source: "https://github.com/khophisnow", items: [] }, { status: 503 });
  }
}

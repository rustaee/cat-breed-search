import { NextRequest, NextResponse } from "next/server";
import { catApiFetch } from "@/lib/catapi";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";

    // Use search endpoint when query provided, otherwise fetch all breeds (limited for perf)
    const path = q
      ? `/breeds/search?q=${encodeURIComponent(q)}`
      : "/breeds";

    const res = await catApiFetch(path);
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text || "Cat API error" }, { status: 502 });
    }
    const data = await res.json();

    // Normalize to a richer payload for details section
    const items = Array.isArray(data)
      ? data.map((b: any) => ({
          id: b.id,
          name: b.name,
          origin: b.origin,
          temperament: b.temperament,
          description: b.description,
          wikipedia_url: b.wikipedia_url,
          life_span: b.life_span,
        }))
      : [];
    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 });
  }
}

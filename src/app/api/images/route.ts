import { NextRequest, NextResponse } from "next/server";
import { catApiFetch, ensureImageBreeds } from "@/lib/catapi";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "0";
    const limit = searchParams.get("limit") ?? "12";
    const breedId = searchParams.get("breed_id");

    const params = new URLSearchParams();
    params.set("limit", limit);
    params.set("page", page);
    params.set("order", "Desc");
    params.set("include_breeds", "true");
    if (breedId) {
      params.set("breed_ids", breedId);
    } else {
      // Prefer images that include breed info for the general feed
      params.set("has_breeds", "1");
    }

    const res = await catApiFetch(`/images/search?${params.toString()}`);
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text || "Cat API error" }, { status: 502 });
    }
    const data = await res.json();
    // Only enrich with per-image breed lookups when not filtering by a specific breed
    if (!breedId) {
      const withBreeds = await ensureImageBreeds(data);
      return NextResponse.json(withBreeds);
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 });
  }
}

"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CatImage } from "@/lib/catapi";
import { Box, Stack } from "@mui/material";
import BreedAutocomplete from "@/components/BreedAutocomplete";
import CatGrid from "@/components/CatGrid";

type BreedOption = { id: string; name: string };

type Props = {
  initial: CatImage[];
};

export default function ClientGallery({ initial }: Props) {
  const LIMIT = 12;
  const [images, setImages] = useState<CatImage[]>(initial);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(initial.length === LIMIT);
  const [breed, setBreed] = useState<BreedOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const didInitRef = useRef(false);

  const fetchPage = useCallback(
    async (pageToFetch: number, selected: BreedOption | null, mode: "replace" | "append") => {
      if (pageToFetch === 0 && mode === "replace") setLoading(true);
      if (pageToFetch > 0 && mode === "append") setIsFetchingNext(true);
      setError(null);
      try {
        const params = new URLSearchParams({ limit: String(LIMIT), page: String(pageToFetch) });
        if (selected?.id) params.set("breed_id", selected.id);
        const res = await fetch(`/api/images?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch images");
        const data: CatImage[] = await res.json();
        setHasMore(data.length === LIMIT);
        setImages((prev) => (mode === "append" ? [...prev, ...data] : data));
        setPage(pageToFetch);
      } catch (e: any) {
        setError(e?.message || "Failed to load images");
        if (mode === "replace") setImages([]);
      } finally {
        if (pageToFetch === 0 && mode === "replace") setLoading(false);
        if (pageToFetch > 0 && mode === "append") setIsFetchingNext(false);
      }
    },
    []
  );

  // Handle breed change (including clear) → reset list and page
  useEffect(() => {
    if (!didInitRef.current) {
      didInitRef.current = true;
      return; // keep SSR initial results on first render
    }
    fetchPage(0, breed, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breed?.id]);

  // IntersectionObserver to load next pages
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isFetchingNext && !loading) {
          fetchPage(page + 1, breed, "append");
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [breed, page, hasMore, isFetchingNext, loading, fetchPage]);

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mb: 3 }}>
        <BreedAutocomplete value={breed} onChange={setBreed} />
      </Stack>
      <CatGrid images={images} />
      <div ref={sentinelRef} />
      {loading && <Box sx={{ textAlign: "center", py: 2 }}>Loading…</Box>}
      {error && <Box sx={{ textAlign: "center", py: 2, color: "error.main" }}>{error}</Box>}
      {isFetchingNext && !loading && <Box sx={{ textAlign: "center", py: 2 }}>Loading more…</Box>}
    </Box>
  );
}

"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CatImage } from "@/lib/catapi";
import { Box, CircularProgress, Alert, Button } from "@mui/material";
import BreedAutocomplete from "@/components/BreedAutocomplete";
import CatGrid from "@/components/CatGrid";
import PageHeader from "@/components/PageHeader";
import CatGridSkeleton from "@/components/CatGridSkeleton";
import BreedDetails from "@/components/BreedDetails";

type BreedOption = {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  description?: string;
  wikipedia_url?: string;
  life_span?: string;
};

type Props = {
  initial: CatImage[];
};

export default function ClientGallery({ initial }: Props) {
  const LIMIT = 12;
  const [images, setImages] = useState<CatImage[]>(initial);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(initial.length > 0);
  const [breed, setBreed] = useState<BreedOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const seenIdsRef = useRef<Set<string>>(new Set(initial.map((it) => it.id)));
  const didInitRef = useRef(false);
  const stateRef = useRef({ hasMore, isFetchingNext, loading, page, breed });

  // Keep an up-to-date snapshot for the IntersectionObserver callback to avoid stale closures
  useEffect(() => {
    stateRef.current = { hasMore, isFetchingNext, loading, page, breed };
  }, [hasMore, isFetchingNext, loading, page, breed]);

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
        // Deduplicate by id because the API may repeat results across pages
        const unique =
          mode === "replace"
            ? data // on replace, start fresh — don't filter against previous set
            : data.filter((img) => !seenIdsRef.current.has(img.id));
        if (mode === "replace") {
          seenIdsRef.current = new Set(unique.map((i) => i.id));
        } else {
          unique.forEach((i) => seenIdsRef.current.add(i.id));
        }
        // Keep allowing more loads only if we actually received new, unique items.
        setHasMore(unique.length > 0);
        setImages((prev) => (mode === "append" ? [...prev, ...unique] : unique));
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
    if (!hasMore) return; // stop observing when we've reached the end
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const { hasMore: hm, isFetchingNext: ifn, loading: ld, page: pg, breed: br } = stateRef.current;
        if (entry.isIntersecting && hm && !ifn && !ld) {
          fetchPage(pg + 1, br, "append");
        }
      },
      { rootMargin: "400px 0px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [breed, page, hasMore, isFetchingNext, loading, fetchPage]);

  return (
    <Box>
      <PageHeader breed={breed} onBreedChange={setBreed} />
      <Box sx={{ mt: 3 }}>
        {loading && page === 0 ? (
          <CatGridSkeleton />
        ) : images.length > 0 ? (
          <>
            {breed && <BreedDetails breed={breed} />}
            <CatGrid images={images} showMeta={!breed} />
          </>
        ) : (
          <Alert severity="info" sx={{ my: 2 }}>
            No cats found. Try another breed or clear the filter.
          </Alert>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", py: 2, minHeight: 1 }} ref={sentinelRef} />
        {isFetchingNext && !loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {hasMore && !isFetchingNext && !loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <Button variant="outlined" onClick={() => fetchPage(page + 1, breed, "append")}>Load more</Button>
          </Box>
        )}
        {!hasMore && images.length > 0 && !loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2, color: "text.secondary" }}>
            You’ve reached the end.
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
}

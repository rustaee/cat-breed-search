"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CatImage } from "@/lib/catapi";
import { Box, Stack } from "@mui/material";
import BreedAutocomplete from "@/components/BreedAutocomplete";
import CatGrid from "@/components/CatGrid";

type BreedOption = { id: string; name: string };

type Props = {
  initial: CatImage[];
};

export default function ClientGallery({ initial }: Props) {
  const [images, setImages] = useState<CatImage[]>(initial);
  const [breed, setBreed] = useState<BreedOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage0 = useCallback(async (selected: BreedOption | null) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "12", page: "0" });
      if (selected?.id) params.set("breed_id", selected.id);
      const res = await fetch(`/api/images?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch images");
      const data: CatImage[] = await res.json();
      setImages(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load images");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // When breed changes, fetch first page filtered/unfiltered
  useEffect(() => {
    // Skip fetch on first mount if no breed selected since we already have initial
    if (!breed) {
      // If user cleared the breed, refresh to unfiltered page 0
      if (images !== initial) {
        fetchPage0(null);
      }
      return;
    }
    fetchPage0(breed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breed?.id]);

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mb: 3 }}>
        <BreedAutocomplete value={breed} onChange={setBreed} />
      </Stack>
      <CatGrid images={images} />
      {loading && <Box sx={{ textAlign: "center", py: 2 }}>Loading…</Box>}
      {error && <Box sx={{ textAlign: "center", py: 2, color: "error.main" }}>{error}</Box>}
    </Box>
  );
}


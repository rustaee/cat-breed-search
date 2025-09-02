const CAT_API_BASE = process.env.CAT_API_BASE || "https://api.thecatapi.com/v1";

export function getCatApiKey(): string | undefined {
  return process.env.CAT_API_KEY;
}

export async function catApiFetch(input: string, init?: RequestInit) {
  const url = input.startsWith("http") ? input : `${CAT_API_BASE}${input}`;
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string> || {}),
  };
  const apiKey = getCatApiKey();
  if (apiKey) headers["x-api-key"] = apiKey;
  return fetch(url, { ...init, headers, next: { revalidate: 0 } });
}

export type CatBreed = {
  id: string;
  name: string;
  description?: string;
  temperament?: string;
  origin?: string;
};

export type CatImage = {
  id: string;
  url: string;
  width?: number;
  height?: number;
  breeds?: CatBreed[];
};

// Ensure each image has breeds by fetching image details when missing.
export async function ensureImageBreeds(images: CatImage[]): Promise<CatImage[]> {
  const missing = images.filter((img) => !img.breeds || img.breeds.length === 0);
  if (missing.length === 0) return images;

  const results = await Promise.all(
    missing.map(async (img) => {
      try {
        const res = await catApiFetch(`/images/${img.id}`);
        if (!res.ok) return null;
        const detail = (await res.json()) as CatImage;
        return detail?.breeds?.length ? { id: img.id, breeds: detail.breeds } : null;
      } catch {
        return null;
      }
    })
  );

  const byId = new Map(results.filter(Boolean).map((d: any) => [d.id, d.breeds]));
  return images.map((img) => {
    if (img.breeds && img.breeds.length) return img;
    const breeds = byId.get(img.id);
    return breeds ? { ...img, breeds } : img;
  });
}

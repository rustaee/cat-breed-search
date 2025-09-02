const CAT_API_BASE = process.env.CAT_API_BASE || "https://api.thecatapi.com/v1";

export function getCatApiKey(): string | undefined {
  return process.env.CAT_API_KEY;
}

export async function catApiFetch(input: string, init?: RequestInit) {
  const url = input.startsWith("http") ? input : `${CAT_API_BASE}${input}`;
  const headers: HeadersInit = {
    ...(init?.headers || {}),
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

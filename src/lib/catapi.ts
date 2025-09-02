const CAT_API_BASE = "https://api.thecatapi.com/v1";
// Fallback to provided API key if env is not set (for convenient local dev)
const DEFAULT_API_KEY = "live_10pUS3xlWhsefPS3QltaZZFTD8BR2ieBXUAHvnIfyHVDA2L46heX1QLgAwX1xTm";

export function getCatApiKey(): string | undefined {
  return process.env.CAT_API_KEY || DEFAULT_API_KEY;
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

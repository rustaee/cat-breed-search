import { catApiFetch, ensureImageBreeds, type CatImage } from "@/lib/catapi";
import { Container } from "@mui/material";
import ClientGallery from "@/components/ClientGallery";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

async function getInitialImages(): Promise<CatImage[]> {
  const params = new URLSearchParams({
    limit: "12",
    order: "Desc",
    include_breeds: "true",
    has_breeds: "1",
    page: "0",
  });
  const res = await catApiFetch(`/images/search?${params.toString()}`);
  if (!res.ok) return [];
  const data: CatImage[] = await res.json();
  return ensureImageBreeds(data);
}

export default async function Home() {
  const images = await getInitialImages();

  return (
    <main id="main">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ClientErrorBoundary>
          <ClientGallery initial={images} />
        </ClientErrorBoundary>
      </Container>
    </main>
  );
}

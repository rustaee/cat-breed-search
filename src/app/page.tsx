import { catApiFetch, type CatImage } from "@/lib/catapi";
import { Container } from "@mui/material";
import ClientGallery from "@/components/ClientGallery";

async function getInitialImages(): Promise<CatImage[]> {
  const params = new URLSearchParams({
    limit: "12",
    order: "Desc",
    attach_breeds: "1",
    has_breeds: "1",
    page: "0",
  });
  const res = await catApiFetch(`/images/search?${params.toString()}`);
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const images = await getInitialImages();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ClientGallery initial={images} />
    </Container>
  );
}

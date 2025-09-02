import { catApiFetch, type CatImage } from "@/lib/catapi";
import { Container, Typography } from "@mui/material";
import CatGrid from "@/components/CatGrid";

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
  return res.json();
}

export default async function Home() {
  const images = await getInitialImages();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Give me a cat 🐈
      </Typography>
      <CatGrid images={images} />
    </Container>
  );
}

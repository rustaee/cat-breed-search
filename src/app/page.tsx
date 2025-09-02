import { catApiFetch, type CatImage } from "@/lib/catapi";
import { Box, Container, Typography } from "@mui/material";

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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {images.map((img) => (
          <Box key={img.id} sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
            {/* Using plain img for SSR simplicity; will enhance with MUI components later */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={(img.breeds?.map((b) => b.name).join(", ") || "Cat")} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

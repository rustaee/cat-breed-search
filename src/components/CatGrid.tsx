import { Grid } from "@mui/material";
import type { CatImage } from "@/lib/catapi";
import CatCard from "@/components/CatCard";

type Props = {
  images: CatImage[];
};

export default function CatGrid({ images }: Props) {
  return (
    <Grid container spacing={2}>
      {images.map((img) => (
        <Grid key={img.id} item xs={12} sm={6} md={4} lg={3}>
          <CatCard image={img} />
        </Grid>
      ))}
    </Grid>
  );
}


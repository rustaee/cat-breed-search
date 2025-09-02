import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import type { CatImage } from "@/lib/catapi";

type Props = {
  image: CatImage;
};

export default function CatCard({ image }: Props) {
  const title = image.breeds?.map((b) => b.name).join(", ") || "Unknown breed";
  const subtitle = image.breeds?.[0]?.origin ? `Origin: ${image.breeds?.[0]?.origin}` : undefined;

  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="240"
        image={image.url}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}


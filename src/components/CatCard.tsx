import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { CatImage } from "@/lib/catapi";

type Props = {
  image: CatImage;
};

export default function CatCard({ image }: Props) {
  const title = image.breeds?.map((b) => b.name).join(", ") || "Unknown breed";
  const subtitle = image.breeds?.[0]?.origin ? `Origin: ${image.breeds?.[0]?.origin}` : undefined;

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderColor: "divider",
        borderWidth: 1,
        borderStyle: "solid",
        transition: "box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease",
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)', borderColor: 'primary.main' },
      }}
    >
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

import { Card, Box, Typography } from "@mui/material";
import type { CatImage } from "@/lib/catapi";

type Props = {
  image: CatImage;
  showMeta?: boolean;
};

export default function CatCard({ image, showMeta = true }: Props) {
  const title = image.breeds?.map((b) => b.name).join(", ") || "Unknown breed";
  const subtitle = image.breeds?.[0]?.origin ? `Origin: ${image.breeds?.[0]?.origin}` : undefined;

  // If we show an on-card caption, avoid reading the same text twice by using empty alt and caption text.
  const imgAlt = showMeta ? "" : title;

  return (
    <Card
      variant="outlined"
      component="figure"
      sx={{
        borderColor: "divider",
        borderWidth: 1,
        borderStyle: "solid",
        transition: "border-color 200ms ease, border-width 200ms ease",
        overflow: "hidden",
        m: 0,
        '&:hover': { borderColor: 'primary.main' },
        '&:hover .zoom-img': { transform: 'scale(1.06)' },
        position: 'relative'
      }}
    >
      <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
        <Box
          component="img"
          src={image.url}
          alt={imgAlt}
          className="zoom-img"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: 'transform 300ms ease' }}
        />
        {showMeta && (
          <Box
            component="figcaption"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              p: 1.5,
              background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.0))",
              color: "#fff",
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ opacity: 0.9 }} noWrap>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
}

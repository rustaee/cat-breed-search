import { Card, Box, Typography } from "@mui/material";
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
      tabIndex={0}
      sx={{
        borderColor: "divider",
        borderWidth: 1,
        borderStyle: "solid",
        transition: "border-color 200ms ease, border-width 200ms ease",
        overflow: "hidden",
        '&:hover': { borderColor: 'primary.main' },
        '&:hover .zoom-img': { transform: 'scale(1.06)' },
        '&:focus-visible': { outline: 'none', borderColor: 'primary.main', borderWidth: 2 },
      }}
      aria-label={title}
    >
      <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
        <Box
          component="img"
          src={image.url}
          alt={title}
          className="zoom-img"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: 'transform 300ms ease' }}
        />
        <Box
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
      </Box>
    </Card>
  );
}

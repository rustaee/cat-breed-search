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
      sx={{
        borderColor: "divider",
        borderWidth: 1,
        borderStyle: "solid",
        transition: "box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease",
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)', borderColor: 'primary.main' },
      }}
      aria-label={title}
   >
      <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
        <Box
          component="img"
          src={image.url}
          alt={title}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
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

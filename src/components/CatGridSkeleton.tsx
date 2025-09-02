import { Grid, Skeleton } from "@mui/material";

type Props = { count?: number };

export default function CatGridSkeleton({ count = 12 }: Props) {
  const items = Array.from({ length: count });
  return (
    <Grid container spacing={2}>
      {items.map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Skeleton variant="rounded" height={240} sx={{ mb: 1, borderRadius: 2 }} />
          <Skeleton width="70%" />
          <Skeleton width="40%" />
        </Grid>
      ))}
    </Grid>
  );
}

